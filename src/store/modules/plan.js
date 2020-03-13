import Vue from "vue";
import merge from "merge";
const plan = {
    namespaced: true,
    state: {
        deviceInfo: {

        },
        dateObj: {
        },//日期
        /**
         * 激活的食物详情
         * @property {array} extensionUnits 扩展单位 用于滑动标尺
         * @property {object} extensionUnits[index] //扩展单位选项
         * @property {number} activeIndex 被激活的扩展单位索引 若不传 则扩展单位列表长度大于1 切 第一个扩展单位为 毫升或者克的时候 赋值为1 否则为0
         * @property {}
         * 
         */
        activeFoodDetail: {
            extensionUnits: [

            ],
        },
        foodType: 1,// 展示的食物类型  1 常见 2自定义
    },
    mutations: {
        /**
         * @desc 更新设备信息
         * @param {object} param0  state
         * @param {object} payload 参数
         * @property {number} payload.wh //设备高度
         */
        updateDeviceInfo(state, payload) {
            const { deviceInfo } = state;
            Object.assign(deviceInfo, payload);
            Vue.set(state, "deviceInfo", payload);
        },
        //覆盖被激活的食物详情
        COVER_ACTIVE_FOOOD_DETAIL(state, payload) {
            state.activeFoodDetail = payload;
        },
        // 合并被激活的食物详情
        MERGE_ACTIVE_FOOOD_DETAIL(state, payload) {
            state.activeFoodDetail = merge.recursive(true, state.activeFoodDetail, payload)
        },
        UPDATE_FOOD_TYPE(state, payload) {
            state.foodType = payload
        },
        //更新记录时间
        SET_DATEOBJ: (state, date) => {
            state.dateObj = date
        },
    },
    /**
     * 提交mutations行为，异步
     */
    actions: {
        setDateObj({ commit }, date) {
            commit('SET_DATEOBJ', date)
        }
    },
    /**
     * 计算属性，派生state值
     */
    getters: {
        dateObj: state => {
            return state.dateObj
        }
    }
}
export default plan;

