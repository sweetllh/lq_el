<template>
  <div class="home">
    <div>
	    <div class="banner">
	      <p style="z-index: 10; font-weight: 300;">创建新合同</p>
	      <div class="addBtn clearfix" ref="select_frame">
	      	<img src="../../assets/img/icon-add.png" class="plus-icon"/>
	      	<div class="dragTag">
	      		<p style="font-size: 14px;">签发文件</p>
	        	<p>点击选择或拖拽至此</p>
	      	</div>
	        <input type="file" multiple="multiple" @change="establishSign" id="isFile" value="">
	      </div>
	    </div>
	    <!--未认证提示-->
	    <div v-if="!userInfo.IsAuthentication" class="IsAuthentication">
	    	依据《中华人民共和国电子签名法》您必须完成实名认证，确保签署身份真实有效，签署的文件才具备法律效力。
	    	<span><router-link to="/accountParent/getApp">前往认证</router-link></span>
	    </div>	
	   	<!-- 内容-->
	    <div class="content">
	      <el-row tag="div" class="content-top">
	      	<el-col tag="div" :xs="24" :sm="24" :md="16" :lg="16" :xl="16" 
	      		style="min-width: 350px;overflow: auto;margin-bottom: 20px;">
	      		<p class="head_title">状态</p>
		        <ul class="task-list wrapper clearfix">
		          <li>
		            <router-link to="/filesParent/files/2">
		              <img class="icon" src="../../assets/img/icon-task1.png" alt="">
		              <p class="count" :style="{color: initData.WaitingForMe==0 ? '#9C9C9C' : '#000'}">{{initData.WaitingForMe || 0}}</p>
		              <span>待我签署</span>
		            </router-link>
		          </li>
		          <li>
		            <router-link to="/filesParent/files/3">
		              <img class="icon" src="../../assets/img/icon-task2.png" alt="">
		              <p class="count" :style="{color: initData.WaitingForOther==0 ? '#9C9C9C' : '#000'}">{{initData.WaitingForOther || 0}}</p>
		              <span>待他人签</span>
		            </router-link>
		          </li>
		          <li>
		            <img class="icon" src="../../assets/img/icon-task3.png" alt="">
		            <p class="count" style="color: #9C9C9C">0</p>
		            <span>即将到期</span>
		          </li>
		          <li>
		            <router-link to="/filesParent/files/4">
		              <img class="icon" src="../../assets/img/icon-task4.png" alt="">
		              <p class="count" :style="{color: initData.Completed==0 ? '#9C9C9C' : '#000'}">{{initData.Completed || 0}}</p>
		              <span>已完成</span>
		            </router-link>
		          </li>
		        </ul>
		      </el-col>  
	        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="home-info">
	        	<p class="head_title head_title2">账号</p>
	        	<div class="wrapper">
		          <div class="user-info clearfix">
		          	<div class="account">
		          		 <router-link to="/accountParent/account/BasicInfo">
			              <img class="face" :src="baseInfo.HeadPortrait || require('../../assets/img/touxiang.png')"  alt="">
			            </router-link>
		          	</div>
		            <div class="text-info">
		              <p class="name">
		                <span>{{baseInfo.IsAuthentication ? baseInfo.RealName : baseInfo.Telephone}}</span>
		                <img v-if="baseInfo.IsAuthentication" src="../../assets/img/renzheng.png" alt="">
		              </p>
		              <p>账号：
		                <span>{{baseInfo.Telephone}}</span>
		              </p>
		            </div>
		          </div>
		          <div class="setMeal">
		            <p>套餐剩余份数：{{initData.PackagingServiceAmount}}份</p>
		            <!--<div class="btn" @click="upgrade">升级套餐</div>-->
		          </div>
	          </div>
	        </el-col>
	      </el-row>
	      
	      	<!--表格-->
	      <div class="lately">
	        <div class="lately-title">
	          <p>最近合同</p>
	          <router-link to="/filesParent/files/1">
	           	 查看更多
	            <i></i>
	          </router-link>
	        </div>
	        <div class="tableWrap">
	        	<el-table :data="contractList" style="width: 100%" v-loading="tableLoading"
	        		element-loading-text="拼命加载中"
   	 					element-loading-spinner="el-icon-loading">
				      <el-table-column prop="ContractName" label="合同主题" min-width="260">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.ContractName | filterName }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="ContractName" label="发起人" min-width="100">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.SenderName }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="ContractName" label="发起时间" min-width="100">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.CreateDate }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="ContractName" label="状态" min-width="100">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.ProcessType }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column label="操作" min-width="120" align="center">
					      <template slot-scope="scope">
					        <el-button size="small" type="text"
					          @click="showDetail(scope.row.ContractID)">详情</el-button>
					        <el-button size="small" type="text"
					          @click="downLoad(scope.row.CurrentPdfURL,scope.row.ContractName)">下载</el-button>
					      </template>
					    </el-table-column>
				    </el-table>
	        </div>
	        
	      </div>
	      
	    </div>
	    
	    	<!--二维码-->
	      <el-row tag="div" class="qr_code">
		  			<el-col tag="div" :xs="24" :sm="24" :md="12" :lg="8" :xl="8" class="codeList">
			      		<div><img src="../../assets/img/wei.png" alt="" width="79"/></div>
		  					<div class="codeCont">
		  							<p class="theme"><img src="../../assets/img/icon-phone.png" alt="" width="8"/>下载链签APP</p>
		  							<p class="tip">扫一扫下载链签APP，随时随地签署合同</p>
		  					</div>
		  			</el-col>
		  			<el-col tag="div" :xs="24" :sm="24" :md="9" :lg="7" :xl="6" class="codeList">
			      		<div><img src="../../assets/img/wei.png" alt="" width="79"/></div>
		  					<div class="codeCont">
		  							<p class="theme"><img src="../../assets/img/icon-weixin.png" alt="" width="14"/>链签公众号</p>
		  							<p class="tip">扫一扫关注链签公众号，玩转电子合同</p>
		  					</div>
		  			</el-col>
	      </el-row>
    </div>
  	
  </div>

