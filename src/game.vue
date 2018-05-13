<template>
  <div id="game" class="h-100">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Game extends Vue{
}
</script>

<style>
</style>