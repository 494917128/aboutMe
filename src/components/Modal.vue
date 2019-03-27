<template>
  <div :class="['modal_cover', 'justify-center', show && 'show']" @click="cancel()">
    <div class='modal_container' @click.stop>
      <div class='title justify-center'>{{title}}</div>
      <div class='content'>
        <span v-if="text">{{text}}</span>
        <slot v-else></slot>
      </div>
      <div class='button_div justify-center'>
        <div @click="cancel()" v-if="!noCancel" class='modal-button justify-center' hover-class='hover'>{{cancelText||'取消'}}</div>
        <div v-if="!noCancel" class='modal-line'></div>
        <div @click="confirm()" class='modal-button justify-center' hover-class='hover'>{{confirmText||'确定'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Event from '@/core/Event.js'
export default {
  name: 'Modal',
  props: ['show','title','text','noCancel','cancelText','confirmText','stopCover'],
  data () {
    return {

    }
  },
  methods:{
    cancel () {
      Event.$emit('modal/cancel')
      Event.$emit('modal/complete')
    },
    confirm () {
      Event.$emit('modal/confirm')
      Event.$emit('modal/complete')
    }
  },
  mounted () { 
   
  },
}
</script>

<style scoped>
  .modal_cover{
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden; }
  .show{
    visibility: visible;
    opacity: 1; }
  .modal_container{
    width: 300px;
    background-color: #E8E8E8;
    border-radius: 10px;
    overflow: hidden; }
  .title{
    height: 55px;
    font-size: 16px; }
  .content{
    padding: 0 15px 15px;
    text-align: center;
    font-size: 16px; }


  .modal-button{
    flex: 1;
    height: 45px;
    color: #0894ec;
    font-size: 16px; }
  .modal-button:hover { 
    background-color: rgba(0, 0, 0, .05); }
  .modal-line{
    height: 30px;
    width: 1px;
    background-color: #ccc; }
  .hover{
    background-color: #D4D4D4; }
</style>
