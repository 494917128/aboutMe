<template>
	<div class="my-product">
		<div class="product-phone">
			<div class="swiper-container swiper-product">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in product_list" :key="index">
						<div class="product-item">
			                <h4 class="product-name">{{item.name}}</h4>
			                <p class="product-text">{{item.text}}</p>
			                <a class="product-link" :href="item.href" v-if="item.href"><i class="iconfont icon-link"></i></a>
			                <a class="product-link" @click="openModal(item.image)" v-if="item.image"><i class="iconfont icon-link"></i></a>
						</div>
					</div>
				</div>
			</div>
			<div class="product-pagination justify-center"></div>
		</div>
		<div class="product-pc">
			<div class="product-item" v-for="(item,index) in product_list" :key="index">
                <h4 class="product-name">{{item.name}}</h4>
                <p class="product-text">{{item.text}}</p>
                <a class="product-link" :href="item.href" v-if="item.href"><i class="iconfont icon-link"></i></a>
                <a class="product-link" @click="openModal(item.image)" v-if="item.image"><i class="iconfont icon-link"></i></a>
            </div>
		</div>
		<div :class="['product-modal',show_modal?'active':'']" @click="closeModal">
			<img :src="modal_image"></img>
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
			product_list: [
				{
					name: '“赛蜜助手”小程序',
					text: '微商服务类小程序，为在赛蜜公司时的项目，该项目开发的主要人群为赛蜜国际注册用户以及其好友，秉承高内聚低耦合的原则，对重复使用的代码，将其封装成组件以及公用方法，并具有良好的机型适配、版本兼容。',
					image: require('@/images/smzs.jpg'),
				}, 
				{
					name: 'LFC',
					text: '使用生活空余时间，并结合自身所新学习的知识，恰逢朋友有需求，帮其完成pc端、小程序端以及后台管理系统，用于磨炼自身的前端技能，并了解服务器和NodeJs等后台的相关知识。',
					href: 'http://www.liveforcool.com',
				},
				{
					name: '“21天改变之旅”小程序',
					text: '根据公司领导人需求，完成该小程序，该项目开发的主要人群为购买《21天改变之旅》这本书的用户以及预购用户，在自己原有的技术知识上实践，了解更多的技术知识。',
					image: require('@/images/gbzl.jpg'),
				}, 
				{
					name: '农场小游戏（手机端）',
					text: '模仿支付宝的蚂蚁庄园，实现一个养鸡的农场小游戏，在游戏方面试验自己的技术知识并扩展更多相关方面的知识，提升自身的价值。',
					href: 'https://www.wangerdi.cn/farm',
				},
			],
			anim_index: 0,
			anim_now: 4,
			anim_list: [],
			anim_type: '',
			show_modal: false,
			modal_image: '',
		}
	},
	watch: {
		navIndex: function (val) {
			if(this.show_modal) this.closeModal()
		},
	},
	methods:{
		pcAnim() { 
			// 创建动画列表
			let list = this.anim_list,
			    item = document.querySelectorAll(".product-pc .product-item")

			for(let i = 0,len = item.length; i < len; i++){
				list.push({
					dom: item[i],
					class: 'anim'
				})
			}

			this.anim_type = 'pc'
		},
		phoneAnim() { 
			// 创建动画列表
			let list       = this.anim_list,
			    swiper     = document.querySelector(".product-phone .swiper-product"),
			    pagination = document.querySelector(".product-phone .product-pagination")

			list.push({
				dom: swiper,
				class: 'anim'
			})

			list.push({
				dom: pagination,
				class: 'anim'
			})

			this.anim_type = 'phone'
		},
		judgeAnim() { 
			if (document.documentElement.clientWidth <= 600) {
				this.phoneAnim()
			} else { 
				this.pcAnim()
			}
		},
		openModal(image) { 
			this.modal_image = image
			this.show_modal = true
		},
		closeModal() { 
			this.show_modal = false
		},
	},
	mounted () { 
		new this.$Swiper('.swiper-product', {
			loop: true,	
			effect: 'cube',
			grabCursor: true,
			cubeEffect: {
				shadow: true,
				slideShadows: true,
				shadowOffset: 10,
				shadowScale: 0.9,
			},
			pagination: {
				el: '.product-pagination',
				clickable :true,
				bulletClass : 'production-bullet',
				bulletActiveClass: 'production-bullet-active',
			},
		})

		// 缩放时执行
		var _this = this
		window.onresize = function() { 
			if (((document.documentElement.clientWidth <= 600) && _this.anim_type == 'pc') || ((document.documentElement.clientWidth > 600) && _this.anim_type == 'phone')) {
				_this.judgeAnim()
				_this.animCreate(_this.navIndex, _this.anim_now, _this.anim_time||200)
			}			
		}
		this.judgeAnim()
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my-product{
	height: 100%;
	.product-modal{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, .3);
		opacity: 0;
		z-index: 10;
		visibility: hidden;
		transition: all 0.3s;
		&.active{
			opacity: 1;
			visibility: initial;
		}
		img{
			height: 300px;
			width: 300px;
			max-width: 70vw;
			max-height: 70vw;
			border-radius: 10px;
			background-color: #fff;
		}
	}
	.product-item{
   		color: #000;
	    box-shadow: 0 3px 10px rgba(0,0,0,.2);
		padding: 20px;
		box-sizing: border-box;
	}
	.product-name{
		color: #4985A0;
		margin: 5px 0 10px;
		font-size: 18px;
	}
	.product-text{
		font-size: 1rem;
		line-height: 24px;
		flex: 1;
	}
	.product-link{
		width: 200px;
		height: 30px;
		border: 1px solid #E6E6E6;
		margin-top: 10px;
		border-radius: 4px;
		cursor: pointer;
		opacity: .6;
		transition: all .3s ease;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #F2F2F2;
		&:hover{
		    opacity: 1;
			background: #E6E6E6;
		}
	}
	
}
.product-phone{
	display: none;
	width: 320px;
	max-width: 90vw;
	margin: auto;
	.swiper-product{
		width: 100%;
		position: relative;
		left: -100px;
		opacity: 0;
		transition: all 1s;
	}
	.product-item{
		width: 100%;
		height: 75vh;
		background: rgba(255,255,255,.95);
		text-align: justify;
	}
	.product-name{
		text-align: center;
	}
	.product-link{
		margin: 10px auto 0;
	}
	.anim{
		left: 0;
		opacity: 1;
	}
}


.product-pc{
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 10px;
    flex-wrap: wrap;
    text-align: justify;
    .product-item{
		border-radius: 6px;
		background: #fff;
		width: 47%;
		margin-bottom: 50px;
		display: flex;
		flex-direction: column;
    	justify-content: space-between;
		position: relative;
		left: -100px;
		opacity: 0;
		transition: all 1s;
    }
	.anim{
		left: 0;
		opacity: 1;
	}
}

.product-pagination{
	position: relative;
	left: -100px;
	opacity: 0;
	transition: all 1s;
}


/* 媒体查询  */
@media screen and (max-width: 600px) { 
	.product-phone{
		display: block;
	}
	.product-pc{
		display: none;
	}
}
</style>
