import request from '../../request'
/**
 * 加载中医管理方案封面内容。
 * @param {String} code 
 * @param {String} channel 值为5 为了区分用户年龄限制
 */
export const apiHomeData = (code,channel='5') => request('/ego-gw/v3/tcm/plan/brief/index.do', { code, channel })

/**
 * 获取管理方案配置信息
 * @param {String} code 脏腑系列
 * @param {String} userId 用户id
 */
export const apiConfig = (code,userId) => request('/ego-gw/v3/tcm/manage/config/load.do', { code ,userId})
/**
 * 查询最新测评结果
 * @param {String} code 脏腑系列
 * @param {String} userId 用户id
 */
export const apiLatestData = (code, userId) => request('/ego-gw/v3/tcm/evaluation/latest/result.do', { code, userId })

/**
 * 
 * @param {String} code 脏腑系列
 * @param {String} userId 用户id
 * @param {String} evaluationId 用户运动评测id
 * @param {String} weeklyExerciseDays list选择一周运动日 1-7
 * @param {String} dietRecommend object 饮食偏好
 * @param {String} weekPlanDate list每周调理日
 * @param {String} nurseList list 调理方法
 */
export const apiSaveConfig = (resultCode,code, userId, evaluationId, weeklyExerciseDays, dietRecommend, weekPlanDate, nurseList
    ) => request('/ego-gw/v3/tcm/manage/config/save.do', { resultCode,code, userId, evaluationId, weeklyExerciseDays, dietRecommend, weekPlanDate, nurseList,resultCode
    })
