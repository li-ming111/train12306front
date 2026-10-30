<template>
    <h3>
      <b>哈尔滨信息工程学院</b>
    </h3>
    <div>
      控台总体分成四大部分：
      <ul>
        <li>基础数据：用于维护所有的火车基础数据，包括车次、车站、车厢、座位等</li>
        <li>业务数据：用于维护每天的车次信息及余票信息，设置购票令牌，查看购票订单等</li>
        <li>会员管理：用于管理会员、乘客、已出的车票等</li>
        <li>跑批管理：用于管理系统所有的跑批信息，包括跑批的新增、删除、暂停、重启、重跑等</li>
      </ul>
    </div>
    <div>
      <img :src="pic" style="width: 100%;">
    </div>  
  </template>
  
  <script setup lang="ts">
  import {ref} from 'vue'
  const pic = ref('/hxxLogo.jpg')
  </script>
  