<template>
    <div class="result-good-temp">
        <div class="result" :style="{backgroundImage: `url(${tempData.titleImageUrl})`}">
            <div class="desc">{{tempData.resultdesc}}</div>
            <div class="siyuan">{{ tempData.result }}</div>
        </div>
        <div class="content">
            <LayBg/>
            <img :src="tempData.imageUrl" alt="">
            <div class="remark">{{tempData.remark}}</div>
        </div>
    </div>
</template>

<script>
import LayBg from "@/components/common/LayBg";
export default {
    props: {
        tempData: {
            type: Object,
            default: {},
        }
    },
    components: {
        LayBg,
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.result-good-temp {
    position: relative;
    @include bg_color6();
    border-radius: .2rem;
    .result {
        height: 5.5rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding: 0 1.05rem;
        .siyuan {
            font-size: 1.6rem /* 64/40 */;
            @include font_color1();
            line-height: 1.8rem /* 72/40 */;
            padding-top: .3rem /* 12/40 */;
            box-sizing: border-box;
            font-family: "SourceHanSerifCN-Bold";
        }
        .desc {
            font-size: 0.7rem;
            @include font_color9();
            padding-top: 1rem;
            line-height: 1rem /* 40/40 */;
        }
    }
    .content {
        position: relative;
        padding: 0 1.05rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
            width: 8.75rem /* 350/40 */;
            margin: 3rem 0;
        }
        .remark {
            margin-top: .75rem;
            width: 100%;
            padding-bottom: 1.6rem;
            font-size: .75rem;
            @include font_color8();
            line-height: 1.05rem;
            text-align: justify;
        }
    }
}
</style>