<template>
	<div id="addFile">
		<div class="addFile">
			<div class="fileCont">
				<div class="header">
		      		<div class="head-title" @click="backOne"><i class="left_icon"></i>添加文件</div>
			        <!--<div class="chooseTemplate" @click="chooseTemplate">选择模板</div>-->  
			    </div>
			    <div class="basicInfor">
			    	<div class="r_header">
				        <span class="r_header_title">填写基本信息</span>
				    </div>
				    <div class="contract">
				    	<div>
				    		<div class="file_icon">
				    			<div class="cover" v-if="imgUrls.length>0">
				    				<img :src="imgUrls[0]" />
				    				<span @click="preView">预览</span>
				    				<i class="count">共{{imgUrls.length}}页</i>
				    			</div>
				    		</div>
				    		<div class="detail">
				    			<span class="name">{{fileName}}</span>&nbsp;
				    			<span class="size">{{fileSize|bytesToSize}}</span>&nbsp;
				    			<img src="../../assets/img/file-sure.png" alt="" style="position: relative;top:2px"/>
				    		</div>
				    		
				    	</div>
				    	<div class="more">
				    		<div class="reload">
					    		<span>重新上传</span>
					    		<input type="file" name="upLoad" id="upLoad" value="" multiple="multiple" @change="reupload"/>
					    	</div>
					    	<!--<div class="moreImg" v-if="fileType.indexOf('image') == 0">
					    		<span>继续上传图片</span>
					    		<input type="file" name="moreImg" id="moreImg" value="" @change="moreImg" accept='image/*'/>
					    	</div>-->
				    	</div>
				    	
				    </div>
				    
				    <div class="form1">
				    	<div>
				    		<label for="contractName">合同名称&nbsp;</label>
				    		<input type="text" name="contractName" value="fileName" v-model="fileName"/>
				    	</div>
				    	<div>
				    		<label for="flieRemark">文件备注&nbsp;</label>
				    		<textarea id="flieRemark" name="flieRemark" rows="" cols="" placeholder="请输入备注，140字以内"
				    			v-model="flieRemark">
				    		</textarea>
				    	</div>
				    </div>
				    
			    </div>
			    
			</div>
			<div class="line"></div>
			<div class="btn_group">
				<div class="next_btn" @click="savaFile">下一步</div>
			</div>
      	</div> 
      	
      	<!--预览文件-->
      	
      	<div class="preViewImg" v-if="isPreView">
      		<div class="wrap" id="imgWrap">
      			<ul>
	      			<li v-for="(item,index) in imgUrls" :key="index" class="item">
	      				<img :src="item"/>
	      			</li>
	      		</ul>
      		</div>
      		<div>
		        <span class="count">{{pageNum}}/{{imgUrls.length}}</span>
		        <span class="close" @click="closePDF"></span>
      		</div>
      		<div v-if="scrollTop>120" class="toTop" @click="toTop"></div>
      	</div>
      	
	</div>
</template>

