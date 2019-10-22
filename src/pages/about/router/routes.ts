import Vue from 'vue';
import Router from 'vue-router';
import About from '../views/about/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        keepAlive: false, //此组件不需要被缓存
      }
    }
  ],
});
