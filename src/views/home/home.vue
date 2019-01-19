<template>
  <div>
    <!--<div class="home-search">-->
    <!--<input type="text" class="home-search-in" v-model="keyWord" placeholder="搜索我感兴趣的课程" @keyup.enter="keyEnter">-->
    <!--<div class="home-search-btn" @click="keyEnter"></div>-->
    <!--</div>-->
    <div class="g-box">
      <div class="swiper-container home-ban-top">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            :style="{backgroundImage: 'url(\''+$config.HOST_API+item.logoUrl+'\')',cursor:item.url?'pointer':'default'}"
            v-for="(item,index) in bannerList"
            :key="index"
            @click="banClick(item)"></div>
        </div>
        <!-- Add Arrows -->
        <!--<div class="swiper-button-next swiper-button-white"></div>-->
        <!--<div class="swiper-button-prev swiper-button-white"></div>-->
        <div class="home-ban-top-tab">
          <div class="home-ban-top-tab-item" :class="{on:index===bannerIndex}" v-for="(item,index) in bannerList"
               :key="index"></div>
        </div>
      </div>
      <!--<div class="swiper-container home-ban-tab">-->
        <!--<div class="swiper-wrapper">-->
          <!--<div class="swiper-slide" :class="{on: index===bannerTabIndex}"-->
               <!--:style="{backgroundImage: 'url(\''+item.logoUrl+'\')'}" v-for="(item,index) in bannerList" :key="index"-->
               <!--@click="banTabChange(index)"></div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="home-course">-->
      <!--<div class="home-course-title">-->
      <!--<span class="home-course-title-chinese">课程直播</span>-->
      <!--<span class="home-course-title-english">COURSE LIVE</span>-->
      <!--</div>-->
      <!--<div class="home-course-content">-->
      <!--<div class="home-course-content-items" v-for="(item,index) in videoList" :key="index"-->
      <!--@click="courseDetail(item.id,item.courseId)">-->
      <!--<div class="home-course-content-img"-->
      <!--:style="{backgroundImage: 'url(\''+item.coverUrl+'\')'}" v-if="item.coverUrl">-->
      <!--<img src="../../assets/img/trapezoid.png" alt="" class="home-course-content-img-trapezoid">-->
      <!--<p class="home-course-content-img-text">{{item.type}}</p>-->
      <!--</div>-->
      <!--<div class="home-course-content-img"-->
      <!--:style="{backgroundImage: 'url('+require('../../assets/img/home-course-img.png')+')'}" v-else>-->
      <!--<img src="../../assets/img/trapezoid.png" alt="" class="home-course-content-img-trapezoid">-->
      <!--<p class="home-course-content-img-text">{{item.type}}</p>-->
      <!--</div>-->
      <!--<div class="home-course-content-text">-->
      <!--<div class="home-course-content-userphoto"-->
      <!--:style="{backgroundImage: 'url('+require('../../assets/img/home_course_userphoto.png')+')'}"></div>-->
      <!--<div class="home-course-content-name">{{item.teacher}}</div>-->
      <!--<div class="home-course-content-coursename">{{item.course}}</div>-->
      <!--<div class="home-course-content-coursetime">-->
      <!--<span class="home-course-content-courseuser-img"-->
      <!--:style="{backgroundImage: 'url('+require('../../assets/img/home_course_courseuser.png')+')'}"></span>-->
      <!--<p class="home-course-content-courseuser">{{item.viewCount}}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<router-link to="/courseLive/searchResult" class="home-course-content-items">-->
      <!--<div class="home-course-content-img-last"-->
      <!--:style="{backgroundImage: 'url('+require('../../assets/img/home_course_img.png')+')'}">-->
      <!--<div class="home-course-content-img-cover">当前有1000人看直播</div>-->
      <!--</div>-->
      <!--<div class="home-course-content-text-last">-->
      <!--<div class="home-course-content-more">-->
      <!--<img src="../../assets/img/home_course_more_img.png" alt="" class="home-course-content-more-img">-->
      <!--<p class="home-course-content-more-text">更多直播</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</router-link>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div class="home-level-main">-->
      <!--<div class="home-level-title">-->
      <!--<span class="home-level-title-chinese">专业分类</span>-->
      <!--<span class="home-level-title-english">PROFESSIONAL CLASSIFICATION</span>-->
      <!--</div>-->
      <!--<div class="home-level-content swiper-container">-->
      <!--<div class="home-level-content-ul swiper-wrapper">-->
      <!--<div class="home-level-content-items swiper-slide" v-for="(item,index) in majorList" :key="index">-->
      <!--<div class="home-level-content-items-img" :style="{backgroundImage: 'url(\''+item.coverUrl+'\')'}"-->
      <!--@click="typeDetail(item.id)" v-if="item.coverUrl"></div>-->
      <!--<div class="home-level-content-items-img" :style="{backgroundImage: 'url('+require('../../assets/img/home_major2.png')+')'}"-->
      <!--@click="typeDetail(item.id)" v-else></div>-->
      <!--<p class="home-level-content-items-levelname">{{item.name}}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="s-home-major">
      <div class="s-home-items-tit">
        <div class="s-home-items-tit-txt">专业分类</div>
        <div class="s-home-items-tit-more" @click="moreMajor">更多</div>
      </div>
      <div class="s-home-major-items">
        <div class="s-home-major-item" v-for="(item,index) in majorList" :key="index"
             :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/major_cover1.png'))+'\')'}"
             @click="typeDetail(item.id)">
          <div class="s-home-major-name">{{item.name}}</div>
        </div>

      </div>
    </div>
    <div class="s-home-course">
      <div class="s-home-items-tit">
        <div class="s-home-items-tit-txt">在线课堂</div>
        <div class="s-home-items-tit-more" @click="moreCourseLive">更多</div>
      </div>
      <div class="s-home-course-items">
        <div class="s-home-course-item" v-for="(item,index) in videoList" :key="index"
             @click="courseDetail(item.id,item.courseId)">
          <div class="s-home-course-item-img"
               :style="{backgroundImage: 'url(\''+(item.coverUrl?item.coverUrl:require('../../assets/img/course_cover1.png'))+'\')'}"></div>
          <div class="s-home-course-item-con">
            <div class="s-home-con-li">{{item.course}}</div>
            <div class="s-home-con-li">
              <div class="s-home-tea-img"
                   :style="{backgroundImage: 'url('+require('../../assets/img/sr_tea.png')+')'}"></div>
              <div class="s-home-tea-name">{{item.teacher}}</div>
              <div class="s-home-tea-num" :style="{backgroundImage: 'url('+require('../../assets/img/sl_num.png')+')'}">
                {{item.viewCount}}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="home-cover" v-show="showPhone">
      <div class="g-box">
        <div class="home-cover-hint">
          <div class="home-cover-hint-cancel" :style="{backgroundImage: 'url('+require('../../assets/img/del.png')+')'}"
               @click="cancel"></div>
          <div class="home-cover-hint-con">请绑定手机，获取更好体验！</div>
          <el-form ref="ruleForm" :model="form" class="setp-con-main" label-width="286px" label-position="top"
                   :rules="rules">
            <el-form-item label="请输入手机号" class="setp-con-item" prop="phone">
              <el-input v-model="form.phone" class="setp-inp"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" class="setp-con-item" prop="verifyCode">
              <el-input v-model="form.verifyCode" class="setp-inp"
                        style="display:inline-block;width: 154px;float: left;"></el-input>
              <el-button class="button" @click="send" v-if="!sendMsgDisabled">获取短信验证码</el-button>
              <el-button class="button" @click="send" v-if="sendMsgDisabled">{{time+'秒后获取'}}</el-button>
            </el-form-item>
            <el-form-item prop="safety">
              <div class="safety"></div>
            </el-form-item>
            <el-form-item class="setp-con-item">
              <el-button class="setp-item-btn" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/home.less";
