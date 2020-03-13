<template>
    <div class="container wj">
        <!-- 头部 -->
        <CustomHeader :source.sync="image"/>
        <ul class="major grow_1">
            <li class="tit">
                <span class="tit">食物名称</span>
                <input class="darkplaceholder"   v-model.trim="foodName" placeholder="如:清炒芥兰" type="text">

            </li>
            <li>
                <span class="tit">数量</span>
                <FormInput placeholder="1"  name="count" v-model.trim.number="count" type="number" :maxlength="999" />
            </li>
            <li>
                <span class="tit">单位</span>
                <input placeholder="如:碗"  v-model.trim="unit"  type="text"/>
            </li>
            <li>
                <span class="tit">热量</span>
                <div class="flex_c">
                    
                      <FormInput placeholder="100"  name="kilocalorie"  v-model.trim.number="kilocalorie" type="number" :maxlength="10000" />
                    <span style="color:#252525;">大卡</span>
                </div>
            </li>
        </ul>
        <div class="shrink_0 full_x flex_c just_c ">
            <!-- <button class="btn_active tap_events" :class="{btn_disable:!isFormComplete}" @click="handleSubmit">完成</button> -->
                    <div
            class="button tap_events"
            :class="{btn_disable:!isFormComplete}"
            href="javascript:;"
             @click="handleSubmit"
            :style="{backgroundImage: isFormComplete?'url(btn_bg_Evaluation_yellow_activation.png)':'url(btn_bg_Evaluation_yellow_enabled.png)'} | PUBLIC_PATH"
        >完成记录</div>
        </div>
        
    </div>
</template>


<script>
import {
    saveFoodCustomForm
} from "@/service/api/plan";
import {
    isEmpty,
    getStorage,
    setStorage
} from "@/assets/js/util.js";
import FormInput from "@/components/common/FormInput";
import CustomHeader from "@/components/plan/CustomHeader";
import "@/styles/flex.scss";
    import { mapState,mapMutations} from 'vuex'
export default {
    components:{
        CustomHeader,
        FormInput
      
    },
    data(){
        return{
            foodName:"",//食物名称
            count_:"",//食物数量
            unit:"",//单位
            kilocalorie_:"",//热量
            image:"",//图片
            isPending:false,//防抖节流
        }
    },
    computed:{
        ...mapState(['code', 'userInfo']),
        count:{
            get(){
                return this.count_
            },
            set(val){
                if(Number(val).toString()==="NaN") return
               this.count_=val ? parseInt(val) :null;
            }
        },
        kilocalorie:{
            get(){
                return this.kilocalorie_
            },
            set(val){
                 if(Number(val).toString()==="NaN") return
                this.kilocalorie_=val ? parseInt(val) :null;
            }
        },
        //表单是否合法
        isFormComplete(){
            const {foodName,count,kilocalorie,unit}=this 
            return !isEmpty(foodName) && !isEmpty(count)&&!isEmpty(kilocalorie) && !isEmpty(unit)
        },
    },
    created(){
        // this.$loading.show();
    },
    methods:{
        
        // 保存自定义信息
        async handleSubmit(){
            const {isFormComplete,isPending,foodName,count,kilocalorie,unit}=this;
            let image =this.image ? this.image.split("base64,")[1] :"";
            if(isFormComplete && !isPending){ 
                this.isPending=true;
                try{
                    const {customFood} = await saveFoodCustomForm(foodName, count, unit, kilocalorie, image,this.userInfo.userId);
                    customFood.extensionUnits=[{
                        count:customFood.count,
                        unit:customFood.unit,
                        unitValue:1,
                    }]
                    /**
                     * 添加自定义饮食----添加完成回到了常见食物列表
                        应该回到自定义饮食列表
                        添加一个自定义饮食后在我的已选要添加自定义饮食
                     */
                    Object.assign(customFood,{
                        name:customFood.foodName,
                        recordFrom:"1",
                        foodType:"2",
                        mealType:this.$route.query.mealType,
                        minCountHeat:customFood.kilocalorie,
                        minCount:customFood.count,
                        unitHeat:customFood.kilocalorie,
                    })
                   
                    // customFood.kilocalorie=customFood
                    const selectedFoodList=getStorage("session","selectedFoodList") || [];
                    selectedFoodList.push(customFood)
                    setStorage("session","selectedFoodList",selectedFoodList)
                    this.$toast("处理成功")
                    setTimeout(() => {
                        this.$router.back();
                    }, 1000);
                }catch(err){
                }
                this.isPending=false;
            }
        },
        // // 解决ios键盘抬起后容器不会下来的问题 已经通过css .container position:fixed 解决
        // handleInptBlur(){
        //     window.scroll(0,0)
        // },
        // // 解决ios键盘抬起后容器不会下来的问题
        // handleInptFocus(e){
        //     e.target.scrollIntoView();
        // }
    }
}
</script>


<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
@import "@/styles/plan/food&sportCustom.scss";
    
  input::-webkit-input-placeholder {
      color: #929292 !important;
  }
           .button {
            width: 15.5rem;
            height: 2.5rem;
            @include box_shodow(0 12px 30px 0);
            border-radius: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .9rem;
            @include font_color6();
            position: fixed;
            bottom: .6rem /* 74/40 */;
            left: 50%;
            transform: translateX(-50%);
            background-position: center center;
            @include bg_color();
            background-repeat: no-repeat;
            background-size: 15rem 2rem;
            font-weight: bold;
            z-index: 9999;
        }
        .btn_disable{
            @include bg_color8();
        }
</style>
