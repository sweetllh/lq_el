import request from '@/utils/request'
import requestImg from '@/utils/requestImg'

//文件转换成pdf
export function wordToPdf(params) {
  return requestImg({
    url: 'api/Contract/WordToPdf',
    method: 'post',
    data: params
  })
};

//图片转换成pdf
export function imgToPdf(params) {
  return requestImg({
    url: 'api/Contract/ImagesToPdf',
    method: 'post',
    data: params
  })
};

//获取我的合同列表
export function getContract(params) {
  return request({
    url: 'api/Contract/GetContractOverview',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};

//获取合同详情
export function getContractDetail(ContractID) {
  return request({
    url: 'api/Contract/Detail',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					ContractID
				}
	  	}
  })
};

//修改合同详情
export function modifyContract(params) {
  return request({
    url: 'api/Contract/Modify',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};

//创建签署合同
export function createContract(params) {
  return request({
    url: 'api/Contract/CreateContractTask',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};

//存草稿
export function toDraft(params) {
  return request({
    url: 'api/Contract/Draft',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};

//签署合同
export function signContract(params) {
  return request({
    url: 'api/Contract/SignContract',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};


//获取模板列表
export function getContractDomo(params) {
  return request({
    url: 'api/ContractDemo/GetPublicContractDemoOverview',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
	  	}
  })
};

//获取模板详情
export function ContractDemoDetail(id) {
  return request({
    url: 'api/ContractDemo/Detail',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					id
				}
	  	}
  })
};
