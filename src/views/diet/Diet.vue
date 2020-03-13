<template>
    <div class="home-food" id="tops">
        <!-- 每日配餐方案 -->
        <div class="days-programme">
            <div class="ctn days-cont">
                <!-- <Calendar  :checked="checkIndex" :nursePlanList="nursePlan.nursePlanList" @planDateClick="planDateClick" :scrollLeft="scrollLeft" :dateVal="dateVal1"/> -->
                <Calendar v-if="nursePlan.nursePlanList.length" :nursePlanList="nursePlan.nursePlanList" @planDateClick="planDateClick" :scrollLeft="scrollLeft" :dateVal="dateVal1"/>
                <!-- <Calendar :nursePlanList="nursePlan.nursePlanList" @planDateClick="planDateClick" :scrollLeft="scrollLeft" :dateVal="dateVal1"/> -->
                <!-- 饮食方案内容 -->
                <div class="day-wrap-box">
                    <div class="day-wrap">
                    <div class="day-item" :class="foodTimeType=='breakfast'?'active':''" @click="foodClick('breakfast')" v-if="dietRecommendation.breakfast">
                        <div>早餐</div>
                        <span class="dian"></span>
                    </div>
                    <div class="day-item" :class="foodTimeType=='breakfastAddition'?'active':''" @click="foodClick('breakfastAddition')" v-if="dietRecommendation.breakfastAddition">
                        <div>早加</div>
                        <span class="dian"></span>
                    </div>
                    <div class="day-item" :class="foodTimeType=='lunch'?'active':''" @click="foodClick('lunch')" v-if="dietRecommendation.lunch">
                        <div>午餐</div>
                        <span class="dian"></span>
                    </div>
                    <div class="day-item" :class="foodTimeType=='lunchAddition'?'active':''" @click="foodClick('lunchAddition')" v-if="dietRecommendation.lunchAddition">
                        <div>午加</div>
                        <span class="dian"></span>
                    </div>
                    <div class="day-item" :class="foodTimeType=='dinner'?'active':''" @click="foodClick('dinner')" v-if="dietRecommendation.dinner">
                        <div>晚餐</div>
                        <span class="dian"></span>
                    </div>
                    <div class="day-item" :class="foodTimeType=='dinnerAddition'?'active':''"  @click="foodClick('dinnerAddition')" v-if="dietRecommendation.dinnerAddition">
                        <div>晚加</div>
                        <span class="dian"></span>
                    </div>
                    <!-- <div
                        class="day-item"
                        :class="item.ischecked?'active':''"
                        v-for="(item,index) in foodDay"
                        :key="index"
                    >
                        <div>{{item.name}}</div>
                        <span class="dian"></span>
                    </div> -->
                </div>
                    <img alt="" :src="'bg_calendar_right_mask.png' | PUBLIC_PATH" class="img-pop-left">
                    <img alt="" :src="'bg_calendar_left_mask.png' | PUBLIC_PATH" class="img-pop-right">
                </div>


                <div class="toggle-food-wrap" v-if="dietRecommendation[foodTimeType]">
                    <!-- <div class="links"></div> -->
                    <div class="describe">{{dietRecommendation[foodTimeType].description}}</div>
                    <!-- 餐饮建议模块 -->
                    <div class="food-proposal-link">
                        <div class="food-proposal-wrap">
                            <div class="num-box">
                                <div class="name">{{dietRecommendation[foodTimeType].mealTypeDispalyName}}</div>
                                <div class="num">建议摄入{{dietRecommendation[foodTimeType].planIntakeHeat}}大卡</div>
                            </div>
                            <div class="btn-box">
                                <span class="p" v-show="dietRecommendation[foodTimeType].recordList.length>0">{{dietRecommendation[foodTimeType].intakeContent}}</span>
                                <template v-if="isToday()>=dataArr[dateVal].recipesDate.replace(/-/g,'')" >
                                    <span class="jt" :style="{backgroundImage: 'url(bth_diet_collapse.png)'}  | PUBLIC_PATH"  @click.stop="openHistryList(dataArr[dateVal].recipesDate.replace(/-/g,''))" v-show="dietRecommendation[foodTimeType].recordList.length>0"></span>
                                    <span class="add"  @click.stop="openHistoryPage()"  v-show="!dietRecommendation[foodTimeType].recordList.length>0" :style="{backgroundImage: 'url(bth_diet_add.png)'}  | PUBLIC_PATH"></span>
                                </template>
                             </div>
                        </div>
                    </div>
                    <!-- 餐品列表 -->
                    <div class="food-list">
                        <div class="food-item"  v-for="(item,index) in dietRecommendation[foodTimeType].foodList" :key="index"  @click.prevent="showDetail(item)">
                            <div class="item-left">
                                <img :src="item.imageUrl" class="avatar">
                                <div>
                                    <div class="name">{{item.foodName}}</div>
                                    <div class="num">{{item.foodHeat}}大卡/{{item.foodCount}}克</div>
                                </div>
                            </div>
                             <img class="toggle-btn" :class="{huan:index===animateIndex&&foodTimeType==moveBtnType}"  :src="'pc_button_hyh.png' | PUBLIC_PATH" @click.stop="changeRecipe(foodTimeType,index,item,dietRecommendation[foodTimeType].mealType)">
                            <!-- <div class="toggle-btn" :class="{huan:i===animateIndex && typeString=='breakfast'}"></div> -->
                        </div>
                    </div>
                    <!-- 推荐列表 -->
                    <div class="food-title" v-if="dietRecommendation.drink">
                        <img class="icon" :src="'pc_icon_tjcy.png' | PUBLIC_PATH" @click.prevent="showDetail(item)">
                        <span class="title">推荐茶饮</span>
                    </div>
                     <div class="food-list">
                        <router-link :to="{path: '/details', query: {foodId:item.foodId,mealType:7}}" tag="div" class="food-item" v-for="(item,index) in dietRecommendation.drink.foodList" :key="index"> 
                        <!-- <div class="food-item" v-for="(item,index) in dietRecommendation.drink.foodList" :key="index"  @click.prevent="showDetail(item,7)"> -->
                            <div class="item-left">
                                
                                    <img :src="item.imageUrl" class="avatar">
                                
                                <div>
                                    <div class="name">{{item.foodName}}</div>
                                    <!-- <div class="num">{{item.foodHeat}}大卡/{{item.foodCount}}ml</div> -->
                                </div>
                            </div>
                             <img class="toggle-btn" :class="{huan:index===animateIndex&&moveBtnType=='drink'}" :src="'pc_button_hyh.png' | PUBLIC_PATH"  @click.stop="changeRecipe('drink',index,item,'7')">
                        </router-link>
                    </div>
                    <router-link class="btn-add"  :style="{backgroundImage: 'url(btn_bg_white_classschedule.png)'}  | PUBLIC_PATH" tag="div" :to="{path:'/dietaryanalysis',query:{date:dataArr[dateVal].recipesDate}}">
                        饮食分析
                    </router-link>
                </div>
                <LayBg />
            </div>
        </div>
        <!-- 弹出热量选择 -->
        <Popup  class="food_detail" position="bottom" v-model="showFoodDetailPopue" style="width: 100%;padding: 0;">
            <Close @close="showFoodDetailPopue=false">
                <Detail v-if="showFoodDetailPopue" @addSelectedList="addSelectedList">
                    <div class="tabber tap_events" slot="tabber"  @click="$router.push({path:'/details',query:{foodId:activeFoodDetail.foodId,mealType:foodlinkType?7:dietRecommendation[foodTimeType].mealType}})">
                        <img :src="'bth_record_details.png' | PUBLIC_PATH"  alt=""  class="icon_detail">
                        <span>详情</span>
                    </div>
                    <div class="tabber tap_events"   slot="tabber" @click="$router.push({name:'foodastimate',params:{foodId:activeFoodDetail.foodId,metrologyTag:activeFoodDetail.metrologyTag}})">
                        <img class="icon_detail" :src="'bth_record_estimate.png' | PUBLIC_PATH"  alt="" srcset="">
                        <span>估算</span>
                    </div>
                </Detail>
            </Close>
        </Popup>
        <Popup v-model="recordListPop"
  position="bottom"  style="width: 100%;padding: 0;">
            <div class="recordList-wrap"   v-if="dietRecommendation[foodTimeType]">
                <div class="close-wrap">   
                    <div class="close-btn"  @click="recordListPop=false" :style="{backgroundImage: 'url(bth_record_shutdown.png)'}  | PUBLIC_PATH"></div> 
                </div>
                <div @click="removefix" > 
                    <router-link :class="{'margin-bottom':dietRecommendation[foodTimeType].recordList.length==0}" :style="{backgroundImage: 'url(btn_bg_white_classschedule.png)'}  | PUBLIC_PATH"  :to="{path:'/plan/foodrecommendList',query:{'mealType':dietRecommendation[foodTimeType].mealType,'date':dataArr[dateVal].recipesDate}}" tag="div" class="go-add">
                        继续添加
                    </router-link>
                </div>
                <div class="wrap-list">
                    <div class="history-list-wrap" v-for="(item,index) in dietRecommendation[foodTimeType].recordList" :key="index">
                        <div class="left"> 
                            <div class="item-close" @click="removeHistoryItem(item,index)" :style="{backgroundImage: 'url(bth_record_delete.png)'}  | PUBLIC_PATH"></div>
                            <img :src="item.imageUrl" alt="" v-if="item.imageUrl">
                            <img :src="'emptyCustomer.png' | PUBLIC_PATH" alt="" v-else>
                        </div>
                        <div class="right">
                            <div class="name-num">
                                <div class="name">{{item.foodName}}</div>
                                <div class="num">{{item.foodCount}}{{item.unit}}</div>
                            </div>
                            <div class="long">{{item.foodHeat}}大卡</div>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
          <Popup v-model="fixPop"
  position="content"  style="width: 100%;padding: 0;">
            <div class="fix-wrap" v-show="fixPop">
                <div class="title">提示</div>
                <div class="quest">您确定要删除吗？</div>
                <div class="box-bottom">
                    <div class="close" @click="closeRemove"  :style="{backgroundImage: 'url(btn_bg_gray_popups_determine.png)'}  | PUBLIC_PATH" >取消</div>
                    <div class="ok" @click="commitRemove" :style="{backgroundImage: 'url(btn_bg_gray_popups_determine.png)'}  | PUBLIC_PATH" >确定</div>
                </div>
            </div>
        </Popup>
    </div>
