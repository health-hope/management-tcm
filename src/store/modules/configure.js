import { stat } from "fs";

const configure = {
    namespaced: true,   // 开启命名空间
    state: {
        sportEvaluationId: '',
        sportWayCode: '',
        nurseList: {},
        weekPlanDate: {},
        dietRecommend: {},
        userQuesOptionsAnser: {},
        weeklyExerciseFrequencies: {}
    },
    /**
     * 同步改变state
     */
    mutations: {
        setSportEvaluationId(state, paylod) { 
            state.sportEvaluationId = paylod
        },
        setNurseList(state, paylod) {
            state.nurseList = paylod
        },
        setWeekPlanDate(state, paylod) {
            state.weekPlanDate = paylod
        },
        setDietRecommend(state, paylod) {
            state.dietRecommend = paylod
        },
        setSportWayCode(state, paylod) { 
            state.sportWayCode = paylod
        },
        setUserQuesOptionsAnswer(state, paylod) { 
            state.userQuesOptionsAnser = paylod
        },
        setWeeklyExerciseFrequencies(state, paylod) { 
            state.weeklyExerciseFrequencies =paylod
        }
    },
    /**
     * 异步改变state
     */
    actions: {
        
    },
    /**
     * 计算属性
     */
    getters: {
        
    }
}
export default configure
