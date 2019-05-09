<template>
  <div class="videoWrap">
  	<div class="video-box" id="videoBox"><!--video 盒子-->
    <div class="video-box-body">
        <video class="video-body" id="videoBody" :src="playUrl">
            您的浏览器不支持video
        </video>
        <!--控制条盒子-->
        <div class="video-control" id="videoControl">
            <div class="pull-left fontzero control-leftview">
                <!--刷新键-->
                <!--<div class="control-btn loadbtn" id="loadBtn"></div>-->
                <!--暂停/播放键-->
                <div class="control-btn playbtn" id="playPausebtn"></div>
                <div class="timeControl">
                	<div class="current-time" id="currentTime" style="display: inline-block">00:00</div>
                	                	<div style="text-align: center;display: inline-block;;color:white">
                		/ 
                	</div>
                	<div class="duration-time" id="durationTime"  style="display: inline-block">00:00</div>
                	
                	
                	
                 
                </div>
                  <!--音量键-->
                <!--<div class="control-btn mutedbtn" id="mutedBtn"></div>-->
                <!--全屏键-->
                <div class="control-btn fullscreenbar" id="fullScreenBar"></div>
            </div>
            <!--<div class="pull-left fontzero progress-box">
                <div class="progress-box-body">
                    <div class="durationbar-box pull-left">
                        <div class="durationbar" id="durationBar">
                            <div class="bufferbar" id="bufferBar"></div>
                            <div class="currentbar" id="currentBar"></div>
                            <div class="drawbar" id="drawBar"></div>
                        </div>
                    </div>
                </div>
            </div>-->
        </div>
    </div>
</div>
  </div>
</template>
<script>
	
import $ from "jquery";
export default {
  data() {
    return {
    	wareId:"",
    	planId:'',
    	playUrl:""
    };
  },
  components: {},
  created(){
  	 	this.playUrl=sessionStorage.getItem("videoUrl");
  },
  mounted() {
	this.wareId=this.$route.params.wareId;
	this.planId=this.$route.params.planId;
	
	
		this.$nextTick(()=>{
			 var loadBtn=$('#loadBtn');//刷新键
    var play=$('#playPausebtn');//播放暂停键
    var mutedBtn=$('#mutedBtn');//音量键
    var fullScreenBar=$('#fullScreenBar');//全屏键
    var durationBar=$('#durationBar');//总进度条
    var bufferBar=$('#bufferBar');//缓冲进度条
    var currentBar=$('#currentBar');//播放时长进度条
    var drawBar=$('#drawBar');//播放进度按钮
    var durationTime=$('#durationTime');//播放总时长
    var currentTime=$('#currentTime');//播放时长
    var videoBody=$('#videoBody');//视频
    /**
    * 因为我使用的jquery,插件是不能直接调用video中的事件的
    * 所以需要使用get()方法将jquery对象转化为DOM对象，
    * 进而去使用video的各个事件
    **/
    var videoDom=videoBody.get(0);

    /**
    * 因为我们获取的视频时长是秒数,所以我们需要将秒数转化为我们常见的时间格式
    * 下面只是万千方法中的一种，大家参考即可
    **/
    var initTimeLength = function(timeLength){//根据秒数格式化时间
        timeLength = parseInt(timeLength);
        var second = timeLength%60;
        var minute = (timeLength-second)/60;
        return (minute<10?"0"+minute:minute)+":"+(second<10?"0"+second:second);
    };

    /**
    * 刷新视频,直接调用load()方法就行
    **/
    function load(){//刷新
        videoDom.load();
    }

    /**
    * 播放/暂停功能 
    **/
    function playPause(){//播放暂停
        //paused 返回的是视频是否是暂停状态,返回的是一个布尔值
        if(videoDom.paused){
            videoDom.play();
            //通过操作不同的class，来切换键的形态
            play.addClass('pausebtn');
        }else{
            videoDom.pause();
            play.removeClass('pausebtn');
        }
    }

    /**
    * 音量键的开启和关闭
    **/
    function muted(){
        //如果为静音则开启，如果为开启状态则关闭
        videoDom.muted=!videoDom.muted;
    }

    /**
    * 视频时间处理
    **/
    function playTime(){
        // loadedmetadata方法主要是判断视频是否已加载,加载完毕才能获取视频时长;
        videoBody.on('loadedmetadata',function(){
            /**
            * duration 获取视频时长，即视频秒数；
            * 这里需要调用之前已经定义好的秒数处理函数initTimeLength
            * 转换为我们常见的时间格式
            **/
            durationTime.text(initTimeLength(videoDom.duration));
        });
        // ontimeupdate 当前视频播放位置反生改变触发的事件;
        videoBody.on('timeupdate',function(){
            // 视频时长
            var durationProgress=videoDom.duration;
            // currentTime 当前播放时长
            var currentTimeProgress=videoDom.currentTime;
            // 将当前播放时长填入左边时长元素中
            currentTime.text(initTimeLength(videoDom.currentTime));
            // 求当前播放时长的进度，从而显示出来进度条
            var currentWidth=100*(currentTimeProgress/durationProgress);
            var currentLeft=currentWidth-((drawBar.width()/2)/durationBar.width()*100);
            currentBar.animate({width:currentWidth+'%'});
            drawBar.animate({left:currentLeft+'%'});
        });
    }
    playTime();

    /**缓冲进度条**/

    function buffer(){
        //视频时长
        var maxduration = videoDom.duration;
        //当前缓冲进度时长结束位置
        var currentBuffer = videoDom.buffered.end(0);
        // 求取百分比
        var percentage = 100 * currentBuffer / maxduration;
        bufferBar.animate({'width': percentage+'%'},'fast');
        // 在范围内每500毫秒进行一次递归，也就是调用一下自己;
        if(currentBuffer<maxduration){
            setTimeout(buffer,500);
        }
    }
//  buffer();

    // 视频暂停按钮点击事件
    loadBtn.on('click',function(){
        load();
        play.removeClass('pausebtn');
    });
    // 视频播放按钮点击事件
    play.on('click',function(){
        playPause();
    });

    // 全屏按钮点击事件，这里兼容不是很全，有兴趣深入的朋友可以自己百度查查
    fullScreenBar.on('click',function(){
        if (document.webkitFullscreenElement) { 
            videoDom.webkitExitFullscreen(); 
        } else { 
            videoDom.webkitRequestFullscreen();
        } 
    });
    // 音量键的开启关闭
    mutedBtn.on('click',function(){
        muted();
    });
		})

  },
  computed:{
  	"planId":function(){
  		return this.$route.params.planId
  	},
  	"wareId":function(){
  		return this.$route.params.wareId
  	}
  },
  methods: {
		stopDel(e){
			
		}
  },
  destroyed(){
  	console.log(this.wareId)
	this.$api.curriculumLearning.save_wareTime(this.wareId,{
		planId:this.planId,
		position:20
	}).then(()=>{
		
	})
  }
};
</script>
<style lang="less">
	.videoWrap{
		background: black;
		position: relative;
		.Topline{
			position: absolute;
			height: 30px;
			background: black;
			z-index: 1000000;
			width: 100%!important;
			bottom: 0px!important;
		}
	}
	/*video样式*/