</template>
<script>
import Detail from "@/components/plan/Detail";
import Close from "@/components/plan/Close";
import {MessageBox,Popup} from 'mint-ui';
import Calendar from "@/components/common/Calendar.vue";
import { apiDiet ,apiDietDetail,apiChangement,apiSaveFoodRecordData} from "@/service/api/diet";
import { mapState, mapMutations } from "vuex";
import {
    apiRecommendation,
} from "@/service/api/result";
import { TimeTool } from "@/assets/js/timeTool.js";
import { debuglog } from "util";
import LayBg from "@/components/common/LayBg";

import { setTimeout } from 'timers';
import{
  deepCopy
}from "@/assets/js/util.js";

window.isCreatedFull = ""; // 设置全局是否重新配餐字段
export default {
    data() {
        return {
                dateVal1: 'no',
                scrollLeft: 'no',
            scrollTop:0,//滚动条高度
            foodlinkType:1, //当是7的时候就是茶饮，兼容跳转历史列表
            removeItmeIndex:'',//删除的历史记录其中的第几项的索引
            historyItem:{},//删除的历史记录其中的一项
            fixPop:false,//二次确定弹框状态
            historyList:[],//历史记录数据
            recordListPop:false,//历史记录弹框
            recordList:[],
             mealType:"",
            initData: { },
            dataArr:[{recipesDate:""}],//可选择时间的范围
            nursePlan: {
                nursePlanList: []
            },
            dateVal: 0, //点击的日期
            checkIndex:0,
            today:"",
            dietRecommendation:{
                breakfast:null,
                lunch:null,
                dinner:null,
                breakfastAddition:null,
                lunchAddition:null,
                dinnerAddition:null,
                drink:null
            },//每日配餐方案
            foodTimeType:"breakfast",//选中是配餐按钮
            moveBtnType:"",//转动的按钮当前配餐类型
            animateIndex:"",//转动的按钮当前索引
            recipesId:"",//食谱id
            showFoodDetailPopue:false, //是否展示添加记录详情遮罩
            activeFoodDetail:{
                foodId:"",
                foodType:"",
                isMetrology:"",
                metrologyTag:""
            },
            recordInfo:null,//记录数据
            opend:false,//兼容日历组件上来默认点击一次
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.scrollLeft = window.sessionStorage.getItem('a-scrollLeft')
            vm.dateVal1 = window.sessionStorage.getItem('a-dateVal')
        })
    },
    beforeDestroy() {
        window.sessionStorage.setItem('a-scrollLeft', this.scrollLeft)
        window.sessionStorage.setItem('a-dateVal', this.dateVal);
    },
    components: {
        LayBg,
        Calendar,
        Detail,
        Popup,
        Close
    },
    computed: {
        ...mapState(["code", "userInfo"])
    },
    watch:{
        foodTimeType(){
            window.sessionStorage.setItem("foodTimeType",this.foodTimeType)
        },
        recordListPop(n,o){
            if(n){
               this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
              
                document.getElementsByTagName("body")[0].style.overflow = 'hidden'
                document.getElementsByTagName("body")[0].style.position = 'fixed'
            }else{
                document.getElementsByTagName("body")[0].style.position = ''
                document.getElementsByTagName("body")[0].style.overflow = ''
                window.scrollTo(0,this.scrollTop);
            }
        }
    },
    // beforeRouteEnter(to,from,next){
    //      next(vm => {
    //         // 通过 `vm` 访问组件实例
    //         if(from.path=='/plan/foodrecommendList'){
    //             vm.foodTimeType =  window.sessionStorage.getItem('foodTimeType')||'breakfast';
    //             vm.checkIndex =  JSON.parse(window.sessionStorage.getItem('checkIndex')) ;  
    //         }
    //     }) 
    // },
    beforeRouteLeave(to,from,next){
        if(to.name=="foodRecommendList"){
            window.sessionStorage.setItem('checkIndex',JSON.stringify(this.checkIndex) );
        }
        next()
    },
    created() {
        this.$nextTick(()=>{
            this.getInitData();
            document.getElementsByTagName("body")[0].style.position = ''
            document.getElementsByTagName("body")[0].style.overflow = ''
        })
    },
    // 过滤器
    filters: {
        // 获取当前天的值
        getCutDay: function(date) {
            return new TimeTool().getDetail(date).day;
        }
    },
    methods: { 
        removefix(){
            document.getElementsByTagName("body")[0].style.position = ''
            document.getElementsByTagName("body")[0].style.overflow = ''
        },
        add0(n){
            if(n<10){
                return "0"+n
            }else{
                return n
            }
        } ,
        isToday(){
            return new Date().getFullYear()+""+(this.add0(new Date().getMonth()+1))+""+this.add0(new Date().getDate())//今天时间
        },
         ...mapMutations('administration', ['setTabarTopData']),  
        getInitData() {
            apiDiet(this.code, this.userInfo.userId).then(res => {
               console.log(res.nursePrinciple,22);
this.setTabarTopData(res.nursePrinciple)
                
               
                
                this.dataArr = res.recipesInfo.recipes;
                // this.getDietDetail(this.dataArr[0].recipesDate);
                this.opend = true;
                res.recipesInfo.recipes.forEach((item, index) => {
                    this.$set(
                        res.recipesInfo.recipes[index],
                        "planDate",
                        item.recipesDate.replace(/-/g, "")
                    );
                    this.$set(
                        res.recipesInfo.recipes[index],
                        "weekDate",
                        this.toggleWeek(
                            new TimeTool().getDetail(item.recipesDate).week
                        )
                    );
                    if (item.isCurDay == "2") {
                        this.$set(res.recipesInfo.recipes[index], "today", "1");
                        this.today = res.recipesInfo.recipes[index].recipesDate;
                    }else{
                         this.today = res.recipesInfo.recipes[0].recipesDate;
                    }
                });
                this.$set(
                    this.nursePlan,
                    "nursePlanList",
                    res.recipesInfo.recipes
                );
                this.nursePlan.nursePlanList = res.recipesInfo.recipes;
                console.log(this.nursePlan)
                // this.getDietDetail(this.today);
            });
        },
        // 获取食谱详情
        getDietDetail(time){
            apiDietDetail(this.code, this.userInfo.userId,time).then(res=>{
                this.dietRecommendation = res.dietRecommendation;
                this.recipesId = res.recipesId;
                this.foodTimeType =  window.sessionStorage.getItem('foodTimeType')||'breakfast';
            })
        },
        // 点击换一换
        changeRecipe(type,index,item,mealType){
            this.moveBtnType = type;
            this.animateIndex = index;
            var val =this.dateVal;
            apiChangement(this.code,this.userInfo.userId,item.foodId,item.foodName,item.foodHeat,item.initialHeat,mealType,this.recipesId,this.dataArr[val].recipesDate).then(res=>{
                
                if(mealType==='7'){
                    // 是茶饮
                    this.dietRecommendation.drink.foodList.index=this.dietRecommendation.drink.foodList.splice(index,1,res.foodInfo) ;
                }else{
                    // 非茶饮
                    this.dietRecommendation[this.foodTimeType].foodList.index=this.dietRecommendation[this.foodTimeType].foodList.splice(index,1,res.foodInfo) ;
                }
                this.moveBtnType = "";
                this.animateIndex = "";
                // 重新加载页面数据
                // this.getDietDetail(this.dataArr[this.dateVal].recipesDate);
            })
        },
        // 点击日期
        planDateClick(val, val1) {
            this.scrollLeft = val1
            // alert(this.scrollLeft )
            this.dateVal = val;
            this.checkIndex = val;
            this.dateVal1 = val;
            console.log(this.scrollLeft,"this.scrollLeft")
            console.log(this.dateVal,"this.dateVal")
            console.log(this.dateVal1,"this.dateVal1")
            this.foodTimeType='breakfast'
            // 上来回默认加载一次，所以兼容处理。
            // if(this.opend){    
                this.getDietDetail(this.dataArr[this.dateVal].recipesDate);
                this.$forceUpdate()
            // }
        },
        // 获取当前天对应的周 或者今日
        toggleWeek(weekNum) {
            let weekString;
            if (weekNum == 1) {
                weekString = "一";
            } else if (weekNum == 2) {
                weekString = "二";
            } else if (weekNum == 3) {
                weekString = "三";
            } else if (weekNum == 4) {
                weekString = "四";
            } else if (weekNum == 5) {
                weekString = "五";
            } else if (weekNum == 6) {
                weekString = "六";
            } else if (weekNum == 7) {
                weekString = "日";
            }
            return weekString;
        },
        // 点击食谱
        foodClick(val){
            this.foodTimeType  = val;
        },
        /**
         * 编辑
         * */
        showDetail(item,n){
            this.foodlinkType = n;
            this.activeFoodDetail.foodType = item.foodType;
            this.activeFoodDetail.foodId = item.foodId;
            
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
            this.getDietDetail(this.dataArr[this.dateVal].recipesDate);
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
                    mealType: this.foodlinkType?"7":this.dietRecommendation[this.foodTimeType].mealType,
                    foodType: this.recordInfo.foodType,
                    foodId: this.recordInfo.foodId,
                    count: this.recordInfo.count,
                    kilocalorie: this.recordInfo.kilocalorie?this.recordInfo.kilocalorie:"0",
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
                            mealType: this.foodlinkType?"7":this.dietRecommendation[this.foodTimeType].mealType,
                            foodType: this.foodType,
                            foodId: this.recordList[i].foodId,
                            count: this.recordList[i].foodCount,
                            kilocalorie: this.recordList[i].foodHeat?this.recordList[i].foodHeat:"0",
                            unit: this.recordList[i].unit
                        });
                        break;
                    }

                }
            }

            let recordDate = this.$store.state.plan.dateObj.fullDate;
            console.log(recordList,"recordListrecordListrecordList")
            apiSaveFoodRecordData(recordDate, recordList,this.userInfo.userId).then(res => {
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
        openHistryList(date){
            this.recordListPop=true;
            this.historyItem = {}
        },
        // 跳转到历史列表
        openHistoryPage(){
            this.$router.push({
                path:'/plan/foodrecommendList',
                query:{'mealType':this.dietRecommendation[this.foodTimeType].mealType,'date':this.dataArr[this.dateVal].recipesDate}
            })
        },

        // 删除选择的食物列表中的某一项
        removeHistoryItem(item,index){
           console.log(item,index);
           this.fixPop = true;
           this.historyItem = item;
           this.removeItmeIndex = index;
        },
        //提交删除
        commitRemove(){
            var list={...this.historyItem,'operateType':'3','recordFrom':'1'};
            
            apiSaveFoodRecordData(this.today.replace(/-/g,''), list,this.userInfo.userId).then(res => {
                if (res.retCode === 'SUCCESS') {
                   console.log(this.removeItmeIndex ,"删除索引");
                this.getDietDetail(this.dataArr[this.dateVal].recipesDate);
                } else {
                    this.$toast(res.tooltip);
                }
            });
            this.dietRecommendation[this.foodTimeType].recordList.splice(this.removeItmeIndex,1)
            if(this.dietRecommendation[this.foodTimeType].recordList.length==0){
                  this.recordListPop=false
            }
            this.fixPop = false;
        },
        //关闭删除
        closeRemove(){
            this.fixPop = false;
        }
    }
};
</script>
<style lang="scss" scoped>
.big {
    width: 100%;
    height: 110rem;
    background: red;
}

