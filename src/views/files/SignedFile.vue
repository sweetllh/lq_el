<template>
	<div id="signedFile">
		<div class="fileCont">
			<div class="header">
	      		<div class="head-title" @click="backOne"><i class="left_icon"></i>签署文件</div>
	      		<!--<div class="choise">
	      			<div class="choise_item">律师代写
	      			</div><div class="choise_item">本地上传
	      			</div><div class="choise_item" @click="chooseTemplate">选择模板</div>
	      		</div>-->
		        <div class="btn_group">
					<div class="next_btn" @click="sendFile">发送</div>
					<!--<div class="draft" @click="saveToDraft">存草稿</div>-->
				</div>
		    </div>
		    <div class="basicInfor">
		    	<!--<div class="r_header">
			        <span class="r_header_title">编辑合同</span>
			    </div>-->
			    <div class="content clearfix">
			    	<div class="clearfix" :style="{height: boxHeight + 'px'}">
			    		<div class="left">
			    			<div class="r_header">
						        <span>选择签章</span>
						        <span class="more" @click="toStamp">更多<img src="../../assets/img/icon-right.png" alt="" /></span>
						    </div>
						    <div class="stamps-wrap" :style="{height: (boxHeight-42) + 'px'}" 
											    	v-loading="listLoading"
											    	element-loading-text="拼命加载中"
					   	 							element-loading-spinner="el-icon-loading">
						    	<div v-if="!signList.length && listLoading" class="dataNOne">{{dataNOne}}</div>
						    	<ul class="stamps">
							    	<li class="clearfix" v-for="(item,index) in signList" :key="item.ID" >
							    		<div class="img_wrap" @click="useStamp(index)" 
							    			:class="{active: current==index ? true :false}">
							    			<img :src="item.Image" alt="">
							    		</div>
								        <span class="toUse" >{{index+1}}</span>
								     </li>
							    </ul>
						    </div>
						    
			    		</div>
			    		<div class="right" :style="{height: boxHeight - 25 + 'px'}">
			    			<div class="r_header">
						        <span>{{signedInfo.ContractName}}</span>
						    </div>
					    	<ul id="r_content" :style="{height: boxHeight-65 +'px'}"
					    						v-loading="listLoading"
										    	element-loading-text="拼命加载中"
				   	 							element-loading-spinner="el-icon-loading">
						    	<li v-for="(item,index) in signedInfo.Images" :key="index">
						    		<img :src="item" alt="" class="item"/>
						    		<img :class="{block: pageIndex == index+1 && usedSign  ? true : false}"
						    			:style="{top: top+'px',left:left+'px'}"
						    			:src="usedSign.Image" alt="" class="drag" 
						    			@mousedown="dragImg"
						    			@touchstart="dragImgTouch"/>
						    	</li>
						    	
						    </ul>
						    <span class="pageNum" v-if="signedInfo.Images">{{pageNum}}/{{signedInfo.Images.length}}</span>
						    <div v-if="scrollTop>120" class="toTop" @click="toTop"></div>
			    		</div>
			    	</div>
			    	<!--<div class="btn_group">
						<div class="next_btn" @click="sendFile">发送
						</div><div class="draft" @click="saveToDraft">存草稿</div>
					</div>-->
			    </div>
		    </div>
		</div>
      	
	</div>
</template>

