(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fc4f3a2"],{"0763":function(t,e,n){"use strict";var a=n("add4"),r=n.n(a);r.a},"16d7":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"data_box"},[t.typeList.length>1?n("form-data-nav",{attrs:{typeList:t.typeList}}):t._e(),n("router-view")],1)},r=[],o=n("46e9"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav_box"},[n("swiper",{ref:"mySwiper",attrs:{options:t.swiperOption},on:{someSwiperEvent:t.callback}},t._l(t.typeList,function(e,a){return n("swiper-slide",{key:a},[n("span",{class:t.typeId==e.typeId?"on_current tap_events":"tap_events",on:{click:function(n){return t.clickEvent(e)}}},[t._v(" "+t._s(e.typeName)),n("i",{staticClass:"bar",class:t.typeId==e.typeId?"on":""})])])}),1)],1)},d=[],c=n("6fe8"),u={props:["typeList"],data:function(){return{swiperOption:{slidesPerView:5}}},computed:{typeId:function(){return this.$route.query.typeId},swiper:function(){return this.$refs.mySwiper.swiper}},watch:{typeId:{handler:function(){},immediate:!0,deep:!0}},mounted:function(){this.swiper.slideTo(this.typeId-1,1e3,!1)},components:{swiper:c["swiper"],swiperSlide:c["swiperSlide"]},methods:{clickEvent:function(t){var e;"1"==t.tableType?e="tableyear":"2"==t.tableType?e="tablemonth":"3"==t.tableType&&(e="tableday"),this.$router.push({path:e,query:{typeId:t.typeId,tableType:t.tableType}})},callback:function(){}}},l=u,s=(n("95a1"),n("17cc")),p=Object(s["a"])(l,i,d,!1,null,"1ed9fd98",null),f=p.exports,h={data:function(){return{typeList:[]}},mounted:function(){var t=this;this.$nextTick(function(){t.getFormNavData()})},methods:{getFormNavData:function(){var t=this;Object(o["i"])().then(function(e){"SUCCESS"==e.retCode&&(t.typeList=e.typeList)})}},components:{FormDataNav:f}},y=h,b=(n("0763"),Object(s["a"])(y,a,r,!1,null,"5e2cbf09",null));e["default"]=b.exports},"46e9":function(t,e,n){"use strict";n.d(e,"i",function(){return r}),n.d(e,"e",function(){return o}),n.d(e,"b",function(){return i}),n.d(e,"d",function(){return d}),n.d(e,"c",function(){return c}),n.d(e,"a",function(){return u}),n.d(e,"h",function(){return l}),n.d(e,"g",function(){return s}),n.d(e,"f",function(){return p});var a=n("8982"),r=function(){return Object(a["a"])("/health/module/data/type/load.do",{},{loading:!0})},o=function(t,e){return Object(a["a"])("/health/module/data/load.do",{recordDate:t,typeId:e},{loading:!0})},i=function(t,e,n,r,o,i,d){return Object(a["a"])("/health/module/data/save.do",{recordDate:t,typeId:e,value:n,rowOrder:r,unit:o,name:i,channel:d},{loading:!0})},d=function(t,e){return Object(a["a"])("/health/module/index/data/table/load.do",{recordDate:t,typeId:e},{loading:!0})},c=function(t,e){return Object(a["a"])("/health/module/index/data/axis/load.do",{recordDate:t,typeId:e},{loading:!0})},u=function(t,e,n,r){return Object(a["a"])("/health/module/data/axis/switch.do",{recordDate:t,typeId:e,rowOrder:n,direction:r},{loading:!0})},l=function(t,e){return Object(a["a"])("/health/module/data/table/year/load.do",{lastRecordDate:t,typeId:e},{loading:!0})},s=function(t,e){return Object(a["a"])("/health/module/data/table/month/load.do",{recordDate:t,typeId:e},{loading:!0})},p=function(t,e){return Object(a["a"])("/health/module/data/table/day/load.do",{recordDate:t,typeId:e},{loading:!0})}},"95a1":function(t,e,n){"use strict";var a=n("98a2"),r=n.n(a);r.a},"98a2":function(t,e,n){},add4:function(t,e,n){}}]);