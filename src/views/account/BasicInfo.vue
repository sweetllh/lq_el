<template>
    <!-- 用户信息 -->
    <div id="basicInfo">
      <div class="header">
    	  <div class="head-title">我的账号 </div>
      </div>
      <div class="r_header">
      	<!--<i class="left_icon"></i>-->
        <span class="r_header_title">基本信息</span>
      </div>
      <div class="r_content">
        <ul class="uesr_list">
          <li style="height: 52px;">
            <p class="title">头像</p>
            <div class="item_con face_box">
            	 <!--预览裁剪上传的图片-->
	    		<Avatar :userInfo="userInfo" :avatar="baseInfo.HeadPortrait ? baseInfo.HeadPortrait : avatar" 
	    			@getMessage="getAvatar"></Avatar>
            </div>
          </li>
        
          <li>
            <p class="title">真实姓名</p>
            <div class="item_con">
              <span>{{baseInfo.RealName}}</span>
              <span v-if="!baseInfo.IsAuthentication" class="red">
              	<router-link to="/accountParent/getApp">前往认证</router-link>
              </span>
            </div>
          </li>
          <li>
            <p class="title">账号</p>
            <div class="item_con">
              <span>{{baseInfo.User}}</span>
      		  <img v-if="userInfo.IsAuthentication" class="renzheng" @click="toMyCertificate"
      			src="../../assets/img/renzheng.png" alt="">
              
            </div>
          </li>
          <li>
            <p class="title">密码</p>
            <div class="item_con">
              <span style="width: 100px;">********</span>
              <img class="edit" src="../../assets/img/icon-edit.png" alt="" @click="openDialog('isShowPswDialog')">
            </div>
          </li>
          <li>
            <p class="title">手机号</p>
            <div class="item_con">
              <span style="width: 100px;">{{baseInfo.Telephone}}</span>
              <img class="edit" src="../../assets/img/icon-edit.png" alt="" @click="openDialog('isShowPhoneDialog')">
            </div>
          </li>
          <!--<li>
            <p class="title">邮箱</p>
            <div class="item_con">
              <span>{{baseInfo.Email}}</span>
              <span v-if="!baseInfo.Email" class="red">前往绑定</span>
              <img v-if="baseInfo.Email" class="edit" src="../../assets/img/icon-edit.png" alt="" @click="openDialog('isShowEmailDialog')"> 
            </div>
          </li>-->
          <li>
            <p class="title">身份证号</p>
            <div class="item_con">
              <span>{{baseInfo.IDCardNO}}</span>
              <!--<img class="edit" src="../../assets/img/icon-edit.png" alt="" @click="openDialog('isShowCardDialog')"> -->
            </div>
          </li>
          <li>
            <p class="title">企业名称</p>
            <div class="item_con">
              <span>{{baseInfo.CompanyName}}</span>
              <span class="red" v-if="!baseInfo.IsCompanyAuthentication">
              	<router-link to="/accountParent/certificate">前往认证</router-link>
              </span>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- 修改密码 -->
      <el-dialog title="修改密码" :visible.sync="isShowDialog.isShowPswDialog" width="400px" @close="$refs.changePwd.resetFields()">
          <el-form  :model="formData" :rules="rules"  label-width="0" ref="changePwd" >
            <el-form-item prop="oldPwd">
              <el-input v-model="formData.oldPwd" type="password" placeholder="请输入旧密码" autocomplete="off" maxlength="16" ></el-input>
            </el-form-item>
            <el-form-item prop="newPwd">
              <el-input v-model="formData.newPwd" type="password" placeholder="请输入新密码，8-16位数字、字母组合" maxlength="16" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="mobileCode" >
	            <div class="captcha-wrap el-form-item">
	              <el-input placeholder="请输入验证码" maxlength="6" autocomplete="off" v-model="formData.mobileCode"></el-input>
	              <div class="captcha-num">
	              	<div @click="getCode(0)" class="captcha" v-if="getCodeFlag">获取验证码</div>
	                <span v-if="!getCodeFlag">重新发送（{{time}}s）</span>
	              </div>
	            </div>
	        </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="modifyPsw()" :loading="loading">确 定</el-button>
          </div>
      </el-dialog>
      
       <!--绑定邮箱-->
      <el-dialog title="绑定邮箱" :visible.sync="isShowDialog.isShowEmailDialog" width="400px" @close="$refs.bindEmail.resetFields()">
          <el-form  :model="formData" :rules="rules"  label-width="0" ref="bindEmail" >
            <el-form-item prop="email">
              <el-input v-model="formData.email" type="text" placeholder="请输入邮箱" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="mobileCode" >
	            <div class="captcha-wrap el-form-item">
	              <el-input placeholder="请输入验证码" maxlength="6" autocomplete="off" v-model="formData.mobileCode"></el-input>
	              <div class="captcha-num">
	              	<div @click="getCode(0)" class="captcha" v-if="getCodeFlag">获取验证码</div>
	                <span v-if="!getCodeFlag">重新发送（{{time}}s）</span>
	              </div>
	            </div>
	        </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="small" @click="bindEmail()" :loading="loading">确 定</el-button>
          </div>
      </el-dialog>   
       
      <!--修改手机号码-->
      <el-dialog :title="phoneTitle" :visible.sync="isShowDialog.isShowPhoneDialog" width="400px" @close="$refs.changePhone.resetFields()">
          <el-form  :model="formData" :rules="rules"  label-width="0" ref="changePhone" >
          	<el-form-item>
          		<span v-if="!nextFlag">请输入旧号码{{phoneNumber}}收到的验证码</span>
          	</el-form-item>
            <el-form-item prop="newPhoneNum" v-if="nextFlag">
              <el-input v-model="formData.newPhoneNum" type="text" placeholder="请输入新手机号码" maxlength="11"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="mobileCode" >
	            <div class="captcha-wrap el-form-item">
	              <el-input placeholder="请输入验证码" maxlength="6" v-model="formData.mobileCode" autocomplete="off"></el-input>
	              <div class="captcha-num">
	              	<div @click="getCode(0)" class="captcha" v-if="getCodeFlag && !nextFlag">获取验证码</div>
	              	<div @click="getCode(1)" class="captcha" v-if="getCodeFlag && nextFlag">获取验证码</div>
	                <span v-if="!getCodeFlag">重新发送（{{time}}s）</span>
	              </div>
	            </div>
	        </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
          	<el-button type="primary" v-if="!nextFlag" size="small"  @click="modifyPhoneNum()" :loading="loading">下一步</el-button>
            <el-button type="primary" v-if="nextFlag" size="small" @click="bindPhoneNum()" :loading="loading">确 定</el-button>
          </div>
      </el-dialog> 
    </div>
        
