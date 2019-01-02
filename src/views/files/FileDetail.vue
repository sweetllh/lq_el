<template>
	<div id="fileDetail">
		<div class="fileDetail">
			<div class="fileCont">
				<div class="header">
		      		<div class="head-title" @click="backOne"><i class="left_icon"></i>合同详情</div>
			        <!--<div class="btn_group">
			        	<span class="recall">撤销
			        	</span><span>提醒</span>
			        </div>  -->
			    </div>
			    <div class="head_detail">
			    	<!--<span @click="backOne">
			    		<i class="left_icon">
			    		</i><span class="detail_title">{{detailCont.ContractName}}</span>
			    	</span>-->
			    	<div class="detail_title">{{detailCont.ContractName}}</div>
				    <div class="detailCont">
				    	<span>{{detailCont.Type}}&nbsp;&nbsp;</span>
				    	<span>发起时间：{{detailCont.CreateDate}}&nbsp;&nbsp;</span>
				    	<span>截止时间：{{detailCont.EndDate}}</span>
				    </div>
				    <div class="remark">备注：{{detailCont.Remark}}</div>
				</div>
				
				<div class="tableWrap">
					<el-table :data="detailCont.Detail" style="width: 100%" v-loading="tableLoading" 
			        			element-loading-text="拼命加载中" 
			        			element-loading-spinner="el-icon-loading">
				  		 <el-table-column prop="Type" :label="orderType" align="center" min-width="120">
				  		 	<template slot-scope="scope" class="order">
						        <img :src="scope.row.Type == '已签署'?require('../../assets/img/signed.png'):require('../../assets/img/unsign.png') " 
						        	style="vertical-align: middle;" alt="" />
						     </template>
				  		 </el-table-column>
				  		 <el-table-column prop="Name" label="签署人"  min-width="100">
				  		 	<template slot-scope="scope">
						        <span>{{ scope.row.Name }}</span>
						    </template>
				  		 </el-table-column>
				  		 <el-table-column prop="Mobil" label="签署人账号" min-width="120">
				  		 	<template slot-scope="scope">
						        <span>{{ scope.row.Mobil }}</span>
						    </template>
				  		 </el-table-column>
				  		 <el-table-column prop="Date" label="签署时间" min-width="120">
				  		 	<template slot-scope="scope">
						        <span>{{ scope.row.Date }}</span>
						        <span class="sign_btn" @click="toSign(detailCont.ContractID,1)" 
										v-if="detailCont.Type == '待我签署' && scope.row.Mobil == userInfo.TelePhone">前往签署</span>
								<span class="sign_btn" @click="toSign(detailCont.ContractID,0)" 
										v-if="detailCont.Type == '草稿箱'">前往签署</span>
						    </template>
				  		 </el-table-column>
				  	</el-table>
					<div class="data-none" v-if="!detailCont.Detail && !tableLoading">
						<span class="sign_btn" @click="toSign(detailCont.ContractID,0)" 
							v-if="detailCont.Type == '草稿箱'">前往签署</span>
					</div>
				</div>
				<!--:style="{height: boxHeight + 'px'}"-->
			    <div class="contractCont" v-if="detailCont.Images" :style="{height: boxHeight + 'px'}">
			    	<div class="head_bg"></div>
			    	<ul id="contractCont">
			    		<li v-for="(item,index) in detailCont.Images" :key="index">
			    			<img :src="item" alt="" class="item"/>
			    		</li>
			    	</ul>
			    	<span class="pageNum">{{pageIndex}}/{{detailCont.Images.length}}</span>
			    	<div v-if="scrollTop>120" class="toTop" @click="toTop"></div>
			    </div>
			    
			</div>
			
      	</div> 
	</div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import { getContractDetail } from '@/api/file'
export default{
	components: {
	},
	data(){
		return {
			userInfo: getUserInfo(),
			detailCont: "",
			pageIndex: 1,
			scrollTop: 0,
			tableLoading: false,
		}
	},
	filters:{
	  	filterName(str){
	  		let num = str.lastIndexOf(".");
	  		if(num==-1){
	  			return str;
	  		}else{
	  			return str.substring(0,num);
	  		}
	    	
	  	},
	  	
	},
	computed:{
		orderType(){
			if(this.detailCont.OrderType == '0'){
	  			return "顺序签署"
	  		}else if(this.detailCont.OrderType == '1'){
	  			return "无序签署"
	  		}else if(this.detailCont.OrderType == '2'){
	  			return "单独签署"
	  		}else{
	  			return "尚未签署"
	  		}
		},
		
		boxHeight(){
			let h = document.documentElement.clientHeight || document.body.clientHeight;
			return h - 150;
		}
	},
	watch: {
		scrollTop(){
			let imgH = document.querySelectorAll('.item')[0].offsetHeight;
			let num = Math.round(this.scrollTop/imgH)+1;
			//let num = Math.round(this.scrollTop/998)+1;
			if(this.detailCont.Images){
				if(num > this.detailCont.Images.length){
					this.pageIndex = this.detailCont.Images.length;
				}else{
					this.pageIndex = num;
				}
			}
			
			
		}
	},
	created(){
		this.getDetailCont();
	},
	mounted(){
		//滚动监听，合同页
		var _this = this;
		window.addEventListener('scroll', _this.handleScroll,true);
	},
	methods: {
		handleScroll(){
			//let box = document.querySelector('.contractCont ul');
			let box =document.getElementById('contractCont');
			if(box){
				this.scrollTop = box.scrollTop;
				//console.log('scrollTop',this.scrollTop)
			}
			
		},
		backOne(){
			this.$router.go(-1);
		},
		
		toTop(){
		    document.getElementById('contractCont').scrollTop = 0 ;
		},
		
		//获取合同详情
		getDetailCont(){
			var _this = this;
			_this.tableLoading = true;
			getContractDetail(_this.$route.params.id).then(res => {
				_this.tableLoading = false;
				_this.detailCont = res.Data;
			}).catch(error => {
				_this.tableLoading = false;
			})
		},
		
		//前往签署
		toSign(contractId,type){
			if(type == 0){
				//草稿箱
				this.$router.push({ name: "addFileTwo" ,params:{id:contractId} });
			}else if(type == 1){
				//待我签署
				this.$router.push({ name: "signedFile" ,params:{id:contractId} });
			}
			
		}
		
	}
}
</script>

