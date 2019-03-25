<template>
  <div>
    <input type='text' v-model='username' placeholder='用户名' />
    <input type='password' v-model='password' placeholder='密码' />
    <button @click='signup'>注册</button>
    <router-link to="/login">去登录</router-link>
  </div>
</template>

<script>
import {api} from '@/js/mixins'

export default {
  mixins: [api],
  name: 'Signup',
  data () {
    return {
      username: '',
      password: '',
    }
  },
  components: {

  },
  methods:{
    signup(){
      var _this = this,
        username = this.username,
        password = this.password
      this.request({
        url: 'login/signup',
        data: {
          username: username,
          password: password,
        },
        success: function(res, message){
          alert(message)
          _this.login();
        }
      })
    },
    login(){
      var _this = this,
        username = this.username,
        password = this.password
      this.request({
        url: 'login/login',
        data: {
          username: username,
          password: password,
          group: 'app',
        },
        success: function(res){
          localStorage.setItem('about_me_access_token',res.access_token)
          localStorage.setItem('about_me_refresh_token',res.refresh_token)
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
