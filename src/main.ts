import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Antd, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue'
import axios from 'axios'
import TrainPagination from '@/components/TrainPagination.vue';

const app = createApp(App)
//全局挂载
app.component('TrainPagination', TrainPagination)
//加载
app.use(Antd).use(store).use(router).mount('#app')
//图标
const icons:any = Icons
for(const i in icons){
    app.component(i,icons[i])
}

//请求拦截
axios.interceptors.request.use(config=>{
    //请求头携带token
    if(store.state.member!=null){
        const _token = store.state.member;
        if(_token){
            config.headers.token = _token;
        }
    }
    return config;
},err=>{
    return Promise.reject(err);
})
//响应拦截
axios.interceptors.response.use(res=>{
    return res;
},err=>{
    const _response = err.response;
    const status = _response.status;
    if(status==401){
        //未登录
        store.commit('setMember',null);
        message.error('未登录,请重新登录');
        router.push('/login');
    }
    return Promise.reject(err);
})

//配置访问地址
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API
console.log('环境: ',import.meta.env.VITE_ENV);
console.log('服务端: ',import.meta.env.VITE_APP_BASE_API);