<script>
import { getContractDetail,imgToPdf,wordToPdf,modifyContract } from '@/api/file'
export default{
	data(){
		return {
			flieRemark: "",    //文件备注
			imgUrls:[],		   //上传的图片转化为地址
			fileInfo:'',
			fileSize: '',
			contractID: null,
			fileIcon: require('@/assets/img/world.png'),
			fileName: '',
			isPreView: false,
			pageNum: 1,
			scrollTop: 0,
			loading: null,
		}
	},
	computed:{
		
	},
	watch: {
		scrollTop(){
			let imgH = document.querySelectorAll('.item')[0].offsetHeight + 15;
			let num = Math.round(this.scrollTop/imgH)+1;
			if(this.imgUrls){
				if(num > this.imgUrls.length){
					this.pageNum = this.imgUrls.length;
				}else{
					this.pageNum = num;
				}
			}
		}
	},
	filters: {
		bytesToSize(bytes){
			if (bytes === 0) return '0 B';  
        	const k = 1024;  
        	const sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];  
        	let i = Math.floor(Math.log(bytes) / Math.log(k));  
   			return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i] ; 
		}
	},
	created(){
		this.getDetailInfo();  //文件详情
	},
	mounted(){
		//滚动监听，合同页
		var _this = this;
		window.addEventListener('scroll', _this.handleScroll,true);
	},
	
	methods: {
		handleScroll(){
			let box = document.getElementById('imgWrap');
			if(box){
				this.scrollTop = box.scrollTop;
			}
			//console.log('scrollTop',this.scrollTop)
		},
		backOne(){
			this.$router.go(-1);
		},
		//选择模板
		chooseTemplate(){
			this.$router.push({path: "/filesParent/saleContract/1"})
		},
		toTop(){
		    document.getElementById('imgWrap').scrollTop = 0 ;
		},
		//重新上传
		reupload(e){
			var files = e.target.files[0];
			this.fileName = files.name;
			/*this.fileType = files.type;*/
			if(files.type.indexOf('image') == 0){
				/*图片*/
				this.ImgToPdf(e.target.files);
			}else{
				/*文件*/
		    	this.WordToPdf(files);
			}
		    
			
		},
		
		//预览
		preView(){
			this.isPreView = true;
		},
		//关闭预览
		closePDF(){
			this.isPreView = false;
		},
		
		//获取合同详情
		getDetailInfo(){
			var _this = this;
			getContractDetail(_this.$route.params.id).then(res => {
				_this.fileInfo = res.Data;
	        	_this.fileSize = res.Data.FileSize;
	        	_this.fileName = res.Data.ContractName;
				_this.imgUrls = res.Data.Images;
				_this.contractID = res.Data.ContractID;
			}).catch(error => {
				
			})
			
		},
		
		//把前端文件保存到后台进入草稿箱，修改合同基本信息
		savaFile(){
			var _this = this;
			const params = {
				"ID":_this.contractID,
                "Name":_this.fileName,
                "Remark":_this.flieRemark
			};
			this.startLoading();
			modifyContract(params).then(res=>{
				_this.closeLoading()
				let contractId = res.Data.ID;
	        	_this.$router.push({ name: "addFileTwo" ,params:{id:contractId} });
			}).catch(error => {
				_this.closeLoading()
			})
			
		},
		
		//文件转换成pdf
		WordToPdf(fileInfo) {
			var _this = this;
			_this.fileSize = fileInfo.size
			/*_this.$set(_this.size, 0, fileInfo.size);*/
			var formData = new FormData();
			formData.append("file", fileInfo);
			formData.append("Remark", _this.flieRemark);
			formData.append("ContractName", fileInfo.name);
			this.startLoading();
		    wordToPdf(formData).then(res => {
		     	_this.closeLoading()
		      	_this.fileInfo = res.Data;
				_this.imgUrls = res.Data.ImageUrls;
				_this.contractID = res.Data.ID;
	        }).catch(error => {
	        	_this.closeLoading()
	        	document.getElementById('isFile').value = "";
	        })
			
		},
	
		//图片转换成pdf
		ImgToPdf(fileData) {
			var _this = this;
			var formData = new FormData();
			//可以多张图
			let size = 0;
			for(let i in fileData) {
				if(!isNaN(i)){
					formData.append("file", fileData[i]);
					formData.append("ContractName", fileData[i].name);
					size += fileData[i].size;
				}
			}
			formData.append("Remark", _this.flieRemark);
			/*_this.$set(_this.size, 0, size);*/
			_this.fileSize = size
			var _this = this;
			this.startLoading();
		    imgToPdf(formData).then(res => {
		    	_this.closeLoading()
		      	_this.fileInfo = res.Data;
				_this.imgUrls = res.Data.ImageUrls;
				_this.contractID = res.Data.ID;
	        }).catch(error => {
	        	_this.closeLoading()
	        	document.getElementById('isFile').value = "";
	        })
			
		},
		
		startLoading() {
        	this.loading = this.$loading({
			  	lock: true,
		          text: '拼命加载中',
		          spinner: 'el-icon-loading',
		          background: 'rgba(0, 0, 0, 0.7)'
			})
	    },
	   
	    closeLoading() {
			this.loading.close();
	    }
		
		
	}
}
</script>

<style scoped>
/*#addFile{
	width: 100%;
}*/
.fileCont{
	max-width: 970px;
	margin: 0 auto;
	padding: 85px 40px 0;
}
.header{
	width: 100%;
	margin-bottom: 15px;
	display: flex;
	justify-content: space-between;
}

.header .head-title{
	font-size: 18px;
}

.chooseTemplate{
	width: 100px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #FC4514;
	font-size: 14px;
	text-align: center;
	cursor: pointer;
}

