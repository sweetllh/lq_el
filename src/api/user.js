import request from '@/utils/request'
import requestImg from '@/utils/requestImg'
//登陆
export function login(User, Pwd) {
  return request({
    url: 'api/User/Login',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: { 
		        	User,
		        	Pwd
		        }
	  	}
  })
};

//获取验证码
export function getCaptchaCode(TelePhone) {
  return request({
    url: 'api/SMS/Send',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: { 
		        	TelePhone
		        }
	  	}
  })
};

//修改密码
export function forgetPassword(params) {
  return request({
    url: 'api/User/ForgetPassword',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};


//个人注册regist
export function personalRegist(params) {
  return request({
    url: 'api/User/Create',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};

//获取用户基本信息
export function getAccount() {
  return request({
    url: 'api/User/Account',
    method: 'post',
    data: {
		  		timestamp: "1",
					SecretId: "3",
					Signature: "4",
	  	}
  })
};


//添加联系人
export function createLink(params) {
  return request({
    url: 'api/Contact/Create',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};

//删除联系人
export function deleteLink(params) {
  return request({
    url: 'api/Contact/Delete',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};

//修改联系人
export function updateLink(params) {
  return request({
    url: 'api/Contact/Update',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};

//获取联系人列表
export function getLink() {
  return request({
    url: 'api/Contact/Get',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
  	}
  })
};

//换头象
export function uploadAvata(params) {
  return requestImg({
    url: 'api/User/UploadHeadPortrait',
    method: 'post',
    data: params
  })
};

//修改手机号
export function checkAuth(params) {
  return request({
    url: 'api/User/CheckAuth',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};

//绑定手机号
export function changeTel(params) {
  return request({
    url: 'api/User/ChangeTelephone',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};

//修改密码
export function changePwd(params) {
  return request({
    url: 'api/User/ChangePassword',
    method: 'post',
    data: {
	  	timestamp: "1",
			SecretId: "3",
			Signature: "4",
			Data: params
  	}
  })
};