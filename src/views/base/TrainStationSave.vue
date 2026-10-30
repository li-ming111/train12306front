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
      label="车站名称"
      name="name"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item
      label="车站拼音"
      name="namePinyin"
    >
      <a-input v-model:value="formState.namePinyin" />
    </a-form-item>
    <a-form-item
      label="拼音首字母"
      name="namePy"
    >
      <a-input v-model:value="formState.namePy" />
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

//路由对象
const router = useRouter();
 //接口
 interface FormState {
    id: string,
    name: string,
    namePinyin: string,
    namePy: string,
  }
//表单数据
const formState = reactive<FormState>({
  id: '',
  name: '',
  namePinyin: '',
  namePy: '', 
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
  axios.post('/trainBase/station/save', values).then(() => {
     message.success('保存成功');
  })
}
//修改
const updateData=(values:any)=>{
  axios.put('/trainBase/station/update', values).then(() => {
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
     router.push('/main/base/station');
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
//添加监听拼音
watch(()=>formState.name,()=>{
    formState.namePinyin=pinyin(formState.name,{toneType:'none'}).replaceAll(" ","")
    formState.namePy=pinyin(formState.name,{toneType:'none',pattern:'first'}).replaceAll(" ","")
})
</script>

