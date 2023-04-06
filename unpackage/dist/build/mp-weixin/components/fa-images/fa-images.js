(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/fa-images/fa-images"],{"76ce":function(e,t,n){"use strict";n.r(t);var u=n("b9f6"),i=n.n(u);for(var c in u)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return u[e]}))}(c);t["default"]=i.a},"80fc":function(e,t,n){"use strict";n.r(t);var u=n("cef7"),i=n("76ce");for(var c in i)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(c);var o=n("f0c5"),f=Object(o["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],void 0);t["default"]=f.exports},b9f6:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={name:"fa-images",props:{item:{type:Object,default:{}}},data:function(){return{}},methods:{swiper:function(e){this.lookImage(e,this.item.value)},look:function(){this.lookImage(0,[this.item.value])},lookImage:function(t,n){e.previewImage({current:t,urls:n,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){},fail:function(e){}}})}}};t.default=n}).call(this,n("543d")["default"])},cef7:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return u}));var u={uSwiper:function(){return n.e("uview-ui/components/u-swiper/u-swiper").then(n.bind(null,"cb33"))}},i=function(){var e=this.$createElement;this._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/fa-images/fa-images-create-component',
    {
        'components/fa-images/fa-images-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("80fc"))
        })
    },
    [['components/fa-images/fa-images-create-component']]
]);
