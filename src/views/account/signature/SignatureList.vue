<template>
    <!-- 签章列表 -->
  <div class="signListWrap">
  	<!--签章列表-->
  	<div v-if="!signList.length && !listLoading" class="dataNOne">{{dataNOne}}</div>
    <el-row tag="ul" class="qz_list" v-loading="listLoading"
									 element-loading-text="拼命加载中"
					   	 			 element-loading-spinner="el-icon-loading">
      <el-col tag="li" class="clearfix" :xs="24" :sm="12" :md="8" :lg="8" :xl="8"
      	v-for="(item,index) in signList" :key="item.ID" >
      	<div class="listWrap">
      		<img :src="item.Image" alt="">
	        <span class="qz_status" :class="[{'active':item.IsDefault}]" @click="setDefault(item.ID,index)">默认</span>
	        <span class="qz_delete" @click="deleteSign(item.ID,index)">删除</span>
      	</div>
      </el-col>
    </el-row>
    
  </div>

</template>


<script>
import {getSignature,defaultSignature,deleteSignature,addSignature} from "@/api/account"
export default {
  components: {
  	
  },
  data() {
    return {
      userInfo: "",
      signList: [], //签章列表
      Url:"",		//画板
      listLoading: false,
      dataNOne: "您还没有自己的签章，赶紧添加一个吧。"
    };
  },
  computed: {
      
    },
  watch: {
  	
  },
  created() {
    this.getSign();
  },
  methods: {
     //我的签章列表
    getSign() {
      var _this = this;
      _this.listLoading = true;
      getSignature().then(res => {
      	_this.listLoading = false;
      	_this.signList = res.Data
      }).catch(error => {
      	_this.listLoading = false;
      })
      
    },
    
    //设置默认签章
    setDefault(id, index) {
      if (this.signList[index].IsDefault) {
      	this.$alert('该签章已经为用户默认签章', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          	return;
          }
        });
      	return;
      }else{
      	var _this = this;
	    defaultSignature(id).then(res => {
	    	 _this.signList.some(function( item, index, array){
	    	 	if(item.IsDefault == true){
	    	 		item.IsDefault = false;
	    	 	}
	    	 })
	    	 _this.signList[index].IsDefault = true;
	      	 //_this.getSign();//重新请求
	      	 _this.$message({
		    	showClose: true,
		        message: "设置默认签章成功",
		        type: 'success',
		        duration: 3 * 1000
		    })
	      	 
	    }).catch(error => {
	      	
	    })
      }
      
      
    },
    
    //删除签章
    deleteSign(id,index){
    	this.$confirm('你确定删除此签章吗?', '提示信息', {
    		showCancelButton: false,
			type: 'warning'
		}).then(() => {
			this.deleteSignApi(id,index);
			
		}).catch(() => {

		});
    },
    
    deleteSignApi(id,index){
    	deleteSignature(id).then(res => {
    		this.signList.splice(index,1);
			this.$message({
		    	showClose: true,
		        message: "删除成功",
		        type: 'success',
		        duration: 3 * 1000
		    })
    		  
    	}).catch(error => {
    		
    	})
      
    },
    
    //添加新的签章
    addSignature(){
    	this.$router.push({path: "/account/signatureMGT/addSignature"})
    },
  },
  
  
  
};
</script>

<style scoped>
	@import '../../../assets/css/accountCommon.css';
	.signListWrap{
		position: relative;
	}
	.dataNOne{
		width: 100%;
		line-height: 30px;
		font-size: 14px;
		text-align: center;
	}
	.qz_list {
	  width: 100%;
	}
	.qz_list li {
	  height: 140px;
	  box-sizing: border-box;
	  margin-bottom: 20px;
	  padding: 0 20px;
	}
	
	.qz_list li .listWrap{
		height: 140px;
		border: 1px solid #d4d4d4;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.qz_list li img {
	  max-height: 80px;
	  max-width: 240px;
	  width: auto;
	}
	.qz_status {
	  display: block;
	  width: 38px;
	  height: 20px;
	  border: 1px solid #b3b3b3;
	  color: #b3b3b3;
	  line-height: 20px;
	  text-align: center;
	  font-size: 14px;
	  border-radius: 2px;
	  position: absolute;
	  left: 7px;
	  bottom: 7px;
	  cursor: pointer;
	}
	.qz_status.active {
	  color: #FC4514;
	  border-color: #FC4514;
	}
	
	.qz_delete{
		width: 38px;
	 	height: 20px;
	    border: 1px solid #FC4514;
		color: #FC4514;
		line-height: 20px;
		text-align: center;
		font-size: 14px;
		border-radius: 2px;
		position: absolute;
	    right: 7px;
	    bottom: 7px;
	    cursor: pointer;
	}
</style>

