<template>
    <div class="container ">
          <HRuler class="HRuler" v-show="activeIndex===idx" :isActive="activeIndex===idx"  @change="handleRulerChange" v-for="(val,idx) in list" v-bind="val.options" :unitValue="val.count" :key="idx">
                <div class="heat">
                    {{val.heat || 0}}
                    <span>大卡</span>
                </div>
          </HRuler>
        
          <swiper class="swiper-container-ruler" v-if="swiperOptions.initialSlide!==null" @slideChange="handleUnitSwiperChange" :options="swiperOptions" ref="swiper">
              <swiper-slide  class="swiper-slide flex_c just_c "   v-for="(val,idx) in list" :key="idx">
                {{val.unit}}
              </swiper-slide>
          </swiper>
         
    </div>

</template>
<script>
import HRuler from "@/components/plan/HRuler";
import 'swiper/dist/css/swiper.css';
import {
    swiper,
    swiperSlide
} from 'vue-awesome-swiper';
import {
  deepCopy
} from "@/assets/js/util.js";
export default {
    components:{
        HRuler,
        swiper,
        swiperSlide
    },
    data(){
        return {
            swiperOptions:{ 
                slidesPerView: 5,
                centeredSlides:true,
                initialSlide:null,
                slideToClickedSlide:true
            }
        }
    },
    computed:{
        //尺子列表
        list(){
            const extensionUnits=this.$store.state.plan.activeFoodDetail.extensionUnits;
            const newArr=[];
            if(extensionUnits instanceof Array){
                if(extensionUnits.length>0){
                    extensionUnits.forEach(val=>{
                        const {
                            unit,
                            unitSize,
                            heat,
                            // count
                        }=val
                        newArr.push({
                            unit,
                            heat,
                            count:val.count ? val.count :unitSize==="大" ? 1:100,//选中的数量
                            options:{
                                step:unitSize==="大"  ?0.5 :1,
                            }
                        })
                    })
                }
                
            }
            // else{//自定义列表
            //     const {unit,heat,kilocalorie,count} =this.$store.state.plan.activeFoodDetail;
            //     newArr.push({
            //         unit,
            //         heat,
            //         count:count || 1,
            //         options:{
            //             step:1
            //         }
            //     })
            // }
           
            return newArr
        },
        //被激活的列表索引
        activeIndex:{
            get(){
              
                return this.$store.state.plan.activeFoodDetail.activeIndex || 0
            },
            set(val){
                
                const obj ={
                    activeIndex:val
                }
                this.$store.commit("plan/MERGE_ACTIVE_FOOOD_DETAIL",obj);
            }
        }   
    },
    created(){
        /**
         * 
            记录食物,如:
            饺子,有三个单位,点击饺子,有三个单位:  克,个,盘
            默认应该在"个"

            现在在第一个单位"克"
            如果只有一个单位则在第一个单位
            如果指定 activeIndex 则展示activeIndex
         */
          
        const actIdx = this.list.length>1&&(this.list[0].unit=='克'||this.list[0].unit=='毫升')?1:0;
        const activeIndex = this.$store.state.plan.activeFoodDetail.activeIndex;
        this.activeIndex=activeIndex===undefined ? actIdx: activeIndex
        this.swiperOptions.initialSlide=activeIndex===undefined ? actIdx: activeIndex
     
        // this.initSwiper();
    },
    methods:{
        /**
         * 监听到切换单位
         */
        handleUnitSwiperChange(){
           this.activeIndex=this.$refs.swiper.swiper.activeIndex
          
        },
        /**
         * 监听到尺子变化
         */
        handleRulerChange({value}){
            const {
                activeIndex,
            }=this;
            const activeFoodDetail=deepCopy(this.$store.state.plan.activeFoodDetail);
            const {extensionUnits} =activeFoodDetail;
            if(extensionUnits instanceof Array){//常见食物列表 在foodrecommendlist页面对没有 extensionUnits的已经追加了一个默认字段 现在始终判断为true
                const activeExtensionUnits = activeFoodDetail.extensionUnits[activeIndex];//被激活的列表
                const zoom = activeExtensionUnits.unitValue//放大系数 1碗=100g
                activeExtensionUnits.count = value;
                const weight = value*zoom;//实际单位质量
                if(activeFoodDetail.minCountHeat) //后台正在改运动搜索列表字段
                activeExtensionUnits.heat = Math.round((activeFoodDetail.minCountHeat/activeFoodDetail.minCount)*weight);
                const obj ={
                    extensionUnits:activeFoodDetail.extensionUnits
                }
                this.$store.commit("plan/MERGE_ACTIVE_FOOOD_DETAIL",obj);
            }
        }
    }
}
</script>
<style lang="scss">
@import "@/assets/style/mixin.scss";
.swiper-slide-active {
  @include font_color10(); 
  font-weight: bolder;
  font-weight: bold;
}
.swiper-container-ruler {
  line-height: 1.2rem;
  .swiper-slide {
    color: #929292;
    font-size: 0.75rem;
    &.swiper-slide-active {
      font-weight: bold;
      font-size: 0.9rem;
      @include font_color10(); 
    }
  }
}
</style>

<style lang="scss" scoped>
.HRuler {
  margin: 1rem 0;
}
.heat {
  font-size: 0.75rem;
  color: #929292;
  position: absolute;
  left: 0.7rem;
  bottom: 0.8rem;
  span {
    font-size: 0.65rem;
  }
}
</style>
