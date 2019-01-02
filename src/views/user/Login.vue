<template>
  <div class="login_bg">
    <div class="login_wrap">
      <div class="login">
        <h3 class="logo">
        	<img src="../../assets/img/logo.png"/>
        </h3>
        <p class="login-title">登录您的账户</p>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="user-login userForm">
          <el-form-item prop="user">
            <el-input v-model="loginForm.user" maxlength="11"  placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="loginForm.pwd" type="password" maxlength="16" @keyup.enter.native="submitForm()"
            	placeholder="请输入密码，区分大小写"></el-input>
          </el-form-item>
          <el-form-item class="login-btn">
            <el-button type="primary" @click="submitForm()" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
        
        <div class="login_tips">
          <router-link class="regist" to="/regist">注册</router-link>
          <router-link class="forget" to="/forget">忘记密码?</router-link>
        </div>
        <a href="http://www.miitbeian.gov.cn" target="_blank"  style="display:block; font-size: 13px; padding: 20px 0 15px;color: #333; text-align: center;">
        		深圳市科佛科技有限公司&nbsp;&nbsp;粤ICP备18036125号-3</a> 
      </div>
    </div>
		
  </div>

</template>


<script>
import { login } from '@/api/user'
import { setToken, setUserInfo,setAccount,getAccount } from '@/utils/auth'	
import { validateUser,validatePwd  } from '@/utils/validate'	
export default {
  name: 'Login',
  data() {
  	
    return {
    	loading: false,
    	loginForm: {
        user: '',//账号
        pwd: '',//密码
      },
    	rules: {
        user: [
          { validator: validateUser, trigger: 'blur' },
        ],
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
      }
      
      
    };
  },
  watch: {
		
  },
  created: function() {
  	if(getAccount()){
  		this.$set(this.loginForm,'user',getAccount());
  	}
  },
  
  methods: {
	//登陆按钮
    submitForm() {
      	const that = this;
      	this.$refs.loginForm.validate(valid => {
	        if (valid) {
	            this.loading = true;
		        	this.Login(this.loginForm).then(() => {
		        		//that.loading = false
		        		that.$router.push({ path: "/home" });
		        }).catch(() => {
		            this.loading = false
		        })
		        
	        } else {
	          console.log('error submit!!')
	          return false
	        }
	    })
       
    },
    //登陆接口
    Login(userInfo) {
      const that = this;
      const User = userInfo.user.trim();
      return new Promise((resolve, reject) => {
        login(User, userInfo.pwd).then(response => {
          const data = response.Data;
          setAccount(that.loginForm.user);
          setUserInfo(data);
          setToken(data.Token);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },  
    
  },
};
</script>

<style scoped>
.login_bg {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/bg.png') no-repeat center;
  background-size: cover;
  overflow: hidden;
  position: relative;
}
.login_bg:before{
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0,0,0,0.35);
}
h3.logo {
  height: 38px;
  text-align: center;
  padding-top: 40px;
  font-size: 40px;
  line-height: 38px;
  font-weight: 100;
}
.login_wrap {
  width: 380px;
  overflow: hidden;
  /* margin: 8% auto 40px; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 0px 0px 45px -6px rgba(0, 0, 0, 0.2);
  background: #f5f5f5;
}
.login {
  width: 320px;
  margin: 0 auto;
}
.login-title {
  font-size: 20px;
  text-align: center;
  color: #3d3d3d;
  font-weight: bold;
  line-height: 1;
  padding-top: 42px;
}
.user-login {
  margin-top: 27px;
  position: relative;
}
.login-btn{
  margin-top: 5px;
}
.login-btn,.login-btn button{
  width: 100%;
  height: 36px;
  font-size: 14px;
}
.login_tips {
  font-size: 16px;
  line-height: 1;
}
.login_tips a {
  color: #FC4514;
}
.login_tips span {
  margin: 0 5px;
}
.forget {
  float: right;
}

</style>
