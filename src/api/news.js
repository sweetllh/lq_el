import request from '@/utils/request'

//消息列表
export function getNews(params) {
  return request({
    url: 'api/Message/Data',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: params
		  	}
  })
};

//已读消息
export function readedNews(Id) {
  return request({
    url: 'api/Message/Read',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
	  	}
  })
};

//删除消息
export function deleteMessage(Id) {
  return request({
    url: 'api/Message/Delete',
    method: 'post',
    data: {
		  	timestamp: "1",
				SecretId: "3",
				Signature: "4",
				Data: {
					Id
				}
	  	}
  })
};