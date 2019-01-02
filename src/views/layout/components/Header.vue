<template>
  <div id="header">
    <div class="header-wrap clearfix">
      <div class="logo">
      	<a href="http://www.kefo-tech.com/" target="_blank"><img src="../../../assets/img/logo.png" width="56"/></a>
      </div>
      
      <div class="menuWrap">
      		<ul class="mdShow hidden-md-and-up">
      			<li v-if="addShow">
		          <span class="build-news">
		            <img src="../../../assets/img/icon-add.png" alt="">
		            <p>建立签署</p>
		            <input type="file" multiple="multiple" @change="establishSign" value="" id="isFile">
		          </span>
		        </li><li class="hidden-xs-only">
		          <span class="build-news" @click="toTemeplate()">
		            <img src="../../../assets/img/icon-add.png" alt="">
		            <p>选择模板</p>
		          </span>
		        </li><li @click="toMyNews()" class="unreadNews">
		          <img src="../../../assets/img/icon-news.png" :title="unreadCount?`您有${unreadCount}条未读消息`:`消息中心`" alt="消息" width="20">
		           <!--{{unreadCount}}-->
		          <p v-if="unreadCount > 0" class="unread"></p>
		        </li>
      			
      		</ul>
      		
					<div class="mobileMenuBtn hidden-md-and-up" :class="{active: isShowMemu ? true : false}" @click="isShowMemu = !isShowMemu">
						<span class="span1"></span>
						<span class="span2"></span>
						<span class="span3"></span>
					</div>
					<div class="mobileMenuBtn_shad hidden-md-and-up" @click="isShowMemu = !isShowMemu"
						:class="{active: isShowMemu ? true : false}"></div>
					<div class="headerMenu" :class="{active: isShowMemu ? true : false}">
							<ul class="menu" @click="isShowMemu = !isShowMemu">
				        <li>
				          <router-link to="/home">
				          	 <span class="img">
				          	 		<img src="../../../assets/img/home.png" alt="" width="21"/>
				          	 </span>
				        		 <span class="title">首页</span>
				          </router-link>
				        </li><li>
				          <router-link to="/filesParent">
				          	<span class="img">
				          	 		<img src="../../../assets/img/file.png" alt="" width="21"/>
				          	 </span>
				        		<span class="title">文件</span>
				          </router-link>
				        </li><!--<li>
				          <router-link to="/myTeam">
				          	<span class="img">
				          	 		<img src="../../../assets/img/team.png" alt="" width="21"/>
				          	</span>
				        		<span class="title">团队</span>
				          </router-link>
				        </li>--><li>
				          <router-link to="/accountParent">
				          	<span class="img">
				          	 		<img src="../../../assets/img/account.png" alt="" width="22"/>
				          	 </span>
				        		<span class="title">账号</span>
				          </router-link>
				        </li><li class="nav-last-li">
				        	<router-link to="/filesParent/template/0">
				        		<span class="img" style="padding-bottom: 22px;padding-left: 3px;">
				        			<img src="../../../assets/img/icon-add.png" alt="" width="16">
				        		</span>
				        		<span class="title">选择模板</span>
				        	</router-link>
				        </li><li @click="signOut" class="nav-last-li">
				        	<a href="javascript:void(0)">
				        		<span class="img" style="padding-bottom: 25px;padding-left: 6px;">
				        			<img src="../../../assets/img/icon-out.png" title="退出" alt="退出" width="13" >
				        		</span>
				        		<span class="title">退出</span>
				        	</a>
				        </li>
				      </ul>
					</div>
      </div>
      
      
      <ul class="help hidden-sm-and-down">
        <li v-if="addShow">
          <span class="build-news">
            <img src="../../../assets/img/icon-add.png" alt="">
            <p>建立签署</p>
            <input type="file" multiple="multiple" @change="establishSign" value="" id="isFile">
          </span>
        </li><li>
          <span class="build-news" @click="toTemeplate()">
            <img src="../../../assets/img/icon-add.png" alt="">
            <p>选择模板</p>
          </span>
        </li><li @click="toMyNews()" class="unreadNews" >
          <img src="../../../assets/img/icon-news.png" :title="unreadCount?`您有${unreadCount}条未读消息`:`消息中心`" alt="消息" width="20">
           <!--{{unreadCount}}-->
          <p v-if="unreadCount > 0" class="unread" ></p>
        </li><li @click="signOut">
          <img src="../../../assets/img/icon-out.png" title="退出" alt="退出" width="16" style="position: relative;top: -1px;">
        </li>
      </ul>
      
    </div>
    
  </div>

