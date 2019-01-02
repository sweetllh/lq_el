<template>
    <!-- 模板管理列表 -->
    <div id="myTemplate">
      <div class="header clearfix">
    	  <div class="head-title left">我的模板<span class="head-number">（{{count}}）</span></div>
    	  <div class="search right">
    	  	<el-input size="small" placeholder="请输入合同名称" prefix-icon="el-icon-search" 
						v-model.trim="query" @keyup.enter.native=""></el-input>
        	<el-button type="primary" size="mini" style="margin-left: 10px;"
        		@click="">搜索</el-button>
         </div>
      </div>
      <div class="r_header">
      	<!--<i class="left_icon"></i>-->
        <span class="r_header_title">模板列表</span>
        <div class="r_h_btn" @click="addTemplate()">添加模板</div>
      </div>
      <div class="r_content">
      	<div class="tableWrap">
    		<el-table :data="TemplateList" :max-height="$clientHeight-190" style="width: 100%" v-loading="tableLoading"
					    					element-loading-text="拼命加载中"
					 						element-loading-spinner="el-icon-loading">
			      <el-table-column prop="ContractName" label="模板名称" min-width="280">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.ContractName }}</span>
					    </template>
			      </el-table-column>
			      <el-table-column prop="type" label="类型" min-width="100">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.type }}</span>
					    </template>
			      </el-table-column>
			      <el-table-column prop="time" label="更新时间" min-width="120">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.time }}</span>
					    </template>
			      </el-table-column>
			      <el-table-column label="操作" min-width="120" align="center">
				      <template slot-scope="scope">
				        <el-button size="small" type="text"
				          @click="useTemplate(scope.row.ContractID)">详情</el-button>
				        <el-button size="small" type="text"
				          @click="downloadTemplate(scope.row.CurrentPdfURL,scope.row.ContractName)">下载</el-button>
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
</template>


<script>
export default {
  components: {
  },
  data() {
    return {
      pageSize: 10, //每页显示10条数据
      currentPage: 1, //当前页码
      count: 0, //总记录数
      TemplateList: [{
      	ContractName: "xx",
      	type: "xx",
      	time: "xx",
      	CurrentPdfURL: ""
      }], //联系人列表
      tableLoading: false,
      query: ""
    };
  },
  watch: {
	    
  },
  created() {
    //获取模板
  },
  methods: {
    handleSizeChange(val) {
			this.PageSize = val;
        //console.log(`每页 ${val} ${this.pageSize} 条`);
    },
    handleCurrentChange(val) {
    	this.currentPage = val;
       // console.log(`当前页: ${val}`);
    },
    
    //添加模板
    addTemplate(){
    	this.$router.push({path: "/filesParent/template/0"})
    },
    
    //使用模板
    useTemplate(){
    	
    },
    
    //下载模板
    downloadTemplate(){
    	
    }
  },
};
</script>

<style scoped>
	@import '../../assets/css/accountCommon.css';
	.r_header{
		padding-left: 34px;
	}
	.search {
	  height: 30px;
	  display: flex;
	  justify-content: flex-end;
	  align-items: center;
	  padding-right: 13px;
	}
	.search .search_input {
	  width: 190px;
	  height: 28px;
	  border: 1px solid #dbdbdb;
	  border-radius: 2px;
	  overflow: hidden;
	}
	.search-icon {
	  width: 15px;
	  margin: 7px;
	  float: left;
	}
	.search input {
	  height: 100%;
	  width: 150px;
	  line-height: 28px;
	  border: 0;
	  outline: 0;
	  float: left;
	  padding-top:1px; 
	  font-size: 14px;
	}
	.search-btn {
	  width: 60px;
	  line-height: 30px;
	  text-align: center;
	  color: #fff;
	  font-size: 12px;
	  background: #FC4514;
	  border-radius: 2px;
	  margin-left: 10px;
	  cursor: pointer;
	}
	
	/*响应式*/
	@media screen and (max-width: 991px){
		.tableWrap{
			height: auto;
		}
		.header .search{
			width: 100%;
			justify-content: flex-start;
			float: none;
		}
		
		.header .head-title{
			float: none;
			margin-bottom: 15px;
		}
	}	
</style>

