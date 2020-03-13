export default [
    {
        path: "diet",
        name:'diet',
        component: () => import('@/views/diet/Diet.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        },
    },
    {
        path: "motion",
        name:'motion',
        component: () => import('@/views/motion/Motion.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        },
    },
    {
        path: "conditioning",
        name:'conditioning',
        component: () => import('@/views/conditioning/Conditioning.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        }
    },
    {
        path: "dailyliving",
        name:'dailyliving',
        component: () => import('@/views/dailyliving/Dailyliving.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        },
    },
]