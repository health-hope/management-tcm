import request from '../../request'
/**
 * 获取中医测评题库
 * @param {String} code 测评编码
 * @param {String} userInfo 用户信息
 * 
 */
export const apiSurveyData = (code, userInfo) => request('/ego-gw/v3/tcm/evaluation/subject.do',{ code, userInfo }, { loading: false })
/**
 * 保存用户信息和测评结果。
 * @param {String} quesBankId 题库id
 * @param {String} code 测评编码
 * @param {String} userInfo 用户信息
 * @param {String} userOptions 用户测评选项
 */
export const apiSaveSurveyData = (quesBankId, code, userInfo, userOptions) => request('/ego-gw/v3/tcm/evaluation/data/save.do',{ quesBankId, code, userInfo, userOptions })
