<template>
    <p>
      <a-space>
        <train-select-view v-model="queryParams.trainCode" width="200px"></train-select-view>
        <a-date-picker v-model:value="queryParams.date" valueFormat="YYYY-MM-DD" placeholder="请选择日期"></a-date-picker>
        <station-select-view v-model="queryParams.start" width="200px"></station-select-view>
        <station-select-view v-model="queryParams.end" width="200px"></station-select-view>
        <a-button type="primary" @click="refreshData()">查找</a-button>
      </a-space>
    </p>
    <a-table :dataSource="dataSource"  :columns="columns" :pagination="false">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
        </template>
        <template v-else-if="column.dataIndex === 'station'">
          {{record.start}}<br/>
          {{record.end}}
        </template>
        <template v-else-if="column.dataIndex === 'time'">
          {{record.startTime}}<br/>
          {{record.endTime}}
        </template>
        <template v-else-if="column.dataIndex === 'duration'">
          {{calDuration(record.startTime, record.endTime)}}<br/>
          <div v-if="record.startTime.replaceAll(':', '') >= record.endTime.replaceAll(':', '')">
            次日到达
          </div>
          <div v-else>
            当日到达
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'ydz'">
          <div v-if="record.ydz >= 0">
            {{record.ydz}}<br/>
            {{record.ydzPrice}}￥
          </div>
          <div v-else>
            --
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'edz'">
          <div v-if="record.edz >= 0">
            {{record.edz}}<br/>
            {{record.edzPrice}}￥
          </div>
          <div v-else>
            --
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'rw'">
          <div v-if="record.rw >= 0">
            {{record.rw}}<br/>
            {{record.rwPrice}}￥
          </div>
          <div v-else>
            --
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'yw'">
          <div v-if="record.yw >= 0">
            {{record.yw}}<br/>
            {{record.ywPrice}}￥
          </div>
          <div v-else>
            --
          </div>
        </template>
      </template>
    </a-table>
    <br><TrainPagination :total="total" :pageSizeOptions="['5','7','9']" @change="onChange"/>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from "axios";
  import TrainSelectView from "@/components/TrainSelect.vue";
  import StationSelectView from "@/components/StationSelect.vue";
  import dayjs from "dayjs";

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
    title: '车站',
    dataIndex: 'station',
    },
    {
    title: '时间',
    dataIndex: 'time',
    },
    {
    title: '历时',
    dataIndex: 'duration',
    },
    {
    title: '一等座',
    dataIndex: 'ydz',
    key: 'ydz',
    },
    {
    title: '二等座',
    dataIndex: 'edz',
    key: 'edz',
    },
    {
    title: '软卧',
    dataIndex: 'rw',
    key: 'rw',
    },
    {
    title: '硬卧',
    dataIndex: 'yw',
    key: 'yw',
    },
    ];
   //接口
   interface DailyTrainDicket {
    id: number,
    date: string,
    trainCode: string,
    start: string,
    startPinyin: string,
    startTime: string,
    startIndex: string,
    end: string,
    endPinyin: string,
    endTime: string,
    endIndex: string,
    ydz: string,
    ydzPrice: number,
    edz: string,
    edzPrice: number,
    rw: string,
    rwPrice: number,
    yw: string,
    ywPrice: number,
  }
  //数据源
  const dataSource = ref<DailyTrainDicket[]>([]);
  
  //刷新
  const refreshData = () => {
      showData();
  }

  const calDuration = (startTime:string, endTime:string) => {
      let diff = dayjs(endTime, 'HH:mm:ss').diff(dayjs(startTime, 'HH:mm:ss'), 'seconds');
      return dayjs('00:00:00', 'HH:mm:ss').second(diff).format('HH:mm:ss');
  };
  
 //--------------分页----------------
  const total = ref(0);
  //分页参数
  const queryParams=ref({
    current:1,
    size:5,
    trainCode:null, 
    date:null,
    start:null,
    end:null,
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
      url: '/trainDaily/dailyTrainTicket/loadPage',
      params: queryParams.value
    }).then(({data})=>{
        total.value = data.data.total;
        dataSource.value = data.data.list;
    })
  }

  //页面加载数据
  onMounted(()=>{
    showData();
  })
  </script>
  