<template>
    <div class="g-module">
        <div class="kf-head">
            <div class="kf-head-cap">
                <b>图书馆</b>
                <small>LIBRARY</small>
            </div>
        </div>
        <div class="bilding">开发中。。。</div>
        <div class="li-tabs"  v-if="false">
            <div class="li-tab li-tab1" :style="visibility === 0?'':'background: #e2e2e2;'" @click="checkVisibility(0)">书籍分类</div>
            <div class="li-tab li-tab2" :style="visibility === 0?'background: #e2e2e2;':''" @click="checkVisibility(1)">我的书籍</div>
        </div>
        <div class="li-con" v-show="visibility === 0?true:false"  v-if="false">
            <div class="li-con-babel" :style="showAll?'height:180px;':'height:100px;'">
                <div class="li-con-babel-lf">
                    <span>分类</span>
                </div>
                <div class="li-con-babel-main">
                    <ul class="li-con-babelItem">
                        <li class="li-con-babelItem-list" v-for="item in showList" :key="item.id">{{item.value}}</li>
                    </ul>
                </div>
                <!-- <div class="li-con-babel-rg"  @click="showAll =!showAll"> -->
                <div :class="showAll === false?'li-con-babel-rg icon1':'li-con-babel-rg icon2'"  @click="showAll =!showAll">
                    {{more}}
                </div>
            </div>
            <div class="li-con-bd f-cb">
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="li-con" v-show="visibility === 1?true:false" v-if="false">
            <div class="li-re">
                <div class="li-re-img">
                    <div class="li-re-image" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                </div>
                <div class="li-re-ov">
                    <div class="li-re-con">
                        <h1>马克思主义基本原理概论（上）</h1>
                        <b>作者：孟大爷</b>
                        <div class="li-re-dis">马克思主义基本原理是关于无产阶级和人类解放的科学，物质世界的本质及其发展，认识世界和改造世界，社会结构，社会发展规律与历史主体，资本主义的形成及其本质，资本主义的发展进程，社会主义制度的建立及其发展，共产主义是人类最崇高的社会理想等</div>
                    </div>
                    <div class="li-re-bt">
                        <button class="li-re-ok" @click="book_look">继续阅读</button>
                        <button class="li-re-no">取消加入</button>
                    </div>
                </div>
            </div>
            <div class="li-con-bd">
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
                <div class="li-listItem" @click="check_detail">
                    <div class="li-listItem-img" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                    <div class="li-listItem-bd">
                        <div class="li-listItem-cap">大学计算机基础</div>

                        <div class="li-listItem-ft">
                            <div class="li-listItem-count">1298</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="li-con" v-show="visibility ===2?true:false" v-if="false">
            <div class="li-curMy-bookLook">
                <div class="li-curMy-bookLook-bd">
                    <div class="li-curMy-bookLook-return" @click="book_return">返回目录</div>
                    <iframe src="http://ailehui.space/aaa.pdf" frameborder="0" class="li-curMy-bookLook-frame"></iframe>
                </div>
            </div>
        </div>
        <div class="li-con" v-show="visibility ===3?true:false" v-if="false">
            <div class="li-re">
                <div class="li-re-img">
                    <div class="li-re-image" :style="{backgroundImage: 'url('+require('../../assets/img/textbook.png')+')'}"></div>
                </div>
                <div class="li-re-ov">
                    <div class="li-re-con">
                        <h1>马克思主义基本原理概论（上）</h1>
                        <b>作者：孟大爷</b>
                        <div class="li-re-dis">马克思主义基本原理是关于无产阶级和人类解放的科学，物质世界的本质及其发展，认识世界和改造世界，社会结构，社会发展规律与历史主体，资本主义的形成及其本质，资本主义的发展进程，社会主义制度的建立及其发展，共产主义是人类最崇高的社会理想等</div>
                    </div>
                    <div class="li-re-bt">
                        <button class="li-re-ok" @click="book_look">继续阅读</button>
                        <button class="li-re-no">取消加入</button>
                    </div>
                </div>
            </div>
            <div class="li-dire f-cb">
                <div class="li-head">
                    <div class="li-head-cap">
                        <button class="li-dire-bt" :style="direShow === 0?'background-color: #6c8bfa':''" @click="tabDire(1)">目录</button>
                        <button class="li-dire-bt" :style="direShow === 1?'background-color: #6c8bfa':''" @click="tabDire(0)">书评</button>
                    </div>
                </div>
