<template>
    <div class="loadingBox" >
        <img class="loadingImg" v-show="!noMore" src="@/assets/common/loading1.png" alt="" srcset="">
        <div class="completeInfo" v-show="noMore">{{noMoreText}}</div>
    </div>
</template>

<script>
export default {
    props:{
        noMore:{
            type:Boolean,
            default:false,
        },
        noMoreText:{
            type:String,
            default:"已经加载完了"
        }

    }
}
</script>
<style lang="scss" scoped>
@keyframes rotate {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loadingBox {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .loadingImg {
    border-radius: 50%;
    width: 1rem;
    animation: rotate 1s linear infinite;
  }
  .completeInfo {
    font-size: 0.4rem;
    color: #999;
  }
}
</style>