<script>
import { getContractDetail,signContract } from '@/api/file'
import { getSignature } from '@/api/account'
export default{
	components: {
		
	},
	data(){
		return {
			signedInfo: "", //签署信息
      		signList: [],  //签章列表
      		usedSign: "",  //使用的签章
      		pageIndex: 1,  //在第几页签章
      		left: 200, //签章定位
      		top: 460,
      		params:{
      			boxW: 0,
      			boxH: 0,
      			dragW: 0,
      			dragH: 0
      		},
      		scrollTop: 0,
      		//usedFlag: false,
      		isLoading: false,
      		pageNum: 1,
      		
      		current: null,   //点中第几个签章
      		
      		listLoading: false,
      		dataNOne: "暂无签章",
      		
      		listLoading2: false,
		}
	},
	computed:{
		PointX(){
			return this.left/this.params.boxW;
		},
		PointY(){
			return this.top/this.params.boxH;
		},
		Width(){
			return this.params.dragW/this.params.boxW;
		},
		Height(){
			return this.params.dragH/this.params.boxH;
		},
		boxHeight(){
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			return h - 140;
		},
		
	},
	filters:{
	  	filterName(str){
	  		let num = str.lastIndexOf(".");
	  		if(num==-1){
	  			return str;
	  		}else{
	  			return str.substring(0,num);
	  		}
	    	
	  	},
	},
	watch: {
		scrollTop(){
			let imgH = document.querySelectorAll('.item')[0].offsetHeight;
			//console.log('imgH',imgH)
			//let num = Math.round(this.scrollTop/1160)+1;
			let num = Math.round(this.scrollTop/imgH)+1;
			if(this.signedInfo.Images){
				if(num > this.signedInfo.Images.length){
					this.pageNum = this.signedInfo.Images.length;
				}else{
					this.pageNum = num;
				}
			}
			
	    	/*var bottom = ((this.scrollTop/748).toFixed(1)).split('.')[1];
	    	this.top = ((9.3-bottom)/10) * 748;*/
		}
	},
	created(){
		//我的签章列表
		this.getSign();
		//合同详情
		this.getSignedDetail();
	},
	mounted(){
		//滚动监听，合同页
		var _this = this;
		window.addEventListener('scroll', _this.handleScroll,true);
		document.querySelectorAll('html')[0].style="overflow: hidden";
	},
	destroyed() {
	  	document.querySelectorAll('html')[0].style="overflow: auto";
	 },
	methods: {
		handleScroll(){
			let box = document.getElementById('r_content');
			if(box){
				this.scrollTop = box.scrollTop;
			}
			//console.log('scrollTop',this.scrollTop)
		},
		backOne(){
			this.$router.go(-1);
			//this.$router.push({path: "/filesParent/AddFileTwo"})
		},
		//选择模板
		chooseTemplate(){
			this.$router.push({path: "/filesParent/saleContract/1"})
		},
		//链接到印章
		toStamp(){
			this.$router.push({ path: "/accountParent/account/SignatureMGT"});
		},
		toTop(){
		    document.getElementById('r_content').scrollTop = 0 ;
		},
		
		//获取合同详情
		getSignedDetail(){
			var _this = this;
			_this.listLoading2 = true;
			getContractDetail(_this.$route.params.id).then(res => {
				_this.listLoading2 = false;
				_this.signedInfo = res.Data;
			}).catch( error => {
				_this.listLoading2 = false;
			})
		},
		
		//发送
		sendFile(){
			var _this = this;
			_this.isLoading = true;
			//console.log(this.PointX,this.PointY,this.Width,this.Height)
			const params = {
				"TaskID": _this.signedInfo.TaskID,
				"ContractID": _this.signedInfo.ContractID,
		        "SignatureID":  _this.usedSign.ID,
		        "Page": _this.pageIndex,
		        "PointX": _this.PointX,
		        "PointY": _this.PointY,
		        "Width": _this.Width,
		        "Height": _this.Height
			}
			signContract(params).then( res => {
				_this.isLoading = false;
				_this.$router.push({ path: "/filesParent/files/1"});
			}).catch( error => {
				_this.isLoading = false;
			})
	        
		},
		//存草稿
		saveToDraft(){
			
		},
		//我的签章列表
	    getSign() {
	      const _this = this;
	      _this.listLoading = true;
	      getSignature().then( res => {
	      	 _this.listLoading = false;
	      	 _this.signList = (res.Data).slice(0,3);
	      }).catch(error => {
	      	 _this.listLoading = false;
	      })
	      
	    },
	    
	    //使用签章
	    useStamp(index){
	    	//this.usedFlag = true;
	    	this.current = index;
    		this.usedSign = this.signList[index];
    		//一页的高度
	    	let imgH = document.querySelectorAll('.item')[0].offsetHeight;
	    	/*console.log('imgH',imgH)
	    	let num = Math.round(this.scrollTop/1160)+1;*/
	    	let num = Math.round(this.scrollTop/imgH)+1;
			if(num > this.signedInfo.Images.length){
				this.pageIndex = this.signedInfo.Images.length;
			}else{
				this.pageIndex = num;
			}
	    	
	    	//返回位置信息
	    	let box = document.querySelectorAll('#r_content li')[this.pageIndex - 1];
	    	var _this = this;
	    	let measure = setTimeout(function(){
	    		let drag = document.querySelectorAll('.drag.block')[0];
	    		//获取盒子和签章的宽高
		    	_this.$set(_this.params,'boxW',box.offsetWidth);
		    	_this.$set(_this.params,'boxH',box.offsetHeight);
		    	_this.$set(_this.params,'dragW',drag.offsetWidth);
		    	_this.$set(_this.params,'dragH',drag.offsetHeight);
	    		//console.log(box.offsetWidth,box.offsetHeight,drag.offsetWidth,drag.offsetHeight)
	    	}, 200);
	    	
	    },
	    
	    //拖拽签章
	    dragImg(e){
	    	var box = document.querySelectorAll('#r_content li')[this.pageIndex - 1];
	    	var drag = e.currentTarget;
	    	//获取盒子和签章的宽高
	    	this.$set(this.params,'boxW',box.offsetWidth);
	    	this.$set(this.params,'boxH',box.offsetHeight);
	    	this.$set(this.params,'dragW',drag.offsetWidth);
	    	this.$set(this.params,'dragH',drag.offsetHeight);
	    	//console.log(box,drag,box.offsetWidth,box.offsetHeight,drag.offsetWidth,drag.offsetHeight)
	    	//console.log(e.target,e.currentTarget);
	    	var e = e || window.event; //兼容ie浏览器
			e.preventDefault();  //阻止浏览器的默认行为
            var diffX = e.clientX - drag.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
            var diffY = e.clientY - drag.offsetTop;
            /*低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
		             解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
		             可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
		             限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中*/
            if(typeof drag.setCapture!='undefined'){
                drag.setCapture();
            }
            var _this = this;
            document.onmousemove = function(e) {
                var e = e || window.event; //兼容ie浏览器
                var left=e.clientX-diffX;
                var top=e.clientY-diffY;

                //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
                if(left<0){
                    left=0;
                }else if(left > box.offsetWidth-drag.offsetWidth){
                    left = box.offsetWidth-drag.offsetWidth;
                }
                if(top<0){
                    top=0;
                }else if(top > box.offsetHeight-drag.offsetHeight){
                    top = box.offsetHeight-drag.offsetHeight;
                }
                //移动时重新得到物体的距离，解决拖动时出现晃动的现象
                /*drag.style.left = left+ 'px';
                drag.style.top = top + 'px';*/
                _this.left = left;
                _this.top = top;
            };
            document.onmouseup = function(e) { //当鼠标弹起来的时候不再移动
            	//console.log(this)
                this.onmousemove = null;
                this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
                //修复低版本ie bug
                if(typeof drag.releaseCapture!='undefined'){
                    drag.releaseCapture();
                }
                //this.usedFlag = false;
            };
	    },
	    
	    //平板端
	    dragImgTouch(e){
	    	var e = e || window.event; //兼容ie浏览器
	    	e.preventDefault();
	    	var touch = e.touches[0];
	    	var box = document.querySelectorAll('#r_content li')[this.pageIndex - 1];
	    	var drag = touch.target;
	    	//获取盒子和签章的宽高
	    	this.$set(this.params,'boxW',box.offsetWidth);
	    	this.$set(this.params,'boxH',box.offsetHeight);
	    	this.$set(this.params,'dragW',drag.offsetWidth);
	    	this.$set(this.params,'dragH',drag.offsetHeight);
	    	
	    	//console.log(e.target,e.currentTarget);
            var diffX = touch.clientX - drag.offsetLeft; 
            var diffY = touch.clientY - drag.offsetTop;
            
            var _this = this;
            drag.ontouchmove = function(e) {
                var e = e || window.event; //兼容ie浏览器
                e.preventDefault();
                var touch = e.touches[0];
                var left = touch.clientX-diffX;
                var top = touch.clientY-diffY;

                //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
                if(left<0){
                    left=0;
                }else if(left > box.offsetWidth-drag.offsetWidth){
                    left = box.offsetWidth-drag.offsetWidth;
                }
                if(top<0){
                    top=0;
                }else if(top > box.offsetHeight-drag.offsetHeight){
                    top = box.offsetHeight-drag.offsetHeight;
                }
                //移动时重新得到物体的距离，解决拖动时出现晃动的现象
                /*drag.style.left = left+ 'px';
                drag.style.top = top + 'px';*/
                _this.left = left;
                _this.top = top;
            };
            drag.ontouchend = function(e) { //当鼠标弹起来的时候不再移动
            	//console.log(this)
                _this.ontouchmove = null;
                _this.ontouchend = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
                //this.usedFlag = false;
            };
	    },
	    
	    
	    
	    
		
	}
}
</script>

