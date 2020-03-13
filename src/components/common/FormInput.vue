<template>
<div class="formInpt ">
    <div class="full p_r">
        <input class="inpt"  v-if="clearable" :maxlength="maxlength"  :ref="name"  :placeholder="placeholder" :value="value"  :type="type"  @focus="selfFocus(true)"  @blur="selfFocus(false)" @input="updateValue($event.target.value)"  />
        <input class="inpt"  v-else-if="!clearable"   @focus="selfFocus($event,true)"  @blur="selfFocus($event,false)" :ref="name"  :maxlength="maxlength"  :placeholder="placeholder" :type="type" :value="_value" @input="updateValue($event.target.value)"  />

    </div>
    </div>
</template>

<script>
var preVal = "";
export default {
    data() {
        return {
            focus: false
        };
    },
    computed: {
        _value() {
            return this.value;
        }
    },
    props: {
        /* eslint-disable */
        type: {
            default: "text"
        },
        value: "",
        clearable: {
            type: Boolean,
            default: false
        },
        placeholder: "",
        maxlength: {
            default: 1000
        },
        name: ""
    },
    created() {},
    mounted() {
        if (this.type == "number") {
            //number类型的input框无法用maxlength属性限制
            const dom = this.$refs[this.name];
            dom.addEventListener("keydown", e => {
                if (e.target.value > Number(this.maxlength)) {
                    e.target.value = e.target.value.splice(0, e.target.value.length);
                }
                preVal = e.target.value;
            });
            dom.addEventListener("keyup", e => {
                if (e.target.value > Number(this.maxlength)) {
                    e.target.value = preVal;
                }
                this.$emit("input", e.target.value);
            });
        }
    },
    methods: {
        clearInpt() {
            this.$emit("input", "");
        },
      
        selfFocus(e,flag) {
            this.focus = flag;
            if (flag) {
                this.$emit("focus",e);
            } else {
                this.$emit("blur",e);
            }
        },
        updateValue(e) {
            //text属性的input用此方法提交父组件信息

            if (this.type == "text") {
                this.$emit("input", e);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
input.darkplaceholder::-webkit-input-placeholder {
    color: #252525;
}

.formInpt {

    // width: 100%;
    // padding-right: 0.75rem;
    // height: 100%;
    // position: relative;
    // line-height: normal;
    input {
        font-size: 0.65rem;
        text-align: right;
        background: transparent;
        line-height: 0.65rem;
    }
}
</style>
