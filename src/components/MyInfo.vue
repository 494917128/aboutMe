<template>
  <div class="my-info">
    <div class="info-title flexible">
      <div class="info-item-view justify-center" v-for="(item,index) in my_info" :key="index">
        <div class="info-item justify-center">
          <i :class="['iconfont',item.icon]"></i>
        </div>
        <div class="info-item-text">{{item.title}}/{{item.text}}</div>
      </div>
    </div>

    <div class="text" v-for="(item,index) in text" :key="index">{{item}}</div>
  </div>
</template>

<script>
export default {
  props: ['title','navIndex'],
  name: 'HelloWorld',
  data () {
    return {
      my_info:[
        {title:'年龄',text:'24岁',icon:'icon-nianling',anim:false},
        {title:'经验',text:'2年',icon:'icon-gongzuojingyan',anim:false},
        {title:'坐标',text:'杭州',icon:'icon-address',anim:false},
        {title:'状态',text:'在职',icon:'icon-zhuangtai',anim:false},
      ],
      text: [
        "热爱IT，热爱编程，热爱学习，处于饥饿状态",
        "对于代码要求高内聚低耦合，复用性、可读性高",
        "良好的自学能力，具备独立分析解决问题能力",
        "高效的工作效率，对工作目标明确执行",
      ],
      anim_index: 0,
      anim_list: [],
    }
  },
  watch: {
    navIndex: function (val) {
      api.animCreate(this, val, 1, 200)
    },
  },
  methods: {

  },
  mounted(){
    // 创建动画列表
    let list = this.anim_list,
        view = document.querySelectorAll(".my-info .info-item-view"),
        text = document.querySelectorAll(".my-info .text")

    for(let i = 0,len = view.length; i < len; i++){
      list.push({
        dom: view[i],
        class: 'anim'
      })
    }

    for(let i = 0,len = text.length; i < len; i++){
      list.push({
        dom: text[i],
        class: 'anim'
      })
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my-info{
  width: 100%;
  height: 100%;
}
.info-title{
  flex-wrap: wrap;
  max-width: 800px;
  justify-content: space-around;
  margin: 0 auto 5vh;
}
.info-item-view{
  width: 25%;
  flex-direction: column;
}
.info-item{
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 10px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: rgba(0,0,0,.1);
  position: relative;
  transition: all 0.5s;
  opacity: 0;
  left: -100px;
}
.info-item:after{
  content: '';
  position: absolute;
  box-shadow: 0 0 0 2px rgba(255,255,255,.1);
  opacity: 0;
  -webkit-transform: scale(.9);
  transform: scale(.9);
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.info-item:hover{
  transform: scale(0.93);
  background-color: rgba(0,0,0,.05);
}
.info-item:hover:after{
  animation: effect 1.3s ease-out 75ms;
}
.info-item .iconfont{
  font-size: 40px;
}
.info-item-text{
  text-align: center;
  margin: 20px;
  /*color: #FFF;*/
  font-size: 18px;
  position: relative;
  transition: all 0.5s 0.2s;
  opacity: 0;
  left: -100px;
}
.anim .info-item{
  opacity: 1;
  left: 0;
}
.anim .info-item-text{
  opacity: 1;
  left: 0;
}

.text{
  text-align: center;
  width: 600px;
  max-width: 100%;
  line-height: 2.4;
  margin: auto;
  font-size: 1.1rem;
  position: relative;
  transition: all 0.5s;
  opacity: 0;
  left: -100px;
}
.anim.text{
  opacity: 1;
  left: 0;
}


@keyframes effect{
  0%{opacity:.3}
  40%{
    opacity:.5;
    box-shadow:0 0 0 2px rgba(255,255,255,.1),0 0 10px 10px #ccc,0 0 0 10px rgba(255,255,255,.5);
  }
  100%{
    box-shadow:0 0 0 2px rgba(255,255,255,.1),0 0 10px 10px #ccc,0 0 0 10px rgba(255,255,255,.5);
    transform:scale(1.5);
    opacity:0;
  }
}
/* 媒体查询  */
@media screen and (max-width: 600px) { 
  .info-item-view{
    width: 50%;
  }
  .info-item{
    width: 50px;
    height: 50px;
  }
  .info-item .iconfont{
    font-size: 25px;
  }
  .info-item-text{
    font-size: 12px;
  }
}
</style>
