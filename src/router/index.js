import { createRouter, createWebHistory } from 'vue-router'
import index from '../views/index.vue'
import store from "@/store";
import { useMessage } from "naive-ui";
window.$message = useMessage();
const routes = [
  {
    path: '/',
    name: 'home',
    component: index,
  },
  {
    path: '/documentmana',
    name: 'documentmana',
    component: () => import(/* webpackChunkName: "about" */ '../views/documentmana.vue')
  },
  {
    path: '/docextract',
    name: 'docextract',
    component: () => import(/* webpackChunkName: "about" */ '../views/docextract.vue')
  },
  {
    path: '/entitymana',
    name: 'entitymana',
    component: () => import(/* webpackChunkName: "about" */ '../views/entitymana.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/settings.vue')
  },
  {
    path: '/kgraph',
    name: 'kgraph',
    component: () => import(/* webpackChunkName: "about" */ '../views/kgraph.vue')
  },
  {
    path: '/kgraph1',
    name: 'kgraph1',
    component: () => import(/* webpackChunkName: "about" */ '../components/relationgraph.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 检查用户是否已经登录
  console.log(111);
  console.log(to);
  console.log(from);
  
  const isAuthenticated = store.getters.isLoggedIn;;
  if (to.path === '/' || isAuthenticated) {
    // 如果用户未登录，并且目标路由不是登录页面，则重定向到登录页面
    next();
  } else {
    // 如果用户已经登录或者目标路由是登录页面，则正常导航
    window.$message.error("请先点击左下角头像进行登录！")
    next("/");
  }
});

export default router
