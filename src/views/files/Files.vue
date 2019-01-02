<template>
  <div>
    <div class="files clearfix">
      <!-- 左侧栏 -->
      <div class="left">
        <ul class="clearfix">
          <li class="active">
            <router-link to="/filesParent/files/1">
              <span>全部合同</span>
              <i>{{nums.total}}</i>
            </router-link>
          </li>
          <li>
            <router-link to="/filesParent/files/2">
              <span>待我签署</span>
              <i>{{nums.WaitingForMe}}</i>
            </router-link>
          </li>
          <li>
            <router-link to="/filesParent/files/3">
              <span>待他人签署</span>
              <i>{{nums.WaitingForOther}}</i>
            </router-link>
          </li>
          <li>
            <router-link to="/filesParent/files/4">
              <span>已完成</span>
              <i>{{nums.Completed}}</i>
            </router-link>
          </li>
          <!--<li>
            <router-link to="/filesParent/files/5">
              <span>已撤回</span>
              <i>0</i>
            </router-link>
          </li>
          <li>
            <router-link to="/filesParent/files/6">
              <span>已过期</span>
              <i>0</i>
            </router-link>
          </li>-->
          <li>
            <router-link to="/filesParent/files/7">
              <span>草稿箱</span>
              <i>{{nums.Draft}}</i>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 文件列表 -->
      <div class="right">
      	<div class="header clearfix">
      			<div class="head-title">合同列表<span class="head-number">（{{count}}）</span></div>
		        <div class="search">
		        	<el-input size="small" placeholder="请输入合同名称" prefix-icon="el-icon-search" 
								v-model.trim="query" @keyup.enter.native="searchFlag=true; currentPage=1; getContactList()"></el-input>
		        	<el-button type="primary" size="mini" style="margin-left: 10px;"
		        		@click="searchFlag=true;currentPage=1;getContactList()">搜索</el-button>
		        </div>
      	</div> 
    	<div class="tableWrap">
    		<el-table :data="contractList" :max-height="$clientHeight-190" style="width: 100%" v-loading="tableLoading"
    			element-loading-text="拼命加载中"
 					element-loading-spinner="el-icon-loading">
			      <el-table-column prop="ContractName" label="合同主题" min-width="280">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.ContractName | filterName }}</span>
					      </template>
			      </el-table-column>
			      <el-table-column prop="SenderName" label="发起人" min-width="100">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.SenderName }}</span>
					      </template>
			      </el-table-column>
			      <el-table-column prop="CreateDate" label="发起时间" min-width="120">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.CreateDate }}</span>
					      </template>
			      </el-table-column>
			      <el-table-column prop="ProcessType" label="状态" min-width="100">
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
    		<el-pagination class="pageWrap"
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page="currentPage "
					      :page-sizes="[10, 20, 30, 40, 50, 100, 200, 300]"
					      :page-size="pageSize"
					      layout="total, sizes, prev, pager, next, jumper"
					      :total="count">
					</el-pagination>
      </div>

      </div>
    </div>
    
  </div>

</template>


