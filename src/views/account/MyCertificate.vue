<template>
	<div class="getApp">
		<p class="title" @click="backOne"><img src="../../assets/img/icon-left.png"/>我的证书</p>
		<div class="head-bg"></div>
		<div class="content">
			<div class="name">{{userInfo.UserName}}</div>
			<ul>
				<li>
					<span>颁发者：</span>ShenZhen Certificate Authority
				</li>	
				<li><span>证件号：</span>{{userInfo.UserIDCardNumber}}</li>
				<li><span>序列号：</span>{{userInfo.UserAuthNumber}}</li>
				<li><span>有效期：</span>{{userInfo.UserAuthValidDate}}</li>
				<li><span>付费方：</span>深圳市科佛科技有限公司</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'	
export default{
	components: {
		
	  },
	data(){
		return{
			userInfo: getUserInfo(),
			isShowIOS: false,
			isShowAndroid: false,
			result: ""
		}
	},
	methods:{
		backOne(){
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped>
.getApp{
	max-width: 970px;
	margin: 0 auto;
	padding: 85px 40px 0;
}
.title{
	line-height: 24px;
	color: #303030;
	font-size: 18px;
	cursor: pointer;
	margin-bottom: 17px;
}
.title img{
	margin-right: 10px;
}
.head-bg{
	width: 100%;
	height: 40px;
	background: #F3F3F3;
	margin-bottom: 25px;
}
.content{
	width: 348px;
	height: 505px;
	margin: 0 auto ;
	overflow: hidden;
	background: url(../../assets/img/real-name.png) no-repeat center center;
}
.content .name{
	width: 145px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: 20px;
	color: #882827;
	margin: 142px auto 40px;
	background: url(../../assets/img/name-border.png) no-repeat center;
}
.content ul{
	padding-left: 50px;
	font-size: 12px;
}
.content ul li{
	height: 40px;
	color: #626262;
	white-space: nowrap;
}
.content ul li span{
	color: #aaa;
}
</style>