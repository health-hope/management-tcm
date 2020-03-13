<template>
    <Loadmore :bottom-method="loadBottom" class="list grow_1 over_s">
      <slot></slot>
    </Loadmore>
</template>


<script>
import { Loadmore } from 'mint-ui';
export default {
    props:{
        list:{
            type:Array,
            default:()=>new Array(10).fill(null)
        }
    },
    components:{
        Loadmore
    },
    methods:{
      handleItemClick({value,index}){
          this.$emit("select",{value,index})
      },
      loadBottom(){
          
      }
    }
}
</script>


<style lang="scss" scoped>

.list {

}
</style>
