import Vue from 'vue';
import VueRouter from 'vue-router';
import Tasks from '@/components/views/Tasks.vue';
Vue.use(VueRouter);
const routes = [
    {
        path: '/tasks',
        name: 'Tasks',
        component: () => import('@/components/TheLayout.vue'),
        redirect: '/tasks',
        children: [
            {
                path: '/',
                component: Tasks,
            },
        ],
    },
    {
        path: '/kanban',
        name: 'Kanban',
        redirect: '/kanban',
        component: () => import('@/components/TheLayout.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/components/views/Kanban.vue'),
            },
        ],
    },
    {
        path: '/activity',
        name: 'Activity',
        redirect: '/activity',
        component: () => import('@/components/TheLayout.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/components/views/Activity.vue'),
            },
        ],
    },
    {
        path: '/calendar',
        name: 'Calendar',
        redirect: '/calendar',
        component: () => import('@/components/TheLayout.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/components/views/Calendar.vue'),
            },
        ],
    },
    {
        path: '/files',
        name: 'Files',
        redirect: '/files',
        component: () => import('@/components/TheLayout.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/components/views/Files.vue'),
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
//# sourceMappingURL=index.js.map