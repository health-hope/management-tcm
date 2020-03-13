<template>
    <div class="dietaryanalysis">
        <div class="ctn">
            <BaseZyTempTitle bgClass="jgy_bg_5" :tempTitle="'每日能量分析'" />
            <div class="ctn-c">
                <LayBg />
                <div class="top">
                    摄入总量： {{ userTotalIntake }}大卡
                    <span class="sub">（参考标准：{{standardTotalIntake}}大卡）</span>
                </div>
                <div class="canvas">
                    <div id="echarts1"></div>
                    <ul class="right">
                        <li>
                            <div class="icon color1"></div>
                            <div>早餐{{breakfastAnalysis.intakePercent}}%</div>
                        </li>
                        <li>
                            <div class="icon color2"></div>
                            <div>午餐{{lunchAnalysis.intakePercent}}%</div>
                            <div></div>
                        </li>
                        <li>
                            <div class="icon color3"></div>
                            <div>晚餐{{supperAnalysis.intakePercent}}%</div>
                            <div></div>
                        </li>
                    </ul>
                </div>
                <div class="bto">
                    <span class="bto-li1">参考标准： </span>
                    <span>早餐{{breakfastAnalysis.standardPercentLower}}%</span>
                    <span>午餐{{lunchAnalysis.standardPercentLower}}%</span>
                    <span>晚餐{{supperAnalysis.standardPercentLower}}%</span>
                </div>
            </div>
        </div>
        <div class="ctn">
            <BaseZyTempTitle bgClass="jgy_bg_1" :tempTitle="'每日营养分析'" />
            <div class="ctn-c">
                <LayBg />
                <div class="top">
                    摄入总量： {{ realCount }}g
                </div>
                <div class="canvas">
                    <div id="echarts2"></div>
                    <ul class="right">
                        <li v-for="(item, i) in macroList" :key="`list${i}`">
                            <div :class="`icon color${Number(i) + 4}`"></div>
                            <div>{{ item.name }}{{ item.userPercent }}%</div>
                        </li>
                    </ul>
                </div>
                <div class="bto">
                    <span class="bto-li1">参考标准： </span>
                    <span  v-for="(item, i) in macroList" :key="`lis1t${i}`">{{ item.name }}{{item.standardPercentLower}}%</span>
                </div>
            </div>
        </div>
        <div class="bg"></div>
    </div>
</template>
<script>
    import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
    import { mapState } from 'vuex'
    import LayBg from '@/components/common/LayBg';
    import { apiMealData } from '@/service/api/diet'
    import { dateFormat } from 'vux'
    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/pie');
    export default {
        data() {
            return {
                breakfastAnalysis: {},
                lunchAnalysis: {},
                supperAnalysis: {},
                macroList: [],
                userTotalIntake: '',
                standardTotalIntake: '',
                realCount: 0
            }
        },
        filters: {
            dateFormat
        },
        components: {
            BaseZyTempTitle,
            LayBg,
        },
        computed: {
            ...mapState(['userInfo']),
        },
        created() {
            this.getData()
        },
        methods: {
            async getData() {
                let recordDate = dateFormat(this.$route.query.date, 'YYYYMMDD')
                console.log(recordDate)
                const data = await apiMealData(this.userInfo.userId, recordDate)
                this.breakfastAnalysis = data.breakfastAnalysis
                this.lunchAnalysis = data.lunchAnalysis
                this.supperAnalysis = data.supperAnalysis
                this.macroList = data.macroList
                this.userTotalIntake = data.userTotalIntake
                this.standardTotalIntake = data.standardTotalIntake
                this.macroList.forEach(item => {
                    this.realCount += item.realCount
                })
                console.log(data)
                this.initEcharts()
            },
            initEcharts() {
                let myChart = echarts.init(document.getElementById('echarts1'));
                let option = {
                    series: [{
                        type: 'pie',
                        clickable:false,
                        radius: ['100%', '70%'],
                        color: ['#6ED9C8', '#FFA872', '#67B5FF'],
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            }
                        },
                        data: [
                            { value: this.breakfastAnalysis.intakePercent },
                            { value: this.lunchAnalysis.intakePercent },
                            { value: this.supperAnalysis.intakePercent },
                        ]
                    }]
                };
                myChart.setOption(option);
                let myChart2 = echarts.init(document.getElementById('echarts2'));
                let option2 = {
                    series: [{
                        type: 'pie',
                        clickable:false,
                        radius: ['100%', '70%'],
                        color: ['#6ED984', '#FFCB67', '#6794FF'],
                        hoverAnimation: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            }
                        },
                        data: [
                            { value: this.breakfastAnalysis.intakePercent },
                            { value: this.lunchAnalysis.intakePercent },
                            { value: this.supperAnalysis.intakePercent },
                        ]
                    }]
                };
                myChart2.setOption(option2);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .dietaryanalysis {
        min-height: 100%;
        padding: 0.8rem /* 32/40 */ 0.75rem /* 30/40 */ 1.3rem /* 52/40 */;
        box-sizing: border-box;
        @include bg_color1();
        .ctn {
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            & + .ctn {
                margin-top: 0.8rem /* 32/40 */;
            }
            .ctn-c {
                position: relative;
                background: #fff;
                padding: 1.4rem /* 56/40 */ 1.05rem /* 42/40 */;
                box-sizing: border-box;
                .top {
                    font-size: 0.8rem /* 32/40 */;
                    color: #333333;
                    line-height: 0.8rem /* 32/40 */;
                    font-weight: bold;
                    .sub {
                        font-size: 0.6rem /* 24/40 */;
                        color: #999999;
                        line-height: 0.6rem /* 24/40 */;
                        font-weight: normal;
                    }
                }
                .canvas {
                    margin: 1.9rem /* 76/40 */ 0.9rem /* 36/40 */;
                    height:  6rem /* 240/40 */;
                    display: flex;
                    align-items: center;
                    #echarts1, #echarts2 {
                        width: 6rem /* 240/40 */!important;
                        height:  6rem /* 240/40 */!important;
                        margin-right: 1.8rem;
                    }
                    .right {
                        li {
                            display: flex;
                            height: 1.25rem;
                            align-items: center;
                            font-size: .65rem;
                            color: #666666;
                            .icon {
                                width: .4rem;
                                height: .4rem;
                                border-radius: .1rem;
                                margin-right: .5rem;
                            }
                        }
                    }
                }
                .bto {
                    font-size: 0.6rem /* 24/40 */;
                    @include font_color();
                    span {
                        margin-right: .5rem;
                    }
                    .bto-li1 {
                        margin-right: .1rem;
                    }
                }
            }
        }
        .bg {
            position: fixed;
            top: 0;
            left:0;
            right:0;
            bottom:0;
            z-index:222;
        }
        .color1 {
            background-color: #6ED9C8;
        }
        .color2 {
            background-color:  #FFA872;
        }
        .color3 {
            background-color: #67B5FF;
        }
        .color4 {
            background-color: #6ED984;
        }
        .color5 {
            background-color: #FFCB67;
        }
        .color6 {
            background-color:  #6794FF;
        }
    }
</style>