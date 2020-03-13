<template>
    <div class="boxShowImg">
        <div class="calendar no-copy" ref="scrollView">
            <div class="calendar-c">
                <ul class="planDate" v-if="types === '1'">
                    <li v-for="(item, i) in nursePlanList" :key="`A${i}`">
                        <div :class="item.today !== '1'?'date':'date date1'">{{ item.today === "1"?"今日":item.weekDate }}</div>
                        <div @click="planDateClick(i)" :class="i===check?'weekDate select tap_events':'weekDate tap_events'" :style="{'color':item.rest == '1'?'#C4C4C4':' #333333'}">{{ item.planDate.substring(6) }}</div>
                    </li>
                </ul>
                <ul class="planDate" v-else>
                    <li v-for="(item, i) in nursePlanList" :key="`A${i}`">
                        <div :class="item.today !== '1'?'date':'date date1'">{{ item.today === "1"?"今日":item.weekInfo }}</div>
                        <div @click="planDateClick(i)" :class="i===check?'weekDate select tap_events':'weekDate tap_events'" :style="{'color':item.rest?'#C4C4C4':' #333333'}">{{ item.exerciseDate.substring(6) }}</div>
                    </li>
                </ul>
            </div>
            <!-- bg元素 -->
            <img class="imgLeft" :src="'bg_calendar_right_mask.png' | PUBLIC_PATH">
            <img class="imgRight" :src="'bg_calendar_left_mask.png' | PUBLIC_PATH">
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
import { all } from 'q';
export default {
    data() {
        return {
            check: 0
        }
    },
    props: {
        checked:{
            type: String | Number,
            default: 0
        },
        nursePlanList: {
            type: Array
        },
        types: {
            type: String,
            default: '1'
        },
        scrollLeft: {
            type: String | Number,
            default: 'no'
        },
        dateVal: {
            type: String | Number,
            default: 'no'
        }
    },
    created(){
    
    },
    watch:{
        // checked(n,o){
        //     console.log(n,o)
        //     this.check = n
        // }
    },
    mounted() { 
        this.$nextTick(()=>{
            // alert(Number(this.scrollLeft) ) 
            // alert(Number(this.dateVal))
            console.log(this.scrollLeft, this.dateVal)
            if(Number(this.scrollLeft) >= 0 && Number(this.dateVal) >= 0) { 
            //    alert()
                this.check = Number(this.dateVal)
                this.$refs.scrollView.scrollLeft = this.scrollLeft
                this.$emit('planDateClick', this.check, this.scrollLeft)
            }else { 
                // 取日历今天的状态
                console.log(this.nursePlanList)
                this.nursePlanList.some((item,i)=>{
                    if(item.today == "1") this.check = i;
                    if( item.isCurDay=="2") {
                        this.check = i;
                    }
                })
                let clientWidth = document.documentElement.clientWidth
                let scrollLeft = (clientWidth/(750/90) * this.check)
                this.$refs.scrollView.scrollLeft = scrollLeft
                this.$emit('planDateClick', this.check, scrollLeft)
            }
        })
    },
    methods: {
        planDateClick(val) {
            this.check = val
            // 记住此时日历的位置
            let scrollLeft = this.$refs.scrollView.scrollLeft
            this.$emit('planDateClick', val, scrollLeft)
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.boxShowImg {
    position: relative;
}
.calendar {
    width: 100%;
    height: 3rem;
    overflow-x: auto;
    padding: 0 1.05rem;
    box-sizing: border-box;
    margin-bottom: 1.4rem /* 56/40 */;
    &::-webkit-scrollbar {
        display: none;
    }
    .calendar-c {
        .planDate {
            display: flex;
            justify-content: space-between;
            white-space: nowrap;
            li {
                width: 1.6rem /* 64/40 */;
                height: 2.875rem /* 115/40 */;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                flex-basis: 1.6rem /* 64/40 */;
                flex-shrink: 0;
                & + li {
                    margin-left: .65rem /* 26/40 */;
                }
                &:last-child {
                    padding-right: 1.05rem;
                }
                .date {
                    height: .85rem /* 34/40 */;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: .7rem /* 28/40 */;
                    @include font_color12();
                    line-height: 0;
                }
                .date1 {
                    @include font_color11();
                }
                .weekDate {
                    width: 1.6rem /* 64/40 */;
                    height: 1.6rem /* 64/40 */;
                    min-width: 1.6rem;
                    max-height: 1.6rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: .85rem /* 34/40 */;
                    @include font_color4();
                    line-height: 0;
                    font-weight: bold;
                    transition: all .3s;
                }
            }
            .select {
                @include bg_color();
                color: #fff!important;
            }
        }
    }
    .imgLeft, .imgRight {
        width: 1.05rem /* 42/40 */;
        height: 2.875rem /* 115/40 */;
    }
    .imgLeft {
        position: absolute;
        left: -0.1rem;
        top: 0;
        z-index: 222;
    }
    .imgRight {
        position: absolute;
        right: -0.1rem;
        top: 0;
        z-index: 222;
    }
}
</style>

