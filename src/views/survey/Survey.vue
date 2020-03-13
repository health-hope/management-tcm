<template>
    <div class="survey">
        <!-- 进度条 -->
        <section class="progress-c">
            <jkyy-progress :total="total" :bar="bar"></jkyy-progress>
            <div class="count-c">
                <div class="count">
                    <img class="font" :src="item" v-for="(item, i) in barArr" :key="i">
                    <span class="count-2">/</span>
                    <img class="font" :src="item" v-for="(item, i) in totalArr" :key="'A'+ i">
                </div>
            </div>
        </section>
        <!-- 内容区域 -->
        <template v-for="(sd,i) in surveyData">
            <section
                :class="`ctn qqq${i}`"
                :key="'B' + i"
                v-show="sd.exhibition"
                :style="{ minHeight: `${clientHeight}px` }"
            >
                <div class="jianxi"></div>
                <questions-style v-if="i == 0" :text="text"></questions-style>
                <questions-style :text="sd.questionContent" :loading="sd.loading"></questions-style>
                <!-- 进场动画 -->
                <transition name="pull-up-deep">
                    <div
                        :class="sd.questionType == 2?'listToggle multiple-top':'listToggle'"
                        v-show="sd.approach"
                    >
                        <div v-show="sd.show" :class="`spack-style shrink${i}`">
                            <div class="spack-bg">
                                <LayBg/>
                                <!-- 出生年月日 -->
                                <div class="tras-opacity" v-if="sd.questionType == 3">
                                    <datetime-view
                                        class="datetime"
                                        :startDate="startDate"
                                        :endDate="endDate"
                                        v-model="datetime"
                                        ref="datetime"
                                        :format="format"
                                    ></datetime-view>
                                    <div
                                        class="again tap_events"
                                        :style="{backgroundImage: 'url(btn_bg_Evaluation_yellow_activation.png)'} | PUBLIC_PATH"
                                        @click="again(i,`.shrink${i}`,`.shrinkT${i}`)"
                                    >继续</div>
                                </div>
                                <!-- 身高 -->
                                <div class="tras-opacity" v-if="sd.questionType == 5">
                                    <picker
                                        class="zy-pheight"
                                        style="padding: 10px 0"
                                        :data="PHeightArr"
                                        v-model="PHeight"
                                    ></picker>
                                    <div
                                        class="again tap_events"
                                        :style="{backgroundImage: 'url(btn_bg_Evaluation_yellow_activation.png)'} | PUBLIC_PATH"
                                        @click="again(i,`.shrink${i}`,`.shrinkT${i}`)"
                                    >继续</div>
                                </div>
                                <!-- 体重 -->
                                <div class="tras-opacity" v-if="sd.questionType == 6">
                                    <picker
                                        class="zy-pweight"
                                        style="padding: 10px 0"
                                        :data="PWeightArr"
                                        v-model="PWeight"
                                    ></picker>
                                    <div
                                        class="again tap_events"
                                        :style="{backgroundImage: 'url(btn_bg_Evaluation_yellow_activation.png)'} | PUBLIC_PATH"
                                        @click="again(i,`.shrink${i}`,`.shrinkT${i}`)"
                                    >继续</div>
                                </div>
                                <!-- 性别 -->
                                <div class="tras-opacity" v-if="sd.questionType == 4">
                                    <div class="gender">
                                        <div
                                            @click="selectGender(1,`.shrink${i}`,`.shrinkT${i}`)"
                                            :class="genderCheck == '1'?'g1 check tap_events':'g1 tap_events'"
                                        >
                                            <img :src="'boy.png' | PUBLIC_PATH">
                                        </div>
                                        <div
                                            key="2"
                                            @click="selectGender(2,`.shrink${i}`,`.shrinkT${i}`)"
                                            :class="genderCheck == '2'?'g1 check tap_events':'g1 tap_events'"
                                        >
                                            <img :src="'girl.png' | PUBLIC_PATH">
                                        </div>
                                    </div>
                                </div>
                                <!-- 多选 -->
                                <div class="tras-opacity" v-if="sd.questionType == 2">
                                    <div class="multiple">
                                        <div
                                            @click="multipleSelect(sd.options,muls, i)"
                                            :class="multip.check?'item itemCheck vux-1px tap_events':'item vux-1px tap_events'"
                                            v-for="(multip ,muls) in sd.options"
                                            :key="'C' + muls"
                                        >{{ multip.optionContent }}</div>
                                        <div class="multipleIcon">多选题</div>
                                    </div>
                                    <div
                                        :class="sd.options.some(item=>item.check)?'again tap_events':'again againSelect tap_events'"
                                        :style="{backgroundImage: sd.options.some(item=>item.check)?'url(btn_bg_Evaluation_yellow_activation.png)':'url(btn_bg_Evaluation_yellow_enabled.png)'} | PUBLIC_PATH"
                                        @click="again(i,`.shrink${i}`,`.shrinkT${i}`,sd.options)"
                                    >继续</div>
                                </div>
                                <!-- 单选 -->
                                <div class="tras-opacity" v-if="sd.questionType == 1">
                                    <div class="single">
                                        <div
                                            @click="singleSelect(sd.options, ls, i,`.shrink${i}`,`.shrinkT${i}`)"
                                            :class="item.check?'item itemCheck tap_events':'item vux-1px tap_events'"
                                            v-for="(item,ls) in sd.options"
                                            :key="'D' + ls"
                                        >{{ item.optionContent }}</div>
                                    </div>
                                </div>
                                <!-- OK -->
                                <div class="tras-opacity" v-if="sd.questionType == 'ok'">
                                    <div :style="{backgroundImage: 'url(btn_bg_Evaluation_yellow_activation.png)'} | PUBLIC_PATH" class="ok tap_events" @click="ok">OK</div>
                                </div>
                            </div>
                        </div>
                        <div v-show="!sd.show" :class="`spack-style1 shrinkT${i}`">
                            <div class="spack-bg">
                                <div class="ans-ctn" ref="again">
                                    <!-- 出生年月日 -->
                                    <LayBg bg1="bg_huang_zuoshang.png" bg2="bg_huang_youshang.png" bg3="bg_huang_zuoxia.png" bg4="bg_huang_youxia.png"/>
                                    <p
                                        class="tras-opacity"
                                        v-if="sd.questionType == 3"
                                    >{{ datetime }}</p>
                                    <!-- 身高 -->
                                    <p
                                        class="tras-opacity"
                                        v-if="sd.questionType == 5"
                                    >{{ PHeight[0]}} 厘米</p>
                                    <!-- 体重 -->
                                    <p
                                        class="tras-opacity"
                                        v-if="sd.questionType == 6"
                                    >{{ PWeight[0]}} 公斤</p>
                                    <!-- 性别 -->
                                    <p
                                        class="tras-opacity"
                                        v-if="sd.questionType == 4"
                                    >{{ genderCheck == '1'?'男':'女' }}</p>
                                    <!-- 多选 -->
                                    <p
                                        class="tras-opacity"
                                        v-if="sd.questionType == 2"
                                    >{{ multipleText(sd.options) }}</p>
                                    <!-- 单选 -->
                                    <p
                                        class="tras-opacity"
                                        v-if="sd.questionType == 1"
                                    >{{ singleText(sd.options) }}</p>
                                    <!-- 编辑 -->
                                    <transition name="editFade">
                                        <div
                                            v-show="!sd.show"
                                            class="edit tap_events"
                                            @click="edit(i,`.shrinkT${i}`,`.shrink${i}`)"
                                        >
                                            <img :src="'btn_ic_edit.png' | PUBLIC_PATH">
                                        </div>
                                    </transition>
                                    <!-- 回答头像 -->
                                    <transition name="pull-up">
                                        <div v-show="!sd.show" class="userPhoto" :style="{backgroundImage: 'url(yonghu_touxiang.png)'} | PUBLIC_PATH"
                                        ></div>
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </section>
        </template>
    </div>
