import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Login
    }, {
      path: '/hello',
      component: HelloWorld
    }
  ]
})

export default router