</template>


<script>
	import { getUserInfo,removeToken,removeUserInfo } from '@/utils/auth'	
	import { wordToPdf,imgToPdf } from '@/api/file'
	import { getNews } from '@/api/news'
export default {
  data() {
    return {
      //fileId: 1,   //文件组件动态路由id
      addShow:true,
      userInfo: '',
      unreadCount: 0,  //未读消息
      isShowCertCont: false,
      isShowMemu: false,
      loading: null,
      
    };
  },
  
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (to.name == "home" || to.name == "addFileOne" || to.name == "addFileTwo" || to.name == "signedFile") {
        //this.fileId = to.params.id;
        this.addShow = false;
      }else{
      	this.addShow = true;
      }
    }
  },
  created() {
  	this.userInfo = getUserInfo() || false;
  	this.getUnreadCount();  //未读信息
  	//console.log(this.$route.name)
  	let name = this.$route.name
    if(name == "home" || name == "addFileOne" || name == "addFileTwo" || name == "signedFile"){
      this.addShow = false;
    }else{
    	this.addShow = true;
    }
  },
  
  methods: {
  	signOut () {
			var _this = this;
			this.$confirm('确认退出吗?', '提示信息', {
				showCancelButton: false,
				type: 'warning'
			}).then(() => {
				removeToken();
				removeUserInfo();
				_this.$router.push('/login');
				
			}).catch(() => {

			});
		},
  	
    toMyNews(){
    	this.$router.push({ path: "/myNews" });
    },
    toTemeplate(){
    	this.$router.push({ path: "/filesParent/template/0" });
    },
    //建立签署
    establishSign(e) {
    	const that = this;
    	if(!this.userInfo.IsAuthentication){
    		 document.getElementById('isFile').value = "";
    		 this.$alert('您尚未进行实名认证,请点击确定前往认证', '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            that.$router.push({ path: "/accountParent/getApp" });
          }
        });
    		return;
    	}else{
    		//console.log(e.target.files[0]); 
	      var fileInfo= e.target.files[0];
	      
		    if(fileInfo.type.indexOf('image') == 0){
		    	//图片转换成pdf
		    	this.ImgToPdf(e.target.files);
		    }else{
		    	//文件转换成pdf
	  			this.WordToPdf(fileInfo);
		    }
    	}
      
	   
    },
    
    //文件转换成pdf
    WordToPdf(fileInfo){
    		var _this = this;
	      var formData = new FormData();
	      formData.append("file", fileInfo);
	      formData.append("Remark", '文件转换成pdf');
	      formData.append("ContractName", fileInfo.name);
	      this.startLoading()
	      wordToPdf(formData).then(res => {
	      	_this.closeLoading()
	      	let contractId = res.Data.ID;
	        _this.$router.push({ name: "addFileOne" ,params:{id:contractId} });
        }).catch(error => {
        	_this.closeLoading()
        })
    },
    
    
    //图片转换成pdf
    ImgToPdf(fileData){
    		var formData = new FormData();
    		//可以多张图
    		let size = 0;
    		for(let i in fileData) {
					if(!isNaN(i)){
						formData.append("file", fileData[i],fileData[i].name);
						size += fileData[i].size;
					}
				}
    		formData.append("ContractName", fileData[0].name);
	      formData.append("Remark", '图片转换成pdf');
	     /* sessionStorage.setItem('fileSize',size); */
    		var _this = this;
    		this.startLoading();
	      imgToPdf(formData).then(res => {
	      	_this.closeLoading()
	      	let contractId = res.Data.ID;
	        _this.$router.push({ name: "addFileOne" ,params:{id:contractId} });
        }).catch(error => {
        	_this.closeLoading()
        })
	      
    },
    
		//获取未读信息条数
		getUnreadCount(){
					var _this = this;
					const params = {
							"PageSize":10,
		           "Page":1
					}
					getNews(params).then(res => {
		      	_this.unreadCount = res.Data.MessageUnreadCount;
	        }).catch(error => {
	        	
	        })
		},
		
		startLoading() {
        this.loading = this.$loading({
			  	lock: true,
	          text: '拼命加载中',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
			})
   },
   
    closeLoading() {
			this.loading.close();
    }
		
    
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/header.css';

</style>