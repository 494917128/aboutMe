<template>
  <div class="my-intro">
    <div class="text justify-center">
      <img :src="photo||require('@/images/image_none.png')" class="photo">
      <div class="line"></div>
      <div class="text-item" v-for="(item,index) in text" :key="index">{{item}}</div>
    </div>

<!--     <Modal 
      :show='modal_show' 
      :title='modal_title' 
      :text='modal_text' 
      :noCancel='modal_noCancel' 
      :cancelText='modal_cancelText' 
      :confirmText='modal_confirmText' 
      :stopCover='modal_stopCover' /> -->

  </div>
</template>

<script>
import {anim,api} from '@/js/mixins'

export default {
  mixins: [anim,api],
  props: ['navIndex'],
  name: 'HelloWorld',
  data () {
    return {
      text: [],
      anim_index: 0,
      anim_now: 0,
      anim_list: [],
      photo: '',
    }
  },
  watch: {
    text: function(){
      var _this = this 
      this.$nextTick(function(){
        _this.get_data = true
        _this.setAnim()
      })
    }
  },
  methods: {
    // 获取数据
    pageData(){
      var _this = this
      this.request({
        url: 'intro/index',
        data: {},
        success: function(res){
          _this.text = res.list
          _this.photo = res.photo
          document.title = (res.username||'') + '的前端简历' // 设置标题
        }
      })
    },
    // 创建动画列表
    setAnim(){
      let list  = this.anim_list,
          photo = document.querySelector(".my-intro .photo"),
          line  = document.querySelector(".my-intro .line"),
          text  = document.querySelectorAll(".my-intro .text-item")

      list.push({
        dom: photo,
        class: 'anim-photo'
      })

      list.push({
        dom: line,
        class: 'anim-line'
      })

      for(let i = 0,len = text.length; i < len; i++){
        list.push({
          dom: text[i],
          class: 'anim'
        })
      }

      this.animCreate(this.navIndex, this.anim_now, this.anim_time||200)
    },
  },
  mounted(){
    this.pageData()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my-intro{
  width: 100%;
  height: 100%;
  .text{
    flex-direction: column;
  }
  .photo{
    width: 160px;
    height: 160px;
    margin: 30px 0;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    opacity: 0;
    top: -100px;
    transition: all 0.5s;
  }
  .line{
    margin-bottom: 20px;
    height: 1px;
    background-color: rgba(0, 0, 0, .2);
    width: 0%;
    opacity: 0;
    transition: all 1s;
  }
  .text-item{
    text-align: center;
    width: 600px;
    max-width: 100%;
    line-height: 2.4;
    margin: auto;
    font-size: 1.2rem;
    position: relative;
    opacity: 0;
    left: -100px;
    transition: all 0.5s;
  }
  .anim-photo{
    opacity: 1;
    top: 0;
  }
  .anim-line{
    opacity: 1;
    width: 50vw;
  }
  .anim{
    opacity: 1;
    left: 0;
  }
}

/* 媒体查询  */
@media screen and (max-width: 600px) { 
  .my-intro{
    .photo{
      width: 100px;
      height: 100px;
      margin: 20px 0;
    }
    .line{
      margin-bottom: 10px;
    }
  }
}
</style>
