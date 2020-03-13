<template>
   <div class="container wj close" @touchmove="e=>e.preventDefault()">
       <div class="close_box clearfix">
            <div @click.prevent="$emit('close')" class="img_box tap_events">
              <img  src="@/assets/common/close@2x.png" alt="" class="close">
            </div>
       </div>
        <slot/>
   </div>
</template>
<script>

export default {
}
</script>


<style lang="scss" scoped>
.container {
  position: relative;
  background: #fff !important;
  border-radius: 0.3rem 0.3rem 0 0;

  padding-bottom: 0.4rem;
  .close_box {
    .img_box {
      float: right;
      padding-top: 0.8rem;
      padding-right: 0.8rem;
    }
    img {
      text-align: right;
      float: right;
      width: 0.7rem;
    }
  }
}
</style>
