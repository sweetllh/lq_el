<template>
	<el-dialog :title='count' :visible.sync="orShow"  @close="closeMyself" width="500px">
	  <div class="linkList">
	  	<el-input size="small" placeholder="请输入姓名或账号" prefix-icon="el-icon-search" 
				v-model.trim="search" style="width: 260px; "></el-input>
	  </div>
	  <div class="tableWrap">
	  	<el-table :data="searchData" max-height="300" style="width: 100%" v-loading="tableLoading"
        			element-loading-text="拼命加载中" 
        			element-loading-spinner="el-icon-loading"
        			@selection-change="handleSelectionChange">
	  		 <el-table-column type="selection" width="60"></el-table-column>
	  		 <el-table-column type="index" width="60"></el-table-column>
	  		 <el-table-column prop="Name" label="姓名" min-width="100">
	  		 	<template slot-scope="scope">
			        <span>{{ scope.row.Name }}</span>
			     </template>
	  		 </el-table-column>
	  		 <el-table-column prop="User" label="账号" min-width="180">
	  		 	<template slot-scope="scope">
			        <span>{{ scope.row.User }}</span>
			    </template>
	  		 </el-table-column>
	  	</el-table>
	  </div>
	  <span slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="addSigner" size="mini">确 定</el-button>
	  </span>
	</el-dialog>
</template>

<script>
	import { getLink } from '@/api/user'
	export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      search: '',         //搜索内容
      contactList: [],      //联系人列表
      tableLoading: false,
      multipleSelection: [],
      orShow: this.isShow
    }
  },
  computed: {
  	count(){
		return "请选择要添加的联系人（已添加"+this.multipleSelection.length+"人）" ;
	 },
	 //搜索数据
	 searchData:function(){
		var search =this.search;
		if(search){
			return this.contactList.filter(function(pro){
				return Object.keys(pro).some(function(key){
					return String(pro[key]).toLowerCase().indexOf(search)>-1
					
				})
			})
		}
		 return this.contactList;
	}

  },
  watch: {
  	isShow(val){
  		this.orShow = val;
  		if(this.isShow){
  			//获取联系人
  			this.getContacts();
  		}
  	}
  },
  methods: {
  	/*全选*/
 	handleSelectionChange(val) {
        this.multipleSelection = val;
   },
  	//关闭弹窗
    closeMyself () {
      this.$emit('on-close')
    },
    //添加到签署人
    addSigner(){
    	this.$emit('add-signer',this.multipleSelection);
    },
    
    //获取联系人
    getContacts() {
      var _this = this;
      _this.tableLoading = true;
      getLink().then(res => {
      		_this.tableLoading = false;
      		_this.contactList.length = 0;
            var data = res.Data;
            for (var i = 0; i < data.length; i++) {
              _this.contactList = _this.contactList.concat(data[i].content);
            }
            _this.pageshow = true;
      }).catch( error => {
      		_this.tableLoading = false;
      })
      
    },
    
  }
}
</script>

<style>
	.el-dialog__title{
		font-size: 16px;
	}
	.el-dialog__body{
		padding: 10px 20px;
	}
	.el-table th, .el-table td{
		padding: 10px 0;
	}
</style>