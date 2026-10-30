<template>
  <a-pagination
    :total="total"
    :current='current'
    :pageSize='pageSize'
    :pageSizeOptions="pageSizeOptions"
    show-size-changer
    :show-quick-jumper="showQuickJumper"
    :show-sizer="showSizer"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { PropType,ref } from 'vue';

//参数属性
defineProps({
  total: {
    type: Number as PropType<number>,
    required: true,
  },
  pageSize: {
    type: Number as PropType<number>,
    required: false,
  },
  current: {
    type: Number as PropType<number>,
    default: 1,
    required: false,
  },
  pageSizeOptions: {
    type: String as PropType<string>,
    default: ['5','10','20'],
  },
  showSizer: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  showQuickJumper: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  onChange: {
    type: Function as PropType<(page: number, pageSize: number) => void>,
    default: () => {},
  }
})


const current = ref<number>(1)
const pageSize = ref<number>(5)

const emit = defineEmits(['change'])

//当前页码改变
const handleChange = (_current: number,_pageSize:number) => {
  current.value = _current
  pageSize.value = _pageSize
  emit('change', _current, _pageSize)
}

</script>