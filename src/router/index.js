import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const routes = [
    {
        path: '/tasks',
        name: 'Tasks',
        component: () => import('@/layout/views/Tasks.vue'),
    },
    {
        path: '/kanban',
        name: 'Kanban',
    },
    {
        path: '/activity',
        name: 'Activity',
        component: () => import('@/layout/views/Activity.vue'),
    },
    {
        path: '/calendar',
        name: 'Calendar',
    },
    {
        path: '/files',
        name: 'Files',
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
//# sourceMappingURL=index.js.map