</template>
<script>
    import $ from 'jquery'
    import { apiSurveyData, apiSaveSurveyData } from '@/service/api/survey'
    import { apiHomeData } from '@/service/api/home'
    import jkyyProgress from '@/components/survey/Progress.vue'
    import questionsStyle from '@/components/common/QuestionsStyle.vue'
    import setFontColor from '@/assets/js/setFootColor.js'
    import LayBg from '@/components/common/LayBg';
    import { DatetimeView, Picker } from 'vux'
    import { mapState, mapMutations } from 'vuex';
    import { setTimeout } from 'timers';
    // 初始化身高选择器
    let PHeightArr = []
    // 初始化体重选择器
    let PWeightArr = []
    let quesOptions = []
    export default {
        data() {
            return {
                total: 0,
                bar: 0,
                totalArr: [],
                barArr: [],
                format: 'YYYY-MM-DD',
                datetime: '1990-01-01',
                startDate: '',
                endDate: '',
                show: true,
                text: '首先有几个基础信息需要采集一下，真实的数据才能给到您精准的推荐哦~',
                PHeight: ['175'],
                PHeightArr: [PHeightArr],
                PWeight: ['75.0'],
                PWeightArr: [PWeightArr],
                genderCheck: '',   // 男 1  女 2
                surveyData: [],
                userOptions: [], // 用户测评选项
                clientHeight: document.documentElement.clientHeight || document.body.clientHeight,
                userLimitInfo: {},
                quesBankId: ''      // 题库id
            }
        },
        components: {
            jkyyProgress,
            questionsStyle,
            DatetimeView,
            Picker,
            LayBg
        },
        watch: {
            total() {
                this.setTotal()
            },
            bar() {
                this.setBar()
            },
            datetime(val) {      // 监听出生日期
                let i = this.surveyData.findIndex(item => item.questionCode == 'birthday')
                this.$set(this.surveyData[i].options[0], 'optionCode', val)
            },
            genderCheck(val) {     
                let i = this.surveyData.findIndex(item => item.questionCode == 'gender')
                this.$set(this.surveyData[i].options[0], 'optionCode', val)
            },
            PHeight(val) {     
                let i = this.surveyData.findIndex(item => item.questionCode == 'height')
                this.$set(this.surveyData[i].options[0], 'optionCode', val[0])
            },
            PWeight(val) {      
                let i = this.surveyData.findIndex(item => item.questionCode == 'weight')
                this.$set(this.surveyData[i].options[0], 'optionCode', val[0])
            },
        },
        computed: {
            ...mapState(['code','userInfo'])
        },
        async created() {
            // 当前题数
            this.setBar()
            // 总题数
            this.setTotal()
            // 获取userLimitInfo
            await this.getBrief()
            // 获取题库
            await this.getSurvey()
        },
        methods: {
            ...mapMutations(['setHeight','setWeight','setBirthday','setGender','setActivityLevel','setEvaluationId']),
            async getBrief() {
                const data = await apiHomeData(this.code)
                this.userLimitInfo = data.data.userLimitInfo
            },
            // 请求题库
            async getTopic(a, b, c, d, e) {
                let userOptions = []
                this.userOptions.forEach(item => {
                    if(item.questionCode == 'birthday') {
                        this.setBirthday(item.optionCodes[0])
                    }
                    if(item.questionCode == 'gender') {
                        this.setGender(item.optionCodes[0])
                    }
                    if(item.questionCode == 'height') {
                        this.setHeight(item.optionCodes[0])
                    }
                    if(item.questionCode == 'weight') {
                        this.setWeight(item.optionCodes[0])
                    }
                    if(!isNaN(Number(item.questionCode))) {
                        userOptions.push(item)
                    }
                })
                this.surveyData = quesOptions
                let data = await apiSurveyData(this.code, this.userInfo)
                this.quesBankId = data.quesBankId
                // ok
                const ok = { 'questionContent': '恭喜！测评题目已完成，快来看看结果吧~', 'questionType': 'ok', 'questionCode': 'over', 'nextQuesCode': 'over' }
                data.quesOptions.push(ok)
                data.quesOptions.forEach(item => {
                    item.show = true
                    item.exhibition = false
                    item.loading = true
                    item.approach = false
                    // 选项的处理
                    if (item.questionType == 1 || item.questionType == 2) {
                        item.options.forEach((option, ls) => {
                            option.check = false
                        })
                    }
                })
                this.surveyData = [...quesOptions, ...data.quesOptions]
                this.$nextTick(() => {
                    this.again(a, b, c, d, e)
                })
            },
            async getSurvey() {
                quesOptions = []
                // 基础信息题的拼装 questionType 1 单选 2 多选  3 出生日期   4  性别   5 身高   6 体重 
                // 出生年月日
                const birthday = { 'questionContent': '您的出生日期？', 'questionType': '3', 'questionCode': 'birthday', 'options': [{ 'optionCode': this.datetime }] }
                // 性别
                const gender = { 'questionContent': '您的性别？', 'questionType': '4', 'questionCode': 'gender', 'options': [{ 'optionCode': this.genderCheck }] }
                // 身高
                const height = { 'questionContent': '您的身高？', 'questionType': '5', 'questionCode': 'height', 'options': [{ 'optionCode': this.PHeight[0] }] }
                // 体重
                const weight = { 'questionContent': '您的体重？', 'questionType': '6', 'questionCode': 'weight', 'options': [{ 'optionCode': this.PWeight[0] }] }
                // 劳动程度
                const activityLevel = { 'questionContent': '您的体力劳动程度是？', 'questionType': '1', 'questionCode': 'activityLevel', 'options': [{ 'optionCode': '1', 'optionContent': '极轻体力，长时间久坐，如银行职员，办公室职员' }, { 'optionCode': '2', 'optionContent': '轻体力，以坐为主有轻微体力活动，如老师、学生' }, { 'optionCode': '3', 'optionContent': '中体力，体力活动较多，如服务员' }, { 'optionCode': '4', 'optionContent': '重体力，体力活动为主，如搬运工' }] }
                if(this.userLimitInfo.activityLevel.need == 1) {
                    quesOptions.unshift(activityLevel)
                }
                if(this.userLimitInfo.weight.need == 1) {
                    let min = Number(this.userLimitInfo.weight.min)
                    let max = Number(this.userLimitInfo.weight.max)
                    for (let i = min; i <= max; i++) {
                        if(i == max) {
                            PWeightArr.push({
                                name: `${i}.0`,
                                value: `${i}.0`
                            })
                        }else {
                            for (let j = 0; j <= 9; j++) {
                                PWeightArr.push({
                                    name: `${i}.${j}`,
                                    value: `${i}.${j}`
                                })
                            }
                        }
                    }
                    quesOptions.unshift(weight)
                }
                if(this.userLimitInfo.height.need == 1) {
                    let min = Number(this.userLimitInfo.height.min)
                    let max = Number(this.userLimitInfo.height.max)
                    for (let i = min; i <= max; i++) {
                        PHeightArr.push({
                            name: i + '',
                            value: i + ''
                        })
                    }
                    quesOptions.unshift(height)
                }
                if(this.userLimitInfo.gender.need == 1) {
                    quesOptions.unshift(gender)
                }
                if(this.userLimitInfo.birthday.need == 1) {
                    this.startDate = this.userLimitInfo.birthday.max
                    this.endDate = this.userLimitInfo.birthday.min
                    quesOptions.unshift(birthday)
                }
                quesOptions.forEach((item) => {
                    item.show = true
                    item.exhibition = false
                    item.loading = true
                    item.approach = false
                    // 选项的处理
                    if (item.questionType == 1 || item.questionType == 2) {
                        item.options.forEach((option, ls) => {
                            option.check = false
                        })
                    }
                })
                this.surveyData = quesOptions
                // 设置当前题数和总题数
                this.bar = 1
                // 初始题数不确定，故先给个固定值  20
                this.total = 20
                this.$set(this.surveyData[0], 'exhibition', true)
                // 显示第一题
                this.$nextTick(() => {
                    this.go(0)
                })
            },
            setBar() {
                this.barArr = setFontColor(this.bar, 'shen')
            },
            setTotal() {
                this.totalArr = setFontColor(this.total, 'shen')
            },
            // 选择性别
            selectGender(val, val1, val2) {
                this.genderCheck = val
                if(this.genderCheck == 1) {
                    // 选择男 默认体重75kg 身高175
                    // 选择女 默认体重55kg 身高160
                    this.PWeight = ['75.0']
                    this.PHeight = ['175']
                }else {
                    this.PWeight = ['55.0']
                    this.PHeight = ['160']
                }
                this.again(1, val1, val2)
            },
            // 多选题
            multipleSelect(multiple, muls, i) {
                if (multiple[muls].unique) {
                    if (!multiple[muls].check) {
                        multiple.forEach((item) => {
                            item.check = false
                        })
                        multiple[muls].check = true
                    } else {
                        multiple[muls].check = false
                    }
                } else {
                    multiple.forEach((item) => {
                        if (item.unique) {
                            item.check = false
                        }
                    })
                    multiple[muls].check = !multiple[muls].check
                }
            },
            // 多选答案处理 p标签内只能放文字，否则无法准确的计算出高度，导致动画出问题，故处理
            multipleText(multiple) {
                let text = ''
                multiple.forEach(item => {
                    if (item.check) {
                        text += `${item.optionContent}；`
                    }
                })
                return text.substring(text.length - 1, -1)
            },
            // 单选处理
            singleSelect(single, ls, i, val1, val2) {
                if (!single[ls].check) {
                    single.forEach((item, index) => {
                        this.$set(this.surveyData[i].options[index], 'check', false)
                    })
                    this.$set(this.surveyData[i].options[ls], 'check', true)
                }
                if(this.surveyData[i].questionCode === 'activityLevel') {
                    this.setActivityLevel(Number(ls) + 1)
                    // 做完基础题之后，再去请求题库
                    this.$nextTick(() => {
                        // 单选判断需不需要跳题
                        let tiaoTi = this.surveyData[i].options[ls].nextQuesCode
                        let arr1 = this.userOptions.filter(item => item.questionCode == "activityLevel")
                        if(arr1.length && arr1[0].optionCodes[0] == Number(ls) + 1) {
                            this.again(i, val1, val2, [{ check: true }], tiaoTi)
                        }else {
                            this.getTopic(i, val1, val2, [{ check: true }], tiaoTi)
                        }
                    })
                }else {
                    this.$nextTick(() => {
                        // 单选判断需不需要跳题
                        let tiaoTi = this.surveyData[i].options[ls].nextQuesCode
                        this.again(i, val1, val2, [{ check: true }], tiaoTi)
                    })
                }
            },
            singleText(single) {
                let text = ''
                single.forEach(item => {
                    if (item.check) {
                        text = item.optionContent
                    }
                })
                return text
            },
            // go  索引  
            go(i) {
                this.$nextTick(() => {
                    let scroll_offset = $(`.qqq${i}`).offset();
                    $("body,html").animate({
                        scrollTop: scroll_offset.top
                    }, 500, () => {
                        this.$set(this.surveyData[i], 'loading', false)
                        this.$set(this.surveyData[i], 'approach', true)
                    })
                })
            },
            // ok
            async ok() {
                // 保存测评结果
                let userOptions = []
                this.userOptions.forEach(item => {
                    if(item.questionCode == 'birthday') {
                        this.setBirthday(item.optionCodes[0])
                    }
                    if(item.questionCode == 'gender') {
                        this.setGender(item.optionCodes[0])
                    }
                    if(item.questionCode == 'height') {
                        this.setHeight(item.optionCodes[0])
                    }
                    if(item.questionCode == 'weight') {
                        this.setWeight(item.optionCodes[0])
                    }
                    if(!isNaN(Number(item.questionCode))) {
                        userOptions.push(item)
                    }
                })
                const res = await apiSaveSurveyData(this.quesBankId, this.code, this.userInfo, userOptions)
                this.setEvaluationId(res.evaluationId)
                this.$router.push({
                    path:'presentation',
                    query:{isGoBack:"isGoBack"}
                })
            },
            again(i, clas1, clas2, multiple = [{ check: true }], tiaoTi) {
                if (multiple.length && !multiple.some(item => item.check)) return
                // rem 换算
                let clientWidth = document.documentElement.clientWidth
                // 用宽度计算它实际的位置
                let clas1Height = $(clas1)[0].getBoundingClientRect().height
                // 性能优化,数据量大的时候执行动画会出现卡动,故设置宽高,且内容清空,再执行动画
                $(clas1).css({ height: `${clas1Height}px` })
                // 动画执行结束后，再将display改为block
                $(`${clas1} .tras-opacity`).css({ display: 'none' })
                // 转换为行内块级元素 且超过内容一行通过maxWidth限制宽度 从而准确的计算高度
                $(clas2).css({ display: 'inline-block', maxWidth: '11rem' })
                let ele = $(clas2)[0].getBoundingClientRect()
                // 计算完高度之后还原样式
                $(clas2).css({ display: 'none', maxWidth: '100%' })
                // .survey容器宽度
                let containerWidth = $('.survey').width()
                // 减去要显示内容的宽度 424px / 150px   424 / 40   比例 clientWidth / 18.75
                let eleLeft = (clientWidth - ele.right - ele.left - (clientWidth / 18.75) * 2.9) / (clientWidth / 18.75)
                // marginLeft极限是3.75rem margin-left: 3.75rem  margin-right: 2.9rem 
                if (eleLeft < 3.75) { eleLeft = 3.75 }
                $(clas1).stop().animate({ marginRight: '2.9rem', marginLeft: `${eleLeft}rem`, height: `${ele.height}px` }, 300, () => {
                    $(clas2).css({ 'margin-left': `${eleLeft}rem`, 'margin-right': '2.9rem' })
                    this.$set(this.surveyData[i], 'show', false)
                    $(clas2).height('auto')
                    $(clas1).removeAttr("style")
                    $(`${clas1} .tras-opacity`).css({ display: 'block' })
                    // 判断是不是ok
                    if (this.surveyData[i].nextQuesCode != 'over') {
                        $(`.qqq${i}`).css({ minHeight: 'auto' })
                    }
                    // 题号  及答案号
                    let questionCode = this.surveyData[i].questionCode
                    let optionCodes = []
                    this.surveyData[i].options.forEach(item => {
                        if (item.check || this.surveyData[i].questionType > 2) {
                            optionCodes.push(item.optionCode)
                        }
                    })
                    // 判断之前有没有做过这道题
                    let flag = this.userOptions.some(item => item.questionCode == questionCode)
                    if (!flag) {
                        // 存储填写记录
                        this.userOptions.push({
                            questionCode: questionCode,
                            optionCodes: optionCodes
                        })
                    } else {
                        // 之前做过 判断有没有更改,有就覆盖，清空下面，不影响下一题逻辑，下面回显
                        let arr = this.userOptions.filter(item => item.questionCode == questionCode)
                        let opt1 = arr[0].optionCodes
                        if (opt1.join(',') != optionCodes.join(',')) {
                            arr[0].optionCodes = optionCodes
                            // 清空下面的选项
                            this.surveyData.forEach((item, index) => {
                                if (i < index) {
                                    // 下面的题隐藏  min-height 还原
                                    $(`.shrinkT${index}`).removeAttr('style').css({display: 'none'})
                                    $(`.qqq${index}`).css({ minHeight: `${this.clientHeight}px` })
                                    this.$set(this.surveyData[index], 'show', true)
                                    this.$set(this.surveyData[index], 'loading', true)
                                    this.$set(this.surveyData[index], 'approach', false)
                                    this.$set(this.surveyData[index], 'exhibition', false)
                                }
                            })
                            // 重新设置当前题数 zong
                            let _index = this.userOptions.findIndex(item => item.questionCode == questionCode)
                            this.userOptions = this.userOptions.slice(0, Number(_index) + 1)
                        } else {
                            return false
                        }
                    }
                    // 判断有没有跳题 选项的nextQuesCode优先级大于 外层的nextQuesCode
                    // 先判断选项跳题逻辑（目前只有单选），再判断外层跳题逻辑，
                    let nextQuesCode = this.surveyData[i].nextQuesCode
                    if (tiaoTi > 0) {
                        // 单选选项跳题
                        nextQuesCode = tiaoTi
                    }
                    if (nextQuesCode > 0) {
                        // 跳题后改变总题数
                        // 通过nextQuesCode 找到其对应的跳转索引
                        let index = this.surveyData.findIndex(item => item.questionCode == nextQuesCode)
                        this.$set(this.surveyData[index], 'exhibition', true)
                        setTimeout(() => {
                            this.go(index)
                        }, 500)
                    } else if (nextQuesCode == '') {
                        // 弹出ok
                        this.$set(this.surveyData[this.surveyData.length - 1], 'exhibition', true)
                        setTimeout(() => {
                            this.go(this.surveyData.length - 1)
                        }, 500)
                    } else {
                        // 基础题跳转
                        this.$set(this.surveyData[i - 0 + 1], 'exhibition', true)
                        setTimeout(() => {
                            this.go(i - 0 + 1)
                        }, 500)
                    }
                    // 总题数计算
                    let code = this.userOptions[this.userOptions.length - 1].questionCode
                    this.surveyData.forEach((item, i) => {
                        if(item.questionCode == code) {
                            // 判断有没有请求到测评题，如果没有则总题数为20
                            if(this.surveyData.length > 5) {
                                this.total = Number(this.userOptions.length) + Number(this.surveyData.length) - Number(i) - 2
                            }else {
                                this.total = 20
                            }
                        }
                    })
                    let _bar = this.userOptions.length - 0 + 1
                    if(_bar > this.total) {
                        this.bar = this.total
                    }else {
                        this.bar = _bar
                    }
                })
            },
            edit(i, clas1, clas2) {
                $(clas2).css({ display: 'block' })
                let cls2Height = $(clas2)[0].getBoundingClientRect().height
                $(clas2).css({ display: 'none' })
                let clas1Height = $(clas1)[0].getBoundingClientRect().height
                // 性能优化,数据量大的时候执行动画会出现卡动,故设置宽高,且内容清空,再执行动画
                $(clas1).css({ height: `${clas1Height}px` })
                $(`${clas1} .tras-opacity`).css({ display: 'none' })
                $(clas1).stop().animate({ marginRight: '0px', marginLeft: '0px', height: `${cls2Height}px` }, 300, () => {
                    this.$set(this.surveyData[i], 'show', true)
                    $(clas1).removeAttr("style")
                    $(clas2).css({ 'margin-left': 0, 'margin-right': 0 })
                    $(clas2).height('auto')
                    $(`${clas1} .tras-opacity`).css({ display: 'block' })
                })
            },
        }
    }
