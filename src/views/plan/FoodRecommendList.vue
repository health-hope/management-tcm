<template>
<div class="foodlist-container wj">
  
    <div class="fix_box p_f t_0 l_0 full_x bd_f " >
        <!-- 搜索框 -->
        <header >
            <router-link tag="div" :to="{name:'foodSearch',query:{mealType:$route.query.mealType}}" class="model_inpt flex_c just_c">
                <img src="@/assets/plan/search.png" alt="" class="icon_search">
                <span>请输入食物名称</span>
            </router-link>
        </header>
        <!-- 切换栏 -->
        <ul class="banner flex_c ">
            <li class="flex_50 flex_c p_r just_c tap_events" :class="{active:foodType===1}" @click="foodType=1">常见</li>
          <li class="flex_50 flex_c p_r just_c tap_events"   :class="{active:foodType===2}" @click="foodType=2">自定义</li>
        </ul>
    </div>
    <!-- 列表 -->
    <div class="router_container full_y over_s">
          <div class="inner full_y over_s"  v-show="foodType===1" @scroll="watchScroll">
            <!-- 常见 -->
            <div class="normal_container"  >
              <ul ref="normal"  @scroll="watchScroll">
              
                <ListSlider class="system" @click="showFoodDetail('foodRecommendInfo',idx ,val)" v-for="(val,idx) in foodRecommendInfo.foodList"  :key="idx" :name="val.foodName" :imgUrl="val.imageUrl" :desc="val.minCount+val.unit" :heat="val.minCountHeat+'大卡'"></ListSlider>
              </ul>
              <LoadingBar ref="loadingBar" v-show="!foodRecommendInfo.searchInfo.pageInfo.isLastPage" :noMore="foodRecommendInfo.searchInfo.pageInfo.isLastPage || false" ></LoadingBar>
            </div>
          </div>
           <div class="inner full_y over_s"  v-show="foodType===2" @scroll="watchScroll">
              <!-- 自定义列表 -->
              <div class="custom_container p_r flex column">
                  <div class="add_custom_btn_container">
                      <router-link tag="div" :to="{path:'/plan/foodcustom',query:{mealType:$route.query.mealType}}"  :style="{backgroundImage: 'url(bth_bg_record_add.png)'}  | PUBLIC_PATH"   class="add_custom_food flex_c just_c"  ref="custom_bottom">
                          <img :src="'bth_record_add.png' | PUBLIC_PATH"  alt="" class="icon"><span>添加自定义食物</span>
                      </router-link>
                  </div>
                  <ul class="p_r grow_1 food_custom_list" :class="{empty:!customInfo.foodList.length}" :src="'img_record_nodiet.png' | PUBLIC_PATH"  ref="custom">
                    <ListSlider class="custom" v-for="(val,idx) in customInfo.foodList" v-longtouch:1000="delCustomerFood" :data-id="val.foodId" @click="showFoodDetail('customInfo',idx)"  :key="idx" :name="val.foodName" :imgUrl="val.imageUrl" :desc="val.minCount+''+val.unit" :heat="val.minCountHeat+'大卡'"></ListSlider>
                  </ul>
                  <div class="note full_x flex_c just_c shrink_0" v-if="customInfo.foodList.length" ref="note">
                        自定义食物不参与饮食分析
                  </div>
                <LoadingBar ref="customLoadingBar" class="shrink_0"  v-show="!customInfo.searchInfo.pageInfo.isLastPage" :noMore="foodRecommendInfo.searchInfo.pageInfo.isLastPage || false"></LoadingBar>
              </div>
            </div>
        <!-- -->
    </div>
    <footer class=" shrink0  bd_f p_f l0 full_x b_0 l_0 tap_events" :style="showSelectedPopue? 'z-index:10000' :''" @click="showSelectedPopue=selectedFoodList.length ?!showSelectedPopue:false ">
       <!-- 未选择 -->
       <!-- 未选择不可以弹出列表 -->
        <div class="footer_container_empty flex_c just_sb full" v-show="selectedFoodList.length===0">
          <div class="footer_left">
              未添加饮食记录
          </div>
          <div class="footer_right flex_c just_c c_f fs_bold btn_disable">
            确认记录
          </div>
        </div>
        <!-- 已选择 -->
        <div class="footer_container flex_c just_sb full" v-show="selectedFoodList.length>0">
          <div class="footer_left flex_c grow_1" :class="{active:showSelectedPopue}">
              <img src="@/assets/plan/triangle.png" alt="" class="icon_triangle">
              <div class="p_r flex_c ft32" >
                已选
                <span class="after p_a flex_c just_c ">{{selectedFoodList.length}}</span>
              </div>
          </div>
          <div class="footer_mid shrink_0  flex_c">
              <span>总热量 : </span>
              <span class="val">{{totalHeat}}</span>
              <span class="unit">大卡</span>
          </div>
          <div class="footer_right shrink_0 flex_c just_c c_f fs_bold shrink_0 btn_active" @click.stop="saveRecorder">
            确认记录
          </div>
        </div>
    </footer>
    <!-- 弹出热量选择 -->
    <Popup  class="food_detail" position="bottom" v-model="showFoodDetailPopue">
      <Close @close="showFoodDetailPopue=false">
        <Detail v-if="showFoodDetailPopue" @addSelectedList="addSelectedList">
            <div v-if="showInfo" class="tabber tap_events" v-show="activeFoodDetail.foodType===1" slot="tabber"  @click="$router.push({path:'/details',query:{foodId:activeFoodDetail.foodId,mealType:1}})">
                <img :src="'bth_record_details.png' | PUBLIC_PATH" alt=""  class="icon_detail">
                <span>详情</span>
            </div>
            <div class="tabber tap_events" v-show="activeFoodDetail.isMetrology==='0'" slot="tabber" @click="$router.push({name:'foodastimate',params:{foodId:activeFoodDetail.foodId,metrologyTag:activeFoodDetail.metrologyTag}})">
                <img class="icon_detail" :src="'bth_record_estimate.png' | PUBLIC_PATH" alt="" srcset="">
                <span>估算</span>
            </div>
        </Detail>
      </Close>
    </Popup> 
    <!-- 弹出已选列表 -->
    <!-- transform:  translate3d(-50%, -2.4rem, 0); -->
    <Popup position="bottom" v-model="showSelectedPopue"  >
        <Close @close="showSelectedPopue=false" style="padding-bottom:0">
            <ul class="selected_list">
              <ListSlider :class="{custom:val.foodType==2}" @click="showFoodDetail('selectedFoodList',idx,val)"  v-longtouch="handleLongTouch"  :data-idx="idx"  v-for="(val,idx) in selectedFoodList"  :key="idx" :name="val.foodName" :imgUrl="val.imageUrl" :desc="val.count+''+val.unit" :heat="val.kilocalorie+'大卡'"></ListSlider>
            </ul>
        </Close>
    </Popup>
