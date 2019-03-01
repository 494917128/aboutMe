const anim = {
	watch: {
		navIndex: function (val) {
			this.animCreate(val, this.anim_now, this.anim_time||200)
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
			api_url: 'http://localhost/api/web/index.php?r=',
		}
	},
	methods:{
		post({url, data={}, success, fail}){
			this.$axios.post(this.api_url+url,data).then(function (res) { 
				if (res.data.status == 1) {
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
			this.$axios.get(this.api_url+url,data).then(function (res) { 
				if (res.data.status == 1) {
					console.log(res) 
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
