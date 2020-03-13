<template>
<div class="recommend mg_32">
    <div class="tit flex flex_ae flex_jb">
        <div class="left_tit">运动推荐</div>
        <div class="right_attentions flex flex_ae tap_events" @click="handleShowAttention">
            <img src="../../assets/plan/icon_sy_zysx.png" alt="" />
            <span>注意事项</span>
        </div>
    </div>
    <div class="desc2">
        以下运动，可任选其一
    </div>

    <ul class="recommend_list pb_20">
        <li class="flex flex_ac flex_jb" v-for="item in sportInfo.recommendSportList" :key="item.sportId">
            <div class="left_box flex flex_ac">
                <img v-if="item.imageUrl && item.imageUrl !==''" :src="item.imageUrl" alt="">
                <img v-else src="../../assets/common/emptySystem.png" />
                <div class="name">
                    <h3>{{item.exerciseName}}</h3>
                </div>
            </div>
            <div class="right_box flex flex_ac flex_je">
                <span>{{item.exerciseCount}}{{item.unit}}</span>
            </div>
        </li>
    </ul>

    <sports-attention v-if="sportsAttentionInfo.show" :sportsAttentionInfo="sportsAttentionInfo"></sports-attention>

    <!-- 弹出热量选择 -->
    <Popup class="food_detail" position="bottom" v-model="showDetailPopue" style="width: 100%;padding: 0;">
        <Close @close="showDetailPopue=false">
            <Detail v-if="showDetailPopue" @addSelectedList="addSelectedList">

                <div class="tabber tap_events" v-show="activeDetail.exerciseType==='1'" slot="tabber" @click="$router.push({name:'foodDetail',query:{id:activeDetail.exerciseId,type:2}})">
                    <img src="@/assets/plan/btn_xzsw_swxq@2x.png" alt=""  class="icon_detail">
                    <span>详情</span>
                </div>
                <div class="tabber tap_events" v-show="false" slot="tabber" @click="$router.push({name:'foodastimate',query:{foodId:activeDetail.foodId,metrologyTag:activeDetail.metrologyTag}})">
                    <img class="icon_detail" src="@/assets/plan/btn_xzsw_gs@2x.png" alt="" srcset="">
                    <span>估算</span>
                </div>
            </Detail>
        </Close>
    </Popup>
</div>
</template>

<script>
import SportsAttention from '@/components/plan/SportsAttention'
import Detail from "@/components/plan/Detail";
import Close from "@/components/plan/Close";
import {Popup} from 'mint-ui';
import {saveSportRecordData} from '@/service/api/plan';
import {deepCopy} from '@/assets/js/util.js';
export default {
    props: {
        sportInfo: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            sportsAttentionInfo: {
                show: false,
                attentions: [],
            },
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
    mounted() {
        this.sportsAttentionInfo.attentions = this.sportInfo.sportAttentions;
    },
    filters: {

    },
    methods: {
        handleShowAttention() {
            this.sportsAttentionInfo.attentions = this.sportInfo.sportAttentions;
            this.sportsAttentionInfo.show = true;
        },
        /**
         * 编辑
         * */
        showDetail(item){
            console.log(JSON.stringify(item))
            this.activeDetail.exerciseId = item.sportId;
            this.activeDetail.exerciseType = "1";
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
            this.saveSportRecord(e.recordId);
            this.showDetailPopue = false;
        },

        /**
         * 运动记录同步
         */
        saveSportRecord(recordId) {
            let recordList = [];
            recordList.push({
                recordId: recordId,
                operateType: "1",
                recordFrom: '1',
                exerciseType: "1",
                exerciseId: this.activeDetail.exerciseId,
                count: this.recordInfo.count,
                kilocalorie: this.recordInfo.kilocalorie,
                unit: this.recordInfo.unit
            });


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
    },
    components:{
        SportsAttention,
        Detail,
        Popup,
        Close
    },
}
</script>

<style lang="scss" scoped>
@import '../../styles/planRecommedList';
</style>
