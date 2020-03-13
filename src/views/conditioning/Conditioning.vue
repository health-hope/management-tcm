<template>
    <div class="conditioning">
        <div class="programme">
            <div class="p_ctn" v-if="nursePlan.nursePlanList && nursePlan.nursePlanList.length">
                <LayBg/>
                <div class="p_top">
                    <div v-if="nursePlan.planDays > 0" class="item vux-1px">
                        <div class="tip">今日</div>
                        <div class="ctt">第{{ nursePlan.planDays }}天</div>
                    </div>
                    <div v-if="nursePlan.planDays <= 0" class="item item1 vux-1px">
                        <div class="tip">{{ `${nursePlan.startDate.substr(0,4)}-${nursePlan.startDate.substr(4,2)}-${nursePlan.startDate.substr(6,2)}` }}开始</div>
                        <div class="ctt">距离计划开始还有<span class="conts">{{ Math.abs(nursePlan.planDays)}}</span>天
                        </div>
                    </div>
                    <div class="item vux-1px">
                        <div class="tip">疗程</div>
                        <div class="ctt">{{ nursePlan.period }}周</div>
                    </div>
                    <div v-if="nursePlan.planDays > 0" class="item vux-1px">
                        <div class="tip">时长</div>
                        <div class="ctt">{{ nursePlan.timeLength?`${nursePlan.timeLength}分钟`:'-' }}</div>
                    </div>
                </div>
                <Calendar :nursePlanList="nursePlan.nursePlanList" @planDateClick="planDateClick" :scrollLeft="scrollLeft" :dateVal="dateVal1"/>
                <ul class="detail">
                    <template v-if="nursePlan.nursePlanList[dateVal].rest == 2">
                        <li class="tap_events" @click="cardDetail(item.methodId, item.lock)" v-for="(item, i) in nursePlan.nursePlanList[dateVal].nurseMethodList" :key="`date${i}`">
                            <PlanDateDetail :style="{ backgroundImage: `url(${item.imageUrl})` }" :img="item.lock==1?'ic_result_unlock.png':'ic_result_unlocked.png'" :title="item.methodName"/>
                        </li>
                    </template>
                    <template v-else>
                        <li class="xiuxi-c">
                            <img class="imgXX" :src="nursePlan.restInfo.imageUrl">
                            <div class="xiuxi">{{ nursePlan.restInfo.content }}</div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
    import Calendar from '@/components/common/Calendar.vue'
    import PlanDateDetail from '@/components/common/PlanDateDetail.vue'
    import LayBg from "@/components/common/LayBg";
    import { mapState, mapMutations } from 'vuex'
    import { apiConditioning } from '@/service/api/conditionMotion'
    export default {
        data() {
            return {
                nursePlan: {},
                dateVal: 0,
                dateVal1: 'no',
                scrollLeft: 'no',
            }
        },
        components: {
            LayBg,
            BaseZyTempTitle,
            Calendar,
            PlanDateDetail
        },
        computed: {
            ...mapState(['code', 'userInfo']),
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.scrollLeft = window.sessionStorage.getItem('c-scrollLeft')
                vm.dateVal1 = window.sessionStorage.getItem('c-dateVal')
            })
        },
        created() {
            // 获取获取中医特色调理计划首页
            this.getPlan()
        },
        methods: {
            ...mapMutations('administration', ['setTabarTopData']),
            async getPlan() {
                const data = await apiConditioning(this.code, this.userInfo.userId)
                console.log(data);
                if(data.planStatus == 1) {
                    this.setTabarTopData(data.nursePrinciple);
                    this.nursePlan = data.nursePlan
                    if(data.nursePlan.planDays > 0) {
                        this.dateVal = data.nursePlan.planDays - 1
                    }
                     console.log(this.nursePlan.nursePlanList,33)
                }else {
                    this.$router.replace('/')
                }
            },
            // 点击日期
            planDateClick(val, val1) {
                this.scrollLeft = val1
                this.dateVal = val
                this.dateVal1 = val
                console.log(this.scrollLeft,"this.scrollLeft")
                console.log(this.dateVal,"this.dateVal")
                console.log(this.dateVal1,"this.dateVal1")
            },
            // 点击穴位卡片
            cardDetail(val, lock) {
                if(lock == 1) {
                    this.$router.push({
                        name: 'c-operation',
                        query: {
                            methodId: val
                        }
                    })
                }else {
                    // 未解锁
                    this.$toast('到当天才能解锁特色调理课程哦~')
                }
            }
        },
        beforeDestroy() {
            window.sessionStorage.setItem('c-scrollLeft', this.scrollLeft)
            window.sessionStorage.setItem('c-dateVal', this.dateVal)
            this.setTabarTopData({})
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .conditioning {
        min-height: 100%;
        @include bg_color1();
        box-sizing: border-box;
        .programme {
            @include box_shodow1(0 .3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0 0 0.2rem 0.2rem;
            overflow: hidden;
            .p_ctn {
                padding: 1.4rem /* 56/40 */ 0rem /* 42/40 */ 2.8rem /* 112/40 */;
                background: #fff;
                box-sizing: border-box;
                position: relative;
                .p_top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.4rem /* 56/40 */;
                    padding: 0 1.05rem;
                    box-sizing: border-box;
                    .item {
                        width: 4.75rem /* 190/40 */;
                        height: 5.05rem /* 202/40 */;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding-left: 0.6rem /* 24/40 */;
                        box-sizing: border-box;
                        &::before {
                          @include border5(.025rem /* 1/40 */ solid);
                        }
                        .tip {
                            opacity:.6;
                            @include font_color();
                            font-size: 0.7rem /* 28/40 */;
                            line-height: 1rem /* 40/40 */;
                            margin-bottom: 0.4rem /* 16/40 */;
                        }
                        .ctt {
                            font-size: 0.9rem /* 36/40 */;
                            line-height: 1.25rem /* 50/40 */;
                            @include font_color4();
                            font-weight: bold;
                            .conts {
                                @include font_color10();
                            }
                        }
                    }
                    .item1 {
                        width: 9.95rem /* 398/40 */;
                        padding-right: 3.95rem /* 158/40 */;
                        box-sizing: border-box;
                    }
                }
                .detail {
                    margin-top: 1.4rem /* 56/40 */;
                    padding: 0 1.05rem;
                    box-sizing: border-box;
                    li + li {
                        margin-top: 0.5rem /* 20/40 */;
                    }
                    .xiuxi-c {
                        padding: 0 1.475rem /* 59/40 */;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        .imgXX {
                            width: 10.25rem /* 410/40 */;
                            height: 6.25rem /* 250/40 */;
                            margin: 0 auto 1.15rem /* 46/40 */;
                        }
                        .xiuxi {
                            font-size: 0.7rem /* 28/40 */;
                            line-height: 1rem /* 40/40 */;
                            color: #999999;
                            text-align: center;
                        }
                    }
                }
            }
        }
        .plan_btn {
            width: 6.5rem /* 260/40 */;
            height: 2.5rem /* 100/40 */;
            margin: 1.1rem /* 44/40 */ auto 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            @include box_shodow3(0 0.3rem /* 12/40 */ 0.75rem /* 30/40 */ 0);
            border-radius: 1.25rem /* 50/40 */;
            @include font_color1();
            font-size: 0.9rem;
            font-weight: bold;
            background-repeat: no-repeat;
            background-size: 5.9775rem /* 239.1/40 */ 2.025rem /* 81/40 */;
            background-position: center center;
        }
    }
</style>