.video-box {
    overflow: hidden;
    background: #000;
    width: 750px;
    display: block;
    margin: 0 auto;
    -webkit-transition-duration: 300ms;
    -moz-transition-duration: 300ms;
    -ms-transition-duration: 300ms;
    -o-transition-duration: 300ms;
    transition-duration: 300ms;
    z-index: 10;
}
.video-box-body {
    width: 100%;
    height: 422px;
    overflow: hidden;
    position: relative;
}
.video-body {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 15;
}
/*控制条样式*/
.video-control {
    position: absolute;
    width: 100%;
    height: 60px;
    padding: 5px;
    line-height: 50px;
    background: rgba(0, 0, 0, .5);
    z-index: 99999999999;
    left: 0;
    right: 0;
    bottom: 0;
}
.control-leftview {
    margin-right: -110px;
    position: relative;
    z-index: 5;
    position: absolute;
    bottom: 10px!important;
    width: 100%!important;
}
.control-btn {
    display: inline-block;
    width: 50px;
    position: absolute;
    bottom: 0px!important;
    z-index: 100000;
    height: 50px;
    background: rgba(256, 256, 256, .5);
    cursor: pointer;
}
.control-leftview .control-btn {
    margin-right: 10px;
}
.progress-box {
    width: 100%;
    height: 50px;
    padding: 0 0px 0 0px;
}
.progress-box-body {
    width: 100%;
    height: 100%;
}
.current-time, .duration-time {
    width: 60px;
    text-align: center;
    color: #fff;
}
.current-time {
    /*margin-right: -60px;*/
    position: relative;
    z-index: 5;
}
.duration-time {
    /*margin-left: -60px;*/
    position: relative;
    z-index: 5;
}
.durationbar-box {
    width: 100%;
    padding: 0 70px;
}
.durationbar {
    width: 100%;
    height: 10px;
    margin-top: 20px;
    background: #26BEF5;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
    border-radius: 50px;
    position: relative;
}
.bufferbar, .currentbar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background: rgba(0, 0, 0, .5);
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
    border-radius: 50px;
    z-index: 5;
    cursor: pointer;
}
.currentbar {
    background: #fff;
    z-index: 10;
}
.drawbar {
    position: absolute;
    background: #fff;
    width: 20px;
    height: 20px;
    left: 0;
    top: -5px;
    z-index: 10;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    -ms-border-radius: 50px;
    -o-border-radius: 50px;
    border-radius: 50px;
    cursor: pointer;
}
.control-rightview {
    margin-left: -110px;
    position: relative;
    z-index: 5;
}
.control-rightview .control-btn {
    margin-left: 10px;
}
.control-leftview .control-btn:last-child, .control-rightview .control-btn:first-child {
    margin: 0;
}
.control-btn.loadbtn {
    /*background: url(../img/load.png) no-repeat center;*/
    background-size: 100%;
}
.control-btn.playbtn {
    background: url(../../assets/img/play.png) no-repeat center;
    background-size: 100%;
}
.control-btn.playbtn.pausebtn {
    background: url(../../assets/img/pausecircle.png) no-repeat center;
    background-size: 100%;
}
.control-btn.mutedbtn {
    background: url(../../assets/img/unmuted.png) no-repeat center;
    background-size: 60%;
}
.control-btn.fullscreenbar {
    background: url(../../assets/img/fullsrceen.png) no-repeat center;
    background-size: 100%;
    z-index: 1000000000000!important;
    right: 30px!important;
}
video:-webkit-full-screen {
    z-index: 9 !important;
    width: 100% !important;
    height: 100% !important;
}
video::-webkit-media-controls {
    display: none !important;
}
.timeControl{
	display: inline-block;line-height: 50px!important;margin-top: -30px;
	position: absolute;
	left: 20%;
	bottom: 2px!important;
}
</style>
