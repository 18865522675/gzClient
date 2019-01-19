<template>
  <div class="commonCourseCata">
    <!--未播放状态-->
    <div class="commonCourseCata-video" v-if="!videoUrl">
      <div class="commonCourseCata-video-shade">
        <div class="commonCourseCata-video-courseName">{{$route.params.courseName}}</div>
        <!--第一次学习-->
        <div v-if="!lastWareId">
          <div class="commonCourseCata-video-startstudy" @click="playVideo(wareList[0],true)">开始学习</div>
          <div class="commonCourseCata-video-beginstudy">未开始学习</div>
        </div>
        <!--不是第一次学习-->
        <div v-else>
          <div class="commonCourseCata-video-beginstudy">上次观看 : {{lastVideo.name}}</div>
          <div class="commonCourseCata-video-startstudy" @click="replay(lastVideo.playPosition,lastVideo.playUrl)">继续观看
          </div>
        </div>
      </div>

      <!--<div class="commonCourseCata-video-shade">-->
      <!--视频链接失效啦！！！！-->
      <!--</div>-->
    </div>
    <!--已播放状态-->
    <div class="hk-video-wrap" v-else>
      <video :src="videoUrl" ref="hkVideo" id="hkVideo" controls="controls" @loadstart="loadMethod" @error="errorMethod"
             class="hk-ware-video" v-show="videoCanUse"></video>
      <div class="videoNoUse" v-show="!videoCanUse">
        很抱歉，您访问的视频连接失效了
      </div>
      <div class="commonCourseCata-autoPlay">
        <span>自动播放</span>
        <el-switch
          v-model="autoPlay"
          active-color="#13ce66"
          @change="autoPlayChange">
        </el-switch>
      </div>
    </div>


    <div class="commonCourseCata-content">
      <ul class="commonCourseCata-content-header">
        <li :class="typeList ==1?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'"
            @click="msgList(1)">目录
        </li>
        <li :class="typeList ==2?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'"
            @click="msgList(2)">习题
        </li>
        <li :class="typeList ==3?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'"
            @click="msgList(3)">笔记
        </li>
        <li :class="typeList ==4?'commonCourseCata-content-header-items-active':'commonCourseCata-content-header-items'"
            @click="msgList(4)">留言
        </li>
      </ul>
      <!--教师目录-->
      <!--教师目录-->
      <ul class="commonCourseCata-content-cata" v-if="typeList ===1" v-loading="wareLoading">
        <li class="commonCourseCata-content-cata-one" v-for="(item,index) in wareList" :key="index"
            @mouseover="wareItemAction(index,true)" @mouseout="wareItemAction(index,false)">
          <div class="commonCourseCata-content-cata-one-left">
            <span class="commonCourseCata-content-cata-one-round"></span>
            <span class="commonCourseCata-content-cata-one-title">{{item.name}}</span>
          </div>
          <div class="commonCourseCata-content-cata-one-time">
                        <span class="commonCourseCata-content-cata-one-timeplay" v-if="item.id==nowVideoId">
                            <span class="playingGif">
                                <img src="../../assets/img/playing.gif" style="width:100%;height:100%" alt="">
                            </span>
                        </span>
            <div v-else>
              <!--未划过-->
              <div v-show="!item.isShowSee">
                            <span class="commonCourseCata-content-cata-one-timeplay">
                            <img src="../../assets/img/common_course_cata_play.png" alt=""
                                 class="commonCourseCata-content-cata-one-timeplay-img">
                        </span>
                <span class="commonCourseCata-content-cata-one-timeplay-time">{{calWareTime(item.duration)}}</span>
              </div>

              <!--划过-->
              <span class="commonCourseCata-content-cata-one-timeplay" @click="playVideo(item)"
                    v-show="item.isShowSee&&item.playTime!=item.duration">
                            <div class="kf-startPlay-btn">
                                开始播放
                            </div>
                        </span>
              <span class="commonCourseCata-content-cata-one-timeplay" @click="playVideo(item,null,true)"
                    v-show="item.isShowSee&&item.playTime==item.duration">
                            <div class="kf-startPlay-btn">
                                继续播放
                            </div>
                        </span>
            </div>
          </div>
        </li>
      </ul>

      <!--教师习题-->
      <div v-if="typeList ===2&&userInfo.clientRoleType===2">
        <div class="hk-in-search-bd">
          <div class="hk-in-search">
            <input type="text" v-model="taskSearchVal" class="hk-in-search-in" placeholder="请输入学生昵称或手机号">
            <div class="hk-in-search-btn" @click="getThProList">搜索</div>
          </div>
        </div>
        <div class="commonCourseCata-content-pro" v-show="thProShow" v-if="typeList ===2&&userInfo.clientRoleType===2"
             v-for="(item,index) in proThList"
             :key="index">
          <div class="commonCourseCata-content-pro-one" @click="thCourseDownPro(item.id)">
            <div class="commonCourseCata-content-pro-one-left">
                            <span class="commonCourseCata-content-pro-one-round"
                                  :style="{backgroundImage: 'url('+$config.HOST_API+item.avatar+')'}"
                                  v-if="item.avatar"></span>
              <span class="commonCourseCata-content-pro-one-round"
                    :style="{backgroundImage: 'url('+require('../../assets/img/course_pro_userphoto.png')+')'}"
                    v-else></span>
              <span class="commonCourseCata-content-pro-one-title">{{item.nick }}</span>
            </div>
            <div class="commonCourseCata-content-pro-one-time">
              <!--<img src="../../assets/img/common_course_cata_play.png" alt="" class="commonCourseCata-content-cata-one-time-img">-->
              <span class="commonCourseCata-content-pro-one-timeplay">
                                <img src="../../assets/img/tri.png" alt=""
                                     class="commonCourseCata-content-pro-one-timeplay-img">
                            </span>
            </div>
          </div>
          <ul class="commonCourseCata-content-pro-down" v-show="thShowPro===item.id">
            <li :class="item.id?'commonCourseCata-content-pro-down-one':'commonCourseCata-content-pro-down-click'"
                v-for="(item,index) in proThExeList" :key="index">
              <div class="commonCourseCata-content-pro-down-one-left">
                <span
                  :class="!item.id?'commonCourseCata-content-pro-down-one-round-orange':'commonCourseCata-content-pro-down-one-round'"></span>
                <span class="commonCourseCata-content-pro-down-one-title">{{item.name}}</span>
              </div>
              <div class="commonCourseCata-content-pro-down-one-time-orange" v-if="!item.id">未完成</div>
              <div class="commonCourseCata-content-pro-down-one-time" v-else @click="proThDetailClick(item.id)">已完成
              </div>
            </li>
          </ul>
        </div>
        <div v-if="proThList.length===0" style="text-align: center;padding-top: 20px">暂无学生</div>
      </div>
      <!--教师题目-->
      <div class="commonCourseCata-content-pro-datail" v-show="thProDetail" v-if="userInfo.clientRoleType===2">
        <div class="commonCourseCata-content-pro-datail-title">
          <div class="commonCourseCata-content-pro-datail-title-left">
                        <span class="commonCourseCata-content-pro-datail-title-left-img"
                              :style="{backgroundImage: 'url('+$config.HOST_API+infor.avatar+')'}"
                              v-if="infor.avatar"></span>
            <span class="commonCourseCata-content-pro-datail-title-left-img"
                  :style="{backgroundImage: 'url('+require('../../assets/img/course_pro_userphoto.png')+')'}"
                  v-else></span>
            <span class="commonCourseCata-content-pro-datail-title-left-name">{{infor.nick}}·{{infor.taskName}}</span>
          </div>
          <div class="commonCourseCata-content-pro-datail-title-right">
            <span class="commonCourseCata-content-pro-datail-title-right-img"></span>
            <span class="commonCourseCata-content-pro-datail-title-right-name"
                  @click="thProDetailBack">返回目录</span>
          </div>
        </div>
        <div class="comCourCata-content-pro-detail-sub">
          <div v-for="(item, index) in exercisesForm" :key="index">
            <!--单选题-->
            <div v-if="item.name==='单选'">
              <div class="comCourCata-content-pro-detail-subType">{{item.number}}、单选题</div>

              <div class="comCourCata-content-pro-detail-cont" v-for="(exeItem, exeIndex) in item.value"
                   :key="exeIndex">
                <div class="comCourCata-content-pro-detail-ques">{{exeIndex+1}}、{{exeItem.content}}</div>
                <div class="comCourCata-content-pro-detail-ans f-cb">
                  <label class="comCourCata-content-pro-detail-ans-form-checkBox"
                         v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                    <input type="radio" :name="'singleElection_'+exeIndex" v-model="exeItem.check" :value="optItem.name"
                           :disabled="userInfo.clientRoleType===2"/>
                    <i class="comCourCata-content-pro-select">{{optItem.name}}</i>
                    <span class="comCourCata-content-pro-select-ans-content">{{optItem.label}}</span>
                  </label>
                </div>
              </div>
            </div>

            <!--多选题-->
            <div v-if="item.name==='多选'">
              <div class="comCourCata-content-pro-detail-subType">{{item.number}}、多选题</div>

              <div class="comCourCata-content-pro-detail-cont pro-mutil" v-for="(exeItem, exeIndex) in item.value"
                   :key="exeIndex">
                <div class="comCourCata-content-pro-detail-ques">{{exeIndex+1}}、{{exeItem.content}}</div>
                <div class="comCourCata-content-pro-detail-ans  f-cb">
                  <label class="comCourCata-content-pro-detail-ans-form-checkBox"
                         v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                    <input type="checkbox" :name="'multiSelection_'+exeIndex" v-model="exeItem.check"
                           :value="optItem.name" :disabled="userInfo.clientRoleType===2"/>
                    <i class="comCourCata-content-pro-select">{{optItem.name}}</i>
                    <span class="comCourCata-content-pro-select-ans-content">{{optItem.label}}</span>
                  </label>
                </div>
              </div>
            </div>

            <!--判断题-->
            <div v-if="item.name==='判断'">
              <div class="comCourCata-content-pro-detail-subType">{{item.number}}、判断</div>

              <div class="comCourCata-content-pro-detail-cont" v-for="(exeItem, exeIndex) in item.value"
                   :key="exeIndex">
                <div class="comCourCata-content-pro-detail-ques">{{exeIndex+1}}、{{exeItem.content}}</div>
                <div class="comCourCata-content-pro-detail-ans f-cb">
                  <label class="comCourCata-content-pro-detail-ans-form-checkBox"
                         v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                    <input type="radio" :name="'judge_'+exeIndex" v-model="exeItem.check" :value="optItem.label"
                           :disabled="userInfo.clientRoleType===2"/>
                    <i class="comCourCata-content-pro-select"></i>
                    <span class="comCourCata-content-pro-select-ans-content">{{optItem.label}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--学生习题-->
      <div v-if="typeList===2&&userInfo.clientRoleType===1">
        <ul class="commonCourseCata-content-pro-down-stu" v-show="proShowStu"
            v-if="typeList===2&&userInfo.clientRoleType===1">
          <li class="commonCourseCata-content-pro-down-one-stu"
              v-for="(item,index) in proStuList" :key="index">
            <div class="commonCourseCata-content-pro-down-one-left">
              <span
                :class="(item.id===null)?'commonCourseCata-content-pro-down-one-round-orange':'commonCourseCata-content-pro-down-one-round'"></span>
              <span class="commonCourseCata-content-pro-down-one-title">{{item.name}}</span>
            </div>
            <div class="commonCourseCata-content-pro-down-one-time-orange" v-if="!item.id"
                 @click="proDetailClickStuReady(item.taskId)">未完成
            </div>
            <div class="commonCourseCata-content-pro-down-one-time" v-else>已完成
            </div>
          </li>
        </ul>
        <div v-if="proStuList.length===0" style="text-align: center;padding-top: 20px">暂无习题</div>
      </div>

      <!--学生题目-->
      <div class="commonCourseCata-content-pro-datail" v-show="proDetail" v-if="userInfo.clientRoleType===1">
        <div class="commonCourseCata-content-pro-datail-title">
          <div class="commonCourseCata-content-pro-datail-title-left">
                        <span class="commonCourseCata-content-pro-datail-title-left-img"
                              :style="{backgroundImage: 'url('+$config.HOST_API+inforStu.avatar+')'}"
                              v-if="inforStu.avatar"></span>
            <span class="commonCourseCata-content-pro-datail-title-left-img"
                  :style="{backgroundImage: 'url('+require('../../assets/img/course_pro_userphoto.png')+')'}"
                  v-else></span>
            <span
              class="commonCourseCata-content-pro-datail-title-left-name">{{inforStu.nick}}·{{inforStu.taskName}}</span>
          </div>
          <div class="commonCourseCata-content-pro-datail-title-right">
            <span class="commonCourseCata-content-pro-datail-title-right-img"></span>
            <span class="commonCourseCata-content-pro-datail-title-right-name"
                  @click="proDetailBack">返回目录</span>
          </div>
        </div>

        <div class="comCourCata-content-pro-detail-sub">
          <div v-for="(item, index) in exercisesForm" :key="index">
            <!--单选题-->
            <div v-if="item.name==='单选'">
              <div class="comCourCata-content-pro-detail-subType">{{item.number}}、单选题</div>

              <div class="comCourCata-content-pro-detail-cont" v-for="(exeItem, exeIndex) in item.value"
                   :key="exeIndex">
                <div class="comCourCata-content-pro-detail-ques">{{exeIndex+1}}、{{exeItem.content}}</div>
                <div class="comCourCata-content-pro-detail-ans f-cb">
                  <label class="comCourCata-content-pro-detail-ans-form-checkBox"
                         v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                    <input type="radio" :name="'singleElection_'+exeIndex" v-model="exeItem.check"
                           :value="optItem.name"/>
                    <i class="comCourCata-content-pro-select">{{optItem.name}}</i>
                    <span class="comCourCata-content-pro-select-ans-content">{{optItem.label}}</span>
                  </label>
                </div>
              </div>
            </div>

            <!--多选题-->
            <div v-if="item.name==='多选'">
              <div class="comCourCata-content-pro-detail-subType">{{item.number}}、多选题</div>

              <div class="comCourCata-content-pro-detail-cont pro-mutil" v-for="(exeItem, exeIndex) in item.value"
                   :key="exeIndex">
                <div class="comCourCata-content-pro-detail-ques">{{exeIndex+1}}、{{exeItem.content}}</div>
                <div class="comCourCata-content-pro-detail-ans f-cb">
                  <label class="comCourCata-content-pro-detail-ans-form-checkBox"
                         v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                    <input type="checkbox" :name="'multiSelection_'+exeIndex" v-model="exeItem.check"
                           :value="optItem.name"/>
                    <i class="comCourCata-content-pro-select">{{optItem.name}}</i>
                    <span class="comCourCata-content-pro-select-ans-content">{{optItem.label}}</span>
                  </label>
                </div>
              </div>
            </div>

            <!--判断题-->
            <div v-if="item.name==='判断'">
              <div class="comCourCata-content-pro-detail-subType">{{item.number}}、判断</div>

              <div class="comCourCata-content-pro-detail-cont" v-for="(exeItem, exeIndex) in item.value"
                   :key="exeIndex">
                <div class="comCourCata-content-pro-detail-ques">{{exeIndex+1}}、{{exeItem.content}}</div>
                <div class="comCourCata-content-pro-detail-ans f-cb">
                  <label class="comCourCata-content-pro-detail-ans-form-checkBox"
                         v-for="(optItem, optIndex) in exeItem.options" :key="optIndex">
                    <input type="radio" :name="'judge_'+exeIndex" v-model="exeItem.check" :value="optItem.label"/>
                    <i class="comCourCata-content-pro-select"></i>
                    <span class="comCourCata-content-pro-select-ans-content">{{optItem.label}}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="exercises-btn" @click="exercisesSubmit">提交</div>
        </div>

      </div>


      <!--笔记-->
      <ul class="commonCourseCata-content-cata" v-show="showNoteVisible" v-if="typeList ===3">
        <!--学生-->
        <!--学生写笔记-->
        <div>
          <div class="cc-msg-add" v-show="stuAddNote">
            <input type="text" class="cc-msg-tit" v-model="noteForm.title" placeholder="请输入标题">
            <textarea rows="6" class="cc-msg-input" v-model="noteForm.content"
                      placeholder="在此输入你的想法......"></textarea>
            <div class="cc-msg-footer">
              <div class="cc-ft-msg">您已输入{{noteForm.content.length}}/200个字符</div>
              <div class="cc-ft-btn" @click="submitNote">提交</div>
            </div>
          </div>

          <!--学生笔记列表-->
          <div class="cc-msg-list" v-show="stuNoteListVisible&&userInfo.clientRoleType === 1">
            <div class="cc-msg-list-tit">
              <div class="cc-msg-list-btn" @click="addNote">写笔记</div>
            </div>
            <div class="cc-msg-list-con">
              <div class="cc-msg-list-item" v-for="(item,index) in noteList" :key="index"
                   @click="stuNoteShow(item)">
                <div class="cc-msg-item-left">{{item.createTime|formatDate1}}</div>
                <div class="cc-msg-item-right">
                  <div class="cc-msg-item-tit">{{item.title}}</div>
                  <div class="cc-msg-item-des">{{item.content}}</div>
                </div>
              </div>

              <!--<div class="css-msg-spread" v-if="msgDetailList.length>6" @click="changeSpread">-->
              <div class="css-msg-spread" v-show="noteListParams.length>4" @click="changeSpread">
                <span>{{spreadVisible?'收起':'展开全部笔记'}}</span>
              </div>
            </div>
          </div>
          <!--学生笔记详情-->
          <div class="cc-msg-add" v-show="stuNoteDetail">
            <input type="text" class="cc-msg-tit" v-model="noteDetailForm.title" disabled>
            <textarea rows="6" class="cc-msg-input" v-model="noteDetailForm.content" disabled></textarea>
            <div class="cc-msg-footer">
              <!--<div class="cc-ft-msg">您已输入180/200个字符</div>-->
              <div class="cc-ft-btn" @click="returnNoteList">返回</div>
            </div>
          </div>
        </div>
        <!--教师-->
        <!--教师笔记列表-->
        <div class="tea-note-wrap">
          <div class="commonCourseCata-content-pro"
               v-show="teaNoteListVisible&&userInfo.clientRoleType === 2">
            <div class="hk-in-search-bd">
              <div class="hk-in-search">
                <input type="text" v-model="noteSearchVal" class="hk-in-search-in" placeholder="请输入学生昵称或手机号">
                <div class="hk-in-search-btn" @click="getStuNoteList">搜索</div>
              </div>
            </div>
            <div v-for="(item,index) in studentList" :key="index">
              <div class="commonCourseCata-content-pro-one" @click="courseDown(item.id)">
                <div class="commonCourseCata-content-pro-one-left">
                                    <span class="commonCourseCata-content-pro-one-round"
                                          :style="{backgroundImage: 'url('+(item.avatar?$config.HOST_API+item.avatar:require('../../assets/img/photo.png'))+')'}"></span>
                  <span class="commonCourseCata-content-pro-one-title">{{item.nick }}</span>
                </div>
                <div class="commonCourseCata-content-pro-one-time">
                  <!--<img src="../../assets/img/common_course_cata_play.png" alt="" class="commonCourseCata-content-cata-one-time-img">-->
                  <span class="commonCourseCata-content-pro-one-timeplay">
                            <img src="../../assets/img/course_pro_down.png" alt=""
                                 class="commonCourseCata-content-pro-one-timeplay-img">
                        </span>
                </div>
              </div>
              <div v-if="studentList.length===0">暂无学生</div>
              <ul class="commonCourseCata-content-pro-down" v-show="showPro===item.id">
                <li class="commonCourseCata-content-pro-down-one" @click="teaNoteDetailFun(item.id)"
                    v-for="(item,index) in teaNoteList" :key="index">
                  <div class="commonCourseCata-content-pro-down-one-left">
                    <span class="commonCourseCata-content-pro-down-one-round"></span>
                    <span class="commonCourseCata-content-pro-down-one-title">{{item.title }}</span>
                  </div>
                  <div class="commonCourseCata-content-pro-down-one-time">已完成</div>
                </li>
              </ul>
              <div v-if="teaNoteList.length===0" v-show="showPro1===item.id" style="text-align: center;height: 50px;line-height: 50px">暂无笔记</div>
            </div>

            <div v-if="studentList.length===0" style="text-align: center;padding-top: 20px">暂无学生</div>

            <div class="commonCourseCata-content-pro-one-last" @click="spreadTeaStuList" v-show="studentListParams>6">
              {{spreadTeaStuVisible?"收起":"展开全部目录"}}
            </div>

          </div>
        </div>
      </ul>

      <!--教师笔记详情-->
      <div class="cc-msg-add" v-show="teaNoteDetailShow&&userInfo.clientRoleType === 2">
        <div class="cc-msg-tit-th">{{teaNoteDetail.title }}</div>
        <div class="cc-msg-input-th">
          {{teaNoteDetail.content}}
        </div>
        <div class="cc-msg-footer">
          <div class="cc-ft-btn cc-msg-back" @click="teaNoteDetailFunBack">返回</div>
        </div>
      </div>


      <!--学生留言-->
      <ul class="commonCourseCata-content-cata ul-bg" v-if="typeList ===4&&userInfo.clientRoleType ===1">
        <div>
          <div class="cc-lm-crap">
            <div class="cc-lm-input" :class="{on:topShow}" @blur="topShow = false">
                            <textarea class="cc-input-con" :class="{oon:topShow}" @focus="topShow =true"
                                      v-model="StuQuiz" placeholder="请写下您的留言,不超过200个字符"
                                      onKeyUp="if(this.value.length > 200) this.value=this.value.substr(0,200)"></textarea>
              <div class="lm-btn" @click="addQuiz">写留言</div>
            </div>
          </div>
          <div class="lm-items">
            <div class="lm-item" v-for="(item,index) in quizList" :key="index"
                 :style="{backgroundImage: 'url('+(item.avatar?$config.HOST_IMG+item.avatar:require('../../assets/img/photo.png'))+')'}">
              <div class="lm-item-top">
                <div class="lm-item-top-name">{{item.nick }}</div>
                <div class="lm-item-top-time">{{item.askTime|formatDate}}</div>
                <div class="lm-item-top-del" @click="delAnser(item.id)">删除</div>
              </div>
              <div class="lm-item-mid">{{item.askContent}}</div>
              <!--<div class="lm-item-bots" >-->
              <div class="lm-item-bots" v-show="item.answerContent">
                <div class="lm-item-bot" @click="anserShowFun(item.id,item.answerTime)">{{anserShow ===
                  item.answerTime?'收起回复':'展开回复'}}
                </div>
                <!--<div class="lm-item-anser" @click="otherShowFun">回复</div>-->
              </div>
              <div class="lm-item-spread" v-show="thanserShow === item.id&&anserShow">
                <!--<div class="cc-lm-other" v-show="otherShow">-->
                <!--<textarea class="cc-input-other" placeholder="写下您的留言"></textarea>-->
                <!--<div class="lm-btn-other">写留言</div>-->
                <!--</div>-->
                <div class="lm-spread-item">
                  <div class="lm-spread-img"></div>
                  <div class="lm-spread-item-con">{{item.answerName}}老师：{{item.answerContent}}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </ul>

      <!--教师回复-->
      <div class="commonCourseCata-content-cata ul-bg mb80" v-if="typeList === 4&&userInfo.clientRoleType===2">
        <div class="lm-items lm-items-top">
          <div class="lm-item" v-for="(item,index) in quizList" :key="index"
               :style="{backgroundImage: 'url('+(item.avatar?item.avatar:require('../../assets/img/photo.png'))+')'}">

            <div class="lm-item-top">
              <div class="lm-item-top-name">{{item.nick }}</div>
              <div class="lm-item-top-time">{{item.askTime | formatDate}}</div>
              <!--<div class="lm-item-top-del" @click="delAnser">删除</div>-->
            </div>
            <div class="lm-item-mid">{{item.askContent }}</div>
            <div class="lm-item-bots">
              <div class="lm-item-bot" @click="anserShowFun(item.id,item.answerTime)">{{item.answerTime?(anserShow ===
                item.answerTime?"收起回复":"展开回复"):"无回复"}}
              </div>
              <div class="lm-item-anser" @click="thotherShowFunNo(item.id,item.answerTime)">回复</div>
              <!--<div class="lm-item-anser" @click="thotherShowFun"></div>-->
            </div>

            <div class="lm-item-spread" v-show="thReplyShow ===item.id">
              <div class="cc-lm-other">
                                <textarea class="cc-input-other" placeholder="写下您的回复"
                                          v-model="answerContent"></textarea>
                <div class="lm-btn-other" @click="teaAnswer(item.id)">写回复</div>
              </div>
            </div>
            <div class="lm-item-spread" v-show="thanserShow === item.id&&anserShow">
              <div class="lm-spread-item">
                <div class="lm-spread-img"></div>
                <div class="lm-spread-item-con">{{item.answerName }}老师：{{item.answerContent }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="quizList.length===0" style="text-align: center">暂无留言</div>
      </div>
    </div>

    <div class="dia-del" v-if="delVisible">
      <div class="dia-del-tit">温馨提示:</div>
      <div class="dia-del-con">您确定删除此留言么？</div>
      <div class="dia-del-ft">
        <div class="dia-btn dia-btn1" @click="canDel">取消</div>
        <div class="dia-btn dia-btn2" @click="deleteQuiz">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/css/commonCourseCata.less";
import { mapState } from "vuex";
import { formatDate } from "../../components/filters.js";

export default {
  data() {
    return {
      taskSearchVal: "",
      noteSearchVal: "",
      autoPlay: false,
      typeList: 1,
      current: 1,
      limitNum: 10,
      total: 10,
      show: false,
      show1: true,
      showPro: false,
      showPro2: false,
      proDetail: false,
      proShow: true,
      proShowStu: true,
      msgVisible: false,
      spreadVisible: false,
      msgViewVisible: false,
      anserShow: null,
      topShow: false,
      delVisible: false,
      itemVisible: false,
      otherShow: false,
      msgDetailList: [],
      reply: true,
      thanserShow: false,
      thReplyShow: null,
      thReplyShowParams: null,
      showNoteVisible: false,
      stuNoteListVisible: true, //学生笔记列表展示
      stuNoteDetail: false, //学生笔记详情
      stuAddNote: false, //添加学生笔记
      spreadTeaStuVisible: false,
      id: this.$router.history.current.params.id,
      noteList: {},
      noteForm: {
        title: "",
        content: "",
        courseId: this.$router.history.current.params.id
      },
      noteDetailForm: {
        title: "",
        content: ""
      },
      quizList: [],
      teaNoteListVisible: false, //教师笔记列表
      StuQuiz: "", //新增留言
      delQuizId: null, //删除的留言id
      answerContent: null, //回复内容
      studentList: [], //教师列表
      studentListParams: [],
      teaNoteList: [], //对应学生的留言列表
      teaNoteDetailShow: false, //教师笔记详情页
      teaNoteDetail: {}, //笔记详情
      proThList: "", //教师学生列表
      proStuList: "", //学生作业列表
      exercisesForm: [],
      taskId: "",
      thShowPro: "",
      proThExeList: "",
      thProShow: true,
      proThExeDetail: "",
      thProDetail: "",
      // 课件目录
      wareList: [],
      wareLoading: false,
      isVideoPlay: false,
      // 视频url
      videoUrl: "",
      // 当前视频id
      nowVideoId: 0,
      timer: "",
      lastVideo: "",
      videoCanUse: true,
      noteListParams: [],
      infor: "",
      inforStu: "",
      showPro1: ""
    };
  },
  filters: {
    formatDate(time) {
      var data = new Date(time);
      return formatDate(data, "MM-dd hh:mm:ss");
    },
    formatDate1(time) {
      var data = new Date(time);
      return formatDate(data, "MM-dd hh:mm");
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    courseId() {
      return this.$route.params.id;
    },
    lastWareId() {
      if (this.$route.params.lastWareId != "null") {
        return this.$route.params.lastWareId;
      } else {
        return 0;
      }
    }
  },
  // watch(){
  //
  // },
  mounted() {
    let autoPlay = localStorage.getItem("autoPlay");

    this.autoPlay = autoPlay === "true" ? true : false;

    if (this.userInfo.clientRoleType === 1) {
      // this.getNoteList();
      // this.getQuizList();
    } else if (this.userInfo.clientRoleType === 2) {
      // this.getTeaQuizList();
      // this.getStuNoteList();
    }
    this.getWareList();
    console.log(this.lastWareId);
  },
  destroyed() {},
  beforeDestroy() {
    // console.log(this.$refs.hkVideo.currentTime);
    if (this.$store.getters.getUserInfo.clientRoleType === 1) {
      clearInterval(this.timer);
      if (this.videoUrl) {
        this.$api.commonCourse
          .stuWareQuit(this.nowVideoId, {
            position: parseInt(this.$refs.hkVideo.currentTime)
          })
          .then(() => {});
      }
    }
  },
  methods: {
    //教师获取学生列表
    getThProList() {
      this.$api.commonCourse
        .getThProList({
          courseId: this.id,
          keyword: this.taskSearchVal
        })
        .then(res => {
          this.proThList = res.data.pageList;
          console.log(this.proThList);
        });
    },
    //教师获取学生已完成习题
    proThDetailClick(id) {
      this.thProDetail = true;
      this.thProShow = false;
      this.$api.commonCourse
        .proThDetail({
          id: id
        })
        .then(res => {
          this.infor = res.data;
          this.proDetailReady(res.data.exercises);
        });
    },
    //教师获取学生作业列表
    thCourseDownPro(id) {
      console.log(id);
      this.$api.commonCourse
        .getThProExeList({
          courseId: this.id,
          studentId: id
        })
        .then(res => {
          this.proThExeList = res.data.pageList;
        });
      if (this.thShowPro === id) {
        this.thShowPro = "";
      } else {
        this.thShowPro = id;
      }
    },
    //学生作业列表
    getStuProList() {
      this.$api.commonCourse
        .getStuProList({
          courseId: this.id
        })
        .then(res => {
          this.proStuList = res.data;
        });
    },
    //学生作业已完成题目
    getStuProFinishList() {
      this.$api.commonCourse
        .getStuProFinishList({
          studentTaskId: this.id
        })
        .then(res => {
          this.proStuList = res.data;
          console.log(this.proThList);
        });
    },
    //获取笔记列表
    getNoteList() {
      let params = {
        pageSize: 10000000,
        pageNum: 1,
        courseId: this.id
      };
      this.$api.commonCourse.getNote(params).then(res => {
        this.noteListParams = res.data.pageList;
        if (this.noteListParams.length > 4) {
          this.noteList = this.noteListParams.slice(0, 4);
        } else {
          this.noteList = this.noteListParams;
        }
      });
    },
    //获取教师看到的学生列表
    getStuNoteList() {
      this.$api.commonCourse
        .studentList({
          courseId: this.id,
          keyword: this.noteSearchVal
        })
        .then(res => {
          this.studentListParams = res.data.pageList;
          if (this.studentListParams.length > 4) {
            this.studentList = this.studentListParams.slice(0, 4);
          } else {
            this.studentList = this.studentListParams;
          }
          console.log(this.studentList);
        });
    },
    //展开教师看到的学生列表
    spreadTeaStuList() {
      if (this.spreadTeaStuVisible === false) {
        this.studentList = this.studentListParams;
        this.spreadTeaStuVisible = true;
      } else {
        this.studentList = this.studentListParams.slice(0, 6);
        this.spreadTeaStuVisible = false;
      }
    },
    //获取对应学生的笔记列表
    getdeNoteList(id) {
      this.$api.commonCourse
        .teaNoteList({
          courseId: this.id,
          studentId: id,
          pageNum: 1,
          pageSize: 100000
        })
        .then(res => {
          this.teaNoteList = res.data.pageList;
          console.log(this.teaNoteList);
        });
    },
    //获取学生留言列表
    getQuizList() {
      let params = {
        pageSize: 10000,
        pageNum: 1,
        courseId: this.id
      };
      this.$api.commonCourse.quizList(params).then(res => {
        this.quizList = res.data.pageList;
        console.log(this.quizList);
      });
    },
    //获取教师留言列表
    getTeaQuizList() {
      this.$api.commonCourse
        .teaQuizList({ pageNum: 1, pageSize: 1000, courseId: this.id })
        .then(res => {
          this.quizList = res.data.pageList;
          console.log(this.quizList.length);
        });
    },
    //提交笔记
    submitNote() {
      if (this.noteForm.title === "") {
        alert("请填写笔记标题再提交！");
        return;
      }
      console.log(this.noteForm);
      this.$api.commonCourse.postNote(this.noteForm).then(() => {
        this.$message({
          type: "success",
          message: "提交成功！"
        });
        this.noteForm = {
          title: "",
          content: "",
          courseId: this.id
        };
        this.getNoteList();
        this.stuAddNote = false;
        this.stuNoteListVisible = true;
      });
    },
    //显示学生笔记详情
    stuNoteShow(item) {
      this.stuNoteDetail = true;
      this.stuNoteListVisible = false;
      this.noteDetailForm = {
        title: item.title,
        content: item.content
      };
    },
    //返回笔记列表
    returnNoteList() {
      this.stuNoteDetail = false;
      this.stuNoteListVisible = true;
    },
    //新增留言
    addQuiz() {
      if (this.StuQuiz === "") {
        alert("留言不能为空！请正确填写！");
        return;
      }
      this.$api.commonCourse
        .addQuiz({ courseId: this.id, askContent: this.StuQuiz })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加留言成功！"
          });
          this.getQuizList();
          this.StuQuiz = "";
        });
    },
    //新增教师留言
    teaAnswer(id) {
      this.$api.commonCourse
        .addAnswer({ id: id, askContent: this.answerContent })
        .then(() => {
          this.$message({
            type: "success",
            message: "添加回复成功！"
          });
          this.getTeaQuizList();
          this.thReplyShow = "";
        });
      this.answerContent = null;
      this.getTeaQuizList();
    },

    msgList(type) {
      if (type === 1) {
        this.typeList = 1;
        this.proDetail = false;
        this.thShowPro = false;
        this.thProDetail = false;
        if (this.userInfo.clientRoleType === 1) {
          this.proShowStu = true;
        }
      } else if (type === 2) {
        this.typeList = 2;
        if (this.userInfo.clientRoleType === 1) {
          this.getStuProList();
          this.thProShow = true;
          this.thProDetail = false;
        } else if (this.userInfo.clientRoleType === 2) {
          this.taskSearchVal = "";
          this.getThProList();
          this.thProShow = true;
          this.thProDetail = false;
        }
      } else if (type === 3) {
        this.typeList = 3;
        this.thProDetail = false;
        this.proDetail = false;
        this.thShowPro = false;
        this.showNoteVisible = true;
        if (this.userInfo.clientRoleType === 1) {
          this.proShowStu = true;
          this.getNoteList();
        }
        if (this.userInfo.clientRoleType === 2) {
          this.noteSearchVal = "";
          this.getStuNoteList();
          this.teaNoteListVisible = true;
        }
      } else {
        this.typeList = 4;
        this.proDetail = false;
        this.thShowPro = false;
        this.thProDetail = false;
        if (this.userInfo.clientRoleType === 1) {
          this.proShowStu = true;
          this.getQuizList();
        } else if (this.userInfo.clientRoleType === 2) {
          this.getTeaQuizList();
        }
      }
    },
    //教师返回目录
    thProDetailBack() {
      this.getThProList();
      this.thProDetail = false;
      this.thProShow = true;
    },
    more() {
      this.show = !this.show;
      this.show1 = !this.show1;
    },
    courseDown(id) {
      // this.showPro = !this.showPro;
      if (this.showPro === id) {
        this.showPro = "";
      } else {
        this.showPro = id;
      }
      this.getdeNoteList(id);
      if (this.showPro1 === id) {
        this.showPro1 = "";
      } else {
        this.showPro1 = id;
      }
    },
    //老师隐藏习题列表
    courseDownPro() {
      this.showPro = !this.showPro;
      // this.getdeNoteList();
    },
    courseDown2() {
      this.showPro2 = !this.showPro2;
    },
    proDetailClick() {
      this.proShow = false;
      this.proDetail = true;
    },
    //处理习题
    proDetailReady(list) {
      let optionsLabel = ["A", "B", "C", "D", "E", "F", "G"];
      let judge = []; //判断
      let singleElection = []; //单选
      let multiSelection = []; //多选
      let clientRoleType = this.userInfo.clientRoleType;

      this.exercisesForm = [];

      list.map(item => {
        let options = [];
        let check;

        switch (item.type) {
          case 1: //判断
            if (clientRoleType === 2) {
              if (item.studentAnswer === "RIGHT") {
                check = "正确";
              } else {
                check = "错误";
              }
            } else {
              check = {};
            }
            options.push({
              label: "正确"
            });
            options.push({
              label: "错误"
            });
            judge.push({
              content: item.content,
              check,
              id: item.exerciseId,
              type: item.type,
              options
            });
            break;
          case 2: //单选
          case 3: //多选
            optionsLabel.map(optItem => {
              let itemRow = item["option" + optItem];
              if (itemRow) {
                options.push({
                  label: itemRow,
                  name: optItem
                });
              }
            });
            switch (item.type) {
              case 2:
                if (clientRoleType === 2) {
                  check = item.studentAnswer;
                } else {
                  check = {};
                }
                singleElection.push({
                  content: item.content,
                  check,
                  id: item.exerciseId,
                  type: item.type,
                  options
                });
                break;
              case 3:
                if (clientRoleType === 2) {
                  check = item.studentAnswer.split("");
                } else {
                  check = [];
                }
                multiSelection.push({
                  content: item.content,
                  check,
                  id: item.exerciseId,
                  type: item.type,
                  options
                });
                break;
            }
            break;
        }
      });
      if (singleElection.length)
        this.exercisesForm.push({
          name: "单选",
          number: "",
          value: singleElection
        });
      if (multiSelection.length)
        this.exercisesForm.push({
          name: "多选",
          number: "",
          value: multiSelection
        });
      if (judge.length)
        this.exercisesForm.push({
          name: "判断",
          number: "",
          value: judge
        });
      this.exercisesForm.map((item, index) => {
        if (index === 0) {
          item.number = "一";
        }
        if (index === 1) {
          item.number = "二";
        }
        if (index === 2) {
          item.number = "三";
        }
      });
      console.log(this.exercisesForm);
    },
    //获取未做完习题
    proDetailClickStuReady(id) {
      this.proShowStu = false;
      this.proDetail = true;
      this.taskId = id;

      this.$api.commonCourse
        .getStuProReadyList({
          taskId: id
        })
        .then(res => {
          this.inforStu = res.data;
          this.proDetailReady(res.data.exercises);
        });
    },
    //学生提交作业
    exercisesSubmit() {
      let exerciseIds = [];
      let answers = [];
      let numSum = 0;

      this.exercisesForm.map(item =>
        item.value.map(valItem => {
          switch (valItem.type) {
            case 1: //判断
              if (JSON.stringify(valItem.check) !== "{}") {
                answers.push(valItem.check === "正确" ? "RIGHT" : "WRONG");
                exerciseIds.push(valItem.id);
              }
              break;
            case 2: //单选
              if (JSON.stringify(valItem.check) !== "{}") {
                answers.push(valItem.check);
                exerciseIds.push(valItem.id);
              }
              break;
            case 3: //多选
              if (valItem.check.length) {
                valItem.check.sort(function(a, b) {
                  if (a > b) {
                    return 1;
                  } else if (a < b) {
                    return -1;
                  } else {
                    return 0;
                  }
                });
                answers.push(valItem.check.join(""));
                exerciseIds.push(valItem.id);
              }
              break;
          }
          numSum++;
        })
      );
      if (exerciseIds.length !== numSum) {
        this.$message({
          type: "error",
          message: "还有题目未答！"
        });
        return;
      }

      this.$api.commonCourse
        .getStuProReadyList_commitTask({
          taskId: this.taskId,
          exerciseIds: exerciseIds.join(","),
          answers: answers.join(",")
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功！"
          });
          this.proDetailBack();
          this.getStuProList();
        });
    },
    // 返回目录
    proDetailBack() {
      this.proShow = true;
      this.proShowStu = true;
      this.proDetail = false;
    },
    addNote() {
      this.stuAddNote = true;
      this.stuNoteListVisible = false;
    },
    changeSpread() {
      if (!this.spreadVisible) {
        this.noteList = this.noteListParams;
        this.spreadVisible = true;
        return;
      } else {
        this.noteList = this.noteListParams.slice(0, 4);
        this.spreadVisible = false;
        return;
      }
    },
    msgView() {
      this.msgViewVisible = !this.msgViewVisible;
    },
    //展开教师笔记详情
    teaNoteDetailFun(id) {
      this.teaNoteListVisible = false;
      this.teaNoteDetailShow = true;

      this.$api.commonCourse.teanoteDetail({ id }).then(res => {
        this.teaNoteDetail = res.data;
      });
    },
    //返回列表
    teaNoteDetailFunBack() {
      this.teaNoteDetailShow = false;
      this.teaNoteListVisible = true;
      this.teaNoteDetail = {};
    },
    anserShowFun(id, answerTime) {
      if (answerTime) {
        if (answerTime === this.anserShow) {
          this.anserShow = "";
        } else {
          this.anserShow = answerTime;
          this.thanserShow = id;
        }
      } else {
        return;
      }
    },
    delAnser(id) {
      this.delVisible = true;
      this.delQuizId = id;
      console.log(999);
    },
    deleteQuiz() {
      this.$api.commonCourse.deleteQuiz({ id: this.delQuizId }).then(() => {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.delVisible = false;
        this.delQuizId = null;
        this.getQuizList();
      });
    },
    canDel() {
      this.delVisible = !this.delVisible;
    },
    itemAnser() {
      this.itemVisible = true;
    },
    thotherShowFunNo(id, answerTime) {
      if (answerTime) {
        alert("该条留言已被回复，请勿回复！");
        return;
      }
      console.log(id);
      if (this.thReplyShow) {
        if (this.thReplyShowParams === id) {
          this.thReplyShow = "";
        } else {
          this.thReplyShow = id;
        }
      } else {
        this.thReplyShow = id;
        this.thReplyShowParams = this.thReplyShow;
      }
    },
    thotherShowFun() {
      this.thanserShow = !this.thanserShow;
    },
    otherShowFun() {
      this.otherShow = !this.otherShow;
    },
    getWareList() {
      this.wareLoading = true;
      if (this.$store.getters.getUserInfo.clientRoleType === 2) {
        return this.$api.commonCourse
          .getThWareList({
            courseId: this.courseId
          })
          .then(res => {
            this.wareLoading = false;
            this.wareList = res.data;
            this.wareList.map(item => {
              item.isShowSee = false;
            });
            if (this.autoPlay) {
              if (!this.lastWareId) {
                this.playVideo(this.wareList[0], true);
              } else {
                this.replay(this.lastVideo.playPosition, this.lastVideo.playUrl);
              }
            }
          });
      }
      this.$api.commonCourse
        .getStuWareList({
          courseId: this.courseId
        })
        .then(res => {
          this.wareLoading = false;
          this.wareList = res.data;
          for (let i of this.wareList) {
            if (i.id == this.lastWareId) {
              this.lastVideo = i;
              this.nowVideoId = i.id;
            }
          }
          if (this.autoPlay) {
            if (!this.lastWareId) {
              this.playVideo(this.wareList[0], true);
            } else {
              this.replay(this.lastVideo.playPosition, this.lastVideo.playUrl);
            }
          }
        });
    },
    // 格式化课件时间
    calWareTime(value) {
      let secondTime = parseInt(value); // 秒
      let minuteTime = 0;
      let hourTime = 0;
      if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
          hourTime = parseInt(minuteTime / 60);
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      let result =
        "" + parseInt(secondTime) < 10
          ? "0" + parseInt(secondTime)
          : parseInt(secondTime);
      //			console.log(result1)
      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + ":" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + ":" + result;
      }
      return result;
    },
    playVideo(row, isFirstTime, continuePlay) {
      // this.videoCanUse = true;
      if (isFirstTime) {
        if (!row) {
          return this.$message({
            type: "warning",
            message: "此课程暂无课件"
          });
        }
      }
      clearInterval(this.timer);
      this.videoUrl = row.playUrl;
      this.nowVideoId = row.id;

      console.log(row);
      this.$nextTick(() => {
        this.$refs.hkVideo.currentTime = 0;
        if (continuePlay) {
          this.$refs.hkVideo.currentTime = row.playPosition;
        }
        this.$refs.hkVideo.play();
        this.$api.commonCourse.stuWareQuit(this.nowVideoId, {
            position: 0
        });
        // this.$refs.hiVideo
        if (this.$store.getters.getUserInfo.clientRoleType == 1) {
          this.timer = setInterval(() => {
            this.$api.commonCourse.stuRecordTime(this.nowVideoId);
          }, 30000);
        }
      });
    },
    wareItemAction(index, type) {
      // type :true划过  false 划出
      let row = this.wareList[index];
      if (type) {
        row.isShowSee = true;
        this.$set(this.wareList, index, row);
      } else {
        row.isShowSee = false;
        this.$set(this.wareList, index, row);
      }
    },
    // 接着播放
    replay(time, url) {
      this.videoUrl = url;
      // for (let i of this.wareList) {
      //   if (url == i.playUrl) {
      //     this.nowVideoId = i.id;
      //   }
      // }
      this.$nextTick(() => {
        this.$refs.hkVideo.currentTime = time;
        this.$refs.hkVideo.play();
        this.timer = setInterval(() => {
          this.$api.commonCourse.stuRecordTime(this.nowVideoId);
        }, 30000);
      });
    },
    errorMethod() {
      console.log(12456);
      this.videoCanUse = false;
    },
    loadMethod() {
      this.videoCanUse = true;
    },
    autoPlayChange() {
      localStorage.setItem("autoPlay", this.autoPlay);
    }
  }
};
</script>