<style scoped>

.fileDetail{
	color: #303030;
	font-family: MicrosoftYaHei;
}
.fileCont{
	max-width: 970px;
	margin: 85px auto 50px;
	padding: 0 40px;
}
.header{
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
}

.header .head-title{
	font-size: 18px;
	cursor: pointer;
}

.head_detail {
	width: 100%;
	line-height: 30px;
	background: #f3f3f3;
	font-size: 14px;
	padding: 10px 15px;
	margin-bottom: 20px;
	box-sizing: border-box;
	font-family: MicrosoftYaHei;
}

.head_detail .detail_title{
	color: #FC4514;
	padding-left: 20px;
}
.left_icon{
	cursor: pointer;
	background: url(../../assets/img/icon-left.png) no-repeat center;
	width: 9px;
	height: 13px;
	display: inline-block;
	margin-right: 10px; 
}
.detailCont{
	color: #8F8F8F;
	padding-left: 20px;
}
.remark{
	color: #4B4B4B;
	padding-left: 20px;
}
.btn_group span{
	display: inline-block;
	width: 100px;
	line-height: 30px;
	font-size: 14px;
	text-align: center;
	color: #fff;
	background: #FC4514;
	cursor: pointer;
}
.btn_group span.recall{
	background: #B3B3B3;
	margin-right: 15px;
}
/*.order img{
	vertical-align: middle;
	margin-left: 16px;
}*/
.contractCont{
	width: 100%;
	/*height: 750px;*/
	border: 1px solid #C0C0C0;
	padding-top: 40px;
	margin-top: 30px;
	padding-bottom: 25px;
	position: relative;
	
}
.contractCont .head_bg{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	height: 34px;
	background: #F3F3F3;
}
.pageNum{
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate(-50%,0);
	font-size: 18px;
	color: #B9B9B9;
}
.contractCont ul{
	height: 100%;
	overflow: auto;
	
}
.contractCont ul li{
	width: 100%;
	/*width: 750px;*/
	/*height: 998px;*/
	border-bottom: 1px dashed #C5C5C5;
	margin: 0 auto;
}
.contractCont ul li:last-child{
	border-bottom: none;
}
.contractCont ul img{
	width: 100%;
	/*width: 750px;
	height: 998px;*/
}
.sign_btn{
	padding-left: 30px;
	color: #FC4514;
	cursor: pointer;
}
.toTop{
	width: 44px;
	height: 44px;
	border-radius: 50%;
	/*background: #f00;*/
	background: #E6E5E5 url(../../assets/img/to-top.png) no-repeat center;
	position: absolute;
	right: 15px;
	bottom: 30px;
}
.toTop:hover{
	background-color: #B7BBC5;
}


@media screen and (max-width: 767px){
	.detailCont span{
		display: block;
	}
	
}
/*@media screen and (min-width: 767px){*/
	  /*自定义滚动条 */
	.contractCont ul::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
		width:10px;
		height:6px;
		border-radius:4px;
	}
	.contractCont ul::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
		display: none;
	}
	.contractCont ul::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
			background:#F3F3F3;
			border-radius:4px;
	}
	.contractCont ul::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
			background:#F3F3F3;
			border-radius:4px;
	}
	.contractCont ul::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
		background: #C6C6C6;
		border-radius:4px;
	}
	.contractCont ul::-webkit-scrollbar-corner {/*边角（位置6）*/
		background: #F3F3F3; 
	}
	.contractCont ul::-webkit-scrollbar-resizer  {/*定义右下角拖动块的样式（位置7）*/
		background: #F3F3F3 ;
	}
	.contractCont ul::-webkit-scrollbar-hightlight-color  {/*定义右下角拖动块的样式（位置7）*/
		background: #F3F3F3 ;
	}
	
	.contractCont ul{
		scrollbar-arrow-color: #F3F3F3; /**//*三角箭头的颜色*/ 
		scrollbar-face-color: #C6C6C6; /**//*立体滚动条的颜色*/ 
		scrollbar-3dlight-color: #C6C6C6; /**//*立体滚动条亮边的颜色*/ 
		scrollbar-highlight-color: #F3F3F3; /**//*滚动条空白部分的颜色*/ 
		scrollbar-shadow-color: #F3F3F3; /**//*立体滚动条阴影的颜色*/ 
		scrollbar-darkshadow-color: #F3F3F3; /**//*立体滚动条强阴影的颜色*/ 
		scrollbar-track-color: #F3F3F3; /**//*立体滚动条背景颜色*/ 
		scrollbar-base-color:#F3F3F3; /**//*滚动条的基本颜色*/ 
	}
	
/*}*/


 
</style>