<!-- 书评 -->
                <div class="li-re f-cb" v-show="direShow ===0?true:false" v-if="false">
                    <div class="li-re-score">
                        <div class="score-digital">4.8</div>
                        <div class="score-star">
                            <el-rate v-model="value" disabled :colors="colors" text-color="#ff9900" score-template="{value}">
                            </el-rate>
                        </div>
                        <div class="score-status"  v-show="scoreOk === 0?true:false">已评分</div>
                        <div class="score-status score-status-icon" @click="dialogVisibleShow" v-show="scoreOk === 1?true:false">我要评价</div>
                    </div>
                    <div class="li-re-item f-cb">
                        <div class="li-re-listItem">
                            <img src="../../assets/img/Picture.png" alt="">
                            <div class="li-item-con">
                                <div class="li-item-head">
                                    <b>我的姓名</b>
                                    <el-rate v-model="value1" disabled :colors="colors" text-color="#ff9900" score-template="{value}"></el-rate>
                                </div>
                                <div class="li-con-dis">课程内容很专业，每个点都讲的很详细，对我的学习非常有帮助!</div>
                                <div class="li-con-ft">
                                    <div class="li-con-time">2018-06-22</div>
                                    <div class="li-con-when"> 学习10个课时评价</div>
                                </div>
                            </div>
                        </div>

                        <div class="li-re-listItem f-cb">
                            <img src="../../assets/img/photo1.png" alt="">
                            <div class="li-item-con">
                                <div class="li-item-head">
                                    <b>我的姓名</b>
                                    <el-rate v-model="value1" disabled :colors="colors" text-color="#ff9900" score-template="{value}"></el-rate>
                                </div>
                                <div class="li-con-dis">课程内容很专业，每个点都讲的很详细，对我的学习非常有帮助!</div>
                                <div class="li-con-ft">
                                    <div class="li-con-time">2018-06-22</div>
                                    <div class="li-con-when"> 学习10个课时评价</div>
                                </div>
                            </div>
                        </div>

                        <div class="li-re-listItem f-cb">
                            <img src="../../assets/img/Picture.png" alt="">
                            <div class="li-item-con">
                                <div class="li-item-head">
                                    <b>我的姓名</b>
                                    <el-rate v-model="value1" disabled :colors="colors" text-color="#ff9900" score-template="{value}"></el-rate>
                                </div>
                                <div class="li-con-dis">这个平台，真的让人能够去充实和发展，棒棒哒，特别喜欢里面的课程，以及老师的讲解，只要有兴趣的，都可以去学习，人生有此可以学习的机会，真的无有遗憾了。</div>
                                <div class="li-con-ft">
                                    <div class="li-con-time">2018-06-22</div>
                                    <div class="li-con-when"> 学习10个课时评价</div>
                                </div>
                            </div>
                        </div>

                        <div class="li-re-listItem f-cb">
                            <img src="../../assets/img/photo2.png" alt="">
                            <div class="li-item-con">
                                <div class="li-item-head">
                                    <b>我的姓名</b>
                                    <el-rate v-model="value1" disabled :colors="colors" text-color="#ff9900" score-template="{value}"></el-rate>
                                </div>
                                <div class="li-con-dis">内容很全，老师讲解的也很不错，美中不足的是部分课程中的疑难复杂点只讲了个大概。</div>
                                <div class="li-con-ft">
                                    <div class="li-con-time">2018-06-22</div>
                                    <div class="li-con-when"> 学习10个课时评价</div>
                                </div>
                            </div>
                        </div>

                        <div class="li-re-listItem f-cb">
                            <img src="../../assets/img/Picture.png" alt="">
                            <div class="li-item-con">
                                <div class="li-item-head">
                                    <b>我的姓名</b>
                                    <el-rate v-model="value1" disabled :colors="colors" text-color="#ff9900" score-template="{value}"></el-rate>
                                </div>
                                <div class="li-con-dis">课程内容很专业，每个点都讲的很详细，对我的学习非常有帮助!</div>
                                <div class="li-con-ft">
                                    <div class="li-con-time">2018-06-22</div>
                                    <div class="li-con-when"> 学习10个课时评价</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <el-dialog title="撰写《马克思主义基本原理概论》的评价" :visible.sync="dialogVisible" width="30%" center class="li-eva">
                        <span>总评</span>
                        <el-rate v-model="value3" show-text :colors="colors" :texts="texts" class="el-pro-rate">
                        </el-rate>
                        <b>评价内容</b>
                        <span class="li-prompt">最多输入200字</span>
                        <el-input type="textarea" :rows="9" class="li-pro-ta" placeholder="可以根据课程难易度、内容质量、视频质量几个维度进行评价哦~"></el-input>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>

                </div>
