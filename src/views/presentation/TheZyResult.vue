<template>
    <div class="result-temp">
        <div class="pt-top-desc" :style="{ backgroundImage: `url(${ tempData.imageUrl })`}">
            <div class="sub">您{{tempData.resultDesc}}</div>
            <div class="siyuan">{{ tempData.resultName }}</div>
            <div class="desc">{{tempData.scoreRemark}}</div>
            <div class="score">
                <img class="scoreImgs" v-for="(item,index) in scoreImgs" :src="item" :key="index" alt="">
                <img class="icon" :src="'icon_shenB.png' | PUBLIC_PATH" >
            </div>
        </div>
        <div class="condition-desciption">
            <LayBg/>
            <div class="content">{{tempData.remark}}</div>
        </div>
    </div>
</template>

<script>
import LayBg from "@/components/common/LayBg";
import setFontColor from '@/assets/js/setFootColor';
export default {
    props: {
        tempData: {
            type: Object,
            default: {},
        }
    },
    data(){
        return{
            scoreImgs:[],
        }
    },
    mounted() {
        this.scoreImgs = setFontColor(this.tempData.score,"shen");
    },
    components: {
        LayBg,
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.result-temp {
    @include box_shodow1(0 12px 40px 0);
    border-radius: 0.2rem;
    .pt-top-desc {
        height: 9rem;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        padding: 0 1.05rem;
        .sub,
        .desc {
            font-size: 0.7rem;
            @include font_color1();
        }
        .sub {
            padding-top: 1rem;
            opacity: .6;
        }
        .siyuan {
            font-size: 1.6rem /* 64/40 */;
            @include font_color1();
            line-height: 1.8rem /* 72/40 */;
            padding-top: .3rem /* 12/40 */;
            padding-bottom: 1.1rem /* 44/40 */;
            box-sizing: border-box;
            font-family: "SourceHanSerifCN-Bold";
        }
        .desc {
            padding-bottom: .3rem /* 12/40 */;
            box-sizing: border-box;
            opacity: .6;
        }
        .score {
            margin-top: 0.25rem;
            font-size: 1.2rem;
            @include font_color1();
            .icon {
                width: .675rem /* 27/40 */;
                height: 1.3rem /* 52/40 */;
                display: inline-block;
                margin-left: -.3rem;
            }
            .scoreImgs {
                height: 1.3rem /* 52/40 */;
            }
        }
    }
    .condition-desciption {
        position: relative;
        @include bg_color6();
        .content {
            padding: 1.6rem 1.05rem;
            font-size: 0.75rem;
            text-align: justify;
            @include font_color8();
            line-height: 1.05rem;
        }
    }
}
</style>