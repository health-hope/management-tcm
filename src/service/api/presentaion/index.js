import request from '../../request'

/**
 * 测评报告
 * @param {String} evaluationId 测评id
 */
export const apiZyCpReport = (evaluationId, loading=true) => request("/ego-gw/v3/tcm/evaluation/report.do", { evaluationId }, { loading });