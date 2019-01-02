<template>
	<div id="myTeam">
		<div class="myTeam">
			<div class="header">
		    	  <div class="head-title" @click="backOne">
		    	  <i class="left_icon"></i>我的团队<span class="head-number">（{{count}}）</span></div>
		    </div>
			<div class="r_header">
		      	<!--<i class="left_icon"></i>-->
		        <span class="r_header_title">团队管理</span>
		        <div class="r_h_btn" @click="showAddMember()">添加成员</div>
		    </div>
		    <div class="r_content">
		    	<div class="tableWrap">
	        		<el-table :data="myTeamList" :max-height="$clientHeight-230" style="width: 100%" v-loading="tableLoading"
	        				element-loading-text="拼命加载中"
	   	 					element-loading-spinner="el-icon-loading">
				      <el-table-column prop="Name" label="姓名" min-width="120">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.Name }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="User" label="账号" min-width="120">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.User }}</span>
						      </template>
				      </el-table-column>
				      <el-table-column prop="type" label="授权印章" align="center" min-width="100">
				      		<template slot-scope="scope">
						        <el-switch v-model="scope.row.type" active-color="#FC4514" inactive-color="#ff4949"></el-switch>
						      </template>
				      </el-table-column>
				      <el-table-column label="操作" min-width="120" align="center">
					      <template slot-scope="scope">
					        <el-button size="small" type="text"
					          @click="showEditTeam(scope.$index,scope.row)">编辑</el-button>
					        <el-button size="small" type="text"
					          @click="isDeleteTeam(scope.row)">删除</el-button>
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
	      
	      <!--添加，修改弹窗-->
        <el-dialog :title="title" :visible.sync="dialogFormVisible" width="390px" @close="$refs.teamDialog.resetFields()">
		  <el-form :model="formData" label-width="0" :rules="rules" ref="teamDialog">
		    <el-form-item label="" prop="Name">
		      <el-input v-model="formData.Name" placeholder="请输入姓名" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="" prop="User">
		      <el-input v-model="formData.User" maxlength="11" placeholder="请输入手机号" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" v-if="title=='添加成员'" @click="addMember('teamDialog')" size="small" :loading="loading">确 定</el-button>
		    <el-button type="primary" v-if="title=='修改成员'" @click="editMember('teamDialog')" size="small" :loading="loading">确 定</el-button>
		  </div>
		</el-dialog>
	      
	</div>
</template>

