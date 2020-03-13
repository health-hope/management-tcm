<template>
    <div class="container">
        <list-wrapper>
            <list-slider class="tap_events"  v-for="(val,idx) in foodRecommendList" @click="handleItemClick(idx)" :key="idx" :name="val.foodName" :imgUrl="val.imageUrl" :desc="val.minCount+val.unit" :heat="val.minCountHeat+'大卡'"></list-slider>
        </list-wrapper>
    </div>
</template>


<script>
import ListSlider from "@/components/plan/ListSlider";
import ListWrapper from "@/components/plan/ListWrapper";
export default {
    components: {
        ListWrapper,
        ListSlider
    },
    computed:{
        foodRecommendList(){
            return this.$store.state.plan.foodRecommendList;
        }
    },
    mounted(){
    },
    methods:{
        /**
         * 点击列表 展示详情
         */
        handleItemClick(){
            this.$emit("show")
        }
    }
    
}
</script>

<style lang="scss" scoped>
</style>

