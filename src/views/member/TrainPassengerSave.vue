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
      label="会员id"
      name="memberId"
    >
      <a-input v-model:value="formState.memberId" />
    </a-form-item>
    <a-form-item
      label="乘车人"
      name="name"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item
      label="身份证"
      name="idCard"
    >
      <a-input v-model:value="formState.idCard" />
    </a-form-item>
    <a-form-item
      label="旅客类型"
      name="type"
    >
     <a-select v-model:value="formState.type" placeholder="请选择">
      <a-select-option value="1">成人</a-select-option>
      <a-select-option value="2">儿童</a-select-option>
      <a-select-option value="3">学生</a-select-option>
     </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">
        {{ formState.memberId ? '修改' : '新增' }}
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive,onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

//路由对象
const router = useRouter();
//接口类型
interface FormState {
  id: string;
  memberId: string;
  name: string;
  idCard: string;
  type: string;
}
//表单数据
const formState = reactive<FormState>({
  id: '',
  memberId: '',
  name: '',
  idCard: '',
  type: '', 
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
  axios.post('/trainMember/passenger/save', values).then(() => {
     message.success('保存成功');
  })
}
//修改
const updateData=(values:any)=>{
  axios.put('/trainMember/passenger/update', values).then(() => {
     message.success('更新成功');
  })
}

const onFinish = () => {
     if(formState.id){
        updateData(formState);
     }else{
        saveData(formState);
     }
     // 刷新列表
     router.push('/main/passenger');
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

