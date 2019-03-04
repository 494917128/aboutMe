<template>
	<div class="my-contact">
		<div class="contact-header">
			<div class="header-item" v-for="(item,index) in header_list" :key="index">{{item}}</div>
		</div>
		<div class="contact-body">
			<!-- <div class="text-item" v-for="(item,index) in text" :key="index">{{item.title + '：' + item.content}}</div> -->
			<div class="body-item" v-for="(item,index) in body_list" :key="index">{{item}}</div>
		</div>
		<div class="contact-footer">
			<a class="footer-item justify-center" :href="item.href||'javascript:;'" v-for="(item,index) in footer_list" :key="index">
				<i :class="['iconfont', item.icon]"></i>
				<span class="footer-prompt" v-if="item.text">{{item.text}}</span>
				<div class="footer-prompt" style="padding: 2px;" v-else-if="item.image">
					<img :src="image_url+item.image">
				</div>
			</a>
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
			header_list: ['灵感', '代码', '梦想', '未来'],
			body_list: [],
			footer_list: [],
			anim_index: 0,
			anim_now: 5,
			anim_list: [],
		}
	},
	watch:{
		body_list:function(){
			var _this = this 
			this.$nextTick(function(){
				_this.get_data = true
				_this.setAnim()
			})
		}
	},
	methods:{
		// 获取数据
		pageData(){
			var _this = this
			this.post({
				url: 'contact/index',
				data: {},
				success: function(res){
					_this.body_list = res.body_list
					_this.footer_list = res.footer_list
				}
			})
		},
		// 创建动画列表
		setAnim(){
			let list   = this.anim_list,
			    header = document.querySelectorAll(".my-contact .header-item"),
			    body   = document.querySelectorAll(".my-contact .body-item"),
			    footer = document.querySelectorAll(".my-contact .footer-item")

			for(let i = 0,len = header.length; i < len; i++){
				list.push({
					dom: header[i],
					class: 'anim'
				})
			}

			for(let i = 0,len = body.length; i < len; i++){
				list.push({
					dom: body[i],
					class: 'anim'
				})
			}

			for(let i = 0,len = footer.length; i < len; i++){
				list.push({
					dom: footer[i],
					class: 'anim'
				})
			}
			this.animCreate(this.navIndex, this.anim_now, this.anim_time||200)
		},
	},
	mounted () { 
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my-contact{
	width: 360px;
	max-width: 80vw;
	padding-bottom: 20vh;
}
.contact-header{
	display: flex;
	align-items: center;
	justify-content: space-between;
	.header-item{
		font-size: 1.5rem;
		line-height: 2;
		text-shadow: 0 0 10px rgba(0, 0, 0, .3);
		position: relative;
		top: -100px;
		opacity: 0;
		transition: all 1s;
		&:nth-child(1){color:#ff6633}
		&:nth-child(2){color:#84c800}
		&:nth-child(3){color:#33ccff}
		&:nth-child(4){color:#ff0000}
	}
	.anim{
		top: 0;
		opacity: 1;
	}
}
.contact-body{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1.2rem 0 2.5rem;
	.body-item{
		font-size: 1.2rem;
		line-height: 2;
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
.contact-footer{
	display: flex;
	align-items: center;
	justify-content: space-between;
	.footer-item{
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		background: #404040;
		color: #fff;
		border-radius: 50%;
		cursor: pointer;
		position: relative;
		bottom: -100px;
		opacity: 0;
		transition: bottom 1s, opacity 1s;
		&:hover{
		    background: #337ab7;
		    .footer-prompt{
		    	opacity: 1;
		    	visibility: initial;
		    }
		}
		.footer-prompt{
			min-height: 30px;
			background: #337ab7;
			position: absolute;
			bottom: 46px;
			border-radius: 5px;
			text-align: center;
			line-height: 30px;
			color: #fff;
			padding: 0 10px;
			font-size: 12px;
			opacity: 0;
			visibility: hidden;
			transition: all 0.3s;
			img{
				width: 140px;
				height: 140px;
				border-radius: 5px;
				object-fit: cover;
			}
			&:after{
				content: '';
				height: 0;
				width: 0;
				border: 8px solid transparent;
				border-top-color: #337ab7;
				position: absolute;
				left: 0;
				right: 0;
				bottom: -16px;
				margin: auto;
			}
		}
	}
	.anim{
		bottom: 0;
		opacity: 1;
	}
}



/* 媒体查询  */
@media screen and (max-width: 600px) { 
  .skill-container{
    flex-direction: column;
  }
}
</style>
