import request from '../../request'

/**
 * @desc 获取食物推荐列表
 * @param {Object} param0 
 * @property {String} mealType 0 默认 1 早餐 2 午餐 3 晚餐 4 早加餐5 午加餐 6 晚加餐
 * @param {String} userId 用户id
 */
export const getFoodRecommondList = (mealType, pageInfo,userId) => request("/ego-gw/health/module/common/food/list.do", { mealType, pageInfo ,userId}, { enterSilence: true });
/**
 * @desc 获取自定义列表
 * @param {String} userId 用户id
 */
export const getFoodCustomList = (pageInfo,userId) => request("/ego-gw/health/module/custom/food/list.do", { pageInfo,userId }, { enterSilence: true });
/**
 * @desc 获取单个食物详情
 */
export const getFoodDetail = (foodId) => request("/ego-gw/health/module/record/param/food/detail.do", { foodId }, { enterSilence: true, loading: true });
/**
 * @desc 度量衡分类列表
 */
export const getFoodAstimateInfo = (foodId) => request("/ego-gw/health/module/food/metrology/type/list.do", { foodId }, { enterSilence: true, loading: true });
/**
 * @desc 保存自定义食物信息
 */
export const saveFoodCustomForm = (foodName, count, unit, kilocalorie, image,userId) => request("/ego-gw/health/module/custom/food/save.do", { foodName, count, unit, kilocalorie, image ,userId}, { enterSilence: true, loading: true })
/**
 * @desc 获取运动推荐列表
 */
export const getSportRecommondList = (userId, pageInfo) => request("/ego-gw/health/module/usual/sport/list.do", { userId, pageInfo }, { enterSilence: true })
/**
 * @desc 记录饮食 
 */
export const saveFoodRecordData = (recordDate, recordList,userId) => request("/ego-gw/health/module/record/food/save.do", { recordDate,recordList ,userId})
/**
 * @desc 常见运动列表 
 */
export const getSportRecommondData = (pageInfo) => request("/ego-gw/health/module/usual/sport/list.do", { pageInfo }, { enterSilence: true, loading: true })
/**
 * @desc 用户个人自定义运动列表
 */
export const getSportCustomList = (pageInfo) => request("/ego-gw/health/module/user/custom/sport/list.do", { pageInfo }, { enterSilence: true });
/**
 * @desc  保存自定义运动信息
 */
export const saveSportCustomForm = (exerciseName, count,unit, kilocalorie, image) => request("/ego-gw/health/module/user/custom/sport/save.do", { exerciseName, count,unit, kilocalorie, image }, { enterSilence: true, loading: true })
/**
 * 记录运动
 */
export const saveSportRecordData = (recordDate, recordList) => request("/ego-gw/health/module/exercise/save.do", { recordDate, recordList }, { enterSilence: true, loading: true })
/**
 * @desc 搜索系统食物
 */
export const searchFoodList = (criteria, pageInfo) => request("/ego-gw/health/module/record/search/system/food/list.do", { criteria, pageInfo }, { enterSilence: true })
/**
 * @desc 搜素系统运动 
 */
export const searchSportList = (criteria, pageInfo) => request("/ego-gw/health/module/search/system/exercise/list.do", { criteria, pageInfo }, { enterSilence: true })
/**
 * @desc 获取系统运动详情 
 */
export const getSportDetail = (exerciseId) => request("/ego-gw/health/module/usual/sport/detail.do", { exerciseId }, { enterSilence: true, loading: true })
/**
 * @desc 删除自定义食物
 */
export const delCustomerFood = (foodId) => request("/ego-gw/health/module/custom/food/delete.do", { foodId }, { enterSilence: true, loading: true })
/**
 * @desc 删除自定义运动
 */
export const delCustomerSport = (exerciseId) => request("/ego-gw/health/module/user/custom/sport/delete.do", { exerciseId }, { enterSilence: true, loading: true })
/**
 * 方案首页数据
 * @param {String} recordeDate 记录日期
 * @param {String} moduleCode 方案类型
 */
export const apiPlanIndex = (recordDate, moduleCode) => request('/ego-gw/health/module/plan/index.do', { recordDate, moduleCode }, { loading: true })
/**
 * 计划日历
 * @param {*} recordeDate 记录日期
 */
export const apiPlanGetCalendar = (recordDate) => request('/ego-gw/health/module/calendar/list.do', { recordDate })
/**
 * 计划打卡
 * @param {*} adviceId 生活建议ID
 */
export const apiPlanPunch = (adviceId,recordDate) => request('/ego-gw/health/module/advice/punch.do', { adviceId,recordDate }, { loading: false })
/**
 * 饮食分析结果
 * @param {*} recordDate 记录日期
 */
export const apiPlanMealAnalysisResult = (recordDate) => request('/ego-gw/health/module/meal/analysis/result.do', {recordDate}, { loading: true })
/**
 * 获取食谱推荐列表
 * @param {String} recipesDate 记录日期
 * @param {String} changeFlag   修改标志 1 修改加餐选择 2 不修改
 * @param {String} moduleCode  方案类型
 */
export const getRecipes = (recipesDate, extraMealList, changeFlag, moduleCode) => request('/ego-gw/health/module/meal/recommend.do', { recipesDate, extraMealList, changeFlag, moduleCode }, { loading: true })
/**
 * 食谱推荐的换一换
 * @param {String} userId
 * @param {String} recipesDate 日期
 * @param {String} mealType 餐别
 * @param {String} foodId 食物Id
 * @param {String} foodHeat 食物热量
 * @param {String} moduleCode  方案类型
 */
export const apiChangement = (recipesDate, mealType, foodId, foodHeat, moduleCode) => request('/ego-gw/health/module/matching/diet/changement/query.do', { recipesDate, mealType, foodId, foodHeat, moduleCode }, { loading: true })
/**
 * 请求单个食物估算
 * @param {String} foodId 食物Id
 */
export const apiFoodlist = (foodId) => request('/ego-gw/health/module/food/metrology/detail.do', { foodId }, { loading: true })