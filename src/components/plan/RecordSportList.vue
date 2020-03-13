<template>
    <div>
        <ul class="meal_list" v-if="recordList.length > 0">
            <li class="user_tap_no_select tap_events" v-for="(item,index) in recordList" :key="index" v-show="index < 4" v-longtouch="delRecordFood" :data-id="item.recordId" @click="showDetail(item)">
                <img v-if="item.imageUrl && item.imageUrl !==''" :src="item.imageUrl" alt="">
                <img v-else src="../../assets/common/emptySystem.png" />
                <div class="con ">
                    <div class="left">
                        <span>{{item.exerciseName}}</span>
                        <label>{{item.exerciseCount}}{{item.unit}}</label>
                    </div>
                    <div class="right">{{item.kilocalorie}}大卡</div>
                </div>

            </li>
        </ul>

        <!-- 弹出热量选择 -->
        <Popup class="food_detail" position="bottom" v-model="showDetailPopue" style="width: 100%;padding: 0;">
            <Close @close="showDetailPopue=false">
                <Detail v-if="showDetailPopue" @addSelectedList="addSelectedList">

                    <div class="tabber tap_events" v-show="activeDetail.exerciseType==1" slot="tabber" @click="$router.push({name:'foodDetail',query:{id:activeDetail.exerciseId,type:2}})">
                        <img src="@/assets/plan/btn_xzsw_swxq@2x.png" alt=""  class="icon_detail">
                        <span>详情</span>
                    </div>
                    <div class="tabber tap_events" v-show="false" slot="tabber" @click="$router.push({name:'foodastimate',params:{foodId:activeDetail.foodId,metrologyTag:activeDetail.metrologyTag}})">
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
    import {saveSportRecordData} from '@/service/api/plan';
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
                showDetailPopue:false, //是否展示添加记录详情遮罩
                activeDetail:{
                    exerciseId:"",
                    exerciseType:"",
                    metrologyTag: "",
                    foodId:""
                    
                },
                recordInfo:null,//记录数据
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
                this.activeDetail.exerciseId = item.exerciseId;
                this.activeDetail.exerciseType = item.exerciseType;
                this.activeDetail.foodId = item.foodId;
                this.activeDetail.metrologyTag = item.metrologyTag;

                let newItem = deepCopy(item);
                // console.log(JSON.stringify(newItem))

                newItem.extensionUnits = newItem.extensionUnits||[];
                if(!newItem.extensionUnits.length){
                    newItem.extensionUnits.unshift({
                        unit: newItem.unit,
                        unitSize:"小",
                        unitValue: 1,
                        count: parseInt(newItem.exerciseCount) || 30 //拼接初始值
                    })
                }

                newItem.extensionUnits.map(val => { //如果没有初始值以 mincount为初始值
                    val.count = val.count || newItem.exerciseCount
                })

                newItem.name=newItem.exerciseName //将foodName 重命名为 name 可以和运动列表统一
                this.$store.commit("plan/COVER_ACTIVE_FOOOD_DETAIL",newItem);
                this.$nextTick(()=>{
                    this.showDetailPopue=true;
                })
            },
            /**
             * 确定修改
             * */
            addSelectedList(e){
                this.recordInfo = e;
                this.saveSportRecord(e.recordId,"2");
                this.showDetailPopue = false;
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
                    this.saveSportRecord(recordId,"3");

                }
            },

            /**
             * 运动记录同步
             */
            saveSportRecord(recordId,operateType) {
                let recordList = [];
                if(operateType === "2"){//编辑
                    recordList.push({
                        recordId: recordId,
                        operateType: operateType,
                        recordFrom: '1',
                        exerciseType: this.activeDetail.exerciseType,
                        exerciseId: this.activeDetail.exerciseId,
                        count: this.recordInfo.count,
                        kilocalorie: this.recordInfo.kilocalorie,
                        unit: this.recordInfo.unit
                    });

                }else {
                    for (let i = 0; i < this.recordList.length; i++) {
                        if (this.recordList[i].recordId == recordId) {
                            recordList.push({
                                recordId: recordId,
                                operateType: operateType,
                                recordFrom: '1',
                                exerciseType: this.recordList[i].exerciseType,
                                exerciseId: this.recordList[i].exerciseId,
                                count: this.recordList[i].exerciseCount,
                                kilocalorie: this.recordList[i].kilocalorie,
                                unit: this.recordList[i].unit
                            });
                            break;
                        }

                    }
                }


                let recordDate = this.$store.state.plan.dateObj.fullDate
                saveSportRecordData(recordDate, recordList).then(res => {
                    if (res.retCode === 'SUCCESS') {
                        this.$emit('event-update-plan-index');
                    } else {
                        this.$toast({
                            message:res.tooltip,
                            duration:1500,
                        });
                    }
                });
            }
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