@import "@/assets/style/mixin.scss";
/*隐藏滚动条bar*/
.hide_bar::-webkit-scrollbar {
    display: none;
}
*::-webkit-scrollbar {
    display: none;
}
// 调整配餐按钮
.reset-meal-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        width: 6.5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat;
        background-position: center center;
        @include bg_color6();
        background-size: 6rem 2rem;
        @include font_color1();
        font-size: 0.9rem;
        @include box-shodow5(0 0.3rem 0.75rem 0);
        border-radius: 1.25rem;
        font-weight: bold;
    }
}
.home-food {
    width: 100%;
    // min-height: 100%;
    // padding: .8rem 0.75rem;
    box-sizing: border-box;
    @include bg_color1();
    // 配餐结果
    .evaluation-result {
        background-repeat: no-repeat;
        background-size: 100% auto;
        width: 100%;
        // height: 5.5rem;
        .siyuan {
            font-family: "SourceHanSerifCN-Bold";
        }
        dl {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: 1.05rem;
            padding-top: 1rem;
            dt {
                display: flex;
                align-items: flex-start;
                @include font_color13();
                font-size: 0.7rem;
                line-height: 1rem;
                margin-bottom: 0.3rem;
            }
            dd {
                font-size: 1.6rem;
                @include font_color1();
                line-height: 1.8rem;
            }
        }
    }
    // 测评结果介绍
    .result-cont {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        p {
            padding-bottom: 0.75rem;
            line-height: 140%;
            font-size: 0.75rem;
            @include font_color8();
        }
    }
    // 四个角背景
    .ctn {
        @include bg_color6();
        @include box_shodow1(0 0.3rem 1rem 0);
        border-radius: 0.2rem;
        padding: 1.4rem 0 1.5rem;
        box-sizing: border-box;
        position: relative;
    }
    // 日历
    .calendar {
        margin-bottom: 1.4rem;
        .calendar-box {
            overflow-x: auto;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            li {
                font-size: 0.7rem;
                display: flex;
                justify-content: space-between;
                white-space: nowrap;
                margin-bottom: 0.425rem;
                span {
                    width: 1.6rem;
                    height: 0.85rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-basis: 1.6rem /* 64/40 */;
                    flex-shrink: 0;
                    @include font_color14();
                    margin-right: 0.65rem;
                    &.orange-col {
                        @include font_color15();
                    }
                }
                &:nth-child(2) {
                    margin: 0;
                    margin-bottom: 0;
                    height: 1.7rem;
                    padding: 0;
                    span {
                        @include font_color4();
                        font-size: 0.85rem;
                        border-radius: 50%;
                        width: 1.6rem;
                        height: 1.6rem;
                        font-weight: bold;
                        &.orange-col {
                            @include bg_color();
                            @include font_color6();
                        }
                    }
                }
            }
        }
    }
    // 食物参照量list
    .food-reference {
        margin-bottom: 1.1rem;
    }
    .food-reference-cont {
        padding-left: 1rem;
        padding-right: 1rem;
        .reference-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            dl {
                dt {
                    img {
                        width: 7.35rem;
                    }
                }
            }
        }
    }
    // 每日配餐方案
    .days-programme {
        height: 100%;
        // margin-top: .8rem;
        .days-cont {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            .day-wrap-box{
                position: relative;
                img{
                    display: inline-block;
                    width: 1.05rem;
                    height: 2.875rem;
                }
                .img-pop-left{
                    position: absolute;
                    left: 0;
                    top :0;
                }
                .img-pop-right{
                    position: absolute;
                    right:  0;
                    top :0;
                }
            .day-wrap {
                width: 100%;
                padding: 0 1.05rem;
                box-sizing: border-box;
                overflow-x: auto;
                height: 1.7rem;
                // background: red;
                margin-bottom: 1.2rem;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                // justify-content: space-between;
                white-space: nowrap;
                .day-item {
                    width: 1.7rem;
                    height: 100%;
                    margin-right: 1.4rem;
                    font-size: 0.85rem;
                    color: #333333;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: bold;
                    .dian {
                        display: block;
                        width: 0.3rem;
                        height: 0.3rem;
                    }
                }
                .active {
                    @include font_color10();
                    // color: #de9648;
                    .dian {
                        display: block;
                        width: 0.3rem;
                        height: 0.3rem;
                        border-radius: 50%;
                        // background: #de9648;
                        @include bg_color();
                    }
                }
            }
            }

            .toggle-food-wrap {
                width: 100%;
                padding: 0 1.05rem;
                box-sizing: border-box;
                .links {
                    width: 100%;
                    height: 1px;
                    background: #eeeeee;
                }
                .describe {
                    width: 100%;
                    padding: 0.65rem 0.8rem;
                    box-sizing: border-box;
                    @include border2(1px solid);
                    font-size: 0.7rem;
                    color: #999999;
                }
                .food-proposal-link {
                    margin-top: 0.7rem;
                    width: 15.15rem;
                    height: 4rem;
                    margin-bottom: 1.4rem;
                    @include background-image();
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .food-proposal-wrap {
                        width: 14.65rem;
                        height: 3.5rem;
                        @include border5(.025rem /* 1/40 */ solid);
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 0.45rem;
                        box-sizing: border-box;
                        .num-box {
                            .name {
                                font-size: 0.85rem;
                                color: #333333;
                                font-weight: bold;
                            }
                            .num {
                                font-size: 0.6rem;
                                @include font_color1();
                            }
                        }
                        .btn-box {
                            font-size: 0.6rem;
                            color: #333333;
                            display: flex;
                            align-items: center;
                            .p{
                                 @include font_color18();
                            }
                            .jt {
                                margin-left: 0.3rem;
                                width: .475rem;
                                height: .4rem;
                                display: inline-block;
                                background-size: cover;
                                // border-right: 0.35rem solid transparent;
                                // border-left: 0.35rem solid transparent;
                                // border-top: 0.5rem solid #de9648;
                            }
                            .add{
                                width: 2rem;
                                height: 2rem;
                                display: block;
                                background-size: cover;
                                margin-left: .3rem;
                            }
                        }
                    }
                }
                // 食物列表
                .food-list{
                    width: 100%;
                    // margin-top:1.4rem;
                    .food-item{
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top:.7rem;
                        .item-left{
                            display: flex;
                            align-items: center;
                        .avatar{
                            width: 2.2rem;
                            height: 2.2rem;
                             @include bg_color();
                            // background: #de9648;
                            border-radius:50%;
                            margin-right: .5rem;
                        }
                        .name{
                            font-size: .75rem;
                            color: #333333;
                        }
                        .num{
                            font-size:.6rem;
                            color: #999999;
                        }
                        }
                        .toggle-btn{
                            width: 1.6rem;
                            height: 1.6rem;
                            border-radius:50%;
                        }
                        .huan{
                            width: 1.6rem;
                            height: 1.6rem;
                            display: block;
                            cursor: pointer;
                            animation: spin 1s infinite linear;
                        }
                    }
                }
                // 推荐的title
                .food-title{
                    width: 100%;
                    height: 1.2rem;
                    display: flex;
                    align-items: center;
                    margin-top:1.5rem;
                    font-weight: bold;
                    .icon{
                        width: .75rem;
                        height: .75rem;
                        margin-right: .5rem;
                    }
                    .title{
                        font-size: .85rem;
                        color: #333333;
                    }
                }
                // 饮食分析按钮
                .btn-add{
                    margin: 0 auto;
                    margin-top:1.8rem ;
                    line-height: 0;
                    width: 9.85rem /* 394/40 */;
                    height: 2.4rem /* 96/40 */;
                    @include border2(.05rem /* 2/40 */ solid);
                    border-radius: 1.25rem /* 50/40 */;
                    font-size: .9rem /* 36/40 */;
                    @include font_color10();
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    background-repeat: no-repeat;
                    background-size: 9.3275rem /* 373.1/40 */ 1.9rem /* 76/40 */;
                    background-position: center center;
                }
            }
        }
        // 标题
        .programme-tit {
            background-repeat: no-repeat;
            width: 100%;
            height: 2.2rem;
            background-size: cover;
            box-sizing: border-box;
            padding: 0 1.05rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .pro-tit {
                @include font_color6();
                font-size: 0.85rem;
                font-weight: bold;
            }
            .time {
                font-size: 0.85rem;
                @include font_color1();
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 0.475rem;
                    height: 0.3rem;
                    margin-left: 0.3rem;
                }
            }
        }
        // diet-recommendation
        .diet-recommendation {
            padding: 0rem 1.05rem;
            .links {
                width: 100%;
                height: 1px;
                background: #eeeeee;
                margin-bottom: 0.8rem;
            }
            .diet-recommendation-tit {
                display: flex;
                overflow-x: scroll;
                width: 100%;
                box-sizing: border-box;
                ul {
                    display: flex;
                    justify-content: space-between;
                    white-space: nowrap;
                    li {
                        // flex-basis: 2.05rem;
                        flex-shrink: 0;
                        font-size: 0.85rem;
                        @include font_color5();
                        margin-right: 1.4rem;
                        // width: 2.05rem;
                        line-height: 1.2rem;
                        height: 2.6rem;
                        text-align: center;
                    }
                    .curli {
                        @include font_color15();
                        position: relative;
                        font-weight: bold;
                        &::after {
                            width: 0.3rem;
                            height: 0.3rem;
                            @include bg_color();
                            border-radius: 50%;
                            content: "";
                            position: absolute;
                            top: 1.4rem;
                            left: 38%;
                        }
                    }
                }
            }

            // 饮食推荐内容
            .diet-cont {
                // 饮食推荐内容
                .box {
                    border: 1px solid rgba(222, 150, 72, 0.4);
                    // @include bg_color23();
                    padding: 0.8rem 0.65rem;
                    @include border2(1px solid);
                    font-size: 0.7rem;
                    color: #999999;
                }
            }
        }
        .tea-cont {
            padding: 0rem 1.05rem;
        }
    }
    // 推荐茶饮标题
    .tea-tit {
        display: flex;
        align-items: center;
        img {
            width: 0.75rem;
            height: 0.75rem;
            margin-right: 0.5rem;
        }
        span {
            font-size: 0.85rem;
            @include font_color4();
            font-weight: bold;
        }
    }
    // 食物参照量标题
    .food-reference-tit {
        margin-top: 1rem;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: bold;
        span {
            font-size: 0.85rem;
            @include font_color15();
            margin-right: 0.6rem;
            font-weight: bold;
            padding-left: 0.25rem;
        }
        img {
            width: 0.475rem;
            height: 0.4rem;
        }
        img.toggle {
            transform: rotate(180deg);
            transition: transform 0.2s;
        }
    }
    // 动画
    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(300deg);
        }
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(300deg);
        }
    }
    // 推荐饮食和推荐茶饮模板样式
    .recommended-list {
        padding-bottom: 1.125rem;
        padding-top: 0.35rem;
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.7rem;
            dl {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                dt {
                    margin-right: 0.5rem;
                    img {
                        width: 2.2rem;
                        height: 2.2rem;
                        border-radius: 50%;
                    }
                }
                dd {
                    font-size: 0.75rem;
                    @include font_color4();
                    font-weight: bold;
                    p {
                        margin-top: 0.1rem;
                        font-size: 0.6rem;
                        @include font_color5();
                        font-weight: normal;
                    }
                }
            }
            .icon-change {
                width: 1.6rem;
                height: 1.6rem;
            }
            img.icon-change:hover::after {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
                -webkit-transition: -webkit-transform 1s linear;
                transition: transform 1s linear;
            }
        }
    }
    .fix-wrap{
        width: 15rem;
        height: 10rem;
        background: #FFFFFF;
        box-shadow: 0 12px 40px 0 rgba(211,170,160,0.10);
        border-radius: .2rem;
        margin: 0 auto;
        color: #333;
        padding: 1.3rem 0 .9rem;
        box-sizing: border-box;
        .title{
            text-align: center;
            font-size:1rem;
            margin-bottom:1.25rem;
            font-weight: bold;

        }
        .quest{
            margin:0 auto ;
            font-size:.85rem;
            text-align: center;
            font-weight: bold;
        }
        .box-bottom{
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 1.5rem;
            .close{
                width: 6rem;
                height: 2.35rem;
                background: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                @include border2(.05rem /* 2/40 */ solid);
                border-radius: 1.25rem /* 50/40 */;
                font-size: .9rem /* 36/40 */;
                @include font_color10();
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                background-repeat: no-repeat;
                background-size: 5.5rem /* 373.1/40 */ 1.9rem /* 76/40 */;
                background-position: center center;
                @include font_color6();
                @include bg_color();
                @include box_shodow(0 0.3rem 0.75rem 0);
            }
            .ok{
                margin-left: 1.05rem;
                width: 6rem;
                height: 2.35rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #F6F6F6;
                // @include border2(.05rem /* 2/40 */ solid);
                border-radius: 1.25rem /* 50/40 */;
                font-size: .9rem /* 36/40 */;
                color: #333333;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                background-repeat: no-repeat;
                background-size: 5.5rem /* 373.1/40 */ 1.9rem /* 76/40 */;
                background-position: center center;
            }
        }
    }
    .recordList-wrap{
        width: 100%;
        height: 24.575rem;
        background: #fff;
        padding: .5rem 0 0 .8rem;
        box-sizing: border-box;
        border-radius: .5rem .5rem 0 0;
        .close-wrap{
            width:100%;
            display: flex;
            justify-content:  flex-end;
            .close-btn{
                width: 1.3rem;
                height: 1.3rem;
                margin-right: .5rem;
                background-size: cover;
            }
        }
        .go-add{
            margin: 0 auto;
            margin-top:.9rem ;
            line-height: 0;
            width: 9.85rem /* 394/40 */;
            height: 2.4rem /* 96/40 */;
            @include border2(.05rem /* 2/40 */ solid);
            border-radius: 1.25rem /* 50/40 */;
            font-size: .9rem /* 36/40 */;
            @include font_color10();
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            background-repeat: no-repeat;
            background-size: 9.3275rem /* 373.1/40 */ 1.9rem /* 76/40 */;
            background-position: center center;
        }
        .margin-bottom{
            margin-bottom: 3.4rem;
        }
        .wrap-list{
            max-height:19.5rem;
            overflow-y:scroll;
        }
        .history-list-wrap{
            width: 100%;
            display: flex;
            .left{
                height: 3.4rem;
                width: 4.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .item-close{
                    width:1.1rem;
                    height: 1.1rem;
                    border-radius: 50%;
                    background-size: cover;
                }
                img{
                    width:2.2rem;
                    height: 2.2rem;
                    border-radius: 50%;
                    margin-right: .5rem;
                }
            }
            .right{
                flex: 1;
                height: 3.4rem;
                border-bottom: 1px solid #EDEDED;
                display: flex;
                justify-content:space-between;
                align-items: center;
                .name{
                    font-size: .75rem;
                    color: #333333;
                }
                .num{
                    font-size: .6rem;
                    color: #999999;
                }
                .long{
                    font-size: .85rem;
                    @include font_color();
                    margin-right: .8rem;
                }
            }
        }
    }
}
</style>
<style>
.mint-popup{
    background: rgba(0,0,0,0) !important;
}
</style>
