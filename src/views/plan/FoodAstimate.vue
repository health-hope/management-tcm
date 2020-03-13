
<template>
    <div class="container wj">
        <div class="imgc" v-if="metrologyTag == 2">
          <div>
            <div class="imgd">
              <img :src="metrologyInfo.imageUrl" alt="">
            </div>
            <div class="text">{{metrologyInfo.describe}}</div>
          </div>
        </div>
        <template v-else>
          <!-- 左侧tabber -->
          <ul class="left shrink_0">
              <li class="flex_c just_c" v-for="(val,idx) in metrologyTypeList" :key="idx"  :class="{active:activeIdx===idx,tap_events:true}" @click="activeIdx=idx">{{val.classify}}</li>
          </ul>
          <!-- 右侧列表 -->
          <ul class="right flex_c full_y column grow_1  over_s"  v-if="metrologyTypeList.length">
              <li class="full_x" v-for="(val,idx) in metrologyTypeList[activeIdx].metrologyInfoList" :key="idx">
                  <img class="full_x" :src="val.imageUrl" alt="">
                  <div class="desc text_c">
                      <p class="title">{{val.describe}}</p>
                  
                  </div>
              </li>
          </ul>
        </template>
    </div>
</template>
<script>
import {
  getFoodAstimateInfo,
  apiFoodlist
} from "@/service/api/plan";
import "@/styles/flex.scss";
export default {
    data(){
        return{
            activeIdx:0,
            metrologyTypeList:[

            ],
            metrologyTag: '',
            foodId: '',
            metrologyInfo: {}
        }
    },
    created(){
      console.log(this.$route)
      // 获取metrologyTag foodId
      this.foodId = this.$route.params.foodId
      this.metrologyTag = this.$route.params.metrologyTag
      if(this.metrologyTag == "2") {
        // 请求单个数据
        this.initDataOne()
      }else {
        this.initData()
      }
    },
    methods:{
      // 初始化数据
      async initData(){
        const {foodId}= this.$route.params;
        const result =await getFoodAstimateInfo(foodId);
        this.metrologyTypeList=result.metrologyTypeList;
      },
      // 请求单个数据
      async initDataOne() {
        const result =await apiFoodlist(this.foodId);
        this.metrologyInfo = result.metrologyInfo
      }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.container {
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0);
  display: flex;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  .left {
    width: 3.95rem;
    height: 100%;
    overflow: scroll;
    box-shadow: 0.05rem 0 0.3rem 0 rgba(138, 169, 173, 0.14);

    font-size: 0.7rem;
    color: #929292;
    background: #ffffff;
    li {
      height: 2.6rem;
      &.active {
        @include font_color10(); 
        background: #f7f7f7;
      }
    }
  }
  .right {
    padding: 0 1.05rem;
    background: #f7f7f7;
    li {
      box-shadow: 0 .1px .125rem 0 rgba(0,0,0,0.12);
      border-radius: 0.3rem;
      background: #fff;
      margin-top: 0.8rem;
      font-size: 0.7rem;
      color: #252525;
      letter-spacing: 0;
      text-align: center;
      line-height: 0.6rem;
      img{
        border-radius: 0.3rem 0.3rem 0 0;
      }
      &:last-child {
        margin-bottom: 0.8rem;
      }
      .desc {
        padding: 0.55rem 0 0.75rem;
        p.title {
          // margin-bottom: 0.4rem;
        }
      }
    }
  }
  .imgc {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .imgd {
      width: 16.75rem;
      height: 18.9rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .text {
    width: 16.75rem;
    height: 3.25rem;
    background: #fff;
    margin: auto;
    font-size: .7rem;
    color: #252525;
    letter-spacing: 0;
    text-align: center;
    line-height: .6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
