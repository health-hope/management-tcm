<template>
    <div class="container wj">
        <!-- 头部 -->
        <div class="banner full_x flex_c just_c column">
            <div class="img_box empty_box over_h">
                <img :src="info.imageUrl" alt="" class="full_x">
            </div>
            <p class="title">
                {{isSport ? info.exerciseName :info.foodName}}
            </p>
            <p class="desc">
                <span>{{info.minCountHeat}}</span>
                大卡／{{info.minCount}}{{info.unit}}
            </p>
        </div>
        <!-- 列表 -->
        <ul class="major full_x">
            <!-- 宏量营养素 -->
            <li class="macro" v-if="!isSport">
                <p class="title">
                    <b>宏量营养素</b>      
                    (每100克可食部含量)
                </p>
                <ul class="flex_c just_sb">
                    <li>
                        <div class="top">
                            <b>{{info.protein}}</b>
                            克
                        </div>
                        <div class="bot flex_c just_c">
                            <img src="@/assets/plan/icon_spxq_dbzh@2x.png" alt="" srcset="">
                            <span>蛋白质</span>
                        </div>  
                    </li>
                    <li>
                        <div class="top">
                            <b>{{info.carbohydrate}}</b>
                            克
                        </div>
                        <div class="bot flex_c just_c">
                            <img src="@/assets/plan/icon_spxq_tshhhw@2x.png" alt="" srcset="">
                            <span>碳水化合物</span>
                        </div>
                    </li>
                    <li>
                        <div class="top">
                            <b>{{info.fat}}</b>
                            克
                        </div>
                        <div class="bot flex_c just_c">
                            <img src="@/assets/plan/icon_spxq_zhf@2x.png" alt="" srcset="">
                            <span>脂肪</span>
                        </div>
                    </li>
                </ul>
            </li>
            <!-- 微量营养素 -->
            <li class="micro" v-if="!isSport && hasSomeKeys">
                <p class="title">
                    <b>微量营养素</b>      
                    (每100克可食部含量)
                </p>
                <ul class="">
                    <li class="flex_c just_sb" v-for="(val,key) in microMaps" :key="key" v-show="typeof info[key]!=='undefined' ">
                        <span>{{val.cn}}</span>
                        <span v-if="info[key]>0">{{info[key]}}{{val.unit}}</span>
                        <span v-else>--</span>
                    </li>
                </ul>
            </li>
            <li class="sport" v-if="info.foodDesc || info.desc">
                {{info.foodDesc || info.desc}}
            </li>
        </ul>
    </div>
</template>

