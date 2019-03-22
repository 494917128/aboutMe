const anim = {
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


const api = {
	data () {
		return {
			api_url: 'http://www.wangerdi.com/api/addons/execute?addon=resume&route=',
			image_url: 'http://www.wangerdi.com/api/web/',
		}
	},
	methods:{
		/**
	     * 设置cookie
	     * @param name cookie的名称
	     * @param value cookie的值
	     * @param day cookie的过期时间
	     */
	    setCookie(name, value, expires) {
	      if(expires !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
	        expires = expires || 24 * 60 * 60 * 1000;
	        var date = new Date(+new Date()+expires);
	        document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
	      }else{
	        document.cookie = name + "=" + escape(value);
	      }
	    },
		/**
	     * 获取对应名称的cookie
	     * @param name cookie的名称
	     * @returns {null} 不存在时，返回null
	     */
	    getCookie(name) {
	      var arr;
	      var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	      if (arr = document.cookie.match(reg))
	        return unescape(arr[2]);
	      else
	        return null;
	    },
	    /**
	     * 删除cookie
	     * @param name cookie的名称
	     */
	    delCookie(name) {
	      setCookie(name, ' ', -1);
	    },
		post({url, data={}, success, fail}){
			var token = localStorage.getItem('about_me_access_token')||''
			this.$axios.post(this.api_url+url+'&access-token='+token,data).then(function (res) { 
				if (res.data.status == 1 || res.data.code == 200) {
					success && success(res.data.data)
				} else {
					alert(res.data.message)
					fail && fail()
				}
			}).catch(function (error) { 
				console.log(error) 
				fail && fail()
			})
		},
		post2({url, data={}, success, fail}){
			this.$axios.post(url,data).then(function (res) { 
				if (res.data.status == 1 || res.data.code == 200) {
					success && success(res.data.data)
				} else {
					alert(res.data.message)
					fail && fail()
				}
			}).catch(function (error) { 
				console.log(error) 
				fail && fail()
			})
		},
		get({url, data={}, success, fail}){
			var token = localStorage.getItem('about_me_access_token')||''
			this.$axios.get(this.api_url+url+'&access-token='+token,data).then(function (res) { 
				if (res.data.status == 1 || res.data.code == 200) {
					success && success(res.data.data)
				} else {
					alert(res.data.message)
					fail && fail()
				}
			}).catch(function (error) { 
				console.log(error) 
				fail && fail()
			})
		}

	}
}


module.exports = {
	anim,
	api
}
