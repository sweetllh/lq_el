<template>
	<div class="wrapper">
		<div class="list">
			<h4 class="title" @click="backOne"><img src="../../../assets/img/icon-left.png"/>购物清单</h4>
			<div class="tableWrap">
				<el-table :data="packageList" :max-height="$clientHeight-190" style="width: 100%" v-loading="tableLoading"
	    			      element-loading-text="拼命加载中"
	 					  element-loading-spinner="el-icon-loading">
	 				  <el-table-column width="30"></el-table-column>
				      <el-table-column prop="setmeal" label="套餐类型" min-width="120">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.setmeal }}</span>
						    </template>
				      </el-table-column>
				      <el-table-column prop="orderId" label="订单号" min-width="120">
				      		<template slot-scope="scope">
						        <span>{{ scope.row.orderId }}</span>
						    </template>
				      </el-table-column>
				      <el-table-column prop="amount" label="金额" min-width="120">
				      		<template slot-scope="scope">
						        <span>实付款：<i class="amount">￥{{ scope.row.amount }}</i></span>
						    </template>
				      </el-table-column>
				</el-table>
            </div>
			
			<div class="pay">
				<p class="payStyle"><img src="../../../assets/img/wxlogo.png"/>微信支付</p>
				<div class="code">
					<img src="../../../assets/img/wei.png" />
				</div>
				<p>打开手机微信，扫码即可完成支付</p>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'shoppingList',
		components:{
			
		},
		data(){
			return{
				packageList:[{
					setmeal:'A套餐',
					orderId:'646375635348',
					amount:'0.00',
				}],
      			tableLoading: false,
			}
		},
		methods:{
			backOne(){
				//this.$router.go(-1);
				this.$router.push({ path: "/accountParent/account/package/upGradePackage" });
			},
		},
	}
</script>

<style scoped>
	.list{
		max-width: 970px;
		margin: 0 auto;
		padding: 90px 40px 0;
	}
	
	.title{
		font-weight: normal;
		font-size: 18px;
		color: #303030;
		cursor: pointer;
	}
	.title img{
		margin-right: 15px;
	}
	
	.amount{
		color: #FC4514;
		font-size: 20px;
	}
	.pay{
		text-align: center;
		margin-top: 24px;
	}
	.payStyle img{
		width: 35px;
		vertical-align: middle;
		margin-right: 9px;
	}
	.code{
		width: 160px;
		height: 160px;
		border: 1px solid #9D9D9D;
		border-radius:10px;
		padding: 10px;
		margin: 19px auto 23px;
	}
	.code img{
		width: 150px;
	}
	
</style>