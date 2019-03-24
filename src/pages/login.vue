<template>
  <div>
    <input type='text' v-model='username' placeholder='用户名' />
    <input type='password' v-model='password' placeholder='密码' />
    <button @click='login'>登录</button>
  </div>
</template>

<script>
import {api} from '@/js/mixins'

export default {
  mixins: [api],
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  components: {

  },
  methods:{
    login(){
      var _this = this,
        username = this.username,
        password = this.password
      this.request({
        prefix_url: this.api_url2,
        url: 'v1/site/login',
        data: {
          username: username,
          password: password,
          group: 'app',
        },
        success: function(res){
          localStorage.setItem('about_me_access_token',data.access_token)
          localStorage.setItem('about_me_access_token',data.access_token)
          _this.$router.push({name: 'index'})
        }
      })
    },
  },
  mounted () { 

  },
}
</script>

<style>

</style>
