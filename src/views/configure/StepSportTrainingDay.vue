<template>
    <div class="step3">
        <!-- 心系证候类型 -->
        <div class="type">
            <div class="ctn">
                <LayBg/>
                 <div class="multipleTitle">请选择{{ counts }}天作为训练日</div>
                 <ul class="multiple-c">
                    <li
                        @click="multipleClick(i)"
                        :class="!item.check?'vux-1px tap_events':'select vux-1px tap_events'"
                        v-for="(item, i) in multiple"
                        :key="i"
                    >{{ item.name }}</li>
                 </ul>
            </div>
        </div>
        <div
            @click="saveClick"
            :class="saveFlag?'save tap_events':'save saveSelect tap_events'"
            :style="{backgroundImage: saveFlag?'url(btn_bg_condition_yellow_program.png)':'url(btn_bg_condition_yellow_program_enabled.png)'} | PUBLIC_PATH"
        >生成方案</div>
    </div>
</template>
<script>
    import LayBg from '@/components/common/LayBg';
    import Multiple from '@/components/common/MultipleSelection.vue'
    import Cell from '@/components/common/Cell';
    import { TransferDomDirective as TransferDom, XDialog, DatetimeView, Picker } from 'vux'
    import { mapState, mapMutations } from 'vuex'
    import { apiSavePlan, apiSetPlan } from '@/service/api/sport'
    import {apiSaveConfig} from '@/service/api/home'
import { all } from 'q';
    export default {
        data() {
            return {
                counts: '',
                multiple: [{ name: "周一", id: "1" }, { name: "周二", id: "2" }, { name: "周三", id: "3" }, { name: "周四", id: "4" }, { name: "周五", id: "5" }, { name: "周六", id: "6" }, { name: "周日", id: "7" }],
                weeklyExerciseDays: []
            }
        },
        components: {
            LayBg,
            Multiple,
            DatetimeView,
            Picker
        },
        directives: {
            TransferDom
        },
        computed: {
            ...mapState(['code','userInfo', 'courseKind', 'course']),
            ...mapState('configure', ['weeklyExerciseFrequencies','sportEvaluationId','dietRecommend','weekPlanDate','nurseList']),
            saveFlag() {
                return this.multiple.filter(item => item.check).length == this.counts
            },
        },
        created() {
                            console.log(this.sportEvaluationId)

            this.counts = this.weeklyExerciseFrequencies[0].weeklyExerciseDayCount
        },
        methods: {
            ...mapMutations('configure',['setWeeklyExerciseFrequencies']),
            ...mapMutations(['setDialogShow']),
            // 多选点击
            multipleClick(index) {
                this.$set(this.multiple[index], 'check', !this.multiple[index].check)
            },
            // 多选点击确定
            multipleSure(val, arr) {
                this.weeklyExerciseDays = arr
            },
            // 下一步接口 courseKind, userId, evaluationId, beginDate, weeklyExerciseDays, weekCount
            async savePlan () {
                let arr = this.multiple.filter(item => item.check)
            
                arr.forEach((item,i)=>{
                    this.weeklyExerciseDays.push(Number(item.id))
                })
                if(this.dietRecommend.taste=="0"){
                     delete this.dietRecommend.taste;
                }
                const data = await apiSaveConfig( window.sessionStorage.getItem("resultCode"),this.code, this.userInfo.userId, this.sportEvaluationId,this.weeklyExerciseDays,this.dietRecommend,this.weekPlanDate,this.nurseList)
                // this.setCourse(data.courseId)
                 // 清除运动，饮食，调理的日历状态
                window.sessionStorage.removeItem('m-scrollLeft')
                window.sessionStorage.removeItem('m-dateVal')
                window.sessionStorage.removeItem('c-dateVal')
                window.sessionStorage.removeItem('c-scrollLeft')
                window.sessionStorage.removeItem('a-dateVal')
                window.sessionStorage.removeItem('a-scrollLeft')
                this.setDialogShow(true)
                this.$router.push('/administration')
            },
            // 保存按钮 
            async saveClick() {
                if (this.saveFlag) {
                    // 先退出计划 userId courseKind exitWay
                    const data = await apiSetPlan(this.userInfo.userId, this.courseKind, 2)
                    this.savePlan()
                }
            }
        }
    }
</script>
<style lang="scss">
    .datetime .dp-item:nth-child(1) .scroller-indicator::after {
        content: "年";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 30px;
    }
    .datetime .dp-item:nth-child(2) .scroller-indicator::after {
        content: "月";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 20px;
    }
    .datetime .dp-item:nth-child(3) .scroller-indicator::after {
        content: "日";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 20px;
    }
