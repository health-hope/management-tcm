<template>
    <ul class="list grow_1 over_s">
        <li class="list_li flex tap_events" v-for="(value,index) in list" @click="handleItemClick({value,index})" :key="index">
            <div class="list_img_box shrink_0">
            </div>
            <div class="list_detail grow_1 flex_c">
                <div class="list_inner grow_1">
                    <p class="title">羽毛球</p>
                    <p class="desc">70分钟</p>
                </div>
                <span class="list_heat shrink_0">
              37大卡
            </span>
            </div>
        </li>
    </ul>
</template>


<script>
export default {
    props:{
        list:{
            type:Array,
            default:()=>new Array(10).fill(null)
        }
    },
    methods:{
      handleItemClick({value,index}){
          this.$emit("select",{value,index})
      }
    }
}
</script>


<style lang="scss" scoped>

.list {


  // padding:.8rem 0.75rem .6rem 0.75rem;
  li {
    padding: 0.8rem 0.75rem 0 0.75rem;
  }

  .list_img_box {
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 1.1rem;
    background-color: #ccc;
  }

  .list_detail {
    margin-left: 0.6rem;
    border-bottom: 1px solid #ededed;
    padding-bottom: 0.8rem;

    .title {
      font-size: 0.75rem;
      color: #252525;
    }

    .desc {
      margin-top: 0.2rem;
      font-size: 0.6rem;
      line-height: 0.6rem;
      color: #929292;
    }
  }

  .list_heat {
    font-size: 0.75rem;
    color: #252525;
    margin-right: .8rem;
  }
}
</style>
