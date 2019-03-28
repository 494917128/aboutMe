export const anim = {
	data () {
		return {
			get_data: false, // 判断是否加载过数据
		}
	},
	watch: {
		navIndex: function (val) {
			var _this = this,
				index = _this.anim_now

			if (val == index && !this.get_data) { 
				this.pageData()
			}
		},
	},
	methods:{
		// 执行动画条件(val为当前页数)(index为需要执行的页数)(time为执行动画延迟多久)
		animCreate: function (val, index, time) { 
			clearInterval(this.time);
			this.time = null;

			if (val < index) { 
				this.time = setInterval(() => {this.hide()}, time);
			} else {
				this.time = setInterval(() => {this.show()}, time);
				console.log()
			}
		},

		// 显示动画
		show: function () {
			let list  = this.anim_list,
				len   = list.length,
				index = this.anim_index

			if (this.anim_index >= len) { 
				if (this.time) {
					clearInterval(this.time);
					this.time = null;
				}
				return;
			}

			list[index].dom.classList.add(list[index].class);
			this.anim_index += 1;
		},

		// 隐藏动画
		hide: function () {
			let list  = this.anim_list,
				len   = list.length

			if (this.anim_index <= 0) { 
				if (this.time) {
					clearInterval(this.time);
					this.time = null;
				}
				return;
			}

			this.anim_index -= 1;
			let index = this.anim_index;
			list[index].dom.classList.remove(list[index].class);
		}
	},
}

// import Modal from '@/components/Modal'
import Event from '@/core/Event.js'
// const MyModal = require('@/components/MyModal')
export const api = {
	data () {
		return {
			// modal 的默认数据
			modal_show: false,
			modal_title: '',
			modal_text: '',
			modal_noCancel: true,
			modal_cancelText: '取消',
			modal_confirmText: '确定',
			modal_stopCover: false,

			api_url: 'api/addons/execute?addon=resume&route=',
			localhost: 'https://www.wangerdi.cn/',
		}
	},
	components: {
		// Modal, // 使用模态框
	},
	methods:{
		request({method='post', prefix_url, url, data={}, success, fail}){
			var _this = this,
				token = localStorage.getItem('about_me_access_token')||''
			this.$axios({
				method: method || 'post',
				url: (prefix_url || this.localhost+this.api_url) + url + '&access-token=' + token,
				data: data,
				dataType: "json",
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
			}).then(function (res) { 
				if (res.data.status == 1 || res.data.code == 200) {
					success && success(res.data.data, res.data.message||'')
				} else if (res.data.code == 401) { // 代表登录失败，跳转到登录页面
					_this.$modal.showModal({
						title: '提示',
						text: 'token失效，请重新登录',
						success: function(){
							_this.$router.push({name: 'login'});
						},
					})
				} else {
					_this.$modal.showModal({ text: res.data.message })
					fail && fail()
				}
			}).catch(function (error) { 
				console.log(error) 
				fail && fail()
			})
		},
	},
}

