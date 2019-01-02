<template>
	<div id="addFile">
		<div class="addFile">
			<div class="fileCont">
				<div class="header">
		      		<div class="head-title" @click="backOne"><i class="left_icon"></i>创建签署任务</div>
			       <!-- <div class="chooseTemplate" @click="chooseTemplate">选择模板</div> --> 
			    </div>
			    <div class="signInfor">
			    	<div class="r_header">
				        <span class="r_header_title">填写签署信息</span>
				    </div>
				    <div class="form2">
				    	<div  class="input_group clearfix">
				    		<label class="left" for="" style="width: 68px;">签署方&nbsp;</label>
				    		<ul class="signerList left">
				    			<li v-for="(item,index) in signers" :key="index">
				    				<span class="input_wrap">
						    			<input type="" name="" :id="nameId(index)" value=""  placeholder="请输入姓名" 
						    				v-model="item.Name" @input="checkName(item.Name,index)"/>
						    			<p class="tip">{{item.NameTip}}</p>
						    		</span>
						    		<span class="input_wrap" style="margin-left: 10px;">
						    			<input type="" name="" :id="userId(index)" value="" placeholder="请输入账号" maxlength="11"
						    				v-model="item.User" @input="checkUser(item.User,index)"/>
						    			<p class="tip">{{item.UserTip}}</p>
						    		</span>
						    		<span class="clearCont" @click="deleteSigner(index)">
						    			<img src="../../assets/img/remove.png"  width="20" height="20" />
						    		</span>
				    			</li>
				    		</ul>
				    	</div>
				    	
				    	<div class="clearfix addPerson">
				    		<div class="left" @click="addMoreSigner">添加签署人</div>
				    		<div class="left" @click="isShowDialog=true">从联系人添加</div>
				    		<div class="saveTo checkbox hidden-sm-and-down" @click="saveContact">
				    			<i :class="{'active':saveFlag}"></i><span>保存到联系人</span>
				    		</div>
				    	</div>
				    	<div class="sign_order">
				    		<label for="order">签署顺序&nbsp;</label>
				    		<el-select v-model="order" placeholder="请选择" size="small" style="width: 270px;">
							    <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
							      <span style="float: left">{{ item.label }}</span>
							      <span style="float: left; color: #8492a6; font-size: 13px">{{ item.tip }}</span>
							    </el-option>
							  </el-select>
				    	</div>
				    </div>
			    </div>
			    
			    <div class="file_setting">
			    	<div class="r_header">
				        <span class="r_header_title">文件设置</span>
				    </div>
				    <div class="form3">
				    	<div>
				    		<label for="expirationDate">截止日期</label>
				    		<div class="time-box">
				    			<el-date-picker v-model="expirationDate" type="date" :editable='false'
				    				size="small" placeholder="选择截止日期"></el-date-picker>
			                </div>
				    	</div>
				    </div>
			    </div>
			   
			    
			</div>
			<div class="line"></div>
			<div class="btn_group">
				<div class="next_btn">
					<router-link tag='span' :to="backRouter">上一步</router-link>
				</div><div class="next_btn" @click="creatSign">下一步
				</div><div class="draft" @click="saveDraft">存草稿</div>
			</div>
		    
      	</div> 
      	
      	<link-man :isShow="isShowDialog" @on-close="isShowDialog=false" @add-signer="addSigner"></link-man>
      	
  		
	</div>
</template>

<script>
import linkMan from './components/linkMan.vue'
import { createContract,toDraft } from '@/api/file'
import { createLink } from '@/api/user'
import { distinct } from '@/utils/formatData'

