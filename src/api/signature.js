import request from '@/utils/request'

//我的签章列表
export function getSignature() {
  return request({
    url: 'api/Signature/Data',
    method: 'post',
  })
};