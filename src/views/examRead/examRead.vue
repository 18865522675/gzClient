<template>
    <div class="examRead">
        <!--教师-->
        <ul class="examRead-content">
            <li class="examRead-content-items" v-for="(item,index) in List" :key="index">
                <div class="examRead-content-items-left" :style="{backgroundImage: 'url(\''+item.coverUrl+'\')'}" v-if="item.coverUrl"></div>
                <div class="examRead-content-items-left" :style="{backgroundImage: 'url('+require('../../assets/img/course_cover.png')+')'}" v-else></div>
                <div class="examRead-content-items-right">
                    <div class="examRead-content-items-right-name">{{item.course}}</div>
                    <div class="examRead-content-items-right-num">{{item.wareCount}}课时</div>
                    <div class="examRead-content-items-right-time" v-if="item.assessmentLastReferTime===null">上次查阅时间: --</div>
                    <div class="examRead-content-items-right-time" v-else>上次查阅时间: {{item.time}}</div>
                    <div class="examRead-content-items-right-button" @click="read(item.id,item.coverUrl,item.course,item.assessmentLastReferTime)">开始查阅</div>
                </div>
            </li>
        </ul>
        <div style="text-align: center;padding: 20px 0;" v-if="List.length===0">暂无查阅</div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="limitNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                class="kf-pagination"
        v-if="List.length!==0">
        </el-pagination>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      limitNum: 10,
      total: 10,
      List: ""
    };
  },
  mounted() {
    this.get_List();
  },
  methods: {
    get_List() {
      this.$api.examRead
        .examReadList({
          pageNum: this.currentPage,
          pageSize: this.limitNum
        })
        .then(res => {
          this.List = res.data.pageList;
          this.total = res.data.total;
          this.List.forEach(item => {
            item.time = this.$fun.table.time(
              null,
              null,
              item.assessmentLastReferTime
            );
          });
        });
    },
    read(id, img, course, time) {
      this.$router.push({
        name: "examTime",
        params: { id: id, img: img, course: course, time: time }
      });
    },
    handleSizeChange(val) {
      this.limitNum = val;
      this.get_List();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_List();
    }
  }
};
</script>

<style lang="less">
.examRead {
  width: 1200px;
  margin: 34px auto 0;
  .examRead-header {
    display: block;
    width: 100%;
    height: 66px;
    background: #ffba4e;
    border-radius: 5px;
  }
  .examRead-header-body {
    display: flex;
    align-items: center;
    width: 972px;
    padding-left: 40px;
    height: 100%;
    margin: 0 auto;
  }
  .examRead-header-item {
    height: 48px;
    line-height: 48px;
    color: #ffffff;
    font-size: 18px;
    margin-right: 75px;
  }
  .on {
    color: #2a2e43;
  }
  .examRead-content {
    width: 110%;
    overflow: hidden;
    .examRead-content-items {
      float: left;
      height: 220px;
      width: 380px;
      margin: 30px 30px 0 0;
      border-radius: 10px;
      background-color: #fff;
      display: flex;
      align-items: center;
      .examRead-content-items-left {
        width: 122px;
        height: 185px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        border-radius: 10px;
        margin: 0 10px 0 17px;
      }
      .examRead-content-items-right {
        height: 185px;
        width: 231px;
        .examRead-content-items-right-name {
          height: 64px;
          line-height: 32px;
          font-size: 16px;
        }
        .examRead-content-items-right-mark {
          height: 16px;
          width: 47px;
          line-height: 16px;
          text-align: center;
          color: #e84c45;
          font-size: 12px;
          margin: 9px 0;
        }
        .examRead-content-items-right-num {
          height: 28px;
          line-height: 28px;
          font-size: 16px;
          color: #989898;
          font-size: 12px;
          margin-bottom: 6px;
        }
        .examRead-content-items-right-time {
          height: 37px;
          line-height: 37px;
          font-size: 13px;
        }
        .examRead-content-items-right-button {
          width: 217px;
          height: 45px;
          background-color: #ffba4e;
          line-height: 45px;
          text-align: center;
          font-size: 18px;
          border-radius: 6px;
          display: block;
          color: #000;
          cursor: pointer;
        }
      }
    }
  }
}
.kf-pagination {
  float: right;
  margin-top: 20px;
}
</style>
