<template>
  <div id="certificate">
    <div class="container">
      <!-- 菜单栏栏 -->
      <div class="header">
      	<div class="header-wrap">
      			<p class="title" @click="backOne"><img src="../../assets/img/icon-left.png"/>企业认证</p>
			      <div class="menu hidden-xs-only">
			      	<span :class="{active: !nextFlag}">填写企业基本信息
			      	</span><span :class="{active: nextFlag}">
			      		身份信息
			      	</span>
			      </div>
      	</div>
      		
      </div>
      <!-- 内容 -->
      <div class="content">
      	<el-form :class="{hidden: nextFlag }" ref="CInfo1" :rules="rules" :model="CInfo" label-width="205px" class="cInfo">
					  <el-form-item label="企业名称" prop="CompanyName">
					    <el-input v-model="CInfo.CompanyName" placeholder="输入企业全称" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="组织机构代码" prop="OrganizeNumber">
					  	<el-input  v-model="CInfo.OrganizeNumber" placeholder="12345678-1" autocomplete="off"></el-input>
					  	<div class="tip">注：如三证合一，填统一社会信用代码</div>
					  </el-form-item>
					  <el-form-item label="工商执照注册号" prop="RegistrationNumber">
					    <el-input  v-model="CInfo.RegistrationNumber" placeholder="123456789123456" autocomplete="off"></el-input>
					    <div class="tip">注：如三证合一，填统一社会信用代码</div>
					  </el-form-item>
					  <el-form-item label="企业负责人姓名/法定代表" prop="HeaderName">
					    <el-input v-model="CInfo.HeaderName" placeholder="张三" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="企业负责人身份证号" prop="HeaderIDNumber">
					  	<el-input  v-model="CInfo.HeaderIDNumber" placeholder="441010197001010000" autocomplete="off"></el-input>
					  </el-form-item>
					  
					  <el-form-item label="上传营业执照图片" class="upLoad" prop="licenseImg">
					  	  <div class="cont">
					  	  	<div class="left">
		  							<img :src="CInfo.licenseImg ? CInfo.licenseImg : require('../../assets/img/license.png')"  alt="" />
		  							<!--<span @click="prewImg(CInfo.licenseImg)">预览</span>-->
		  						</div>
		  						<div class="right">
		  							<div class="imgTip">
		  								<p>请上传原件或扫描件，或者复印件加盖企业公章后的扫描件在有效期内且年检章齐全（当年成立的可无年检章）,由中国大陆工商局或市场监督管理局颁发，</p>
		  								<p>支持jpg,jpeg,bmp,gif,png.格式照片，大小不超过2M。</p>
		  							</div>
		  							<div class="chooseImg">
		  								<p>选择图片</p>
		  								<input type="file" accept='image/*'  @change="uploadImg(1,$event)"/>
		  							</div>
						  	  </div>
	  						</div>
	  						<el-input type="hidden" v-model="CInfo.licenseImg" class="hidden"></el-input>
					  </el-form-item >
					  <el-form-item label="上传申请文件" class="upLoad" prop="applicationImg">
					  	<div class="cont">
					  		<div class="left">
	  							<img :src="CInfo.applicationImg ? CInfo.applicationImg : require('../../assets/img/application.png')"  alt="" />
	  							<!--<span @click="prewImg(CInfo.applicationImg)">预览</span>-->
	  						</div>
	  						<div class="right">
	  							<div class="imgTip">
	  								<p>请下载<span style="cursor: pointer;" @click="downLoadDom">《企业账户认证及申请表》</span>并按要求填写。要求<span>法人代表/负责人 或代理人签字，并加盖企业公章</span>，</p>
	  								<p>支持jpg,jpeg,bmp,gif,png.格式照片，大小不超过2M。</p>
	  							</div>
	  							<div class="chooseImg">
	  								<p>选择图片</p>
	  								<input type="file" accept='image/*'  @change="uploadImg(2,$event)"/>
	  							</div>
	  						</div>
					  	</div>
					  	<el-input type="hidden" v-model="CInfo.applicationImg" class="hidden"></el-input>
					  </el-form-item>
					  <el-form-item label="企业负责人手机号" prop="HeaderMobil">
					  	<el-input  v-model="CInfo.HeaderMobil" placeholder="用于接收重要通知" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="短信验证码"prop="HeaderMobilAuthCode">
					  	<div class="captcha-wrap el-form-item" >
	              <el-input placeholder="请输入验证码" maxlength="6" v-model="CInfo.HeaderMobilAuthCode" autocomplete="off"></el-input>
	              <div class="captcha-num">
	              	<div @click="getCode()" class="captcha" v-if="getCodeFlag">获取验证码</div>
	                <span v-if="!getCodeFlag">重新发送（{{time}}s）</span>
	              </div>
	            </div>
					  </el-form-item>
					  <el-form-item>
					    <el-button type="primary" size="small" @click="next('CInfo1')">下一步</el-button>
					  </el-form-item>
					</el-form>
      	
      	
      		<el-form :class="{hidden: !nextFlag }" ref="CInfo2" :rules="rules" :model="CInfo" label-width="205px" class="idInfo">
      				<el-form-item label="上传身份证正面图片" class="upLoad" prop="frontIDCImg">
      						<div class="cont">
      							<div class="left">
			  							<img :src="CInfo.frontIDCImg ? CInfo.frontIDCImg : require('../../assets/img/frontID.png')" alt=""/>
			  							<!--<span @click="prewImg(CInfo.frontIDCImg )">预览</span>-->
			  						</div>
			  						<div class="right">
			  							<div class="imgTip">
			  								<p>请上传身份证人像面，注意边缘不超出边框外，确保照片清晰可见，保持水平，注意反光，</p>
			  								<p>支持jpg,jpeg,bmp,gif,png.格式照片，大小不超过2M。</p>
			  							</div>
			  							<div class="chooseImg">
			  								<p>选择图片</p>
			  								<input type="file" accept='image/*'  @change="uploadImg(3,$event)"/>
			  							</div>
	      						</div>
		  						</div>
		  						<el-input type="hidden" v-model="CInfo.frontIDCImg" class="hidden"></el-input>
      				</el-form-item>
      				<el-form-item label="上传身份证背面图片" class="upLoad" prop="backIDCImg">
      					<div class="cont">
      						<div class="left">
		  							<img :src="CInfo.backIDCImg ? CInfo.backIDCImg : require('../../assets/img/backID.png')" alt="" />
		  							<!--<span @click="prewImg(CInfo.backIDCImg)">预览</span>-->
		  						</div>
		  						<div class="right">
		  							<div class="imgTip">
		  								<p>请上传国徽面，注意边缘不超出边框外，确保照片清晰可见，保持水平，注意反光，</p>
		  								<p>支持jpg,jpeg,bmp,gif,png.格式照片，大小不超过2M。</p>
		  							</div>
		  							<div class="chooseImg">
		  								<p>选择图片</p>
		  								<input type="file" accept='image/*' @change="uploadImg(4,$event)"/>
		  							</div>
		  						</div>
      					</div>
      					<el-input type="hidden" v-model="CInfo.backIDCImg" class="hidden"></el-input>
      				</el-form-item>
      				 <el-form-item>
							    <el-button type="primary" size="small" @click="nextFlag = false">上一步</el-button>
							    <el-button type="primary" size="small" @click="submitCont('CInfo2')" :loading="loading">提交</el-button>
							  </el-form-item>
      		</el-form>
    	</div>
  </div>
  
  
 	 <!--预览图片-->
		<div class="preViewImg" v-if="isPrewImg">
			<div class="wrap" id="imgWrap">
					<img :src="prewImgUrl"/>
			</div>
			<div>
	        <span class="close" @click="closeImg"></span>
  		</div>
		</div>
  	
		
