import axios from 'axios';//引入axios
import { Message,MessageBox } from 'element-ui'
import { getToken,removeToken,removeUserInfo} from '@/utils/auth'
import router from '../router'

// 创建axios实例
const service = axios.create({
  baseURL:  "https://www.linkedsign.cn/server/", //process.env.BASE_API, // api 的 base_url
  timeout: 35000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    /*if (getToken()) {*/
      config.headers['access-token'] = getToken(),  // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Content-Type'] = 'application/json'
    /*}*/
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.Code == "400") {
    	 /*MessageBox.confirm(res.Message,'提示信息',{
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          removeToken();
          removeUserInfo();
          router.push('/login');
        })*/
       		removeToken();
          removeUserInfo();
          router.push('/login');
      
      return Promise.reject('error')
    }else if(res.Code != "0"){
	    	Message({
		    	  showClose: true,
		        message: res.Message,
		        type: 'error',
		        duration: 3*1000
		     })
    		return Promise.reject('error')
    } else {
      	return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      showClose: true,
      message: error.message,
      type: 'error',
      duration: 3*1000
    })
    return Promise.reject(error)
  }
)

export default service





