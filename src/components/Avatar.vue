<template>
  <div class="card vue-avatar-cropper-demo text-center">
    <div class="card-body">
      <img :src="avatar" class="card-img avatar" />
      <div class="card-img-overlay" id="pick-avatar">
      	修改
        <!--<button class="btn btn-primary btn-sm" id="pick-avatar">修改</button>-->
      </div>
      <div class="card-footer text-muted" v-html="message"></div>
    </div>
    
    <avatar-cropper
        @uploading="handleUploading"
        @uploaded="handleUploaded"
        @completed="handleCompleted"
        @error="handlerError"
        trigger="#pick-avatar"
        :upload-headers="headers"
        :upload-url="uploadUrl" />
  </div>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";

export default {
  components: { AvatarCropper },
  props:{
  	userInfo:{},
  	avatar: ""
  },
  data() {
    return {
      message: "",
      uploadUrl: this.$link + "api/User/UploadHeadPortrait",
      formData: "",
    };
  },
  computed:{
  	headers(){
  		let obj = {};
  		obj["access-token"] = this.userInfo.Token;
  		return obj;
  	}
  	
  },
  methods: {
    handleUploading(form, xhr) {
      this.message = "加载中...";
    },
    handleUploaded(res) {
    	//console.log(res,0)
    	if(res.Code == "0"){
    		this.$emit('getMessage',res.Data.Image);
    		
    	}else if(res.Code == "400"){
	    	this.$router.push({ path: "/login" });
	    }
      
    },
    handleCompleted(response, form, xhr) {
      this.message = "";
    },
    handlerError(message, type, xhr) {
      this.message = "Oops! Something went wrong...";
    }
  }
};
</script>

<style>
.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}
.avatar {
  width: 50px;
  border-radius: 50%;
  display: block;
}
.card-body{
	position: relative;
	width: 50px;
	height: 50px;
	cursor: pointer;
}
.card-img-overlay {
  border-radius: 50%;
  font-size: 14px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: none;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
}
.card-body:hover .card-img-overlay {
  display: block;
}

/*重置样式*/
.avatar-cropper .avatar-cropper-close{
	font-size: 40px;
}
.avatar-cropper .avatar-cropper-mark{
	top: 60px;
	background: rgba(0,0,0,0.3)
}
.avatar-cropper .avatar-cropper-container{
		border-radius: 10px;
		padding-bottom: 30px;
}
.avatar-cropper .avatar-cropper-container .avatar-cropper-image-container{
	margin: 40px 40px 0;

}
.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover{
	background: #fff;
	color: inherit;
}
.card-footer{
	line-height: 50px;
	position: absolute;
	right: -45px;
	top: 0;
	font-size: 14px;
	color: #FC4514;
}
</style>