</script>
<style lang="scss">
    /* 动画 */
    .editFade-enter-active,
    .editFade-leave-active {
        transition: opacity 1s;
    }
    .editFade-enter,
    .editFade-leave-to {
        opacity: 0;
    }
    .pull-up-enter-active {
        transition: all 0.5s;
    }
    .pull-up-enter,
    .pull-up-leave-active {
        opacity: 0;
        transform: translateY(30px);
    }
    .pull-up-deep-enter-active {
        transition: all 0.5s;
    }
    .pull-up-deep-enter,
    .pull-up-deep-leave-active {
        opacity: 0;
        transform: translateY(1200px);
    }
    .zy-pheight .scroller-indicator {
        position: relative;
    }
    .zy-pweight .scroller-indicator {
        position: relative;
    }
    .zy-pheight .scroller-indicator::after {
        content: "厘米";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 40px;
    }
    .zy-pweight .scroller-indicator::after {
        content: "公斤";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 40px;
    }
    .datetime .dp-item:nth-child(1) .scroller-indicator {
        position: relative;
    }
    .datetime .dp-item:nth-child(2) .scroller-indicator {
        position: relative;
    }
    .datetime .dp-item:nth-child(3) .scroller-indicator {
        position: relative;
    }
    .datetime .dp-item:nth-child(1) .scroller-indicator::after {
        content: "年";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 30px;
    }
    .datetime .dp-item:nth-child(2) .scroller-indicator::after {
        content: "月";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 20px;
    }
    .datetime .dp-item:nth-child(3) .scroller-indicator::after {
        content: "日";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        margin-left: 20px;
    }
