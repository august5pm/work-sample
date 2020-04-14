import Vue from 'vue'
import Router from 'vue-router'
import MainContents from '@/contents/main/main-contents';

Vue.use(Router)

export default new Router({
  mode: 'history',
  fallback: true,
  routes: [
    {
      path: '/',
      name: 'MainContents',
      component: MainContents
    }
  ]
})
