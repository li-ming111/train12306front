<template>
    <p>
      <a-space>
        <a-date-picker v-model:value="queryParams.date" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
        <TrainSelect v-model="queryParams.code" style="width:200px"></TrainSelect>
        <a-button type="primary" @click="refreshData">刷新</a-button>
        <a-button type="primary" @click="add">添加</a-button>
        <a-button type="primary" @click="genTrainCode" danger>手动生成车次信息</a-button>
      </a-space>
    </p>
    <a-table :dataSource="dataSource"  :columns="columns" :pagination="false">
      <template #bodyCell="{column,record}">
         <template v-if="column.dataIndex==='operation'">
          <a-space>
            <a-popconfirm
              v-if="dataSource.length"
              title="是否删除?"
              cancelText="取消"
              okText="确定"
              @confirm="onDelete(record.id)"
              >
              <a-button type="primary" danger>删除</a-button>
            </a-popconfirm>
            <a-button type="primary" @click="edit(record)">编辑</a-button>
          </a-space>
         </template>
      </template>  
    </a-table>
    <br>
    <TrainPagination :total="total" :pageSizeOptions="['5','7','9']" @change="onChange"/>
    <!-- 模态窗口 -->
    <a-modal v-model:visible="genDailyVisible" title="生成车次" @ok="handleGenDailyOk"
           :confirm-loading="genDailyLoading" ok-text="确认" cancel-text="取消">
    <a-form :model="formState" :label-col="{span: 4}" :wrapper-col="{ span: 20 }">
      <a-form-item label="日期">
        <a-date-picker v-model:value="formState.date" placeholder="请选择日期"/>
      </a-form-item>
    </a-form>
  </a-modal>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import axios from "axios";
  import { message } from 'ant-design-vue';
  import { useRouter } from 'vue-router';
  import TrainSelect from '@/components/TrainSelect.vue';
  import dayjs from 'dayjs';
  

  //路由对象
  const router = useRouter();

  //接口
  interface DailyTrain {
    id: number,
    date: string,
    code: string,
    type: string,
    start: string,
    startPinyin: string,
    startTime: string,
    end: string,
    endPinyin: string,
    endTime: string,
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
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '车次类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '始发站',
    dataIndex: 'start',
    key: 'start',
  },
  {
    title: '始发站拼音',
    dataIndex: 'startPinyin',
    key: 'start',
  },
  {
    title: '出发时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
  {
    title: '终点站',
    dataIndex: 'end',
    key: 'end',
  },
  {
    title: '终点站拼音',
    dataIndex: 'endPinyin',
    key: 'endPinyin',
  },
  {
    title: '到站时间',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
  ];
  //数据源
  const dataSource = ref<DailyTrain[]>([]);

  //--------------模态窗口------------------
  const formState = reactive({
    date:''
  })
  const genDailyVisible = ref(false);
  const genDailyLoading = ref(false);

  //手动生成车次信息
  const genTrainCode = () => {
    genDailyVisible.value=true;
  }

  //生成车次信息
  const handleGenDailyOk = () => {
    //日期格式
    let date = dayjs(formState.date).format("YYYY-MM-DD");
    axios.get(`/trainDaily/dailyTrain/gen_daily/${date}`).then(()=>{
      message.success('生成成功');
      genDailyVisible.value=false;
    })
  }

  //删除
  const onDelete = (id:number) => {
      axios({
        method: 'delete',
        url: `/trainDaily/dailyTrain/delete/${id}`,
      }).then(()=>{
        showData();
        message.success('删除成功');
      })
  }
  //刷新
  const refreshData = () => {
      showData();
  }
  //新增
  const add = () => {
    router.push('/main/daily/dailyTrainSave');
  }
  //编辑
  const edit = (record:DailyTrain) => {
    router.push({
      path: '/main/daily/dailyTrainSave',
      state: {
        params:JSON.stringify(record)
      }
    })
  }
  //--------------分页----------------
  const total = ref(0);
  //分页参数
  const queryParams=ref({
    current:1,
    size:5,
    code:null, 
    date:null
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
      url: '/trainDaily/dailyTrain/loadPage',
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