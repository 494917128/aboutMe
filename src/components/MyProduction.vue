<template>
	<div class="my-production">
		<div class="swiper-container swiper-production">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in production_list" :key="index">
					<div class="banner">
						<div class="justify-center banner-left">
							<i :class="['iconfont',item.icon]" :style="{'color': item.color}"></i>
						</div>
	                    <div class="banner-line0"></div>
						<div class="justify-center banner-right">
							<div class="banner-title">
			                    <h4 class="banner-name banner-item">{{item.company}}</h4>
			                    <p class="banner-post banner-item">{{item.post}}</p>
			                    <p class="banner-time banner-item">{{item.start_time}}~{{item.end_time||'至今'}}</p>
			                    <p class="banner-explain banner-item">"{{item.explain}}"</p>
							</div>
		                    <div class="banner-line"></div>
							<div  class="banner-content">
		                        <p class="banner-text" v-for="(item,idx) in item.text" :key="idx">{{item}}</p>
							</div>
		                </div>
					</div>
				</div>
			</div>
		</div>
		<div class="production-pagination justify-center"></div>
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
			production_list: [],
			anim_index: 0,
			anim_now: 3,
			anim_list: [],
		}
	},
	watch: {
		production_list: function(){
			var _this = this 
			this.$nextTick(function(){
				_this.get_data = true
				_this.setSwiper()
				_this.setAnim()
			})
		}
	},
	methods:{
		// 获取数据
		pageData(){
			var _this = this
			this.request({
				url: 'production/index',
				data: {},
				success: function(res){
					_this.production_list = res.production_list
				}
			})
		},
		setSwiper(){
			new this.$Swiper('.swiper-production', {
				speed: 600,
				slideActiveClass: 'active',
				pagination: {
					el:'.production-pagination',
					clickable :true,
					bulletClass : 'production-bullet',
					bulletActiveClass: 'production-bullet-active',
				},

				//窗口缩放时设置width
				on: {
					resize: function(){
						this.params.width = window.innerWidth;
						this.update();
					},
				},
			})
		},
		// 创建动画列表
		setAnim(){
			let list       = this.anim_list,
			    swiper     = document.querySelector(".my-production .swiper-production"),
			    pagination = document.querySelector(".my-production .production-pagination")

			list.push({
				dom: swiper,
				class: 'anim'
			})

			list.push({
				dom: pagination,
				class: 'anim'
			})
			this.animCreate(this.navIndex, this.anim_now, this.anim_time||200)
		},
	},
	mounted () { 
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.production-bullet{
	display: inline-block;
    width: 6px;
    height: 6px;
    opacity: 1;
    border-radius: 10px;
    background: white;
    margin: 0 3px;
    cursor: pointer;
    background: #ffffff;
    transition: all 0.3s ease-in-out;
    z-index: 9;
}
.production-bullet-active{
    background: #fdd000;
    width: 12px;
}
</style>
<style lang="less" scoped>
.my-production{
	height: 100%;
}
.swiper-production{
	width: 100vw;
	position: relative;
	left: -100px;
	opacity: 0;
	transition: all 1s;
	.banner{
		display: flex;
		max-width: 800px;
		width: 90%;
		height: 350px;
		max-height: calc(100vh - 180px);
		background: #F2F4F5;
		margin: 20px auto;
		border: 1px solid #eee;
		border-radius: 10px;
		color: #000;
		overflow: hidden;
		box-shadow: 0 0 25px rgba(0,0,0,.5);
	}
	.banner-left{
	  	width: 23%;
	  	position: relative;
		left: -100px;
		opacity: 0;
		transition: all 1s 1s;
	  	.iconfont{
	  		font-size: 90px;
	  	}
	}
	.banner-line0{
		margin: calc(7.3rem + 30px) 15px 15px;
		width: 1px;
		background-color: rgba(0, 0, 0, .2);
		height: 0%;
		transition: all 1s 1s;
	}
	.banner-right{
	    flex-direction: column;
	    align-items: flex-start;
	    justify-content: flex-start;
	    padding: 0 25px;
	  	flex: 1;
	}
	.banner-title{
		padding: 15px 0;
		position: relative;
		top: -100px;
		opacity: 0;
		transition: all 1s .3s;
		.banner-name{
			font-size: 1.2rem;
			line-height: 1.6rem;
		}
		.banner-post{
			font-size: 1.5rem;
			line-height: 2;
		}
		.banner-time{
			font-size: 1.1rem;
			line-height: 1.5rem;
		}
		.banner-explain{
			padding-top: .3rem;
			font-size: .9rem;
			line-height: 1.2rem;
		}
	}
	.banner-content{
		padding: 10px 0;
		position: relative;
		top: 100px;
		opacity: 0;
		transition: all 1s .3s;
		.banner-text{
			font-size: .9rem;
			line-height: 2;
		}
	}
	.banner-line{
		align-self: flex-end;
		height: 1px;
		background-color: rgba(0, 0, 0, .2);
		width: 0%;
		transition: all 1s;
	}
}

.anim .active{
	.banner-line0{
		margin-top: 15px;
		height: calc(100% - 30px);
	}
	.banner-left{
		left: 0;
		opacity: 1;
	}
	.banner-title{
		top: 0;
		opacity: 1;
	}
	.banner-line{
		width: 100%;
	}
	.banner-content{
		top: 0;
		opacity: 1;
	}
}

.production-pagination{
	position: relative;
	left: -100px;
	opacity: 0;
	transition: all 1s;
}

.anim{
	left: 0;
	opacity: 1;
}

/* 媒体查询  */
@media screen and (max-width: 600px) { 
	.swiper-production{
		.banner{
			height: 450px;
		}
		.banner-left{
			display: none;
		}
		.banner-line0{
			display: none;
		}
		.banner-right{
			width: 100%;
		}
	}
}
</style>
