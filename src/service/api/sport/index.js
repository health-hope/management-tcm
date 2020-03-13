import request from '../../request'

/**
 * 获取中医运动计划风险评估
 * @param {String} code 中医X系类型编码， 
 */
export const apiGetSportRisk = (code) => request('/ego-gw/v3/tcm/manage/sport/risk/load.do',{code })
/**
 * 获取运动计划测评题
 * @param {String} code 中医X系类型编码， 
 * @param {String} userId
 * @param {String} sportWayCode  运动方式
 */
export const apiGetSportEvalutionList = (code,resultCode, userId, sportWayCode) => request('/ego-gw/v3/tcm/manage/sport/evaluation/subject.do', { code,resultCode, userId, sportWayCode })
/**
 * 中医运动计划保存测评结果
 * @param {String} courseKind 运动计划类型，
 * @param {String} userId 
 * @param {String} userOptions 用户测评选项， 
 * @param {String} evaluationId  用户测评结果预创建Id
 */
export const apiSaveCourse = (code,resultCode, userId, userOptions, evaluationId) => request('/ego-gw/v3/tcm/manage/evaluation/data/save.do',{ code,resultCode, userId, userOptions, evaluationId })
/**
 * 创建运动计划
 * @param {String} courseKind 运动计划类型，
 * @param {String} userId 
 * @param {String} evaluationId 测评结果ID 
 * @param {String} beginDate  运动计划开始日期
 * @param {String} weeklyExerciseDays  选择周运动日期，取值范围1-7，对应周一至周日
 * @param {String} weekCount  运动计划周数
 */
export const apiSavePlan = (courseKind, userId, evaluationId, beginDate, weeklyExerciseDays, weekCount) => request('/ego-gw/v2/course/create.do',{ courseKind, userId, evaluationId, beginDate, weeklyExerciseDays, weekCount })
/**
 * 运动计划首页
 * @param {String} userId 用户ID
 * @param {String} courseId  运动计划ID
 */
export const apiGetPlan = (userId, courseId) => request('/ego-gw/v2/course/tcm/index.do',{ userId, courseId })
/**
 * GIF图文的方式，执行动作拼接运动。
 * @param {String} userId 用户ID
 * @param {String} courseId  运动计划ID
 * @param {String} courseSeq  运动计划第几天/节
 * @param {String} moduleId  运动组件ID
 * @param {String} moduleType  运动组件类型，
 * @param {Object} pageRequest  请求分页信息，
 */
export const apiGetList = (userId, courseId, courseSeq, moduleId, moduleType, pageRequest) => request('/ego-gw/v2/course/tcm/action/gif/module/execute.do',{ userId, courseId, courseSeq, moduleId, moduleType, pageRequest })
/**
 * 中医退出运动计划
 * @param {String} userId 用户ID
 * @param {String} exitWay  退出方式，  2 
 */
export const apiSetPlan = (userId, courseKind, exitWay) => request('/ego-gw/v2/course/tcm/modify.do',{ userId, courseKind, exitWay })

/**
 * 结束训练
 * @param {String} recordDate 记录日期，
 * @param {String} userId  用户ID
 * @param {String} courseId  运动计划ID
 * @param {String} courseSeq  运动计划第几天/节
 * @param {String} moduleId  运动组件ID
 * @param {String} moduleType  运动组件类型，
 * @param {String} executeSecond  用时，
 */
export const apiEnd = (recordDate, userId, courseId, courseSeq, moduleId, moduleType, executeSecond) => request('/ego-gw/v2/course/tcm/gif/consume/save.do',{ recordDate, userId, courseId, courseSeq, moduleId, moduleType, executeSecond })