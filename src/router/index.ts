import VueRouter from 'vue-router';
import Vue from 'vue';
import Tasks from '@/views/Tasks.vue';

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
    component: () => import('@/views/Kanban.vue'),
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('@/views/Activity.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/views/Calendar.vue'),
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('@/views/Files.vue'),
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
