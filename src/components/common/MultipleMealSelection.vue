<template>
    <div class="multiple">
        <ul class="multiple-c">
            <li
                :class="'select vux-1px tap_events'"
                v-for="(item, i) in multiple.slice(0,3)"
                :key="`B${i}`"
            >{{ item.name }}</li>
            <li class="fengge">以上餐次必选</li>
            <li
                @click="multipleClick(Number(i)+3)"
                :class="!item.check?'vux-1px tap_events':'select vux-1px tap_events'"
                v-for="(item, i) in multiple.slice(3)"
                :key="`A${i}`"
            >{{ item.name }}</li>
        </ul>
        <div
            :class="multipleFlag.length >= 1?'btn tap_events':'btn btnSelect tap_events'"
            :style="{backgroundImage: multipleFlag.length >= 1?'url(btn_bg_Evaluation_yellow_activation.png)':'url(btn_bg_Evaluation_yellow_enabled.png)'} | PUBLIC_PATH"
            @click="multipleSure"
        >{{ btn }}</div>
    </div>
</template>
<script>
export default {
    computed: {
        multipleFlag() {
            return this.multiple.filter(item => item.check);
        },
        multipleFlag1() {
            return this.multiple.slice(0, 3).filter(item => item.check);
        }
    },
    props: {
        btn: {
            type: String,
            default: "确定"
        },
        multiple: {
            type: Array,
            default: []
        },
        counts: {
            type: Number,
            default: 5
        }
    },
    methods: {
        multipleClick(i) {
            this.$emit("multipleClick", i);
        },
        multipleSure() {
            let val = "";
            let arr = [];
            this.multiple.forEach((item, i) => {
                if (item.check) {
                    val += `${item.name}、`;
                    arr.push(Number(item.id));
                }
            });
            val = val.substring(0, val.length - 1);
            this.$emit("multipleSure", val, arr);
        }
    }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.multiple {
    .multiple-c {
        margin-bottom: 1.6rem /* 64/40 */;
        li {
            width: 100%;
            height: 2rem /* 80/40 */;
            font-size: 0.8rem /* 32/40 */;
            @include font_color4();
            display: flex;
            align-items: center;
            justify-content: center;
            & + li {
                margin-top: 0.5rem /* 20/40 */;
            }
            &::before {
                border-radius: 0.3rem /* 12/40 */;
                @include border_color();
                box-sizing: border-box;
            }
        }
        .select {
            @include font_color11();
            transition: all 0.3s;
            font-weight: bold;
            &::before {
                transition: all 0.3s;
                @include border_color1();
                border-radius: 0.3rem /* 12/40 */;
                box-sizing: border-box;
            }
        }
        .fengge {
            height: 1.5rem /* 60/40 */;
            font-size: 0.6rem /* 24/40 */;
            @include font_color();
            opacity: 0.6;
            position: relative;
            &::before {
                content: "";
                display: inline-block;
                width: 4.45rem /* 178/40 */;
                height: 1px;
                background: #ccb8b7;
                opacity: 0.5;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
            &::after {
                content: "";
                display: inline-block;
                width: 4.45rem /* 178/40 */;
                height: 1px;
                background: #ccb8b7;
                opacity: 0.5;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    .btn {
        width: 100%;
        height: 2.4rem;
        @include box_shodow2(0 0.3rem 0.75rem 0);
        border-radius: 1.25rem;
        font-size: 0.9rem;
        @include font_color6();
        @include bg_color();
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 14.6275rem 1.9rem;
        margin: auto;
        margin-top: 0.7rem;
        margin-bottom: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        font-weight: bold;
    }
    .btnSelect {
        transition: all 0.3s;
        @include bg_color8();
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 14.6275rem 1.9rem;
    }
}
</style>