</div>
</template>

<script>
import { mapState } from 'vuex'
// 接口
import{
  getFoodRecommondList,
  getFoodCustomList,
  saveFoodRecordData,
  delCustomerFood
} from "@/service/api/plan";
// 组件
import {
    Popup,
    MessageBox
} from 'mint-ui';

import{
  getStorage,
  setStorage,
  delStorage,
  isEmpty,
  deepCopy
}from "@/assets/js/util.js";
import { apiFoodDetails } from '@/service/api/details'
import Detail from "@/components/plan/Detail";
import ListSlider from "@/components/plan/ListSlider";
import Close from "@/components/plan/Close";
import LoadingBar from "@/components/plan/LoadingBar"
import "@/styles/flex.scss";
import {
  longtouch
} from "@/assets/js/directives"
export default {
    data() {
        return {
          showInfo:true, //是否显示食物详情，默认显示，当没食材信息的时候，不显示。
          showFoodDetailPopue:false,//是否展示详情遮罩
          showSelectedPopue:false,//是否展示已选列表遮罩
          deviceInfo:{//设备信息
          },
          foodRecommendInfo:{//食物推荐列表
              foodList:[

              ],
              isPending:false,//此列表是否正在加载
              searchInfo:{
                mealType:this.$route.query.mealType, //0 默认 1 早餐 2 午餐 3 晚餐 4 早加餐5 午加餐 6 晚加餐
                pageInfo:{
                  pageNum:1,
                  pageSize:10,
                  direction:"NEXT",
                  pageIndex:"",
                  isLastPage:true
                },
              }
          },
          customInfo:{//获取自定义食物列表所需数据
            searchInfo:{
               pageInfo:{
                pageNum:1,
                pageSize:10,
                direction:"NEXT",
                pageIndex:"",
                isLastPage:true
              },
            },
            isPending:false,//此列表是否正在加载
            foodList:[

            ]
          },
          selectedFoodList:[//已选食物列表

          ],
          isPending:false,//防抖节流
          toLower:false,//是否滚动到底部了
          //点击展示详情的方式  
          //当 type ==="edit"的时候表示编辑已选列表 同时 actIdx作为被编辑的序号 为 add为添加已选列表
          actMod:{ 
              actIdx:0,
              type:"edit"
          },
          foodType:1,//激活的tabber 1系统 2 自定义
          hasRecored:false,//是否点击过同步记录 
        }
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
      /**
       * 已选食物总热量
       */
      totalHeat(){
          const selectedFoodList=this.selectedFoodList;
          let total = 0;

          selectedFoodList.map(val=>{
            total+=val.kilocalorie;
            
          })
        
          return parseInt(total);
      },
      //已选的食物列表
     
    },
    directives:{
      longtouch
    },
    watch:{
      showSelectedPopue(n){//如果显示已选列表则 Popue组件不应盖住footer
        this.$nextTick(()=>{
          if(n){
            document.querySelectorAll(".mint-popup-bottom")[1].style.transform="translate3d(-50%, -2.4rem, 0)";
          }else{
            document.querySelectorAll(".mint-popup-bottom")[1].style.transform="";         
          }
        })
      },
      toLower(n){//监听滚动到底部了 请求接口
        if(n){//滚动到底部了
       
          if(this.foodType===1 && !this.foodRecommendInfo.searchInfo.pageInfo.isLastPage){//常见列表页面激活
              this.getFoodRecommondList();
          }else if(this.foodType===2 && !this.customInfo.searchInfo.pageInfo.isLastPage){//自定义列表页面激活
                this.getFoodCustomList();
          }
        }
      },
      selectedFoodList(n){// 同步已选列表
        setStorage("session","selectedFoodList",this.selectedFoodList)
        if(!n.length){//当已选列表没有列表的时候隐藏popue
          this.showSelectedPopue=false;
        }
      },
    },
    components: {
        Popup,
        Detail,
        Close,
        ListSlider,
        LoadingBar
    },
     beforeRouteEnter(to,from,next){
    
      next(vm=>{
        if(from.path==="/plan/foodcustom"){//从添加自定义页面返回仍然激活对应列表
          vm.foodType=2
        }
        if(from.path=="/plan/detail" || from.name=="foodastimate"){//估算或者详情页面回来仍然展示食物详情
          vm.showFoodDetailPopue=true
        }
      })
    },
    created(){
    
      const selectedFoodList= getStorage("session","selectedFoodList")
      if(!isEmpty(selectedFoodList)){
        this.selectedFoodList=selectedFoodList;
      }
      this.initData();
    },
    mounted() {
      this.getDeviceInfo();
    },
    methods:{
      /**
       * 获取接口数据
       */
      async initData(){
        this.$loading.show();
          await Promise.all([this.getFoodRecommondList(),this.getFoodCustomList()])  
        this.$loading.hide();
      },
      /**
       * @desc 获取推荐列表
       */
      async getFoodRecommondList(){
        if(this.foodRecommendInfo.isPending) return;
          this.foodRecommendInfo.isPending=true;
          try{
            const{ searchInfo,foodList }=this.foodRecommendInfo;
            const {mealType, pageInfo}=searchInfo
            const result =await getFoodRecommondList(mealType, pageInfo,this.userInfo.userId);
          
            if(result.foodList instanceof Array){
              result.foodList.map(val=>val.foodType=1);
              this.foodRecommendInfo.foodList=[...foodList,...result.foodList];
            }
            result.pageInfo.pageNum++;
            this.foodRecommendInfo.searchInfo.pageInfo=result.pageInfo;       
          }catch(err){
           
          }
          this.foodRecommendInfo.isPending=false;
      
         
      },
      /**
       * 获取自定义列表
       */
      async getFoodCustomList(){
        if(this.customInfo.searchInfo.isPending) return;
        this.customInfo.searchInfo.isPending=true;
        try{
            const result =await getFoodCustomList(this.customInfo.searchInfo.pageInfo,this.userInfo.userId);
            
            if(result.foodList instanceof Array){
              result.foodList.map(val=>val.foodType=2);
              this.customInfo.foodList=[...this.customInfo.foodList,...result.foodList];
            }
            
            if(result.pageInfo){
              result.pageInfo.pageNum++;
              this.customInfo.searchInfo.pageInfo=result.pageInfo;
            }
        }catch(err){
        }
        this.customInfo.searchInfo.isPending=false;
      },
      /**
       * 更新设备信息(高度)
       */
      getDeviceInfo(){
        const getWindowHeight=()=>this.$store.commit("plan/updateDeviceInfo",{wh:window.innerHeight});
        window.addEventListener("resize",getWindowHeight,false);
        getWindowHeight();
      },
      /**
       * 点击显示滑尺
       */
      showFoodDetail(type,actIdx,val){
        if(val){
        apiFoodDetails(this.code,this.userInfo.userId,val.foodId,this.$route.query.mealType).then(res=>{
          console.log(res.efficacys.length,"res.efficacys.lengthres.efficacys.length");
          // this.$nextTick(()=>{

          // })
          this.showInfo = res.efficacys.length;
        })
        }

        let item,mode;
        switch (type){
          case "selectedFoodList"://点击已选食物列表
            {
              item =this.selectedFoodList[actIdx];
              mode ={ 
                actIdx,
                type:"edit"
              }
              // 已选食物已经选择过单位 反显单位
              item.extensionUnits.map((val,idx)=>{
                  if(val.unit===item.unit){
                    item.activeIndex=idx
                  }
              })
            }
            break;
          default://点击常见食物列表或自定义食物列表
            {
              item =deepCopy(this[type].foodList[actIdx]);
                item.extensionUnits=item.extensionUnits ||[]
                const isSmall = (item.unit=="克" ||item.unit=="ml" ||item.unit=="毫升")
                item.extensionUnits.unshift({
                  unit:item.unit,
                  unitSize:isSmall? "小":"大",
                  unitValue:1,
                  count:isSmall?100:1
                });
              
              mode ={ 
                  type:"add"
              }
            }
            break; 
        }
        this.actMod=mode;
        item.name=item.foodName //将foodName 重命名为 name 可以和运动列表统一
     
      
        this.$store.commit("plan/COVER_ACTIVE_FOOOD_DETAIL",item);
        this.$nextTick(()=>{
          this.showFoodDetailPopue=true;
        })
      },
      /**
       * 添加/编辑已选列表
       */
      addSelectedList(payload){
      
   
        const {actIdx,type}=this.actMod;
        if(type==="edit"){
         
          this.$set(this.selectedFoodList,actIdx,payload)
          
        }else{
          this.selectedFoodList.push(payload);
        }
        this.showFoodDetailPopue=false;
      },
       /*
       * 删除自定义食物
       */
      async delCustomerFood(event){
          const e = await MessageBox({
            title:"确认要删除吗?",
            showCancelButton:true,
             closeOnClickModal:false,
          })
          if(e==="confirm"){
            const foodId = event.dataset.id;
          
            await delCustomerFood(foodId);
            this.$toast({
                message:"操作成功",
                duration:1500
            })
            //重置数据
            this.customInfo.foodList=[];
            this.customInfo.searchInfo.pageInfo={
              pageNum:1,
              pageSize:"",
              direction:"NEXT",
              pageIndex:"",
              isLastPage:true
            }
            this.getFoodCustomList();
          }
      },
       //监听页面滚动加载
      watchScroll() { 
        const target =event.target;
        const scrollTop = target.scrollTop;
        const wrapperHeight =target.offsetHeight;
        let bottomDistance ;
        if(this.foodType===1){//常见列表
         const loadingBarHeight =this.$refs.loadingBar.$el.offsetHeight;
          const normalDom =this.$refs.normal;
          const normalH= normalDom.offsetHeight;
          bottomDistance = normalH - wrapperHeight - scrollTop+loadingBarHeight;
        }else{
          const loadingBarHeight =this.$refs.customLoadingBar.$el.offsetHeight;
          const customDom=this.$refs.custom;
          const customH =customDom.offsetHeight;
          const nodeH =this.$refs.note.offsetHeight;
          bottomDistance=customH+loadingBarHeight+nodeH-wrapperHeight-scrollTop;
        }
        if (bottomDistance > 40) {
          this.toLower = false;
        } else {
          this.toLower = true;
        }
      },
      /**
       * @desc 删除已选列表
       */
      handleLongTouch(el){
        const idx = el.dataset.idx;
        MessageBox({
          title:"确认要删除吗?",
          showCancelButton:true,
        }).then((e)=>{
          if(e==="confirm") this.selectedFoodList.splice(idx,1);
          
        })
        
      },
      /**
       * 保存饮食记录
       */
      async saveRecorder(){
          if(this.isPending) return
          const {selectedFoodList}=this; 
          // const year = String(date.getFullYear());
          // const month = String(zeroize(date.getMonth() + 1));
          // const day = String(zeroize(date.getDate())); 
         
          const {fullDate}= this.$store.state.plan.dateObj;
          
          console.log(this.$route.query.date,selectedFoodList,this.userInfo.userId)
          const recordDate =fullDate;
          this.isPending=true;
          selectedFoodList.map(val=>val.operateType="1");//新增字段 操作类型
          try{
            await saveFoodRecordData(this.$route.query.date.replace(/-/g, ""),selectedFoodList,this.userInfo.userId);
            
            this.$toast("添加成功")
            setTimeout(() => {
                this.hasRecored=true;
                this.$router.back();
            }, 1000);
          }catch(err){

          }
          this.isPending=false;
          
      },
     
    },
    beforeRouteLeave(to,from,next){  
     
      if(to.path==="/administration/diet" ){//同步记录后返回
        delStorage("session","selectedFoodList")
      }else{
        setStorage("session","selectedFoodList",this.selectedFoodList)  
      }
      
      next();
    }

}
</script>
<style lang="scss">
.mint-popup {
  background: none;
  /* transition: all 10s; */
}
.mint-msgbox-wrapper {
  z-index: 3001 !important;
  & + .v-modal {
    z-index: 3000 !important;
  }
}
</style>

