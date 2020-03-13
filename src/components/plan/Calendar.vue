<template>
    <div class="calendar_box" :class="calendarData.canledarAnimateClass">
        <div class="c_t">
            <div class="icon_arrow tap_events" @click="swipeRight">
                <i class="arrow_left"></i>
            </div>
            <div class="c_txt tap_events" @click="handleCalendar">
                <span>{{calendarData.currentYear}}</span>
                <span>,</span>
                <span>{{calendarData.currentMonth}}月{{calendarData.curDay}}日</span>
            </div>
            <div class="icon_arrow tap_events" @click="swipeLeft">
                <i class="arrow_right"></i>
            </div>
        </div>
        <div class="c_main">
            <ul class="week">
                <li v-for="(item,index) in weekList" :key="index">{{item}}</li>
            </ul>
            <ul class="day" :class="swipeEventsClass">
                <li v-for="(item,index) in dayList" :key="index">
                    <div v-if="item.fullTime < today && item.fullTime >= registerTime" class="item tap_events">
                        <span v-if="item.isCurrentMonth" :class="[item.active?'on tap_events':'tap_events']" @click="selectDate(item,index)">{{item.day}}</span>
                        <span v-else class="gray" :class="[item.active?'on':'']">{{item.day}}</span>
                        <div class="point" :class="item.thinStatus"></div>
                    </div>
                    <div v-else-if="item.fullTime == today" class="item" @click="selectDate(item,index)">
                        <span :class="[today == item.fullTime?'istoday':'']">今天</span>
                        <div class="point" :class="item.thinStatus"></div>
                    </div>
                    <div v-else class="item">
                        <span class="gray">{{item.day}}</span>
                        <div class="point" :class="item.thinStatus"></div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="back_today tap_events" @click="goBack">
            <button>返回今天</button>
        </div>

    </div>
</template>

