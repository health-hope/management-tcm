/**
 * @param {Boolean} cache 是否启用路由缓存
 * @param {String} title document.title字段
 */
import planRouters from './plan'
import adminRouters from './admin'
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: { cache: false, title: '中医健康管理方案' }
    },
    {
        path: '/dailylife',
        name: 'dailylife',
        component: () => import('@/views/dailyliving/Dailyliving.vue'),
        meta: { cache: false, title: '中医健康管理方案' }
    },

    {
        path: '/survey',
        name: 'survey',
        component: () => import('@/views/survey/Survey.vue'),
        meta: { cache: false, title: '中医健康管理方案' }
    },
    {
        path: '/presentation',
        name: 'presentation',
        component: () => import('@/views/presentation/Presentation.vue'),
        meta: { cache: false, title: '中医健康管理方案' }
    },
    {
        path: '/configure',
        name: 'configure',
        component: () => import('@/views/configure/Configure.vue'),
        meta: { cache: false, title: '中医健康管理方案' }
    },
    {
        path: '/risk',
        name: 'risk',
        component: () => import('@/views/configure/Risk.vue'),
        meta: { cache: false, title: '中医风险评估' }
    },
    {
        path: '/stepsport',
        name: 'stepsport',
        component: () => import('@/views/configure/StepSport.vue'),
        meta: { cache: false, title: '中医健康管理方案' }
    },
    {
        path: '/steptrainingday',
        name: 'steptrainingday',
        component: () => import('@/views/configure/StepSportTrainingDay.vue'),
        meta: { cache: false, title: '中医健康管理方案' }
    },
    {
        path: '/plan',
        component: () =>
        import('../views/plan/Index.vue'),
        children: [
            ...planRouters
        ]
    },
    {
        path: '/administration',
        component: () =>
        import('../views/Administration.vue'),
        redirect: '/administration/diet',
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        },
        children: [
            ...adminRouters
        ]
    },
    {
        path: "/operation",
        name:'c-operation',
        component: () => import('@/views/conditioning/Operation.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        }
    },
    {
        path: "/cdetail",
        name:'cdetail',
        component: () => import('@/views/conditioning/Detail.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        }
    },
    {
        path: "/timetable",
        name:'timetable',
        component: () => import('@/views/motion/Timetable.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        }
    },
    {
        path: "/tdetail",
        name:'tdetail',
        component: () => import('@/views/motion/Detail.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        }
    },
    {
        path: "/end",
        name:'end',
        component: () => import('@/views/motion/End.vue'),
        meta: {
            title: "中医心系证候管理方案",
            cache: false,
        }
    },
    {
        path: "/dietaryanalysis",
        name:'dietaryanalysis',
        component: () => import('@/views/diet/Dietaryanalysis.vue'),
        meta: {
            title: "饮食分析",
            cache: false,
        }
    },
    {
        path: '/ingredientsInfo',
        name: 'ingredientsInfo',
        component: () => import('@/views/ingredientsInfo/Ingredients.vue'),
        meta: { cache: false, title: '中医心系证候饮食推荐' }
    },
    {
        path: '/details',
        name: 'programme',
        component: () => import('@/views/details/Details.vue'),
        meta: { cache: false, title: '中医心系证候饮食推荐' }
    }
]

export default routes
