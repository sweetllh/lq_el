<template>
  <div id="account">
    <div class="account clearfix">
      <!-- 左侧栏 -->
      <div class="left">
        <ul class="clearfix">
          <li class="active">
            <router-link to="/accountParent/account/basicInfo">
              <span>设置</span>
            </router-link>
          </li><li>
            <router-link to="/accountParent/account/signatureMGT">
              <span>印章管理</span>
            </router-link>
          </li>
           <!--<li>
            <router-link to="/accountParent/account/package">
              <span>套餐管理</span>
            </router-link>
          </li>
           <li>
            <router-link to="/accountParent/account/myWallet">
              <span>我的钱包</span>
            </router-link>
          </li>-->
          <li>
            <router-link to="/accountParent/account/contact">
              <span>联系人</span>
            </router-link>
          </li><!--<li>
            <router-link to="/accountParent/account/myTemplate">
              <span>模板管理</span>
            </router-link>
          </li>-->
        </ul>
      </div>
      <!-- 右侧 -->
      <div class="right">
      	<keep-alive>
      		<router-view></router-view>
      	</keep-alive>
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
    	
    };
  },
  watch: {
  },
  beforeCreate() {
  	
  },
  created() {
   
  },
  methods: {
    
    
  },
 
};
</script>

<style scoped>
.account {
  padding: 90px 40px 0;
  max-width: 1120px;
  margin: 0 auto;
  box-sizing: border-box;
}
.left {
  float: left;
  width: 150px;
  /*height: 200px;*/
  margin-right: 34px;
  background: #f3f3f3;
}
.left li {
  height: 40px;
  cursor: pointer;
}
.left li a {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #606060;
  padding: 0 22px 0 14px;
}
.left .router-link-exact-active, .left .router-link-active{
  background: #fff;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.14);
  color: #FC4514;
}
.right {
  /*width: 970px;*/
  width:  calc(100% - 190px);
  float: left;
}


/*响应式*/
@media screen and (max-width: 991px){
	.right {
	  float: none;
	  width: 100%;
	  padding-bottom: 50px;
	}
	
	.left {
	  float: none;
	  width: 100%;
	  height: auto;
	  margin-bottom: 20px;
	}
	.left li {
		float: left;
		width: 25%;
	  height: 40px;
	  cursor: pointer;
	}
	.left li a {
	  justify-content: flex-start;
	}
	.left li i{
		padding-left: 10px;
	}
	
}

@media only screen and (max-width: 767px){
	.left li {
		float: left;
		width: 33.3%;
	  height: 40px;
	  cursor: pointer;
	}
}
@media only screen and (max-width: 560px){
	.left li {
		float: left;
		width: 50%;
	  height: 40px;
	  cursor: pointer;
	}
}


</style>

