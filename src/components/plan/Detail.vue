<template>
    <div class="wj" style="width: 100%;">
        <div class="wrapper column flex just_c flex_c full_x">
            <div class="img_box over_h" :class="{custom:info.foodType=='2' || info.exerciseType=='2'}">
                <img v-if="info.imageUrl" :src="info.imageUrl" alt="" class="full_x">
            </div>
            <p class="title">{{info.name}}</p>
            <div class="desc" v-if="info.minCountHeat">
                <span class="heat">{{info.minCountHeat}}</span>
                <span>大卡 / {{info.minCount}}{{info.unit}}</span>
            </div>
            <div class="flex_c full_x just_c">
                <slot name="tabber"/>
            </div>
            <Ruler class="full_x"/>
            <div :style="{backgroundImage: 'url(btn_bg_Evaluation_yellow_enabled.png)'}  | PUBLIC_PATH" class="submit_btn flex_c just_c c_f tap_events" @click="addFood">确定</div>
        </div>
    </div>


</template>
<script>
import Ruler from "@/components/plan/Ruler";
import {
  deepCopy
} from "@/assets/js/util.js";
// import Close from "./Close";
export default {
    computed:{
      info(){//食物详情
        const {
          name,
          imageUrl,
          minCount,
          minCountHeat,
          unit,
          foodType,
          exerciseType
        }=this.$store.state.plan.activeFoodDetail;
     
        return {
          name,
          imageUrl,
          minCount,
          minCountHeat,
          unit,
          foodType,
          exerciseType
        }
      }
    },
    components:{
      Ruler,
    },
    methods:{
      /**
       * 添加食物 记录饮食
       */
      addFood(){
        const activeFoodDetail= deepCopy(this.$store.state.plan.activeFoodDetail);
        const {
          activeIndex,
          extensionUnits,
        }= activeFoodDetail;
       
        if(extensionUnits instanceof Array){//添加常见食物列表
            const recordObj = {
              recordFrom:"1",
              mealType:this.$route.query.mealType,
              count:extensionUnits[activeIndex||0].count,
              kilocalorie:extensionUnits[activeIndex||0].heat,
              unit:extensionUnits[activeIndex||0].unit,
            }
            this.$emit("addSelectedList",Object.assign(activeFoodDetail,recordObj))
          }
        

      }
    }
}
</script>

<style lang="scss">
@import "../../styles/flex.scss";
</style>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.mint-popue {
  background: none;
}
.wrapper {
  .img_box {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 1.1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(~@/assets/common/emptySystem.png); //系统推荐列表缺省图片
  }
  .img_box.custom {
    background-image: url(~@/assets/common/emptyCustomer.png);
  }
  .title {
    margin-top: 0.8rem;
    font-size: 0.8rem;
    color: #252525;
  }
  .desc {
    margin-top: 0.2em;
    font-size: 0.6rem;
    color: rgb(146, 146, 146);
    .heat {
      @include font_color10();  
      font-size: 0.8rem;
    }
  }
  .tabber {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 1.75rem;
  }
  .icon_detail {
    width: 1.5rem;
    margin-top: 0.8rem;
    & + span {
      font-size: 0.6rem;
      color: #929292;
      margin-top: 0.2rem;
    }
  }
  .submit_btn {
    @include bg_color();
    box-shadow: 0 0.15rem 0.35rem 0 rgba(0, 0, 0, 0.05);
    border-radius: 1.1rem;
    height: 2.4rem;
    margin: 1.1rem 0 0;
    width: 15.15rem;
    font-size: 0.85rem;
    line-height: 0.8rem;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size:14.65rem 2rem;
    background-position: center center;
    font-weight: bold;
    @include box_shodow(0 12px 30px 0);
  }
}
</style>
