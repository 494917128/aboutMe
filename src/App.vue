<template>
  <div id="app">
    <router-view/>
    <Modal 
      :show='modal_show' 
      :title='modal_title' 
      :text='modal_text' 
      :noCancel='modal_noCancel' 
      :cancelText='modal_cancelText' 
      :confirmText='modal_confirmText' 
      :stopCover='modal_stopCover' />
  </div>
</template>

<script>
import Event from '@/core/Event.js'
import Modal from '@/components/Modal'
export default {
	name: 'App',
	data: ()=>{
		return {
			modal_show: false,
			modal_title: '提示',
			modal_text: '',
			modal_noCancel: true,
			modal_cancelText: '取消',
			modal_confirmText: '确定',
			modal_stopCover: false,
		}
	},
	components: { 
		Modal, 
	},
	created(){
		Event.$on('modal/show',({title='提示', text, no_cancel=true, cancel_text='取消', confirm_text='确定', stop_cover=false, success, fail, complete})=>{
			this.modal_show = true
			this.modal_title = title
			this.modal_text = text
			this.modal_noCancel = no_cancel
			this.modal_cancelText = cancel_text
			this.modal_confirmText = confirm_text
			this.modal_stopCover = stop_cover

			Event.$once('modal/confirm',()=>{
				success && success()
			})
			Event.$once('modal/cancel',()=>{
				fail && fail()
			})
			Event.$once('modal/complete',()=>{
				this.modal_show = false
				complete && complete()
			})
		})
	},
}
</script>

<style>

</style>
