<template>
  <p>
    <a-space>
      <a-date-picker v-model:value="queryParams.date" valueFormat="YYYY-MM-DD" placeholder="请选择日期" />
      <TrainSelect v-model="queryParams.trainCode" style="width:200px"></TrainSelect>
      <a-button type="primary" @click="refreshData">刷新</a-button>
      <a-button type="primary" @click="add">新增</a-button>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from "axios";
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import TrainSelect from '@/components/TrainSelect.vue';


//路由对象
const router = useRouter();

//接口
interface DailyTrainStation {
  id: number,
  date:string,
  trainCode: string,
  indexa: string,
  name: string,
  namePinyin: string,
  inTime: string,
  outTime: string,
  stopTime: string,
  km: string,
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
  title: '站序',
  dataIndex: 'indexa',
  key: 'indexa',
},
{
  title: '站名',
  dataIndex: 'name',
  key: 'name',
},
{
  title: '站名拼音',
  dataIndex: 'namePinyin',
  key: 'namePinyin',
},
{
  title: '进站时间',
  dataIndex: 'inTime',
  key: 'inTime',
},
{
  title: '出站时间',
  dataIndex: 'outTime',
  key: 'outTime',
},
{
  title: '停站时间',
  dataIndex: 'stopTime',
  key: 'stopTime',
},
{
  title: '里程(公里)',
  dataIndex: 'km',
  key: 'km',
},
{
  title: '操作',
  dataIndex: 'operation'
}
];
//数据源
const dataSource = ref<DailyTrainStation[]>([]);

//删除
const onDelete = (id:number) => {
    axios({
      method: 'delete',
      url: `/trainDaily/dailyTrainStation/delete/${id}`,
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
  router.push('/main/daily/dailyTrainStationSave');
}
//编辑
const edit = (record:DailyTrainStation) => {
  router.push({
    path: '/main/daily/dailyTrainStationSave',
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
  date:null,
  trainCode:null
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
    url: '/trainDaily/dailyTrainStation/loadPage',
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