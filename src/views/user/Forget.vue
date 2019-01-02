<template>
  <div class="bg">
    <div class="regist-wrap">
      <div class="header-wrap">
        <div class="header clearfix">
          <h3><img src="../../assets/img/logo.png" width="56"/></h3>
          <p>
            <a href="http://www.kefo-tech.com/">返回官网</a>
            <span>|</span>已有账号？
            <router-link to="/login">登录</router-link>
          </p>
        </div>
      </div>
      <div class="regist-box">
        <div class="regist">
          <p class="r-title">密码找回</p>
          
          <el-form v-if="!nextFlag" :model="forgetForm1" :rules="rules" ref="forgetForm1" label-width="0px" class="user-regist userForm">
	          <el-form-item prop="user">
	            <el-input id="user"  v-model="forgetForm1.user" maxlength="11" placeholder="请输入手机号码"></el-input>
	          </el-form-item>
	          <el-form-item prop="mobileCode" >
	            <div class="captcha-wrap el-form-item">
	              <el-input placeholder="请输入验证码" maxlength="6" v-model="forgetForm1.mobileCode"></el-input>
	              <div class="captcha-num">
	              	<div @click="getCode()" class="captcha" v-if="getCodeFlag">获取验证码</div>
	                <span v-if="!getCodeFlag">重新发送（{{time}}s）</span>
	              </div>
	            </div>
	          </el-form-item>
	        </el-form>
	        
	        <el-form v-if="nextFlag" :model="forgetForm2" :rules="rules" ref="forgetForm2" label-width="0px" class="user-regist userForm">
	          <el-form-item prop="pwd" >
	            <el-input v-model="forgetForm2.pwd" type="password" maxlength="16" placeholder="请输入密码，区分大小写"></el-input>
	          </el-form-item>
	          <el-form-item prop="pwd2">
	            <el-input v-model="forgetForm2.pwd2" type="password" maxlength="16" placeholder="请再次输入密码"></el-input>
	          </el-form-item>
	          
	        </el-form>
	        
          
          <div class="btn-box">
            <div v-if="nextFlag" @click="prev()" class="prev-btn">上一步</div>
            <div class="regist-btn-wrap">
            	<el-button type="primary" v-if="nextFlag" @click="setPwd()" 
            		class="regist-btn" :loading="loading">确定</el-button>
              <el-button type="primary" v-if="!nextFlag" @click.native="next()" class="regist-btn" >下一步</el-button>
            </div>
          </div>

        </div>

      </div>

    </div>
    
  </div>
</template>


<script>
import { getCaptchaCode , forgetPassword } from '@/api/user'	
import { validateUser,validatePwd,validateCode  } from '@/utils/validate'	
export default {
	name: 'Forget',
  data() {
    
    var validatePwd2 = (rule, value, callback) => {
        if (value === '') {
           callback(new Error('请再次输入密码'));
        } else if(value != this.forgetForm.pwd){
            callback(new Error('两次输入密码不一致!'));
        }else{
	        callback();
        }
        
    };
  	
    return {
    	forgetForm1: {
    		user: "",
      	mobileCode: "",
    	},
    	forgetForm2: {
    		pwd: "",
      	pwd2: "",
    	},
    	rules: {
        user: [
          { validator: validateUser, trigger: 'blur' },
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        pwd2: [
          { validator: validatePwd2, trigger: 'blur' }
        ],
        mobileCode : [
          { validator: validateCode, trigger: 'blur'}
        ]
     },
      loading: false,
	    getCodeFlag: true,
    	time: 60,
    	nextFlag: false,
    	
    };
  },
  watch:{
  	
  },
  methods: {
  	//密码找回下一步
    next() {
    	this.$refs.forgetForm1.validate(valid => {
    		if(valid){
    			this.nextFlag = true;
    		}else{
    				console.log('error submit!!')
	          return false
    		}
    	})
      
    },
    
    prev() {
      this.nextFlag = false;
      this.$refs.forgetForm2.resetFields();
    },
    
    getCode() {
      var _this = this;
      this.$refs.forgetForm1.validateField('user',err => {
      	if(err){
      		return
      	}else{
      		 getCaptchaCode(this.forgetForm.user).then(response => {
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
    
    //设置新密码
    setPwd() {
      var _this = this;
			this.$refs.forgetForm2.validate(valid => {
	        if (valid) {
	            _this.loading = true;
	            const params = {
									User: _this.forgetForm.user,
				          Pwd: _this.forgetForm.pwd,
				          TelePhoneAuthCode: _this.forgetForm.mobileCode,
				          Type: "0"
							}
							forgetPassword(params).then(response => {
					      _this.loading = false
								_this.$alert('修改密码成功，点击确定，跳转到登录页面', '提示信息', {
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
    
    
  }
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg.png") no-repeat center;
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.bg:before{
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0,0,0,0.35);
}
.header-wrap {
  height: 80px;
  width: 100%;
  position: absolute;
	left: 0;
	top: 0;
	line-height: 80px;
}
.header {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
}
.header h3 {
  float: left;
}
.header p{
  color: #FC4514;
  float: right;
  padding-right: 20px;
  font-size: 16px;

}
.header h3 img{
	width: 66px;
	margin-top: 20px;
}
.header p span{
  color: #fff;
  margin: 0 3px;
}
.header a {
  color: #fff;
}
.regist-box {
  width: 380px;
  overflow: hidden;
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
  width: 320px;
  margin: 0 auto;
}
.r-title {
  padding-top: 45px;
  text-align: left;
  color: #FC4514;
  font-size: 20px;
}
.regist-class {
  font-size: 18px;
  width: 200px;
  margin: 45px auto 0;
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
  margin-top: 30px;
}

.regist-tips {
  text-align: center;
  font-size: 14px;
  color: #c7c7c7;
  padding-bottom: 32px;
}
.regist-tips a {
  color: #FC4514;
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
 /* background: #FC4514;*/
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

