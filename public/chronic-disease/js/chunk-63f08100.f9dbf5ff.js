(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63f08100"],{3448:function(t,e,n){},"46e9":function(t,e,n){"use strict";n.d(e,"i",function(){return a}),n.d(e,"e",function(){return o}),n.d(e,"b",function(){return i}),n.d(e,"d",function(){return d}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return u}),n.d(e,"h",function(){return s}),n.d(e,"g",function(){return l}),n.d(e,"f",function(){return p});var r=n("8982"),a=function(){return Object(r["a"])("/health/module/data/type/load.do",{},{loading:!0})},o=function(t,e){return Object(r["a"])("/health/module/data/load.do",{recordDate:t,typeId:e},{loading:!0})},i=function(t,e,n,a,o,i,d){return Object(r["a"])("/health/module/data/save.do",{recordDate:t,typeId:e,value:n,rowOrder:a,unit:o,name:i,channel:d},{loading:!0})},d=function(t,e){return Object(r["a"])("/health/module/index/data/table/load.do",{recordDate:t,typeId:e},{loading:!0})},c=function(t,e){return Object(r["a"])("/health/module/index/data/axis/load.do",{recordDate:t,typeId:e},{loading:!0})},u=function(t,e,n,a){return Object(r["a"])("/health/module/data/axis/switch.do",{recordDate:t,typeId:e,rowOrder:n,direction:a},{loading:!0})},s=function(t,e){return Object(r["a"])("/health/module/data/table/year/load.do",{lastRecordDate:t,typeId:e},{loading:!0})},l=function(t,e){return Object(r["a"])("/health/module/data/table/month/load.do",{recordDate:t,typeId:e},{loading:!0})},p=function(t,e){return Object(r["a"])("/health/module/data/table/day/load.do",{recordDate:t,typeId:e},{loading:!0})}},"72c9":function(t,e,n){"use strict";var r=n("75a6"),a=n.n(r);a.a},7364:function(t,e,n){var r=n("ddf7").f,a=Function.prototype,o=/^\s*function ([^ (]*)/,i="name";i in a||n("dad2")&&r(a,i,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},"75a6":function(t,e,n){},ac34:function(t,e,n){"use strict";var r=n("3448"),a=n.n(r);a.a},c6c2:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"data_box"},[t.typeList.length>1?n("record-nav",{attrs:{typeList:t.typeList}}):t._e(),n("router-view",{key:t.key})],1)},a=[],o=(n("7364"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav_box"},[n("swiper",{ref:"mySwiper",attrs:{options:t.swiperOption}},t._l(t.typeList,function(e,r){return n("swiper-slide",{key:r},[n("span",{class:t.typeId==e.typeId?"on_current tap_events":"tap_events",on:{click:function(n){return t.clickEvent(e)}}},[t._v(" "+t._s(e.typeName)),n("i",{staticClass:"bar",class:t.typeId==e.typeId?"on":""})])])}),1)],1)}),i=[],d=n("6fe8"),c={props:["typeList"],data:function(){return{swiperOption:{slidesPerView:5}}},computed:{typeId:function(){return this.$route.query.typeId},swiper:function(){return this.$refs.mySwiper.swiper}},watch:{pathUrl:function(t){this.pathUrl=t,console.log(t,"newVal")}},mounted:function(){this.swiper.slideTo(this.typeId-1,1e3,!1)},components:{swiper:d["swiper"],swiperSlide:d["swiperSlide"]},methods:{clickEvent:function(t){this.$router.push({path:"/data/record/editrecord",query:{typeId:t.typeId}})}}},u=c,s=(n("72c9"),n("17cc")),l=Object(s["a"])(u,o,i,!1,null,"74961dde",null),p=l.exports,f=n("46e9"),h={data:function(){return{showRecord:!1,typeList:[]}},computed:{key:function(){return void 0!==this.$route.name?this.$route.name+new Date:this.$route+new Date}},components:{RecordNav:p},mounted:function(){this.getFormNavData()},methods:{getFormNavData:function(){var t=this;Object(f["i"])().then(function(e){"SUCCESS"==e.retCode&&(t.typeList=e.typeList)})}}},y=h,m=(n("ac34"),Object(s["a"])(y,r,a,!1,null,"1b08c291",null));e["default"]=m.exports}}]);