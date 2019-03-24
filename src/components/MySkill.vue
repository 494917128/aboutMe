<template>
  <div class="my-skill">
	<div class="justify-center skill-container">
		<div class="skill-circle">
            <ul class="outView">
            	<div class="outCircle"></div>
            	<div>
	                <li class="out" :style="{
	                	animationDelay:-(index/out_skill.length*out_duration)+'s',
	                	animationDuration: out_duration+'s',}" v-for="(item,index) in out_skill" :key="index">
		                <span class="out-item justify-center" 
		                	:style="{
		                		backgroundColor:item.color,
		                		animationDelay:-(index/out_skill.length*out_duration)+'s',
		                		animationDuration: out_duration+'s',}" v-html='item.text'></span>
	                </li>
            	</div>
            </ul>
            <ul class="innerView">
            	<div class="innerCircle"></div>
            	<div>
	                <li class="inner" :style="{
	                	animationDelay:-(index/inner_skill.length*inner_duration)+'s',
	                	animationDuration: inner_duration+'s',}" v-for="(item,index) in inner_skill" :key="index">
		                <span class="inner-item justify-center" :style="{
		                		backgroundColor:item.color,
		                		animationDelay:-(index/inner_skill.length*inner_duration)+'s',
		                		animationDuration: inner_duration+'s',}" v-html='item.text'></span>
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
import {anim,api} from '@/js/mixins'

export default {
	mixins: [anim,api],
	props: ['navIndex'],
	name: 'HelloWorld',
	data () {
		return {
			inner_duration: 6,
			out_duration: 8,
			inner_skill:[],
			out_skill:[],
			text: [],
			anim_index: 0,
			anim_now: 2,
			anim_time: 100,
			anim_list: [],
		}
	},
	watch: {
		inner_skill: function(){
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
				url: 'skill/index',
				data: {},
				success: function(res){
					_this.inner_skill = res.inner_skill
					_this.out_skill = res.out_skill
					_this.text = res.text
				}
			})
		},
		// 创建动画列表
		setAnim(){
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
			this.animCreate(this.navIndex, this.anim_now, this.anim_time||200)
		},
	},
	mounted(){
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
    top: -20px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    transform-origin: 50% 91px;
    animation: innerAnim linear infinite;
}
.inner-item{
    animation: outAnim linear infinite;
}

.out {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: -25px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    transform-origin: 50% 146px;
    animation: outAnim linear infinite;
}
.out-item{
    animation: innerAnim linear infinite;
}

@keyframes innerAnim{
	0% {
	    transform: rotate(0)
	}
	100% {
	    transform: rotate(360deg)
	}
}
@keyframes outAnim{
	0% {
	    transform: rotate(360deg)
	}
	100% {
	    transform: rotate(0)
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
