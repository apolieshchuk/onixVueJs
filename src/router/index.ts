import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/components/layout/Layout.vue'),
    redirect: '/tasks',
    children: [
      {
        path: '/',
        component: () => import('@/components/layout/views/Tasks.vue'),
      },
    ],
  },
  {
    path: '/kanban',
    name: 'Kanban',
    redirect: '/kanban',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/components/layout/views/Kanban.vue'),
      },
    ],
  },
  {
    path: '/activity',
    name: 'Activity',
    redirect: '/activity',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/components/layout/views/Activity.vue'),
      },
    ],
  },
  {
    path: '/calendar',
    name: 'Calendar',
    redirect: '/calendar',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/components/layout/views/Calendar.vue'),
      },
    ],
  },
  {
    path: '/files',
    name: 'Files',
    redirect: '/files',
    component: () => import('@/components/layout/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/components/layout/views/Files.vue'),
      },
    ],
  },
  {
    path: '/',
    redirect: '/tasks',
  },
  {
    path: '*',
    component: () => import('@/components/NotFound.vue'),
  },
];


const router = new VueRouter({
  routes,
});

export default router;
