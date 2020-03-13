import request from '../../request'
/**
 * 获取获取中医特色调理计划首页。
 * @param {String} code 
 * @param {String} userId 
 */
export const apiConditioning = (code, userId) => request('/ego-gw/v3/tcm/manage/nurse/plan/index.do',{ code, userId })
/**
 * 获取中医特色调理疗法详情
 * @param {String} methodId 疗法ID
 */
export const apiTherapyDetail = (methodId) => request('/ego-gw/v3/tcm/nurse/method/detail.do',{ methodId })
/**
 * 获取中医特色调理穴位详情
 * @param {String} acupointName 穴位名称
 */
export const apiAcupointDetail = (acupointName) => request('/ego-gw/v3/tcm/nurse/acupoint/detail.do',{ acupointName })
/**
 * 运动计划首页
 * @param {String} userId 用户ID
 * @param {String} code  脏腑类型
 */
export const apiGetPlan = (userId, code) => request('/ego-gw/v3/manage/course/tcm/index.do',{ userId, code })
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