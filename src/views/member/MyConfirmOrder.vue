<template>
    <p>
      <a-space>
        <a-button type="primary" @click="handleQuery()">刷新</a-button>        
      </a-space>
    </p>
    <a-table :dataSource="dataSource"  :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'tickets'">
          <span v-for="item in SEAT_TYPE" :key="item.code">
            <span v-if="item.code === JSON.parse(record.tickets).seatTypeCode">
              {{ item.desc }}<br>{{ JSON.parse(record.tickets).passengerName }}
            </span>
          </span>  
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <span v-for="item in CONFIRM_ORDER_STATUS_ARRAY" :key="item.code">
            <span v-if="item.code === record.status">
              {{item.desc}}
            </span>
          </span>
        </template>
      </template>
    </a-table>
    <br><TrainPagination :total="total" :pageSizeOptions="['5','7','9']" @change="onChange"/>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from "axios";
  import {CONFIRM_ORDER_STATUS_ARRAY,SEAT_TYPE} from '@/utils/enum.ts'
  
  interface confirmOrder {
        id: undefined,
        memberId: undefined,
        date: undefined,
        trainCode: undefined,
        start: undefined,
        end: undefined,
        dailyTrainTicketId: undefined,
        tickets: undefined,
        status: undefined,
        createTime: undefined,
        updateTime: undefined,
  }
  const columns = [
        {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        },
        {
        title: '车次编号',
        dataIndex: 'trainCode',
        key: 'trainCode',
        },
        {
        title: '出发站',
        dataIndex: 'start',
        key: 'start',
        },
        {
        title: '到达站',
        dataIndex: 'end',
        key: 'end',
        },
        {
        title: '车票',
        dataIndex: 'tickets',
        key: 'tickets',
        },
        {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        },
  ];
 //数据源
 const dataSource = ref<confirmOrder[]>([]);
  //--------------分页----------------
  const total = ref(0);
  //分页参数
  const queryParams=ref({
    current:1,
    size:5,
    memberId:sessionStorage.getItem('memberId'), 
  })

  //当前页码变化
  const onChange = (page:number,pageSize:number) => {
    queryParams.value.current = page
    queryParams.value.size = pageSize
    showData()
  }; 
  //加载数据
  const showData = () => {  
    axios({
      method: 'get',
      url: '/trainDaily/confirmOrder/confirmOrder',
      params: queryParams.value
    }).then(({data})=>{
        total.value = data.data.total;
        dataSource.value = data.data.list;
    })
  }

  //-------------------分页结束--------------------
  //-------------------查询开始--------------------
  const handleQuery=()=>{
    console.log('------queryParams------>>',queryParams.value);
    console.log('------------>>',sessionStorage.getItem('memberId'));
    showData();
  }

  //页面加载数据
  onMounted(()=>{
    showData();
  })
  </script>
  