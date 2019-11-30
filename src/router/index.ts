import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/views/Tasks.vue'),
  },
  {
    path: '/kanban',
    name: 'Kanban',
    // component: () => import('@/views/Activity.vue'),
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('@/views/Activity.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // component: () => import('@/views/Activity.vue'),
  },
  {
    path: '/files',
    name: 'Files',
    // component: () => import('@/views/Activity.vue'),
  },
  {
    path: '/',
    redirect: '/tasks',
  },
];


const router = new VueRouter({
  routes,
});

export default router;