<style scoped>
.fileCont{
	max-width: 1120px;
	margin: 0 auto ;
	padding: 85px 40px 5px;
	color: #303030;
	font-family: MicrosoftYaHei;
	box-sizing: border-box;
}
.header{
	width: 100%;
	margin-bottom: -10px;
	display: flex;
	justify-content: space-between;
}
.left_icon{
	cursor: pointer;
	background: url(../../assets/img/icon-left.png) no-repeat center;
	width: 9px;
	height: 13px;
	display: inline-block;
	margin-right: 10px; 
}
.header .head-title{
	font-size: 18px;
	cursor: pointer;
}
.choise_item{
	width: 100px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #FC4514;
	font-size: 14px;
	text-align: center;
	cursor: pointer;
	display: inline-block;
	margin-left: 15px;
}
.r_header {
  width: 100%;
  line-height: 34px;
  background: #f3f3f3;
  color: #FC4514;
  font-size: 14px;
  padding-left: 15px;
  box-sizing: border-box;
  font-family: MicrosoftYaHei;
}
.content{
	width: 100%;
	margin: 20px auto 0;
}
.content .left{
	height: 100%;
	width: 238px;
	border: 1px solid #E0E0E0;
	float: left;
	margin-right: 15px;
}
.content .right{
	float: left;
	/*width: 843px;*/
	width:  calc(100% - 257px);
	border: 1px solid #E0E0E0;
	padding-bottom: 25px;
	position: relative;
}
.content .r_header{
	width: 100%;
	color: #4e4e4e;
	background: #F3F3F3;
	display: flex;
	justify-content: space-between;
}
.content .r_header .more{
	color: #FC4514;
	cursor: pointer;
}
.content .r_header .more img{
	margin: 0 15px 0 5px;
}
.stamps-wrap{
	width: 100%;
	/*height: 100%;*/
	overflow-x: hidden;
	overflow-y: auto;
	position: relative;
}
.stamps{
	margin: 25px 15px 0;
	
	
}
.stamps li{
	width: 99%;
	margin-bottom: 12px;
}
.stamps li .toUse{
	font-size: 12px;
	color: #4E4E4E;
	display: flex;
	justify-content: center;
}
.stamps li .img_wrap{
	width: 100%;
	height: 100px;
	margin-bottom: 10px;
	border: 1px solid #E0E0E0;
	display: flex;
	justify-content:center;
	align-items: center;
	cursor: pointer;
}
.stamps li .img_wrap.active{
	border: 1px solid #777;
}
.stamps li img{
	max-height: 85px;
}
.right ul{
	/*width: 843px;*/
	width: 100%;
	margin: 0 auto;
	overflow-x: hidden;
	overflow-y: auto;
}
.right ul li{
	width: calc(100%-23px);
	/*width: 820px;*/
	/*height: 1160px;*/
	border-bottom: 1px dashed #C5C5C5;
	position: relative;
}
.right ul li:last-child{
	border-bottom: none;
}
.drag{
	position: absolute;
	left: 70%;
	top: 50%;
	max-width: 160px;
	z-index: 1;
	display: none;
}
.right ul li span.pageIndex{
	position: absolute;
	left: 50%;
	margin-left: -2px;
	bottom: 0;
}
.right ul li img.item{
	width: 100%;
	height: auto;
	/*width: 820px;
	height: 1160px;*/
}
.btn_group{
	/*float: right;
	margin-top: 10px;*/
	font-size: 14px;
}
.btn_group .next_btn,.btn_group .draft{
	width: 90px;
	height: 30px;
	line-height: 30px;
	/*border-radius: 4px;*/
	display: inline-block;
	text-align: center;
	cursor: pointer;
	font-size: 13px;
}
.btn_group .next_btn{
	color: #fff;
	background: #FC4514;
	/*margin-right: 15px;*/
}
.btn_group .draft{
	color: #1B1B1B;
	background: #D8D8D8;
}
.pageNum{
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate(-50%,0);
	font-size: 16px;
	color: #B9B9B9;
}
.toTop{
	width: 44px;
	height: 44px;
	border-radius: 50%;
	/*background: #f00;*/
	background: #E6E5E5 url(../../assets/img/to-top.png) no-repeat center;
	position: absolute;
	right: 15px;
	bottom: 30px;
}
.toTop:hover{
	background-color: #B7BBC5;
}
.block{
	display: block;
}
.dataNOne{
	width: 100%;
	line-height: 30px;
	font-size: 14px;
	text-align: center;
}

