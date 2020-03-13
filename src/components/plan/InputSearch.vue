<template>
    <div class="model_inpt flex_c ">
        <img src="@/assets/plan/search.png" alt="" class="icon_search shrink_0">
        <input class="grow_1" :value="value" @input="handleInput" :type="type" :placeholder="placeholder"/>
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:"text"
        },
        value:String,
        placeholder:{
            type:String,
            default:"请输入食物名称"
        },
    },
    methods:{
        handleInput(e){
            this.$emit("input",e.target.value)
        }
    }
}
</script>

<style lang="scss" scoped>
.model_inpt {
  box-sizing: border-box;
  background: #ededed;
  border-radius: 0.3rem;
  height: 1.5rem;
  font-weight: bold;
  .icon_search {
    width: 0.75rem;
    margin: 0 0.2rem;
  }
  input {
    background: transparent;
    font-size: 0.7rem;
  }
}
</style>