</div>
</template>


<script>
import { getCaptchaCode} from '@/api/user'
import { companyAuth } from '@/api/account'
import { getObjectURL } from '@/utils/formatData'
import {validateCode,validatePhone,validateIDNumber,validateOrganizeNumber,validateRegNum} from '@/utils/validate'
export default {
  components: {
  	
  },
  data() {
    return {
    	CInfo: {
    		CompanyName: '',								 //公司名称
    		OrganizeNumber: "",              //组织机构代码
    		RegistrationNumber: "",          //工商注册号
    		HeaderName: "",									 //企业负责人姓名
    		HeaderIDNumber: "",              //企业负责人身份证号
    		HeaderMobil: "",								 //企业负责人手机号
    		HeaderMobilAuthCode: "",         //验证码
    		applicationImg: "",  //申请表
    		licenseImg: "",       //营业执照
    		frontIDCImg: "" ,       //身份证正面
    		backIDCImg:   "" ,         //身份证反面
    	},
    	files: {
    		applicationFile: "",
    		licenseFile: "",
    		frontIDCFile: "",
    		backIDCFile: "",
    		
    		applicationFileType: "",
    		licenseFileType: "",
    		frontIDCFileType: "",
    		backIDCFileType: "",
    	},
    	rules: {
    		CompanyName: [
          { required: true, message: '请输入企业名称!', trigger: 'blur' }
        ],
        OrganizeNumber: [
          { validator: validateOrganizeNumber, trigger: 'blur' },
        ],
        RegistrationNumber: [
          { validator: validateRegNum, trigger: 'blur' }
        ],
        HeaderName: [
          { required: true, message: '请输入企业负责人姓名!', trigger: 'blur' }
        ],
        HeaderIDNumber: [
           { validator: validateIDNumber, trigger: 'blur' }
        ],
        HeaderMobil: [
        	{ validator: validatePhone, trigger: 'blur' }
        ],
        HeaderMobilAuthCode: [
          { validator: validateCode, trigger: 'blur' }
        ],
        applicationImg: [
        	{ required: true, message: '请上传签字并加盖企业公章的申请文件!', trigger: 'blur' }
        ],
        licenseImg: [
        	{ required: true, message: '请上传营业执照图片!', trigger: 'blur' }
        ],
        frontIDCImg: [
        	{ required: true, message: '请上传身份证正面图片!', trigger: 'blur' }
        ],
        backIDCImg: [
        	{ required: true, message: '请上传身份证背面图片!', trigger: 'blur' }
        ]
    	},
    	nextFlag: false,  //是否显示下一步的内容
    	getCodeFlag: true,
    	time: 60,
    	loading: false,
    	
    	isPrewImg: false,
    	prewImgUrl: "",
    	
    };
  },
  watch: {
  		/*files:{
　　　　　　　　handler(curVal,oldVal){
　　　　　　　　　　conosle.log(curVal,oldVal)
　　　　　　　　},
　　　　　　　　deep:true
　　　　　　 }*/
  },
  created() {
   	
  },
  methods: {
  	backOne(){
			this.$router.go(-1);
		},
		next(formName){
			this.$refs[formName].validate((valid) => {
          if (valid) {
			    		this.nextFlag = true;
          } else { 
            console.log('error submit!!');
            return false;
          }
        });
		},
  	//提交
  	submitCont(formName){
  			this.$refs[formName].validate((valid) => {
          if (valid) {
          	var _this = this;
			      var formData = new FormData();
			      formData.append("file", _this.files.licenseFile,"BusinessLicense."+_this.files.licenseFileType);
			      formData.append("file", _this.files.applicationFile,"ApplyDocument."+_this.files.applicationFileType);
			      formData.append("file", _this.files.frontIDCFile,"HeaderIDCard1."+_this.files.frontIDCFileType);
			      formData.append("file", _this.files.backIDCFile,"HeaderIDCard2."+_this.files.backIDCFileType);
			      
			      formData.append("CompanyName", _this.CInfo.CompanyName);
			      formData.append("OrganizeNumber",_this.CInfo.OrganizeNumber);
			      formData.append("RegistrationNumber", _this.CInfo.RegistrationNumber);
			      formData.append("HeaderName",_this.CInfo.HeaderName);
			      formData.append("HeaderIDNumber", _this.CInfo.headerIDNumber);
			      formData.append("HeaderMobil",_this.CInfo.HeaderMobil);
			      formData.append("HeaderMobilAuthCode", _this.CInfo.HeaderMobilAuthCode);
			      _this.loading = true;
			      
			      companyAuth(formData).then(res => {
			      		 _this.loading = false;
			      		 _this.$message({
						    		showClose: true,
						        message: "提交成功，请等待审核通过。审核通过后，可在账号菜单栏下的印章管理查到企业电子章。",
						        type: 'success',
						        duration: 5 * 1000
						    })
			      }).catch(error => {
			      		 _this.loading = false;
			      })
          	
          } else { 
            console.log('error submit!!');
            return false;
          }
        });
  	},
  	
  	backFather(){
  		this.$router.push({ path: "/accountParent/account/basicInfo"});
  	},
  	// 获取验证码
    getCode() {
    	this.$refs.CInfo1.validateField("HeaderMobil",err => {
    		if(err){
      				return ;
				}else{
					const _this = this;
		      getCaptchaCode(_this.CInfo.headerMobil).then(res => {
		      	 		_this.getCodeFlag = false;
								_this.timeOut(60);
								_this.time = 60;
								_this.$message({
						          showClose: true,
						          message: '验证码已发送到手机',
						          type: 'success',
						          duration: 3*1000
						    });
		      }).catch(error => {
		      		
		      })
				}
    	})
    },
    
    timeOut(time) {
      var _this = this;
      setInterval(function() {
        _this.time = time--;
        if (_this.time <= 0) {
          _this.getCodeFlag = true;
        }
      }, 1000);
    },
  	
  	//下载申请表
  	downLoadDom(){
			 var _this = this;
  		 this.$axios({
	        method: "get",
	        url: _this.$link+ "api/Files/CompanyAuthApply",
	        responseType: "blob"
	      }).then(data => {
	        //console.log(data);
	        if (!data) {
	          return;
	        }
	        // debugger;
	        if (window.navigator.msSaveOrOpenBlob) {   // if browser is IE
	            navigator.msSaveBlob(PdfUrl, '企业认证申请表.pdf');//filename文件名包括扩展名，下载路径为浏览器默认路径
	        }else{
	        		let url = window.URL.createObjectURL(data.data);
			        let link = document.createElement("a");
			        link.style.display = "none";
			        link.href = url;
			        link.setAttribute("downLoad", '企业认证申请表.pdf'); //设置文件名称
			        document.body.appendChild(link);
			        link.click();
	        }
	        
	      });
  	},
  	
    //上传营业执照,文件，身份证
    uploadImg(type,ev){
    	let fileInfo = ev.target.files[0];
    	let fileType = ((fileInfo.type).split('/'))[1];
    	let fileSize = 0;
	    let isIE = /msie/i.test(navigator.userAgent) && !window.opera;
	    if (isIE && !ev.currentTarget.files) {
	        let filePath = ev.currentTarget.value;
	        let fileSystem = new ActiveXObject("Scripting.FileSystemObject");
	        if(!fileSystem.FileExists(filePath)){ 
	        	_this.$message({
				          showClose: true,
				          message: '附件不存在，请重新输入！',
				          type: 'success',
				          duration: 3*1000
				    });
						//alert("附件不存在，请重新输入！"); 
						return false; 
					} 
	        let file = fileSystem.GetFile (filePath);
	        fileSize = file.Size;
	    }else {
	        fileSize = fileInfo.size;
	        
	    }
	    //fileSize = Math.round(fileSize/1024/1024*100)/100;   
	    /*if(fileSize>=2){
	       if(type == 1){
	       		this.tip.licenseImgTip = "您上传的图片大小超过2M，请重新上传!";
	       		this.status.licenseImgStatus = false;
	       }else if(type == 2){
	       		this.tip.applyDomImgTip = "您上传的图片大小超过2M，请重新上传!";
	       		this.status.applyDomImgStatus = false;
	       }else if(type == 3){
	       		this.tip.frontIDCImgTip = "您上传的图片大小超过2M，请重新上传!";
	       		this.status.frontIDCImgStatus = false;
	       }else if(type == 4){
	       		this.tip.backIDCImgTip = "您上传的图片大小超过2M，请重新上传!";
	       		this.status.backIDCImgStatus = false;
	       }
	        return ;
	    }*/
	    
    	if(type == 1){  //营业执照
    		this.files.licenseFile = fileInfo;
    		this.files.licenseFileType = fileType;
    		this.CInfo.licenseImg = getObjectURL(fileInfo);
    	}else if(type == 2){  //申请文件
    		this.files.applicationFile = fileInfo;
    		this.files.applicationFileType = fileType;
    		this.CInfo.applicationImg = getObjectURL(fileInfo);
    	}else if(type == 3){  //身份证正面
    		this.files.frontIDCFile = fileInfo;
    		this.files.frontIDCFileType = fileType;
    		this.CInfo.frontIDCImg = getObjectURL(fileInfo);
    	}else if(type == 4){   //身份证反面
    		this.files.backIDCFile = fileInfo;
    		this.files.backIDCFileType = fileType;
    		this.CInfo.backIDCImg = getObjectURL(fileInfo);
    	}
    		
    },
    
    //预览图片
    prewImg(imgUrl){
    	this.isPrewImg = true;
    	this.prewImgUrl = imgUrl;
    },
    //关闭预览
		closeImg(){
			this.isPrewImg = false;
		},
		
		
  },
 
};
</script>

