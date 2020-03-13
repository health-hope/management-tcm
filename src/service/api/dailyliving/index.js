import request from '../../request'

/**
 * 中医起居首页
 * @param {String} userId 用户ID
 * @param {String} code  脏腑类型
 */
export const apiDailyliving = (userId, code) => request('/ego-gw/v3/tcm/manage/daily/life/index.do',{ userId, code }, { enterSilence: true, loading: true })

/**
 * 中医起居打卡
 * @param {String} userId 用户ID
 * @param {String} code  脏腑类型
 * @param {String} dlId  调理id
 */
export const apiDailylivingPunch = (userId, code, dlId) => request('/ego-gw/v3/tcm/daily/life/punch.do',{ userId, code, dlId}, { loading: false })