</template>


<script>
import Avatar from "@/components/Avatar.vue"
import { getUserInfo } from '@/utils/auth'
import { getAccount ,uploadAvata,getCaptchaCode,checkAuth,changeTel,changePwd} from '@/api/user'
import { validatePwd,validateCode,validateEmail,validatePhone2  } from '@/utils/validate'	
export default {
  components: {
  	Avatar
  },
  data() {
    return {
      userInfo: getUserInfo(), //登录信息
      baseInfo: "", //用户基本信息
      user: "",
      loading: false,
      formData: {
      	oldPwd: "",
      	newPwd: "",
      	mobileCode: "",
      	newPhoneNum: "",
      	email: "",
      },
      rules: {
      	oldPwd: [
          { validator: validatePwd, trigger: 'blur' },
        ],
        newPwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        mobileCode: [
          { validator: validateCode, trigger: 'blur' }
        ],
        newPhoneNum: [
           { validator: validatePhone2, trigger: 'blur' }
        ],
        email: [
        	{ validator: validateEmail, trigger: 'blur' }
        ]
      },
      
      isShowDialog: {
      	isShowPswDialog: false,
      	isShowPhoneDialog: false,
      	isShowEmailDialog: false,
      	isShowCardDialog: false,
      	isShowPreImgDialog: false,
      },
      
      phoneNumber: "",  //号码中间的数字用**表示
      phoneTitle: "修改手机号",
      time: 60,
      getCodeFlag: true,
      nextFlag: false,    //下一步
      //图片裁剪
      avatar: require("../../assets/img/touxiang.png"),
    };
  },
  computed: {
  	
  },
  watch: {
 	 userInfo:{
 	 	handler(val,oldval){
 	 		if(this.userInfo){
	 	 		if(this.userInfo.Type == "0"){
	 	 			this.user = this.userInfo.TelePhone;
	 	 		}else if(this.userInfo.Type == "1"){
	 	 			this.user = this.userInfo.Email;
	 	 		}
	 	 		
	 	 		if(!this.userInfo.TelePhone){
	 	 			this.phoneTitle = "绑定手机号";
	 	 			this.nextFlag = true;
	 	 		}
	 	 	}
 	 	},
 	 	deep:true
 	 },
 	 
  },
  created() {
    //获取用户基本信息
    this.getBaseInfo();
  },
  methods: {
  	toMyCertificate(){
  		this.$router.push({path: "/accountParent/myCertificate"})
  	},
  	getAvatar(msg){
  		this.baseInfo.HeadPortrait = msg
  	},
  	
  	//获取用户基本信息
  	getBaseInfo(){
  		var _this = this;
  		getAccount().then(res => {
  			_this.baseInfo = res.Data;
  		}).catch(error => {
  			
  		})
  		
  	},
  	// 打开图片上传
    uploadHeadImg () {
      this.$el.querySelector('.hiddenInput').click();
    },
    
    // 获取上传信息，将头像显示
    handleFile (e) {
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      //上传到后台
      this.imageSubmit(file);
    },
  	
  	//头像上传
  	imageSubmit(file){
       let formData = new FormData() ; //创建一个form对象
       formData.append('file',file);  //append 向form表单添加数据
       //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data
       formData.append("name", '');
	   formData.append("filename", file.name);
       var _this = this;
       uploadAvata(formData).then(res => {
       		_this.$set(_this.baseInfo,'HeadPortrait',res.Data.Image);
       		_this.$message({
			    	showClose: true,
			        message: "修改头像成功",
			        type: 'success',
			        duration: 3 * 1000
			    })
       }).catch(error => {
       	
       })
       
    },
 
  	//打开弹窗
    openDialog(attr) {
    	if(attr=='isShowPhoneDialog'){
    		//如果手机号未绑定，显示绑定手机号，如果已经绑定，先验证绑定的手机号
    		if(this.userInfo.TelePhone){
		    	this.phoneNumber = this.baseInfo.Telephone.substring(0,3) + "****" + this.baseInfo.Telephone.substring(7);
		    	this.nextFlag = false;
		    	this.formData.newPhoneNum = "";
		    	this.phoneTitle = "修改手机号";
		    }else{
		    	this.nextFlag = true;
		    	this.formData.newPhoneNum = "";
		    	this.phoneTitle = "绑定手机号";
		    }
	    	
    	}
    	this.time = 60;
      	this.getCodeFlag = true;
    	this.$set(this.isShowDialog,attr,true)
    },
  	
  	//获取验证码
  	getCode(e) {
  		var _this = this;
  		var TelePhoneNumber = "";
		if(e == 0) {
			TelePhoneNumber = _this.userInfo.TelePhone;
			_this.queryCode(TelePhoneNumber);
		}else if(e == 1){
			TelePhoneNumber = _this.formData.newPhoneNum;
			_this.$refs.changePhone.validateField('newPhoneNum',err => {
				if(err){
      				return ;
				}else{
					_this.queryCode(TelePhoneNumber)
				}
			})
		}
	
	},
	
	queryCode(TelePhoneNumber){
		const _this = this;
		getCaptchaCode(TelePhoneNumber).then(res => {
				_this.getCodeFlag = false;
				_this.timeOut(60);
				_this.time = 60;
				_this.$message({
			          showClose: true,
			          message: '验证码已发送到'+_this.userInfo.TelePhone,
			          type: 'success',
			          duration: 5*1000
			    });
		}).catch(error => {
			
		})
	},
	
	//验证码倒计时
	timeOut(time) {
      var _this = this;
      setInterval(function() {
        _this.time = time--;
        if (_this.time <= 0) {
          _this.getCodeFlag = true;
        }
      }, 1000);
    },
    
	//修改手机号
	modifyPhoneNum(){
		this.$refs.changePhone.validateField('mobileCode',err => {
			if(err){
  				return ;
			}else{
				const _this = this;
				const params = {
			    	TelePhone: _this.baseInfo.Telephone,
					TelePhoneAuthCode: _this.formData.mobileCode,
			    }
				_this.loading = true;
			    checkAuth(params).then(res => {
			    	_this.loading = false;
			    	_this.nextFlag = true;
			    	_this.getCodeFlag = true;
					_this.$refs.changePhone.resetFields();
					_this.phoneTitle = "绑定手机号";
			    }).catch(error => {
			    	_this.loading = false;
			    })
			}
		})
		
	},
	
	//绑定手机号码
	bindPhoneNum(){
		const _this = this;
		this.$refs.changePhone.validate(valid => {
			if (valid){
				const params = {
			    	TelePhone: _this.formData.newPhoneNum,
					TelePhoneAuthCode: _this.formData.mobileCode
			    };
			    _this.loading = true;
			    changeTel(params).then(res => {
			    	_this.loading = false;
			    	_this.$set(_this.isShowDialog,'isShowPhoneDialog',false);
					_this.$set(_this.baseInfo,'Telephone',_this.formData.newPhoneNum);
					_this.$set(_this.baseInfo,'User',_this.formData.newPhoneNum);
					 _this.$message({
				        showClose: true,
				        message: '修改手机号码成功',
				        type: 'success',
				        duration: 3*1000
			        });
			    }).catch(error => {
			    	_this.loading = false;
			    })
			}else{
				console.log('error submit!!')
	          	return false
			}
		})
	},
	
	//修改密码 
	modifyPsw() {
		const _this = this;
		this.$refs.changePwd.validate(valid => {
			if (valid) {
				_this.loading = true;
				const params = {
		   			OldPwd: _this.formData.oldPwd,
					NewPwd: _this.formData.newPwd,
					TelePhoneAuthCode: _this.formData.mobileCode,
				};
				changePwd(params).then(res => {
					_this.loading = false;
				    _this.$set(_this.isShowDialog,'isShowPswDialog',false);
				    _this.$message({
				        showClose: true,
				        message: '修改密码成功',
				        type: 'success',
				        duration: 3*1000
			        });
				    
				}).catch(error => {
					_this.loading = false;
				})
			}else{
				console.log('error submit!!')
	          	return false
			}
		})
		
	},
	
	//绑定邮箱
	bindEmail(){
		
	},
  	
  	
  }
  
};
</script>

