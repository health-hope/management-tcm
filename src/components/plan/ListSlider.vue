<template>
     <li class="list_li flex tap_events"  @click="handleClick">
          <div class="list_img_box shrink_0 flex_c just_c" :style="`${imgUrl? 'backgroundImage:url('+imgUrl+'':''}`">
              <!-- <img class="full_x" v-if="imgUrl" :src="imgUrl" alt="" srcset=""> -->
          </div>
          <div class="list_detail grow_1 flex_c">
              <div class="list_inner grow_1">
                  <p class="title" v-html="name"></p>
                  <p class="desc" v-html="desc"></p>
              </div>
              <span class="list_heat shrink_0">{{heat.replace(/大卡/g,'')}}</span>
              <span class="unit">大卡</span>
          </div>
      </li>
</template>

<script>

export default {
    props:{
        name:String,
        imgUrl:String,
        desc:String,
        heat:String
    },
  
    methods:{
      handleClick(e){
       
        this.$emit("click",e)
      },
      
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
// padding:.8rem 0.75rem .6rem 0.75rem;
.list_li {
  padding: 0.6rem 0 0 0.75rem;
}
// 自定义列表缺省图片
.custom {
  .list_img_box {
    background-image: url(~@/assets/common/emptyCustomer.png);
  }
}
.list_img_box {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 1.1rem;
  background-color: #ccc;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(~@/assets/common/emptySystem.png); //系统推荐列表缺省图片
}

.list_detail {
  margin-left: 0.6rem;
  border-bottom: 1px solid #ededed;
  padding-bottom: 0.8rem;

  .title {
    font-size: 0.75rem;
    color: #333;
    font-weight: bold;
    max-width: 11.2rem;
  }

  .desc {
    margin-top: 0.2rem;
    font-size: 0.6rem;
    line-height: 0.6rem;
    color: #929292;
  }
}

.list_heat {
  font-size: .85rem;
  @include font_color();
}
.unit{
  font-size: .6rem;
  @include font_color();
  margin-right: .8rem;
}
</style>
