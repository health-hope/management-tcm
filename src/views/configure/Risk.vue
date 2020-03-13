<template>
    <div class="risk" v-if="riskData.title">
        <div class="ctn">
            <LayBg/>
            <Template1 :data="riskData"/>
        </div>
        <div 
            class="btn tap_events"
            @click="start"
            :style="{backgroundImage: 'url(btn_bg_condition_yellow_program.png)'}  | PUBLIC_PATH"
        >确认无以上情况</div>
    </div>
</template>
<script>
import LayBg from '@/components/common/LayBg';
import Template1 from '@/components/common/Template1'
import { mapState } from 'vuex'
import { apiGetSportRisk } from '@/service/api/sport'
export default {
    data() {
        return {
            riskData: {content:["血糖明显升高，超过16.7mmol/L，尤其是尿酮体阳性患者；","明显的低血糖症或者血糖波动大，发作时血糖低于4.0mmol/L；","未控制的高血压，血压超过180/120mmHg；","严重冠心病或心功能不全，稍微活动一下就感觉胸闷、气喘的患者；","严重糖尿病肾病或肾功能不全，应咨询医师后选择合理的运动；","严重的眼底病变，眼科检查提示有眼底出血者，应咨询医师后选择合理运动；","近期发生的血栓，应先去医院进行早期卒中康复训练，待病情稳定后再进行运动；","关节畸形及功能障碍，被诊断为严重痛风，应咨询医师后选择合理运动；","骨密度小于-2.5，同时伴有骨质疏松性骨折的时候，被诊断为重度骨质疏松；","患有急性脂肪肝或处于脂肪性肝炎活动期；","患有严重脑卒中，尤其有严重合并症或严重系统性并发症；","身体活动受限，尤其不能正常行走，视物重影或偏盲；","目前体重超过了标准体重的50%以上，被医院诊断出重度脂肪肝或肥胖症。"],title:"是否存在一种或者几种以下情况？如存在，本运动计划并不适合您。"}
        }
    },
    components: {
        LayBg,
        Template1
    },
    computed: {
        ...mapState(['code', 'userInfo', 'courseKind']),
    },
    created() {
        this.getRiskEvaluation()
    },
    methods: {
        async getRiskEvaluation() {
            const data = await apiGetSportRisk(this.code)
            this.riskData = data.riskEvaluation
        },
        start() {
            this.$router.push('/stepsport')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.risk {
    width: 100%;
    min-height: 100%;
    padding: .8rem /* 32/40 */ .75rem /* 30/40 */ 4.6rem /* 184/40 */;
    box-sizing: border-box;
    @include bg_color1();
    .ctn {
        position: relative;
        background: #FFFFFF;
        @include box_shodow1(0 .3rem /* 12/40 */ 1rem /* 40/40 */ 0);
        border-radius: .2rem /* 8/40 */;
        padding: 1.4rem /* 56/40 */ .8rem /* 32/40 */;
        box-sizing: border-box;
    }
    .btn {
        width: 10.25rem /* 410/40 */;
        height: 2.5rem /* 100/40 */;
        @include box_shodow(0 12px 30px 0);
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        @include font_color6();
        position: fixed;
        bottom: 1rem /* 40/40 */;
        left: 50%;
        transform: translateX(-50%);
        background-position: center center;
        @include bg_color();
        background-repeat: no-repeat;
        background-size: 9.7275rem /* 389.1/40 */ 2rem;
        font-weight: bold;
    }
}
</style>
