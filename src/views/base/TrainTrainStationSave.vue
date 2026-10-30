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
      label="车次编号"
      name="trainCode"
    >
      <TrainSelect v-model="formState.trainCode"></TrainSelect>
    </a-form-item>
    <a-form-item
      label="站序"
      name="index"
    >
    <a-input v-model:value="formState.index"/>
    </a-form-item>
    <a-form-item
      label="站名"
      name="name"
    >
      <StationSelect v-model="formState.name"></StationSelect>
    </a-form-item>
    <a-form-item
      label="站名拼音"
      name="namePinyin"
      >
      <a-input v-model:value="formState.namePinyin" disabled/>
    </a-form-item>
    <a-form-item
      label="进站时间"
      name="inTime"
    >
    <a-time-picker v-model:value="formState.inTime" valueFormat="HH:mm:ss" placeholder="请选择时间" />
    </a-form-item>
    <a-form-item
      label="出站时间"
      name="outTime"
    >
    <a-time-picker v-model:value="formState.outTime" valueFormat="HH:mm:ss" placeholder="请选择时间" />
    </a-form-item>
    <a-form-item
    label="停站时长"
    name="stopTime"
  >
  <a-time-picker v-model:value="formState.stopTime" valueFormat="HH:mm:ss" placeholder="请选择时间" />
  </a-form-item>
  <a-form-item
      label="里程(公里)"
      name="km"
    >
    <a-input v-model:value="formState.km" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">
        {{ formState.id ? '修改' : '新增' }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive,onMounted,watch } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import {pinyin} from 'pinyin-pro';
import TrainSelect from '@/components/TrainSelect.vue';
import StationSelect from '@/components/StationSelect.vue';
import dayjs from 'dayjs';

//路由对象
const router = useRouter();
 //接口
 interface FormState {
  id: string,
  trainCode: string,
  index: string,
  name: string,
  namePinyin: string,
  inTime: string,
  outTime: string,
  stopTime: string,
  km: string,
  }
//表单数据
const formState = reactive<FormState>({
  id: '',
  trainCode: '',
  index: '',
  name: '',
  namePinyin: '',
  inTime: '',
  outTime: '',
  stopTime: '',
  km: '',
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
  axios.post('/trainBase/trainStation/save', values).then(() => {
     message.success('保存成功');
  })
}
//修改
const updateData=(values:any)=>{
  axios.put('/trainBase/trainStation/update', values).then(() => {
     message.success('更新成功');
  })
}

const onFinish = (values: any) => {
  console.log('--------values------->>>',values);
  console.log('--------formState------->>>',formState);
     if(formState.id){
      console.log(values);
      updateData(values);
     }else{
      saveData(values);
     }
     // 刷新列表
     router.push('/main/base/trainStation');
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
//添加监听拼音
watch(()=>formState.name,()=>{
    if(Tool.isNotEmpty(formState.name)){
      formState.namePinyin = pinyin(formState.name, { toneType: 'none' }).replace(' ','');
    }else{
      formState.namePinyin = '';
    }
}, { immediate: true })

//计算进站停车时长
watch(()=>formState.inTime,()=>{
  let diff = dayjs(formState.outTime,'HH:mm:ss').diff(dayjs(formState.inTime,'HH:mm:ss'),'seconds');
  formState.stopTime = dayjs('00:00:00','HH:mm:ss').second(diff).format('HH:mm:ss');
}, { immediate: true })

//计算出站停车时长
watch(()=>formState.outTime,()=>{
  let diff = dayjs(formState.outTime,'HH:mm:ss').diff(dayjs(formState.inTime,'HH:mm:ss'),'seconds');
  formState.stopTime = dayjs('00:00:00','HH:mm:ss').second(diff).format('HH:mm:ss');
}, { immediate: true })

</script>

