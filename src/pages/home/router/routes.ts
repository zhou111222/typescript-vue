import Router from 'vue-router';
import Vue from 'vue';
import Home from '../views/home/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true, //此组件需要被缓存
      }
    }
  ],
});
