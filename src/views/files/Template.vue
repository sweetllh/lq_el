<template>
  <div>
    <div class="files clearfix">
      <!-- 左侧栏 -->
      <div class="left">
        <ul class="clearfix">
        	<li class="active">
        		<router-link to="/filesParent/template/0">
              <span>全部合同</span>
              <i>{{totalTemplate}}</i>
            </router-link>
        	</li>
          <li v-for="(item,index) in contractNames">
            <router-link :to="{name:'template',params:{id:item.Id}}">
              <span>{{item.Type}}</span>
              <i>{{item.Count}}</i>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 文件列表 -->
      <div class="right">
      	<div class="header clearfix">
      		<div class="head-title">{{type ? type : "全部合同"}}<span class="head-number">（{{count}}）</span></div>
	        <div class="search">
	        	<el-input size="small" placeholder="请输入合同名称" prefix-icon="el-icon-search" 
								v-model.trim="query" @keyup.enter.native="searchFlag=true; currentPage=1;getTemplateList()"></el-input>
	        	<el-button type="primary" size="mini" style="margin-left: 10px;"
	        		@click="searchFlag=true; currentPage=1;getTemplateList()">搜索</el-button>
	        </div>
      	</div>
      	
	    	<div class="tableWrap">
	    		<el-table :data="templateList" style="width: 100%" height="560" v-loading="tableLoading"
														    			   element-loading-text="拼命加载中"
													   	 					 element-loading-spinner="el-icon-loading">
				      <el-table-column prop="Name" label="模板名称" min-width="320">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Name | filterName }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="Type" label="合同类型" min-width="150">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Type }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column label="操作" min-width="150" align="center">
					      <template slot-scope="scope">
					        <el-button size="small" type="text"
					          @click="showDetail(scope.row.Id)">详情</el-button>
					        <el-button size="small" type="text"
					          @click="downLoad(scope.row.WordUrl,scope.row.Name)">下载</el-button>
					      </template>
					    </el-table-column>
				    </el-table>
	    		<el-pagination class="pageWrap"
						      @size-change="handleSizeChange"
						      @current-change="handleCurrentChange"
						      :current-page="currentPage "
						      :page-sizes="[10, 13, 20, 30, 40, 50, 100, 200, 300]"
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
import { getContractDomo } from '@/api/file'
export default {
  data() {
    return {
    	contractNames: [],
      templateList: [], //请求数据
      totalTemplate: 0, //总模板数
      query: "",
      pageSize: 13, //每页显示10条数据
      currentPage: 1, //当前页码
      count: 0,  //当前合同总数
			type: "",    //合同类型 空代表全部合同
			searchFlag: false, //搜索
      tableLoading: false,
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
      if(id == 0){
     		 	this.type = "";
      }else if(id == 1){
     		  this.type = "劳动人事合同";
      }else if(id == 2){
      		this.type = "买卖合同";
      }else if(id == 3){
      		this.type = "保管合同";
      }else if(id == 4){
      		this.type = "承揽合同";
      }else if(id == 5){
      		this.type = "抵押担保合同";
      }else if(id == 6){
      		this.type = "公司治理合同";
      }else if(id == 7){
      		this.type = "技术合同";
      }else if(id == 8){
      		this.type = "建设工程合同";
      }else if(id == 9){
      		this.type = "借贷合同";
      }else if(id == 10){
      		this.type = "居间行纪合同";
      }else if(id == 11){
      		this.type = "融资租赁合同";
      }else if(id == 12){
      		this.type = "委托服务合同";
      }else if(id == 13){
      		this.type = "运输合同";
      }else if(id == 14){
      		this.type = "赠与合同";
      }else if(id == 15){
      		this.type = "租赁合同";
      }
     
      this.searchFlag = false;
      this.currentPage = 1 ;  //初始默认为第一页
      //console.log(this.type)
      this.getTemplateList();
    }
  },
  created() {
    //获取合同列表
    let id = this.$route.params.id;
    if(id == 0){
     		 	this.type = "";
      }else if(id == 1){
     		  this.type = "劳动人事合同";
      }else if(id == 2){
      		this.type = "买卖合同";
      }else if(id == 3){
      		this.type = "保管合同";
      }else if(id == 4){
      		this.type = "承揽合同";
      }else if(id == 5){
      		this.type = "抵押担保合同";
      }else if(id == 6){
      		this.type = "公司治理合同";
      }else if(id == 7){
      		this.type = "技术合同";
      }else if(id == 8){
      		this.type = "建设工程合同";
      }else if(id == 9){
      		this.type = "借贷合同";
      }else if(id == 10){
      		this.type = "居间行纪合同";
      }else if(id == 11){
      		this.type = "融资租赁合同";
      }else if(id == 12){
      		this.type = "委托服务合同";
      }else if(id == 13){
      		this.type = "运输合同";
      }else if(id == 14){
      		this.type = "赠与合同";
      }else if(id == 15){
      		this.type = "租赁合同";
      }
      this.getTemplateList();
  },
  methods: {
  	handleSizeChange(val) {
			this.pageSize = val;
			this.getTemplateList();
        //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
    	this.currentPage = val;
    	this.getTemplateList();
       // console.log(`当前页: ${val}`);
    },
  	//获取合同列表
  	getTemplateList(){
  		//console.log('searchFlag',searchFlag)
  		//是否搜索
  		if(this.searchFlag){
  			var queryCont = this.query;
  		}else{
  			var queryCont = "";
  		}
  		var _this = this;
  		_this.tableLoading = true;
	    //获取合同模板列表
	    const params = {
	    			"Type": this.type ,
	        	"PageSize": this.pageSize,
	        	"Page": this.currentPage,
	        	"Query": queryCont
	    };
	    getContractDomo(params).then(res => {
	    	_this.tableLoading = false;
	    	let Data = res.Data;
        _this.count = Data.CurrentCount;  
        _this.templateList = Data.Contracts;
        //各种合同的数量
        if(this.currentPage == 1){
        			_this.totalTemplate = Data.Total;
        			_this.contractNames = Data.Types;
        }
	    }).catch( error => {
	    	_this.tableLoading = false;
	    })
  	},
    
    //下载模板
  	downLoad(WordUrl,name){
  		if(!PdfUrl){
  			this.$message({
			    	showClose: true,
		        message: "无可下载文件",
		        type: 'error',
		        duration: 3 * 1000
			    })
  			return;
  		}
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
    
    
    //详情页
    showDetail(templateId){
    	this.$router.push({ name: "templateDetail" ,params:{id:templateId} });
    },
    
  },
  
};
</script>

<style scoped>
.files {
  padding: 90px 40px 0;
  max-width: 1160px;
  margin: 0 auto;
  box-sizing: border-box;
}
.left {
  float: left;
  width: 150px;
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
  padding-bottom: 50px;
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

