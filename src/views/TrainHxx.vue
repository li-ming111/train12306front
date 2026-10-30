<template>
    <h3>
      <b>哈尔滨信息工程学院</b>
    </h3>
    <div>
      <img :src="pic" style="width: 100%;">
    </div>  
  </template>
  
  <script setup lang="ts">
  import {ref} from 'vue'
  const pic = ref('/hxxLogo.jpg')
  </script>
  