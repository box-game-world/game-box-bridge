

<template>
<div clas="w-100 h-100" ref="stage">
  <div class="w-100 h-100 canvas_wrapper" ref="world_wrapper">
    <canvas :width="width" :height="height"></canvas>
  </div>
  <div class="w-100 h-100 canvas_wrapper" ref="bg_wrapper">
    
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Stage extends Vue{
  
  public width:number=0;
  public height:number=0;

  mounted():void{
    const stageRef:any = this.$refs.stage;
    this.width = stageRef.clientWidth;
    this.height = stageRef.clientHeight;
    console.log( this.width, this.height );
    this.createWordCanvas()
  }

  createWordCanvas():void{
    console.dir( this.$refs.world_wrapper );
  }
}
</script>


<style>
  .canvas_wrapper{
    position:absolute;
  }
</style>