</template>


<script>
import { getUserInfo } from '@/utils/auth'
import { getHomeInfo } from '@/api/home'
import { getAccount } from '@/api/user'
import { getContract,imgToPdf,wordToPdf } from '@/api/file'
export default {
  data() {
    return {
      userInfo: getUserInfo(),
      baseInfo: "",
      initData: {},    //首页任务列表数据
      contractList: [],  //合同列表
      tableLoading: false,
      loading: null,
    };
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
  beforeCreate() {
    var _this = this;
    //获取首页任务列表数据
    getHomeInfo().then(res => {
    	 _this.initData = res.Data;
    }).catch(error => {
    	
    })
  },
  created() {
    this.getBaseInfo();
    if(this.baseInfo){
    	this.baseInfo.Telephone = 
    		this.baseInfo.TelePhone.substr(0, 3) +
        "****" +
        this.baseInfo.TelePhone.substr(7);
    }
    //获取我的合同列表
    this.getContactList();
  },
  
  //拖拽上传
  mounted() {
    this.$refs.select_frame.ondragleave = (e) => {
      e.preventDefault();  //阻止离开时的浏览器默认行为
    };
    this.$refs.select_frame.ondrop = (e) => {
      e.preventDefault();    //阻止拖放后的浏览器默认行为
			// 未认证
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
    	}
      const data = e.dataTransfer.files;  // 获取文件对象
      const fileInfo= e.dataTransfer.files[0];
      if (data.length < 1) {
        return;  // 检测是否有文件拖拽到页面     
      }
      //console.log("拖拽",e.dataTransfer.files);
      
	    if(fileInfo.type.indexOf('image') == 0){
	    	//图片转换成pdf
	    	this.ImgToPdf(e.dataTransfer.files);
	    }else{
	    	//文件转换成pdf
  			this.WordToPdf(fileInfo);
	    }
      
    };
    this.$refs.select_frame.ondragenter = (e) => {
      e.preventDefault();  //阻止拖入时的浏览器默认行为
      //this.$refs.select_frame.border = '10px dashed red';
    };
    this.$refs.select_frame.ondragover = (e) => {
      e.preventDefault();    //阻止拖来拖去的浏览器默认行为
    };
  },

  methods: {
  	//获取用户基本信息
  	getBaseInfo(){
  		var _this = this;
  		getAccount().then(res => {
  			_this.baseInfo = res.Data;
  		}).catch(error => {
    	
      })	
  	},
  	
  	//获取我的合同列表
  	getContactList(){
  		var _this = this;
  		_this.tableLoading = true;
  		const params = {
  				  "Type": "全部合同" ,
	        	"PageSize": 3,
	        	"Page": 1,
  		};
  		getContract(params).then(res => {
  			  _this.tableLoading = false;
  			  _this.contractList = res.Data.Contracts;
  		}).catch(error =>{
  			  _this.tableLoading = false;
  		})
  	},
  	
  	//下载合同
  	downLoad(PdfUrl,name){
  		if(!PdfUrl){
  			this.$message({
			    	showClose: true,
		        message: "无可下载文件",
		        type: 'error',
		        duration: 3 * 1000
			    })
  			return;
  		}
  		//console.log(PdfUrl)
    	name = name.substring(0,name.lastIndexOf("."));
  		this.$axios({
        method: "get",
        url: PdfUrl,
        responseType: "blob"
      }).then(data => {
      	if (!data) {
          return;
        }
      	if (window.navigator.msSaveOrOpenBlob) {   // if browser is IE
            navigator.msSaveBlob(PdfUrl, name+'.pdf');//filename文件名包括扩展名，下载路径为浏览器默认路径
        }else{
        		let url = window.URL.createObjectURL(data.data);
		        let link = document.createElement("a");
		        link.style.display = "none";
		        link.href = url;
		        link.setAttribute("downLoad", name+'.pdf'); //设置文件名称
		        document.body.appendChild(link);
		        link.click();
        }
      	
        //console.log(res);
      });
      
  	},
  	
  	//详情页
    showDetail(contractId){
    	this.$router.push({ name: "fileDetail" ,params:{id:contractId} });
    },
    
  	//升级套餐
  	upgrade(){
  		this.$router.push({ path: "/accountParent/account/package/upGradePackage"});
  	},
  	
    //创建合同
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
    	}
      //console.log(e.target.files[0]); 
      var fileInfo= e.target.files[0];
      
	    if(fileInfo.type.indexOf('image') == 0){
	    	//图片转换成pdf
	    	this.ImgToPdf(e.target.files);
	    }else{
	    	//文件转换成pdf
  			this.WordToPdf(fileInfo);
	    }
	   
    },
    
    //文件转换成pdf
    WordToPdf(fileInfo){
    		var _this = this;
    		/*sessionStorage.setItem('fileSize',fileInfo.size);*/ 
	      var formData = new FormData();
	      formData.append("file", fileInfo);
	      formData.append("Remark", '文件转换成pdf');
	      formData.append("ContractName", fileInfo.name);
	      this.startLoading();
	      wordToPdf(formData).then(res => {
	      	_this.closeLoading();
	      	let contractId = res.Data.ID;
	        _this.$router.push({ name: "addFileOne" ,params:{id:contractId} });
        }).catch(error => {
        	_this.closeLoading();
        	document.getElementById('isFile').value = "";
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
    		var _this = this;
    		this.startLoading();
	      imgToPdf(formData).then(res => {
	      	_this.closeLoading();
	      	let contractId = res.Data.ID;
	        _this.$router.push({ name: "addFileOne" ,params:{id:contractId} });
        }).catch(error => {
        	_this.closeLoading();
        	document.getElementById('isFile').value = "";
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

<style scoped>
	@import '../../assets/css/home.css';
</style>