<style scoped>
#certificate{
	padding-top: 85px;
	font-family:MicrosoftYaHeiLight;
}
.header{
	width: 100%;
	border-bottom: 1px solid #CACACA;
}
.header-wrap .title{
	max-width: 970px;
	margin: 0 auto 15px;
	padding: 0 40px;
	color: #303030;
	line-height: 24px;
	font-size: 18px;
	cursor: pointer;
}
.header-wrap .title img{
	margin-right: 10px;
}
.header-wrap .menu{
	/*max-width: 970px;*/
	width: 560px;
	min-width: 560px;
	padding: 0 40px;
	margin: 0 auto 15px;
}
.menu span{
	display: inline-block;
	width: 238px;
	height: 34px;
	line-height: 34px;
	text-align: center;
	padding-left: 30px;
	border: 1px solid #CACACA;
	border-right: none;
	position: relative;
	color: #aaa;
	font-size: 14px;
	cursor: pointer;
	background: #fff url('../../assets/img/file-wrong.png') no-repeat 25% center;
}
.menu span.active{
	border: 1px solid #ECECEC;
	background: #ECECEC url('../../assets/img/file-sure.png') no-repeat 25% center;
}

.menu span:before{
	content: "";
	position: absolute;
	top: 4px;
	right: -12px;
	width: 25px;
	height: 24px;
	transform: rotate(45deg);
	background: #fff;
	z-index: 2;
	border-top: 1px solid #CACACA;
	border-right: 1px solid #CACACA;
}
.menu span.active:before{
	background: #ECECEC;
	border-color: #ECECEC;
}
.menu span:first-child:before{
	border-color: #ECECEC;
	right: -14px;
}
.menu span:last-child{
	background: #fff url('../../assets/img/file-wrong.png') no-repeat 35% center;
}
.menu span.active:last-child{
	border: 1px solid #ECECEC;
	/*right: -14px;*/
	background:#ECECEC url('../../assets/img/file-sure.png') no-repeat 35% center;
}
.menu span.active:last-child:before{
	right: -14px;
}
.content{
	max-width: 970px;
	padding: 0 40px;
	margin: 15px auto 50px;
	font-size: 14px;
}
.upLoad {
	margin-top: 30px;
	max-width: 780px;
}
.cInfo .upLoad .left{
	margin-right: 25px;
	/*float: left;*/
	width: 106px;
	height: 144px;
	border: 1px solid #D9D9D9;
	overflow: hidden;
	position: relative;
}
.cInfo .upLoad .left img{
	max-width: 108px;
	max-height: 146px;
}

