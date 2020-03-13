const administration = {
    namespaced: true,   // 开启命名空间
    state: {
        tabarTopData: {},
    },
    /**
     * 同步改变state
     */
    mutations: {
        setTabarTopData(state, paylod) {
            state.tabarTopData = paylod
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
export default administration
