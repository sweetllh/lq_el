<template>
        <!-- 签章列表 -->
        <div id="seaMessage">
          <div class="header">
	    	  <div class="head-title">我的签章 </div>
	      </div>
          <div class="r_header">
          	<i class="left_icon"></i>
            <span class="r_header_title" @click="signList">印章管理</span>
            <div class="r_h_btn" @click="addSignature()">添加新签章</div>
          </div>
          <div class="r_content">
          	    <!--<keep-alive>-->
          		   <router-view></router-view>
          	  <!-- </keep-alive>-->
          </div>
        </div>

</template>


<script>

export default {
  data() {
    return {
    	
    };
  },
  methods: {
    //添加新的签章
    addSignature(){
    	this.$router.push({path: "/accountParent/account/signatureMGT/addSignature"});
    },
    signList(){
    	this.$router.push({path: "/accountParent/account/signatureMGT/signatureList"});
    }
  },
  
};
</script>

<style scoped>
	@import '../../assets/css/accountCommon.css';
	.r_header{
		padding-left: 14px;
	}
	.r_content{
		padding-top: 20px;
	}
</style>

