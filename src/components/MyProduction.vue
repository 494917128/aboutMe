<template>
	<div class="my-production">
		<div class="swiper-container swiper-production">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,index) in production_list" :key="index">
					<div class="banner">
						<div class="justify-center banner-left">
							<i :class="['iconfont',item.icon]" :style="{color: item.icon_color}"></i>
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
export default {
	props: ['navIndex'],
	name: 'HelloWorld',
	data () {
		return {
			production_list: [
				{
					icon: 'icon-qianduan',
					icon_color: '#F03D37',
					company: '杭州赛蜜网络科技有限公司',
					post: 'web前端',
					start_time: '2017年12月',
					end_time: null,
					explain: '小程序,vue,jquery,es6,iconfont等',
					text: [
						'负责快速构建高质量的前端页面',
						'负责小程序的逻辑设计以及框架搭建',
						'维护并完善公司已有的后台系统',
						'测试并完善代码的适配性，完整性，复用性等',
						'学习并实际运用小程序，ES6，vue等多种前端技术',
					],
				}, 
				{
					icon: 'icon-xiaochengxu',
					icon_color: '#16D328',
					company: '杭州点艺信息科技有限公司',
					post: '小程序开发',
					start_time: '2017年5月',
					end_time: '2017年12月',
					explain: '小程序,jssdk,html5,css3,javascript等',
					text: [
						'负责小程序及微信页面开发',
						'根据业务需求编辑相应的逻辑代码',
						'测试程序bug并根据能力对其进行修复和完善',
						'学习更多的前端知识，提升自己的前端技术',
					],
				}, 
			],
			anim_index: 0,
			anim_list: [],
		}
	},
	watch: {
		navIndex: function (val) {
			api.animCreate(this, val, 3, 100)
		},
	},
	methods:{

	},
	mounted () { 
		new Swiper('.swiper-production', {
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

		// 创建动画列表
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
