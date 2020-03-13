<template>
<div class="hj-main wj">
    <div class="hj-ruler">
        <swiper :options="swiperOptions" v-if="swiperOptions.virtual">
            <!-- <swiper-slide v-for="(val,idx) in virtualData.slides" :key="idx"></swiper-slide> -->
          
        </swiper>
          <div class="online"></div>
        <!-- <div class="swiper-container p_r" ref="swiperContainer">
            <div class="swiper-wrapper">
            </div>

        </div>         -->
        <div class="select_num_box flex_c just_c">{{selectValue}}</div>
    </div>
    <slot />
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import {
    swiper
} from 'vue-awesome-swiper';
import {
    isTenMutiple,
    getSLen,
    // isEmpty,
} from '@/assets/js/util.js';

export default {
    props: {
        /**
         * 相邻格子数值
         */
        step: {
            type: Number,
            default: 1
        },
        unitValue: {
            type: Number,
            default: 1
        },
        rulerType: {
            type: Number,
            default () {
                const str = String(this.step);
                return str[str.length - 1] === '5' ? 1 : 2;
            }
        },
        max: {
            type: Number,
            default () {
                return this.rulerType === 1 ? 100 : 1000
            }
        },
        isActive: null
    },
    data() {
        return {
            hasSwiperInit: false, //swiper是否初始化过了
            unit: '', //选中基础单位
            totalHeat: 0, //总热量
            selectValue: 0, //当前选中的值
            swiperOptions: {
                
            },
            slides: [

            ],
            virtualData: {
                slides: []
            }
        };
    },
    mounted() {

        this.$nextTick(() => {

        });
    },
    components: {
        swiper
    },
    computed: {
        slidesPerView() {
            return this.step === 0.5 ? 8 : 40;
        },
        /**
         * 错位纠正
         */
        initialSlide() {
            const {
                // step,
                unitValue,
                // max,
            } = this;
            return this.rulerType === 1 ? (unitValue) * 2 - 1 : unitValue - 1;
        },

    },
    watch: {
        isActive: {
            immediate: true,
            handler(n) {
                if (n && !this.hasSwiperInit) { //页面展现并且没有初始化过swiper
                    this.$nextTick(() => {
                        this._initSwiper(this._initRangs());
                    })
                }
            }
        }
    },
    methods: {
        /**
         * 初始化尺子
         */
        _initSwiper(rangs) {
            this.slides = new Array(rangs.length).fill(null);
       
            const {
                slidesPerView,
                initialSlide,
                rulerType,
            } = this;
            const _this = this;
            this.hasSwiperInit = true;
            this.swiperOptions = {
                slidesPerView,
                initialSlide,
                observer: true,
                observeParents: true,
                spaceBetween: 0,
                virtual: {
                    slides: (() => {
                        const slides=[];
                        for (let i = 0; i < rangs.length; i++) {
                            const val = rangs[i];
                          
                            const str = `
                             <div class="${rulerType===1 ? 'ruler-single' : 'ruler-mutil'}">
                                    <div class="num" style="${rulerType===2 ? 'left:'+'-'+(val.left || 0)+'rem':''}">
                                        ${val.status ? '<span v-show="item.status">'+val.value+'</span>' :''}
                                    </div>
                                    <div class="line">
                                    <div class="${val.status ? 'fine-line':'crude-line'}"></div>
                                    </div>
                                </div>
                            `
                            slides.push(str)
                        }
                        return slides
                    })(),
                    catch: false, //关闭缓存
                    addSlidesBefore: 10,
                    addSlidesAfter: 10,
                },
                on: {
                    init: function () {
                        //抛出异常防止滑动条滑动到最后出错 
                        //暂时不知道为啥出错  但是在这里抛出异常就不会出错了

                        let index;
                        if (rulerType === 2) {
                            index = this.activeIndex + 20;
                        } else {
                            index = this.activeIndex + 4;
                        }

                        if (rangs[index].value === "") return;
                        _this.selectValue = rangs[index].value;

                        _this.$emit("change", {
                            value: _this.selectValue,
                            slider: this.activeIndex
                        });

                        // throw Error("cs")
                        // this.virtual.update();
                        // //在初始化时触发一次transitionEnd事件
                        // this.emit('transitionEnd');
                    },
                    slideChange: function () {
                        let index;
                        if (rulerType === 2) {
                            index = this.activeIndex + 20;
                        } else {
                            index = this.activeIndex + 4;
                        }
                        if (rangs[index].value === "") return;
                        _this.selectValue = rangs[index].value;

                        _this.$emit("change", {
                            value: _this.selectValue,
                            slider: this.activeIndex
                        });
                    }
                }
            }
            /* eslint-disable */
            return
            try {
                swiper = new Swiper(this.$refs.swiperContainer, {
                    slidesPerView,
                    initialSlide,
                    observer: true,
                    observeParents: true,
                    spaceBetween: 0,
                    virtual: {
                        slides: new Array(rangs.length).fill(null),
                        catch: false, //关闭缓存
                        addSlidesBefore: 10,
                        addSlidesAfter: 10,
                        renderSlide: (item, idx) => {
                            const val = rangs[idx];
                            const str = `
                            <div class="swiper-slide">
                                <div class="${rulerType===1 ? 'ruler-single' : 'ruler-mutil'}">
                                    <div class="num" style="${rulerType===2 ? 'left:'+'-'+(val.left || 0)+'rem':''}">
                                        ${val.status ? '<span v-show="item.status">'+val.value+'</span>' :''}
                                    </div>
                                    <div class="line">
                                    <div class="${val.status ? 'fine-line':'crude-line'}"></div>
                                    </div>
                                </div>
                            </div>
                            `
                            return str
                        },

                    },
                    on: {
                        init: function () {
                            //抛出异常防止滑动条滑动到最后出错 
                            //暂时不知道为啥出错  但是在这里抛出异常就不会出错了

                            let index;
                            if (rulerType === 2) {
                                index = this.activeIndex + 20;
                            } else {
                                index = this.activeIndex + 4;
                            }

                            if (rangs[index].value === "") return;
                            _this.selectValue = rangs[index].value;

                            _this.$emit("change", {
                                value: _this.selectValue,
                                slider: this.activeIndex
                            });

                            throw Error("cs")
                            // this.virtual.update();
                            // //在初始化时触发一次transitionEnd事件
                            // this.emit('transitionEnd');
                        },
                        slideChange: function () {
                            let index;
                            if (rulerType === 2) {
                                index = this.activeIndex + 20;
                            } else {
                                index = this.activeIndex + 4;
                            }
                            if (rangs[index].value === "") return;
                            _this.selectValue = rangs[index].value;

                            _this.$emit("change", {
                                value: _this.selectValue,
                                slider: this.activeIndex
                            });
                        }
                    }
                });
                swiper.virtual.update();
            }catch(err) {
                console.log(err)
            }
        },
        /**
         * 初始化数据
         */
        _initRangs() {
            const {
                rulerType,
                step,
                max
            } = this;
            let range = [];
            
            const count = parseInt(max / step);

            if (rulerType === 1) { //大格子
                const reg = /^[0-9]+$/;
                const side = [{
                    "value": "",
                    "status": false
                }, {
                    "value": "",
                    "status": true
                }, {
                    "value": "",
                    "status": false
                }];
                for (let i = 0, j = 0; i <= count; i++, j += step) {
                    range.push({
                        "value": j,
                        "status": reg.test(j)
                    })
                }
                return side.concat(range).concat(side);
            } else { //小格子
                const side = new Array(19).fill({
                    value: "",
                    status: false
                })
                for (let i = 0, j = 0; i <= count; i++, j += step) {
                    let length = getSLen(j);
                    range.push({
                        "value": j,
                        "status": isTenMutiple(j), //如果step是0.1的话会出问题 后面再说
                        "left": length / 5
                    });
                }
                return side.concat(range).concat(side);

            }
        },
        /**
         * 选择单位
         */
        // selectUnit(unit) {
        //     //销毁swiper对象
        //     swiper.destroy();
        //     this.unit = unit;
        //     this.rangs = this._initRangs();
        //     this.$nextTick(function () {
        //         this._initSwiper();
        //     })
        // },
    }
};
</script>

