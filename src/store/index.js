import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import configure from './modules/configure'
import plan from "./modules/plan"
import administration from './modules/administration'
import createPersistedState from 'vuex-persistedstate'
const store = new Vuex.Store({
    state: {
        code: '',
        courseKind: '',
        userInfo: {},
        listObj: {},
        startTime: 0,
        dialogShow: false
    },
    mutations: {
        setCode(state, paylod) {
            state.code = paylod
            switch (paylod) {
                case "1":
                    state.courseKind = "37"
                    break;
                case "2":
                    state.courseKind = "38"
                    break;
                case "3":
                    state.courseKind = "39"
                    break;
                case "4":
                    state.courseKind = "40"
                    break;
                case "5":
                    state.courseKind = "41"
                    break;
                case "6":
                    state.courseKind = "42"
                    break;
                case "7":
                    state.courseKind = "43"
                    break;
                case "8":
                    state.courseKind = "44"
                    break;
                case "9":
                    state.courseKind = "45"
                    break;
                default:
                    break;
            }
        },
        setUserId(state, paylod) {
            state.userInfo.userId = paylod
        },
        setWeight(state, paylod) {
            state.userInfo.weight = paylod
        },
        setHeight(state, paylod) {
            state.userInfo.height = paylod
        },
        setBirthday(state, paylod) {
            state.userInfo.birthday = paylod
        },
        setGender(state, paylod) {
            state.userInfo.gender = paylod
        },
        setActivityLevel(state, paylod) {
            state.userInfo.activityLevel = paylod
        },
        setEvaluationId(state, paylod) {
            state.evaluationId = paylod
        },
        setListObj(state, paylod) {
            state.listObj = paylod
        },
        setStartTime(state, paylod) {
            state.startTime = paylod
        },
        setConsumedKcal(state, paylod) {
            state.consumedKcal = paylod
        },
        setDialogShow(state, paylod) {
            state.dialogShow = paylod
        }
    },
    modules: {
        configure,
        plan,
        administration
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})
export default store
