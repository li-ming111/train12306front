<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" :style="{ height: '100%', borderRight: 0 }">
      <a-menu-item key="/main/welcome">
        <router-link to="/main/welcome">
          <coffee-outlined /> &nbsp; 欢迎
        </router-link>
      </a-menu-item>
      <a-menu-item key="/main/about">
        <router-link to="/main/about">
          <TeamOutlined /> &nbsp; 关于
        </router-link>
      </a-menu-item>
      <a-sub-menu key="member">
        <template #title>
          <span>
            <UnorderedListOutlined />
            会员管理
          </span>
        </template>
        <a-menu-item key="/main/passenger">
          <router-link to="/main/passenger">
              <UserDeleteOutlined />乘车人管理
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/trainDicker">
          <router-link to="/main/trainDicker">
            <UserDeleteOutlined />余票查询
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/myConfirmOrder">
          <router-link to="/main/myConfirmOrder">
            <UserDeleteOutlined />我的车票
          </router-link>
        </a-menu-item>
        <a-menu-item key="3"><UserDeleteOutlined />控台管理</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="business">
        <template #title>
          <span>
            <UnorderedListOutlined />
            业务管理
          </span>
        </template>
        <a-menu-item key="/daily/confirmOrder">
          <router-link to="/daily/confirmOrder">
              <UserDeleteOutlined />订单信息
          </router-link>
        </a-menu-item>
        <a-menu-item key="/daily/dailyTrainDicket">
            <router-link to="/daily/dailyTrainDicket">
                <UserDeleteOutlined />余票查询
            </router-link>
        </a-menu-item>
        <a-menu-item key="/main/daily/dailyTrain">
            <router-link to="/main/daily/dailyTrain">
                <UserDeleteOutlined />每日车次
            </router-link>
        </a-menu-item>
        <a-menu-item key="/main/daily/dailyTrainStation">
          <router-link to="/main/daily/dailyTrainStation">
            <UserDeleteOutlined />每日车站
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/daily/dailyTrainCarriage">
          <router-link to="/main/daily/dailyTrainCarriage">
            <UserDeleteOutlined />每日车厢
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/daily/dailyTrainSeat">
          <router-link to="/main/daily/dailyTrainSeat">
            <UserDeleteOutlined />每日座位
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="base">
        <template #title>
          <span>
            <UnorderedListOutlined />
            基础数据
          </span>
        </template>
        <a-menu-item key="/main/base/station">
          <router-link to="/main/base/station">
            <UserDeleteOutlined />车站管理
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/base/train">
          <router-link to="/main/base/train">
            <UserDeleteOutlined />火车管理
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/base/trainStation">
          <router-link to="/main/base/trainStation">
            <UserDeleteOutlined />火车车站
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/base/trainCarriage">
          <router-link to="/main/base/trainCarriage">
            <UserDeleteOutlined />火车车厢
          </router-link>
        </a-menu-item>
        <a-menu-item key="/main/base/trainSeat">
          <router-link to="/main/base/trainSeat">
            <UserDeleteOutlined />火车座位
          </router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="batch">
        <template #title>
          <span>
            <UnorderedListOutlined />
            跑批管理
          </span>
        </template>
        <a-menu-item key="/main/batch/batchJob">
          <router-link to="/main/batch/batchJob">
            <user-outlined /> &nbsp; 任务管理
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import router from "@/router";

  const selectedKeys = ref<string[]>([]);

  watch(() => router.currentRoute.value.path, (newValue) => {
    selectedKeys.value = [];
    selectedKeys.value.push(newValue);
  }, {immediate: true});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
