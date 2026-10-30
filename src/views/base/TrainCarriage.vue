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
  interface TrainCarriage {
    id: number,
    trainCode: string,
    index: string,
    seatType: string,
    seatCount: string,
    rowCount: string,
    colCount: string,
  }
  
  //数据列
  const columns = [
  {
    title: '车次编号',
    dataIndex: 'trainCode',
    key: 'trainCode',
  },
  {
    title: '车厢号',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '座位类型',
    dataIndex: 'seatType',
    key: 'seatType',
  },
  {
    title: '座位数',
    dataIndex: 'seatCount',
    key: 'seatCount',
  },
  {
    title: '排数',
    dataIndex: 'rowCount',
    key: 'rowCount',
  },
  {
    title: '列数',
    dataIndex: 'colCount',
    key: 'colCount',
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
  ];
  //数据源
  const dataSource = ref<TrainCarriage[]>([]);

  //删除
  const onDelete = (id:number) => {
      axios({
        method: 'delete',
        url: `/trainBase/trainCarriage/delete/${id}`,
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
    router.push('/main/base/trainCarriageSave');
  }
  //编辑
  const edit = (record:TrainCarriage) => {
    router.push({
      path: '/main/base/trainCarriageSave',
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
      url: '/trainBase/trainCarriage/page',
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