<style scoped>
	@import '../../assets/css/accountCommon.css';
	.r_header{
		padding-left: 35px;
	}
	.hiddenInpu{
		display: none;
	}
	
	.uesr_list li {
	  height: 46px;
	  line-height: 46px;
	  position: relative;
	}
	.uesr_list .title {
	  padding-left: 38px;
	  color: #606060;
	  font-size: 14px;
	  width: 108px;
	  float: left;
	}
	.uesr_list .item_con {
	  float: left;
	  height: 46px;
	  color: #3b4356;
	  font-size: 14px;
	  display: flex;
	  justify-content: flex-start;
	  align-items: center;
	}
	.uesr_list .face_box {
	  width: 50px;
	  height: 50px;
	  border-radius: 50%;
	  /*overflow: hidden;*/
	  /*border: 1px solid #ccc;*/
	  position: relative;
	  cursor: pointer;
	}
	.uesr_list .face_box span {
	  position: absolute;
	  display: none;
	  width: 100%;
	  text-align: center;
	  height: 100%;
	  color: #fff;
	  background: rgba(0, 0, 0, 0.5);
	  z-index: 3;
	}
	.uesr_list .face_box:hover span {
	  display: block;
	}
	.uesr_list .face {
	  height: 100%;
	  display: block;
	  position: relative;
	}
	.renzheng {
	  height: 15px;
	  margin-left: 38px;
	  cursor: pointer;
	}
	.photo{
		width: 18px;
		height: 18px;
		position: absolute;
		top: 27px;
		left: 170px;
		/*z-index: 1;*/
	}
	.edit {
	  height: 16px;
	  padding: 5px;
	  margin-left: 20px;
	  cursor: pointer;
	}
	.dialogCont li{
		position: relative;
		margin-bottom: 20px;
	}
	
	.dialogCont li img{
		position: absolute;
	    top: 0;
	    bottom: 0;
	    margin: auto;
	    right: 18px;
	    cursor: pointer;
	}
	
	.dialogCont li .phoneCode {
	    width: 160px;
	    float: left;
	}
	
	.getCode-wrap {
	    width: 117px;
	    float: right;
	    height: 34px;
	    text-align: center;
	    font-size: 14px;
	    position: relative;
	}
	
	.getCode{
		width: 100%;
	    height: 34px;
	    background: #3b4356;
	    border-radius: 4px;
	    outline: 0;
	    line-height: 34px;
	    color: #fff;
	    cursor: pointer;
	}
	
	.getCode-wrap span{
	    position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height: 100%;
	    background: #efefef;
	    border-radius: 4px;
	    color: #ccc;
	    line-height: 36px;
	    font-size: 12px;
	}
	
	.tip{
		font-size: 12px;
		color: #FC4514;
		position: absolute;
		left: 0;
		bottom: -19px;
	}
	.red a,.red{
		color: #FC4514;
		cursor: pointer;
	}
	.r_content{
		padding-top: 20px;
	}
	/*预览图片*/
	.selectedBtn{
		position: relative;
	}
	.selectedBtn span{
		display: inline-block;
		width: 100px;
		text-align: center;
		height: 32px;
		line-height: 32px;
		font-size: 14px;
		border: 1px solid #FC4514;
		border-radius: 4px;
	}
	.selectedBtn .hiddenInput{
		opacity: 0;
		position: absolute;
		left: -100px;
		top: 0;
		width: 200px;
		height: 32px;
		cursor: pointer;
	}
	.preImgWrap{
		width: 380px;
		height: 260px;
		margin: 15px auto 0;
		border: 1px solid #ccc;
		/*display: flex;
		justify-content: center;
		align-items: center;*/
		overflow: hidden;
	}
	.preImgWrap .picture {
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    background-position: center center;
	    background-repeat: no-repeat;
	    background-size: cover;
	}
	@media only screen and (max-width: 560px){
		.uesr_list .title{
			width: 60px;
		}
	}
	
</style>

