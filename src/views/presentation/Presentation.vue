<template>
    <div class="presentation">
        <div class="zy-content-main">
            
            <div class="zy_item_temp" v-for="(item,index) in reportContent" :key="index">
                <!-- 无状态模版 （good） -->
                <div v-if="item.templateType =='ZY_RESULT_GOOD'">
                    <TheZyResultGood @hook:mounted="onshow" :tempData="item.template" />
                </div>
                <!-- 有数据 -->
                <div v-if="item.templateType == 'ZY_RESULT'">
                    <TheZyResult :tempData="item.template" />
                </div>
                <!-- 中医证候分布模板 -->
                <div class="pt-list" v-if="item.templateType == 'ZY_ZH_FB'">
                    <TheZyZhFb :tempData="item.template" @hook:mounted="onshow" :code="codeType"/>
                </div>
                <!-- 中医介绍症状模板 -->
                <div class="pt-list" v-if="item.templateType == 'ZY_JS_ZZ' || item.templateType == 'ZY_ZZ_LY'">
                    <TheZyJsZz :tempData="item.template" :type="item.templateType"/>
                </div>
                <!-- 疾病风险 -->
                <div class="pt-list" v-if="item.templateType == 'ZY_JB_FX'">
                    <TheZyJbFx :tempData="item.template" />
                </div>
            </div>
        </div>
    
        <div class="btn-box" v-show="show">
            <div :style="{backgroundImage: 'url(jgy_button_bg_bai.png)'} | PUBLIC_PATH" class="btn btn-reval tap_events" @click="handleGoPage1()">重新测评</div>
            <div :style="{backgroundImage: 'url(jgy_button_bg_huang.png)'} | PUBLIC_PATH" class="btn btn-plan tap_events" @click="handleGoPage('/configure')">方案定制</div>
        </div>
    
        <!-- <div class="reference-box rel" v-show="show">
            <LayBg bg1="bg_purple_top_left.png" bg2="bg_purple_upper_right.png" bg3="bg_purple_sit_down.png" bg4="bg_purple_bottom_right.png"/>
            <div class="reference-con">
                <div class="title">参考文献</div>
                <div class="reference-list">
                    <div class="item" v-for="(item,index) in references" :key="index">{{ item }}</div>
                </div>
            </div>
        </div> -->
    
    </div>
</template>

<script>
import LayBg from "@/components/common/LayBg";
import { getUrlParam } from '@/assets/js/util.js'
import { apiLatestData } from '@/service/api/home'
//无状态模版
const TheZyResultGood = () =>
    import ('./TheZyResultGood');
//有数据
const TheZyResult = () =>
    import ('./TheZyResult');
//中医证候分布模板
const TheZyZhFb = () =>
    import ('./TheZyZhFb');
//中医介绍症状模板
const TheZyJsZz = () =>
    import ('./TheZyJsZz');
//疾病风险
const TheZyJbFx = () =>
    import ('./TheZyJbFx');

import setFontColot from "@/assets/js/setFootColor";
import { apiZyCpReport } from '@/service/api/presentaion';
import { isEmpty } from '@/assets/js/util';
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            reportContent: [], //报告结果
            references: [], //参考文献
            show: false,
            codeType:"",
            isGoBack:false, //是否可以返回
        };
    },
    components: {
        LayBg,
        TheZyResultGood,
        TheZyResult,
        TheZyZhFb,
        TheZyJsZz,
        TheZyJbFx,
    },
    computed: {
        ...mapState(['evaluationId'])
    },
    async created() {
        this.codeType = getUrlParam('code');
        let isGoBack  = this.$route.query.isGoBack;
        if(isGoBack !== "isGoBack"){
            this.isGoBack = true;
        }
        this.$loading.show();
        await this.searchId();
        await this.getData();
        
    },
    methods: {
        ...mapMutations(['setEvaluationId']),
        async searchId() {
            let evaluationCode = getUrlParam('code')
            let userId = getUrlParam('user-id')
            if(evaluationCode && userId) {
                const res = await apiLatestData(evaluationCode, userId)
                if (res.evaluationId) {
                    this.setEvaluationId(res.evaluationId)
                }
            }
        },
        onshow() {
            // 监听 echarts渲染结束 再显示页面
            this.$nextTick(() => {
                this.$loading.hide();
                this.show = true
            })
        },
        getData() {
            apiZyCpReport(this.evaluationId, false)
                .then(res => {
                    if (!isEmpty(res.references)) {
                        this.references = res.references;
                    }
                    if (!isEmpty(res.reportContent)) {
                        this.reportContent = res.reportContent;
                    }
                })
                .catch(() => {})
        },
        /**
         * 跳转页面
         * @parmas {String} path: 路径
         */
        handleGoPage(path) {
            this.$router.push({
                path: path
            });
        },
        handleGoPage1() {
            this.$router.push('/survey')
        },
        handleGoBack(){
            this.$router.back(-1)
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.rel {
    position: relative;
}

.presentation {
    min-height: 100%;
    @include bg_color1();
    padding: 0.8rem 0.75rem 1.7rem 0.75rem;
    .zy-content-main {
        min-height: 18rem;
    }
    .pt-list {
        display: flex;
        flex-direction: column;
    }
    .btn-box {
        margin-top: 1.1rem;
        display: flex;
        justify-content: space-between;
        .btn {
            font-size: 0.9rem;
            border-radius: 1.25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
        }
        .btn-reval {
            width: 6.5rem;
            height: 2.5rem;
            @include bg_color6();
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 5.975rem /* 239/40 */ 2rem /* 80/40 */;
            @include font_color1();
            @include box_shodow3(0 0.3rem 0.75rem 0);
        }
        .btn-plan {
            width: 10.25rem;
            height: 2.5rem;
            @include bg_color();
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 9.725rem /* 389/40 */ 2rem /* 80/40 */;
            @include font_color6();
            @include box_shodow(0 0.3rem 0.75rem 0);
        }
    }
    .reference-box {
        margin-top: 1.1rem;
        padding: 0.9rem 1.05rem;
        @include bg_color9();
        border-radius: 0.2rem;
        .reference-con {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title {
                font-size: 0.7rem;
                @include font_color();
                font-weight: bold;
            }
            .reference-list {
                margin-top: 0.4rem;
                .item {
                    display: flex;
                    justify-content: center;
                    font-size: 0.6rem;
                    @include font_color();
                    line-height: 0.825rem;
                }
            }
        }
    }
}
</style>
