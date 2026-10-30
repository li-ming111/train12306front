<template>
  <p>
    <a-space>
      <a-button type="primary" @click="handleQuery()">刷新</a-button>        
    </a-space>
  </p>
  <a-table :dataSource="data" :pagination="pagination"  :columns="columns" @change="onChange">
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
     /*  {
      title: '会员id',
      dataIndex: 'memberId',
      key: 'memberId',
      }, */
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
     /*  {
      title: '余票ID',
      dataIndex: 'dailyTrainTicketId',
      key: 'dailyTrainTicketId',
      }, */
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
const data = ref<confirmOrder[]>([]);
//--------------分页----------------
const pagination = ref({
      total:0,
      current:1,
      pageSize:5,
      showr:true,
      pageSizeOptions:['5','10','15'],
      showQuickJumper:true,
      showSizeChanger:true,
      onShowSizeChange:pageSizeChange,
      onChange:pageChange,
})
//分页参数
const queryParams=ref({
  current:1,
  size:5,
  //memberId:sessionStorage.getItem('mid'), 
})

//页码变化
function pageSizeChange(current:number,pageSize:number){
  pagination.value.current = current
  pagination.value.pageSize = pageSize
  queryParams.value.current = current
  queryParams.value.size = pageSize
}
//点击下一页
function pageChange(page:number, pageSize:number){
  pagination.value.current = page
  pagination.value.pageSize = pageSize
  queryParams.value.current = page
  queryParams.value.size = pageSize
}

//当前页码变化
const onChange = (pagination:any) => {
  queryParams.value.current = pagination.current
  queryParams.value.size = pagination.pageSize
  showData()
}; 
//加载数据
const showData = () => {  
  axios({
    method: 'get',
    url: '/daily-train/confirmOrder/confirmOrder',
    params: queryParams.value
  }).then(res=>{
      let result = res.data;
      pagination.value.total = result.data.total;
      data.value = result.data.list;
  })
}

//-------------------分页结束--------------------
//-------------------查询开始--------------------
const handleQuery=()=>{
  showData();
}

//页面加载数据
onMounted(()=>{
  showData();
})
</script>
