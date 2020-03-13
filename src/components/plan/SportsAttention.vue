<template>
<div class="sports_attention_mask tap_events" @touchmove.prevent @click="sportsAttentionInfo.show = false">
    <div class="content tap_events" @click.stop>
        <div class="close flex flex_ac flex_jc tap_events" @click="sportsAttentionInfo.show = false">
            <i></i>
        </div>
        <div class="main">
            <div class="title">运动注意事项</div>
            <ul class="list">
                <li v-for="(item,index) in sportsAttentionInfo.attentions" :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        sportsAttentionInfo: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.sports_attention_mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;

    .content {
        background: #FFFFFF;
        box-shadow: 0 .2rem .8rem 0 rgba(0, 0, 0, 0.05);
        border-radius: .3rem;
        width: 17.15rem;
        height: auto;
        position: relative;

        .close {
            position: absolute;
            top: 0;
            right: 0;
            width: 2rem;
            height: 2rem;
            border-radius: .3rem;

            i {
                width: 0.5rem;
                height: 0.5rem;
                background: url("../../assets/common/btn_closed_tanchuang.png") center no-repeat;
                background-size: 100% 100%;
            }
        }

        .main {
            padding: 2rem 1rem 1rem 1rem;

            .title {
                font-size: .9rem;
                color: #252525;
                font-weight: bold;
            }
            .list{
                display: block;
                margin: .6rem 0 .5rem 0;
                li{
                    font-size: .7rem;
                    color: #929292;
                    line-height: 1.1rem;
                }
            }
        }
    }
}
</style>
