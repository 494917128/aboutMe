<template>
  <div class="swiper-container swiper-main container">
    <!-- 头部导航 -->
    <div :class="['header','align-justify',nav_active?'active':'']">
      <div class="header-title">
        {{this.nav_list[this.nav_list_index].text}}
      </div>
      <i :class="['header-navigation','justify-center','iconfont',nav_list[nav_list_index].icon]" @click="navTitle"></i>

      <div class="header-nav-cover justify-center" @click="navTitle"></div>
      <div class="header-nav">
        <div :class="['header-nav-item','flexible',index==nav_list_index?'active':'']" v-for="(item,index) in nav_list" @click="item.layout?layout():navItem(index)">
          <i :class="['justify-center','iconfont',item.icon]"></i>
          <span>{{item.text}}</span>
        </div>
      </div>

    </div>
    <!-- 内容 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide slider-1">
        <MyContent :title="nav_list[0].text">
          <MyIntro :navIndex="nav_list_index" />
        </MyContent>
      </div>
      <div class="swiper-slide slider-2 justify-center">
        <MyContent :title="nav_list[1].text">
          <MyInfo :navIndex="nav_list_index"/>
        </MyContent>
      </div>
      <div class="swiper-slide slider-3 justify-center">
        <MyContent :title="nav_list[2].text">
          <MySkill :navIndex="nav_list_index" />
        </MyContent>
      </div>
      <div class="swiper-slide slider-4 justify-center">
        <MyContent :title="nav_list[3].text">
          <MyProduction :navIndex="nav_list_index" />
        </MyContent>
      </div>
      <div class="swiper-slide slider-5 justify-center">
        <MyContent :title="nav_list[4].text">
          <MyProduct :navIndex="nav_list_index" />
        </MyContent>
      </div>
      <div class="swiper-slide slider-6 justify-center">
        <MyContent :title="nav_list[5].text">
          <MyContact :navIndex="nav_list_index" />
        </MyContent>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination"></div>

    <i class="iconfont icon-top" v-if="this.nav_list.length != this.nav_list_index + 1" @click="scrollNext"></i>
    <a class="layout" @click="layout">退出登录</a>
  </div>
</template>

<script>
import MyContent from '@/components/MyContent'
import MyInfo from '@/components/MyInfo'
import MyIntro from '@/components/MyIntro'
import MySkill from '@/components/MySkill'
import MyProduction from '@/components/MyProduction'
import MyProduct from '@/components/MyProduct'
import MyContact from '@/components/MyContact'

export default {
  name: 'HelloWorld',
  data () {
    return {
      nav_list: [
        {icon:'icon-index',text:'首页'},
        {icon:'icon-icon',text:'关于我'},
        {icon:'icon-html-copy',text:'技术栈'},
        {icon:'icon-realexperience',text:'经历'},
        {icon:'icon-zuopinji',text:'项目'},
        {icon:'icon-lianxi',text:'联系我'},
        {icon:'icon-zhuangtai',text:'退出登录',layout: true},
      ],
      nav_list_index: 0,
      nav_active: false,
    }
  },
  components: {
    MyContent,
    MyIntro,
    MyInfo,
    MySkill,
    MyProduction,
    MyProduct,
    MyContact
  },
  methods:{
    navTitle: function() { 
      this.nav_active = !this.nav_active
    },
    navItem: function(index) { 
      if (this.nav_list_index != index) {
        this.nav_list_index = index
        this.swiper.slideTo(index, 1000, false);
        this.navTitle()
      }
    },
    scrollNext: function () { 
      this.swiper.slideNext();
    },
    layout: function(){
        localStorage.removeItem('about_me_access_token')
        localStorage.removeItem('about_me_refresh_token')
        this.$router.push({name: 'login'})
    }
  },
  mounted () { 
    var _this = this
    // 新建swiper
    this.swiper = new this.$Swiper('.swiper-main',{
      direction : 'vertical',
      resistanceRatio: 0,// 边缘无法拖动
      threshold : 30,// 大于30才能拖动
      // followFinger : false,
      speed:800,
      mousewheel: true,
      pagination : {
        el:'.swiper-pagination',
        clickable: true,
        bulletClass : 'my-bullet',
        bulletActiveClass: 'my-bullet-active',
        renderBullet: function (i, className) {
          return '<span class="justify-center ' + className + '"><div class="justify-center hover-prompt">' + _this.nav_list[i].text + '</div><i class="iconfont ' + _this.nav_list[i].icon + '"></i></span>';
        },
      },
      on: {
        slideChangeTransitionStart: function(){// 切换开始时执行
          _this.nav_list_index = this.activeIndex
        },
      },
    });
    
    
  },
}
</script>

<style>
.layout{
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  color: #fff;
  font-size: 14px;
  padding: 10px;
}
</style>
