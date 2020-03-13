<template>
    <div class="result-temp">
        <div class="pt-top-desc" v-if="tabarTopData">
            <div class="border">
                <div class="sub">调理原则</div>
                <div class="siyuan" v-if="tabarTopData.content">{{ tabarTopData.content }}</div>
                <img class="bgIcon" v-if="tabarTopData.imageUrl" :src="tabarTopData.imageUrl" alt="">
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import LayBg from "@/components/common/LayBg";
import { mapState } from 'vuex'
export default {
    data(){
        return{
        }
    },
    computed: {
        ...mapState('administration', ['tabarTopData'])
    },
    mounted() {
    },
    components: {
        LayBg,
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.result-temp {
    @include box_shodow1(0 .3rem /* 12/40 */ 1rem /* 40/40 */ 0);
    border-radius: 0.2rem;
    overflow: hidden;
    .pt-top-desc {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        padding: .25rem /* 10/40 */;
        box-sizing: border-box;
        @include background-image();
        position: relative;
        .border {
            padding: .85rem .8rem 1.55rem;
            @include border5(.025rem /* 1/40 */ solid)
        }
        .sub {
            font-size: 0.7rem;
            line-height: 1rem /* 40/40 */;
            margin-bottom: .3rem /* 12/40 */;
            @include font_color1();
            opacity: 0.6;
        }
        .siyuan {
            font-size: 1.1rem /* 44/40 */;
            @include font_color1();
            line-height: 1.6rem /* 64/40 */;
            font-family: "SourceHanSerifCN-Bold";
            position: relative;
            z-index: 2;
        }
        .bgIcon {
            width: 8.225rem /* 233/40 */;
            position: absolute;
            top: .6rem /* 24/40 */;
            right: .7rem /* 28/40 */;
            z-index: 0;
        }
    }
}
</style>