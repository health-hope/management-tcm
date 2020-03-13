<template>
   <div class="container wj">
       <div class="wrapper column flex just_c flex_c">
          <div class="img_box">
          </div>
          <p class="title">羽毛球</p>
          <div class="desc">
              <span class="heat">37</span>
              <span>大卡/100分钟</span>
          </div>
          <img src="@/assets/plan/btn_xzsw_swxq@2x.png" alt="" class="icon_detail">
          <span>详情</span>
          <Ruler class="full_x"/>
          <button class="submit_btn flex_c just_c c_f">确定</button>       
       </div>
   </div>
</template>
<script>
import Ruler from "@/components/plan/Ruler";
export default {
    props:{
       
    },
    components:{
        Ruler
    }
}
</script>


<style lang="scss" scoped>
.container {
  background: #fff !important;
  padding: 1.6rem 0 0.4rem;
  border-radius: 0.3rem 0.3rem 0 0;
}
.mint-popue {
  background: none;
}
.wrapper {
  .img_box {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 1.1rem;
    background: #eee;
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
      color: #4566ea;
      font-size: 0.8rem;
    }
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
    background: #4566ea;
    box-shadow: 0 0.15rem 0.35rem 0 rgba(0, 0, 0, 0.05);
    border-radius: 1.1rem;
    height: 2.2rem;
    margin: 1.1rem 0 0;
    width: 15.95rem;
    font-size: 0.85rem;
    line-height: 0.8rem;
  }
}
</style>
