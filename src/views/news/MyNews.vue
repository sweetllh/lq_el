<template>
	<div id="myTeam">
		<div class="myTeam">
			<div class="header">
		    	  <div class="head-title" @click="backOne">
		    	  <i class="left_icon"></i>我的消息<span class="head-number">（{{count}}）</span></div>
		    </div>
			<div class="r_header">
		        <span class="r_header_title">消息列表</span>
		    </div> 
		    <div class="r_content">
		    	<div class="tableWrap">
	        		<el-table :data="myNewsList" :max-height="$clientHeight-230" style="width: 100%" v-loading="tableLoading"
	        				element-loading-text="拼命加载中"
	   	 					element-loading-spinner="el-icon-loading" 
	   	 					:row-class-name="tableRowClassName">
				      <el-table-column prop="Type" label="合同主题" min-width="100">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Type }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="Message" label="内容" min-width="380">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Message }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="Date" label="时间" min-width="180">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Date }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="IsRead" label="状态" min-width="70"
				      	column-key="IsRead"
				        :filters="[{text: '已读', value: 1}, {text: '未读', value: 0}]"
				        :filter-method="filterHandler">
				      		<template slot-scope="scope">
						        <span>{{scope.row.IsRead == 0 ? "未读" : "已读"}}</span>
						      </template>
				      </el-table-column>
				      <el-table-column label="操作" min-width="120" align="center">
					      <template slot-scope="scope">
					        <el-button size="small" type="text"
					          @click="getNewDetail(scope.row.MessageID,scope.row.ContractID)">详情</el-button>
					        <el-button size="small" type="text"
					          @click="deleteNews(scope.row.MessageID)">删除</el-button>
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
	import {getNews,readedNews,deleteMessage} from "@/api/news"
	export default{
		name: 'MyNews',
		components:{
			
		},
		data(){
			return{
			    pageSize: 10, //每页显示10条数据
			    currentPage: 1, //当前页码
			    count: 0, //总记录数
			    pageCount: 1, //总页数
			    myNewsList: [], //信息列表
      			tableLoading: false,
			}
		},
		computed:{
			
		},
		watch: {
			
		},
		created() {
		    //获取消息列表
		    this.getNewsList();
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
				this.getNewsList();
		    },
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	this.getNewsList();
		    },
			
			tableRowClassName({row, rowIndex}){
				if(row.IsRead){
					return 'readed';
				}else{
					return 'unread';
				}
			},
			
			filterHandler(value, row, column) {
		        const property = column['property'];
		        console.log(value, row[property])
		        return row[property] === value;
		    },
			
			backOne(){
				this.$router.go(-1);
			},
			
			//获取信息列表
			getNewsList(){
				var _this = this;
				_this.tableLoading = true;
				const params = {
					"PageSize": _this.pageSize,
			        "Page": _this.currentPage
				};
				getNews(params).then(res => {
					const Data = res.Data;
					_this.tableLoading = false;
					_this.myNewsList = Data.Messages;
		            _this.count = Data.MessageCount;
				}).catch(error => {
					_this.tableLoading = false;
				})
		        
			},
			
			//点击详情
		    getNewDetail(messageId,contractID){
		    	//变成已读
		    	this.readNews(messageId,contractID);
		    	//this.$router.push({ name: "fileDetail" ,params:{id:contractID} });
		    },
		    
			//信息已读
			readNews(messageId,contractID){
				readedNews(messageId).then(res => {
					this.$router.push({ name: "fileDetail" ,params:{id:contractID} });
				}).catch(error => {
					
				})
			},
			
			
			//删除信息
			DeleteM(id){
				deleteMessage(id).then(res => {
					this.getNewsList();
					this.$message({
				    	showClose: true,
				        message: "删除成功",
				        type: 'success',
				        duration: 3 * 1000
				    })
					
				}).catch(error => {
					
				} )
			},
			deleteNews(id){
				const _this = this;
				this.$confirm('你确定删除此消息吗?', '提示信息', {
					showCancelButton: false,
					type: 'warning'
				}).then(() => {
					_this.DeleteM(id)
				}).catch(() => {
		
				});
			},
			
		    
		},
	}
</script>

<style scoped>
	@import '../../assets/css/dialogCont.css';
	@import "../../assets/css/table.css";
	.myTeam{
		padding: 85px 40px 0;
		max-width: 970px;
		margin: 0 auto;
		box-sizing: border-box;
	}
	.header{
		margin-bottom: 17px;
	}
	.left_icon{
		cursor: pointer;
		background: url(../../assets/img/icon-left.png) no-repeat center;
		width: 9px;
		height: 13px;
		display: inline-block;
		margin-right: 10px; 
	}
	.header .head-title{
		font-size: 18px;
		color: #303030;
		cursor: pointer;
	}
	.header .head-number{
		font-size: 16px;
	}
	.r_header {
	  max-width: 970px;
	  line-height: 40px;
	  background: #f3f3f3;
	  color: #3f3f3f;
	  font-size: 14px;
	  padding-left: 34px;
	  box-sizing: border-box;
	  font-family: MicrosoftYaHei;
	}
	
	.r_header .left_icon{
		background: url(../../assets/img/icon-right.png) no-repeat;
		transform: rotate(-180deg);
		-webkit-transform: rotate(-180deg);
		width: 8px;
		height: 13px;
		display: inline-block;
		margin-right: 10px; 
	}
	
	.r_header .r_header_title{
		color: #FC4514;
	}
	
	.r_h_btn {
	  float: right;
	  width: 100px;
	  line-height: 30px;
	  text-align: center;
	  background: #FC4514;
	  color: #fff;
	  font-size: 14px;
	  margin: 5px 13px;
	  cursor: pointer;
	}
	
	/*响应式*/
	@media screen and (max-width: 991px){
		.tableWrap{
			height: auto;
		}
	}
</style>