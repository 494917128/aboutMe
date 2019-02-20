<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () { 
	// 执行动画条件(val为当前页数)(index为需要执行的页数)(time为执行动画延迟多久)
	this.$on('animCreate', function ({val, index, time}) {
		clearInterval(this.time);
		this.time = null;

		if (val < index) { 
			this.time = setInterval(() => {this.$emit('hide', '')}, time);
		} else {
			this.time = setInterval(() => {this.$emit('show', '')}, time);
			console.log()
		}
	})
	this.$on('show', function () {
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
	})
	this.$on('hide', function () {
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
	})
  }
}
</script>

<style>

</style>
