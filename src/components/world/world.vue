

<template>
<div clas="w-100 h-100" ref="stage">
  <div class="w-100 canvas_wrapper world_canvas" ref="game_world_wrapper"></div>
  <div class="w-100 canvas_wrapper ui_canvas" ref="game_ui_wrapper"></div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import * as PIXI from 'pixi.js' 
import GameWorld from '@/game-core/game-world.ts'
import GameUI from '@/game-core/components/ui/game-ui';
import gameStore from '../../game-core/store/game-store';
import { reaction } from 'mobx';

@Component({})
export default class World extends Vue{
  
  public width:number=0;
  public height:number=0; 
  private _gameWorld:GameWorld;
  private _gameUI:GameUI;

  mounted():void{
    const stageRef:any = this.$refs.stage;
    this.width = stageRef.clientWidth;
    this.height = stageRef.clientHeight;
    this.initWorld();
  }

  initWorld():void{
    this._gameWorld = new GameWorld( {container:this.$refs.game_world_wrapper} );
    this._gameUI = new GameUI( {container:this.$refs.game_ui_wrapper} );

    const gameOverReactionDisposer:Function = reaction( ()=>gameStore.isLiving, ()=>{ 
      this.$emit( 'game_over' );
      this._gameWorld.destroy();
      this._gameUI.destroy();
      gameOverReactionDisposer();
      
    })
  }
}
</script>


<style>
  .canvas_wrapper{
    position:absolute;
  }

  .world_canvas{
    height: 90%;
    bottom: 0;
  }

  .ui_canvas{
    height: 10%;
    top: 0;
  }
</style>

