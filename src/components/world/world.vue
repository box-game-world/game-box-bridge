

<template>
<div clas="w-100 h-100" ref="stage">
  <div class="w-100 h-100 canvas_wrapper" ref="game_world_wrapper">
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as PIXI from 'pixi.js' 
import GameWorld from '@/game-core/game-world.ts'

@Component({})
export default class World extends Vue{
  
  public width:number=0;
  public height:number=0; 
  private _gameWorld:GameWorld;

  mounted():void{
    const stageRef:any = this.$refs.stage;
    this.width = stageRef.clientWidth;
    this.height = stageRef.clientHeight;
    this.initWorld();
  }

  initWorld():void{
    this._gameWorld = new GameWorld( {container:this.$refs.game_world_wrapper});
  }
}
</script>


<style>
  .canvas_wrapper{
    position:absolute;
  }
</style>

