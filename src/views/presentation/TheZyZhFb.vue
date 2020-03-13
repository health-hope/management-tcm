<template>
    <!-- 表类型 item-type1 s -->
    <div class="zy-fb-temp">
        <BaseZyTempTitle bgClass="jgy_bg_1" :tempTitle="tempData.title" />
        <div class="temp-main">
            <LayBg/>
            <div class="item-type1" v-if="tempData.dataList.length>2">
                <div id="myEcharts" class="echarts"></div>
                <img class="center-icon" :src="'yingyang.png' | PUBLIC_PATH" alt="">
                <!-- <div class="zyzh-fb-box">
                    <div class="fb-wrap">
                        <div class="fb-item" :class="'fb'+index" v-for="(item,index) in dataList" :key="index">
                            <span>{{item.subTitle}}</span>
                            <div class="font">
                                <img v-for="(m,i) in item.imgs" :key="i" :src="m" alt="">
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="item-type2" v-else>
                <ul class="list-cont">
                    <li v-for="(item,index) in dataList" :key="index">{{item.subTitle}}
                        <span>
                            <div class="font">
                                <img v-for="(m,i) in item.imgs" :key="i" :src="m" alt="">
                            </div>
                        </span>
                    </li>
                </ul>
                <ul class="strips">
                    <li v-for="(item,index) in dataList" :key="index" :style="{width:item.content*11.025/tempData.dataList[0].content+'rem'}">
                        <template v-if="item.content!=0">
                            
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- 表类型 e -->
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/radar')
import LayBg from "@/components/common/LayBg";
import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
import setFootColor from '@/assets/js/setFootColor';
export default {
     data() {
            return {
                areaBorderColor:'rgba(113, 58, 48,0.40)',
                areaSelectColor:'rgba(222,150,72,0.30)',
                areaBgColorNormal:'#FAF4F4',
                areaBgColorLight:'#F7EBE8',
            }
        },
    props: {
        tempData: {
            type: Object,
            default: {},
        },
        code:{
            type:String,
            default:'1'
        }
    },
    created(){
        /** 
         * 心、小肠
         * 肝、胆
         * 肺、大肠
         * 脾、胃
         */
        switch(this.code){
            default:
            case '1':
            case '7':
                break;
            case '2':
            case '9':
                this.areaBorderColor='rgba(69,73,52,0.60)'
                this.areaSelectColor='rgba(186,208,53,0.30)'
                this.areaBgColorNormal ='#F6F7EE'
                this.areaBgColorLight='#F0F3DE'
                break
            case '3':
            case '8':
                this.areaBorderColor=' rgba(92,75,42,0.60)'
                this.areaSelectColor='rgba(217,189,28,0.30)'
                this.areaBgColorNormal ='#F6F4EF'
                this.areaBgColorLight='#F5EEDC'
                break
            case '4':
            case '5':
                this.areaBorderColor=' rgba(96,64,44,0.60)'
                this.areaSelectColor='rgba(215,168,47,0.30)'
                this.areaBgColorNormal ='#F9F7F3'
                this.areaBgColorLight='#F3EADD'
                break

            case '6':
                this.areaBorderColor=' rgba(53,68,96,0.60)'
                this.areaSelectColor='rgba(84,198,201,0.30)'
                this.areaBgColorNormal ='#F2F8FC'
                this.areaBgColorLight='#E3EFF6'
                break
        }
    },
    computed: {
        dataList() {
            let result = [];
            this.tempData.dataList.forEach(element => {
                result.push({
                    subTitle: element.subTitle,
                    content: element.content,
                    imgs: setFootColor(element.content, "hong")
                })
            });
            return result;
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.draw();
        })
    },
    components: {
        LayBg,
        BaseZyTempTitle,
    },
    methods: {
        draw() {
            let myEcharts = echarts.init(document.getElementById("myEcharts"));

            const indicator = [];
            const value = []; //value值

            this.dataList.forEach(element => {
                indicator.push({
                    text: '{title|'+element.subTitle+'}\n{count|'+element.content+'}',
                    max: this.tempData.maxScore,
                });
                value.push(element.content);
            });
            let option = {
                title: {
                    text: ""
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    x: "center",
                    data: [""],
                    show: false,
                },
                radar: [{
                    indicator: indicator,
                    center: ["50%", "50%"],
                    radius: '50%',
                    startAngle: 120,
                    nameGap: 15,
                    splitNumber: 5,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0)'
                        }

                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255,255,255,1)'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: [this.areaBgColorNormal, this.areaBgColorLight,this.areaBgColorNormal, this.areaBgColorLight,this.areaBgColorNormal]
                        }
                    },
                    name: {
                        show: true, //隐藏默认的
                        color: '#333',
                        fontSize: 14,
                        rich: {
                            title: {
                                color: '#333333',
                                align: 'left',
                                fontWeight:'bolder',
                                fontSize: 17,
                                height:20
                            },
                            count: {
                                color: '#E6805F',
                                align: 'left',
                                fontWeight:'bolder',
                                fontSize: 17,
                                height: 24
                            }
                        }
                    },
                }],
                series: [{
                    type: "radar",
                    tooltip: {
                        trigger: "item"
                    },
                    itemStyle: {
                        color: this.areaBorderColor
                    },
                    areaStyle: {
                        color: this.areaSelectColor
                    },
                    data: [{
                        value: value,
                        symbol: 'none',
                    }]
                }]
            };

            myEcharts.setOption(option);
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.zy-fb-temp {
    @include bg_color6();
    margin-top: 0.8rem;
    border-radius: .2rem;
    overflow: hidden;
    .temp-main {
        position: relative;
    }
    .item-type1 {
        position: relative;
        .echarts {
            width: 17.25rem;
            height: 14.75rem;
        }
        .center-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 1rem;
            height: 1rem;
            transform: translate(-50%, -50%);
        }
        .zyzh-fb-box {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .fb-wrap {
                position: relative;
                width: 100%;
                height: 100%;
            }
            .fb-item {
                position: absolute;
                display: flex;
                flex-direction: column;
                span {
                    font-size: .7rem;
                    @include font_color4();
                    font-weight: bold;
                }
                .font {
                    img{
                        height: .85rem;
                    }
                }
            }
            .fb0 {
                top: 1.4rem;
                right: 11rem;
            }
            .fb5 {
                top: 1.4rem;
                left: 11.8rem;
            }
            .fb4 {
                top: 6rem;
                left: 14.2rem;
            }
            .fb3 {
                top: 11.225rem;
                left: 12rem;
            }
            .fb2 {
                top: 11.225rem;
                right: 12rem;
            }
            .fb1 {
                top: 6rem;
                right: 14rem;
            }
        }
    }
    .item-type2{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:1.4rem 1.3rem;
        ul{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            li{
                color:#333;
                font-size: .7rem;
                line-height: 1rem;
                margin-bottom: 1.4rem;
                font-family: PingFangSC-Medium;
                display: flex;
                flex-direction: column;
                span{
                    width: .85rem;
                    height: .85rem;
                    margin-top: .1rem;
                    // color:#E6805F;
                }
                &:last-child{
                    margin-bottom: 0;
                }
            }
            &.list-cont{
                li{
                    span{
                        .font{
                            display: flex;
                            align-items:flex-start;
                            justify-content: flex-start;
                            img{
                                height: .85rem;
                            }
                        }
                    }
                }
            }
            &.strips{
                border-left: solid 1px rgba(69,73,52,0.20);
                li{
                    // width: 11.025rem;
                    height: 1.2rem;
                    background-color: rgba(186,208,53,0.30);
                    margin-bottom: 2.125rem;
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>