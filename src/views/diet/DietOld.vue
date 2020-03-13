<template>
    <div class="home">
      
        <!-- 每日配餐方案 -->
        <div class="days-programme" v-if="recommendation && recommendation.recipesInfo && recommendation.recipesInfo.recipes">
            <!-- 标题 -->
            <!-- <div class="programme-tit" :style="{backgroundImage: 'url(jgy_bg_wsmhdzxyx.png)'}  | PUBLIC_PATH">
                <div class="pro-tit">每日配餐方案</div>
            </div> -->
            <!-- 内容 -->
            <div class="ctn days-cont">
                <!-- 日历 -->
                <div class="calendar">
                    <ul class="calendar-box" ref="scrollView">
                        <li v-if="recommendation && recommendation.recipesInfo && recommendation.recipesInfo.recipes">
                            <template v-for="(item, i) in recommendation.recipesInfo.recipes">
                                <span v-if="item.isCurDay == '2'" :class="item.isCurDay =='2' ? 'orange-col':''" :key="`${i}a`">今日</span>
                                <span v-else :class="item.isCurDay =='2' ? 'orange-col':''" :key="`${i}b`">{{item.recipesDate | getCutWeek}}</span>
                            </template>
                        </li>
                        <li>
                            <span @click="loadRecipeDetails(item.recipesDate,i)" :class="(i == curRecipesDateIndex) ? 'orange-col':''" v-for="(item,i) in recommendation.recipesInfo.recipes" :key="i">{{item.recipesDate | getCutDay}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 饮食方案内容 -->
                <div class="diet-recommendation">
                    <div class="diet-recommendation-tit">
                        <ul>
                            <li :class="currentType== dietDetail.dietRecommendation.breakfast.mealType ?'curli':''" v-if="dietDetail.dietRecommendation.breakfast && dietDetail.dietRecommendation.breakfast.foodList && dietDetail.dietRecommendation.breakfast.foodList.length>0" @click="getMealType(dietDetail.dietRecommendation.breakfast.mealType)">早餐</li>
                            <li :class="currentType== dietDetail.dietRecommendation.breakfastAddition.mealType ?'curli':''" v-if="dietDetail.dietRecommendation.breakfastAddition && dietDetail.dietRecommendation.breakfastAddition && dietDetail.dietRecommendation.breakfastAddition.foodList && dietDetail.dietRecommendation.breakfastAddition.foodList.length>0" @click="getMealType(dietDetail.dietRecommendation.breakfastAddition.mealType)">早加</li>
                            <li :class="currentType== dietDetail.dietRecommendation.lunch.mealType ?'curli':''" v-if="dietDetail.dietRecommendation.lunch && dietDetail.dietRecommendation.lunch.foodList && dietDetail.dietRecommendation.lunch.foodList.length>0" @click="getMealType(dietDetail.dietRecommendation.lunch.mealType)">午餐</li>
                            <li :class="currentType== dietDetail.dietRecommendation.lunchAddition.mealType ?'curli':''" v-if="dietDetail.dietRecommendation.lunchAddition && dietDetail.dietRecommendation.lunchAddition.foodList && dietDetail.dietRecommendation.lunchAddition.foodList.length>0" @click="getMealType(dietDetail.dietRecommendation.lunchAddition.mealType)">午加</li>
                            <li :class="currentType== dietDetail.dietRecommendation.dinner.mealType ?'curli':''" v-if="dietDetail.dietRecommendation.dinner && dietDetail.dietRecommendation.dinner.foodList && dietDetail.dietRecommendation.dinner.foodList.length>0" @click="getMealType(dietDetail.dietRecommendation.dinner.mealType)">晚餐</li>
                            <li :class="currentType== dietDetail.dietRecommendation.dinnerAddition.mealType ?'curli':''" v-if="dietDetail.dietRecommendation.dinnerAddition && dietDetail.dietRecommendation.dinnerAddition.foodList && dietDetail.dietRecommendation.dinnerAddition.foodList.length>0" @click="getMealType(dietDetail.dietRecommendation.dinnerAddition.mealType)">晚加</li>
                        </ul>
                    </div>
                    <div class="links"></div>
                    <!-- 早餐 -->
                    <div class="diet-cont"  v-if="dietDetail.dietRecommendation.breakfast.foodList && dietDetail.dietRecommendation.breakfast.foodList.length>0 && currentType == dietDetail.dietRecommendation.breakfast.mealType">
                        
                        <div class="box">
                            {{dietDetail.dietRecommendation.breakfast.description}}
                        </div>
                        <ul class="recommended-list">
                            <li v-for="(item,i) in dietDetail.dietRecommendation.breakfast.foodList" :key="i" @click="foodInformation(item,dietDetail.dietRecommendation.breakfast.mealType)">
                                <dl>
                                    <dt><img :src="item.imageUrl"></dt>
                                    <dd>{{item.foodName}}<p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p></dd>
                                </dl>
                                <img class="icon-change" :class="{huan:i===animateIndex && typeString=='breakfast'}" :src="'pc_button_hyh.png' | PUBLIC_PATH" @click.stop="changeRecipe(item,dietDetail.dietRecommendation.breakfast.mealType,i,'breakfast')">
                            </li>
                        </ul>
                    </div>
                    <!-- 早加餐 -->
                    <div class="diet-cont" v-if="dietDetail.dietRecommendation && dietDetail.dietRecommendation.breakfastAddition && dietDetail.dietRecommendation.breakfastAddition.foodList && currentType == dietDetail.dietRecommendation.breakfastAddition.mealType">
                        <div class="box">
                            <p>{{dietDetail.dietRecommendation.breakfastAddition.description}}</p>
                        </div>
                        <ul class="recommended-list">
                            <li v-for="(item,i) in dietDetail.dietRecommendation.breakfastAddition.foodList" :key="i" @click="foodInformation(item,dietDetail.dietRecommendation.breakfastAddition.mealType)">
                                <dl>
                                    <dt><img :src="item.imageUrl"></dt>
                                    <dd><strong>{{item.foodName}}</strong><p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p></dd>
                                </dl>
                                <img class="icon-change" :class="{huan:i===animateIndex && typeString=='breakfastAddition'}" :src="'pc_button_hyh.png' | PUBLIC_PATH" @click.stop="changeRecipe(item,dietDetail.dietRecommendation.breakfastAddition.mealType,i,'breakfastAddition')">
                            </li>
                        </ul>
                    </div>
                    <!-- 午餐 -->
                    <div class="diet-cont" v-if="dietDetail.dietRecommendation.lunch.foodList && dietDetail.dietRecommendation.lunch.foodList.length>0 && currentType == dietDetail.dietRecommendation.lunch.mealType">
                        <div class="box">
                            <p>{{dietDetail.dietRecommendation.lunch.description}}</p>
                        </div>
                        <ul class="recommended-list">
                            <li v-for="(item,i) in dietDetail.dietRecommendation.lunch.foodList" :key="i" @click="foodInformation(item,dietDetail.dietRecommendation.lunch.mealType)">
                                <dl>
                                    <dt><img :src="item.imageUrl"></dt>
                                    <dd><strong>{{item.foodName}}</strong><p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p></dd>
                                </dl>
                                <img class="icon-change" :class="{huan:i===animateIndex && typeString=='lunch'}" :src="'pc_button_hyh.png' | PUBLIC_PATH" @click.stop="changeRecipe(item,dietDetail.dietRecommendation.lunch.mealType,i,'lunch')">
                            </li>
                        </ul>
                    </div>
                    <!-- 午加餐 -->
                    <div class="diet-cont" v-if="dietDetail.dietRecommendation && dietDetail.dietRecommendation.lunchAddition && dietDetail.dietRecommendation.lunchAddition.foodList && currentType == dietDetail.dietRecommendation.lunchAddition.mealType">
                        <div class="box">
                            <p>{{dietDetail.dietRecommendation.lunchAddition.description}}</p>
                        </div>
                        <ul class="recommended-list">
                            <li v-for="(item,i) in dietDetail.dietRecommendation.lunchAddition.foodList" :key="i" @click="foodInformation(item,dietDetail.dietRecommendation.lunchAddition.mealType)">
                                <dl>
                                    <dt><img :src="item.imageUrl"></dt>
                                    <dd><strong>{{item.foodName}}</strong><p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p></dd>
                                </dl>
                                <img class="icon-change" :class="{huan:i===animateIndex && typeString=='lunchAddition'}" :src="'pc_button_hyh.png' | PUBLIC_PATH"  @click.stop="changeRecipe(item,dietDetail.dietRecommendation.lunchAddition.mealType,i,'lunchAddition')">
                            </li>
                        </ul>
                    </div>
                    <!-- 晚餐 -->
                    <div class="diet-cont" v-if="dietDetail.dietRecommendation.dinner.foodList && dietDetail.dietRecommendation.dinner.foodList.length>0 && currentType == dietDetail.dietRecommendation.dinner.mealType">
                        <div class="box">
                            <p>{{dietDetail.dietRecommendation.dinner.description}}</p>
                        </div>
                        <ul class="recommended-list">
                            <li v-for="(item,i) in dietDetail.dietRecommendation.dinner.foodList" :key="i" @click="foodInformation(item,dietDetail.dietRecommendation.dinner.mealType)">
                                <dl>
                                    <dt><img :src="item.imageUrl"></dt>
                                    <dd><strong>{{item.foodName}}</strong><p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p></dd>
                                </dl>
                                <img class="icon-change" :class="{huan:i===animateIndex && typeString=='dinner'}" :src="'pc_button_hyh.png' | PUBLIC_PATH"  @click.stop="changeRecipe(item,dietDetail.dietRecommendation.dinner.mealType,'dinner')">
                            </li>
                        </ul>
                    </div>
                    <!-- 晚加餐 -->
                    <div class="diet-cont" v-if="dietDetail.dietRecommendation && dietDetail.dietRecommendation.dinnerAddition && dietDetail.dietRecommendation.dinnerAddition.foodList && currentType == dietDetail.dietRecommendation.dinnerAddition.mealType">
                        <div class="box">
                            <p>{{dietDetail.dietRecommendation.dinnerAddition.description}}</p>
                        </div>
                        <ul class="recommended-list">
                            <li v-for="(item,i) in dietDetail.dietRecommendation.dinnerAddition.foodList" :key="i" @click.stop="foodInformation(item,dietDetail.dietRecommendation.dinnerAddition.mealType)">
                                <dl>
                                    <dt><img :src="item.imageUrl"></dt>
                                    <dd><strong>{{item.foodName}}</strong><p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p></dd>
                                </dl>
                                <img class="icon-change" :class="{huan:i===animateIndex && typeString=='dinnerAddition'}" :src="'pc_button_hyh.png' | PUBLIC_PATH"  @click.stop="changeRecipe(item,dietDetail.dietRecommendation.dinnerAddition.mealType,i,'dinnerAddition')">
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 推荐茶饮 -->
                <div class="tea-cont"  v-if="dietDetail.dietRecommendation && dietDetail.dietRecommendation.drink && dietDetail.dietRecommendation.drink.foodList && dietDetail.dietRecommendation.drink.mealType == 7">
                    <div class="tea-tit">
                        <img :src="'pc_icon_tjcy.png' | PUBLIC_PATH">
                        <span>推荐茶饮</span>
                    </div>
                    <ul class="recommended-list">
                        <li v-for="(item,i) in dietDetail.dietRecommendation.drink.foodList" :key="i" @click="foodInformation(item,dietDetail.dietRecommendation.drink.mealType)">
                            <dl>
                                <dt><img :src="item.imageUrl"></dt>
                                <dd><strong>{{item.foodName}}</strong></dd>
                            </dl>
                            <img class="icon-change" :class="{huan:i===animateIndex && typeString=='drink'}" :src="'pc_button_hyh.png' | PUBLIC_PATH" @click.stop="changeRecipe(item,7,i,'drink')">
                        </li>
                    </ul>
                </div>
                  <div class="icon reset-meal-icon">
                    <button @click="resetMeal" :style="{backgroundImage: 'url(jgy_button_bg_bai.png)'}  | PUBLIC_PATH">调整配餐</button>
                </div>
                <!-- bg 元素 -->
                <LayBg/>
            </div>
        </div>
    </div>
    
    
</template>
<script>
    import Calendar from '@/components/common/Calendar.vue';
    import { apiDiet } from '@/service/api/diet'
    import { mapState,mapMutations } from 'vuex'
    import { apiRecommendation,apiDietDetail,apiChangement } from '@/service/api/result'
    import { TimeTool } from "@/assets/js/timeTool.js";
    import { debuglog } from 'util';
    import LayBg from '@/components/common/LayBg';
    window.isCreatedFull = ""; // 设置全局是否重新配餐字段
    export default {
        data () {
            return {
                initData:{},
                 nursePlan: {nursePlanList:[{weekInfo:"1",today:"1",exerciseDate:"20191210",nurseMethodList:[{t:"喝水",punchStatus:"2",dataList:[],m:"多喝水啊小伙子，每天都要和很多很多的谁才能是案件发大水了发控件的，哈哈哈",img:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3340570577,2195514875&fm=27&gp=0.jpg"},{punchStatus:"2"},{punchStatus:"1"},{punchStatus:"3"},{punchStatus:"4"}]},{weekInfo:"二",exerciseDate:"20191211"},{weekInfo:"三",exerciseDate:"20191213"},{weekInfo:"四",exerciseDate:"20191214"},{weekInfo:"五",exerciseDate:"20191215"},{weekInfo:"六",exerciseDate:"20191216"},{weekInfo:"日",exerciseDate:"20191217"},{weekInfo:"一",exerciseDate:"20191218"},{weekInfo:"二",exerciseDate:"20191219"},{weekInfo:"三",exerciseDate:"20191220"},{weekInfo:"四",exerciseDate:"20191221"},{weekInfo:"五",exerciseDate:"20191222"},{weekInfo:"六",exerciseDate:"20191223"},{weekInfo:"日",exerciseDate:"20191224"}]},
                animateIndex: "", // 动画index
		        typeString: "",	//餐类
                recommendation: {
                    // recipesInfo:{
                    //     recipes:[]
                    // },
                    evaluationResult:{

                    },
                    estimate:{
                        imageUrls:[]
                    }
                }, //生成食谱json数据
                dietDetail:{
                    dietRecommendation:{
                        breakfast:{
                            foodList:[{
                                foodCount:''
                            }]
                        },
                        breakfastAddition:{
                            foodList:[{
                                foodCount:''
                            }]
                        },
                        dinner:{
                            foodList:[{
                                foodCount:''
                            }]
                        },
                        dinnerAddition:{
                            foodList:[{
                                foodCount:''
                            }]
                        },
                        drink: {
                            foodList:[{
                                foodCount:''
                            }]
                        },
                        lunch:{
                            foodList:[{
                                foodCount:''
                            }]
                        },
                        lunchAddition:{
                            foodList:[{
                                foodCount:''
                            }]
                        },
                    },
                    
                    evaluationResult:{
                    }
                }, //食谱详情json数据
                currentType: 1, //当前餐次的值，默认是早餐,初始化值为1
                recipesDate:"", //当前食谱日期 格式yyyy-MM-dd
                curRecipesDateIndex: '', //当前食谱日期Index
                recipesId:"", // 当前食谱id
                isShowReference: false, //默认不显示食物参照量
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                console.log(from.path)
                if(from.path == "/configure"){
                    isCreatedFull = "1";
                    vm.currentType = 1; //当前餐次的值，默认是早餐,初始化值为1
                    vm.loadData();
                }else{
                    isCreatedFull = "";
                }
            })
        },
        components: {
            LayBg,
            Calendar
        },
        computed: {
            ...mapState(['code','userInfo']),
        },
        created () {


            this.getInitData()

            // 加载数据
            this.loadData();
            // store 数据
            // alert(isCreatedFull);
            // this.isCreated = isCreatedFull;
            // console.log(this.isCreated)
        },
        // 过滤器
        filters:{
            // 获取当前天的值
　　　　　    getCutDay:function(date){
　　　　　　      return new TimeTool().getDetail(date).day;
　　　　　　  },
            // 获取当前天对应的周 或者今日
            getCutWeek:function(date){
                let weekNum = new TimeTool().getDetail(date).week;
                let weekString;
                if(weekNum == 1){
                    weekString = "一"
                }else if(weekNum == 2){
                    weekString = "二"
                }else if(weekNum == 3){
                    weekString = "三"
                }else if(weekNum == 4){
                    weekString = "四"
                }else if(weekNum == 5){
                    weekString = "五"
                }else if(weekNum == 6){
                    weekString = "六"
                }else if(weekNum == 7){
                    weekString = "日"
                }
                return weekString; 
            }
　　　　 },
        methods: {
            getInitData(){
                apiDiet(this.code,this.userInfo.userId).then(res=>{
                    this.initData = res;
                })
            },

            ...mapMutations('created',['setCreated']),
            // 点击日历重新查看食谱详情
            loadRecipeDetails: async function(date,i){
                this.curRecipesDateIndex = i;
                this.currentType = 1;
                // 加载食谱详情
                this.recipesDate = date;
                this.loadDietDetail();
            },
            // 换一换
            changeRecipe: async function(item,mealType,index,name){
                let that = this;
                that.animateIndex = index;
			    that.typeString = name;
                // 日期、食谱id、用户id、code需外露    
                const changeData = await apiChangement(that.code,that.userId,item.foodId,item.foodName,item.foodHeat,item.initialHeat,mealType,that.recipesId,that.recipesDate);
                
                //数据赋值
                // Object.assign(item,changeData.foodInfo)	
                let keys=Object.keys(changeData.foodInfo)
                for(let i=0;i<keys.length;i++){
                    // that.$set(item,keys[i],data.foodInfo[keys[i]])
                    item[keys[i]]=changeData.foodInfo[keys[i]]
                }
                // 清空设置
                that.animateIndex = "";
				that.typeString = "";
            },
            // 查看食物信息
            foodInformation:function(item,type){
                let that  = this;
                that.$router.push({
                    path: '/details',
                    query: {
                        code: that.code,
                        userId: that.userId,
                        foodId: item.foodId,
                        mealType: type
                    }
                })
            },
            // // 跳转食材详情页
            // toIngredientsInfo: function(item){
            //     let that  = this;
            //     that.$router.push({
            //         path: '/ingredientsInfo',
            //         query: {
            //             type: "1", // 固定类型为食材，不会出现药材，已与专业组做过沟通
            //             foodId: item.foodId
            //         }
            //     })
            // },
            // 点击餐次显示不同的餐别 获取mealType
            getMealType(type){
                this.currentType = type;
            },
            // 首先等配餐结果拿到数据
            async loadData () {
                const data = await apiRecommendation(this.code,this.userInfo.userId,config.dayLength,isCreatedFull);
                this.recommendation = data;
                // 循环遍历数据拿到当前天的i，赋值给curRecipesDateIndex
                if(this.recommendation && this.recommendation.recipesInfo &&  this.recommendation.recipesInfo.recipes){
                    
                    this.dataTraversal();
                    //食谱id赋值，获取当天食谱日期并赋值，加载食谱详情接口
                    this.recipesId = this.recommendation.recipesInfo.recipesId; //食谱id赋值，单独使用
                    // 获取当天食谱日期
                    const curDay = this.getCurRecipes(this.recommendation.recipesInfo.recipes);
                    this.recipesDate = curDay; // 当天食谱日期获取赋值，单独使用
                    // 加载食谱详情接口
                    this.loadDietDetail();
                    
                }
            },
            // 初始化循环数据遍历 在生成配餐页面
            dataTraversal(){
                this.recommendation.recipesInfo.recipes.some((item,i)=>{
                    if(item.isCurDay == "2") {
                        this.curRecipesDateIndex = i
                        let clientWidth = document.documentElement.clientWidth
                        let scrollLeft = (clientWidth/(750/90) * i)
                        this.$nextTick(()=>{
                            console.log(this.$refs.scrollView)
                            this.$refs.scrollView.scrollLeft = scrollLeft
                        })
                        return
                    }
                })
            },
            // 食谱详情接口
            async loadDietDetail(){
                const dietDetail = await apiDietDetail(this.code,this.userInfo.userId,this.recipesId,this.recipesDate);
                this.dietDetail = dietDetail;
            },
            // 调整配餐
            resetMeal(){
                // this.setCreated({isCreated:"1"})
                isCreatedFull = "1";
                this.$router.push('/configure')
            },
            // 切换显示隐藏
            toggleSlide(){
                this.isShowReference = !this.isShowReference;
            },
            // 获取当天食谱的日期
            getCurRecipes(obj){
                for(let i=0;i<obj.length;i++){
                    // 判断是当天 1:过去天，3:未来天
                    if(obj[i].isCurDay == "2"){
                        return obj[i].recipesDate;
                    }
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
    /*隐藏滚动条bar*/
    .hide_bar::-webkit-scrollbar {
        display: none;
    }
    *::-webkit-scrollbar {
        display: none;
    }
    // 调整配餐按钮
    .reset-meal-icon{
        display: flex;
        align-items: center;
        justify-content: center;
        button{
            width: 6.5rem;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-repeat: no-repeat;
            background-position: center center;
            @include bg_color6();
            background-size: 6rem 2rem;
            @include font_color1();
            font-size: .9rem;
            @include box-shodow5(0 .3rem .75rem 0);
            border-radius: 1.25rem;
            font-weight: bold;
        }
    }
    .home {
        width: 100%;
        min-height: 100%;
        // padding: .8rem 0.75rem;
        box-sizing: border-box;
        @include bg_color1();
        // 配餐结果
        .evaluation-result{
            background-repeat: no-repeat;
            background-size: 100% auto;
            width: 100%;
            height: 5.5rem;
            .siyuan{
                font-family: "SourceHanSerifCN-Bold";
            }
            dl{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding-left: 1.05rem;
                padding-top: 1rem;
                dt{
                    display: flex;
                    align-items: flex-start;
                    @include font_color13();
                    font-size: .7rem;
                    line-height: 1rem;
                    margin-bottom: .3rem;
                }
                dd{
                    font-size: 1.6rem;
                    @include font_color1();
                    line-height: 1.8rem;
                }
            }
        }
        // 测评结果介绍
        .result-cont{
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            p{
                padding-bottom: .75rem;
                line-height: 140%;
                font-size: .75rem;
                @include font_color8();
            }
        }
        // 四个角背景
        .ctn {
            @include bg_color6();
            @include box_shodow1(0 0.3rem 1rem 0);
            border-radius: 0.2rem;
            padding: 1.35rem 1.05rem 0.3rem;
            box-sizing: border-box;
            position: relative;
        }
        // 日历
        .calendar{
            margin-bottom: 1.4rem;
            .calendar-box{
                overflow-x: auto;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                li{
                    font-size: .7rem;
                    display: flex;
                    justify-content: space-between;
                    white-space: nowrap;
                    margin-bottom: .425rem;
                    span{
                        width: 1.6rem;
                        height: .85rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-basis: 1.6rem /* 64/40 */;
                        flex-shrink: 0;
                        @include font_color14();
                        margin-right: .65rem;
                        &.orange-col{
                            @include font_color15();
                        }
                    }
                    &:nth-child(2){
                        margin:0;
                        margin-bottom: 0;
                        height: 1.7rem;
                        padding:0;
                        span{
                            @include font_color4();
                            font-size: .85rem;
                            border-radius: 50%;
                            width: 1.6rem;
                            height: 1.6rem;
                            font-weight: bold;
                            &.orange-col{
                                @include bg_color();
                                @include font_color6();
                            }
                        }
                        
                    }
                }
            }
        }
        // 食物参照量list
        .food-reference{
            margin-bottom: 1.1rem;
        }
        .food-reference-cont{
            padding-left: 1rem;
            padding-right: 1rem;
            .reference-list{
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                dl{
                    dt{
                        img{
                            width: 7.35rem;
                        }
                    }
                    
                }
            }
            
        }
        // 每日配餐方案
        .days-programme{
            // margin-top: .8rem;
            .days-cont{
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
            // 标题
            .programme-tit{
                background-repeat: no-repeat;
                width: 100%;
                height: 2.2rem;
                background-size: cover;
                box-sizing: border-box;
                padding:0 1.05rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .pro-tit{
                    @include font_color6();
                    font-size: .85rem;
                    font-weight: bold;
                }
                .time{
                    font-size: .85rem;
                    @include font_color1();
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: .475rem;
                        height: .3rem;
                        margin-left: .3rem;
                    }
                }
            }
            // diet-recommendation
            .diet-recommendation{
                .links{
                    width: 100%;
                    height: 1px;
                    background: #EEEEEE;
                    margin-bottom: .8rem;
                }
                .diet-recommendation-tit{
                    display: flex;
                    overflow-x: scroll;
                    width: 100%;
                    ul{
                        display: flex;
                        justify-content: space-between;
                        white-space: nowrap;
                        li{
                            // flex-basis: 2.05rem;
                            flex-shrink: 0;
                            font-size: .85rem;
                            @include font_color5();
                            margin-right: 1.4rem;
                            // width: 2.05rem;
                            line-height: 1.2rem;
                            height: 2.6rem;
                            text-align: center;
                        }
                        .curli{
                            @include font_color15();
                            position: relative;
                            font-weight: bold;
                            &::after{
                                width: .3rem;
                                height: .3rem;
                                @include bg_color();
                                border-radius: 50%;
                                content: "";
                                position: absolute;
                                top: 1.4rem;
                                left: 38%;
                            }
                        }
                    }
                }
                // 饮食推荐内容
                .diet-cont{
                    // 饮食推荐内容
                    .box{
                        border: 1px solid rgba(222,150,72,0.40);
                        // @include bg_color23();
                        padding:.8rem .65rem;
                        @include border2(1px solid);
                        font-size: .7rem;
                        color: #999999;
                    }
                    
                }
            }

        }
        // 推荐茶饮标题
        .tea-tit{
            display: flex;
            align-items: center;
            img{
                width: .75rem;
                height: .75rem;
                margin-right: .5rem;
            }
            span{
                font-size: .85rem;
                @include font_color4();
                font-weight: bold;
            }
        }
        // 食物参照量标题
        .food-reference-tit{
            margin-top: 1rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            font-weight: bold;
            span{
                font-size: .85rem;
                @include font_color15();
                margin-right: .6rem;
                font-weight: bold;
                padding-left: .25rem;
            }
            img{
                width: .475rem;
                height: .4rem;
            }
            img.toggle{
                transform:rotate(180deg);
                transition: transform 0.2s; 
            }
        }
        // 动画
        @-webkit-keyframes spin {
            from {
                -webkit-transform: rotate(0deg);
            }
            to {
                -webkit-transform: rotate(300deg);
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(300deg);
            }
        }
        // 推荐饮食和推荐茶饮模板样式
        .recommended-list{
            padding-bottom: 1.125rem;
            padding-top: .35rem;
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: .7rem;
                dl{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    dt{
                        margin-right: .5rem;
                        img{
                            width: 2.2rem;
                            height: 2.2rem;
                            border-radius: 50%;
                        }
                    }
                    dd{
                        font-size: .75rem;
                        @include font_color4();
                        font-weight: bold;
                        p{
                            margin-top: .1rem;
                            font-size: .6rem;
                            @include font_color5();
                            font-weight: normal;
                        }
                    }
                }
                .icon-change{
                    width: 1.6rem;
                    height: 1.6rem;
                    
                }
                img.icon-change:hover::after{
                    -webkit-transform:rotate(360deg);
                    transform:rotate(360deg);
                    -webkit-transition:-webkit-transform 1s linear;
                    transition:transform 1s linear;
                }
                .huan{
                    width: 1.4rem;
                    height: 1.4rem;
                    display: block;
                    cursor: pointer;
                    animation: spin 1s infinite linear;
                }
            }
        }
    }
</style>
