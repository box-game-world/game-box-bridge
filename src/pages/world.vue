
<template>
<div class="w-100 h-100">
  <stage class="w-100 h-100"></stage>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component' 
import Stage from '../components/world/stage.vue'

@Component({
  components:{
    Stage
  }
})
export default class World extends Vue{
  
}
</script>


<style scoped>
*{
  color:#ffffff;
}
</style>
