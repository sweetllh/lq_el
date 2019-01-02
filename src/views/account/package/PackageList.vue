<template>
        <!-- 我的套餐 -->
        <div id="package">
          <div class="header">
	    	  <div class="head-title">我的套餐 </div>
	      </div>
          <div class="r_header">
            <span>文件剩余</span>
            <span class="color_o">&nbsp;&nbsp;剩{{currentAmount}}份/共{{totalAmount}}份</span>
            <div class="r_h_btn" @click="buyPackage()">购买套餐</div>
          </div>
          <div class="r_content">
            <div class="tc_search_wrap">
              <span>订单记录</span>
              <div class="search-box-wrap hidden-xs-only">
                <span>订单时间</span>
                <span class="sel_time_box">
                	<el-date-picker v-model="startTimeVal" type="date" :editable='false'
				    				size="small" placeholder="选择截止日期"></el-date-picker>
				        &nbsp;&nbsp;至&nbsp;&nbsp;
    				<el-date-picker v-model="endTimeVal" type="date" :editable='false'
    				size="small" placeholder="选择截止日期"></el-date-picker>
                </span>
                <span class="seach_btn">查询</span>
              </div>
            </div>
            <div class="tableWrap">
	    		<el-table :data="packageList" :max-height="$clientHeight-190" style="width: 100%" v-loading="tableLoading"
	    			      element-loading-text="拼命加载中"
	 					  element-loading-spinner="el-icon-loading">
				      <el-table-column prop="ContractName" label="订单号" min-width="280">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Package_ID }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="SenderName" label="套餐类型" min-width="100">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Package_Type }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="CreateDate" label="购买时间" min-width="120">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Package_Date }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="ProcessType" label="是否付款" min-width="100">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Package_Date }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="CreateDate" label="开票状态" min-width="120">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Package_Date }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="ProcessType" label="金额" min-width="100">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Package_Price }}</span>
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
import { myPackage } from "@/api/account"
export default {
  data() {
    return {
      pageSize: 10, //每页显示10条数据
      currentPage: 1, //当前页码
      count: 0, //总记录数
      packageList: [], //套餐列表
      startTimeVal: "", //开始日期
      endTimeVal: "", //结束日期
      totalAmount: 0,
      currentAmount: 0,
      tableLoading: false,
    };
  },
  computed:{
  	
  },
  watch: {
    
  },
  created() {
    //获取我的套餐
    this.getMyPackage();
  },
  methods: {
  	handleSizeChange(val) {
			this.PageSize = val;
			this.getMyPackage();
        //console.log(`每页 ${val} ${this.pageSize} 条`);
    },
    handleCurrentChange(val) {
    	this.currentPage = val;
    	this.getMyPackage();
       // console.log(`当前页: ${val}`);
    },
  	//获取我的套餐列表
  	getMyPackage(pageIndex,PageSize){
  		var _this = this;
  		_this.tableLoading = true;
  		const params = {
  			"PageSize":this.pageSize,
		    "Page": this.currentPage
  		};
  		myPackage(params).then(res => {
  			_this.tableLoading = false;
  			let Data = res.Data;
            _this.packageList = Data.Result;
            _this.currentAmount = Data.CurrentAmount;
            _this.totalAmount = Data.TotalAmount
            _this.count = Data.PackageCount;
  		}).catch(error => {
  			_this.tableLoading = false;
  		})
        
  	},
  	
  	//购买套餐
  	buyPackage(){
  		this.$router.push({ path:"/accountParent/account/package/upGradePackage" })
  	},
  	
    
 
  },
  
};
</script>

<style scoped>
	@import "../../../assets/css/accountCommon.css";
	.r_content{
		padding-top: 20px;
	}
	.search-box-wrap{
		padding-right: 13px;
	}
	.r_header{
		padding-left: 38px;
	}
	.color_o {
	  color: #FC4514;
	}
	
	.tc_search_wrap {
	  height: 30px;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  font-size: 14px;
	  color: #3f3f3f;
	  padding-left: 38px;
	}
	.seach_btn {
	  background: #FC4514;
	  border-radius: 2px;
	  color: #fff;
	  font-size: 12px;
	  line-height: 30px;
	  display: inline-block;
	  width: 60px;
	  text-align: center;
	  margin-left: 5px;
	  cursor: pointer;
	}
	
	
	/*响应式*/
	@media screen and (max-width: 991px){
		.tableWrap{
			height: auto;
		}
		.tc_search_wrap{
			flex-wrap: wrap;
		}
		
	}	
	
</style>

