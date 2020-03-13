<template>
    <div class="res_main">
        <div class="recommend mg_32" v-if="mealInfo.recommendFoodList.length > 0">
            <div class="tit flex flex_ae flex_jb">
                <span class="left_tit">{{mealInfo.mealType | getMealName}}推荐</span>
                <span class="right_heat">{{mealInfo.planIntakeHeat}}大卡</span>
            </div>
            <div class="desc" v-if="mealInfo.mealType == '1' || mealInfo.mealType == '2' || mealInfo.mealType == '3'" v-show="showRecommeDesc">
                <div class="sanjiao"></div>
                根据您的个人信息和饮食偏好，结合临床膳食模型，利用人工智能算法进行专属推荐
            </div>
            <ul class="recommend_list">
                <li class="flex flex_ac flex_jb" v-for="(item,index) in mealInfo.recommendFoodList" :key="item.foodId">
                    <div class="left_box flex flex_ac tap_events" @click="showDetail(item)">
                        <img v-if="item.imageUrl && item.imageUrl !==''" :src="item.imageUrl" alt="">
                        <img v-else src="../../assets/common/emptySystem.png" />
                        <div class="name">
                            <h3>{{item.foodName}}</h3>
                            <span>{{item.foodHeat}}大卡/{{item.foodCount}}{{item.unit}}</span>
                        </div>
                    </div>
                    <div class="right_box flex flex_ac flex_je tap_events" @click="change(item,index)">
                        <img src="../../assets/plan/btn_yinshi_hyh_normal.png" :class="rotateFlag && rotationIndex === index?'rotation':''">
                    </div>
                </li>
            </ul>
            <div class="more_btn_box flex flex_ac flex_jc" v-if="mealInfo.mealType < 4">
                <router-link class="flex flex_ac flex_jc tap_events" :to="{path:'/plan/foodrecommendpage',query:{mealType:mealInfo.mealType}}">
                    <span>更多其他推荐</span><i></i>
                </router-link>
            </div>
        </div>

        <!-- 弹出热量选择 -->
        <Popup class="food_detail" position="bottom" v-model="showFoodDetailPopue" style="width: 100%;padding: 0;">
            <Close @close="showFoodDetailPopue=false">
                <Detail v-if="showFoodDetailPopue" @addSelectedList="addSelectedList">
                    <div class="tabber tap_events" v-show="activeFoodDetail.foodType==='1'" slot="tabber" @click="$router.push({name:'foodDetail',query:{id:activeFoodDetail.foodId,type:1}})">
                        <img src="@/assets/plan/btn_xzsw_swxq@2x.png" alt="" class="icon_detail">
                        <span>详情</span>
                    </div>
                    <div class="tabber tap_events" v-show="activeFoodDetail.isMetrology==='0'" slot="tabber"
                         @click="$router.push({name:'foodastimate',params:{foodId:activeFoodDetail.foodId, metrologyTag:activeFoodDetail.metrologyTag}})">
                        <img class="icon_detail" src="@/assets/plan/btn_xzsw_gs@2x.png" alt="" srcset="">
                        <span>估算</span>
                    </div>
                </Detail>
            </Close>
        </Popup>

    </div>
</template>