<style lang="scss" scoped >
@import "@/assets/style/mixin.scss";
// @import "@/styles/plan/food&sportRecommendlist.scss";
.foodlist-container {
  .ft32{
    font-size: .8rem;
  }
  .btn_disable{
      @include bg_color8();
  }
  .btn_active{
      @include bg_color();
  }
    background: rgb(247, 247, 247);
   
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    .fix_box {
      z-index: 100;
    }
  
    header {
      padding: 0.5rem 0.75rem;
      .model_inpt {
        box-sizing: border-box;
        background: #ededed;
        border-radius: 0.3rem;
        padding: 0.275rem 0.6rem;
        color: #606060;
        height: 1.5rem;
        font-size: 0.7rem;
        color: #cccccc;
        font-weight: bold;
        .icon_search {
          width: 0.75rem;
          margin-right: .2rem;
        }
      }
    }
  
    .banner {
      font-weight: bold;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 0.85rem;
      @include font_color4();
      background: #ffffff;
      box-shadow: 0 0.2rem 0.3rem 0 rgba(0, 0, 0, 0.05);
  
      li {
        height: 100%;
      }
      .active {
        @include font_color10();
  
        &::after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          margin: 0 auto;
          left: 0;
          right: 0;
          @include bg_color();
          height: 0.15rem;
          border-radius: 0.075rem;
          width: 0.8rem;
        }
      }
    }
    .router_container {
      padding-top: 5rem;
      padding-bottom: 2.4rem;
    }
    // 热量选择
    .food_detail {
      z-index: 50000 !important;
    }
    footer {
      z-index: 3000;
      height: 2.4rem;
      padding: 0 0.65rem;
      box-sizing: border-box;
      box-shadow: 0 0.1rem 0.3rem 0 rgba(138, 169, 173, 0.06);
      .footer_right {
        font-size: 0.75rem;
        border-radius: 1.25rem;
        height: 1.8rem;
        width: 4.75rem;
      }
      .footer_container {
        padding-left: 0.35rem;
        .footer_mid {
          font-size: 0.65rem;
          color: #606060;
          margin-right: 0.8rem;
          .val {
            font-size: 0.9rem;
            margin-left: 0.3rem;
            margin-right: 0.1rem;
            @include font_color10();
          }
          .unit {
            @include font_color10();
          }
        }
        .footer_left {
          .icon_triangle {
            width: 0.375rem;
            transition: all 0.2s linear;
            margin-right: 0.3rem;
          }
          &.active {
            .icon_triangle {
              transform: rotate(180deg);
            }
          }
          p {
            margin-left: 0.3rem;
            font-size: 0.8rem;
            color: #252525;
          }
          span.after {
            top: -0.1rem;
            right: -0.9rem;
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
            font-size: 0.6rem;
            color: #fff;
            background: #E65F5F;
          }
        }
      }
      .footer_container_empty {
        .footer_left {
          font-size: 0.7rem;
          color: #929292;
        }
      }
    }
    .mint-popup {
      width: 100%;
    }
    .tabber {
    }
    .selected_list {
      height: 18.375rem;
      overflow: scroll;
      // padding-bottom: 0;
      // padding-bottom: 2.4rem;
    }
    // 自定义列表
    .custom_container {
      min-height: 100%;
      .add_custom_btn_container {
        padding: .7rem 0.8rem 0;
      }
      .add_custom_food {
        height: 2.2rem;
        font-size: 0.75rem;
        border-radius: 1.1rem;
        @include border1(1.2px solid);
        @include font_color10();  
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-size: 16.85rem 1.9rem;
        background-position: center center;
        font-weight: bold;
        .icon {
          width: 0.75rem;
          margin-right: 0.3rem;
        }
      }
      // 自定义食物提示
      .note {
        font-size: .65rem;
         @include font_color();
        padding: 0.6rem 0;
        opacity: .6;
      }
      // 没有自定义列表的占位图 运动
      .sport_custom_list.empty{
        background-image: url(~@/assets/plan/emptySport.png);
        background-size:4rem 4rem;
        background-position: center 4.5rem;
        background-repeat: no-repeat;
        &::after{
          content: "还没有自定义运动";
          position: absolute;
          top: 8.9rem;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
          font-size: .7rem;
          color: #929292;
        }
      }
       // 没有自定义列表的占位图 食物
       .food_custom_list.empty{
        background-image: url(~@/assets/plan/img_record_nodiet.png);
        
        background-position: center 4.5rem;
        background-repeat: no-repeat ;
        background-size: 10.25rem 6.25rem ;
        &::after{
          content: "还没有自定义饮食";
          position: absolute;
          top: 10.9rem;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
          font-size: .7rem;
          color: #929292;
        }
      }
    }
  }
</style>
