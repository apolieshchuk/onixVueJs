import Vue from 'vue';
import VueRouter from 'vue-router';
import Tasks from '@/components/views/Tasks.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/components/views/Tasks.vue'),
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: () => import('@/components/views/Kanban.vue'),
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('@/components/views/Activity.vue'),
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('@/components/views/Calendar.vue'),
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('@/components/views/Files.vue'),
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
