<template>
    <!-- 联系人列表 -->
    <div id="contact">
      <div class="header">
    	  <div class="head-title">我的联系人<span class="head-number">（{{total}}）</span></div>
    	 <!-- <span class="head-number">{{count}}</span>-->
      </div>
      <div class="r_header">
      	<!--<i class="left_icon"></i>-->
        <span class="r_header_title">联系人列表</span>
        <div class="r_h_btn" @click="showAddContact">添加联系人</div>
      </div>
      <div class="r_content">
	      <div class="tableWrap">
	      	<el-table :data="contactList.slice((currentPage-1)*pageSize,currentPage*pageSize)"   
	      									:max-height="$clientHeight-243" style="width: 100%" v-loading="tableLoading"
					    					element-loading-text="拼命加载中"
					 						element-loading-spinner="el-icon-loading">
				  <el-table-column type="index"  min-width="50"> </el-table-column>
			      <el-table-column prop="Name" label="姓名" min-width="100">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.Name }}</span>
					    </template>
			      </el-table-column>
			      <el-table-column prop="User" label="账号" min-width="130">
			      		<template slot-scope="scope">
					        <span>{{ scope.row.User }}</span>
					    </template>
			      </el-table-column>
			      <el-table-column prop="IsAuth" label="实名认证" min-width="90">
			      		<template slot-scope="scope">
					        <span :style="{'color': scope.row.IsAuth ? '#606266' : '#f00'}">{{ scope.row.IsAuth ? '已认证' : '未认证' }}</span>
					    </template>
			      </el-table-column>
			      <el-table-column label="操作" min-width="120" align="center">
				      <template slot-scope="scope">
				        <el-button size="small" type="text" icon="el-icon-edit"
				          @click="showEditContact(scope.$index,scope.row)"></el-button>
				        <el-button size="small" type="text" icon="el-icon-delete"
				          @click="isDeleteContact(scope.row)"></el-button>
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
		      :total=parseInt(total)>
		 </el-pagination>
	      </div>
	    </div>  
      
      	<!--添加，修改弹窗-->
       <el-dialog :title="title" :visible.sync="dialogFormVisible" width="390px" @close="$refs.concatDialog.resetFields()">
		  <el-form :model="formData" label-width="0" :rules="rules" ref="concatDialog">
		    <el-form-item label="" prop="Name">
		      <el-input v-model="formData.Name" placeholder="请输入姓名" autocomplete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="" prop="User">
		      <el-input v-model="formData.User" maxlength="11" placeholder="请输入手机号码" autocomplete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button type="primary" v-if="title=='添加联系人'" @click="addContacts('concatDialog')" size="small" :loading="loading">确 定</el-button>
		    <el-button type="primary" v-if="title=='修改联系人'" @click="editContacts('concatDialog')" size="small" :loading="loading">确 定</el-button>
		  </div>
		</el-dialog>
      
    </div>
</template>


<script>
import {getLink,createLink,deleteLink,updateLink} from "@/api/user"
import {validatePhone2,validateName} from "@/utils/validate"
export default {
  data() {
    return {
      tableLoading: false,
      loading: false,
      title: "",
      dialogFormVisible: false,
      formData: {},
      editIndex: "",
      pageSize: 10, //每页显示10条数据
      currentPage: 1, //当前页码
      //total: 0, //总记录数
      contactList: [], //联系人列表
      rules: {
      	Name: [
          { required: true, message: '请输入联系人姓名!', trigger: 'blur' }
        ],
        User: [
          { validator: validatePhone2, trigger: 'blur' }
        ],
      }
    };
  },
  computed:{
  	total(){
  		return this.contactList.length;
  	},
  },
  watch: {
    
  },
  created() {
    //获取联系人
    this.getContacts();
  },
  methods: {
  	handleSizeChange(val) {
        this.pageSize = val;
    },
    handleCurrentChange(val) {
        this.currentPage = val;
    },
    //获取联系人
    getContacts() {
      var _this = this;
      _this.tableLoading = true;
      getLink().then(res => {
      	_this.tableLoading = false;
      	var data = res.Data;
        for (var i = 0; i < data.length; i++) {
          _this.contactList = _this.contactList.concat(data[i].content);
        }
        _this.pageshow = true;
      }).catch(error => {
      	 _this.tableLoading = false;
      })
      
    },
    
    /*删除联系人?*/
    isDeleteContact(info){
   		var _this = this;
		this.$confirm('确认删除  '+info.Name+'  此联系人吗?', '提示信息', {
			showCancelButton: false,
			type: 'warning'
		}).then(() => {
			_this.deleteContacts(info)
			
		}).catch(() => {

		});
    },
    
   //删除联系人
    deleteContacts(info) {
    	var _this = this;
      	deleteLink(info).then(res => {
      	    _this.$alert('删除联系人成功', '提示', {
	          confirmButtonText: '确定',
	          callback: action => {
	          	_this.contactList.length = 0;
          		_this.getContacts();//重新加载联系人
          	 }
        	});
      	    
      	}).catch(error => {
      		
      	})
    },
    
    //添加联系人
    showAddContact(){
    	this.dialogFormVisible = true;
    	this.title = "添加联系人";
    	this.formData = {
		    		Name: "",
		    		User: "",
		    	};
    },
    addContacts(formName) {
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
			          message: '添加联系人成功',
			          type: 'success',
			          duration: 3*1000
			       });
		          //联系人添加
		          _this.contactList.length = 0
		          _this.getContacts();//重新加载联系人
		      }).catch(error => {
		      	 _this.loading = false;
		      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    },
    
    //修改联系人
    showEditContact(index,info){
    	this.dialogFormVisible = true;
    	this.title = "修改联系人";
    	this.formData = Object.assign({}, info) ;
    	this.editIndex = index;
    },
    editContacts (formName) {
    	var _this = this;
    	this.$refs[formName].validate((valid) => {
          if (valid) {
          	 _this.loading = true;
	      	 updateLink(_this.formData).then(res => {
	      		_this.loading = false;
	      		_this.dialogFormVisible = false;
	      		_this.$message({
	        	 showClose: true,
		          message: '修改联系人成功',
		          type: 'success',
		          duration: 3*1000
		       });
		       _this.contactList.length = 0
		       _this.getContacts();//重新加载联系人
		       //_this.$set(_this.contactList, _this.editIndex, _this.formData);
	      	    
	      	}).catch(error => {
	      		 _this.loading = false;
	      	})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
    }
    
  },
};
</script>

<style scoped>
	@import '../../assets/css/accountCommon.css';
	.addCont div{
		position: relative;
	}
	.addCont div p{
		color: #FC4514;
		position: absolute;
		bottom: -19px;
		font-size: 12px;
	}
	.r_header{
		padding-left: 38px;
	}
	
	.lxr_header {
	  line-height: 40px;
	  /*border: 1px solid #d4d4d4;*/
	  background: #F3F3F3;
	  box-sizing: border-box;
	  padding-left: 38px;
	}
	.handel img{
		vertical-align: middle;
		padding: 0 5px;
	}
	.tableWrap{
		height: 465px;
	}
	
	/*响应式*/
	@media screen and (max-width: 991px){
		.tableWrap{
			height: auto;
		}
	}		
</style>

