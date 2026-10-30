<template>
    <a-row class="login">
      <a-col :span="8" :offset="8" class="login-main">
        <h1 style="text-align: center"><rocket-two-tone />&nbsp;12306售票系统</h1>
        <a-form
            :model="loginForm"
            name="basic"
            autocomplete="off"
        >
          <a-form-item
              label=""
              name="mobile"
              :rules="[{ required: true, message: '请输入手机号!' }]"
          >
            <a-input v-model:value="loginForm.mobile" placeholder="手机号"/>
          </a-form-item>
  
          <a-form-item
              label=""
              name="code"
              :rules="[{ required: true, message: '请输入验证码!' }]"
          >
            <a-input v-model:value="loginForm.code">
              <template #addonAfter>
                <a @click="sendCode">获取验证码</a>
              </template>
            </a-input>
            <!--<a-input v-model:value="loginForm.code" placeholder="验证码"/>-->
          </a-form-item>
  
          <a-form-item>
            <a-button type="primary" block @click="login">登录</a-button>
          </a-form-item>
  
        </a-form>
      </a-col>
    </a-row>
  </template>
  <script setup lang='ts'>
  import { reactive } from 'vue';
  import axios from 'axios';
  import { notification } from 'ant-design-vue';
  import { useRouter } from 'vue-router'
  import store from "@/store";

  //创建路由
  const router = useRouter();
  //参数
  const loginForm = reactive({
    mobile: '13936439780',
    code: '',
  });
  //获取验证码
  const sendCode = () => {
    axios({
      url: "/trainMember/sendCode",
      method: 'get',
      params: {mobile: loginForm.mobile}
    }).then(({data}) => {
      if (data) {
        notification.success({ message: '发送验证码成功！' });
        loginForm.code = data.data.code;
      } else {
        notification.error({ message: data.data.msg });
      }
    });
  }; 
  
  //登录
  const login = () => {
    //请求后端
    axios.post("/trainMember/login", loginForm).then(({data}) => {
      if (data.success) {
          //保存会员id
          sessionStorage.setItem('memberId', data.data.member.id);
          notification.success({ message: '登录成功！' });
          //jwt
          store.commit('setMember', data.data.member.token);
          //跳转主页面
          router.push('/main');
      } else {
        notification.error({ message: data.message });
      }
    })
  }
  </script>
  
  <style>
  .login-main h1 {
    font-size: 25px;
    font-weight: bold;
  }
  .login-main {
    margin-top: 100px;
    padding: 30px 30px 20px;
    border: 2px solid grey;
    border-radius: 10px;
    background-color: #fcfcfc;
  }
  </style>
 