</style>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .step3 {
        width: 100%;
        min-height: 100%;
        padding: 0.8rem /* 32/40 */ 0.75rem /* 30/40 */ 4.6rem /* 184/40 */;
        box-sizing: border-box;
        @include bg_color1();
        .type {
            @include bg_color6();
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            & + .type {
                margin-top: 0.8rem /* 32/40 */;
            }
            .ctn {
                position: relative;
                padding: 1.3rem /* 52/40 */ 1.05rem /* 42/40 */;
                box-sizing: border-box;
                .multipleTitle{
                    width: 100%;
                    height: 2rem /* 80/40 */;
                    margin-top:0.9rem;
                    font-size: 1.1rem /* 32/40 */;
                    @include font_color1();
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .multiple-c {
                    margin-top:1rem;
                    margin-bottom: 1.2rem /* 64/40 */;
                    li {
                        width: 100%;
                        height: 2rem /* 80/40 */;
                        font-size: 0.8rem /* 32/40 */;
                        @include font_color4();
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        & + li {
                            margin-top: 0.5rem /* 20/40 */;
                        }
                        &::before {
                            border-radius: 0.3rem /* 12/40 */;
                            @include border_color();
                            box-sizing: border-box;
                        }
                    }
                    .select {
                        @include font_color11();
                        transition: all 0.3s;
                        font-weight: bold;
                        &::before {
                            transition: all 0.3s;
                            @include border_color1();
                            border-radius: 0.3rem /* 12/40 */;
                            box-sizing: border-box;
                        }
                    }
                    .fengge {
                        height: 1.5rem /* 60/40 */;
                        font-size: 0.6rem /* 24/40 */;
                        @include font_color();
                        opacity: 0.6;
                        position: relative;
                        &::before {
                            content: "";
                            display: inline-block;
                            width: 4.45rem /* 178/40 */;
                            height: 1px;
                            background: #ccb8b7;
                            opacity: 0.5;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                        &::after {
                            content: "";
                            display: inline-block;
                            width: 4.45rem /* 178/40 */;
                            height: 1px;
                            background: #ccb8b7;
                            opacity: 0.5;
                            position: absolute;
                            right: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
        }
            }
        }
    }
    .dialog1,
    .dialog2 {
        /deep/ .weui-dialog {
            width: 17.25rem /* 690/40 */;
            max-width: 100%;
            border-radius: 0.2rem /* 8/40 */;
            overflow: auto;
        }
        .single-c,
        .dataTime-c,
        .multiple-c {
            padding: 1rem /* 40/40 */ 1.05rem /* 42/40 */;
            box-sizing: border-box;
            position: relative;
            .multipleIcon {
                position: absolute;
                left: -0.75rem /* 30/40 */;
                top: -1.2rem /* 48/40 */;
                width: 7.2rem;
                height: 1.7rem /* 68/40 */;
                @include bg_color();
                @include box_shodow2(0 0.3rem 0.75rem 0);
                border-radius: 0 0.85rem 0.85rem 0;
                font-size: 0.7rem /* 28/40 */;
                @include font_color6();
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                z-index: 99999999;
            }
            .gender {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 12.925rem /* 517/40 */;
                margin: 1.125rem /* 69/40 */ auto;
                .g1 {
                    width: 5rem /* 200/40 */;
                    height: 5rem /* 200/40 */;
                    box-sizing: border-box;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 4.5rem /* 180/40 */;
                        height: 4.5rem /* 180/40 */;
                        border-radius: 50%;
                    }
                }
                .check {
                    @include border1(0.15rem solid);
                }
            }
        }
    }
    .save {
        width: 10.25rem /* 410/40 */;
        height: 2.5rem /* 100/40 */;
        @include bg_color();
        @include box_shodow(0 0.3rem /* 12/40 */ 0.75rem /* 30/40 */ 0);
        border-radius: 1.25rem /* 50/40 */;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 1rem /* 40/40 */;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 9.7275rem /* 389.1/40 */ 2rem /* 80/40 */;
    }
    .saveSelect {
        transition: all 0.3s;
        @include bg_color8();
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 9.7275rem /* 389.1/40 */ 2rem;
    }
    .btn111 {
        width: 100%;
        height: 2.4rem;
        @include box_shodow2(0 0.3rem 0.75rem 0);
        border-radius: 1.25rem;
        font-size: 0.9rem;
        @include font_color6();
        @include bg_color();
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 14.6275rem 1.9rem;
        margin: auto;
        margin-top: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        font-weight: bold;
    }
</style>