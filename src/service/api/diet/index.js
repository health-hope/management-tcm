import request from '../../request'
/**
 * 获取中医饮食推荐计划页。
 * @param {String} code 
 * @param {String} userId 
 */
export const apiDiet = (code, userId) => request('/ego-gw/v3/tcm/manage/plan/food/matching/index.do',{ code, userId })


/**
 * 加载中医生成食谱接口。
 * @param {String} code 中医证候类型
 * @param {String} userId 用户Id
 * @param {String} dayLength 周期 范围1-31天 默认7天(配置文件形式提供)
 * @param {String} isCreated 是否重新生成 1：重新生成 
 */
export const apiRecommendation = (code,userId,dayLength,isCreated) => request('/ego-gw/v3/tcm/food/matching/diet/recommendation/query.do', { code,userId,dayLength,isCreated })

/**
 * 食谱详情
 * @param {String} code 中医证候类型
 * @param {String} userId 用户Id
 * @param {Object} recipesDate 食谱日期
 */
export const apiDietDetail = (code,userId,recipesDate) => request('/ego-gw/v3/tcm/plan/food/matching/diet/detail/query.do', { code,userId,recipesDate })

/**
 * 换一换
 * @param {String} code 中医配餐类型
 * @param {String} userId 用户Id
 * @param {String} foodId 食物id
 * @param {Object} foodName 食物名称
 * @param {Object} foodHeat 食物热量
 * @param {Object} initialHeat 食物初始热量
 * @param {Object} mealType 餐别
 * @param {Object} recipesId 食谱id
 * @param {Object} recipesDate 食谱日期,格式yyyy-MM-dd
 */
export const apiChangement = (code,userId,foodId,foodName,foodHeat,initialHeat,mealType,recipesId,recipesDate) => request('/ego-gw/v3/tcm/food/matching/diet/changement/query.do', { code,userId,foodId,foodName,foodHeat,initialHeat,mealType,recipesId,recipesDate })

/**
 * @desc 饮食分析结果页 
 * @param {String} userId 用户Id
 * @param {String} recordDate 记录日期:格式”yyyyMMdd”，为空默认为当前系统日期。
 */
export const apiMealData = (userId, recordDate) => request("/ego-gw/health/module/meal/analysis/result.do", { userId, recordDate })
export const apiSaveFoodRecordData = (recordDate, recordList,userId) =>  request("/ego-gw/health/module/record/food/save.do", { recordDate,recordList,userId })