@media screen and (max-width: 767px){
	.content .left{
		width: 160px;
	}
	.content .right{
		width:  calc(100% - 179px);;
	}
	
	.stamps li .img_wrap{
		height: 70px;
	}
	
}

/*@media screen and (min-width: 767px){*/
	   /*自定义滚动条 */
		.right ul::-webkit-scrollbar,.stamps-wrap::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
			width:10px;
			height:6px;
			border-radius:4px;
		}
		.right ul::-webkit-scrollbar-button,.stamps-wrap::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
			display: none;
		}
		.right ul::-webkit-scrollbar-track,.stamps-wrap::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
				background:#F3F3F3;
				border-radius:4px;
		}
		.right ul::-webkit-scrollbar-track-piece,.stamps-wrap::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
				background:#F3F3F3;
				border-radius:4px;
		}
		.right ul::-webkit-scrollbar-thumb,.stamps-wrap::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
			background: #C6C6C6;
			border-radius:4px;
		}
		.right ul::-webkit-scrollbar-corner,.stamps-wrap::-webkit-scrollbar-corner {/*边角（位置6）*/
			background: #F3F3F3; 
		}
		.right ul::-webkit-scrollbar-resizer,.stamps-wrap::-webkit-scrollbar-resizer  {/*定义右下角拖动块的样式（位置7）*/
			background: #F3F3F3 ;
		}
		.right ul::-webkit-scrollbar-hightlight-color,.stamps-wrap::-webkit-scrollbar-hightlight-color  {/*定义右下角拖动块的样式（位置7）*/
			background: #F3F3F3 ;
		}
		
		.right ul,.stamps-wrap{
			scrollbar-arrow-color: #F3F3F3; /**//*三角箭头的颜色*/ 
			scrollbar-face-color: #C6C6C6; /**//*立体滚动条的颜色*/ 
			scrollbar-3dlight-color: #C6C6C6; /**//*立体滚动条亮边的颜色*/ 
			scrollbar-highlight-color: #F3F3F3; /**//*滚动条空白部分的颜色*/ 
			scrollbar-shadow-color: #F3F3F3; /**//*立体滚动条阴影的颜色*/ 
			scrollbar-darkshadow-color: #F3F3F3; /**//*立体滚动条强阴影的颜色*/ 
			scrollbar-track-color: #F3F3F3; /**//*立体滚动条背景颜色*/ 
			scrollbar-base-color:#F3F3F3; /**//*滚动条的基本颜色*/ 
		}
/*}*/


</style>