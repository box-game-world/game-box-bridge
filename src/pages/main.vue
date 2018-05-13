
<template>
<div class="w-100 h-100">
  <div class="card h-100 main-wrapper">
    <div class="card-header game-title">
      <h1 class="text-center pt-5 pb-5 m-0"> 
          W O R M<br>
          H O L E
        </h1>    
    </div>
    <div class="card-block h-100 text-center pt-5">
      <router-link to="/game" class="btn btn-lg btn-primary btn-go"></router-link>
    </div>
    <div class="card-footer game-footer text-center">
      <small>https://github.com/box-game-world/game-worm-hole</small>
    </div>
  </div>
</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component' 

@Component({})
export default class Main extends Vue{
 
}
</script>


<style scoped>

.main-wrapper{
  background-color: rgba(0, 0, 0, 0);
}

.game-title{  
  border: none;
  color: #ffffff;
  
}

.game-title > h1{
  font-size: 4em; 
}

.btn-go{
  width: 150px;
  height: 150px;
  font-size: 2em;
  border-radius: 150px;
  text-align: center;
  border: 10px solid #ffffff;
  background-color: rgba(0, 0, 0, 0);
}

.game-footer{
  border: none;
  color: #ffffff;
}
</style>
