<template>
    <a-select v-model:value="trainCode" show-search allowClear
        :filterOption="filterTrainCodeOption"
        @change="onChange" placeholder="请选择车次"
        :style="'width: ' + localWidth">
        <a-select-option v-for="item in trains" :key="item.code"
            :value="item.code" :label="item.code + item.start + item.end">
            {{item.code}} {{item.start}} ~ {{item.end}}
        </a-select-option>
    </a-select>
  </template>
  <script lang="ts" setup>
  import { ref, onMounted,watch,defineProps } from 'vue'
  import axios from 'axios'
  import {notification} from 'ant-design-vue'

   // 定义属性
   const props = defineProps({
        modelValue:{type:String,default:''},
        width: {type:String,default:'100%'}
   })
   // 名称
   const trainCode = ref<string>()
   // 车站
   const trains = ref<any[]>([])
   //下列宽度
   const localWidth = ref<any>(props.width)
   //使用工具判断
   if(Tool.isEmpty(props.width)){
        localWidth.value = '100%'
   }
   //监听watch，动态获取数据
   watch(()=>props.modelValue,()=>{
    trainCode.value = props.modelValue
   }, {immediate: true})
   
   //获取所有车次数据
   const getAllTrain = async ()=>{
    await axios.get('/trainBase/train/allTrain').then(res=>{   
        let data = res.data
        if(data.success){
            trains.value = data.data.list
        }else{
            notification.error({message:data.msg})
        }
    })     
   }
   //过滤车站数据
   const filterTrainCodeOption = (inputValue:string, option:any) => {
        return option.label.toLowerCase().indexOf(inputValue.toLocaleLowerCase()) > -1
   }

   // 定义事件 
   const emit = defineEmits(['update:modelValue','change']);

   //响应给父组件
   const onChange = (value:string)=>{
        emit('update:modelValue',value)
        let trainName = trains.value.filter(item=>item.code === value)[0]
        if(Tool.isEmpty(trainName)){
            trainName={}
        }
        emit('change',trainName)
   }
   //加载数据
   onMounted(()=>{
    getAllTrain() 
    })
  </script>