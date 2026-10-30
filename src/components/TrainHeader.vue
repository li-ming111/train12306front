<template>
  <a-layout-header class="header">
    <div class="logo">
      <RouterLink to="/main/hxx">
         <img :src="hxx" style="width: 20px;height: 20px">12306火车售票
      </RouterLink>
    </div>
    <div style="float: right; color: white;">
      <a-space>
         欢迎使用管理控台  <a-button type="text" style="color: white;" @click="exit">退出登录</a-button>
      </a-space>
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="/main/welcome">
        <RouterLink to="/main/welcome">
           <coffee-outlined /> &nbsp; 欢迎
        </RouterLink>
      </a-menu-item>
      <a-menu-item key="/main/about">
        <RouterLink to="/main/about">
           <user-outlined /> &nbsp; 关于
        </RouterLink>
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script lang="ts" setup>
import router from '@/router';
import store from '@/store';
import { ref,watch } from 'vue';

//引入图标
const hxx = ref('/hxx.jpg')
//被选中的菜单项
const selectedKeys = ref<string[]>([]);

//退出登录
const exit = ()=>{
    store.commit('setMember',null);
    router.push('/login');
  }

//监听路由变化，改变菜单项
watch(()=>router.currentRoute.value.path,(newValue:any) => {
    selectedKeys.value = []
    selectedKeys.value.push(newValue)
}, { immediate: true })
</script>
<style scoped> 
.logo {
  float: left;
  height: 31px;
  width: 150px;
  color: white;
  font-size: 20px;
}
</style>
  