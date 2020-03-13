<template>
    <!-- 数字列表类型 item-type2 s -->
    <div class="zy-js-zz-temp">
        <BaseZyTempTitle :bgClass="type==='ZY_JS_ZZ'?'jgy_bg_2':'jgy_bg_4'" :tempTitle="tempData.title" />
        <div class="temp-main">
            <LayBg/>
            <div class="item-type2">
                <div class="type2-title">{{tempData.content}}</div>
                <div class="type2-list">
                    <div class="type2-item" v-for="(item,index) in tempData.dataList" :key="index">
                        <img v-if="item.imageUrl" :src="item.imageUrl" alt>
                        <div v-else class="img-zhanwei"></div>
                        <div class="desc">
                            <span class="high">{{item.subTitle}}:</span> {{item.content}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 数字列表类型 e -->
</template>

<script>
import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
import LayBg from "@/components/common/LayBg";
export default {
    props: {
        tempData: {
            type: Object,
            default: {},
        },
        type: {
            type: String,
        }
    },
    components: {
        LayBg,
        BaseZyTempTitle,
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.zy-js-zz-temp {
    @include bg_color6();
    margin-top: 0.8rem;
    border-radius: .2rem;
    overflow: hidden;
    .temp-main {
        position: relative;
    }
    .item-type2 {
        padding: 1.4rem 1.05rem;
        .type2-title {
            font-size: 0.85rem;
            @include font_color4();
            line-height: 1.2rem;
            text-align: justify;
            font-weight: bold;
        }
        .type2-list {
            padding-top: 0.425rem;
            display: flex;
            flex-direction: column;
            .type2-item {
                display: flex;
                margin-top: 0.375rem;
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                    margin-top: -.1rem;
                }
                .img-zhanwei {
                    width: 1.2rem;
                    height: 1.2rem;
                }
                .desc {
                    margin-left: 0.5rem;
                    flex: 1;
                    font-size: 0.75rem;
                    @include font_color7();
                    line-height: 1rem;
                    text-align: justify;
                    .high {
                        @include font_color1();
                        padding-right: 0.125rem;
                    }
                }
            }
        }
    }
}
</style>