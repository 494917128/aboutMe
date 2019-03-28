<template>
  <div class="login-container flexible-column justify-center">
    <div class="login-bg-view">
      <img :src="require('@/images/login-bg.jpg')" class="login-bg" />
    </div>
    <div class="login-form flexible-column justify-center">
      <img :src="require('@/images/logo.png')" class="login-logo" />
      <h2 class="login-form-title">{{type==1?"登录":"注册"}}</h2>
      <div class="login-form-content flexible-column">
        <div class="login-input-view flexible">
          <i class="iconfont icon-icon"></i>
          <input type='text' v-model='username' placeholder='用户名' class="login-input col-1" />
        </div>
        <div class="login-input-view flexible">
          <i class="iconfont icon-icon"></i>
          <input type='password' v-model='password' placeholder='密码' class="login-input col-1" />
        </div>
        <button class="login-btn login-btn-blue justify-center" @click='login' v-if='type==1'>登录</button>
        <button class="login-btn login-btn-blue justify-center" @click='signup' v-else>注册</button>
        <div class="login-more align-justify">
          <div></div>
          <a @click='gotoRegister' v-if='type==1'>尚未拥有账号？前往注册 > </a>
          <a @click='gotoLogin' v-else>已有账号？前往登录 > </a>
        </div>
      </div>
    </div>
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
      type: 1, // 1：登录，2：注册
    }
  },
  components: {

  },
  methods:{
    // 登录
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
    // 注册
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
          _this.$modal.showModal({
            text: message,
            success: function(){
              _this.login();
            }
          })
        }
      })
    },

    // 更换至注册
    gotoRegister(){
      this.type = 2
    },
    // 更换至登录
    gotoLogin(){
      this.type = 1
    }
  },
  mounted () { 

  },
}
</script>

<style>
.login-container{
  min-height: 100vh;
  width: 100%;
  color: #fff;
}

.login-bg-view{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.login-bg{
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  object-fit: cover;
  filter: blur(5px);
}

.login-form{
  position: relative;
  background-color: rgba(255,255,255,0.4);
  width: 90%;
  min-width: 320px;
  max-width: 450px;
  border-radius: 20px;
}
.login-logo{
  width: 80px;
  height: 80px;
  margin-top: -40px;
  border-radius: 50%;
  background-color: #049bb6;
  object-fit: cover;
}
.login-form-title{
  font-size: 2rem;
  line-height: 2.5;
  font-weight: 100;
}
.login-form-content{
  width: 80%;
}
.login-input-view{
  border-bottom: 1px solid #a0a0a0;
  height: 50px;
  margin-bottom: 20px;
  background-color: rgb(232, 240, 254);
  border-radius: 5px;
  overflow: hidden;
  padding: 0 10px;
}
.login-input-view .iconfont{
  color: #333;
  font-size: 2rem;
}
.login-input{
  background-color: transparent;
  height: 100%;
  padding-left: 15px;
}
.login-btn{
  height: 50px;
  font-size: 1.5rem;
  border-radius: 5px;
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid transparent;
  margin-bottom: 20px;
  color: #eee;
  background-color: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.3);
  background-color: #049bb6;
  border: 1px solid #049bb6;

  cursor: pointer;
  outline:none;
}
.login-btn:hover, .login-btn:active, .login-btn.hover {
    background-color: #367fa9;
}
.login-btn:active:focus {
    color: #fff;
    background-color: #204d74;
    border-color: #122b40;
}
.login-more{
  padding-bottom: 20px;
  color: #fff;
}
.login-more a{
  color: #fff;
}
</style>