<script>

    import Detail from "@/components/plan/Detail";
    import Close from "@/components/plan/Close";
    import {Popup} from 'mint-ui';
    import {apiChangement, saveFoodRecordData} from '@/service/api/plan';
    import {deepCopy} from '@/assets/js/util.js';

    export default {
        props: {
            mealInfo: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                showRecommeDesc: true,//是否显示推荐话术
                showFoodDetailPopue: false, //是否展示添加记录详情遮罩
                activeFoodDetail: {
                    foodId: "",
                    foodType: "",
                    isMetrology: "",
                    metrologyTag: ""
                },
                recordInfo: null,//记录数据

                rotationIndex:"",
                rotateFlag:false,

            }
        },
        mounted() {
            // console.log(JSON.stringify(this.mealInfo))
            setTimeout(()=>{
                this.showRecommeDesc = false;
            },4000);
        },
        components: {
            Detail,
            Popup,
            Close
        },
        filters: {
            getMealName(mealType) {
                let mealname = "";
                switch (mealType) {
                    case "1":
                        mealname = "早餐";
                        break;
                    case "2":
                        mealname = "午餐";
                        break;
                    case "3":
                        mealname = "晚餐";
                        break;
                    case "4":
                        mealname = "早加餐";
                        break;
                    case "5":
                        mealname = "午加餐";
                        break;
                    case "6":
                        mealname = "晚加餐";
                        break;
                    default:
                        mealname = "未知";
                        break;
                }
                return mealname;
            }
        },
        methods: {
            /**
             * 换一换食谱推荐
             */
            change(item,index) {
                this.rotationIndex = index;
                this.rotateFlag = true;
                let recipesDate = this.$store.state.plan.dateObj.fullDate
                let mealType = this.mealInfo.mealType;
                let foodId = item.foodId;
                let foodHeat = item.foodHeat;
                let moduleCode = this.$store.getters.moduleCode;
                apiChangement(recipesDate, mealType, foodId, foodHeat, moduleCode).then(res => {
                    // console.log(JSON.stringify(res));
                    this.rotateFlag = false;
                    try {
                        let foodInfo = res.foodInfo;
                        this.mealInfo.planIntakeHeat = res.mealHeat;
                        let recommendFoodList = this.mealInfo.recommendFoodList
                        for (let i = 0; i < recommendFoodList.length; i++) {
                            if (recommendFoodList[i].foodId == foodId) {
                                recommendFoodList[i] = foodInfo;
                                break;
                            }
                        }
                        //重新设值
                        this.$set(this.mealInfo, 'recommendFoodList', recommendFoodList);
                    }catch (e) {

                    }
                });
            },

            /**
             * 编辑
             * */
            showDetail(item) {
                this.activeFoodDetail.foodId = item.foodId;
                this.activeFoodDetail.foodType = item.foodType;
                this.activeFoodDetail.isMetrology = item.isMetrology;
                this.activeFoodDetail.metrologyTag = item.metrologyTag;

                // console.log(JSON.stringify(item))
                let newItem = deepCopy(item);

                let extensionUnits = newItem.extensionUnits;
                extensionUnits.unshift({
                    unit: newItem.unit,
                    unitSize: "小",
                    unitValue: 1,
                    count: parseInt(newItem.foodCount)
                });

                newItem.extensionUnits = Array.from(new Set(extensionUnits));
                newItem.extensionUnits.forEach((e,i)=>{
                    if(e.unit === item.unit){
                        newItem.activeIndex = i;
                    }
                });

                newItem.name = newItem.foodName //将foodName 重命名为 name 可以和运动列表统一
                this.$store.commit("plan/COVER_ACTIVE_FOOOD_DETAIL", newItem);
                this.$nextTick(() => {
                    this.showFoodDetailPopue = true;
                })
            },
            /**
             * 确定修改
             * */
            addSelectedList(e) {
                this.recordInfo = e;
                this.saveMealRecord(e.recordId);
                this.showFoodDetailPopue = false;
            },
            /**
             * 食物记录同步
             */
            saveMealRecord(recordId) {
                let recordList = [];
                recordList.push({
                    recordId: recordId,
                    operateType: "1",
                    recordFrom: '1',
                    mealType: this.mealInfo.mealType,
                    foodType: this.recordInfo.foodType,
                    foodId: this.recordInfo.foodId,
                    count: this.recordInfo.count,
                    kilocalorie: this.recordInfo.kilocalorie,
                    unit: this.recordInfo.unit
                });

                let recordDate = this.$store.state.plan.dateObj.fullDate;
                saveFoodRecordData(recordDate, recordList).then(res => {
                    if (res.retCode === 'SUCCESS') {
                        this.$emit('event-update-plan-index');
                    } else {
                        this.$toast({
                            message:res.tooltip,
                            duration:1500,
                        });
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/planRecommedList';
</style>