<script>
    import {
        TimeTool,
        getDaysInOneMonth,
        zeroize
    } from "@/utils/timeTool";
    import {
        isEmpty
    } from '@/assets/js/util.js';

    export default {
        props: {
            calendarData: {
                type: Object,
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                weekList: ["一", "二", "三", "四", "五", "六", "日"], //周
                dayList: [], //日历天数数组
                isToday: true,
                today: '', //今天
                swipeEventsClass: '', //日历滑动切换动效
                calendarThinInfos: [], //计划日历
                registerTime: '', //注册时间
            };
        },
        mounted() {
            // console.log(JSON.stringify(this.calendarData))
            let calendarInfo = this.calendarData.calendarInfo;
            if (!isEmpty(calendarInfo.calendarThinInfos)) {
                this.calendarThinInfos = calendarInfo.calendarThinInfos;
            }
            this.registerTime = calendarInfo.registerTime;
            let timeTool = new TimeTool();
            this.today = timeTool.fullDate;
            this._initCalendar();
        },
        methods: {
            /**
             * 返回今天
             */
            goBack() {
                let timeTool = new TimeTool();
                let data = {
                    "year": timeTool.year,
                    "day": timeTool.day,
                    "month": timeTool.month,
                    "fullDate": timeTool.fullDate.toString()
                }
                this.$emit("eventcalendar", {
                    data: data
                });
                this.handleCalendar()
            },
            handleCalendar() {
                this.calendarData.isShowCalendar = !this.calendarData.isShowCalendar;
            },
            /**
             * 初始化日历
             */
            _initCalendar() {
                let newDate = new TimeTool();
                let curDay = this.calendarData.curDay || '01';
                let timeTool = new TimeTool(this.calendarData.currentYear + this.calendarData.currentMonth + curDay);
                //当前月的第一天
                let currentMonthFirstDay = this.calendarData.currentYear + "-" + this.calendarData.currentMonth + "-01";
                // 获取当前月1号对应的周
                let inweek = new TimeTool(currentMonthFirstDay).week;
                //获取当前月的天数
                let currentMonthDays = getDaysInOneMonth(timeTool.year, timeTool.month);
                //获取上个月的天数
                let lastMonthDays = getDaysInOneMonth(timeTool.year, parseInt(timeTool.month) - 1);
                // console.log(currentMonthDays);
                let dayList = [];
                for (let i = 0; i < 42; i++) {
                    if (i >= 0 && i < parseInt(inweek) - 1) { //上月
                        // 判断当前天的属性
                        let isDayAttribute = 1; //过去天
                        if (new Date(newDate.year + "-" + zeroize(newDate.month) + "-" + zeroize(newDate.day)).getTime() > new Date(parseInt(timeTool.year) + "-" + zeroize(parseInt(timeTool.month) - 1) + "-" + zeroize(i + parseInt(lastMonthDays) - parseInt(inweek) + 2)).getTime()) {
                            isDayAttribute = 1; //过去天
                        } else if (new Date(newDate.year + "-" + zeroize(newDate.month) + "-" + zeroize(newDate.day)).getTime() == new Date(parseInt(timeTool.year) + "-" + zeroize(parseInt(timeTool.month) - 1) + "-" + zeroize(i + parseInt(lastMonthDays) - parseInt(inweek) + 2)).getTime()) {
                            isDayAttribute = 2; //当天
                            this.isToday = true;
                        } else {
                            isDayAttribute = 3; //未来天
                        }

                        //添加日历记录
                        let fullTime = zeroize(timeTool.year) + zeroize(parseInt(timeTool.month) - 1) + zeroize(i + parseInt(lastMonthDays) - parseInt(inweek) + 2);
                        let thinStatus = '';
                        for (let j = 0; j < this.calendarThinInfos.length; j++) {
                            if (this.calendarThinInfos[j].recordDate == fullTime) {
                                // thinStatus = this.calendarThinInfos[j].thinStatus;
                                if (this.calendarThinInfos[j].thinStatus == '1') {
                                    thinStatus = 'bgorange';
                                } else if (this.calendarThinInfos[j].thinStatus == '2') {
                                    thinStatus = 'bgred';
                                } else {
                                    thinStatus = 'bgblue';
                                }
                                break;
                            }
                        }
                        dayList.push({
                            "year": parseInt(timeTool.year),
                            "day": i + parseInt(lastMonthDays) - parseInt(inweek) + 2,
                            "month": parseInt(timeTool.month) - 1,
                            "isDayAttribute": isDayAttribute,
                            "isCurrentMonth": false,
                            "fullTime": fullTime,
                            "thinStatus": thinStatus
                        })

                    } else if (i >= parseInt(inweek) - 1 && i < parseInt(currentMonthDays) + parseInt(inweek) - 1) { //本月天
                        // 判断当前天的属性
                        let isDayAttribute = 1;
                        if (new Date(newDate.year + "-" + zeroize(newDate.month) + "-" + zeroize(newDate.day)).getTime() > new Date(parseInt(timeTool.year) + "-" + zeroize(timeTool.month) + "-" + zeroize(i - parseInt(inweek) + 2)).getTime()) {
                            isDayAttribute = 1;
                        } else if (new Date(newDate.year + "-" + zeroize(newDate.month) + "-" + zeroize(newDate.day)).getTime() == new Date(parseInt(timeTool.year) + "-" + zeroize(timeTool.month) + "-" + zeroize(i - parseInt(inweek) + 2)).getTime()) {
                            isDayAttribute = 2;
                            this.isToday = true;
                        } else {
                            isDayAttribute = 3;
                        }
                        //添加日历记录
                        let fullTime = zeroize(timeTool.year) + zeroize(parseInt(timeTool.month)) + zeroize(i - parseInt(inweek) + 2);
                        let thinStatus = '';
                        for (let j = 0; j < this.calendarThinInfos.length; j++) {
                            if (this.calendarThinInfos[j].recordDate == fullTime) {
                                // thinStatus = this.calendarThinInfos[j].thinStatus;
                                if (this.calendarThinInfos[j].thinStatus == '1') {
                                    thinStatus = 'bgorange';
                                } else if (this.calendarThinInfos[j].thinStatus == '2') {
                                    thinStatus = 'bgred';
                                } else {
                                    thinStatus = 'bgblue';
                                }
                                break;
                            }
                        }

                        dayList.push({
                            "year": parseInt(timeTool.year),
                            "day": i - parseInt(inweek) + 2,
                            "month": parseInt(timeTool.month),
                            "isDayAttribute": isDayAttribute,
                            "isCurrentMonth": true,
                            "fullTime": fullTime,
                            "thinStatus": thinStatus
                        })
                    } else if (i >= parseInt(currentMonthDays) + parseInt(inweek) - 1 && i < 42) { //未来天
                        // 判断当前天的属性
                        let isDayAttribute = 2;
                        if (new Date(newDate.year + "-" + zeroize(newDate.month) + "-" + zeroize(newDate.day)).getTime() > new Date(parseInt(timeTool.year) + "-" + zeroize(parseInt(timeTool.month) + 1) + "-" + zeroize(i - (parseInt(currentMonthDays) + parseInt(inweek) - 1) + 1)).getTime()) {
                            isDayAttribute = 1;
                        } else if (new Date(newDate.year + "-" + zeroize(newDate.month) + "-" + zeroize(newDate.day)).getTime() == new Date(parseInt(timeTool.year) + "-" + zeroize(parseInt(timeTool.month) + 1) + "-" + zeroize(i - (parseInt(currentMonthDays) + parseInt(inweek) - 1) + 1)).getTime()) {
                            isDayAttribute = 2;
                            this.isToday = true;
                        } else {
                            isDayAttribute = 3;
                        }
                        //添加日历记录
                        let fullTime = zeroize(timeTool.year) + zeroize(parseInt(timeTool.month) + 1) + zeroize(i - (parseInt(currentMonthDays) + parseInt(inweek) - 1) + 1);
                        let thinStatus = '';
                        for (let j = 0; j < this.calendarThinInfos.length; j++) {
                            if (this.calendarThinInfos[j].recordDate == fullTime) {
                                // thinStatus = this.calendarThinInfos[j].thinStatus;
                                if (this.calendarThinInfos[j].thinStatus == '1') {
                                    thinStatus = 'bgorange';
                                } else if (this.calendarThinInfos[j].thinStatus == '2') {
                                    thinStatus = 'bgred';
                                } else {
                                    thinStatus = 'bgblue';
                                }
                                break;
                            }
                        }

                        dayList.push({
                            "year": parseInt(timeTool.year),
                            "day": i - (parseInt(currentMonthDays) + parseInt(inweek) - 1) + 1,
                            "month": parseInt(timeTool.month) + 1,
                            "isDayAttribute": isDayAttribute,
                            "isCurrentMonth": false,
                            "fullTime": fullTime,
                            "thinStatus": thinStatus
                        })
                    }

                }

                this.dayList = dayList;
                //从父组件接收当前选中的天数
                this.dayList.map((e, i) => {
                    if (this.calendarData.fullDate == e.fullTime) {
                        this.$set(this.dayList[i], 'active', true)
                    } else {
                        this.$set(this.dayList[i], 'active', false)
                    }
                })

                // console.log(JSON.stringify(dayList))
            },

            /**
             * 选择日期
             */
            selectDate(item, index) {
                this.dayList.forEach((e) => {
                    e.active = false;
                })
                this.$set(this.dayList[index], 'active', true)
                let data = {
                    "year": zeroize(item.year),
                    "day": zeroize(item.day),
                    "month": zeroize(item.month),
                    "fullDate": item.fullTime
                }
                this.calendarData.isShowCalendar = false;
                this.$emit("eventcalendar", {
                    data: data
                });
            },
            /**
             * 操作日历，上月，下月
             */
            doCalendar(operationType) {
                if (operationType == 'last') { //上月
                    console.log("last");
                    let m = parseInt(this.calendarData.currentMonth);
                    // 小于0的需要年相应减一
                    if (m <= 1) {
                        this.calendarData.currentYear = zeroize(parseInt(this.calendarData.currentYear) - 1);
                        this.calendarData.currentMonth = zeroize("12");
                    } else {
                        this.calendarData.currentMonth = zeroize(m - 1);
                    }
                } else { //下月
                    console.log("next");
                    let m = parseInt(this.calendarData.currentMonth);
                    if (m < 12) {
                        this.calendarData.currentMonth = zeroize(m + 1);
                    } else {
                        this.calendarData.currentYear = zeroize(parseInt(this.calendarData.currentYear) + 1);
                        this.calendarData.currentMonth = zeroize("01");
                    }
                }

                this._initCalendar();
            },
            swipeLeft() {
                //日期大于今天，不能切换日历
                let date = this.calendarData.currentYear + this.calendarData.currentMonth + this.calendarData.curDay;
                // console.log(date, this.today)
                if (Number(date) >= Number(this.today)) {
                    return;
                }
                this.swipeEvents("next");
            },
            swipeRight() {
                // 日期小于注册日历，不能切换日历
                let date = this.calendarData.currentYear + this.calendarData.currentMonth + this.calendarData.curDay;
                // console.log(date, this.registerTime);
                if (Number(date) >= Number(this.registerTime)) {
                    return;
                }
                this.swipeEvents("last");
            },
            swipeEvents(type) {
                if (type == "next") {
                    this.swipeEventsClass = 'swipe_left';
                } else {
                    this.swipeEventsClass = 'swipe_right';
                }
                clearTimeout(timer);
                let timer = setTimeout(() => {
                    this.swipeEventsClass = "";
                    this.doCalendar(type);
                }, 200);
            },
        }
    };
