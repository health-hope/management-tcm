<template>
    <div id="app" v-cloak>
        <keep-alive>
            <!-- <transition name="fade" mode="out-in"> -->
                <router-view v-if="$route.meta.cache"></router-view>
            <!-- </transition> -->
        </keep-alive>
        <transition name="fade"  mode="out-in">
            <router-view v-if="!$route.meta.cache"></router-view>
        </transition>
    </div>
</template>
<script>
import { getUrlParam } from '@/assets/js/util.js'
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            onLine: navigator.onLine,
        }
    },
    computed: {
        ...mapState(['code'])
    },
    created() {
        let code = getUrlParam('code')
        let userId = getUrlParam('user-id')
        if(code) {
            this.setCode(code)
        }else {
            this.$toast('测评编码不能为空！')
        }
        if(userId) {
            this.setUserId(userId)
        }
    },
    mounted() {
        if(this.code==1||this.code==7){
            // 1 是心系 7 是小肠
            window.document.documentElement.setAttribute('data-theme', this.code==7?1:1)
        }
        if(this.code==2||this.code==9){
            // 2 是肝系 9 是胆
            window.document.documentElement.setAttribute('data-theme', this.code==9?2:2)
        }
        if(this.code==3||this.code==8){
            // 3是肺系 8是大肠
            window.document.documentElement.setAttribute('data-theme', this.code==8?3:3)
        }
        if(this.code==4||this.code==5){
            // 4是脾系 5是胃肠
            window.document.documentElement.setAttribute('data-theme', this.code==5?4:4)
        }
        if(this.code==6){
            // 6是肾系
            window.document.documentElement.setAttribute('data-theme', this.code)
        }
        window.addEventListener('offline', this.updateOnlineStatus);
    },
    methods: {
        ...mapMutations(['setCode', 'setUserId']),
        updateOnlineStatus(e) {
            const { type } = e;
            this.onLine = type === 'online';
            if(this.onLine !== 'online') {
                this.$toast('网络好像有点问题，请检查后重试！')
            }
        }
    },
    beforeDestroy(){
        window.removeEventListener('offline', this.updateOnlineStatus);
    }
}
</script>
<style lang="less">
    //  1px 解决方案
    @import "~vux/src/styles/1px.less";
    html,body,#app {
        width:100%;
        height: 100%;
        
        
    }
</style>
