<template>
  <div class="container">
    <div class="my-info">
      <div class="info_bar">
        <ul>
          <li>毕业设计</li>
          <li>GRADUATION PROJECT</li>
        </ul>
      </div>
      <div class="info">
        <div class="tabNav over">
          <ul>
            <li class="fl" v-for="(item,index) in tabs" :class="{active:index == num}" @click="tab(index)" :key="index">
              <a>{{item}}</a>
            </li>
          </ul>
        </div>
        <div class="tbor">
          <div v-show="showCont==0" class="tabContent">
            <div class="step">
              <div class="circle circle_bg1" :class="{bg_sky:step_1==1}"></div>
              <div class="divider" :class="{bg_blue_sky:step_1==1}"></div>
              <div class="circle circle_bg2" :class="{bg_purple:step_2==1}"></div>
              <div class="divider"  :class="{bg_purple_line:step_2==1}"></div>
              <div class="circle circle_bg3" :class="{bg_blue:step_3==1}"></div>
              <div class="divider"  :class="{bg_blue_line:step_3==1}"></div>
              <div class="circle circle_bg4" :class="{bg_green:step_4==1}"></div>
              <div class="divider"  :class="{bg_green_line:step_4==1}"></div>
              <div class="circle circle_bg5" :class="{bg_red:step_5==1}"></div>
            </div>
            <div class="stepName">
              <span class="oneSpan">选题</span>
              <span>开题</span>
              <span>论文</span>
              <span>答辩</span>
              <span>学位</span>
            </div>
            <!-- //申请按钮-1 -->
            <div class="applyBtn" v-show="applyBtn==1">
              <p @click="tog" v-show="applyBtn_p1==1">{{staut}}</p>
              <p @click="againApplyGra" v-show="applyBtn_p3==1">{{staut_again}}</p>
              <p v-show="applyBtn_p2==1">{{staut_another}}</p>
            </div>

            <!-- 选题按钮-2 -->
            <div class="applyBtn" v-show="seleTitleBtn==1">
              <p @click="startChos">开始选题</p>
              <div class=" mt25">
                <span>选题截止日期:</span>
                <span> {{endTime_choose|passStu}}</span>
              </div>
            </div>
            <!-- 选题提交结果展示-  -->
            <div class="audit" v-show="TopicSub==1">
              <!-- 审核选题 -->
              <ul class="unpass">
                <li class="exceptLi">截止日期
                  <span>{{topic_resStu.endTime | passStu}}</span>
                </li>
                <li>选题方向
                  <span>{{topic_resStu.topicDirection}}</span>
                </li>
                <li>选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题
                  <span>{{topic_resStu.topicName}}</span>
                </li>
                <li>指导老师
                  <span>{{topic_resStu.teacherName}}</span>
                </li>
                <li>审核状态
                  <span>{{topic_resStu.auditStatus | myApplyStu}}</span>
                </li>
                <li class="sugCont" v-show="topic_resStu.auditStatus!==1">
                  <p style="float:left;">导师建议</p>
                  <div style="float:left;">{{topic_resStu.advise}}</div>
                </li>
                <li v-show="topic_resStu.auditStatus==1">开题时间
                  <span>{{topic_resStu.nextStepEndTime | passStu}}</span>
                </li>
              </ul>
              <p class="againChoose" v-show="topic_resStu.auditStatus==2" @click="startChos">重新选题</p>
            </div>
            
            <!-- 开题报告上传-3  -->
            <div class="upload" v-show="opening==1">
              <ul class="uplInfo">
                <li><i></i><span @click="upLoard = true">{{fileName}}</span></li>
                <li>支持DOC、DOCX格式附件，文件大小不超过50M</li>
                <li>开题报告上传截止日期：
                  <span>{{topic_resStu.createTime | passStu}}</span>
                </li>
              </ul>
              <el-upload class="upload-demo"
                ref="uploadOpen"
               :on-success="upSuccess"
               :headers="headers"
               :action="$api.global.url + 'api/student/paper/upload'"
               :show-file-list="false"
               :before-upload="filFile"
                v-show="firstUp==1"
                :auto-upload="false"
               >
                <el-button size="small" class="up_report" slot="trigger">上传开题报告</el-button>
                <el-button style="margin-left: 10px;" size="small" class="up_report"  @click="submitUpload">{{opSub}}</el-button>
              </el-upload>
            </div>
            <!-- 开题提交  -->
            <div class="audit" v-show="openingSub==1">
              <ul class="auditPass">
                <li class="exceptLi">截止日期
                  <span>{{openUp.endTime | passStu}}</span>
                </li>
                <li>开题报告
                  <span>{{openUp.attachmentName}}</span>
                </li>
                <li>指导老师
                  <span>{{openUp.teacherName}}</span>
                </li>
                <li>审核状态
                  <span>{{openUp.auditStatus | myApplyStu}}</span>
                </li>
                <li class="sugCont"  v-show="openUp.auditStatus!==0">
                  <p style="float:left;">导师建议</p>
                  <div style="float:left;">{{openUp.advise}}</div>
                </li>
                <li v-show="openUp.status==1">论文上传时间
                  <span>{{openUp.createTime | passStu}}</span>
                </li>
              </ul>
              <p class="againChoose" v-show="openUp.auditStatus==2" @click="openTopicDia">重新上传</p>
            </div>

            <!-- 论文上传-4  -->
            <div class="upload" v-show="topicUP==1">
              <ul class="uplInfo">
                <li><i></i><span @click="upLoard = true">{{topicName}}</span></li>
                <li>支持DOC、DOCX格式附件，文件大小不超过50M</li>
                <li>论文上传截止日期：
                  <span></span>
                </li>
              </ul>
              <el-upload class="upload-demo"
                ref="upload"
               :on-success="TopicupSucc"
               :headers="headers"
               :action="$api.global.url + 'api/student/paper/upload'"
               :show-file-list="false"
               :before-upload="filFile"
                v-show="TopicUpld==1"
                :auto-upload="false"
               >
                <el-button size="small" class="up_report" slot="trigger">上传论文</el-button>
                <el-button style="margin-left: 10px;" size="small" class="up_report"  @click="subTopicUpload">{{topSub}}</el-button>
              </el-upload>              
            </div>
            <!-- 论文提交  -->
            <div class="audit" v-show="Topicing==1">
              <!-- 审核上传 -->
              <ul class="unpass">
                <li class="exceptLi">截止日期
                  <span>{{topicAlert.endTime | passStu}}</span>
                </li>
                <li>论&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文
                  <span>{{topicAlert.attachmentName}}</span>
                </li>
                <li>指导老师
                  <span>{{topicAlert.teacherName}}</span>
                </li>
                <li>审核状态
                  <span>{{topicAlert.auditStatus | myApplyStu}}</span>
                </li>
                <li class="sugCont"  v-show="topicAlert.auditStatus!==0">
                  <p style="float:left;">导师建议</p>
                  <div style="float:left;">{{topicAlert.advise}}</div>
                </li>
                <li>论文上传时间
                  <span>{{topicAlert.nextStepEndTime | passStu}}</span>
                </li>
              </ul>
              <p class="againChoose"  v-show="topicAlert.auditStatus==2" @click="openPaper">重新上传</p>
            </div>

            <!-- 答辩-5 -->
            <div class="applyBtn" v-show="answer==1">
              <p  @click="applyAnswer">申请答辩</p>
              <div class=" mt25">
                <span>申请答辩截止日期:</span>
                <span>{{endTime_choose|passStu}}</span>
              </div>
            </div>

            <!-- 答辩申请 -->
            <div class="audit" v-show="answerRes==1">
              <!-- 审核中 -->
              <ul class="auditing">
                <li class="exceptLi">截止日期
                  <span>{{answer_res.discourseEndTime|passStu}}</span>
                </li>
                <li>答辩题目
                  <span>{{answer_res.paperTitle}}</span>
                </li>
                <li>指导老师
                  <span>{{answer_res.teacherName}}</span>
                </li>
                <li>审核状态
                  <span>{{answer_res.auditStatus | myApplyStu}}</span>
                </li>
                <li class="sugCont" v-show="answer_res.auditStatus==2">
                  <p style="float:left;">导师建议</p>
                  <div style="float:left;">{{answer_res.advise}}</div>
                </li>
              </ul>
              <ul class="auditing"  v-show="answer_res.auditStatus==1">
                <li>答辩时间
                  <span>{{answer_res.discourseEndTime}}</span>
                </li>
                <li>答辩地点
                  <span>{{answer_res.discourseAddress}}</span>
                </li>
                <li>答辩状态
                  <span>{{answer_res.discourseAuditStatus | answerPass_status}}</span>
                </li>
                <li>答辩评分
                  <span>{{answer_res.discourseScore}}</span>
                </li>
                <li v-show="answer_res.discourseAuditStatus==1">学位申请时间
                  <span>2018-09-01 12：00</span>
                </li>
              </ul>
              <!-- 申请答辩未通过 -->
              <p class="againChoose" v-show ="answer_res.auditStatus==2" @click="againApply_answer">重新申请答辩</p>
              <!-- 答辩未通过 -->
              <p class="againChoose" v-show ="answer_res.discourseAuditStatus==2">重新答辩</p>
            </div>

            
            <!-- 学位申请-6 -->
            <div class="applyBtn" v-show="aplDeg==1">
              <p @click="applyDegree">申请学位</p>
              <div class=" mt25">
                <span>申请学位截止日期:</span>
                <span> {{endTime_choose|passStu}}</span>
              </div>
            </div>
            <!-- 学位 -->
            <div class="audit" v-show="degreeStu==1">
              <!-- 审核中 -->
              <ul class="auditing">
                <li class="exceptLi">截止日期
                  <span>{{degree_res.endTime| passStu}}</span>
                </li>
                <li>审核状态
                  <span>{{degree_res.auditStatus | myApplyStu}}</span>
                </li>
                <li class="sugCont"  v-show="answer_res.auditStatus==2">
                  <p style="float:left;">导师建议</p>
                  <div style="float:left;">{{degree_res.advice}}</div>
                </li>
              </ul>
              <p class="againChoose" v-show="degree_res.auditStatus==2" @click="againAgree">重新申请学位</p>
              <!-- 申请学位通过  通过-->
            </div>
            <div class="audit" v-show="degreeSucc==1">
                <div class="congrat">恭喜你取得了学位！</div>
                <div class="alMes">请联系班主任领取学位证书</div>
            </div>
          
          </div>
          
          
          <!-- 历史记录 -->
          <div v-show="showCont==1" class="tabContent">
            <div class="process">
              <div class="single_pass"  :class="{single_notpass:step.auditStatus==2}"  v-for="(step,index) in his_step" :key="index">
                <div class="time">
                  <div class="dataStyle">
                    <p>{{step.updateTime | passStu_Y}}</p>
                    <p>{{step.updateTime | passStu_D}}</p>
                  </div>
                  <div class="circle" :class="{circle_2:step.auditStatus==2}">{{step.auditStatus |  myApplyStu}}</div>
                </div>
                <div class="statusDetail"  :class="{statusDetail_2:step.auditStatus==2}">
                  <div class="title"  v-show="step.auditStatus==1">{{step.step |  step_stu}}</div>
                  <div  v-show="step.auditStatus==1">
                    <!-- 通过的信息 -->
                    <div v-show="step.step==1">
                       <div class="flow">
                        <span>选题方向：</span>
                        <p>{{step.topicDirection}}</p>
                      </div>
                      <div class="flow">
                        <span>选&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                        <p>{{step.topicName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==2">
                      <div class="flow">
                        <span>开题报告</span>
                        <p>{{step.attachmentName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==3">
                      <div class="flow">
                        <span>论文题目</span>
                        <p>{{step.attachmentName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==4">
                      <div class="flow">
                        <span>答辩题目：</span>
                        <p>{{step.attachmentName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>答辩时间：</span>
                        <p>{{step.advise}}</p>
                      </div>
                      <div class="flow">
                        <span>答辩地点：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>答辩成绩：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==5">
                      <div class="flow">
                      </div>
                    </div>
                  </div>
                  <div class="statusDetail_2_box" v-show="step.auditStatus==2">
                    <div class="title">{{step.step |  step_stu}}</div>
                    <div v-show="step.step==1">
                      <div class="flow">
                        <span>选题方向：</span>
                        <p>{{step.topicDirection}}</p>
                      </div>
                      <div class="flow">
                        <span>选&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                        <p>{{step.topicName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==2">
                      <div class="flow">
                        <span>开题报告</span>
                        <p>{{step.attachmentName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==3">
                      <div class="flow">
                        <span>论文题目</span>
                        <p>{{step.attachmentName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==4">
                      <div class="flow">
                        <span>答辩题目：</span>
                        <p>{{step.attachmentName}}</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>{{step.advise}}</p>
                      </div>
                    </div>
                    <div v-show="step.step==5">
                      <div class="flow">
                        <span>拒绝原因：</span>
                        <p>{{step.teacher}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>

            <!--*************************************?-->

            <div class="process">
              <div class="single_pass">
                <div class="time">
                  <div class="dataStyle">
                    <p>2018</p>
                    <p>12-10</p>
                  </div>
                  <div class="circle">通过</div>
                </div>
                <div class="statusDetail">
                  <div class="title">开题</div>
                  <div>
                    <!-- 通过的信息 -->
                    <div>
                      <div class="flow">
                        <span>选题方向：</span>
                        <p>你好世界</p>
                      </div>
                      <div class="flow">
                        <span>选&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                        <p>今夜无眠</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>张三</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>好好哦哈哈</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="single_pass">
                <div class="time">
                  <div class="dataStyle">
                    <p>2018</p>
                    <p>12-10</p>
                  </div>
                  <div class="circle">通过</div>
                </div>
                <div class="statusDetail">
                  <div class="title">开题</div>
                  <!--<div>-->
                    <!--&lt;!&ndash; 通过的信息 &ndash;&gt;-->
                    <!--<div>-->
                      <!--<div class="flow">-->
                        <!--<span>选题方向：</span>-->
                        <!--<p>你好世界</p>-->
                      <!--</div>-->
                      <!--<div class="flow">-->
                        <!--<span>选&nbsp;&nbsp;&nbsp;&nbsp;题：</span>-->
                        <!--<p>今夜无眠</p>-->
                      <!--</div>-->
                      <!--<div class="flow">-->
                        <!--<span>指导老师：</span>-->
                        <!--<p>张三</p>-->
                      <!--</div>-->
                      <!--<div class="flow">-->
                        <!--<span>导师建议：</span>-->
                        <!--<p>好好哦哈哈</p>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div>-->
                      <!--<div class="flow">-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                </div>
              </div>

              <div class="single_pass">
                <div class="time">
                  <div class="dataStyle">
                    <p>2018</p>
                    <p>12-10</p>
                  </div>
                  <div class="circle">拒绝</div>
                </div>
                <div class="statusDetail statusDetail_2">

                  <div class="statusDetail_2_box">
                    <!-- 拒绝的信息 -->
                    <div class="title">开题</div>
                    <div>
                      <div class="flow">
                        <span>选题方向：</span>
                        <p>你好世界</p>
                      </div>
                      <div class="flow">
                        <span>选&nbsp;&nbsp;&nbsp;&nbsp;题：</span>
                        <p>今夜无眠</p>
                      </div>
                      <div class="flow">
                        <span>指导老师：</span>
                        <p>张三</p>
                      </div>
                      <div class="flow">
                        <span>导师建议：</span>
                        <p>好好哦哈哈第三方公司东方股份是大法官分公司电饭锅是的发个讽德诵功的感受到法国第三方公司对风格电饭锅是电饭锅山东分公司大方的方式告诉对方</p>
                      </div>
                    </div>
                    <div>
                      <div class="flow">
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            </div>
          </div>
        </div>
    </div>

    <!-- 申请弹框 -->
    <el-dialog title="温馨提示" :visible.sync="applyDialog" width="30%" left>
      <div class="dia_content">
        <p>{{graStatus | myApplyStu}}</p>
        <div v-show="graStatus==2">
          请等待审核，届时会以消息的形式通知你，请及时查看！
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btnstyle" @click="closedWin">知道了</button>
      </span>
    </el-dialog>
    <!-- 开始选题弹框 -->
    <el-dialog title="论文选题" :visible.sync="startChoose" width="45%" center>
      <div class="choosePrj">
        <!-- 默认选题 -->
        <div class="sp_one" v-for="(tinfo,index) in teacher" :key="index">
          <div @click="addClass(index,tinfo)">
            <p class="one_btn">{{tinfo.name}}
              <span>选题</span>
            </p>
          </div>
          <div class="one_display" v-bind:class="{ clickOpen:index==current}">
            <!-- 论文题目 -->
            <div class="s1"  :class="{show_c:tinfo.independentTopic==0}">
              <div v-for="(toc,index) in topic_1" :key="index">
                <h1>{{toc.direction}}</h1>
                <p>
                  <el-checkbox v-model="toc.check" :label="toc.id" @change="tocChange(toc, index)">
                    <span class="project" :data-id="toc.id" id="lilun" v-show="toc.type==2">{{toc.name}}</span>
                    <el-input v-model="toc.val" placeholder="请输入内容" v-show="toc.type==1"></el-input>
                  </el-checkbox>
                </p>
              </div>
            </div>
            <div class="btn" @click="topicSubmit()" v-show="chBtnstu==1">提交</div>
            <div v-show="notData==1">该老师未提供论文选题</div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 开题报告上传提示弹窗 -->
    <el-dialog title="提示" :visible.sync="upLoard" width="40%" height:300 left>
      <span class="upMoudle_span">重新上传，将会替换原文档，确认操作？</span>
      <div class="btnGroup">
        <button class="btnStyle" @click="upLoard = false">取 消</button>
        <button class="btnStyle" @click="sureUpload">确 定</button>
      </div>
    </el-dialog>
    
    <!-- 论文上传提示弹窗 -->
    <el-dialog title="提示" :visible.sync="upTopicLoard" width="40%" height:300 left>
      <span class="upMoudle_span">重新上传，将会替换原文档，确认操作？</span>
      <div class="btnGroup">
        <button class="btnStyle" @click="upTopicLoard = false">取 消</button>
        <button class="btnStyle" @click="sureTopicUpload">确 定</button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      applyDialog: false,
      tabs: ["毕业设计", "历史记录"],
      num: 0,
      showCont: 0,
      step_1: 0,
      step_2: 0,
      step_3: 0,
      step_4: 0,
      step_5: 0,
      staut: "申请毕业设计",
      staut_another: "",
      staut_again: "",
      graStatus: "",
      startChoose: false,
      //步骤状态
      currentStep: "",
      //步骤信息状态
      auditStatus: "",
      // 选题截止日期
      endTime_choose: "",
      // 毕业申请状态(status为请求参数)
      status: 2,
      // 初始申请状态
      applyBtn: 0,
      applyBtn_p1: 0,
      applyBtn_p2: 0,
      applyBtn_p3: 0,
      // 初始选题隐藏
      seleTitleBtn: 0,
      //导师列表
      teacher: [],
      // 点击选择当前导师
      teacherTopic: [],
      current: 0,
      //老师ID
      teacherId: "",
      // 选中的论文题目ID
      paperTopicId: "",
      // 选题
      topic_1: [],
      inpTopic: "",
      // 教师允许状态
      allowStu: "",
      input: "",
      tocId: "",
      // 选题结果查询
      topic_resStu: [],
      chBtnstu: 1,
      notData: 0,
      TopicSub: 0,
      // 2-开题
      upLoard: false,
      opSub: "提交",
      opening: 0,
      openNote: 0,
      headers: {
        Token: sessionStorage.getItem("Token")
      },
      fileName: "",
      topicName: "",
      wordPath: "",
      firstUp: 0,
      AgainUp: 0,
      alert_Up: 0,
      openingSub: 0,
      openUp: [], //开题报告上传查询结果
      //论文
      upTopicLoard: false,
      topSub: "提交",
      topicUP: 0,
      TopicUpld: 0,
      topicAlert: [], //论文上传查询结果
      Topicing: 0,
      topFileName: "",
      topWordPath: "", //论文上传地址
      //答辩
      answer: 0,
      answerRes: 0,
      answer_res: [], // 答辩结果
      //学位申请
      aplDeg: 0,
      degreeStu: 0,
      degree_res: [],
      degreeSucc: 0,
      // 历史记录
      his_step: []
    };
  },
  mounted() {
    // 判断当前毕设申请所处状态
    console.log("郑莹莹");
    this.query_step();
    this.history_step();
  },
  methods: {
    tab(index) {
      this.num = index;
      this.showCont = index;
    },

    query_step: function() {
      this.$api.applyGraduation.qurey_progress().then(res => {
        console.log(res.data);
        this.currentStep = res.data.currentStep;
        this.stepInfo = res.data.stepInfo;
        console.log(this.stepInfo);
        if (this.currentStep == 0) {
          this.step_1 = 0;
          this.step_2 = 0;
          this.step_3 = 0;
          this.step_4 = 0;
          this.step_5 = 0;
        } else if (this.currentStep == 1) {
          this.step_1 = 0;
        } else if (this.currentStep == 2) {
          this.step_1 = 1;
        } else if (this.currentStep == 3) {
          this.step_1 = 1;
          this.step_2 = 1;
        } else if (this.currentStep == 4) {
          this.step_1 = 1;
          this.step_2 = 1;
          this.step_3 = 1;
        } else if (this.currentStep == 5) {
          this.step_1 = 1;
          this.step_2 = 1;
          this.step_3 = 1;
          this.step_4 = 1;
        }
        if (this.currentStep == 0) {
          console.log("进入申请");
          if (res.data.stepInfo.auditStatus !== null) {
            this.auditStatus = res.data.stepInfo.auditStatus;
            if (this.auditStatus == 0) {
              console.log(11111);
              this.applyBtn_p1 = 0;
              this.applyBtn_p3 = 0;
              this.applyBtn_p2 = 1;
              this.staut_another = "申请中审核中。。。";
            } else if (this.auditStatus == 1) {
              this.applyBtn = 0;
            } else if (this.auditStatus == 2) {
              console.log(224545);
              this.applyBtn = 1;
              this.applyBtn_p1 = 0;
              this.applyBtn_p2 = 0;
              this.applyBtn_p3 = 1;
              this.staut_again = "请重新申请";
            } else {
              this.applyBtn = 1;
              this.applyBtn_p1 = 1;
            }
          } else {
            console.log("还没申请过");
            this.applyBtn = 1;
            this.applyBtn_p1 = 1;
          }
        } else if (this.currentStep == 1) {
          this.endTime_choose = res.data.stepInfo.endTime;
          if (res.data.stepInfo.auditStatus !== null) {
            this.topic_resStu = res.data.stepInfo;
            this.auditStatus = res.data.stepInfo.auditStatus;
            this.applyBtn = 0;
            this.seleTitleBtn = 1;
            this.auditStatus = res.data.stepInfo.auditStatus;
            if (this.auditStatus == 0) {
              console.log(11);
              this.TopicSub = 1;
              this.seleTitleBtn = 0;
            } else if (this.auditStatus == 1) {
              console.log(22);
              this.seleTitleBtn = 0;
              this.TopicSub = 1;
            } else if (this.auditStatus == 2) {
              console.log(33);
              this.seleTitleBtn = 0;
              this.TopicSub = 1;
            }
          } else {
            this.applyBtn = 0;
            this.seleTitleBtn = 1;
          }
          console.log("进入选题");
        } else if (this.currentStep == 2) {
          console.log("进入开题");
          this.endTime_choose = res.data.stepInfo.endTime;
          if (res.data.stepInfo.auditStatus !== null) {
            this.openUp = res.data.stepInfo;
            this.auditStatus = res.data.stepInfo.auditStatus;
            if (this.auditStatus == 0) {
              console.log("aaaa");
              this.openingSub = 1;
              this.opening = 0;
            } else if (this.auditStatus == 1) {
              console.log("bbbb");
            } else if (this.auditStatus == 2) {
              this.opening = 0;
              this.openingSub = 1;

              console.log("cccc");
            }
          } else {
            this.opening = 1;
            this.openNote = 1;
            this.firstUp = 1;
          }
        } else if (this.currentStep == 3) {
          console.log("进入论文");
          this.endTime_choose = res.data.stepInfo.endTime;
          if (res.data.stepInfo.auditStatus !== null) {
            this.topicAlert = res.data.stepInfo;
            this.auditStatus = res.data.stepInfo.auditStatus;
            if (this.auditStatus == 0) {
              console.log("aaaa");
              this.Topicing = 1;
            } else if (this.auditStatus == 1) {
              console.log("bbbb");
            } else if (this.auditStatus == 2) {
              this.Topicing = 1;

              console.log("cccc");
            }
          } else {
            this.topicUP = 1;
            this.TopicUpld = 1;
          }
        } else if (this.currentStep == 4) {
          console.log("进入答辩");
          this.endTime_choose = res.data.stepInfo.endTime;
          if (res.data.stepInfo.auditStatus !== null) {
            this.answer_res = res.data.stepInfo;
            console.log(this.answer_res);
            this.auditStatus = res.data.stepInfo.auditStatus;
            this.discourseAuditStatus = res.data.stepInfo.discourseAuditStatus;
            if (this.auditStatus == 0) {
              console.log(11);
              this.answer = 0;
              this.answerRes = 1;
            } else if (this.auditStatus == 1) {
              console.log(22);
              if (this.discourseAuditStatus == null) {
                this.answerRes = 1;
              } else if (this.discourseAuditStatus == 1) {
                this.answerRes = 1;
              } else if (this.discourseAuditStatus == 2) {
                this.answerRes = 1;
              }
            } else if (this.auditStatus == 2) {
              console.log(33);
              this.answer = 0;
              this.answerRes = 1;
            }
          } else {
            this.answer = 1;
          }
        } else if (this.currentStep == 5) {
          console.log("进入申请学位");
          this.endTime_choose = res.data.stepInfo.endTime;
          if (res.data.stepInfo.auditStatus !== null) {
            this.degree_res = res.data.stepInfo;
            console.log(this.answer_res);
            this.auditStatus = res.data.stepInfo.auditStatus;
            if (this.auditStatus == 0) {
              console.log(11);
              this.degreeStu = 1;
            } else if (this.auditStatus == 1) {
              console.log("再见");
              this.degreeSucc = 1;
            } else if (this.auditStatus == 2) {
              console.log(33);
              this.degreeStu = 1;
            }
          } else {
            this.aplDeg = 1;
          }
        }
      });
    },

    // 《1、申请毕设》
    //第一次申请毕设结果
    tog: function() {
      this.applyDialog = true;
      this.$api.applyGraduation.apply_step({ step: 0 }).then(res => {
        this.query_step();
        console.log(res.data);
      });
    },
    //第二次毕设申请
    againApplyGra: function() {
      this.applyDialog = true;
      this.$api.applyGraduation.apply_step({ step: 0 }).then(res => {
        this.query_step();
        console.log(res.data);
      });
    },
    // 关闭毕设申请提示弹窗打开开始选题按钮
    closedWin() {
      this.applyDialog = false;
      if (this.graStatus == 1) {
        this.applyBtn = 0;
        this.seleTitleBtn = 1;
      } else if (this.graStatus == 0) {
        this.applyBtn = 1;
        this.staut = "请点击重新申请";
      } else if (this.graStatus == 2) {
        this.applyBtn = 1;
        this.applyBtn_p1 = 0;
        this.applyBtn_p2 = 1;
        this.applyBtn_p3 = 0;
        this.staut_another = "申请中请等待。";
      }
    },

    // 《2、论文选题》
    // 导师列表
    startChos: function() {
      this.startChoose = true;
      this.$api.applyGraduation.teacher_list().then(res => {
        this.teacher = res.data;
        // 默认老师Id
        this.teacherId = res.data[0].id;
        console.log(this.teacherId);
        // 默认拿到第一个老师的数据
        this.$api.applyGraduation
          .teacher_Topic({ teacherId: this.teacherId })
          .then(res => {
            this.topic_1 = res.data;
            console.log(this.topic_1);
          });
      });
    },
    //1、选题
    // 点击选择当前老师
    addClass: function(index, tinfo) {
      this.current = index;
      this.teacherId = tinfo.id;
      // console.log(this.teacherId);
      this.$api.applyGraduation
        .teacher_Topic({ teacherId: this.teacherId })
        .then(res => {
          console.log(res);
        });
    },
    //改变选选题
    tocChange(row, ind) {
      let topic_1 = this.topic_1;
      topic_1.map((item, index) => {
        if (index !== ind) item.check = false;
      });
      this.topic_1 = [];
      this.topic_1 = topic_1;
      // console.log(ind, row, row.id);
    },
    // 提交选题
    topicSubmit: function() {
      let topicId = "";
      let topicName = undefined;
      let t = true;

      // this.topic_1.map(item => {
      //   if (item.check) {
      //     topicId = item.id;
      //     if (item.type === 1) {
      //       if (!item.val) t = false;
      //       topicName = item.val;
      //     }
      //   }
      // });
        this.topic_1.map(item => {
            if (item.check) {
                topicId = item.id;
                if (item.type === 1) {
                    if (!item.val) t = false;
                    topicName = item.val;
                }else if(item.type === 2){
                    topicName = item.name;
                }
            }
        });

      if (!topicId) {
        this.$message({
          type: "error",
          message: "请选择论文题目",
          duration: 1000
        });
        return;
      }
      if (!t) {
        this.$message({
          type: "error",
          message: "请填写论文题目",
          duration: 1000
        });
        return;
      }

      this.$api.applyGraduation
        .apply_step({ step: 1, topicId, topicName })
        .then(res => {
          if (res.resultCode == 1000) {
            this.$message({
              type: "success",
              message: "选题提交成功",
              duration: 1000
            });
            this.startChoose = false;
            // this.TopicSub = 1;
            // this.seleTitleBtn = 0;
            this.query_step();
          }
        });
    },
    // 《3、开题报告上传》
    // 限制文件格式和大小
    filFile(file) {
      console.log(file);
      this.fileName = file.name;
      this.topFileName = file.name;
      this.wordPath = file.webkitRelativePath;
      const isDOC = file.name.split(".")[1] === "doc";
      const isDOCX = file.name.split(".")[1] === "docx";
      const isLT10M = file.size / 1024 / 1024 < 50;
      if (!isDOC && !isDOCX) {
        this.$message({
          message: "上传报告必须是doc或docx 格式!",
          type: "error"
        });
      }
      if (!isLT10M) {
        this.$message({
          message: "上传报告大小不超过50MB!",
          type: "error"
        });
      }
      return (isDOC || isDOCX) && isLT10M;
    },
    // 开题报告上传
    submitUpload() {
      this.$refs.uploadOpen.submit();
    },
    // 开题报告上传成功
    upSuccess(res) {
      if (res.resultCode === 1000) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.opening = 0;
        this.openingSub = 1;
        this.wordPath = res.data;

        this.qureyUp();
      }
    },

    openTopicDia: function() {
      this.upLoard = true;
    },
    // 开题报告重新上传
    sureUpload: function() {
      this.upLoard = false;
      this.opening = 1;
      this.firstUp = 1;
      this.openingSub = 0;
      this.opSub = "重新上传";
    },
    // 开题报告提交结果
    qureyUp: function() {
      console.log(this.wordPath);
      this.$api.applyGraduation
        .apply_step({
          step: 2,
          attachmentName: this.fileName,
          attachmentUrl: this.wordPath
        })
        .then(res => {
          this.query_step();
        });
    },

    //  《4、论文上传》
    // 论文上传成功
    subTopicUpload: function() {
      this.$refs.upload.submit();
    },
    // 上传成功
    TopicupSucc(res) {
      if (res.resultCode === 1000) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.topicUP = 0;
        this.Topicing = 1;
        this.topWordPath = res.data;
        this.topic_submit();
      }
    },
    //提交
    topic_submit: function() {
      this.$api.applyGraduation
        .apply_step({
          step: 3,
          attachmentName: this.topFileName,
          attachmentUrl: this.topWordPath
        })
        .then(res => {
          this.query_step();
        });
    },
    openPaper: function() {
      this.upTopicLoard = true;
    },
    sureTopicUpload: function() {
      this.upTopicLoard = false;
      this.topicUP = 1;
      this.TopicUpld = 1;
      this.Topicing = 0;
      this.topSub = "重新上传";
    },
    // 《5、论文答辩》
    applyAnswer: function() {
      this.$api.applyGraduation.apply_step({ step: 4 }).then(res => {
        this.query_step();
      });
    },
    // 重新申请答辩
    againApply_answer: function() {
      this.$api.applyGraduation.apply_step({ step: 4 }).then(res => {
        this.query_step();
      });
    },
    // 《6、论文答辩》
    applyDegree: function() {
      this.$api.applyGraduation.apply_step({ step: 5 }).then(res => {
        this.query_step();
      });
    },
    againAgree: function() {
      this.applyDegree();
    },
    one_step: function() {
      this.$api.applyGraduation.itemIfo({ step: 1 }).then(res => {
        this.topic_resStu = res.data;
        this.TopicSub = 1;
      });
    },
    two_step: function() {
      this.$api.applyGraduation.itemIfo({ step: 2 }).then(res => {
        console.log(res.data);
        this.openUp = res.data;
        this.TopicSub = 1;
      });
    },
    thr_step: function() {
      this.$api.applyGraduation.itemIfo({ step: 3 }).then(res => {
        console.log(res.data);
        this.topic_resStu = res.data;
        this.openingSub = 1;
      });
    },
    four_step: function() {
      this.$api.applyGraduation.itemIfo({ step: 4 }).then(res => {
        console.log(res.data);
        this.topicAlert = res.data;
        this.Topicing = 1;
      });
    },
    fiv_step: function() {
      this.$api.applyGraduation.itemIfo({ step: 5 }).then(res => {
        console.log(res.data);
        this.answer_res = res.data;
        this.answerRes = 1;
      });
    },
    // 历史记录
    history_step: function() {
      this.$api.applyGraduation.history().then(res => {
        console.log(res.data);
        this.his_step = res.data;
      });
    }
  },
  filters: {
    myApplyStu: function(data) {
      if (data == 0) {
        return "申请中...";
      } else if (data == 1) {
        return "通过";
      } else if (data == 2) {
        return "拒绝";
      }
    },
    allowStatus: function(st) {
      if (st == 0) {
        return "不允许";
      } else if (st == 1) {
        return "允许";
      }
    },
    answerPass_status: function(re) {
      if (re == null) {
        return "未开始";
      } else if (re == 1) {
        return "及格";
      } else if (re == 2) {
        return "不及格";
      }
    },
    // 步骤过滤
    step_stu: function(d) {
      if (d == 1) {
        return "选题";
      } else if (d == 2) {
        return "开题";
      } else if (d == 3) {
        return "论文";
      } else if (d == 4) {
        return "答辩";
      } else if (d == 5) {
        return "学位申请";
      }
    },
    passStu: function(time) {
      // this.$fun.timeFormat(timeStr);
      let timeStr = new Date(time);
      // console.log(timeStr);
      let Y = timeStr.getFullYear() + "-";
      // console.log(Y);
      let M =
        (timeStr.getMonth() + 1 < 10
          ? "0" + (timeStr.getMonth() + 1)
          : timeStr.getMonth() + 1) + "-";
      // let D = timeStr.getDate() + " ";
      let D =
        timeStr.getDate() < 10
          ? "0" + timeStr.getDate() + " "
          : timeStr.getDate() + " ";
      // let h = timeStr.getHours() + ":";
      let h =
        timeStr.getHours() < 10
          ? "0" + timeStr.getHours() + ":"
          : timeStr.getHours() + ":";
      // let m = timeStr.getMinutes() + ":";
      let m =
        timeStr.getMinutes() < 10
          ? "0" + timeStr.getMinutes() + ":"
          : timeStr.getMinutes() + ":";
      // let s = timeStr.getSeconds();
      let s =
        timeStr.getSeconds() < 10
          ? "0" + timeStr.getSeconds()
          : timeStr.getSeconds();
      // console.log(Y + M + D + h + m + s);
      return Y + M + D + h + m + s;
    },
    passStu_Y: function(t) {
      let timeStr = new Date(t);
      let Y = timeStr.getFullYear();
      return Y;
    },
    passStu_D: function(d) {
      let dateStr = new Date(d);
      let m =
        (dateStr.getMonth() + 1 < 10
          ? "0" + (dateStr.getMonth() + 1)
          : dateStr.getMonth() + 1) + "-";
      let dd =
        dateStr.getDate() < 10
          ? "0" + dateStr.getDate() + " "
          : dateStr.getDate() + " ";
      return m + dd;
    }
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/graduation";
</style>
