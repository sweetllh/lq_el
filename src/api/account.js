import request from '@/utils/request'
import requestImg from '@/utils/requestImg'
//企业认证
export function companyAuth(params) {
  return requestImg({
    url: 'api/CompanyAuth/Send',
    method: 'post',
    data: {
	  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};

/*我的套餐*/
//获取我的套餐列表
export function myPackage(params) {
  return request({
    url: 'api/Package/My',
    method: 'post',
    data: {
	  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};

//获取可购买的套餐信息
export function getPackage() {
  return request({
    url: 'api/Package/Get',
    method: 'post',
    data: {
	  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
	  	}
  })
};

/*签章*/
//签章列表
export function getSignature() {
  return request({
    url: 'api/Signature/Data',
    method: 'post',
  })
};

//设置默认签章
export function defaultSignature(ID) {
  return request({
    url: 'api/Signature/Default',
    method: 'post',
    data: {
	  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					ID
				}
	  	}
  })
};

//删除签章
export function deleteSignature(ID) {
  return request({
    url: 'api/Signature/Delete',
    method: 'post',
    data: {
	  		timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					ID
				}
	  	}
  })
};

/*添加签章*/
export function addSignature(params) {
  return requestImg({
    url: 'api/Signature/Upload',
    method: 'post',
    data: params
  })
};