<style lang="less">
.commonCourseCata {
  width: 1200px;
  margin: 0 auto;
  margin-top: 27px;
  padding-bottom: 100px;
  .playingGif {
    display: inline-block;
    width: 30px;
    height: 30px;
    transform: translate(50%, 25%);
  }
  .hk-video-wrap {
    height: 520px;
    width: 100%;
    background: black;
    position: relative;
    &:hover {
      .commonCourseCata-autoPlay {
        display: flex;
      }
    }
    .hk-ware-video {
      height: 100%;
      width: 100%;
    }
    .videoNoUse {
      height: 100%;
      background: black;
      text-align: center;
      vertical-align: middle;
      color: white;
      line-height: 520px;
    }
  }
  .kf-startPlay-btn {
    width: 90px;
    height: 40px;
    background: #ffba4e;
    text-align: center;
    margin-top: 5px;
    line-height: 40px;
    border-radius: 8px;
    font-size: 14px;
    transform: translateX(-15%);
  }
  .commonCourseCata-video {
    height: 520px;
    width: 100%;
    background: url("../../assets/img/common_course_cata_attachment.jpg")
      no-repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 14px;
    position: relative;
    .commonCourseCata-video-shade {
      height: 520px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      .commonCourseCata-video-courseName {
        height: 100px;
        line-height: 100px;
        font-size: 22px;
        padding-top: 114px;
        text-align: center;
      }
      .commonCourseCata-video-startstudy {
        width: 210px;
        height: 60px;
        line-height: 60px;
        background-color: rgba(0, 0, 0, 0.5);
        text-align: center;
        margin: 0 auto;
        border-radius: 30px;
        font-size: 18px;
        cursor: pointer;
      }
      .commonCourseCata-video-beginstudy {
        font-size: 18px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
    }
  }
  .commonCourseCata-content {
    .commonCourseCata-content-header {
      height: 66px;
      background-color: #fff;
      border-bottom: 1px solid #e5e5e5;
      .commonCourseCata-content-header-items {
        height: 64px;
        line-height: 64px;
        float: left;
        margin: 0 38px;
        cursor: pointer;
      }
      .commonCourseCata-content-header-items-active {
        height: 64px;
        line-height: 64px;
        float: left;
        margin: 0 38px;
        border-bottom: 2px solid #5e4eaa;
        cursor: pointer;
      }
    }
    .commonCourseCata-content-cata {
      /*background-color: #fff;*/
      .commonCourseCata-content-cata-one {
        height: 58px;
        /*width: 1117px;*/
        padding: 0 42px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        background-color: #fff;
        .commonCourseCata-content-cata-one-left {
          width: 1058px;
          position: relative;
          .commonCourseCata-content-cata-one-round {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #000;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 0;
          }
          .commonCourseCata-content-cata-one-title {
            padding-left: 18px;
          }
        }
        .commonCourseCata-content-cata-one-time {
          width: 70px;
          position: relative;
          /*.commonCourseCata-content-cata-one-time-img{*/
          /*width: 19px;*/
          /*height: 19px;*/
          /*margin-top: 21px;*/
          /*}*/
          .commonCourseCata-content-cata-one-timeplay {
            width: 19px;
            height: 19px;
            position: absolute;
            top: 4px;
            .commonCourseCata-content-cata-one-timeplay-img {
              width: 19px;
              height: 19px;
            }
          }
          .commonCourseCata-content-cata-one-timeplay-time {
            font-size: 12px;
            display: block;
            margin-left: 25px;
          }
        }
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-cata-one-last {
        height: 58px;
        /*width: 1117px;*/
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
        background-color: #fff;
      }
    }

    .commonCourseCata-content-pro {
      .commonCourseCata-content-pro-one {
        height: 58px;
        /*width: 1117px;*/
        padding: 0 42px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        background-color: #fff;
        .commonCourseCata-content-pro-one-left {
          width: 1058px;
          position: relative;
          .commonCourseCata-content-pro-one-round {
            display: block;
            width: 34px;
            height: 34px;
            margin-right: 18px;
            position: absolute;
            top: 12px;
            left: 0;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
          .commonCourseCata-content-pro-one-title {
            padding-left: 48px;
          }
        }
        .commonCourseCata-content-proone-time {
          width: 70px;
          position: relative;
          /*.commonCourseCata-content-pro-one-time-img{*/
          /*width: 19px;*/
          /*height: 19px;*/
          /*margin-top: 21px;*/
          /*}*/
          .commonCourseCata-content-pro-one-timeplay {
            width: 19px;
            height: 19px;
            position: absolute;
            top: 14px;
            .commonCourseCata-content-pro-one-timeplay-img {
              width: 13px;
              height: 9px;
            }
          }
          .commonCourseCata-content-pro-one-timeplay-time {
            font-size: 12px;
            display: block;
            margin-left: 25px;
          }
        }
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-pro-one-last {
        height: 58px;
        width: 1117px;
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
      }
    }

    .commonCourseCata-content-pro-down {
      background-color: #fff;
      margin-bottom: 10px;
      .commonCourseCata-content-pro-down-one {
        height: 58px;
        width: 1148px;
        padding: 0 10px 0px 42px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-pro-down-click {
        height: 58px;
        width: 1148px;
        padding: 0 10px 0px 42px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-pro-down-one-left {
        width: 1058px;
        position: relative;
        .commonCourseCata-content-pro-down-one-round {
          display: block;
          width: 8px;
          height: 8px;
          margin-right: 18px;
          background-color: #000;
          border-radius: 50%;
          position: absolute;
          top: 25px;
          left: 44px;
        }
        .commonCourseCata-content-pro-down-one-round-orange {
          display: block;
          width: 8px;
          height: 8px;
          margin-right: 18px;
          background-color: #ffba4e;
          border-radius: 50%;
          position: absolute;
          top: 25px;
          left: 44px;
        }
        .commonCourseCata-content-pro-down-one-title {
          padding-left: 68px;
        }
      }
      .commonCourseCata-content-pro-down-one-time {
        width: 70px;
        position: relative;
        text-align: center;
        margin-left: 20px;
        /*.commonCourseCata-content-pro-down-one-timeplay {*/
        /*width: 19px;*/
        /*height: 19px;*/
        /*position: absolute;*/
        /*top: 14px;*/
        /*.commonCourseCata-content-pro-down-one-timeplay-img {*/
        /*width: 13px;*/
        /*height: 9px;*/
        /*}*/
        /*}*/
        .commonCourseCata-content-pro-down-one-timeplay-time {
          font-size: 12px;
          display: block;
          margin-left: 25px;
        }
      }
      .commonCourseCata-content-pro-down-one-time-orange {
        width: 68px;
        height: 39px;
        line-height: 39px;
        background-color: #ffba4e;
        text-align: center;
        border-radius: 4px;
        margin-top: 10px;
        cursor: default;
      }

      .commonCourseCata-content-pro-one-last {
        height: 58px;
        width: 1117px;
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
      }
    }
    .commonCourseCata-content-pro-down-stu {
      background-color: #fff;
      .commonCourseCata-content-pro-down-one-stu {
        height: 58px;
        width: 1190px;
        padding: 0 10px 0px 0px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .commonCourseCata-content-pro-down-one-left {
          width: 1058px;
          position: relative;
          .commonCourseCata-content-pro-down-one-round {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #000;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 44px;
          }
          .commonCourseCata-content-pro-down-one-round-orange {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 18px;
            background-color: #ffba4e;
            border-radius: 50%;
            position: absolute;
            top: 25px;
            left: 44px;
          }
          .commonCourseCata-content-pro-down-one-title {
            padding-left: 68px;
          }
        }
        .commonCourseCata-content-pro-down-one-time {
          width: 70px;
          position: relative;
          text-align: center;
          margin-left: 20px;
          /*.commonCourseCata-content-pro-down-one-timeplay {*/
          /*width: 19px;*/
          /*height: 19px;*/
          /*position: absolute;*/
          /*top: 14px;*/
          /*.commonCourseCata-content-pro-down-one-timeplay-img {*/
          /*width: 13px;*/
          /*height: 9px;*/
          /*}*/
          /*}*/
          .commonCourseCata-content-pro-down-one-timeplay-time {
            font-size: 12px;
            display: block;
            margin-left: 25px;
          }
        }
        .commonCourseCata-content-pro-down-one-time-orange {
          width: 68px;
          height: 39px;
          line-height: 39px;
          background-color: #ffba4e;
          text-align: center;
          border-radius: 4px;
          margin-top: 10px;
        }
        &:hover {
          background-color: #efedf6;
        }
      }
      .commonCourseCata-content-pro-one-last {
        height: 58px;
        width: 1117px;
        padding: 0 56px;
        border-bottom: 1px solid #e5e5e5;
        line-height: 58px;
        display: flex;
        justify-content: center;
        cursor: pointer;
        color: #5e4eaa;
      }
    }
    .commonCourseCata-content-pro-datail {
      .commonCourseCata-content-pro-datail-title {
        height: 38px;
        width: 100%;
        background-color: #fff1dc;
        .commonCourseCata-content-pro-datail-title-left {
          position: relative;
          float: left;
          .commonCourseCata-content-pro-datail-title-left-img {
            height: 34px;
            width: 34px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            display: block;
            position: absolute;
            top: 2px;
            left: 37px;
          }
          .commonCourseCata-content-pro-datail-title-left-name {
            margin-left: 85px;
            line-height: 38px;
          }
        }
        .commonCourseCata-content-pro-datail-title-right {
          position: relative;
          float: right;
          .commonCourseCata-content-pro-datail-title-right-img {
            height: 32px;
            width: 32px;
            background: url("../../assets/img/common_course_detail_back.png")
              no-repeat;
            background-position: center;
            display: block;
            position: absolute;
            top: 2px;
            right: 94px;
          }
          .commonCourseCata-content-pro-datail-title-right-name {
            margin-right: 20px;
            line-height: 38px;
            cursor: pointer;
          }
        }
      }
      .comCourCata-content-pro-detail-sub {
        background: #fff;
        padding-bottom: 60px;
        .comCourCata-content-pro-detail-subType {
          padding: 37px 0 0 24px;
        }

        .comCourCata-content-pro-detail-cont {
          /*max-height: 250px;*/
          /*min-height: 200px;*/
          .comCourCata-content-pro-detail-ques {
            padding-top: 24px;
            padding-left: 50px;
          }
          .comCourCata-content-pro-detail-ans {
            margin-left: 70px;
            /*height: 86px;*/
            /*clear: left;*/
            .comCourCata-content-pro-detail-ans-form-checkBox {
              width: 525px;
              height: 60px;
              line-height: 24px;
              padding-top: 24px;
              padding-right: 40px;
              float: left;
              position: relative;
              i {
                width: 20px;
                height: 20px;
                border: 1px solid #b7b7b7;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
                cursor: pointer;
              }
              input {
                display: none;
                &:checked + i {
                  border: 1px solid #ffba4e;
                  background: #ffba4e;
                  color: #fff;
                }
                &:disabled {
                  & + i {
                    cursor: no-drop;
                    & + span {
                      cursor: no-drop;
                    }
                  }
                }
              }
              /*&:active{*/
              /*.comCourCata-content-pro-select{*/
              /*width: 20px;*/
              /*height: 20px;*/
              /*background: #fff;*/
              /*border: 1px solid #ffba4e;*/
              /*border-radius: 50%;*/
              /*background: #ffba4e;*/
              /*color: #fff;*/
              /*text-align: center;*/
              /*line-height: 20px;*/
              /*display: block;*/
              /*position: absolute;*/
              /*top: 22px;*/
              /*left: 0;*/
              /*}*/
              /*}*/
            }
          }
          .comCourCata-content-pro-detail-ans-mutil {
            /*height: 160px;*/
            /*clear: both;*/
          }
          .comCourCata-content-pro-detail-ans-pd {
            margin-left: 70px;
            height: 43px;
            .comCourCata-content-pro-detail-ans-form-checkBox {
              width: 377px;
              /*padding-top: 24px;*/
              /*float: left;*/
              /*position: relative;*/
              /*cursor: pointer;*/
              i {
                width: 20px;
                height: 20px;
                border: 1px solid #b7b7b7;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
              }
              input {
                display: none;
                &:checked + i {
                  border: 1px solid #ffba4e;
                  background: #ffba4e;
                  color: #fff;
                }
              }
            }
          }
        }
        .pro-mutil {
          /*max-height: 400px;*/
          /*min-height: 370px;*/
        }
      }
    }
  }
}

.comCourCata-content-pro-select {
  width: 20px;
  height: 20px;
  background: #fff;
  border: 1px solid #b7b7b7;
  border-radius: 50%;
  /*background: #ffba4e;*/
  color: #b7b7b7;
  text-align: center;
  line-height: 20px;
  display: block;
  position: absolute;
  top: 22px;
  left: 0;
}

.comCourCata-content-pro-select-ans-content {
  padding-left: 30px;
  cursor: pointer;
}

.exercises-btn {
  background: #ffba4e;
  width: 80px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 10px;
  margin: 40px auto 0;
  cursor: pointer;
}

.kf-pagination {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

.commonCourseCata-autoPlay {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  align-items: center;
  span {
    color: #fff;
    font-size: 12px;
    margin-right: 5px;
  }
}

.comCourCata-select {
  height: 160px;
}
</style>
