<template>
    <a-layout>
      <train-header />  
      <a-layout>
        <train-silder />
          <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
            <router-view />
          </a-layout-content>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
  import TrainHeader from '@/components/TrainHeader.vue';
  import TrainSilder from '@/components/TrainSilder.vue';
  </script>
  <style scoped>
  </style>
  