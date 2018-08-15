<template>
  <div class="justify-center content">
    <div class="content-title">{{title}}</div>
    <div class="col-1 justify-center content">
      <slot></slot>
    </div>  
  </div>
</template>

<script>
export default {
  props: ['title'],
  name: 'HelloWorld',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
}
</style>