.r_header {
  width: 100%;
  line-height: 40px;
  background: #f3f3f3;
  color: #FC4514;
  font-size: 14px;
  padding-left: 15px;
  box-sizing: border-box;
  font-family: MicrosoftYaHei;
}
.left_icon{
	cursor: pointer;
	background: url(../../assets/img/icon-left.png) no-repeat center;
	width: 9px;
	height: 13px;
	display: inline-block;
	margin-right: 10px; 
}
.basicInfor .contract{
	/*width: 1000px;*/
	width: 100%;
	height: 100px;
	border: 1px solid #E5E5E5;
	margin: 35px auto;
	position: relative;
}
.file_icon{
	margin: 17px 25px;
	width: 50px;
	height: 68px;
	overflow: hidden;
	position: relative;
}
.file_icon .cover{
	position: relative;
    width: 50px;
	height: 68px;
	cursor: pointer;
}
.file_icon .cover span{
	position: absolute;
    display: none;
    width: 100%;
	height: 100%;
	left: 0;
	top: 0;
    text-align: center;
    font-size: 12px;
    color: #fff;
    line-height: 68px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    cursor: pointer;
}
.file_icon .cover .count{
	position: absolute;
	display: block;
	width: 100%;
	height: 20px;
	left: 0;
	bottom: 0px;
	color: #fff;
	background: rgba(0, 0, 0, 0.6);
	font-size: 12px;
	line-height: 20px;
	text-align: center;
}
.file_icon .cover:hover span{
	display: block;
}
.file_icon .cover:hover .count{
	display: none;
}
.file_icon .cover img{
	width: 50px;
	height: 68px;
}
.contract .detail {
	position: absolute;
	top: 40%;
	left: 95px;
}
.contract .name{
	color: #303030;
	font-size: 12px;
}
.contract .size{
	font-size: 12px;
	color: #bbb;
}
.basicInfor{
	width: 100%;
}
.basicInfor .more{
	width: 244px;
	height: 30px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -120px;
	margin-top: -15px;
	line-height: 30px;
	text-align: center;
	color: #FC4514;
	font-size: 14px;
}

.basicInfor .reload,.basicInfor .moreImg{
	border: 1px solid #FC4514;
	cursor: pointer;
	position: relative;
	display: inline-block;
}
.basicInfor .reload{
	width: 100px;
	margin-right: 15px;
}
.basicInfor .moreImg{
	width: 120px;
}
.basicInfor .reload input,.basicInfor .moreImg input{
	position: absolute;
    width: 180%;
    height: 100%;
    right: 0;
    top: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 5;
}
.form1,.form2,.form3{
	max-width: 725px;
	/*width: 725px;*/
	margin: 0 auto 35px;
	font-size: 14px;
}

.form1 label,.form2 label{
	display: inline-block;
	width: 10%;
	/*min-width: 65px;*/
}

.form1 input{
	/*width: 651px;*/
	width: 80%;
	height: 34px;
	line-height: 14px;
	margin-bottom: 20px;
	padding: 10px 15px;
	font-size: 14px;
	box-sizing: border-box;
	/*-webkit-appearance: textarea;*/
	border: 1px solid #ccc;
}

.form1 textarea{
	width: 80%;
	/*width: 620px;*/
	height: 65px;
	line-height: 24px;
	padding: 8px 15px;
	font-family: MicrosoftYaHei;
	font-size: 14px;
	border: 1px solid #ccc;
	box-sizing: border-box;
}

.form1 label[for="flieRemark"]{
	position: relative;
	top: -60px;
}

.saveTo{
	position: absolute;
	right: -120px;
	top: 30px;
}

.saveTo input{
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: middle;
	margin-right: 10px;
	position: relative;
	top: -1px;
}

.line{
	width: 100%;
	height: 1px;
	border-bottom: 1px solid #D4D4D4;
}
.left{
	float: left;
}

.btn_group{
	max-width: 970px;
	/*width: 1100px;*/
	margin: 30px auto 10px;
	padding: 0 40px;
	font-size: 14px;
}
.btn_group .next_btn,.btn_group .draft{
	width: 90px;
	height: 30px;
	line-height: 30px;
	border-radius: 4px;
	display: inline-block;
	text-align: center;
	cursor: pointer;
}
.btn_group .next_btn{
	color: #fff;
	background: #FC4514;
	margin-right: 15px;
}
.btn_group .draft{
	color: #1B1B1B;
	background: #D8D8D8;
}
.loading{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99;
}
.loading img{
	width: 100px;
}

