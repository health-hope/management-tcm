<template>
    <div class="dailylifeDetail" :style="{height:this.showTotal||!this.showExchangeButton?'auto':'7rem'}">
        <div class="top">
            <div class="left">
                <img :src="imageUrl">
                <span class="title">{{ name }}</span>
            </div>
            <!-- 打卡 1 已打卡 2 未打卡 3 已过期 4 未到期-->
            <div v-if="punchStatus == 1"
                class="donebutton" :style="{backgroundImage: `url(${doneImg})`}  | PUBLIC_PATH"
            ></div>
            <div v-if="punchStatus == 2"
                class="button tap_events"
                href="javascript:;"
                @click="start"
            >打卡</div>
            <div v-if="punchStatus == 3"
                class="outbutton"
            >已过期</div>
        </div>
        <p>{{ content }}</p>
        <ul class="dataList">
            <li class="tap_events" v-for="(item, i) in dataList" :key="`date${i}`">
                <p class="listtitle">{{ item.subTitle }}</p>
                <p>{{ item.content }}</p>
            </li>
        </ul>
        <div @click="showTotalIntro" v-if="showExchangeButton"
         style="width:100%;height:2rem;position:absolute;bottom:0;background-color:#FFF;background-position: center center;background-repeat: no-repeat;background-size:0.5rem;"
          v-bind:style="{backgroundImage: `url(${tipImg})`}  | PUBLIC_PATH"></div>
        <div v-if="showExchangeButton&&showTotal" style="width:100%;height:2rem;"> </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        imageUrl: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: ''
        },
        punchStatus: {
            type: String,
            default: ''
        },
        dataList: {
            type: Array,
            default: []
        },
        doneImg: {
            type: String,
            default: 'ic_living_punched.png'
        },
        dlId: {
            type: String,
            default: ''
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            showTotal: false
        }
    },
    computed:{
        ...mapState(['code', 'userInfo']),
        tipImg: function () {
            return this.showTotal?'tlfa_icon_hui_sq.png':'tlfa_icon_hui_zk.png'
        },
        showExchangeButton: function () {
            return this.dataList.length > 0 || this.content.length > 500
        }
    },
    methods: {
        showTotalIntro () {
            this.showTotal = !this.showTotal;
        },
        start () {
            this.$emit('punch',this.index)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.dailylifeDetail {
    margin: 0.7rem /* 28/40 */ 1.05rem /* 42/40 */;
    overflow: hidden;
    position:relative;
    @include border2(1px solid);
    .top {
        margin-top: 0.5rem /* 20/40 */;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        justify-content: space-between;
        height: 3rem /* 120/40 */;
        .left {
            display: flex;
            img {
                width: 2.2rem /* 88/40 */;
                height: 2.2rem /* 88/40 */;
                margin-left: .6rem /* 24/40 */;
            }
            .title {
                font-size: .75rem /* 30/40 */;
                color: #333333;
                font-weight: bold;
                margin: auto .6rem;
            }
        }

        .button {
            width: 4rem /* 160/40 */;
            height: 1.8rem /* 72/40 */;
            border-radius: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem /* 32/40 */;
            @include font_color6();
            @include bg_color();
            background-repeat: no-repeat;
            font-weight: bold;
            margin-right: 0.6rem /* 24/40 */;
        }
        .donebutton {
            width: 1.8rem /* 72/40 */;
            height: 1.8rem /* 72/40 */;
            display: flex;
            align-items: center;
            justify-content: center;
            background-repeat: no-repeat;
            background-size:100% 99.9%;
            margin-right: 0.6rem /* 24/40 */;
        }
        .outbutton {
            width: 4rem /* 160/40 */;
            height: 1.8rem /* 72/40 */;
            border-radius: 0.9rem;
            border: #cccccc 1px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem /* 32/40 */;
            color: #999;
            background-repeat: no-repeat;
            font-weight: bold;
            margin-right: 0.6rem /* 24/40 */;
        }
    }

    p {
        margin: 0rem /* 28/40 */ .6rem /* 24/40 */ .9rem /* 36/40 */ .6rem /* 24/40 */;
        font-size: .7rem /* 28/40 */;
        color: #999999;
    }

    .listtitle{
        @include font_color1();
        margin-top: 0.7rem /* 28/40 */;
        font-size: 0.85rem /* 30/40 */;
        font-weight: bold;
    }

}
</style>
