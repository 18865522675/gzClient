<template>
    <div class="examRead-time">
        <div class="examRead-time-left">
            <div class="examRead-time-left-img" :style="{backgroundImage: 'url('+require('../../assets/img/course_cover.png')+')'}" v-if="img===''"></div>
            <div class="examRead-time-left-img" :style="{backgroundImage: 'url(\''+img+'\')'}" v-else></div>
            <!--<div class="examRead-time-left-coursetype">专业课</div>-->
            <div class="examRead-time-left-coursename">{{course}}</div>
            <div class="examRead-time-left-readtime" v-if="time===null">上次查阅时间: ---</div>
            <div class="examRead-time-left-readtime" v-else>上次查阅时间: {{readTime}}</div>
        </div>
        <div class="rightWidth">
            <div class="examRead-time-right" v-for="(item,index) in List" :key="index">
                <div class="examRead-time-right-items" @click="examRead(item.time,index)">
                    <div class="examRead-time-right-items-content">
                        <div class="examRead-time-right-items-round"></div>
                        <div class="examRead-time-right-items-time">{{item.time}}  (共{{item.totalCount}}人)</div>
                        <img src="../../assets/img/course_pro_down.png" alt="" class="examRead-time-right-items-time-tri">
                    </div>
                </div>
                <div class="examRead-time-right-hidden" v-show="examReadDetail===index">
                    <div class="examRead-time-right-hidden-items" v-for="(item,index) in stuList" :key="index">
                        <div class="examRead-time-right-hidden-items-img" :style="{backgroundImage: 'url(\''+$config.HOST_API+item.avatar+'\')'}" v-if="item.avatar"></div>
                        <div class="examRead-time-right-hidden-items-img" :style="{backgroundImage: 'url('+require('../../assets/img/course_pro_userphoto.png')+')'}" v-else></div>
                        <div class="examRead-time-right-hidden-items-name">{{item.student}}</div>
                        <div class="examRead-time-right-hidden-items-score">测评成绩: {{item.totalScore}}分</div>
                        <div class="examRead-time-right-hidden-items-see" @click="exanReadDetailSee(item.id,item.student,item.avatar)">查看</div>
                    </div>
                </div>
            </div>
            <div v-if="List.length===0" class="noData">暂无查阅</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      examReadDetail: "",
      id: this.$route.params.id,
      img: this.$route.params.img,
      time: this.$route.params.time,
      course: this.$route.params.course,
      readTime: "",
      List: "",
      stuList: ""
    };
  },
  mounted() {
    this.get_List();
    this.readTime = this.$fun.table.time(null, null, Number(this.time));
  },
  methods: {
    get_List() {
      this.$api.examRead
        .examReadDetail({
          id: this.id
        })
        .then(res => {
          this.List = res.data;
          console.log(this.List.length);
          this.List.forEach(item => {
            item.time = this.$fun.table.time(null, null, item.assessmentDate);
          });
        });
    },
    examRead(time, index) {
      this.$api.examRead
        .examReadName({
          courseId: this.id,
          date: time
        })
        .then(res => {
          this.stuList = res.data;
          console.log(this.stuList);
        });
      if (this.examReadDetail === index) {
        this.examReadDetail = "";
      } else {
        this.examReadDetail = index;
      }
    },
    exanReadDetailSee(id, name, img) {
      this.$router.push({
        name: "examReadScore",
        params: { id: id, course: this.course, img: img, name: name }
      });
    }
  }
};
</script>

<style lang="less">
.examRead-time {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 130px;
  .examRead-time-left {
    width: 260px;
    height: 257px;
    background: #fff;
    border-radius: 10px;
    .examRead-time-left-img {
      width: 82px;
      height: 125px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 12px;
    }
    .examRead-time-left-coursetype {
      width: 47px;
      height: 32px;
      line-height: 16px;
      border: 1px solid #e84c45;
      color: #e84c45;
      text-align: center;
      font-size: 12px;
      margin: 0 auto 10px;
    }
    .examRead-time-left-coursename {
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .examRead-time-left-readtime {
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #a0a0a0;
      font-size: 14px;
    }
  }
  .examRead-time-right {
    width: 900px;
    .examRead-time-right-items {
      height: 60px;
      width: 100%;
      line-height: 60px;
      margin-bottom: 10px;
      background: #fff;
      cursor: pointer;
      .examRead-time-right-items-content {
        width: 90%;
        margin-left: 3%;
        position: relative;
        .examRead-time-right-items-round {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #000;
          position: absolute;
          top: 26px;
          left: 0;
        }
        .examRead-time-right-items-time {
          margin-left: 25px;
          float: left;
        }
        .examRead-time-right-items-time-tri {
          float: right;
          width: 13px;
          height: 10px;
          margin-top: 25px;
        }
      }
      &:hover {
        .examRead-time-right-items-round {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #ffba4e;
          position: absolute;
          top: 26px;
          left: 0;
        }
      }
    }
    .examRead-time-right-hidden {
      width: 100%;
      background-color: #f6e8d3;
      margin-bottom: 10px;
      .examRead-time-right-hidden-items {
        height: 60px;
        width: 90%;
        display: flex;
        /*justify-content: space-between;*/
        align-items: center;
        margin-left: 6%;
        .examRead-time-right-hidden-items-img {
          width: 34px;
          height: 34px;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        .examRead-time-right-hidden-items-name {
          padding-left: 10px;
          float: left;
        }
        .examRead-time-right-hidden-items-score {
          float: left;
          padding-left: 450px;
        }
        .examRead-time-right-hidden-items-see {
          width: 69px;
          height: 30px;
          border-radius: 6px;
          background-color: #ffba4e;
          text-align: center;
          line-height: 30px;
          margin-left: 38px;
          cursor: pointer;
          color: #000;
        }
      }
    }
  }
}
.noData {
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.rightWidth {
  width: 900px;
}
</style>
