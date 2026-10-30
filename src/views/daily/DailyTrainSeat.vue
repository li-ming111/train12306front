<template>
    <p>
      <a-space>
        <a-date-picker v-model:value="queryParams.date" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
        <TrainSelect v-model="queryParams.code" ></TrainSelect>
        <a-button type="primary" @click="refreshData">刷新</a-button>
      </a-space>
    </p>
    <a-table :dataSource="dataSource"  :columns="columns" :pagination="false" />
    <br><TrainPagination :total="total" :pageSizeOptions="['5','7','9']" @change="onChange"/>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from "axios";

  //接口
  interface TrainSeat {
    id: number,
    date: string,
    sell:string,
    trainCode: string,
    carriageIndex: string,
    row: string,
    col: string,
    seatType: string,
    carriageSeatIndex: string,
  }
  
  //数据列
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
    title: '厢序',
    dataIndex: 'carriageIndex',
    key: 'carriageIndex',
  },
  {
    title: '排号',
    dataIndex: 'row',
    key: 'row',
  },
  {
    title: '列号',
    dataIndex: 'col',
    key: 'col',
  },
  {
    title: '座位类型',
    dataIndex: 'seatType',
    key: 'seatType',
  },
  {
    title: '同车厢座序',
    dataIndex: 'carriageSeatIndex',
    key: 'carriageSeatIndex',
  }
  ,
  {
    title: '售卖情况',
    dataIndex: 'sell',
    key: 'sell',
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
  ];
  //数据源
  const dataSource = ref<TrainSeat[]>([]);

  //刷新
  const refreshData = () => {
      showData();
  }
  //--------------分页----------------
  const total = ref(0);
  //分页参数
  const queryParams=ref({
    current:1,
    size:5,
    date:null,
    code:null
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
      url: '/trainDaily/dailyTrainSeat/loadPage',
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