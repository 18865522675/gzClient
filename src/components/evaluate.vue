<template>
  <div>
    <div class="kf-evaluate-head">
      <div class="kf-evaluate-rate-box">
        <div class="kf-evaluate-rate-number">{{extResult.totalSocre}}</div>
        <el-rate v-model="extResult.totalSocre" disabled></el-rate>
      </div>
      <div class="kf-evaluate-btn on" @click="evaluateShow" v-if="!extResult.star">我要评价</div>
      <div class="kf-evaluate-btn" v-else>已评价</div>
    </div>
    <div class="kf-evaluate-list">
      <div class="kf-evaluate-item" v-for="(item, index) in starsList" :key="index">
        <div class="kf-evaluate-img" :style="{backgroundImage: 'url('+(item.photo?$api.global.img+item.photo:require('../assets/img/Picture.png'))+')'}"></div>
        <div class="kf-evaluate-cont">
          <div class="kf-evaluate-hd">
            <div class="kf-evaluate-name">{{item.userName}}</div>
            <el-rate v-model="item.star" disabled></el-rate>
          </div>
          <div class="kf-evaluate-text">{{item.content}}</div>
          <div class="kf-evaluate-tit">{{$fun.time(item.createTime)}}</div>
        </div>
      </div>
    </div>

    <!--我要评价-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="650px"
      class="kf-dialog kf-evaDialog">
      <div class="kf-evaDialog-cap">总评</div>
      <el-rate
        v-model="form.star"
        show-text
        :texts="rateTexts"
        class="kf-evaDialog-rate">
      </el-rate>
      <div class="kf-evaDialog-cap">
        <span>评价内容</span>
        <span class="small">最多输入200个字</span>
      </div>
      <textarea class="kf-evaDialog-textarea" v-model.trim="form.content" maxlength="200" placeholder="可以从课程难易度，内容质量，视频质量几个维度进行评价哦~"></textarea>
      <div slot="footer" class="dialog-footer">
        <el-button @click="submit" :class="{none: !form.star||!form.content}">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import "../assets/css/curriculumLearning.less";
export default {
  data() {
    return {
      dialogVisible: false,
      rate: 0,
      rateTexts: [
        "极差。课程很糟糕，我要吐槽",
        "差。我对课程不满意",
        "中评。课程很一般",
        "良好。课程还可以",
        "推荐！课程非常棒"
      ],
      form: {
        star: "",
        content: ""
      },
      starsList: [],
      extResult: {}
    };
  },
  watch: {
    planId: function() {
      if (this.planId) {
        this.get_stars_list();
      }
    }
  },
  props: ["wareCourseId", "planId"],
  mounted() {},
  methods: {
    get_stars_list() {
      this.$api.curriculumLearning
        .get_stars_list({
          currentPage: 1,
          limitNum: 10000,
          wareCourseId: this.wareCourseId,
          planId: this.planId
        })
        .then(res => {
          if (res.data.results) this.starsList = res.data.results;
          if (res.data.extResult) this.extResult = res.data.extResult;
          this.starsList.map(item => {
            if (item.star) item.star = parseInt(item.star);
          });
          this.$emit("update:getList", this.starsList);
        })
        .catch(res => {
          console.log(res);
        });
    },
    stars_save() {
      this.$api.curriculumLearning
        .stars_save({
          wareCourseId: this.wareCourseId,
          ...this.form
        })
        .then(res => {
          this.get_stars_list();
        })
        .catch(res => {
          console.log(res);
        });
    },
    evaluateShow() {
      this.dialogVisible = true;
      this.form = {
        star: "",
        content: ""
      };
    },
    submit() {
      if (this.form.star && this.form.content) {
        this.stars_save();
        this.dialogVisible = false;
      }
    }
  }
};
</script>

<style lang="less">
</style>
