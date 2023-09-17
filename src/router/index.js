import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        }
      ]
    }
  ]
})
//拦截未登录请求页面
//默认直接放行
// 返回值：
// 1.undefined/true 直接放行
// 2.false拦回from的地址页
// 3.具体路径'/login'或路径对象{name:'login'} 拦截到对应的地址
router.beforeEach((to) => {
  // 如果没有token，访问非登录页，拦截到登录页，其他情况正常放行
  const useStore = useUserStore()
  if (useStore.token.length <= 0 && to.path != '/login') {
    return '/login'
  }
})
export default router