<style lang="scss">
@import "@/assets/style/mixin.scss";
.hj-main {
    position: relative;
}

.hj-ruler {
    position: relative;
    background: #f7f7f7;
    padding-top: 1.25rem;

    .swiper-container {
        height: 3rem;

        .swiper-slide {
            height: 100%;

            .ruler-single {
                width: 100%;
                height: 2.5rem;

                margin-top: 0.25rem;
                display: flex;
                flex-direction: column;

                .num {
                    height: 1.25rem;
                    position: relative;

                    span {
                        position: absolute;
                        bottom: 0;
                        left: -1.17rem;
                        width: 100%;
                        height: 1rem;
                        line-height: 1rem;
                        text-align: center;
                        font-size: 0.65rem;
                        color: #999999;
                    }
                }

                .line {
                    border-top: 1px solid #dddddd;
                    height: 1rem;

                    .crude-line {
                        height: 0.5775rem;
                        border-right: 1px solid #dddddd;
                    }

                    .fine-line {
                        height: 0.8825rem;
                        border-right: 1px solid #dddddd;
                    }
                }
            }

            .ruler-mutil {
                width: 100%;
                height: 2.5rem;

                margin-top: 0.25rem;
                display: flex;
                flex-direction: column;
                position: relative;

                .num {
                    height: 1.25rem;
                    width: 2.5rem;
                    position: absolute;
                    top: 0;
                    // left: -0.25rem;
                    z-index: 999999999999;

                    span {
                        width: 100%;
                        height: 1rem;
                        line-height: 1rem;
                        font-size: 0.75rem;
                        text-align: center;
                        color: #b9b9b9;
                    }
                }

                .line {
                    border-top: 1px solid #dddddd;
                    height: 1rem;
                    margin-top: 1.25rem;

                    .crude-line {
                        height: 0.625rem;
                        border-left: 1px solid #dddddd;
                    }

                    .fine-line {
                        height: 1.25rem;
                        border-left: 1px solid #dddddd;
                    }
                }
            }
        }
    }

    .online {
        position: absolute;
        top: 2.8rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 0.15rem;
        height: 1.25rem;
        @include bg_color();
        border-radius: 0 0 0.1rem 0.1rem;
        z-index: 999999;
    }

    .select_num_box {
        height: 2.8rem;
        padding-top: 0.1;
        padding-bottom: 0.1rem;
        font-size: 2rem;
        color: #333333;
    }
}

.hj-extensions {
    ul {
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;

        li {
            width: 2.5rem;
            height: 100%;
            font-size: 0.8rem;
            color: #666;
        }

        .isActive {
            color: #ec9503;
        }
    }
}
</style>