<script>
import {
    getFoodDetail,
    getSportDetail,
}from "@/service/api/plan";
import "@/styles/flex.scss";
export default {
  
    data(){
        return{
            info:{

            },
            microMaps:{

            }
        }
    },
    
    computed:{
        isSport(){//是否是 运动详情  
            return this.$route.query.type=="2";
        },
        /**
         * 微量营养素中是否有内容
         */
        hasSomeKeys(){
            const {microMaps,info}=this;
            return  Object.keys(info).some(key=>microMaps[key])
        }
    },
    created(){
        if(!this.isSport){
           this.microMaps={"dietaryFiber":{"cn":"膳食纤维","unit":"g"},"niacin":{"cn":"烟酸","unit":"mg"},"vitaminA":{"cn":"维生素A","unit":"mg"},"vitaminB1":{"cn":"维生素B1","unit":"mg"},"vitaminB2":{"cn":"维生素B2","unit":"mg"},"vitaminB5":{"cn":"维生素B5","unit":"mg"},"vitaminC":{"cn":"维生素C","unit":"mg"},"vitaminE":{"cn":"维生素E","unit":"mg"},"potassium":{"cn":"钾","unit":"mg"},"sodium":{"cn":"钠","unit":"mg"},"calcium":{"cn":"钙","unit":"mg"},"magnesium":{"cn":"镁","unit":"mg"},"iron":{"cn":"铁","unit":"mg"},"manganese":{"cn":"锰","unit":"mg"},"zinc":{"cn":"锌","unit":"mg"},"copper":{"cn":"铜","unit":"mg"},"phosphorus":{"cn":"磷","unit":"mg"},"selenium":{"cn":"硒","unit":"ug"},"ash":{"cn":"灰分","unit":"g"},"cholesterol":{"cn":"胆固醇","unit":"mg"},"totalVitaminA":{"cn":"总维生素A","unit":"mg "}};
          //  "tryptophan":{"cn":"色氨酸","unit":"mg"},"valine":{"cn":"缬氨酸","unit":"mg"},"arginine":{"cn":"精氨酸","unit":"mg"},"glutamic":{"cn":"谷氨酸","unit":"mg"},"histidine":{"cn":"组氨酸","unit":"mg"},"alanine":{"cn":"丙氨酸","unit":"mg"},"aspartic":{"cn":"天冬氨酸","unit":"mg"},"glycine":{"cn":"甘氨酸","unit":"mg"},"proline":{"cn":"脯氨酸","unit":"mg"},"serine":{"cn":"丝氨酸","unit":"mg"},"totalFattyAcid":{"cn":"总脂肪酸","unit":"g"},"saturatedFattyAcid":{"cn":"饱和脂肪酸","unit":"g"},"monounsaturatedFattyAcid":{"cn":"单不饱和脂肪酸","unit":"g"},"polyunsaturatedFattyAcid":{"cn":"多不饱和脂肪酸","unit":"g"},"sfaPercent":{"cn":"饱和脂肪酸/总脂肪酸","unit":"%"},"mfaPercent":{"cn":"单不饱和脂肪酸/总脂肪酸","unit":"%"},"pfaPercent":{"cn":"多不饱和脂肪酸/总脂肪酸","unit":"%"},"soyIsoflavone":{"cn":"大豆异黄酮","unit":"mg"}
        }
        this.initData()
    },
    methods:{
        async initData(){
            const {id}=this.$route.query;
            let result ;
            if(this.isSport){//运动详情
                result=await getSportDetail(id);
            }else{//食物详情
                result =await getFoodDetail(id);
            }
         
            this.info=result;
        }
    }
}
</script>
<style lang="scss" scoped>
// 头部
.banner {
  padding: 1.3rem 0 1.5rem;
  .img_box {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  .title {
    font-size: 0.8rem;
    color: #333333;
    font-weight: bold;
    margin-top: 0.9rem;
  }
  .desc {
    color: #929292;
    font-size: 0.6rem;
    line-height: 1.125rem;
    span {
      color: #4566ea;
      font-size: 0.8rem;
    }
  }
}
.major {
  padding: 0 0.6rem 0.425rem;
  & > li {
    background: #fff;
    margin-bottom: 0.8rem;
    padding: 1.3rem 0.95rem 1.675rem;
    border-radius: 0.3rem;
    &:nth-of-type(2) {
      .title {
        display: flex;
        align-items: center;
        &::before {
          content: "";
          height: 0.75rem;
          line-height: 0.75rem;

          width: 0.15rem;
          background: #c286ec;
        }
      }
    }
    .title {
      font-size: 0.6rem;
      line-height: 0.6rem;
      color: #929292;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        height: 0.75rem;
        line-height: 0.75rem;

        width: 0.15rem;
        background: #f16c6c;
      }
      // border-left: 0.15rem solid #f16c6c;
      text-indent: 0.1rem;
      b {
        font-size: 0.8rem;
        line-height: 0.8rem;
        color: #252525;
      }
    }
  }
  .macro {
    ul {
      li {
        flex-grow: 1;
        flex-shrink: 0;
        .top {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.6rem;
          color: #606060;
          line-height: 0.6rem;
          b {
            font-size: 1.3rem;
            color: #252525;
            line-height: 1.2rem;
          }
        }
        .bot {
          margin-top: 0.825rem;
          img {
            width: 1rem;
            margin-right: 0.1rem;
          }
          span {
            font-size: 0.7rem;
            color: #929292;
          }
        }
      }
    }
  }
  .micro {
    font-size: 0.7rem;
    color: #929292;
    ul {
      padding-top: 0.4rem;
      li {
        margin-top: 0.625rem;
      }
    }
  }
  .sport {
    font-size: 0.7rem;
    color: #606060;
    line-height: 1.1rem;
    text-align: justify;
  }
}
</style>