.preViewImg{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,0.5);
	z-index: 98;
}
.preViewImg .wrap{
	width: 1000px;
	/*max-width: 1000px;*/
	text-align: center;
	padding: 0 50px;
    position: absolute;
    top: 70px;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
}
.preViewImg ul{
	/*max-width: 970px;*/
	width: 100%;
	/*box-shadow: 0 4px 4px 5px rgba(0,0,0,0.15);*/
}
.preViewImg ul li,.preViewImg ul li img{
	width: 100%;
	/*max-width: 970px;*/
	height: auto;
	background: #fff;
	
}
.preViewImg ul li{
	/*height: 1372px;*/
	margin-bottom: 15px;
}
.preViewImg ul li:last-child{
	margin-bottom: 0;
	padding-bottom: 5px;
}

.preViewImg .count{
	position: fixed;
    transform: translate(-50%, 0);
    left: 50%;
    bottom: 2px;
    font-size: 16px;
    line-height: 25px;
}
.preViewImg .close {
    position: fixed;
	right: 5px;
	top: 65px;
    background: url(../../assets/img/big-close.png) no-repeat center;
    cursor: pointer;
    text-align: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
}
.toTop{
	width: 44px;
	height: 44px;
	border-radius: 50%;
	/*background: #f00;*/
	background: #E6E5E5 url(../../assets/img/to-top.png) no-repeat center;
	position: absolute;
	right: 5px;
	bottom: 25px;
}
.toTop:hover{
	background-color: #B7BBC5;
}


@media only screen and (max-width: 1100px) {
	.preViewImg .wrap{
		max-width: 800px;
		padding: 0 20px;
	}
}
@media only screen and (max-width: 860px) {
	.preViewImg .wrap{
		max-width: 700px;
		padding: 0 20px;
	}
}

@media only screen and (max-width: 767px){
	.form1 label{
		width: 100%;
		margin-bottom: 5px;
	}
	.form1 label[for="flieRemark"]{
		top: 0;
	}
	.form1 input,.form1 textarea{
		width: 100%;
	}
	.basicInfor .more{
		left: 80%;
	}
	
	.preViewImg .wrap{
		max-width: 600px;
		padding: 0 60px;
		overflow-x: auto;
	}
	
}

@media only screen and (max-width: 500px){
	.basicInfor .more{
		top: 16px;
		left: 80%;
	}
	.preViewImg .wrap{
		max-width: 400px;
		padding: 0 50px;
	}
}



   /*自定义滚动条 */
.wrap::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
	width:10px;
	height:10px;
	border-radius:6px;
}
.wrap::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
	display: none;
}
.wrap::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
		background:#7F7F7F;
		border-radius:6px;
}
.wrap::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
		background:#7F7F7F;
		border-radius:6px;
}
.wrap::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
	background: #fff;
	border-radius:6px;
}
.wrap::-webkit-scrollbar-corner {/*边角（位置6）*/
	background: #7F7F7F; 
}
.wrap::-webkit-scrollbar-resizer  {/*定义右下角拖动块的样式（位置7）*/
	background: #7F7F7F ;
}
.wrap::-webkit-scrollbar-hightlight-color  {/*定义右下角拖动块的样式（位置7）*/
	background: #7F7F7F ;
}

.wrap{
	scrollbar-arrow-color: #8F8F8F; /**//*三角箭头的颜色*/ 
	scrollbar-face-color: #fff; /**//*立体滚动条的颜色*/ 
	scrollbar-3dlight-color: #fff; /**//*立体滚动条亮边的颜色*/ 
	scrollbar-highlight-color: #8F8F8F; /**//*滚动条空白部分的颜色*/ 
	scrollbar-shadow-color: #8F8F8F; /**//*立体滚动条阴影的颜色*/ 
	scrollbar-darkshadow-color: #8F8F8F; /**//*立体滚动条强阴影的颜色*/ 
	scrollbar-track-color: #8F8F8F; /**//*立体滚动条背景颜色*/ 
	scrollbar-base-color:#8F8F8F; /**//*滚动条的基本颜色*/ 
}
</style>