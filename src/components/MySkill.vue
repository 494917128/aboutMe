<template>
  <div class="my-skill">
	<div class="justify-center skill-container">
		<div class="skill-circle">
            <ul class="outView">
            	<div class="outCircle"></div>
            	<div>
	                <li class="out" v-for="(item,index) in out_skill" :key="index">
		                <div class="out-item justify-center" :style="{backgroundColor:item.color}">{{item.text}}</div>
	                </li>
            	</div>
            </ul>
            <ul class="innerView">
            	<div class="innerCircle"></div>
            	<div>
	                <li class="inner" v-for="(item,index) in inner_skill" :key="index">
		                <div class="inner-item justify-center" :style="{backgroundColor:item.color}">{{item.text}}</div>
	                </li>
            	</div>
            </ul>
        </div>
        <div class="text-view">
		    <div class="text" v-for="(item,index) in text" :key="index">{{item}}</div>
        </div>
    </div>


  </div>
</template>

<script>
export default {
	props: ['navIndex'],
	name: 'HelloWorld',
	data () {
		return {
			inner_skill:[
				{text:'react',color:'rgba(179,164,140,0.8)'},
				{text:'ES6',color:'rgba(171,209,220,0.8)'},
				{text:'vue',color:'rgba(238,215,163,0.8)'},
				{text:'less',color:'rgba(207,184,178,0.8)'},
			],
			out_skill:[
				{text:'微信小\n程序',color:'rgba(121,100,102,0.8)'},
				{text:'hbuilder\nh5+',color:'rgba(49,65,82,0.8)'},
				{text:'jQuery',color:'rgba(76,157,160,0.8)'},
				{text:'webpack',color:'rgba(66,66,66,0.8)'},
				{text:'微信小\n游戏',color:'rgba(193,131,106,0.8)'},
				{text:'RN',color:'rgba(117,148,179,0.8)'},
				{text:'PHP\nMySQL',color:'rgba(71,83,94,0.8)'},
				{text:'GitHub',color:'rgba(147,147,189,0.8)'},
			],
			text: [
				'精通小程序开发及框架搭建配置',
				'扎实的HTML5+CSS3基础',
				'了解APP/PC端/手机端的各类开发',
				'良好的逻辑思维，快速思考解决方法',
			],
			anim_index: 0,
			anim_list: [],
		}
	},
	watch: {
		navIndex: function (val) {
			api.animCreate(this, val, 2, 100)
		},
	},
	methods:{

	},
	mounted () { 
		// 创建动画列表
		let list        = this.anim_list,
		    out         = document.querySelectorAll(".my-skill .out-item"),
		    inner       = document.querySelectorAll(".my-skill .inner-item"),
	        text        = document.querySelectorAll(".my-skill .text"),
		    innerCircle = document.querySelector(".my-skill .innerCircle"),
		    outCircle   = document.querySelector(".my-skill .outCircle")

		list.push({
			dom: innerCircle,
			class: 'anim'
		})

		for(let i = 0,len = inner.length; i < len; i++){
			list.push({
				dom: inner[i],
				class: 'anim'
			})
		}

		list.push({
			dom: outCircle,
			class: 'anim'
		})

		for(let i = 0,len = out.length; i < len; i++){
			list.push({
				dom: out[i],
				class: 'anim'
			})
		}

		for(let i = 0,len = text.length; i < len; i++){
			list.push({
				dom: text[i],
				class: 'anim'
			})
		}

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my-skill{
	height: 100%;
	width: 100%;
	.skill-container{
		flex-wrap: wrap;
		max-width: 800px;
	    margin: 0 auto;
	}
}


.skill-circle {
	box-sizing: border-box;
    padding: 5px;
    position: relative;
    font-size: 12px;
    width: 300px;
    color: #FFF;
    margin-bottom: 30px;
}
.outView {
	box-sizing: border-box;
    width: 242px;
    height: 242px;
    position: relative;
    margin: 0 auto;
}
.innerView {
	box-sizing: border-box;
    width: 142px;
    height: 142px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
.innerCircle,.outCircle {
	width: 100%;
	height: 100%;
    border: 4px dashed #999;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: -100px;
    opacity: 0;
    transition: all 1s;
}
.out-item,.inner-item{
    border-radius: 50%;
    position: relative;
    width: 100%;
    height: 100%;
    left: -100px;
    opacity: 0;
    transition: all 1s;
    font-size: 12px;
}
.inner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    text-align: center;
    .-inner(4);
}
.-inner(@n) when (@n > 0) {
  &:nth-child(@{n}) {
    animation: innerX 4s cubic-bezier(.36,0,.64,1) (@n * -2s) infinite alternate,innerY 4s cubic-bezier(.36,0,.64,1) ((@n - 1) * -2s) infinite alternate;
  }
  .-inner((@n - 1));
}
@keyframes innerX{
	0% {
	    left: -22px;
	}
	100% {
	    left: 122px;
	}
}
@keyframes innerY{
	0% {
	    top: 122px;
	}
	100% {
	    top: -22px;
	}
}

.out {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    text-align: center;
    .-out(8)
}
.-out(@n) when (@n > 0) {
  &:nth-child(@{n}) {
    animation: outX 8s cubic-bezier(.36,0,.64,1) ((@n + 1) * -2s) infinite alternate,outY 8s cubic-bezier(.36,0,.64,1) ((@n - 1) * -2s) infinite alternate;
  }
  .-out((@n - 1));
}
@keyframes outX{
	0% {
	    left: -27px;
	}
	100% {
	    left: 217px;
	}
}
@keyframes outY{
	0% {
	    top: -27px;
	}
	100% {
	    top: 217px;
	}
}

.text-view{
  flex: 1;
}
.text{
  text-align: center;
  line-height: 2.4;
  margin: auto;
  font-size: 1.1rem;
  position: relative;
  transition: all 0.5s;
  opacity: 0;
  left: -100px;
}

.anim{
  opacity: 1;
  left: 0;
}

/* 媒体查询  */
@media screen and (max-width: 600px) { 
  .skill-container{
    flex-direction: column;
  }
}
</style>
