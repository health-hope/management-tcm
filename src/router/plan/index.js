

export default [
    {
        path: "foodRecommendList",
        name:'foodRecommendList',
        component: () => import('@/views/plan/FoodRecommendList.vue'),
        meta: {
            title: "健康管理方案",
            cache: false,
            isTab: true,
            // required: true, //权限
            isFull:true
        },
    }
    // ,
    // {
    //     path: "foodrecommendlist",
    //     component: () => import("@/views/plan/FoodRecommendList.vue"),
    //     name: "foodrecommendlist",
    //     meta: {
    //         title: "食谱推荐",
    //         cache: false,
    //         isTab: false,
    //         isFull: true,
    //     },
    // }
    ,
    {
        path: "foodcustom",
        component: () => import('@/views/plan/FoodCustom.vue'),
        meta: {
            title: "自定义饮食",
           
            isTab: false,
            isFull: true,
        },
    }
    ,
    {
        path: "detail",
        component: () => import('@/views/plan/FoodDetail.vue'),
        name: "foodDetail",
        meta: {
            title: "食物详情",
            cache: false,
        },
        beforeEnter(to, from, next) {
            if (to.query.type == "2" ) //1 食物 2 运动
                to.meta.title = "运动详情"
            else
                to.meta.title = "食物详情"

            next();
        }
    }
    ,
    {
        path: "foodastimate/:foodId/:metrologyTag",
        component: () => import('@/views/plan/FoodAstimate.vue'),
        name: "foodastimate",
        meta: {
            title: "估算食物重量",
            cache: false,
            isTab: false,
            isFull: true,
        },
    }
    // ,
    // {
    //     path: "foodrecommendpage",
    //     component: () => import('@/views/plan/FoodRecommendationPage.vue'),
    //     meta: {
    //         title: "食谱推荐页",
    //         cache: true,
    //     },
    // }
    ,
    {
        path: "foodsearch",
        name: "foodSearch",
        component: () => import('@/views/plan/FoodSearch.vue'),
        meta: {
            title: "饮食记录",
            cache: true,
        },
    },
    // {
    //     path: "sportsearch",
    //     component: () => import('@/views/plan/SportSearch.vue'),
    //     meta: {
    //         title: "运动推荐页",
    //         cache: false,
    //     },
    // },
    // {
    //     path: "foodanalysis",
    //     component: () => import('@/views/plan/FoodAnalysis.vue'),
    //     meta: {
    //         title: "饮食分析",
    //         cache: false,
    //     },
    // },
    // {
    //     path: "sportrecommendlist",
    //     component: () => import('@/views/plan/SportRecommendList.vue'),
    //     meta: {
    //         title: "运动推荐",
    //         cache: false,
    //         isFull: true,
    //     },
    // },
    // {
    //     path: "sportcustom",
    //     component: () => import('@/views/plan/SportCustom.vue'),
    //     meta: {
    //         title: "自定义运动",
            
    //         isTab: false,
    //         isFull: true,
    //     },
    // },
]