.cInfo .upLoad .right{
	max-width: 390px;
	height: 144px;
	/*float: right;*/
	position: relative;
	/*text-align: center;*/
}
.idInfo .upLoad .left{
	margin-right: 25px;
	/*float: left;*/
	width: 298px;
	height: 197px;
	box-shadow: 2px 3px 7px 4px #dbdbdb;
	overflow: hidden;
	position: relative;
	text-align: center;
}
.idInfo .upLoad .left img{
	max-width: 298px;
	max-height: 197px;
}
.idInfo .upLoad .right{
	width: 275px;
	height: 197px;
	float: right;
	position: relative;
}
.idInfo .upLoad .right .imgTip{
	padding-top: 25px;
}
.upLoad .right .imgTip{
	color: #999;
	line-height: 24px;
}
.upLoad .right .imgTip span{
	color: #FC4514;
}
.upLoad .right .chooseImg{
	position: absolute;
	bottom: 0;
}
.upLoad .right .chooseImg p{
	width: 120px;
	height: 32px;
	line-height: 32px;
	border-radius: 4px;
	background: #EDEDED;
	text-align: center;
}
.upLoad .right .chooseImg input{
	position: absolute;
	right: 0;
	top: 0;
	width: 120%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}
.hidden{
	display: none;
}
.tip{
	line-height: 12px;
	font-size: 12px;
	color: #ba5013;
}
/*预览*/
/*.left span{
		position: absolute;
    display: none;
    width: 100%;
		height: 100%;
		left: 0;
		top: 0;
    text-align: center;
    font-size: 15px;
    color: #fff;
    line-height: 140px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
    cursor: pointer;
}
.idInfo .left span{
	line-height: 200px;
}
.left:hover span{
	display: block;
}*/

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
		text-align: center;
    position: absolute;
    top: 90px;
    bottom: 10px;
    left: 50%;
    margin-left: -500px;
    width: 1000px;
    background: transparent;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
}
.preViewImg img{
		max-width: 970px;
}
.preViewImg .close {
    position: fixed;
		right: 5px;
		top: 85px;
    background: url(../../assets/img/big-close.png) no-repeat center;
    cursor: pointer;
    text-align: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
}

@media only screen and (max-width: 767px){
	.upLoad{
		flex-wrap: wrap;
	}
	.upLoad label{
		top: 0;
	}
	.upLoad .left,.upLoad .right{
		float: none !important;
		height: auto !important;
	}
	.upLoad .right .chooseImg{
		position: inherit;
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