<script>
import { getContract } from '@/api/file'
export default {
  data() {
    return {
      contractList: [], //请求数据
      query: "",
      pageSize: 10, //每页显示10条数据
      currentPage: 1, //当前页码
      count: 0, //总记录数
			type: "全部合同",    //合同类型
			searchFlag: false, //搜索
			tableLoading: false,
			nums:{
				total: 0,             //总数
				WaitingForMe: 0,			//待我签署
				WaitingForOther: 0,   //待他人签署
				Completed: 0,					//已完成
				Draft: 0,							//草稿箱
				recall: 0,						//已撤回
				overdue: 0						//已过期		
			},
			
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
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      const id = to.params.id;
      if(id == 1){
     		 	this.type = "全部合同";
      }else if(id == 2){
     		  this.type = "待我签署";
      }else if(id == 3){
      		this.type = "待他人签署";
      }else if(id == 4){
      		this.type = "已完成";
      }else if(id == 5){
      		this.type = "已撤回";
      }else if(id == 6){
      		this.type = "已过期";
      }else if(id == 7){
      		this.type = "草稿箱";
      }
      this.searchFlag = false;
      this.currentPage = 1 ;  //初始默认为第一页
      //console.log(this.type)
      this.getContactList();
      
    },
    
  },
  created() {
    //获取合同列表
    let id = this.$route.params.id;
    if(id == 1){
     		 	this.type = "全部合同";
      }else if(id == 2){
     		  this.type = "待我签署";
      }else if(id == 3){
      		this.type = "待他人签署";
      }else if(id == 4){
      		this.type = "已完成";
      }else if(id == 5){
      		this.type = "已撤回";
      }else if(id == 6){
      		this.type = "已过期";
      }else if(id == 7){
      		this.type = "草稿箱";
      }
      this.getContactList();
    
  },
  methods: {
  	handleSizeChange(val) {
			this.pageSize = val;
			this.getContactList();
        //console.log(`每页 ${val} ${this.pageSize} 条`);
    },
    handleCurrentChange(val) {
    	this.currentPage = val;
    	this.getContactList();
       // console.log(`当前页: ${val}`);
    },
  	//获取合同列表
  	getContactList(){
  		//console.log('searchFlag',searchFlag)
  		//是否搜索
  		if(this.searchFlag){
  			var queryCont = this.query;
  			//this.searchFlag = true;
  		}else{
  			var queryCont = "";
  		}
  		var _this = this;
  		_this.tableLoading = true;
	    //获取我的合同列表
	    const params = {
	    			"Type": this.type ,
	        	"PageSize": this.pageSize,
	        	"Page": this.currentPage,
	        	"Query":queryCont
	    };
	    getContract(params).then( res => {
	    	  _this.tableLoading = false;
		    	let Data = res.Data;
	        _this.count = Data.MessageCount;
	        _this.contractList = Data.Contracts;
	        //各种合同的数量
	        if(this.currentPage == 1){
	        			_this.$set(_this.nums,'total',Data.Total);
	        			_this.$set(_this.nums,'WaitingForMe',Data.WaitingForMe);
	        			_this.$set(_this.nums,'WaitingForOther',Data.WaitingForOther);
	        			_this.$set(_this.nums,'Completed',Data.Completed);
	        			_this.$set(_this.nums,'Draft',Data.Draft);
	        }
	    }).catch( error => {
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
    	name = name.substring(0,name.lastIndexOf("."));
  		this.$axios({
        method: "get",
        url: PdfUrl,
        responseType: "blob"
      }).then(data => {
        //console.log(data);
        if (!data) {
          return;
        }
        // debugger;
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
        
      });
      
  	},
  	
  	//详情页
    showDetail(contractId){
    	this.$router.push({ name: "fileDetail" ,params:{id:contractId} });
    },
    
  },
};
</script>

<style scoped>
.files {
  padding: 90px 40px 0;
  max-width: 1120px;
  margin: 0 auto;
  box-sizing: border-box;
}
.left {
  float: left;
  width: 150px;
  /*height: 280px;*/
  margin-right: 40px;
  background: #f3f3f3;
}
.left li {
  height: 40px;
  cursor: pointer;
}
.left li a {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #606060;
  padding: 0 22px 0 14px;
}
.left li i {
  text-align: right;
}
.left .router-link-exact-active {
  background: #fff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.14);
  color: #FC4514;
}
.right {
  float: left;
  width:  calc(100% - 190px);
 /* padding-bottom: 50px;*/
}
.header .head-title{
	font-size: 18px;
	color: #303030;
	float: left;
}
.header .head-number{
	font-size: 16px;
}
.search {
	float: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}


/*响应式*/
@media screen and (max-width: 991px){
	.tableWrap{
		height: auto;
	}
	
	.right .header .search{
		width: 100%;
		justify-content: flex-start;
	}
	
	.right .header .head-title{
		margin-bottom: 15px;
	}
	
	.right {
	  float: none;
	  width: 100%;
	  /*width: 890px;*/
	  padding-bottom: 50px;
	}
	
	.left {
	  float: none;
	  width: 100%;
	  height: auto;
	  margin-bottom: 20px;
	}
	.left li {
		float: left;
		width: 25%;
	  height: 40px;
	  cursor: pointer;
	}
	.left li a {
	  justify-content: flex-start;
	}
	.left li i{
		padding-left: 10px;
	}
	
}

@media only screen and (max-width: 767px){
	.left li {
		float: left;
		width: 33.3%;
	  height: 40px;
	  cursor: pointer;
	}
}
@media only screen and (max-width: 560px){
	.left li {
		float: left;
		width: 50%;
	  height: 40px;
	  cursor: pointer;
	}
}
</style>

