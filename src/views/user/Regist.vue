<template>
  <div class="regist-bg">

    <div class="regist-wrap">
      <div class="header-wrap">
        <div class="header clearfix">
          <h3><img src="../../assets/img/logo.png" width="56"/></h3>
          <p>
            <a href="http://www.kefo-tech.com/" target="_blank">返回官网</a>
            <span>|</span>已有账号？
            <router-link to="/login">登录</router-link>
          </p>
        </div>
      </div>
      <div class="regist-box">
        <div class="regist">
          <p class="r-title">免费试用30天</p>
          <div class="regist-class" style="width: auto;">
            <span v-if="!nextFlag" @click="changeClass(0)" :class="registClass?'':'active'">个人注册</span>
            <!--<span v-if="!nextFlag" @click="changeClass(1)" :class="registClass?'active':''">企业注册</span>-->
            <span v-if="nextFlag" class="active w-100">企业联系人</span>
          </div>
          
          <el-form :model="registForm" :rules="rules" ref="registForm" label-width="0px" class="user-regist userForm">
	          <el-form-item prop="user" v-if="!registClass">
	            <el-input id="user"  v-model="registForm.user" maxlength="11" placeholder="请输入手机号码"></el-input>
	          </el-form-item>
	          <el-form-item prop="phone" v-if="nextFlag">
	            <el-input  v-model="registForm.phone" maxlength="11" placeholder="请输入企业联系人手机号"></el-input>
	          </el-form-item>
	          <el-form-item prop="company" v-if="registClass && !nextFlag">
	            <el-input v-model="registForm.company" maxlength="11" placeholder="请输入企业名称"></el-input>
	          </el-form-item>
	          <el-form-item prop="pwd" v-if="!nextFlag">
	            <el-input v-model="registForm.pwd" type="password" maxlength="16" placeholder="请输入密码，8-16位数字、字母组合"></el-input>
	          </el-form-item>
	          <el-form-item prop="email" v-if="registClass && !nextFlag">
	            <el-input id="user"  v-model="registForm.email" maxlength="11" placeholder="请输入企业邮箱"></el-input>
	          </el-form-item>
	          <el-form-item prop="phoneCode" v-if="(registClass && nextFlag) || !registClass">
	            <div class="captcha-wrap el-form-item">
	              <el-input placeholder="请输入验证码" maxlength="6" v-model="registForm.phoneCode"></el-input>
	              <div class="captcha-num">
	              	<div @click="getCode()" class="captcha" v-if="getCodeFlag">获取验证码</div>
	                <span v-if="!getCodeFlag">重新发送（{{time}}s）</span>
	              </div>
	            </div>
	          </el-form-item>
	        </el-form>
          
          <p class="regist-tips">注册即表示您已阅读并同意
          	<router-link to="/privacy">《链签用户隐私权政策》</router-link>
          </p>
          <div class="btn-box">
            <div v-if="nextFlag" @click="prev()" class="prev-btn">上一步</div>
            <div class="regist-btn-wrap">
            	<el-button type="primary" :loading="loading" v-if="!registClass || nextFlag" 
            	 @click="regist()" class="regist-btn">确定</el-button>
              <el-button type="primary" v-if="!nextFlag" @click="next()" class="regist-btn" >下一步</el-button>
            </div>
          </div>
          
        </div>

      </div>

    </div>
    
    
  </div>

</template>


