<template lang="pug">
  div#page-login('@keyup.enter.stop'='login')
    div(class='animated rubberBand')
      div
        span 身份：
        select(style={width: '165px'} v-model='identity')
          option(value='student') 学生
          option(value='teacher') 老师
      div
        span 账号：
        input(type='text' v-model='username' ref='username' autofocus)
      div
        span 密码：
        input(type='password' v-model='password')
      p {{info}}
      button(type='button' '@click'='login') 登录
</template>

<script>
import sesstion from '@/config/sesstion.js'
import $ from '@/utility/dollar.js'

export default {
  name: 'Login',
  data() {
    return {
      identity: 'student',
      username: '',
      password: '',
      info: ''
    }
  },
  methods: {
    login() {
      console.log(1321321);
    }
  }  
}
</script>

<style lang='less' scoped>
  #page-login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

      &>div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 40px;
      border-radius: 2px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
      background-color: #fff;

      &>div,
      &>p {
        margin: 0 0 1em;
      }

      p {
        height: 16px;
        color: red;
        font-size: 12px;
        font-weight: bold;
      }

      input,
      select {
        padding: 0 4px;
      }

      &>div:last-child {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        a {
          color: blue;
          font-size: 12px;
        }

        button {
          padding: 0 10px;
        }
      }
    }
  }
</style>


