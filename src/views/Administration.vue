<template>
    <div class="administration">
        <!-- tab-bar -->
        <ul class="tarbar">
            <li @click="tabClick(item.path)" :class="tabPath(item.path)?'active':''" v-for="(item, i) in tabBar" :key="i">{{ item.name }}</li>
        </ul>
        <TabarTop>
            <keep-alive>
            <transition name="fade" mode="out-in">
                <router-view v-if="$route.meta.cache"></router-view>
            </transition>
            </keep-alive>
            <transition name="fade"  mode="out-in">
                <router-view v-if="!$route.meta.cache"></router-view>
            </transition>
        </TabarTop>
        <div class="button">
            <div :style="{backgroundImage: 'url(jgy_button_bg_bai.png)'} | PUBLIC_PATH" @click="adjustment" class="replay tap_events">方案调整</div>
            <div :style="{backgroundImage: 'url(jgy_button_bg_huang.png)'} | PUBLIC_PATH" @click="look" class="look tap_events">查看报告</div>
        </div>
        <div v-transfer-dom>
            <x-dialog @on-hide="dialogHide" v-model="showToast" class="dialog-c" :hide-on-blur="true">
                <div class="top">方案执行周期</div>
                <div class="ctn">中医调理是一个分阶段调理和反复辩证的过程，本方案建议4周为一个疗程，4周后重新测评进入新的调理阶段</div>
                <div :style="{backgroundImage: 'url(btn_bg_yellow_popups_cancel.png)'} | PUBLIC_PATH" class="btn tap_events" @click="hide">知道了</div>
            </x-dialog>
        </div>
    </div>
</template>
<script>
import TabarTop from '@/components/common/TabarTop.vue'
import { XDialog, TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            tabBar: [{ 'name': '饮食', 'path': 'diet'},{ 'name': '运动', 'path': 'motion' },{ 'name': '调理', 'path': 'conditioning' },{ 'name': '起居', 'path': 'dailyliving' }],
            showToast: false
        }
    },
    directives: {
        TransferDom
    },
    components: {
        TabarTop,
        XDialog
    },
    computed: {
        ...mapState(['dialogShow'])
    },
    mounted() {
        this.$nextTick(() => {
            // 判断有没有弹出过
            if(this.dialogShow) {
                this.showToast = true
            }
        })
    },
    methods: {
        ...mapMutations(['setDialogShow']),
        tabPath(val) {
            return this.$route.name == val
        },
        tabClick(path) {
            this.$router.push(path)
        },
        // 方案调整
        adjustment() {
            this.$router.push('/configure')
        },
        // 查看报告
        look() {
            this.$router.push('/presentation')
        },
        hide() {
            this.showToast = false
        },
        dialogHide() {
            this.setDialogShow(false)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.dialog-c {
    /deep/ .weui-dialog {
        width: 15rem /* 600/40 */;
        max-width: 100%;
        padding: 1.3rem /* 52/40 */ 1.15rem /* 46/40 */ 1.2rem /* 48/40 */;
        box-sizing: border-box;
        background: #FFFFFF;
        box-shadow: 0 .3rem /* 12/40 */ 1rem /* 40/40 */ 0 rgba(211,170,160,0.10);
        border-radius: .2rem /* 8/40 */;
        .top {
            font-size: 1rem /* 40/40 */;
            color: #333333;
            line-height: 1.4rem /* 56/40 */;
            font-weight: bold;
            margin-bottom: .625rem /* 25/40 */;
        }
        .ctn {
            font-size: .85rem /* 34/40 */;
            color: #333333;
            line-height: 1.25rem /* 50/40 */;
            margin-bottom: .875rem /* 35/40 */;
        }
        .btn {
            font-size: .9rem /* 36/40 */;
            color: #FFFFFF;
            width: 6.75rem /* 270/40 */;
            height: 2.35rem /* 94/40 */;
            border-radius: 1.25rem /* 50/40 */;
            @include box_shodow(0 .3rem /* 12/40 */ .75rem /* 30/40 */ 0);
            @include bg_color();
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 6.23rem /* 249.2/40 */ 1.85rem /* 74/40 */;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
    }
}
.administration {
    width: 100%;
    min-height: 100%;
    padding: 3.3rem /* 132/40 */ .75rem /* 30/40 */ 0;
    box-sizing: border-box;
    @include bg_color1();
    .tarbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2.5rem /* 100/40 */;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 .375rem /* 15/40 */;
        box-sizing: border-box;
        background: #FFFFFF;
        @include box_shodow1(0 .3rem /* 12/40 */ .75rem /* 30/40 */ 0);
        z-index: 999;
        li {
            font-size: .85rem /* 34/40 */;
            color: #333333;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .active {
            @include font_color10();
            font-weight: bold;
            position: relative;
            &::before {
                content: '';
                width: 1rem /* 40/40 */;
                height: .15rem /* 6/40 */;
                @include bg_color();
                @include box_shodow1(0 .3rem /* 12/40 */ .75rem /* 30/40 */ 0);
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    .button {
        width: 100%;
        height: 4.6rem /* 184/40 */;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .replay {
            font-weight: bold;
            width: 6.5rem /* 260/40 */;
            height: 2.5rem /* 100/40 */;
            @include box_shodow3(0 0.3rem 0.75rem 0);
            border-radius: 1.25rem /* 50/40 */;
            font-size: 0.9rem /* 36/40 */;
            @include font_color1();
            display: flex;
            align-items: center;
            justify-content: center;
            @include bg_color6();
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 6rem /* 240/40 */ 2rem /* 80/40 */;
        }
        .look {
            font-weight: bold;
            width: 10.25rem /* 410/40 */;
            height: 2.5rem /* 100/40 */;
            @include box_shodow(0 0.3rem 0.75rem 0);
            border-radius: 1.25rem /* 50/40 */;
            font-size: 0.9rem /* 36/40 */;
            @include font_color6();
            display: flex;
            align-items: center;
            justify-content: center;
            @include bg_color();
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 9.75rem /* 390/40 */ 2rem /* 80/40 */;
        }
    }
}
</style>
