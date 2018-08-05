
<template>
<div class="w-100 h-100">
  <world class="w-100 h-100" @game_over="gameOver"></world>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component' 
import World from '../components/world/world.vue'
import { reaction } from 'mobx';
import gameStore from '../game-core/store/game-store';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

@Component({
  components:{
    World
  }
})
export default class Game extends Vue{
  
  public gameOver():void{
    this.$router.push( 'result');
  }
}
</script>


<style scoped>
*{
  color:#ffffff;
}
</style>
