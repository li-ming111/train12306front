<template>
    <a-select v-model:value="name" show-search allowClear
        :filterOption="filterNameOption"
        @change="onChange" placeholder="请选择车站"
        :style="'width: ' + localWidth">
        <a-select-option v-for="item in stations" :key="item.name"
        :value="item.name" :label="item.name + item.namePinyin + item.namePy">
        {{item.name}} {{item.namePinyin}} ~ {{item.namePy}}
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
   const name = ref<string>()
   // 车站
   const stations = ref<any[]>([])
   //下列宽度
   const localWidth = ref<any>(props.width)
   //使用工具判断
   if(Tool.isEmpty(props.width)){
        localWidth.value = '100%'
   }
   //监听watch，动态获取数据
   watch(()=>props.modelValue,()=>{
        name.value = props.modelValue
   }, {immediate: true})
   
   //获取所有车站数据
   const getStations = async ()=>{
    await axios.get('/trainBase/station/all').then(res=>{   
        let data = res.data
        if(data.success){
            stations.value = data.data.list
        }else{
            notification.error({message:data.msg})
        }
    })     
   }
   //过滤车站数据
   const filterNameOption = (inputValue:string, option:any) => {
        return option.label.toLowerCase().indexOf(inputValue.toLocaleLowerCase()) > -1
   }

   // 定义事件 
   const emit = defineEmits(['update:modelValue','change']);

   //响应给父组件
   const onChange = (value:string)=>{
        emit('update:modelValue',value)
        let station = stations.value.filter(item=>item.code === value)[0]
        if(Tool.isEmpty(station)){
            station={}
        }
        emit('change',station)
   }
   //加载数据
   onMounted(()=>{
        getStations() 
    })
  </script>
  
  
