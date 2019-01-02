<template>
    <div id="Home">
      <head-top></head-top>
      <div class="wrapper">
          <!--<transition name="move" mode="out-in">-->
              <router-view></router-view>
          <!--</transition>-->
        </div>
      </div>
</template>

<script>
  import headTop from './components/Header.vue'
    export default {
      name: 'Layout',
      components:{
        headTop,
      },
      data () {
        return {
        	
        }
      },
      computed:{
        
      },
      methods:{
      	
      }
    }
</script>
<style scoped>

</style>