</script>

<style lang="scss" scoped>
    .calendar_box {
        position: relative;
        width: 100%;
        // height: 200px;
        // background: green;
        display: flex;
        flex-direction: column;

        .c_t {
            height: 2.6rem;
            display: flex;
            align-items: center;
            justify-content: center;

            .c_txt {
                width: 5.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            span {
                font-size: 0.75rem;
                color: #252525;
                font-weight: bold;
            }

            .icon_arrow {
                width: 2.5rem;
                height: 100%;
                position: relative;

                i {
                    width: .3rem;
                    height: .375rem;
                    display: block;
                    position: absolute;
                    top: 50%;
                    transform: translate(0, -50%);
                }

                .arrow_left {
                    background: url("../../assets/plan/icon_syrl_zjt.png") center no-repeat;
                    background-size: 100% 100%;
                    right: .25rem;
                }

                .arrow_right {
                    background: url("../../assets/plan/icon_syrl_yjt.png") center no-repeat;
                    background-size: 100% 100%;
                    left: .25rem;
                }
            }
        }

        .c_main {

            .week {
                height: 1.3rem;
                display: flex;
                align-items: center;

                & > li {
                    width: 14.28%;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: 0.7rem;
                    color: #999999;
                }
            }

            .day {
                position: relative;
                margin-top: 0.25rem;

                li {
                    width: 14.28%;
                    height: 2rem;
                    display: block;
                    float: left;

                    .item {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;

                        span {
                            color: #252525;
                            text-align: center;
                            width: 100%;
                            height: 100%;
                            line-height: 2rem;
                            font-size: .8rem;
                        }

                        .istoday {
                            color: #4C65E2;
                            font-size: .75rem;
                        }

                        .on {
                            border-radius: 50%;
                            width: 1.25rem;
                            height: 1.25rem;
                            line-height: 1.25rem;
                            background: #4C65E2;
                            color: #ffffff;
                        }

                        .gray {
                            color: #e2e2e2;
                        }

                        .point {
                            position: absolute;
                            bottom: 0;
                            left: 50%;
                            width: .3rem;
                            height: .3rem;
                            border-radius: 50%;
                            margin-inline-start: -0.15rem;
                        }

                        .bgorange {
                            background: #F2D57B;
                        }

                        .bgred {
                            background: #E17470;
                        }

                        .bgblue {
                            background: #7AB3F9;
                        }
                    }

                }
            }
        }

        .back_today {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            height: 1.5rem;
            margin-top: .5rem;
            margin-right: .8rem;

            button {
                width: 4rem;
                height: 1.5rem;
                background: rgba(76, 101, 226, 0.1);
                border-radius: 30px;
                color: #4C65E2;
                font-size: .7rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .fadeInUp {
        animation-name: fadeInUp;
        animation-duration: 200ms;
        animation-fill-mode: forwards;
        animation-delay: 0ms;
    }

    @keyframes fadeInUp {
        from {
            height: 0;
        }

        to {
            height: 19.975rem;
        }
    }
</style>
