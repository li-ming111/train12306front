import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'
import { notification } from 'ant-design-vue'
import Login from '@/views/Login.vue'
import store from '@/store'

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        component: Login        
    },
    {
        path:'/main',
        component: () => import('@/views/TrainMain.vue'),//懒加载方式
        children:[
            {
                path:'/login',
                redirect:'/'
            },
            {
                path:'welcome',
                component:()=>import('@/views/TrainWelcome.vue'),
            },
            {
                path:'about',
                component:()=>import('@/views/TrainAbout.vue'),
            },
            {
                path:'hxx',
                component:()=>import('@/views/TrainHxx.vue'),
            },
            {
                path:'passenger',
                component:()=>import('@/views/member/TrainPassenger.vue'),
            },
            {
                path:'passengerSave',
                component:()=>import('@/views/member/TrainPassengerSave.vue'),
            },
            {
                path:'trainTicket',
                component:()=>import('@/views/member/TrainTicket.vue'),
            },
            {
                path:'trainOrder',
                component:()=>import('@/views/member/TrainOrder.vue'),
            },
            {
                path:'myConfirmOrder',
                component:()=>import('@/views/member/MyConfirmOrder.vue'),
            },
            {
                path:'confirmOrder',
                component:()=>import('@/views/member/ConfirmOrder.vue'),
            },
            {
                path:'base',
                children:[
                    {
                        path:'station',
                        component:()=>import('@/views/base/TrainStation.vue'),
                    },
                    {
                        path:'stationSave',
                        component:()=>import('@/views/base/TrainStationSave.vue'),
                    },
                    {
                        path:'train',
                        component:()=>import('@/views/base/Train.vue'),
                    },
                    {
                        path:'trainSave',
                        component:()=>import('@/views/base/TrainSave.vue'),
                    },
                    {
                        path:'trainStation',
                        component:()=>import('@/views/base/TrainTrainStation.vue'),
                    },
                    {
                        path:'trainStationSave',
                        component:()=>import('@/views/base/TrainTrainStationSave.vue'),
                    },
                    {
                        path:'trainCarriage',
                        component:()=>import('@/views/base/TrainCarriage.vue'),
                    },
                    {
                        path:'trainCarriageSave',
                        component:()=>import('@/views/base/TrainCarriageSave.vue'),
                    },
                    {
                        path:'trainSeat',
                        component:()=>import('@/views/base/TrainSeat.vue'),
                    },
                ]
            }
            ,
            {
                path:'daily',
                children:[
                    {
                        path:'dailyTrain',
                        component:()=>import('@/views/daily/DailyTrain.vue'),
                    },
                    {
                        path:'dailyTrainSave',
                        component:()=>import('@/views/daily/DailyTrainSave.vue'),
                    },
                    {
                        path:'dailyTrainStation',
                        component:()=>import('@/views/daily/DailyTrainStation.vue'),
                    },
                    {
                        path:'dailyTrainStationSave',
                        component:()=>import('@/views/daily/DailyTrainStationSave.vue'),
                    },
                    {
                        path:'dailyTrainCarriage',
                        component:()=>import('@/views/daily/DailyTrainCarriage.vue'),
                    },
                    {
                        path:'dailyTrainCarriageSave',
                        component:()=>import('@/views/daily/DailyTrainCarriageSave.vue'),
                    },
                    {
                        path:'dailyTrainSeat',
                        component:()=>import('@/views/daily/DailyTrainSeat.vue'),
                    },
                    {
                        path:'dailyTrainTicket',
                        component:()=>import('@/views/daily/DailyTrainTicket.vue'),
                    },
                    
                ]
            },
            {
                path:'batch',
                children:[
                    {
                        path:'batchJob',
                        component:()=>import('@/views/batch/BatchJob.vue'),
                    },
                ]
            }
        ]
    },
 
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
//路由守卫
router.beforeEach((to,from,next)=>{
    if(to.matched.some(item=>{
      return item.meta.loginRequire    
    })){
      let _member = store.state.member
      if(!_member.token){
        notification.error({message:'没有登录或者超时'})
        next('/')
      }else{
        next() //通过
      }
    }else{
      next() //通过
    }
  })
  
  export default router































