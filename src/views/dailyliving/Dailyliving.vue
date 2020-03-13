<template>
<div class="dailylife">
    <div v-if="planList && planList[dateVal]" class="dailylift-bottom">
        <LayBg/>
        <Calendar :nursePlanList="planList" @planDateClick="planDateClick" :dateVal="dateVal1" :scrollLeft="scrollLeft" />
        <ul v-if="planList && planList[dateVal] && planList[dateVal].nurseMethodList" class="detail">
            <li class="tap_events" v-for="(item, i) in planList[dateVal].nurseMethodList" :key="`date${i}`">
                <DailylifeDetail :index="i" :dlId="item.dlId" :name="item.name" :content="item.content" :imageUrl="item.imageUrl" :punchStatus="item.punchStatus" :dataList="item.dataList" v-on:punch="punch(i)" />
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import LayBg from "@/components/common/LayBg";
import Calendar from '@/components/common/Calendar.vue';
import DailylifeDetail from '@/components/common/DailylifeDetail.vue';
import { mapState, mapMutations } from 'vuex'
import { apiDailyliving, apiDailylivingPunch } from '@/service/api/dailyliving'
export default {
    data(){
        return{
            planList: [],
            dateVal: 0,
            dateVal1: 'no',
            scrollLeft: 'no'
        }
    },
    computed: {
        ...mapState(['code', 'userInfo']),
    },
    components: {
        LayBg,
        Calendar,
        DailylifeDetail
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.scrollLeft = window.sessionStorage.getItem('dailyliving-scrollLeft')
            vm.dateVal1 = window.sessionStorage.getItem('dailyliving-dateVal')
        })
    },
    created() {
        // 获取获取中医起居计划首页
        this.getData()
    },
    methods: {
        ...mapMutations('administration', ['setTabarTopData']),
        async getData() {
            const data = await apiDailyliving(this.userInfo.userId,this.code)
            if(data.planStatus == 1) {
                this.setTabarTopData(data.nursePrinciple)
                this.planList = data.planList
                for(var i = 0; i < data.planList.length; i++){
                    var item = data.planList[i]
                    if(item.today == 1){
                        this.dateVal = i
                        this.dateVal1 = i
                        break
                    }
                }
            }else {
                this.$router.replace('/')
            }
        },
        // 点击日期
        planDateClick(val, val1) {
            this.scrollLeft = val1
            this.dateVal = val
            this.dateVal1 = val
        },
        async punch(index) {
            var item = this.planList[this.dateVal].nurseMethodList[index]
            const data = await apiDailylivingPunch(this.userInfo.userId,this.code,item.dlId)
            item.punchStatus = '1'
        }
    },
    beforeDestroy() {
        window.sessionStorage.setItem('dailyliving-scrollLeft', this.scrollLeft)
        window.sessionStorage.setItem('dailyliving-dateVal', this.dateVal)
        this.setTabarTopData({})
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.dailylife {
    min-height: 100%;
 /*   padding: 0.8rem 0.75rem 1.2rem; */
    @include bg_color1();
    box-sizing: border-box;
}
.dailylift-bottom {
    @include bg_color6();
    padding: 1.4rem /* 56/40 */ 0rem /* 42/40 */ 1.4rem /* 56/40 */;
    box-sizing: border-box;
    position: relative;
}
</style>
