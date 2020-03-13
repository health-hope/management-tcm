<template>
<div class="foodlist">
    <header >
        <router-link tag="div" :to="{name:'foodSearch',query:{mealType:$route.query.mealType}}" class="model_inpt flex_c just_c">
            <!-- <img src="@/assets/plan/search.png" alt="" class="icon_search"> -->
            <span>请输入食物名称</span>
        </router-link>
    </header>
</div>
</template>
<script>
export default{
    
}
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .foodlist{
        width: 100%;
        min-height: 100%;
        @include bg_color1();
    }
</style>