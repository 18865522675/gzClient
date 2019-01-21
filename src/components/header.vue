<template>
  <div class="top-header">
    <!-- <h1>这里是头部</h1> -->
    <div class="wrap">
      <div class="head_row">
        <div class="logo-img-box">
          <img :src="$api.global.img+message.schoolLogo" alt="" @click="$router.push('/home')" class="logo-img" style="cursor:pointer" v-if="message.schoolLogo">
          <div class="grid-content bg-purple" @click="$router.push('/home')" style="cursor: pointer">{{user.siteName}}</div>
        </div>
        <div class="head-user">
          <label style="margin-right:10px;curosr:pointer" @click="$router.push('/selfInfo')">hi {{this.userInfo.usreName}}</label>
          <el-button type="text" @click="logOut" class="selfbtn"> [ 退出 ] </el-button>
        </div>
       
        <!--<div class="head-sys">
          <el-popover placement="bottom" width="340" trigger="hover">
            <div class="mylabel">
              <div :style="{backgroundImage: 'url('+require('../assets/img/Picture.png')+')'}" class="pic" v-if="!message.photo" @click="$router.push('/selfInfo')"></div>
              <div :style="{backgroundImage: 'url('+$api.global.img+message.photo+')'}" v-else style="cursor:pointer" @click="$router.push('/selfInfo')" class="pic"></div>
              <label style="display:block" class="useMess">{{message.userName}}</label>
              <div>
                <label class="l-number" style="display:block">学号：{{message.code}}</label>
                <label class="baseIfo" style="display:block">{{message.stationName}}</label>
                <div class="classMes">
                  <label class="baseIfo">{{message.batchName}}</label>
                  <label class="baseIfo baseIfo_marg">{{message.levelName}}</label>
                  <label class="baseIfo">{{message.majorName}}</label>
                </div>
              </div>
              <div>
                <div class="btnList"> 
                  <div style="text-align:center">
                    <el-button type="text" @click="$router.push('/my/teaching')">教学计划</el-button>
                  </div>
                  <div style="text-align:center">
                    <el-button type="text" @click="$router.push('/library/library')">图书馆</el-button>
                  </div>
                  <div style="text-align:center">
                    <el-button type="text" @click="$router.push('/my/graduation')">毕业设计</el-button>
                  </div>
                </div>
              </div>
            </div>
            <el-button slot="reference" class="arrowbtn">{{myStatus}}
              <i class="el-icon-caret-bottom"></i>
            </el-button>
          </el-popover>|
          <el-button text="text" class="selfbtn" @click="$router.push('/examinationReservation/List')">考试通知</el-button> |
          <el-button text="text" class="selfbtn" @click="$router.push('/news/list')">消息</el-button>|
          <el-button text="text" class="selfbtn" @click="$router.push('/serviceFeedback/list')">服务反馈</el-button>|
          <el-popover placement="bottom" width="160" trigger="hover">
            <div class="qrCodeWrap">
              <img src="../assets/img/qrCode.png" alt="二维码" title="二维码" style="width:100px;height:100px" />
              <label style="display:block">下载手机客户端</label>
            </div>
            <el-button slot="reference" type="text" class="arrowbtn"> 手机版 </el-button>
          </el-popover>
        </div>-->
      </div>
    </div>
   	<div class="headLogo">
   			<div class="headlogoMain">
   				<img src="../assets/img/headlogo.png" alt="" />
   			</div>
   	</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "headerModule",
  data() {
    return {
      myStatus: "激活",
      personName: "",
      qrCode: "",
      input5: "",
      btnList: [
        {
          name: "教学计划"
        },
        {
          name: "课程成绩"
        },
        {
          name: "毕业设计"
        }
      ],
      message: {}
    };
  },
  computed: mapState(["userInfo", "user"]),
  watch: {
    user: function() {
      console.log(this.user);
    }
  },
  mounted() {
//  this.get_List();
    console.log(this.userInfo);
    if (this.userInfo) {
      this.myStatus = "我的";
    }
    // if (sessionStorage.getItem("Token")) {
    //   this.personName = sessionStorage.getItem("userInfo");
    //   console.log(this.personName);
    //   console.log(2222);
    // }
  },
  components: {},
  methods: {
    get_List() {
      this.$api.setInfo
        .get_info()
        .then(res => {
          // console.log(res.data);
          this.$store.dispatch("set_user", res.data);
          this.message = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    logOut: function() {
      this.$api.systemMangerment.get_loginOut().then(() => {
        let _this = this;
        this.$message({
          type: "success",
          message: "退出成功，您即将返回登录页面!",
          duration: 1000,
          onClose() {
            sessionStorage.removeItem("Token");
            _this.$router.push("/login");
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.top-header {
  min-width: 1200px;
}
.headLogo{
	height: 90px;
	display: flex;
	align-items: center;
	.headlogoMain{
		width: 1200px;
		margin: 0 auto;
	}
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.06);
	img{
		
	}
}
.wrap {
  height: 40px;
  background: #FFBB51;
  .head_row {
    width: 1200px;
    // height: 40px;
    margin: 0 auto;
    line-height: 40px;
    color: #ffffff;
    .selfbtn {
      border: 0;
      background: transparent;
      color: #fff;
      margin-left: 0;
    }
  }
  /*background: #FFFFFF;*/
}
.arrowbtn {
  border: 0;
  background: transparent;
  color: #fff;
  margin-left: 10px;
}
.mylabel {
  width: 340px;
  height: 366px;
  box-sizing: border-box;
  padding: 0;
  text-align: center;
  font-size: 16px;
  .useMess {
    margin-top: 15px;
    color: #333;
  }
  .l-number {
    height: 20px;
    line-height: 20px;
    margin: 5px 0;
    font-size: 14px;
    color: #333;
  }
  .classMes {
    margin-top: 5px;
  }
  img {
    width: 80px;
    height: 80px;
  }
  .baseIfo {
    font-size: 13px;
    color: #ccc;
  }
  .baseIfo_marg {
    margin: 0 10px;
  }
  .btnList {
    margin-top: 30px;
  }
  .btnList .el-button--text {
    font-size: 16px;
    color: #333;
  }
}
.qrCodeWrap {
  width: 160px;
  height: 160px;
  box-sizing: border-box;
  text-align: center;
  label {
    height: 22px;
    line-height: 22px;
    font-size: 16px;
    margin-top: 14px;
  }
}
.logo-search {
  width: 100%;
  height: 100px;
  background: #fff;
  .l_s {
    width: 1200px;
    min-width: 1200px;
    margin: 0 auto;
  }
  .left_ls {
    float: left;
    img,
    div {
      margin-top: 19px;
      width: 326px;
      height: 62px;
    }
  }
  .left_rt {
    float: right;
    width: 324px;
    line-height: 100px;
  }
}
.pic {
  width: 80px;
  height: 80px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin: 0 auto;
  cursor: pointer;
}

.logo-img-box {
  display: flex;
  align-items: center;
  .logo-img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
    border-radius: 50%;
  }
}
.head_row {
  display: flex;
  align-items: center;
  height: 40px;
}
.head-user {
  margin-left: auto;
}
// .logo_img{
//   background-position: left center;
//   background-size: contain;
//   background-repeat: no-repeat;
// }
</style>
