<template>
        <!-- 升级套餐 -->
        <div id="upGradePackage">
          <div class="header">
	    	  <div class="head-title">我的钱包 </div>
	      </div>
          <div class="r_header" @click="myPackage">
            <!--<i class="left_icon"></i>-->
	        <span class="r_header_title">账户余额</span>
          </div>
          <div class="r_content">
          	<div class="balance">余额：<span>200</span>金钻</div>
            <el-row tag="ul" class="diamond clearfix">
            	<el-col tag="li" :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
            		<div>
            			<p class="red_bg"></p>
	            		<p class="type">6金钻</p>
	            		<p class="price"><sup>￥</sup>6</p>
	            		<p class="hr"></p>
	            		<p class="toBuy">立即购买</p>
            		</div>
            	</el-col>
            	<el-col tag="li" :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
            		<div>
            			<p class="red_bg"></p>
	            		<p class="type">60金钻</p>
	            		<p class="price"><sup>￥</sup>6</p>
	            		<p class="hr"></p>
	            		<p class="toBuy">立即购买</p>
            		</div>
            	</el-col>
            	<el-col tag="li" :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
            		<div>
            			<p class="red_bg"></p>
	            		<p class="type">169金钻</p>
	            		<p class="price"><sup>￥</sup>6</p>
	            		<p class="hr"></p>
	            		<p class="toBuy">立即购买</p>
            		</div>
            	</el-col>
            	
            </el-row>
          </div>
          
          
        </div>
        

</template>


<script>
import { getPackage } from '@/api/account'
export default {
  components: {
  	
  },
  data() {
    return {
      allPackage:  [], //套餐列表
    };
  },
  watch: {
    
  },
  created() {
    //获取所有可购买套餐
    this.getPackageList();
  },
  methods: {
  	//获取可购买的套餐信息
  	getPackageList(){
  		var _this = this;
  		
  		getPackage().then(res => {
  			_this.allPackage = res.Data;
  		}).catch(error => {
  			
  		})
  		
        
  	},
  	//购买套餐
  	buyPackage(packageId){
       	this.$router.push({ name:"shoppingList",params:{id: packageId} });
  	},
  	//返回我的套餐
    myPackage(){
    	this.$router.push({ path:"/accountParent/account/package/packageList" });
    },
 
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.header{
	width: 100%;
	margin-bottom: 27px;
}
.header .head-title{
	font-size: 18px;
	color: #303030;
}
.header .head-number{
	font-size: 16px;
}
.r_header {
  width: 100%;
  line-height: 40px;
  background: #f3f3f3;
  color: #3f3f3f;
  font-size: 14px;
  padding-left: 38px;
  box-sizing: border-box;
  font-family: MicrosoftYaHei;
  cursor: pointer;
}
.r_header .r_header_title{
	color: #FC4514;
	cursor: pointer;
}

.r_content{
	width: 100%;
	border: 1px solid #E2E2E2;
	border-top: none;
	box-sizing: border-box;
}

.r_content .balance{
	margin: 0 15px;
	height: 65px;
	border-bottom: 1px solid #FC4514;
	padding-top: 27px;
	box-sizing: border-box;
	color: #FC4514;
	font-size: 14px;
	display: flex;
	justify-content: flex-end;
	align-items: baseline;
}
.r_content .balance span{
	font-size: 24px;
	padding-left: 40px;
}
.diamond li {
	/*width: 120px;*/
	/*height: 150px;*/
	padding: 20px 15px;
	box-sizing: border-box;
	text-align: center;
}
.diamond li div{
	min-width: 90px;
	border: 1px solid #E2E2E2;
	padding-bottom: 10px;
}
.diamond li div:hover{
	border:1px solid #E2E2E2;
	box-shadow:1px 0px 18px rgba(0,0,0,0.16);
}
.diamond li div:hover .red_bg{
	background: #FC4514;
}
.diamond li div:hover .toBuy{
	background: #FC4514;
	color: #fff;
}
.diamond .red_bg{
	width: 100%;
	height: 4px;
}
.diamond li .type{
	color: #242C40;
	font-size: 14px;
	line-height: 35px;
}
.diamond li .price{
	font-size: 24px;
	color: #FC4514;
}
.diamond li .price sup{
	font-size: 14px;
	line-height: 35px;
}
.diamond li .hr{
	height: 1px;
	margin: 10px 5px 25px;
	background: #E2E2E2;
}
.diamond li .toBuy{
	width: 88px;
	height: 24px;
	line-height: 24px;
	margin: 0 auto;
	border: 1px solid #FC4514;
	color: #FC4514;
	font-size: 12px;
	cursor: pointer;
}


@media only screen and (max-width: 991px){
	.diamond li{
		padding: 20px 80px;
	}
}

@media only screen and (max-width: 767px) and (min-width: 474px){
	.diamond li{
		padding: 20px 100px;
	}
}
@media only screen and (max-width: 474px) {
	.diamond li{
		padding: 20px 50px;
	}
}
</style>

