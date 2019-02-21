// 执行动画条件(val为当前页数)(index为需要执行的页数)(time为执行动画延迟多久)
const animCreate = (_this, val, index, time) => { 
	clearInterval(_this.time);
	_this.time = null;

	if (val < index) { 
		_this.time = setInterval(() => {hide(_this)}, time);
	} else {
		_this.time = setInterval(() => {show(_this)}, time);
		console.log()
	}
}

// 显示动画
const show = (_this) => {
	let list  = _this.anim_list,
		len   = list.length,
		index = _this.anim_index

	if (index >= len) { 
		if (_this.time) {
			clearInterval(_this.time);
			_this.time = null;
		}
		return;
	}

	list[index].dom.classList.add(list[index].class);
	_this.anim_index += 1;
}

// 隐藏动画
const hide = (_this) => {
	let list  = _this.anim_list,
		len   = list.length

	if (_this.anim_index <= 0) { 
		if (_this.time) {
			clearInterval(_this.time);
			_this.time = null;
		}
		return;
	}

	_this.anim_index -= 1;
	let index = _this.anim_index;
	list[index].dom.classList.remove(list[index].class);
}



module.exports = {
	animCreate,
	show,
	hide
}
