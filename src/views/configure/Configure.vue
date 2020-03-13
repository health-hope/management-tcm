<template>
    <div class="configure">
        <!-- {{tasteListData}} -->
        <!-- 心系证候类型 -->
        <div class="type">
            <BaseZyTempTitle bgClass="jgy_bg_5" :tempTitle="tit+'系证候类型'"/>
            <div class="ctn">
                <LayBg/>
                <Cell
                    class="tap_events"
                    @click.native="foodMatch('4')"
                    :leftVal="'类型'"
                    :rightVal="rightValType" 
                />
            </div>
        </div>

        <!-- 饮食偏好 -->
        <div class="type">
            <BaseZyTempTitle bgClass="jgy_bg_1" :tempTitle="'饮食偏好信息'"/>
            <div class="ctn">
                <LayBg/>
                <Cell
                    class="tap_events"
                    @click.native="foodMatch('1')"
                    :leftVal="'口味'"
                    :leftSubVal="'(选填)'"
                    :rightVal="rightValTaste"
                />
                <Cell
                    class="tap_events"
                    @click.native="foodMatch('2')"
                    :leftVal="'地区'"
                    :leftSubVal="'(选填)'"
                    :rightVal="rightValAddr"
                />
                <Cell
                    class="tap_events"
                    @click.native="foodMatch('3')"
                    :leftVal="'餐次'"
                    :rightVal="rightValExtraMeal"
                />
            </div>
        </div>
        <!-- 特色调理偏好 -->
        <div class="type">
            <BaseZyTempTitle bgClass="jgy_bg_2" :tempTitle="'特色调理偏好'"/>
            <div class="ctn">
                <LayBg/>
                <Cell
                    class="tap_events"
                    @click.native="cellClick('3')"
                    :leftVal="'每周调理日'"
                    :rightVal="rightValNurseDate"
                />
                <Cell
                    class="tap_events"
                    @click.native="cellClick('4')"
                    :leftVal="'调理方法'"
                    :rightVal="rightValNurseMethod"
                />
            </div>
        </div>
        <!-- 请选择运动方式 -->
        <div class="type">
            <BaseZyTempTitle bgClass="jgy_bg_3" :tempTitle="'请选择运动方式'"/>
            <div class="ctn">
                <LayBg/>
                <div class="sport">
                    <div
                        @click="sportClick(item.sportWayCode, i)"
                        :class="item.check?'sp sport-select tap_events':'sp tap_events'"
                        v-for="(item, i) in sportWayList"
                        :key="`sport${i}`"
                    >
                        <div class="img">
                            <div :class="item.check?'img-c':''">
                                <img class="imgtype" :src="item.imageUrl">
                                <img
                                    v-show="item.check"
                                    class="icon"
                                    :src="'img_selected.png' | PUBLIC_PATH"
                                >
                            </div>
                        </div>
                        <div class="tips">{{ item.desc }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 饮食偏好类型dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showTypeTaste" class="dialog1">
                <div class="single-c">
                    <LayBg/>
                    <Single class="tap_events" :single="resultTypeList" @itemClick="typeItemClick"/>
                </div>
            </x-dialog>
        </div>

        <!-- 饮食偏好类型dialog -->
        <div v-transfer-dom>
           
            <x-dialog :hide-on-blur="true" v-model="showToastTaste" class="dialog1">
                <div class="single-c">
                    <LayBg/>
                    <Single class="tap_events" :single="tasteListData" @itemClick="tasteItemClick"/>
                </div>
            </x-dialog>
        </div>
         <!-- 饮食偏好地区选择dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToastAddr" class="dialog1">
                <div class="single-c">
                    <LayBg/>
                    <picker
                        :data="totalCity"
                        :fixed-columns="2"
                        :columns="3"
                        v-model="selectCity"
                    ></picker>
                    <div
                        class="btn111 tap_events"
                        :style="{backgroundImage: 'url(btn_bg_Evaluation_yellow_activation.png)'} | PUBLIC_PATH"
                        @click="saveAddr"
                    >确定</div>
                </div>
            </x-dialog>
        </div>
         <!-- 饮食餐次dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToastExtraMeal" class="dialog4">
                <div class="multiple-c">
                    <LayBg/>
                    <MultipleMeal
                        @multipleClick="extraMealItemClick"
                        @multipleSure="extraMealSure"
                        :multiple="extraMealList"
                    />
                    <div class="multipleIcon" style="width: 3.4rem">多选</div>
                </div>
            </x-dialog>
        </div>
        <!-- 调理日dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToast3" class="dialog3">
                <div class="multiple-c">
                    <LayBg/>
                    <Multiple
                        @multipleClick="multipleClick"
                        @multipleSure="multipleSure"
                        :multiple="multiple"
                    />
                    <div class="multipleIcon">至少选择5天</div>
                </div>
            </x-dialog>
        </div>
        <!-- 调理方法dialog -->
        <div v-transfer-dom>
            <x-dialog :hide-on-blur="true" v-model="showToast4" class="dialog4">
                <div class="multiple-c">
                    <LayBg/>
                    <Multiple
                        types="method"
                        @multipleClick1="multipleClick1"
                        @multipleSure1="multipleSure1"
                        :multiple="nurseListData"
                    />
                    <div class="multipleIcon" style="width: 3.4rem">多选</div>
                </div>
            </x-dialog>
        </div>
        <!-- 保存按钮 -->
        <div 
            @click="saveClick"
            :class="saveFlag?'save tap_events':'save saveSelect tap_events'"
            :style="{backgroundImage: saveFlag?'url(btn_bg_condition_yellow_program.png)':'url(btn_bg_condition_yellow_program_enabled.png)'} | PUBLIC_PATH">
            下一步
        </div>
    </div>
</template>
<script>
    import { getUrlParam } from '@/assets/js/util.js'
    import { mapState,mapMutations } from 'vuex'
    import LayBg from '@/components/common/LayBg';
    import BaseZyTempTitle from '@/components/common/BaseZyTempTitle';
    import Cell from '@/components/common/Cell';
    import Single from '@/components/common/SingleElection.vue'
    import Multiple from '@/components/common/MultipleSelection.vue'
    import MultipleMeal from '@/components/common/MultipleMealSelection.vue'
    import { TransferDomDirective as TransferDom, XDialog, DatetimeView, Picker } from 'vux'
    import { apiConfig, apiSaveConfig } from '@/service/api/home'
    import { truncate } from 'fs';
    import {init_city_picker} from "@/assets/js/data.city.js";
    export default {
        data() {
            return {
                tit:"",
                resultTypeList: [], //l类型列表
                showToast1: false,
                showToast2: false,
                showToast3: false,
                showToast4: false,
                showTypeTaste:false,
                showToastTaste: false,
                showToastAddr: false,
                showToastExtraMeal:false,
                configData: {},
                resultCode: '',
                format: 'YYYY-MM-DD',
                datetime: '',
                startDate: '',
                endDate: '',
                multiple: [{ name: "周一", id: "1" }, { name: "周二", id: "2" }, { name: "周三", id: "3" }, { name: "周四", id: "4" }, { name: "周五", id: "5" }, { name: "周六", id: "6" }, { name: "周日", id: "7" }],
                nurseListData: [{ name: "按摩", id: "1" }, { name: "手反射区疗法", id: "2" }, { name: "艾灸", id: "3" }, { name: "拔罐", id: "4" }, { name: "刮痧", id: "5" }],
                nurseList: [],
                weekPlanDate: [],
                tasteListData:[{name:"清淡",id:"1"},{name:"甜",id:"2"},{name:"辣",id:"3"},{name:"咸",id:"4"},{name:"不挑食，都可以",id:"5"}],
                extraMealList:[{name:"早餐",id:"1",check:true},{name:"午餐",id:"2",check:true},{name:"晚餐",id:"3",check:true},{name:"早加",id:"4"},{name:"午加",id:"5"},{name:"晚加",id:"6"}],
                selectTasteCode:'',
                selectMealExtraList:[],
                selectCity:[],
                totalCity:[],
                rightValExtraMeal:'早餐、午餐、晚餐',
                rightValAddr:'请选择',
                rightValMeal:'请选择',
                rightValTaste:'请选择',
                rightValType: '请选择',
                rightValNurseDate: '请选择',
                rightValNurseMethod: '请选择',
                sportWayList:[{desc:"中医心系运动计划【中方】",imageUrl:"https://files.jiankangyouyi.com/images/2/3279363a909b412faf6ad2e123545325.png?hash=Fm5n61hap3L_ObVu_3vz77exymfF&width=272&height=150&fsize=25774&scope=1",sportWayCode:"1"},{desc:"中医心系运动计划【西方】",imageUrl:"https://files.jiankangyouyi.com/images/2/7cc4f6d86f374d4a8d008d6c508d9090.png?hash=FtcWyeyULQQ5hS_0iegMpA79k2cp&width=272&height=150&fsize=40886&scope=1",sportWayCode:"2"}],
                selectSportWayCode: '',
                resultCodeFlag: false
            }
        },
        components: {
            LayBg,
            BaseZyTempTitle,
            Cell,
            XDialog,
            Single,
            DatetimeView,
            Picker,
            Multiple,
            MultipleMeal
        },
        directives: {
            TransferDom
        },
        watch: {
            resultCode(val) {
                if(val!=="" && this.resultCodeFlag) {
                    this.nurseListData = [{ name: "按摩", id: "1", check: false }, { name: "手反射区疗法", id: "2", check: false }, { name: "艾灸", id: "3", check: false }, { name: "拔罐", id: "4", check: false }, { name: "刮痧", id: "5", check: false }]
                    this.rightVal4 = "请选择"
                    let arr = []
                    this.configData.evaluationResList.map((item, i)=>{
                        if(item.code == val) {
                            this.nurseListData.forEach(ls => {
                                item.methods.forEach(meth => {
                                    if(meth == ls.id) {
                                        arr.push(ls)
                                    }
                                })
                            })
                        }
                    })
                    this.nurseListData = arr
                    this.nurseListData.forEach((item, i) => {
                        this.$set(this.nurseListData[i], 'check', false)
                    })
                }
            }
        },
        computed: {
            ...mapState(['code', 'userInfo']),
            saveFlag() {
                let val = '请选择'
                if( this.rightValExtraMeal.indexOf(val) < 0&& this.rightValNurseDate.indexOf(val) < 0&& this.rightValNurseMethod.indexOf(val) < 0&&this.selectSportWayCode.length>0){
                    return true
                }else {
                    return false
                }
            }
        },
        created() {
            let code = getUrlParam('code');
            switch (code) {
                case "1":
                    this.tit="心"
                    break;
                case "2":
                    this.tit="肝"
                    break;
                case "3":
                    this.tit="肺"
                    break;
                case "4":
                    this.tit="脾"
                    break;
                case "5":
                    this.tit="胃"
                    break;
                case "6":
                    this.tit="肾"
                    break;
                case "7":
                    this.tit="小肠"
                    break;
                case "8":
                    this.tit="大肠"
                    break;
                case "9":
                    this.tit="胆"
                    break;
            }
            this.getConfig()
        },
        methods:{        
            ...mapMutations('configure', ['setzyQuesOptions', 'setxyQuesOptions','setSportWayCode','setNurseList','setWeekPlanDate','setDietRecommend']),
           
            // 请求配置信息
            async getConfig() {
                const data = await apiConfig(this.code, this.userInfo.userId)
                // 设置选择时间范围
                // this.startDate = `${data.minDate.substr(0,4)}-${data.minDate.substr(4,2)}-${data.minDate.substr(6,2)}`
                // this.endDate = `${data.maxDate.substr(0,4)}-${data.maxDate.substr(4,2)}-${data.maxDate.substr(6,2)}`
                this.resultTypeList = data.evaluationResList.map(item=>{
                   return  {
                        'name' : item.name,
                        'id':item.code
                    }
                })
                this.resultCode = data.resultCode;
                window.sessionStorage.setItem("resultCode",data.resultCode)
                // alert(this.$store.state.resultCode)
                if(this.resultCode) {
                    // 回显类型
                    data.evaluationResList.forEach((item ,key)=> {
                        if(item.code==data.resultCode){
                            this.rightValType = item.name;
                            this.resultTypeList.map((item, i) => {
                                if (i == key) {
                                    this.$set(this.resultTypeList[i], 'check', true)
                                    this.rightValType = item.name
                                    this.selectTasteCode = item.id
                                } else {
                                    this.$set(this.resultTypeList[i], 'check', false)
                                }
                            })
                        }

                    });
                    // if(this.resultCode == "0") {
                    //     data.evaluationResList[6].check = true
                    //     this.rightValType = data.evaluationResList[6].name
                    // }else {
                    //     data.evaluationResList[this.resultCode - 1].check = true
                    //     this.rightValType = data.evaluationResList[this.resultCode - 1].name
                    // }
                    // let arrNew = []
                    // // 筛选调理方法的数组
                    // data.evaluationResList.forEach((item, i) => {
                    //     if(item.code == this.resultCode) {
                    //         item.methods.forEach((item1) => {
                    //             this.nurseListData.forEach((item2) => {
                    //                 if(item1 == item2.id) {
                    //                     arrNew.push(item2)
                    //                 }
                    //             })
                    //         })
                    //     }
                    // })
                    // this.nurseListData = arrNew
                }
                this.sportWayList= data.sportWayList
                this.configData = data
                this.$nextTick(() => {
                    this.resultCodeFlag = true
                })
            },
            //配餐条件选择
            foodMatch(val){
                if(val == 1){
                    //配餐口味
                    this.showToastTaste = true
                }else if(val==2){
                    this.showToastAddr = true
                    //配餐地区
                    let city = [];
                    init_city_picker.forEach(item => {
                        city.push({
                            name: item.text,
                            value: item.text,
                            parent: 0
                        });
                        item.children.forEach(e => {
                            city.push({
                                name: e.text,
                                value: e.text,
                                parent: item.text
                            });
                        });
                    });
                    this.totalCity = city;
                }else if(val==3){
                    //餐次
                    this.showToastExtraMeal=true
                }else if(val==4){
                    //餐次
                    this.showTypeTaste=true
                }
            },
            // 开始日期选择
            cellClick(val) {
                if (val == 3) {
                    // 每周调理日回显示
                    this.multiple = [{ name: "周一", id: "1" }, { name: "周二", id: "2" }, { name: "周三", id: "3" }, { name: "周四", id: "4" }, { name: "周五", id: "5" }, { name: "周六", id: "6" }, { name: "周日", id: "7" }]
                    if (this.weekPlanDate.length) {
                        this.multiple.forEach((item, i) => {
                            this.weekPlanDate.forEach(ele => {
                                if (item.id == ele) {
                                    this.$set(this.multiple[i], 'check', true)
                                }
                            })
                        })
                    }else if(this.configData.weekPlanDate && this.configData.weekPlanDate.length) {
                        this.multiple.forEach((item, i) => {
                            this.configData.weekPlanDate.forEach(date => {
                                if(date == item.id) {
                                    this.$set(this.multiple[i], 'check', true)
                                }
                            })
                        })
                    }
                }else if (val == 4) {
                    //调理方法
                    this.nurseListData.forEach((item, i) => {
                        this.$set(this.nurseListData[i], 'check', false)
                    })
                    if (this.nurseList.length && this.rightValNurseMethod != "请选择") {
                        this.nurseListData.forEach((item, i) => {
                            this.nurseList.forEach(ele => {
                                if (item.id == ele) {
                                    this.$set(this.nurseListData[i], 'check', true)
                                }
                            })
                        })
                    }else if(this.configData.nurseList && this.configData.nurseList.length && this.rightValNurseMethod != "请选择") {
                        this.nurseListData.forEach((item, i)=>{
                            this.configData.nurseList.forEach(list=>{
                                if(list == item.id) {
                                    this.$set(this.nurseListData[i], 'check', true)
                                }
                            })
                        })
                    }
                }
                this[`showToast${val}`] = true;
            },
            // 配餐口味列表点击
            tasteItemClick(index) {
                this.tasteListData.map((item, i) => {
                    if (i == index) {
                        this.$set(this.tasteListData[i], 'check', true)
                        this.rightValTaste = item.name
                        this.selectTasteCode = item.id
                    } else {
                        this.$set(this.tasteListData[i], 'check', false)
                    }
                })
                this.showToastTaste = false
            },
            // 类型列表点击
            typeItemClick(index) {
                window.sessionStorage.setItem("resultCode",index)
                this.resultTypeList.map((item, i) => {
                    if (i == index) {
                        this.$set(this.resultTypeList[i], 'check', true)
                        this.rightValType = item.name
                        this.selectTasteCode = item.id
                    } else {
                        this.$set(this.resultTypeList[i], 'check', false)
                    }
                })
                this.showTypeTaste = false
            },
            // 多选点击
            multipleClick(index) {
                this.$set(this.multiple[index], 'check', !this.multiple[index].check)
            },
            multipleClick1(index) {
                this.$set(this.nurseListData[index], 'check', !this.nurseListData[index].check)
            },
            // 调理日列表多选点击确定
            multipleSure(val, arr) {
                this.rightValNurseDate = val
                this.showToast3 = false
                this.weekPlanDate = arr
            },
            //调理方法列表点击
            multipleSure1(val, arr) {
                this.rightValNurseMethod = val
                this.showToast4 = false
                this.nurseList = arr
            },
            //配餐餐次item点击
            extraMealItemClick(index){
                  this.$set(this.extraMealList[index], 'check', !this.extraMealList[index].check)
            },
            //保存配餐餐次
            extraMealSure(val,arr){
                this.rightValExtraMeal=val
                this.showToastExtraMeal=false
                this.selectMealExtraList = arr
            },
            //保存配餐地区
            saveAddr(){
                this.rightValAddr = this.selectCity[0]+this.selectCity[1]
                this.showToastAddr = false
            },
            // 选择运动方式
            sportClick(val1, val2) {
                this.sportWayList.map((item, i) => {
                    if (val2 == i) {
                        if (this.sportWayList[i].check) {
                            this.$set(this.sportWayList[i], 'check', false)
                            this.selectSportWayCode = ""
                        } else {
                            this.$set(this.sportWayList[i], 'check', true)
                            this.selectSportWayCode = val1
                        }
                    } else {
                        this.$set(this.sportWayList[i], 'check', false)
                    }
                })
            },
            // 下一步
            saveClick() {
                if(this.saveFlag) {
                    const dietRecommend = {
                        "taste":this.selectTasteCode,
                        "extraMealList":this.selectMealExtraList,
                        "province":this.selectCity[0],
                        "city":this.selectCity[1]
                    }
                    console.log(dietRecommend)
                    this.setNurseList(this.nurseList)
                    this.setDietRecommend(dietRecommend)
                    this.setWeekPlanDate(this.weekPlanDate)
                    this.setSportWayCode(this.selectSportWayCode)
                    this.$router.push('/risk')               
                }
            }
        }
        
    }
</script>
<style lang="scss">
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
    .configure {
        width: 100%;
        min-height: 100%;
        padding: 0.8rem /* 32/40 */ 0.75rem /* 30/40 */ 4.6rem /* 40/40 */;
        box-sizing: border-box;
        @include bg_color1();
        .type {
            @include bg_color6();
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            & + .type {
                margin-top: 0.8rem /* 32/40 */;
            }
            .ctn {
                position: relative;
                padding: 1.3rem /* 52/40 */ 1.05rem /* 42/40 */;
                box-sizing: border-box;
                .sport {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .sp {
                        .img {
                            height: 4.2rem /* 168/40 */;
                            box-sizing: border-box;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            @include border2(0.025rem /* 1/40 */ solid);
                            font-size: 0;
                            .imgtype {
                                width: 7.05rem /* 282/40 */;
                                height: 3.9rem /* 156/40 */;
                                font-size: 0;
                                border: 0;
                            }
                        }
                        .tips {
                            font-size: 0.75rem /* 30/40 */;
                            line-height: 1.05rem /* 42/40 */;
                            margin-top: 0.5rem /* 20/40 */;
                            color: #999999;
                        }
                        & + .sp {
                            margin-left: 0.45rem /* 18/40 */;
                        }
                    }
                    .sport-select {
                        .img {
                            @include border1(0.075rem /* 3/40 */ solid);
                            .img-c {
                                position: relative;
                                .icon {
                                    width: 1.25rem /* 50/40 */;
                                    height: 1.25rem /* 50/40 */;
                                    position: absolute;
                                    right: 0;
                                    top: 0;
                                }
                            }
                        }
                        .tips {
                            color: #333333;
                            transition: all 0.3s;
                        }
                    }
                }
            }
        }
    }
    .dialog1,
    .dialog2,
    .dialog3,
    .dialog4 {
        /deep/ .weui-dialog {
            width: 17.25rem /* 690/40 */;
            max-width: 100%;
            border-radius: 0.2rem /* 8/40 */;
            overflow: auto;
        }
        .single-c,
        .dataTime-c,
        .multiple-c {
            padding: 1rem /* 40/40 */ 1.05rem /* 42/40 */;
            box-sizing: border-box;
            position: relative;
            .multipleIcon {
                position: absolute;
                left: -0.75rem /* 30/40 */;
                top: -1.2rem /* 48/40 */;
                width: 5.925rem /* 237/40 */;
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
                z-index: 99999999;
            }
        }
    }
    .save {
        width: 10.25rem /* 410/40 */;
        height: 2.5rem /* 100/40 */;
        @include bg_color();
        @include box_shodow(0 .3rem /* 12/40 */ .75rem /* 30/40 */ 0);
        border-radius: 1.25rem /* 50/40 */;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        // bottom: 1rem /* 40/40 */;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 9.7275rem /* 389.1/40 */ 2rem /* 80/40 */;
        margin-top:1.1rem;
    }
    .saveSelect {
        transition: all 0.3s;
        @include bg_color8();
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 9.7275rem /* 389.1/40 */  2rem;
    }
    .btn111 {
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
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        font-weight: bold;
    }
</style>