export default{
	components: {
		linkMan: linkMan,
	},
	data(){
		return {
			backRouter: `/filesParent/AddFileOne/${this.$route.params.id}`,
			expirationDate : "",//截止日期
			isShowDialog:  false,
			signers: [
				{
					Name: "",     //签署方姓名
					User: "", //签署方账
					NameTip: "",
					UserTip: "",
				}
			],
			saveFlag: false,
			order: "0", //签署顺序
			orderOptions:[
				{
					value: '0',
          			label: '顺序签署',
          			tip: '(按照文件发送的顺序依次签署，即A-B-C-D)'
          			
				},
				{
					value: '1',
          			label: '无序签署',
          			tip: '(签署没有顺序限制)'
          			
				},
				{
					value: '2',
          			label: '单独签署',
          			tip: '(由发起方与各个签署方单独签署，即A-B,A-C,A-D)'
          			
				}
			],
			loading: null,
		}
	},
	computed:{
		Members(){
			var strings = "";
			for(let i=0 ;i<this.signers.length;i++){
				strings+=('+'+(i+1)+','+this.signers[i].User+','+this.signers[i].Name)
			}
			return strings.substring(1);
		}
	},
	created(){
		//设置截止日期为当前日期
		var nowDate = new Date();
		this.expirationDate = nowDate.getFullYear()+"-"+this.formatNum(nowDate.getMonth()+1)+"-"+this.formatNum(nowDate.getDate());
		//console.log(this.$route.params.id)
	},
	methods: {
		backOne(){
			this.$router.go(-1);
		},
	  	//月份和date补0
	    formatNum(s) {
	        return s < 10 ? '0' + s: s;
	    },
	    
		//创建签署合同
		creatSign(){
			var phoneReg = /(^1[3-578]\d{9}$)/;
			//user = user.replace(/\s/, "");
			for(let i in this.signers){
				if(!this.signers[i].Name){
					this.signers[i].NameTip = "请输入联系人姓名";
					let	nameId = 'name' + [i];
					document.getElementById(nameId).focus();
					return;
				}else{
					this.signers[i].NameTip = "";
				}
				if(!this.signers[i].User){
					this.signers[i].UserTip = "请输入联系人手机号";
					let	userId = 'user' + [i];
					document.getElementById(userId).focus();
					return;
				}else if(!phoneReg.test(this.signers[i].User)){
					this.signers[i].UserTip = "输入的手机号格式不正确";
					let	userId = 'user' + [i];
					document.getElementById(userId).focus();
					return;
				}else{
					this.signers[i].UserTip = "";
				}
			}
			var _this = this;
			//console.log(_this.Members)
			let contractId  = '';
			const params = {
				"ContractID": _this.$route.params.id,
		        "OrderType":  _this.order,
		        "EndDate": _this.expirationDate,
		        "Members": _this.Members
			}
			this.startLoading();
			createContract(params).then(res => {
				_this.closeLoading()
				if(res.Data.TaskID==null){
            		//进入待他人签署
            		_this.$router.push({ path: "/filesParent/files/3"});
            	}else{
	          	    let contractId = res.Data.ID;
        			_this.$router.push({ name: "signedFile" ,params:{id:contractId} });
            	}
			}).catch( error =>{
				_this.closeLoading()
			})
			
		},
		//存草稿
		saveDraft(){
			var _this = this;
			const params = {
				ID: _this.$route.params.id,
			    Type:  _this.order
			};
			this.startLoading();
			toDraft(params).then( res => {
				_this.closeLoading()
				_this.$router.push({ path: "/filesParent/files/7"});
			}).catch(err => {
				_this.closeLoading()
			})
			
		},
		//选择模板
		chooseTemplate(){
			this.$router.push({path: "/filesParent/saleContract/1"})
		},
	    
	    //联系人添加到签署人
	    addSigner(data){
	    	//手填的，如果未填写完整，覆盖。
	    	for(let i=0;i<this.signers.length;i++){
	    		if(!this.signers[i].Name || !this.signers[i].User){
	    			this.signers.splice(i,1);
	    		}
	    	}
	    	//选择的联系人填充进去。去重
	    	this.signers = this.signers.concat(data);
	    	this.signers = distinct(this.signers);
	    	this.isShowDialog = false;
	    },
	    
	    //添加签署人
	    addMoreSigner(){
	    	this.signers.push(
	    		{
	    			Name: "",
	    			User: ""
	    		}
	    	)
	    },
	    
	    //删除组签署信息
	    deleteSigner(index){
	    	this.signers.splice(index,1);
	    },
	    
	    //保存到联系人
		saveContact(){
			this.saveFlag = ! this.saveFlag;
			if(this.saveFlag){
				this.addContacts();
			}
		},
	    
		nameId(id){
			return "name"+id;
		},
		userId(id){
			return "user"+id;
		},
		checkName(name,index){
			let nameId = 'name'+index;
			if(!name){
				this.signers[index].NameTip = "请输入联系人姓名";
				document.getElementById(nameId).style.borderColor = "#FC4514";
	    	}else{
	    		this.signers[index].NameTip = "";
	    		document.getElementById(nameId).style.borderColor = "#BCBCBC";
	    	}
		},
		checkUser(user,index){
			var phoneReg = /(^1[3-578]\d{9}$)/;
			let userId = 'user'+index;
		    /*var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;*/
		    if (!user) {
		    	document.getElementById(userId).style.borderColor = "#FC4514";
		    	this.signers[index].UserTip = "请输入联系人手机号";
		    	
		    }else if(!phoneReg.test(user)){
		    	document.getElementById(userId).style.borderColor = "#FC4514";
		    	this.signers[index].UserTip = "输入的手机号格式不正确";
		    }else{
		    	document.getElementById(userId).style.borderColor = "#BCBCBC";
		    	this.signers[index].UserTip = "";
		    }
		},
		
		//添加联系人
	    addContacts() {
	      var _this = this;
	      const params = {
	      	Name: _this.signers[0].Name,
	        User: _this.signers[0].User
	      }
	      this.startLoading();
	      createLink(params).then(res => {
	      	_this.closeLoading()
	      	_this.saveFlag = false;
	      	_this.$message({
	          showClose: true,
	          message: '添加成功',
	          type: 'success'
	        });
	      }).catch(res => {
	      	_this.closeLoading()
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
}
</script>

<style scoped>
.addCont{
	color: #303030;
	font-family: MicrosoftYaHei;
}
.fileCont{
	max-width: 970px;
	margin: 0 auto;
	padding: 85px 40px 35px;
}
.header{
	width: 100%;
	margin-bottom: 17px;
	display: flex;
	justify-content: space-between;
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
	cursor: pointer;
}

.chooseTemplate{
	width: 100px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #FC4514;
	font-size: 14px;
	text-align: center;
	cursor: pointer;
}

.r_header {
  width: 100%;
  line-height: 40px;
  background: #f3f3f3;
  color: #FC4514;
  font-size: 14px;
  padding-left: 15px;
  box-sizing: border-box;
  font-family: MicrosoftYaHei;
}

.basicInfor .contract{
	width: 100%;
	/*width: 1000px;*/
	height: 100px;
	border: 1px solid #E5E5E5;
	margin: 40px auto;
	position: relative;
}
.file_icon{
	margin: 17px 25px;
	width: 50px;
	height: 68px;
	overflow: hidden;
}

.contract .detail {
	position: absolute;
	top: 40%;
	left: 95px;
}
.contract .name{
	color: #303030;
	font-size: 12px;
}
.contract .size{
	font-size: 12px;
	color: #bbb;
}
.basicInfor .reload{
	width: 100px;
	height: 30px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -50px;
	margin-top: -15px;
	line-height: 30px;
	text-align: center;
	border: 1px solid #FC4514;
	color: #FC4514;
	font-size: 14px;
	cursor: pointer;
}

.form2,.form3{
	max-width: 725px;
	/*width: 725px;*/
	margin: 35px auto 35px;
	font-size: 14px;
}

.form2 label{
	display: inline-block;
	width: 65px;
	margin-top: 12px;
}


.form2 .input_group .input_wrap{
	margin-bottom: 12px;
	display: inline-block;
	height: 34px;
	background: #ddd;
	/*overflow: hidden;*/
	position: relative;
}
.form2 .input_group .input_wrap .tip{
	position: absolute;
	left: 34px;
	top: 34px;
	color: #FC4514;
	font-size: 12px;
}
.form2 .input_group input{
	width: 238px;
	height: 34px;
	line-height: 14px;
	padding: 10px;
	box-sizing: border-box;
	margin-left: 34px;
	border: 1px solid #ccc;
	/*border-left: none !important;*/
}
.form2 .input_group input:target{
	border-left: none !important;
}

.form2 .input_group i{
	width: 40px;
	height: 38px;
	background: #ddd;
	display: inline-block;
	vertical-align: middle;
	position: relative;
	top: -0.5px;
	left: 3px;
}

.addPerson{
	padding: 0 0 15px 69px;
	position: relative;
}

.addPerson .left{
	width: 150px;
	height: 34px;
	line-height: 32px;
	border: 1px solid #FC4514;
	text-align: center;
	color: #FC4514;
	cursor: pointer;
	/*padding: 8px 0;*/
	box-sizing: border-box;
	margin-bottom: 5px;
}

.addPerson .left:first-child{
	margin-right: 15px;
}

.addPerson .left:before{
	display: inline-block;
	content: '';
	width: 19px;
	height: 19px;
	margin-right: 10px;
	/*border: 1px dashed #303030;*/
	background: url("../../assets/img/icon-addp.png") no-repeat center;
	position: relative;
	top: 4px;
	/*vertical-align: middle;*/
}

.sign_order select{
	width: 560px;
	height: 34px;
	padding-left: 15px;
}
.form3{
	margin: 35px auto 30px;
}

.time-box {
  position: relative;
  top: -12px;
  margin-left: 10px;
  display: inline-block;
}

.form3 label{
	position: relative;
	top: -12px;
}

.line{
	width: 100%;
	height: 1px;
	border-bottom: 1px solid #D4D4D4;
}
.left{
	float: left;
}

.btn_group{
	max-width: 970px;
	padding: 0 40px;
	margin: 30px auto 10px;
	font-size: 14px;
}
.btn_group .next_btn,.btn_group .draft{
	width: 90px;
	height: 30px;
	line-height: 30px;
	border-radius: 4px;
	display: inline-block;
	text-align: center;
	cursor:pointer;
	margin-bottom: 5px;
}
.btn_group .next_btn{
	color: #fff;
	background: #FC4514;
	margin-right: 15px;
}
.btn_group .draft{
	color: #1B1B1B;
	background: #D8D8D8;
}
.signerList li{
	margin-bottom: 10px;
	display: flex;
}
.clearCont{
	cursor: pointer;
	margin: 8px 0 0 10px;
	margin-left: 10px;
}
.checkbox{
	position: absolute;
	right: -60px;
	top: 7px;
}
.checkbox i {
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 1px solid #d4d4d4;
  vertical-align: middle;
  margin: 0 5px;
}
.checkbox span{
	position: relative;
	top: 1px;
}
.checkbox i.active {
  border: 0;
  background: url("../../assets/img/icon-sel.png") no-repeat;
  background-size: 100% 100%;
}

@media only screen and (max-width: 767px){
	.form2 label{
		width: 100%;
		margin-bottom: 5px;
	}
	
	.form2 select{
		width: 100%;
	}
	.addPerson{
		padding: 0;
	}
	.form2{
		margin-top: 10px;
	}
	.signerList input{
		max-width: 160px;
	} 
}
@media only screen and (max-width: 530px){
	.form2 .input_group input{
		width: 115px;
		margin-left: 0;
	}
	.form2 .input_group .input_wrap .tip{
		left: 0;
	}
	.form2 .input_group .input_wrap:last-child{
		margin-left: 0!important;
	} 
	.addPerson .left{
		width: 115px;
	}
	.addPerson .left:first-child{
		margin-right: 10px;
	}
	.addPerson .left:before{
		margin-right: 5px;
	}
}
</style>