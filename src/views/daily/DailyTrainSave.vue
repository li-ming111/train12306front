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
      name="code"
    >
     <TrainSelect v-model="formState.code" @change="onChangeCode"></TrainSelect>
    </a-form-item>
    <a-form-item
      label="车次类型"
      name="type"
    >
    <a-select v-model:value="formState.type">
      <a-select-option v-for="item in TRAIN_TYPE_ARRAY" :key="item.code" :value="item.code">
      {{item.desc}}
      </a-select-option>
    </a-select>
    </a-form-item>
    <a-form-item
      label="始发站"
      name="start"
    >
      <StationSelect v-model="formState.start"></StationSelect>
    </a-form-item>
    <a-form-item
      label="始发站拼音"
      name="startPinyin"
      >
      <a-input v-model:value="formState.startPinyin" disabled/>
    </a-form-item>
    <a-form-item
      label="出站时间"
      name="startTime"
    >
    <a-time-picker v-model:value="formState.startTime" valueFormat="HH:mm:ss" placeholder="请选择时间" />
    </a-form-item>
    <a-form-item
      label="终点站"
      name="end"
    >
    <StationSelect v-model="formState.end"></StationSelect>
    </a-form-item>
    <a-form-item
    label="终点站拼音"
    name="endPinyin"
  >
    <a-input v-model:value="formState.endPinyin" disabled/>
  </a-form-item>
  <a-form-item
      label="到站时间"
      name="endTime"
    >
    <a-time-picker v-model:value="formState.endTime" valueFormat="HH:mm:ss" placeholder="请选择时间" />
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
import StationSelect from '@/components/StationSelect.vue';
import TrainSelect from '@/components/TrainSelect.vue';
import {TRAIN_TYPE_ARRAY} from '@/utils/enum.ts'

//路由对象
const router = useRouter();
 //接口
 interface FormState {
    id: string,
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
//表单数据
const formState = reactive<FormState>({
  id: '',
  date:'',
  code: '',
  type: '',
  start: '',
  startPinyin: '',
  startTime: '',
  end: '',
  endPinyin: '',
  endTime: '',
});

//根据车次添加相关信息
const onChangeCode=(train:FormState)=>{//组件的change事件可以获取整行数据
  let t = Tool.copy(train)
  delete t.id
  Object.assign(formState, t)
}

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
  axios.post('/trainDaily/dailyTrain/save', values).then(() => {
     message.success('保存成功');
  })
}
//修改
const updateData=(values:any)=>{
  axios.put('/trainDaily/dailyTrain/update', values).then(() => {
     message.success('更新成功');
  })
}

const onFinish = (values: any) => {
     if(formState.id){
      console.log(values);
      updateData(values);
     }else{
      saveData(values);
     }
     // 刷新列表
     router.push('/main/daily/dailyTrain');
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
//添加监听拼音
watch(()=>formState.start,()=>{
    if(Tool.isNotEmpty(formState.start)){
      formState.startPinyin = pinyin(formState.start, { toneType: 'none' }).replaceAll(' ','');
    }else{
      formState.startPinyin = '';
    }
})
watch(()=>formState.end,()=>{
    if(Tool.isNotEmpty(formState.end)){
      formState.endPinyin = pinyin(formState.end, { toneType: 'none' }).replaceAll(' ','');
    }else{
      formState.endPinyin = '';
    }
})
</script>

