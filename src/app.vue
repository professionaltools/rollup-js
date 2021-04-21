<template>
  <div id="app">
    <roll :value="12" class="roll"/>
  </div>
</template>

<script>
  import Roll from '../components'
  export default {
    name: "app",
    components:{
      Roll
    }
  }
</script>

<style lang="scss">
  .roll{
    width: 40px;
    height: 40px;
    background: green;
  }
</style>
