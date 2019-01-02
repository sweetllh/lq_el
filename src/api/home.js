import request from '@/utils/request'

//首页任务列表
export function getHomeInfo() {
  return request({
    url: 'api/HomePage/Data',
    method: 'post',
    
  })
};