</style>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .survey {
        width: 100%;
        min-height: 100%;
        padding: 0 0.75rem;
        box-sizing: border-box;
        @include bg_color1();
        overflow-x: hidden;
        .progress-c {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 2222;
            .count-c {
                width: 100%;
                position: relative;
                .count {
                    position: absolute;
                    right: 0;
                    top: 0;
                    z-index: 2222;
                    width: 4.15rem;
                    height: 1.7rem;
                    @include bg_color6();
                    @include box_shodow1(0 0.3rem 1rem 0);
                    border-radius: 2.5rem 0 0 2.5rem;
                    margin-top: 0.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .count-2 {
                        font-size: 0.7rem;
                        @include font_color4();
                        margin: 0 0.2rem;
                        margin-top: 0.2rem;
                    }
                    .font {
                        width: 0.55rem /* 22/40 */;
                        height: 1.1rem /* 44/40 */;
                    }
                }
            }
        }
        .ctn {
            .jianxi {
                width: 100%;
                height: 3.2rem /* 128/40 */;
            }
            .listToggle {
                position: relative;
                .userPhoto {
                    width: 2.4rem;
                    height: 2.4rem;
                    border-radius: 50%;
                    @include bg_color3();
                    background-size: 100% 100%;
                    @include border(1px solid);
                    box-sizing: border-box;
                    position: absolute;
                    right: -2.9rem /* 116/40 */;
                    top: 0;
                }
                .spack-style {
                    padding-bottom: 1rem;
                    padding: 0.25rem;
                    box-sizing: border-box;
                    @include bg_color6();
                    @include box_shodow1(0 0.3rem 1rem 0);
                    border-radius: 0.2rem;
                    position: relative;
                    .spack-bg {
                        height: 100%;
                        text-align: center;
                        padding: 0.35rem 0.65rem;
                        box-sizing: border-box;
                        background-size: 0.475rem, 0.475rem;
                        .again {
                            width: 15.15rem;
                            height: 2.4rem;
                            @include box_shodow(0 0.3rem 0.75rem 0);
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
                        .againSelect {
                            transition: all 0.3s;
                            @include bg_color8();
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: 14.6275rem 1.9rem;
                        }
                        .gender {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            width: 12.925rem /* 517/40 */;
                            margin: 1.125rem /* 69/40 */ auto;
                            .g1 {
                                width: 5rem /* 200/40 */;
                                height: 5rem /* 200/40 */;
                                box-sizing: border-box;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                img {
                                    width: 4.5rem /* 180/40 */;
                                    height: 4.5rem /* 180/40 */;
                                    border-radius: 50%;
                                }
                            }
                            .check {
                                @include border1(0.15rem solid);
                            }
                        }
                        .multiple {
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            justify-content: center;
                            padding: 0.4rem 0;
                            box-sizing: border-box;
                            position: relative;
                            .item {
                                width: 15.15rem /* 606/40 */;
                                line-height: 1.2rem /* 48/40 */;
                                padding: 0.4rem /* 16/40 */ 1.3rem /* 52/40 */;
                                box-sizing: border-box;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.8rem /* 32/40 */;
                                @include font_color4();
                                transition: all 0.3s;
                                & + .item {
                                    margin-top: 0.5rem /* 20/40 */;
                                }
                                &::before {
                                    transition: all 0.3s;
                                    @include border_color();
                                    border-radius: 0.3rem /* 12/40 */;
                                    box-sizing: border-box;
                                }
                            }
                            .itemCheck {
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
                            .multipleIcon {
                                position: absolute;
                                left: -1.65rem;
                                top: -1.8rem;
                                width: 4.1rem /* 164/40 */;
                                height: 1.7rem /* 68/40 */;
                                @include bg_color();
                                @include box_shodow2(0 0.3rem 0.75rem 0);
                                border-radius: 0 0.85rem 0.85rem 0;
                                font-size: 0.7rem /* 28/40 */;
                                @include font_color6();
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: bold;
                            }
                        }
                        .single {
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            justify-content: center;
                            padding: 0.4rem 0;
                            box-sizing: border-box;
                            .item {
                                width: 15.15rem /* 606/40 */;
                                padding: 0.4rem /* 16/40 */ 1.3rem /* 52/40 */;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.8rem /* 32/40 */;
                                line-height: 1.2rem /* 48/40 */;
                                @include font_color4();
                                transition: all 0.3s;
                                box-sizing: border-box;
                                & + .item {
                                    margin-top: 0.5rem /* 20/40 */;
                                }
                                &::before {
                                    transition: all 0.3s;
                                    @include border_color();
                                    border-radius: 2rem;
                                    box-sizing: border-box;
                                }
                            }
                            .itemCheck {
                                @include font_color6();
                                @include bg_color();
                                transition: all 0.3s;
                                border-radius: 1rem;
                                font-weight: bold;
                            }
                        }
                        .ok {
                            width: 15.15rem;
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
                            margin-top: 0.4rem;
                            margin-bottom: 0.4rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            transition: all 0.3s;
                            font-weight: bold;
                        }
                    }
                }
                .spack-style1 {
                    position: relative;
                    padding-bottom: 1rem;
                    padding: 0.25rem;
                    box-sizing: border-box;
                    @include bg_color();
                    @include box_shodow1(0 0.3rem 1rem 0);
                    border-radius: 0.2rem;
                    .spack-bg {
                        height: 100%;
                        text-align: center;
                        padding: 0.35rem 0.65rem;
                        box-sizing: border-box;
                        background-size: 0.475rem, 0.475rem;
                        .ans-ctn {
                            p {
                                font-size: 0.8rem;
                                @include font_color6();
                                line-height: 1.2rem /* 48/40 */;
                                word-break: break-all;
                                text-align: left;
                            }
                            .fenhao::after {
                                content: "；";
                            }
                            .fenhao:last-child:after {
                                content: "";
                            }
                            .edit {
                                width: 1.8rem;
                                height: 1.8rem;
                                margin-right: 0.35rem;
                                position: absolute;
                                left: -2.15rem;
                                bottom: 0.3rem;
                                @include bg_color6();
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                @include box_shodow1(0 0.3rem 1rem 0);
                                img {
                                    width: 1.25rem /* 50/40 */;
                                    height: 1.25rem /* 50/40 */;
                                    border-radius: 50%;
                                }
                            }
                        }
                    }
                }
            }
            .multiple-top {
                margin-top: 0.8rem /* 32/40 */;
            }
        }
    }
</style>