<script>
import { setAccount } from '@/utils/auth'
import { validateUser,validatePwd,validateCode,validateEmail,validatePhone  } from '@/utils/validate'
import { getCaptchaCode , personalRegist } from '@/api/user'	
export default {
  data() {
    return {
    	registForm: {
    		company: "",
	      user: "",
	      email: "",
	      pwd: "",
	      phoneCode: "",
	      phone: "",
    	},
    	rules: {
        user: [
          { validator: validateUser, trigger: 'blur' },
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        phoneCode : [
          { validator: validateCode, trigger: 'blur'}
        ],
        
        company: [
         { required: true, message: '请输入企业名称!', trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone : [
          { validator: validatePhone, trigger: 'blur'}
        ]
      },
    	loading: false,
      registClass: 0,  //0：个人注册，1：企业注册
      time: 60,
      getCodeFlag: true,  //获取验证码，true需要获取，false已经获取
      nextFlag: false,    //企业注册下一步
    };
  },
  watch:{
  	
  },
  mounted() {

  },
  methods: {
  	
    //切换注册类型，input重置 
    changeClass(e) {
      this.registClass = e;
      this.nextFlag = false;   
      this.registForm = {
    		company: "",
	      user: "",
	      email: "",
	      pwd: "",
	      phoneCode: "",
	      phone: "",
    	}
    },
    
    // 获取验证码
    getCode() {
      var _this = this;
      this.$refs.registForm.validateField('user',err => {
      	console.log(err)
      	if(err){
      		return
      	} else{
      		getCaptchaCode(this.registForm.user).then(response => {
				      _this.getCodeFlag = false;
							_this.timeOut(60);
							_this.time = 60;
							_this.$message({
			          showClose: true,
			          message: '验证码已发送到手机',
			          type: 'success'
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
    //个人注册
    regist() {
    	if (this.registClass) return; //非个人注册
      var _this = this;
      var oType = phoneReg.test(this.user) ? "0" : "1";
			this.$refs.registForm.validate(valid => {
	        if (valid) {
	            this.loading = true;
	            const params = {
									User: _this.registForm.user,
				          Pwd: _this.registForm.pwd,
				          TelePhoneAuthCode: _this.registForm.mobileCode,
				          EmailAuthCode: _this.registForm.mobileCode,
				          Type: oType
							}
							personalRegist(params).then(response => {
					      _this.loading = false;
					      setAccount(_this.registForm.user);
								_this.$alert('注册成功，点击确定，跳转到登录页面', '提示信息', {
				          confirmButtonText: '确定',
				          callback: action => {
				            _this.$router.push({ path: "/login" });
				          }
				        });
				        
					    }).catch(error => {
					    	_this.loading = false
					    })
		        
	        } else {
	          console.log('error submit!!')
	          return false
	        }
	    })
			
    },
    
    //企业注册下一步
    next() {
      this.nextFlag = true;
    },
    prev() {
    	this.nextFlag = false;
    }
  }
};
</script>

<style scoped>
.regist-bg {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg.png") no-repeat center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.regist-bg:before{
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0,0,0,0.35);
}

.header-wrap {
	position: absolute;
	left: 0;
	top: 0;
  height: 80px;
  line-height: 80px;
  width: 100%;
}
.header {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
}
.header h3 {
  float: left;
}
.header h3 img{
	width: 66px;
	margin-top: 20px;
}
.header p {
  color: #FC4514;
  float: right;
  padding-right: 20px;
  font-size: 16px;
}
.header p span {
  color: #fff;
  margin: 0 3px;
}
.header a {
  color: #fff;
}
.regist-box {
  width: 400px;
  overflow: hidden;
  /* margin: 8% auto 36px; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 0px 45px -6px rgba(0, 0, 0, 0.2);
  line-height: 1;
  background: #f5f5f5;
}
.regist {
  width: 340px;
  margin: 0 auto;
}
.r-title {
  padding-top: 45px;
  text-align: center;
  color: #FC4514;
  font-size: 22px;
}
.regist-class {
  font-size: 18px;
  width: 200px;
  margin: 30px auto 0;
  color: #3b4356;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}
.regist-class .active {
  color: #FC4514;
}
.regist-class .w-100 {
  display: block;
  width: 100%;
  text-align: center;
}
.user-regist {
  margin-top: 25px;
}

.regist-tips {
  text-align: center;
  font-size: 14px;
  color: #c7c7c7;
  padding-bottom: 32px;
}
.regist-tips a {
  color: #FC4514;
  cursor: pointer;
}
.btn-box {
  display: flex;
  justify-content: space-between;
}
.prev-btn {
  line-height: 36px;
  border-radius: 4px;
  height: 36px;
  background: #FC4514;
  text-align: center;
  margin-right: 10px;
  width: 100px;
  color: #fff;
  cursor: pointer;
}
.regist-btn-wrap {
	flex: 1;
  border-radius: 4px;
  height: 36px;
  background: #FC4514;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
}
.regist-btn {
	width: 100%;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

</style>

