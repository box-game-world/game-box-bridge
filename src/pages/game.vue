
<template>
<div class="w-100 h-100">
  <world class="w-100 h-100"></world>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component' 
import World from '../components/world/world.vue'

@Component({
  components:{
    World
  }
})
export default class Game extends Vue{
  
}
</script>


<style scoped>
*{
  color:#ffffff;
}
</style>
