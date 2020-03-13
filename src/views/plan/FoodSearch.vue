<template>
    <div class="container wj">
         <!-- 搜索框 -->
        <header ref="ids">
            <InputSearch @input="handleInputSearch" v-model="criteria"/>
        </header>
        <!-- 历史纪录盒子 -->
        <div class="history_box" v-if="list.length===0 && historyList.length>0 && !isUserInputed" >
            <div class="history_title flex_c just_sb">
                <span>历史记录</span> 
                <img @click="clearHistory" src="@/assets/plan/btn_zdyss_sc@2x.png" alt="" class="dustbin tap_events">
            </div>
             <!-- 历史记录列表 -->
             <ul class="history_list">
                 <li class="flex_c" v-for="val in historyList" :key="val" @click="handleHistoryListClick(val)">{{val}}</li>
             </ul>
        </div>
        <ul class="list"  v-if="list" @scroll="watchScroll">
            <list-slider @click="showFoodDetail(idx,val)" v-for="(val,idx) in list" :key="idx"  :name="val.foodName" :imgUrl="val.imageUrl" :desc="val.minCount+val.unit" :heat="val.minCountHeat+'大卡'"></list-slider>
        </ul>
        <!-- 弹出热量选择 -->
        <Popup  class="food_detail full_x" position="bottom" v-model="showFoodDetailPopue">
            <Close @close="showFoodDetailPopue=false">
                <Detail v-if="showFoodDetailPopue" @addSelectedList="addSelectedList">
                    <div v-if="showInfo" class="tabber tap_events" v-show="activeFoodDetail.foodType===1" slot="tabber" @click="$router.push({path:'/details',query:{foodId:activeFoodDetail.foodId,mealType:1}})">
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
import { mapState } from 'vuex'
import {
    searchFoodList,

} from "@/service/api/plan";
import { apiFoodDetails } from '@/service/api/details'
import {
    isEmpty,
    deepCopy
} from "@/assets/js/util.js";
import InputSearch from "@/components/plan/InputSearch";
import ListSlider from "@/components/plan/ListSlider";
import Close from "@/components/plan/Close";
import Detail from "@/components/plan/Detail";
import "@/styles/flex.scss";
// 组件
import {
    Popup,
} from 'mint-ui';
export default {
    components:{
        InputSearch,
        ListSlider,
        Popup,
        Close,
        Detail
    },  
    computed:{
        ...mapState(['code', 'userInfo']),
         activeFoodDetail(){//食物详情
            const {
                isMetrology,
                metrologyTag,
                foodId,
                foodType
            }=this.$store.state.plan.activeFoodDetail;
        
            return {
                isMetrology,//是否显示承重按钮 0是 1 否
                metrologyTag,//承重跳转标识  1 类 2 明细
                foodId,
                foodType
            }
      },
    },
    data(){
        return{
            showInfo:true, //是否显示食物详情，默认显示，当没食材信息的时候，不显示。
            criteria:"",
            list:[],//搜索结果
            pageInfo:{//翻页信息
                pageNum:1,
                pageSize:10
            },
            isPending:false,//防抖节流开关
            showFoodDetailPopue:false,
            historyList:[//历史搜索记录

            ],
            isUserInputed:false,//用户是否输入过信息了  如果输入过了就隐藏历史记录
        }
    },
    
    created(){
        this.getHistory();
    },
    mounted(){
        this.$nextTick(()=>{
             let windowH = document.body.clientHeight || document.documentElement.clientHeight;
             let headH =  this.$refs.ids.getBoundingClientRect().height
             this.warpH = windowH - headH
            //   console.log(this.$refs.ids.getBoundingClientRect().height,tt )
        })
    },
    methods:{
        //监听页面滚动加载
        watchScroll() { 
            // const target =event.target;
            // const scrollTop = target.scrollTop;
            // const wrapperHeight =target.offsetHeight;
            // let bottomDistance ;
            // if(this.foodType===1){//常见列表
            //  const loadingBarHeight =this.$refs.loadingBar.$el.offsetHeight;
            //   const normalDom =this.$refs.normal;
            //   const normalH= normalDom.offsetHeight;
            //   bottomDistance = normalH - wrapperHeight - scrollTop+loadingBarHeight;
            // }else{
            //   const loadingBarHeight =this.$refs.customLoadingBar.$el.offsetHeight;
            //   const customDom=this.$refs.custom;
            //   const customH =customDom.offsetHeight;
            //   const nodeH =this.$refs.note.offsetHeight;
            //   bottomDistance=customH+loadingBarHeight+nodeH-wrapperHeight-scrollTop;
            // }
            // if (bottomDistance > 40) {
            //   this.toLower = false;
            // } else {
            //   this.toLower = true;
            // }
        },
        /**
         * 同步历史纪录
         */
        getHistory(){
            let history  = window.localStorage.getItem("foodSearchHistory");
            if(!isEmpty(history)) {
                this.historyList=JSON.parse(history);
            }
        },
        /**
         * 点击选择历史搜索记录
         */
        handleHistoryListClick(val){
           
            this.criteria=val;
            this.handleInputSearch(val,true);
        },
        /**
         * 清空搜索记录
         */
        clearHistory(){
            this.historyList=[];
            window.localStorage.setItem("foodSearchHistory",JSON.stringify(this.historyList))
        },
        /**
         * 监听用户输入
         */
        async handleInputSearch(criteria,shouldShowLoading){
           
            const {
                pageInfo,
            }=this;
            if(isEmpty(criteria)) return;
            if(shouldShowLoading){
                this.$loading.show()
            }
            try{
                const searchResult=await searchFoodList(criteria,pageInfo);
                console.log(searchResult.foodList)
                this.list=searchResult.foodList;
            }catch(err){
            }
            if(shouldShowLoading){
                this.$loading.hide()
            }
            this.isUserInputed=true;
            // this.isPending=false;
        },
        /**
         * 点击显示滑尺
         */
        showFoodDetail(actIdx,val){
                if(val){
                    apiFoodDetails(this.code,this.userInfo.userId,val.foodId,this.$route.query.mealType).then(res=>{
                    this.showInfo = res.efficacys.length;
                    })  
                }
                let  item =deepCopy(this.list[actIdx]);
                item.extensionUnits=item.extensionUnits ||[]
  
                const isSmall = (item.unit=="克" ||item.unit=="ml" ||item.unit=="毫升")
                item.extensionUnits.unshift({
                  unit:item.unit,
                  unitSize:isSmall? "小":"大",
                  unitValue:1,
                  count:isSmall?100:1
                });
            item.foodType=1,//系统食物
            item.name=item.foodName;//重命名foodName
            this.$store.commit("plan/COVER_ACTIVE_FOOOD_DETAIL",item);
         
            this.$nextTick(()=>{
                this.showFoodDetailPopue=true;
            })
        },
        /**
         * 添加已选列表
         */
        addSelectedList(payload){
            const activeFoodDetail=this.$store.state.plan.activeFoodDetail;
            //增加已选列表缓存
            const selectedFoodList =window.sessionStorage.getItem("selectedFoodList") ? JSON.parse(window.sessionStorage.getItem("selectedFoodList")) : [];
            selectedFoodList.push(Object.assign(activeFoodDetail,payload));
            window.sessionStorage.setItem("selectedFoodList",JSON.stringify(selectedFoodList));
            //添加history 使其成为长度不超过5的无重复数组 如果长度为5则替换第一个
            let history  = window.localStorage.getItem("foodSearchHistory");
            const name = activeFoodDetail.foodName;
            if(!isEmpty(history)) {
                history=JSON.parse(history)
            }else{
                history= [] ;
            }
            if (history.indexOf(name)===-1){
               if(history.length<5){
                    history.unshift(name)
               }else{
                  history.unshift(name)
                  history.pop();
               }
            }
            window.localStorage.setItem("foodSearchHistory",JSON.stringify(history));
            this.$router.back();
        }
    }
}
</script>


<style lang="scss" scoped>
 @import "@/styles/plan/food&sportSearch.scss";
</style>