<script>
	import {validatePhone2} from "@/utils/validate"
	export default{
		name: 'MyTeam',
		components:{
		},
		data(){
			return{
				tableLoading: false,
				loading: false,
			    pageSize: 10, //每页显示10条数据
			    currentPage: 1, //当前页码
			    count: 20, //总记录数
			    myTeamList: [{
			    	Name: "某某",
			    	User: "15011667899",
			    	type: true,
			    	Id: 1,
			    }], //联系人列表
			    dialogFormVisible: false,
			    formData: {},
			    rules: {
			      	Name: [
			          { required: true, message: '请输入成员姓名!', trigger: 'blur' }
			        ],
			        User: [
			          { validator: validatePhone2, trigger: 'blur' }
			        ],
			    },
			    editIndex: "",
			    title: "",
			}
		},
		watch: {
			
		},
		created() {
		    //获取模板
		    this.queryTeamList();
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
				//this.getNewsList();
		    },
		    handleCurrentChange(val) {
		    	this.currentPage = val;
		    	//this.getNewsList();
		    },
			
			backOne(){
				this.$router.go(-1);
			},
			
		    queryTeamList(){
		    	
		    },
		    
		    //显示删除弹窗
		    isDeleteTeam(info){
		    	var _this = this;
				this.$confirm('确认删除  '+info.name+'  吗?', '提示信息', {
					showCancelButton: false,
					type: 'warning'
				}).then(() => {
					_this.deleteMember(info)
					
				}).catch(() => {
		
				});
		    	
		    },
		    //删除成员
		    deleteMember(info){
		    	var _this = this;
		      	deleteLink(info).then(res => {
		      	    _this.$alert('删除联系人成功', '提示', {
			          confirmButtonText: '确定',
			          callback: action => {
		          		//_this.getContacts();//重新加载联系人
		          	 }
		        	});
		      	    
		      	}).catch(error => {
		      		
		      	})
		    },
		    
		    //显示添加弹窗
		    showAddMember(){
		    	this.dialogFormVisible = true;
		    	this.title = "添加成员";
		    	this.formData = {
		    		Name: "",
		    		User: "",
		    	};
		    },
		    addMember(formName){
		    	console.log(this.formData )
		    	this.$refs[formName].validate((valid) => {
		        if (valid) {
		            var _this = this;
				    const params = {
				      		Name: _this.formData.Name,
				            User: _this.formData.User
				    };
				      _this.loading = true;
				      createLink(params).then(res => {
				      	  _this.loading = false;
				      	  _this.dialogFormVisible = false;
				      	  _this.$message({
				        	 showClose: true,
					          message: '添加成员成功',
					          type: 'success',
					          duration: 3*1000
					       });
				          //_this.getContacts();//重新加载联系人
				      }).catch(error => {
				      	 _this.loading = false;
				      })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    
		    //显示修改弹窗
		    showEditTeam(index,info){
		    	this.dialogFormVisible = true;
		    	this.title = "修改成员";
		    	this.formData = Object.assign({}, info) ;
		    	this.editIndex = index;
		    },
		    
		    //修改成员
		    editMember(formName){
		    	var _this = this;
		    	this.$refs[formName].validate((valid) => {
		          if (valid) {
		          	 _this.loading = true;
			      	 updateLink(_this.formData).then(res => {
			      		_this.loading = false;
			      		_this.dialogFormVisible = false;
			      		_this.$message({
			        	 showClose: true,
				          message: '修改成员成功',
				          type: 'success',
				          duration: 3*1000
				       });
				       //_this.getContacts();//重新加载联系人
			      	    
			      	}).catch(error => {
			      		 _this.loading = false;
			      	})
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    
		    
		},
	}
</script>

<style scoped>
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
	  padding-left: 15px;
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
	  font-size: 13px;
	  margin: 5px 13px;
	  cursor: pointer;
	}
	.r_content {
	  padding-bottom: 50px;
	}
	
	.th_operation{
		padding-left: 26px;
	 }
	 
	.team_edit img {
	  width: 20px;
	  height: 20px;
	  vertical-align: middle;
	  padding: 0 5px;
	  cursor: pointer;
	}
	th {
	  width: 25%;
	}
	th:first-child,td:first-child{
		padding-left: 5%;
	}
	/*switch开关*/
	/*椭圆未选择状态*/
	.iSwitch{
	  position: relative;
	  display: inline-block;
	  margin-left: 10px;
	  width: 36px;
	  height: 18px;
	  border-radius: 9px;
	  background: #D4D4D4;
	  border:1px solid #D4D4D4;
	  overflow: hidden;
	  vertical-align: middle;
	}
	.iSwitch input{
	  visibility: hidden;
	}
	/*圆*/
	.iSwitch i{
	  position: absolute;
	  top: 0;
	  left: 0px;
	  display: inline-block;
	  width: 50%;
	  height: 100%;
	  border-radius: 100%;
	  background: #fff;
	  transition: all 0.4s;
	}
	/*椭圆选择状态*/
	.iSwitch i::before{
	  position: absolute;
	  left: 0;
	  top: 0;
	  content: "";
	  display: none;
	  width: 36px;
	  height: 18px;
	  border-radius: 9px;
	  background: #FC4514;
	  /*border:1px solid #FC4514;*/
	}
	
	 /*圆*/
	.iSwitch i::after{
	  content: "";
	  position: absolute;
	  left: 0px;
	  top: 0;
	  z-index: 2;
	  display: inline-block;
	  width: 100%;
	  height: 100%;
	  border-radius: 100%;
	  background: #fff;
	}
	/*选中时*/
	.iSwitch input:checked + i{
	  transform:translateX(100%);
	  -webkit-transform:translateX(100%);
	  transition: all 0.4s;
	}
	.iSwitch input:checked + i:before{
	  display: inline-block;
	  transform:translateX(-50%);
	  -webkit-transform:translateX(-50%);
	  transition: all 0.4s;
	}
	/*响应式*/
	@media screen and (max-width: 991px){
		.tableWrap{
			height: auto;
		}
	}
</style>