import "swiper/dist/css/swiper.min.css";
import Swiper from "swiper/dist/js/swiper.min";
import Cookies from "js-cookie";
import { mapState } from "vuex";

export default {
  data() {
    let checktel = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入账号"));
      }
      let reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (!reg.test(value)) {
        return callback(new Error("账号为手机号格式且11位"));
      }
      return callback();
    };
    return {
      timer: "",
      bannerList: "",
      bannerIndex: 0,
      bannerTabIndex: 0,
      videoList: "",
      majorList: "",
      keyWord: "",
      showPhone: false,
      form: {
        phone: "",
        verifyCode: ""
      },
      time: 60, // 发送验证码倒计时
      sendMsgDisabled: false,
      rules: {
        phone: [{ required: true, validator: checktel, trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请填写验证码", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  mounted() {
    this.get_List();
    console.log(this.bannerList);
    if (
      this.userInfo &&
      this.userInfo.clientRoleType === 1 &&
      this.userInfo.phone.length !== 11
    ) {
      this.showPhone = true;
    }
  },
  computed: mapState(["userInfo"]),
  methods: {
    get_List() {
      this.$api.main.ceshi().then(res => {
        this.bannerList = res.data.banners;
        console.log(res.data.majors.length);
        if (res.data.majors.length < 7) {
          this.majorList = res.data.majors;
        } else {
          this.majorList = res.data.majors.slice(0, 6);
        }

        if (res.data.videos.length < 6) {
          this.videoList = res.data.videos;
        } else {
          this.videoList = res.data.videos.slice(0, 5);
        }

        console.log(this.majorList.length);
        this.$nextTick(() => {
          this.ready_swiper();
        });
      });
    },
    ready_swiper() {
      let _this = this;

      this.galleryTop = new Swiper(".home-ban-top", {
        loop: true,
        autoplay: true,
        // navigation: {
        //   nextEl: ".home-ban-top .swiper-button-next",
        //   prevEl: ".home-ban-top .swiper-button-prev"
        // },
        on: {
          slideChange: function() {
            _this.bannerTabIndex = _this.bannerIndex = this.realIndex;
            // if (_this.galleryThumbs)
            //   _this.galleryThumbs.slideTo(this.realIndex);
          }
        }
      });

      this.galleryThumbs = new Swiper(".home-ban-tab", {
        spaceBetween: 6,
        slidesPerView: 5
      });

      new Swiper(".home-level-content.swiper-container", {
        loop: this.majorList.length > 5 ? true : false,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        spaceBetween: 24,
        slidesPerView: 5
      });
    },
    banTabChange(ind) {
      this.bannerTabIndex = ind;
      this.galleryTop.slideToLoop(ind);
    },
    typeDetail(id) {
      this.$router.push(`/majorType/majorType/${id}`);
    },
    courseDetail(id, courseId) {
      this.$router.push(`/courseLive/LiveRoom/${id}/${courseId}`);
    },
    keyEnter() {
      let keyWord = this.keyWord;

      if (!keyWord) {
        keyWord = "null";
      }
      this.$router.push(`/search/search/${keyWord}`);
    },
    moreMajor() {
      this.$router.push(`/majorType/majorList`);
    },
    moreCourseLive() {
      this.$router.push(`/courseLive/searchResult`);
    },
    banClick(item) {
      if (item.url) {
        window.open(item.url);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.main
            .cardId({
              phone: this.form.phone,
              verifyCode: this.form.verifyCode
            })
            .then(res => {
              console.log(res, res.data);
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                  duration: 1000
                });
                this.showPhone = !this.showPhone;
                this.$store.commit({
                  type: "setState",
                  cType: "userInfo",
                  key: "phone",
                  nKey: this.form.phone
                });
                Cookies.set("userInfo", this.userInfo);
                console.log(this.userInfo);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //验证码
    send() {
      let reg1 = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.form.phone.length === 11 && reg1.test(this.form.phone)) {
        this.$api.main
          .verify({
            clientRoleType: 1,
            phone: this.form.phone,
            type: 1
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "验证码发送成功!",
              duration: 1000
            });
            let me = this;
            me.sendMsgDisabled = true;
            let interval = window.setInterval(function() {
              if (me.time-- <= 0) {
                me.time = 60;
                me.sendMsgDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          });
      } else if (this.form.phone.length === 0) {
        this.$message({
          type: "error",
          message: "请输入手机号!",
          duration: 1000
        });
      } else if (!reg1.test(this.form.phone)) {
        this.$message({
          type: "error",
          message: "请输入正确的手机号!",
          duration: 1000
        });
      }
    },
    cancel() {
      this.showPhone = false;
    }
  }
};
</script>
<style lang="less">
/*.g-main{*/
/*background-color: #fff;*/
/*}*/
.home-search {
  height: 120px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .home-search-in {
    width: 310px;
    height: 33px;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    padding: 0 20px;
    color: #989898;
  }
  .home-search-btn {
    background: url("../../assets/img/home_search.png") no-repeat center;
    width: 25px;
    height: 26px;
    padding-left: 10px;
    cursor: pointer;
  }
}

.home-banner {
  width: 1200px;
  margin: 0 auto 24px;
  height: 450px;
  .home-banner-bigimg {
    height: 370px;
    width: 1200px;
    overflow: hidden;
    .home-banner-bigimg-items {
      width: 1200px;
      height: 370px;
      opacity: 1;
      border-radius: 10px;
      display: block;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      transition: all 0.3s;
    }
    .home-banner-bigimg-items-active {
      height: 0;
      opacity: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      transition: all 0.3s;
    }
    .home-banner-bigimg-items-img {
      height: 370px;
      width: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .home-banner-smallimg {
    width: 100%;
    height: 68px;
    padding: 6px 0;
    overflow: hidden;
    .home-banner-smallimg-items {
      height: 68px;
      width: 235px;
      float: left;
      margin-right: 6px;
      margin-bottom: 6px;
      overflow: hidden;
      border-radius: 10px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      cursor: pointer;
    }
    .home-banner-smallimg-items-img {
      height: 68px;
      width: 235px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
}

.home-course {
  .home-course-title {
    height: 78px;
    margin-top: 30px;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    .home-course-title-chinese {
      width: 117px;
      color: #000;
      font-size: 22px;
    }
    .home-course-title-english {
      color: #a8a8a8;
      font-size: 22px;
    }
  }
  .home-course-content {
    width: 100%;
    overflow: hidden;
    .home-course-content-items {
      cursor: pointer;
      height: 252px;
      width: 282px;
      border-radius: 10px;
      border-bottom: 1px solid #f2f3f4;
      box-shadow: 0px 0px 1px #f2f3f4;
      margin: 0 22px 44px 0;
      float: left;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .home-course-content-img {
        height: 160px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;
        .home-course-content-img-trapezoid {
          position: absolute;
          top: 0px;
          right: 10px;
        }
        .home-course-content-img-text {
          height: 30px;
          width: 116px;
          line-height: 30px;
          text-align: center;
          position: absolute;
          top: 0px;
          right: 10px;
          color: #000;
        }
      }
      .home-course-content-text {
        width: 244px;
        margin: 0 auto;
        height: 90px;
        position: relative;
        .home-course-content-userphoto {
          height: 44px;
          width: 44px;
          border-radius: 50%;
          position: absolute;
          top: -22px;
          left: -6px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .home-course-content-name {
          height: 30px;
          line-height: 30px;
          padding-left: 40px;
          font-size: 14px;
          color: #000;
        }
        .home-course-content-coursename {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #000;
          width: 230px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .home-course-content-coursetime {
          height: 30px;
          line-height: 30px;
          position: relative;
          .home-course-content-coursetime-img {
            height: 17px;
            width: 17px;
            border-radius: 50%;
            display: block;
            position: absolute;
            top: 6px;
            left: 0;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
          .home-course-content-coursetime-text {
            color: #e84e47;
            position: absolute;
            left: 23px;
            top: 0;
            font-size: 14px;
          }
          .home-course-content-courseuser-img {
            height: 17px;
            width: 17px;
            border-radius: 50%;
            display: block;
            position: absolute;
            top: 6px;
            left: 184px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
          .home-course-content-courseuser {
            color: #e84e47;
            position: absolute;
            left: 207px;
            top: 0;
            font-size: 14px;
          }
          .home-course-content-gray {
            color: #a0a0a0;
          }
        }
      }
      .home-course-content-text-last {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90px;
        .home-course-content-more {
          width: 270px;
          height: 72px;
          background-color: #e84c45;
          border-radius: 10px;
          position: relative;
          .home-course-content-more-img {
            width: 45px;
            height: 42px;
            position: absolute;
            top: 15px;
            left: 40px;
          }
          .home-course-content-more-text {
            font-size: 22px;
            color: #fff;
            padding-left: 110px;
            height: 72px;
            line-height: 72px;
          }
        }
      }
      .home-course-content-img-last {
        height: 160px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        .home-course-content-img-cover {
          background-color: #000;
          height: 160px;
          line-height: 160px;
          opacity: 0.5;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          text-align: center;
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
}

/*.home-level {*/
/*height: 552px;*/
/*width: 1648px;*/
/*background-color: #2a2e43;*/
/*}*/
.home-level-main {
  width: 1200px;
  margin: 0 auto;
  .home-level-title {
    height: 112px;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    .home-level-title-chinese {
      width: 117px;
      color: #000;
      font-size: 22px;
    }
    .home-level-title-english {
      color: #74757a;
      font-size: 22px;
    }
  }
  .home-level-content {
    width: 1200px;
    height: 362px;
    margin-left: 0;
    padding-bottom: 100px;
    .home-level-content-ul {
      height: 362px;
      .home-level-content-items {
        float: left;
        height: 362px;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        /*width: 220px;*/
        /*margin-right: 24px;*/
        .home-level-content-items-img {
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          /*width: 210px;*/
          height: 362px;
          border-radius: 10px;
        }
        .home-level-content-items-levelname {
          color: #fff;
          font-size: 22px;
          height: 44px;
          line-height: 44px;
          /*padding: 0 13px;*/
          position: absolute;
          bottom: 0px;
          left: 13px;
        }
      }
    }
  }
}

.home-ban-top {
  width: 100%;
  height: 463px;
  margin-top: 8px;
  border-radius: 10px;
  .swiper-slide {
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .swiper-button-white {
    width: 41px;
    height: 39px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto;
    top: auto;
    bottom: 14px;
    transition: all 0.1s;
  }
  .swiper-button-prev {
    right: 117px;
    left: auto;
    background-image: url("../../assets/img/ico_3.png");
    &:hover {
      background-image: url("../../assets/img/ico_2.png");
    }
  }
  .swiper-button-next {
    right: 66px;
    background-image: url("../../assets/img/ico_4.png");
    &:hover {
      background-image: url("../../assets/img/ico_1.png");
    }
  }
}

.home-ban-top-box {
  position: absolute;
  top: 40px;
  right: 50px;
  text-align: right;
}

.home-ban-top-cap {
  font-size: 54px;
  color: #201205;
  font-weight: bold;
}

.home-ban-top-btn {
  display: inline-block;
  font-size: 16px;
  color: #fff;
  background: url("../../assets/img/ico_5.png") no-repeat 23px center;
  background-color: #5e4eaa;
  border-radius: 5px;
  padding: 12px 20px 12px 49px;
  line-height: 1;
  margin-top: 40px;
  &:hover {
    opacity: 0.9;
  }
}

.home-ban-top-tab {
  display: flex;
  align-items: flex-end;
  position: absolute;
  right: 32px;
  bottom: 14px;
  z-index: 1;
  justify-content: right;
}

.home-ban-top-tab-item {
  width: 8px;
  height: 8px;
  background-color: #e6e6e6;
  border-radius: 50%;
  margin-right: 10px;
  transition: all 0.3s;
  &.on {
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
  }
}

.home-ban-tab {
  height: 68px;
  margin-top: 6px;
  .swiper-slide {
    opacity: 0.4;
    border-radius: 6px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    transition: opacity 0.3s;
    &.on {
      opacity: 1;
      transition: opacity 0.3s;
    }
  }
}

.home-cover {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  z-index: 100;
}

.home-cover-hint {
  height: 500px;
  width: 35%;
  border-radius: 0.3rem;
  background-color: #fff;
  position: absolute;
  left: 32%;
  top: 15%;
  /*margin-left: -25%;*/
  /*margin-top: -20%;*/
}

.home-cover-hint-cancel {
  width: 20px;
  height: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  padding-top: 35px;
  float: right;
  margin-right: 25px;
  cursor: pointer;
}

.home-cover-hint-con {
  text-align: center;
  padding-top: 70px;
  font-size: 28px;
}

.home-cover-hint-group {
  width: 1.54rem;
  height: 1.16rem;
  margin: 0.45rem auto 0;
}

.home-cover-hint-img {
  width: 1.54rem;
  height: 1.16rem;
}

.home-cover-hint-text {
  height: 1.14rem;
  line-height: 1.14rem;
  text-align: center;
  font-size: 0.28rem;
}

//专业分类与课程直播
.s-home-major,
.s-home-course {
  width: 1200px;
  margin: 0 auto;
}
.s-home-major {
  margin-top: 20px;
}
.s-home-course {
  margin-top: 20px;
}

.s-home-items-tit {
  display: flex;
  justify-content: space-between;
  width: 100%;
  line-height: 24px;
  .s-home-items-tit-txt {
    font-size: 20px;
    width: 106px;
    font-weight: bold;
    color: #484848;
  }
  .s-home-items-tit-more {
    width: 40px;
    font-size: 14px;
    color: #9b9b9b;
    background: url("../../assets/img/sr_rt_1.png") no-repeat right;
    background-size: 8px 14px;
    cursor: pointer;
  }
}

.s-home-major-items {
  width: 100%;
  height: 106px;
  margin-top: 10px;
  .s-home-major-item:nth-child(6n) {
    margin-right: 0;
  }
  .s-home-major-item {
    float: left;
    width: 189px;
    height: 106px;
    margin-right: 13px;
    border-radius: 5px;
    background: url("../../assets/img/course_img.png") no-repeat center;
    background-size: cover;
    .s-home-major-name {
      line-height: 106px;
      text-align: center;
      font-size: 18px;
      color: #414141;
      cursor: pointer;
      font-weight: bold;
    }
  }
  .s-home-major-item:nth-last-child(1) {
    margin-right: 0;
  }
}

.s-home-course-items {
  width: 100%;
  margin-top: 10px;
  .s-home-course-item:nth-child(5n) {
    margin-right: 0;
  }
  .s-home-course-item {
    float: left;
    width: 218px;
    height: 178px;
    margin-right: 27px;

    cursor: pointer;
    .s-home-course-item-img {
      width: 220px;
      height: 121px;
      text-align: center;
      line-height: 121px;
      font-size: 18px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    .s-home-course-item-con {
      width: 100%;
      height: 60px;
      margin-top: 15px;
      .s-home-con-li {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 30px;
        line-height: 30px;
        color: #19233c;
        .s-home-tea-img {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .s-home-tea-name {
          margin-left: 8px;
          color: #898989;
        }
        .s-home-tea-num {
          text-indent: 26px;
          margin-left: 20px;
          background-repeat: no-repeat;
          background-size: 15px 15px;
          background-position: left;
          color: #898989;
        }
      }
    }
  }
}
</style>
