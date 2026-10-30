<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="id"
      name="id"
      hidden="true"
    >
      <a-input v-model:value="formState.id" />
    </a-form-item>
  <a-form-item
    label="日期"
    name="date"
  >
  <a-date-picker v-model:value="formState.date" valueFormat="YYYY-MM-DD" placeholder="请选择日期"/>
  </a-form-item>
    <a-form-item
      label="车次编号"
      name="trainCode"
    >
      <TrainSelect v-model:value="formState.trainCode" />
    </a-form-item>
    <a-form-item
      label="车厢号"
      name="index"
    >
      <a-input v-model:value="formState.index" />
    </a-form-item>
    <a-form-item
      label="座位类型"
      name="seatType"
    >
    <a-select v-model:value="formState.seatType">
      <a-select-option v-for="item in SEAT_TYPE_ARRAY" :key="item.code" :value="item.code">
      {{item.desc}}
      </a-select-option>
    </a-select>
    </a-form-item>
    <a-form-item
      label="排数"
      name="rowCount"
    >
      <a-input-number v-model:value="formState.rowCount" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">
        {{ formState.id ? '修改' : '新增' }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive,onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import TrainSelect from '@/components/TrainSelect.vue';
import {SEAT_TYPE_ARRAY} from '@/utils/enum.ts'

//路由对象
const router = useRouter();
 //接口
 interface FormState {
  id: string,
  date: string,
  trainCode: string,
  index: string,
  seatType: string,
  seatCount: number,
  rowCount: number,
  colCount: number,
  }
//表单数据
const formState = reactive<FormState>({
  id: "",
  date: "",
  trainCode: "",
  index: "",
  seatType: "",
  seatCount: 0,
  rowCount: 0,
  colCount: 0,
});

//获取编辑的数据
onMounted(() => {
  const record = history.state.params
  //判断
  if(record){
    //回填数据
    Object.assign(formState, JSON.parse(record))
  }
})

//新增
const saveData=(values:any)=>{
  axios.post('/trainDaily/dailyTrainCarriage/save', values).then(() => {
     message.success('保存成功');
  })
}
//修改
const updateData=(values:any)=>{
  axios.put('/trainDaily/dailyTrainCarriage/update', values).then(() => {
     message.success('更新成功');
  })
}

const onFinish = (values: any) => {
     if(formState.id){
      updateData(values);
     }else{
      saveData(values);
     }
     // 刷新列表
     router.push('/main/daily/dailyTrainCarriage');
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

