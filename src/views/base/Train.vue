<template>
    <p>
      <a-space>
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
            <a-button type="primary" @click="genData(record.code)">生成座位</a-button>
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
  

  //路由对象
  const router = useRouter();

  //接口
  interface Train {
    id: number,
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
  const dataSource = ref<Train[]>([]);

  //删除
  const onDelete = (id:number) => {
      axios({
        method: 'delete',
        url: `/train/delete/${id}`,
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
    router.push('/main/base/trainSave');
  }
  //编辑
  const edit = (record:Train) => {
    router.push({
      path: '/main/base/trainSave',
      state: {
        params:JSON.stringify(record)
      }
    })
  }
  //生成座位
  const genData = (code:string) => {
    axios({
      method: 'get',
      url: `/trainBase/train/gen/${code}`,
    }).then(()=>{
      message.success('生成座位成功');
    })
  }
  //--------------分页----------------
  const total = ref(0);
  //分页参数
  const queryParams=ref({
    current:1,
    size:5,
    type:null,
    name:''
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
      url: '/trainBase/train/page',
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