<!-- 目录 -->
    <bookLook  :headStatus="false" v-show="direShow ===1?true:false" v-if="false"></bookLook>
            </div>

        </div>
    </div>
</template>
<script>
import bookLook from "../../components/bookLook";
import "../../assets/css/library.less";
export default {
  data() {
    return {
      visibility: 0,
      scoreOk: 1,
      direShow: 0, //目录与书评切换显示，0显示书评、1显示目录
      value: 4.8,
      value1: 5.0,
      value3: null,
      texts: [
        "垃圾课程！回我青春！",
        "课程不值！拜拜了您嘞！",
        "一般般，学不到多少东西！",
        "满意！非常良心的课程了！",
        "推荐！课程非常棒！"
      ],
      dialogVisible: false,
      colors: ["#ff0000", "#ff0000", "#ff0000"],
      babelList: [
        {
          id: 0,
          value: "社会科学"
        },
        {
          id: 1,
          value: "社会科学"
        },
        {
          id: 2,
          value: "社会科学"
        },
        {
          id: 3,
          value: "社会科学"
        },
        {
          id: 4,
          value: "社会科学"
        },
        {
          id: 5,
          value: "社会科学"
        },
        {
          id: 6,
          value: "社会科学"
        },
        {
          id: 7,
          value: "社会科学"
        },
        {
          id: 8,
          value: "社会科学"
        },
        {
          id: 9,
          value: "社会科学"
        },
        {
          id: 10,
          value: "社会科学"
        },
        {
          id: 11,
          value: "社会科学"
        },
        {
          id: 12,
          value: "社会科学"
        },
        {
          id: 13,
          value: "社会科学"
        },
        {
          id: 14,
          value: "社会科学"
        },
        {
          id: 15,
          value: "社会科学"
        },
        {
          id: 160,
          value: "社会科学"
        },
        {
          id: 17,
          value: "社会科学"
        },
        {
          id: 18,
          value: "社会科学"
        },
        {
          id: 19,
          value: "社会科学"
        },
        {
          id: 20,
          value: "社会科学"
        }
      ],
      showAll: false
    };
  },
  computed: {
    showList: function() {
      if (this.showAll == false) {
        //当数据不需要完全显示的时候
        var showList = []; //定义一个空数组
        if (this.babelList.length > 10) {
          //这里我们先显示前三个
          for (var i = 0; i < 10; i++) {
            showList.push(this.babelList[i]);
          }
        } else {
          showList = this.babelList;
        }
        return showList; //返回当前数组
      } else {
        return this.babelList;
      }
    },
    more: function() {
      if (this.showAll == false) {
        return "更多";
      } else {
        return "收起";
      }
    }
  },
  components: {
    bookLook
  },
  methods: {
    book_look() {
      console.log("123");
      this.visibility = 2;
    },
    book_return() {
      this.visibility = 1;
    },
    check_detail() {
      this.visibility = 3;
    },
    dialogVisibleShow() {
      this.dialogVisible = true;
    },
    tabDire(type) {
      this.direShow = type;
    },
    checkVisibility(type) {
      this.visibility = type;
    }
  }
};
</script>
