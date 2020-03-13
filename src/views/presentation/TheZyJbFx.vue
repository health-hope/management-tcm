<template>
    <!-- 方框类型  item-type3 s -->
    <div class="zy-jb-fx-temp">
        <BaseZyTempTitle bgClass="jgy_bg_3" :tempTitle="tempData.title" />
        <div class="temp-main">
            <LayBg/>
            <div class="item-type3">
                <div class="type3-list">
                    <div class="type3-item" v-for="(item,index) in tempData.dataList" :key="index">
                        <span>{{item.content}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 方框类型 e -->
</template>

<script>
import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
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
        BaseZyTempTitle,
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.zy-jb-fx-temp {
    @include bg_color6();
    border-radius: .2rem;
    margin-top: .8rem;
    overflow: hidden;
    .temp-main {
        position: relative;
        .item-type3 {
            padding: 1.05rem 1.05rem 1.6rem 0.45rem;
            .type3-list {
                display: flex;
                flex-wrap: wrap;
                .type3-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-left: 0.6rem;
                    margin-top: 0.6rem;
                    span {
                        padding: 0 0.65rem;
                        margin: 0 0.07rem;
                        height: 1.25rem;
                        display: flex;
                        flex: 1;
                        justify-content: center;
                        align-items: center;
                        font-size: 0.8rem;
                        @include font_color1();
                        @include border3(.075rem /* 3/40 */ solid);
                        font-weight: bold;
                        @include _box_shodow(0 0 0 .05rem /* 2/40 */ #fff, 0 0 0 .075rem /* 3/40 */);
                    }
                }
            }
        }
    }
}
</style>