<template>
    <div class="add_meal_main">
        <div class="add_meal_list" v-if="addmealInfo.intakeHeat > 0">
            <div class="add_tit flex">{{addmealInfo.mealType | getMealName}}</div>
            <ul class="list">
                <li class="tap_events" v-for="(itm,idx) in addmealInfo.foodList" :key="idx" v-longtouch="delRecordFood" :data-id="itm.recordId" @click="showDetail(itm)">
                    <img :src="itm.imageUrl" alt="">
                    <div class="con">
                        <div class="left">
                            <span>{{itm.foodName}}</span>
                            <label>{{itm.foodCount}}{{itm.unit}}</label>
                        </div>
                        <div class="right">{{itm.foodHeat}}大卡</div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 弹出热量选择 -->
        <Popup  class="food_detail" position="bottom" v-model="showFoodDetailPopue" style="width: 100%;padding: 0;">
            <Close @close="showFoodDetailPopue=false">
                <Detail v-if="showFoodDetailPopue" @addSelectedList="addSelectedList">
                    <div class="tabber tap_events" v-show="activeFoodDetail.foodType==='1'" slot="tabber"  @click="$router.push({name:'foodDetail',query:{id:activeFoodDetail.foodId,type:1}})">
                        <img src="@/assets/plan/btn_xzsw_swxq@2x.png" alt=""  class="icon_detail">
                        <span>详情</span>
                    </div>
                    <div class="tabber tap_events" v-show="activeFoodDetail.isMetrology==='0'" slot="tabber" @click="$router.push({name:'foodastimate',params:{foodId:activeFoodDetail.foodId,metrologyTag:activeFoodDetail.metrologyTag}})">
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
    import {MessageBox,Popup} from 'mint-ui';
    import {longtouch} from "@/utils/directives";
    import {saveFoodRecordData} from '@/service/api/plan';
    import {deepCopy} from '@/assets/js/util.js';

    export default {
        props: {
            addmealInfo: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data(){
            return{
                showFoodDetailPopue:false, //是否展示添加记录详情遮罩
                activeFoodDetail:{
                    foodId:"",
                    foodType:"",
                    isMetrology:"",
                    metrologyTag:""
                },
                recordInfo:null,//记录数据
            }
        },
        mounted() {
            // console.log(JSON.stringify(this.addmealInfo));
        },
        filters: {
            getMealName(mealType) {
                let mealname = "";
                switch (mealType) {
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
        components:{
            Detail,
            Popup,
            Close
        },
        directives: {
            longtouch
        },
        methods: {
            /**
             * 编辑
             * */
            showDetail(item){
                this.activeFoodDetail.foodId = item.foodId;
                this.activeFoodDetail.foodType = item.foodType;
                this.activeFoodDetail.isMetrology = item.isMetrology;
                this.activeFoodDetail.metrologyTag = item.metrologyTag;

                let newItem = deepCopy(item);

                let extensionUnits = newItem.extensionUnits;
                extensionUnits.unshift({
                    unit:newItem.unit,
                    unitSize:"小",
                    unitValue:1,
                    count: parseInt(newItem.foodCount)
                });

                newItem.extensionUnits = Array.from(new Set(extensionUnits));

                newItem.extensionUnits.forEach((e,i)=>{
                    if(e.unit === item.unit){
                        newItem.activeIndex = i;
                    }
                });

                newItem.name=newItem.foodName //将foodName 重命名为 name 可以和运动列表统一
                this.$store.commit("plan/COVER_ACTIVE_FOOOD_DETAIL",newItem);
                this.$nextTick(()=>{
                    this.showFoodDetailPopue=true;
                })
            },
            /**
             * 确定修改
             * */
            addSelectedList(e){
                this.recordInfo = e;
                this.saveMealRecord(e.recordId,"2");
                this.showFoodDetailPopue = false;
            },
            /**
             * 删除
             * */
            async delRecordFood(e) {
                const m = await MessageBox({
                    title: "确认要删除吗?",
                    showCancelButton: true,
                    closeOnClickModal:false
                });
                if (m === "confirm") {
                    let recordId = e.dataset.id;
                    this.saveMealRecord(recordId,"3");
                }
            },
            /**
             * 食物记录同步
             */
            saveMealRecord(recordId,operateType) {
                let recordList = [];
                if(operateType === "2"){//修改
                    recordList.push({
                        recordId: recordId,
                        operateType: operateType,
                        recordFrom: '1',
                        mealType: this.addmealInfo.mealType,
                        foodType: this.recordInfo.foodType,
                        foodId: this.recordInfo.foodId,
                        count: this.recordInfo.count,
                        kilocalorie: this.recordInfo.kilocalorie,
                        unit: this.recordInfo.unit
                    })
                }else {//删除
                    let foodList = this.addmealInfo.foodList;
                    for (let i = 0; i < foodList.length; i++) {
                        if (foodList[i].recordId === recordId) {
                            recordList.push({
                                recordId: recordId,
                                operateType: operateType,
                                recordFrom: '1',
                                mealType: this.addmealInfo.mealType,
                                foodType: "1",
                                foodId: foodList[i].foodId,
                                count: foodList[i].foodCount,
                                kilocalorie: foodList[i].foodHeat,
                                unit: foodList[i].unit
                            });
                            break;
                        }

                    }
                }

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
    .add_meal_list {
        .add_tit {
            height: 2.5rem;
            line-height: 2.5rem;
            background: #ffffff;
            border-bottom: 1px solid #ededed;
            font-size: .75rem;
            color: #252525;
            padding-left: 1rem;
        }

        .list {
            background: #ffffff;
            position: relative;
            overflow: hidden;

            li {
                height: 3.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &:last-child {
                    .con {
                        border-bottom: none !important;
                    }
                }

                img {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    background: #dddddd;
                    margin-left: 1rem;
                }

                .con {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-left: .6rem;
                    border-bottom: 1px solid #ededed;
                    padding-right: 1rem;

                    .left {
                        display: flex;
                        flex-direction: column;

                        span {
                            font-size: .75rem;
                            color: #252525;
                        }

                        label {
                            font-size: .6rem;
                            color: #929292;
                            margin-top: .2rem;
                        }
                    }

                    .right {
                        font-size: .75rem;
                        color: #252525;
                    }
                }

            }
        }
    }
</style>
