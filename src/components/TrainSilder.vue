<template>
  <a-layout-sider width="200" style="background: #fff">
  <a-menu
    mode="inline"
    :selectedKeys="selectedKeys"
    :style="{ height: '100%', borderRight: 0 }">
    <template v-for="item in menuData" :key="item.key">
      <a-sub-menu v-if="item.children" :key="item.key" :hidden="item.title==='会员管理'?false:!perm">
        <template #title>
          <span><UnorderedListOutlined />{{ item.title }}</span>
        </template>
        <a-menu-item
          v-for="subItem in item.children"
          :key="subItem.key"
        >
        <router-link :to="subItem.key">
          <UserDeleteOutlined /> {{ subItem.title }}
        </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="item.id" :hidden="false">
        <div v-if="item.title==='欢迎'">
          <router-link :to="item.key">
             <coffee-outlined /> &nbsp; {{ item.title }}
          </router-link>
        </div>
        <div v-else>
          <router-link :to="item.key">
              <TeamOutlined /> &nbsp; {{ item.title }}
          </router-link>
        </div>
      </a-menu-item>
    </template>
  </a-menu>
</a-layout-sider>
</template>
 
<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import router from "@/router";
 
//菜单选中
const selectedKeys = ref<string[]>([]);

//权限参数
let perm = ref<boolean>(true);

const menuData = ref([
  {
    key: '/main/welcome',
    id: '/main/welcome',
    title: '欢迎',
    authority: perm.value,
  },
  {
    key: '/main/about',
    id: '/main/about',
    title: '关于',
    authority: perm.value,
  },
  {
    key: 'member',
    id: 'member',
    title: '会员管理',
    authority: perm.value,
    children: [
      { key: '/main/passenger', title: '乘车人管理', authority: 'show' },
      { key: '/main/trainTicket', title: '余票查询', authority: 'show' },
      { key: '/main/myConfirmOrder', title: '我的车票', authority: 'show' },
      { key: '/main/trainDicker', title: '控台管理', authority: 'show' },
    ],
  },
  {
    key: 'serviceData',
    id: 'serviceData',
    title: '业务管理',
    authority: 'serviceData',
    children: [
      { key: '/main/confirmOrder', title: '订单信息', authority: '/daily/confirmOrder' },
      { key: '/main/daily/dailyTrainTicket', title: '余票查询', authority: '/daily/dailyTrainicket' },
      { key: '/main/daily/dailyTrain', title: '每日车次', authority: '/main/daily/dailyTrain' },
      { key: '/main/daily/dailyTrainStation', title: '每日车站', authority: '/main/daily/dailyTrainStation' },
      { key: '/main/daily/dailyTrainCarriage', title: '每日车厢', authority: '/main/daily/dailyTrainCarriage' },
      { key: '/main/daily/dailyTrainSeat', title: '每日座位', authority: '/main/daily/dailyTrainSeat' },
    ],
  },
  {
    key: 'baseData',
    id: 'baseData',
    title: '基础数据',
    authority: 'baseData',
    children: [
      { key: '/main/base/station', title: '车站管理', authority: '/main/base/station' },
      { key: '/main/base/train', title: '火车管理', authority: '/main/base/train' },
      { key: '/main/base/trainStation', title: '火车车站', authority: '/main/base/trainStation' },
      { key: '/main/base/trainCarriage', title: '火车车厢', authority: '/main/base/trainCarriage' },
      { key: '/main/base/trainSeat', title: '火车座位', authority: '/main/base/trainSeat' },
    ],
  },
  {
    key: 'batchData',
    id: 'batchData',
    title: '跑批管理',
    authority: 'batchData',
    children: [
      { key: '/main/batch/batchJob', title: '任务管理', authority: '/main/batch/batchJob' },
    ],
  },
]);
 
//监控路由变化
watch(() => router.currentRoute.value.path, (newValue) => {
  selectedKeys.value = [];
  selectedKeys.value.push(newValue);
}, {immediate: true});
 
//权限判断
function checkPermission(authority:any) {
  return authority === '1';
}

//加载后调用
onMounted(() => {
  perm.value = checkPermission(sessionStorage.getItem('memberId'));
})
</script>