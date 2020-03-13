<template>
    <div>
        <ul class="meal_list" v-if="recordList.length > 0">
            <li class="user_tap_no_select tap_events" v-for="(item,index) in recordList" :key="index" v-longtouch="delRecordFood" :data-id="item.recordId" :data-foodtype="item.foodType" @click.prevent="showDetail(item)">
                <img v-if="item.imageUrl && item.imageUrl !==''" :src="item.imageUrl" alt="">
                <img v-else src="../../assets/common/emptyCustomer.png"/>
                <div class="con" v-if="comType == 1">
                    <div class="left">
                        <span>{{item.foodName}}</span>
                        <label>{{item.foodCount}}{{item.unit}}</label>
                    </div>
                    <div class="right">{{item.foodHeat}}大卡</div>
                </div>
                <div class="con" v-else>
                    <div class="left">
                        <span>{{item.exerciseName}}</span>
                        <label>{{item.exerciseCount}}{{item.unit}}</label>
                    </div>
                    <div class="right">{{item.minCountHeat}}大卡</div>
                </div>

            </li>
        </ul>

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
            recordList: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            mealType: {
                type: String,
                default: () => {
                    return "";
                }
            },
            comType: {
                type: Number,
                default: () => {
                    return 1;
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
                foodType:"",
            }
        },
        directives: {
            longtouch
        },
        mounted() {

        },
        components:{
            Detail,
            Popup,
            Close
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

                console.log(JSON.stringify(item))
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
                    this.foodType = e.dataset.foodtype;
                    this.saveMealRecord(recordId,"3");
                }
            },
            /**
             * 食物记录同步
             */
            saveMealRecord(recordId,operateType) {
                console.log(recordId)
                console.log(operateType)
                let recordList = [];
                if(operateType === "2"){//修改
                    recordList.push({
                        recordId: recordId,
                        operateType: operateType,
                        recordFrom: '1',
                        mealType: this.mealType,
                        foodType: this.recordInfo.foodType,
                        foodId: this.recordInfo.foodId,
                        count: this.recordInfo.count,
                        kilocalorie: this.recordInfo.kilocalorie,
                        unit: this.recordInfo.unit
                    })
                }else {//删除
                    for (let i = 0; i < this.recordList.length; i++) {
                        console.log(this.recordList[i].recordId, recordId);
                        if (this.recordList[i].recordId === recordId) {
                            recordList.push({
                                recordId: recordId,
                                operateType: operateType,
                                recordFrom: "1",
                                mealType: this.mealType,
                                foodType: this.foodType,
                                foodId: this.recordList[i].foodId,
                                count: this.recordList[i].foodCount,
                                kilocalorie: this.recordList[i].foodHeat,
                                unit: this.recordList[i].unit
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
    .meal_list {
        background: #F7F7F7;
        box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.05);
        border-bottom-left-radius: .3rem;
        border-bottom-right-radius: .3rem;
        padding-bottom: .3rem;

        li {
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

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

            &:last-child {
                .con {
                    border-bottom: none;
                }
            }
        }
    }
</style>
