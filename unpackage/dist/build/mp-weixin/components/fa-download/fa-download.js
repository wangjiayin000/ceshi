(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/fa-download/fa-download"],{"1fcd":function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return i}));var i={uGrid:function(){return e.e("uview-ui/components/u-grid/u-grid").then(e.bind(null,"b857"))},uGridItem:function(){return e.e("uview-ui/components/u-grid-item/u-grid-item").then(e.bind(null,"7d04"))},uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"f2bf"))},uAlertTips:function(){return e.e("uview-ui/components/u-alert-tips/u-alert-tips").then(e.bind(null,"52a0"))}},u=function(){var n=this,t=n.$createElement,e=(n._self._c,"files"==n.item.type?n.__map(n.item.value,(function(t,e){var i=n.__get_orig(t),u=n.fileType(t);return{$orig:i,m0:u}})):null),i="files"!=n.item.type?n.fileType(n.item.value):null;n._isMounted||(n.e0=function(t){n.downtips=!1}),n.$mp.data=Object.assign({},{$root:{l0:e,m1:i}})},o=[]},"6b7b":function(n,t,e){"use strict";e.r(t);var i=e("818e"),u=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return i[n]}))}(o);t["default"]=u.a},"818e":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"fa-download",props:{item:{type:Object,default:{}}},computed:{fileType:function(){return function(n){var t=n.lastIndexOf("."),e=n.length;return n.substring(t,e)}}},data:function(){return{downtips:!1,description:""}},methods:{click:function(t){var e=this;n.downloadFile({url:t,success:function(t){200===t.statusCode&&n.saveFile({tempFilePath:t.tempFilePath,success:function(n){e.downtips=!0,e.description=n.savedFilePath},fail:function(n){}})},fail:function(n){}})}}};t.default=e}).call(this,e("543d")["default"])},bba7:function(n,t,e){"use strict";e.r(t);var i=e("1fcd"),u=e("6b7b");for(var o in u)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(o);var r=e("f0c5"),c=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,"77ff1004",null,!1,i["a"],void 0);t["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/fa-download/fa-download-create-component',
    {
        'components/fa-download/fa-download-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("bba7"))
        })
    },
    [['components/fa-download/fa-download-create-component']]
]);
