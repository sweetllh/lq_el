<template>
	<div class="templateDetail">
		<p class="title" @click="backOne"><img src="../../assets/img/icon-left.png"/>模板预览</p>
		<div class="head-bg">
			<div class="name">
				<span>模板名称：{{detailCont.Name}}</span>
				<span style="padding-left: 10px;">模板类型：{{detailCont.Type}}</span>
			</div>
			<div class="btn" @click="downLoad(detailCont.WordUrl,detailCont.Name,)">下载模板</div>
		</div>
		<div class="content listLoading" id="viewDiv" v-loading="listLoading"
				element-loading-text="拼命加载中"
				element-loading-spinner="el-icon-loading">
			<iframe :src="detailCont.HtmlUrl" name="ifd" ref="ifd" id="iframeId"
				width="100%" scrolling="auto" frameborder="0"></iframe>
		</div>
		
	</div>
</template>

<script>
import { ContractDemoDetail } from '@/api/file'
export default{
	data(){
		return{
			detailCont: {},
			listLoading: false,
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
	created() {
	  	this.templateDetail();   //获取详情
	  	
	},
	mounted(){
		//iframe高度自适应
	},
	methods:{
		backOne(){
			this.$router.go(-1);
		},
	    
	    //获取详情
	    templateDetail(){
	    	var _this = this;
	    	_this.listLoading = true;
	    	ContractDemoDetail(_this.$route.params.id).then(res => {
	    		_this.listLoading = false;
	    		_this.detailCont = res.Data;
	    	}).catch(error => {
	    		_this.listLoading = false;
	    	})
			
	    },
	    
	    //下载模板
	  	downLoad(WordUrl,name){
	    	//name = name.substring(0,name.lastIndexOf("."));
	  		this.$axios({
		        method: "get",
		        url: WordUrl,
		        responseType: "blob"
		      }).then(data => {
		        //console.log(data);
		        if (!data) {
		          return;
		        }
		        // debugger;
		        if (window.navigator.msSaveOrOpenBlob) {   // if browser is IE
		            navigator.msSaveBlob(WordUrl, name);//filename文件名包括扩展名，下载路径为浏览器默认路径
		        }else{
	        		let url = window.URL.createObjectURL(data.data);
			        let link = document.createElement("a");
			        link.style.display = "none";
			        link.href = url;
			        link.setAttribute("downLoad", name); //设置文件名称
			        document.body.appendChild(link);
			        link.click();
		        }
		        
		     });
      
  		},
  		
		
		

	}
}
</script>

<style scoped>
.templateDetail{
	max-width: 970px;
	margin: 0 auto;
	padding: 85px 40px 0;
}
.title{
	line-height: 24px;
	color: #303030;
	font-size: 18px;
	/*padding-left: 20px;*/
	cursor: pointer;
	margin-bottom: 17px;
}
.title img{
	margin-right: 15px;
}
.head-bg{
	width: 100%;
	/*height: 40px;*/
	line-height: 40px;
	background: #F3F3F3;
	font-size: 14px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
}
.head-bg .name{
	padding-left: 34px;
	color: #949494;
}
.head-bg .btn{
	margin: 5px 13px;
	width: 100px;
	height: 30px;
	line-height: 30px;
	background: #FC4514;
	text-align: center;
	color: #fff;
	cursor: pointer;
}
.content{
	width: 100%;
	height: 100%;
	/*font-size: 0;*/
	/*width: 900px;*/
	margin: 0 auto 30px;
	overflow: hidden;
	position: relative;
}
iframe{
	width: 100%;
	height: 100%;
	min-height: 3200px;
}

@media only screen and (max-width: 640px) {
	.head-bg .name span{
		display: block;
		padding-left: 0 !important;
	}
}

</style>