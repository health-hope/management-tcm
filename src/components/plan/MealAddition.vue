<template>
<div class="model_container">
    <div class="model_btn_container tap_events" @click="modelChooseFuc">
        <img :src="btnChooseUrl" alt="">
        <span class="model_btn">选择推荐餐次</span>
    </div>
    <div class="meal_add" v-if="showMeal">
        <!-- 加餐弹窗 -->
        <div class="meal_add_container">
            <div class="meal_add_box">
                <div class="meal_add_content">配餐种类</div>
                <div class="meal_add_chosen">
                    <div class="meal_add_blue">早餐</div>
                    <div class="meal_add_blue m_lr">午餐</div>
                    <div class="meal_add_blue">晚餐</div>
                </div>
                <div class="meal_add_option">
                    <div @click="btnChooseFuc(i)" :class="['meal_add_linght tap_events',i==1?'m_lr':'',{'active':item.type}]" v-for="(item,i) in btnSelect" :key="i">{{item.name}}</div>
                </div>
                <div class="tip">*少食多餐更利于健康，建议加餐</div>
                <div class="btn_box">
                    <div class="btn_cancel tap_events" @click="()=>{this.showMeal = false}">取消</div>
                    <div class="btn_confirm tap_events" @click="sure">确定</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import btnChoose from '@/assets/plan/btn_choose.png'
export default {
    data () {
        return {
            btnChooseUrl: btnChoose,
            showMeal: false,
            btnSelect: [{name:'早加餐',type:false,extraMeal:'4'},{name:'午加餐',type:false,extraMeal:'5'},{name:'晚加餐',type:false,extraMeal:'6'}],   // model可选项
            newExtraMealList: []    // 父组件更新btn状态后的值
        }
    },
    props: {
        extraMealList: {
            type:Array
        }
    },
    watch: {
        extraMealList(val) {
            this.newExtraMealList = val
            this.setExtraMeal()
        }
    },
    methods: {
        // model弹出
        modelChooseFuc () {
            this.showMeal = true
            this.setExtraMeal()
        },
        // 选择btn
        btnChooseFuc (i) {
            let name = this.btnSelect[i].name
            let type = this.btnSelect[i].type
            let extraMeal = this.btnSelect[i].extraMeal
            this.$set(this.btnSelect, i, {name,type: !type,extraMeal})
        },
        // 点击确定,传递参数,过滤出额外的加餐
        sure () {
            let newBtnSelect = this.btnSelect.filter((item)=>{return item.type})
            let params = []
            newBtnSelect.forEach(item => {
                params.push(item.extraMeal)
            })
            this.$emit('modelParams',params)
            this.showMeal = false
        },
        // 更改加餐btn状态
        setExtraMeal () {
            this.btnSelect.forEach(item => {
                item.type = false
            })
            if(this.newExtraMealList.length) {
                let extraMealArray = this.newExtraMealList
                if(extraMealArray.length) {
                    extraMealArray.forEach((item) => {
                        if(item >= 4) {
                            this.btnSelect[item-4].type = true
                        }
                    })
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.model_container {
    margin: 0 .7rem 1.5rem .7rem;
    .model_btn_container {
        width: 100%;
        height: 2rem;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 .1rem .3rem 0 rgba(138,169,173,0.06);
        border-radius: .3rem;
        img {
            width: .8rem;
            height: .75rem;
            margin-right: .45rem;
        }
        .model_btn {
            font-family: PingFangSC-Medium;
            font-size: .7rem;
            color: #606060;
            letter-spacing: 0;
            text-align: center;
        }
    }
    .meal_add {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .meal_add_container {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);

            .meal_add_box {
                width: 17.55rem;
                height: 12.525rem;
                background: #FFFFFF;
                border: .025rem solid #F2F2F2;
                box-shadow: 0 .2rem .8rem 0 rgba(0, 0, 0, 0.05);
                border-radius: .3rem;
                margin: auto;
                transform: translateY(70%);

                .meal_add_content {
                    font-size: .7rem;
                    color: #252525;
                    margin: 1.4rem 0 .8rem .8rem;
                    font-weight: 600;
                }

                .meal_add_chosen {
                    width: 100%;
                    display: block;
                    display: flex;
                    justify-content: center;

                    .meal_add_blue {
                        width: 4.9rem;
                        height: 1.4rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #4566EA;
                        border-radius: 1.25rem;
                        font-size: .7rem;
                        color: #FFFFFF;
                        text-align: center;
                    }

                    .m_lr {
                        margin: 0 .6rem;
                    }
                }

                //任意选项加餐
                .meal_add_option {
                    width: 100%;
                    display: block;
                    display: flex;
                    justify-content: center;
                    margin-top: .6rem;

                    .meal_add_linght {
                        width: 4.9rem;
                        height: 1.4rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: rgba(69, 102, 234, 0.10);
                        border-radius: 1.25rem;
                        font-size: .7rem;
                        color: #4566EA;
                        text-align: center;
                        &.active {
                            background-color: #4566EA;
                            color: #fff;
                        }
                    }

                    .m_lr {
                        margin: 0 .6rem;
                    }
                }

                .tip {
                    font-size: .6rem;
                    color: #606060;
                    text-align: right;
                    margin: .6rem .8rem 0 0;
                }
                // 取消和确定按钮
                .btn_box{
                    width: 100%;
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    margin-top: 1.4rem;
                    .btn_cancel{
                        width: 6rem;
                        height: 1.7rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #F7F7F7;
                        border-radius: .85rem;
                        font-family: PingFangSC-Medium;
                        font-size: .8rem;
                        color: #8F8F8F;
                        text-align: center;
                        margin-right: 2.55rem;
                    }
                    .btn_confirm{
                        width: 6rem;
                        height: 1.7rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #406BDD;
                        border-radius: .85rem;
                        font-size: .8rem;
                        color: #FFFFFF;
                        text-align: center;
                    }
                }

            }

        }
    }
}

</style>
