(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/score/exchange"],{"378b":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("55e5");o(n("66fd"));var i=o(n("72f4"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"3cbf":function(e,t,n){"use strict";n.r(t);var o=n("a2cc"),i=n.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=i.a},"55a7":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));var o={faNavbar:function(){return n.e("components/fa-navbar/fa-navbar").then(n.bind(null,"076e"))},faSearch:function(){return n.e("components/fa-search/fa-search").then(n.bind(null,"5923"))},uDropdown:function(){return n.e("uview-ui/components/u-dropdown/u-dropdown").then(n.bind(null,"a48f"))},uDropdownItem:function(){return n.e("uview-ui/components/u-dropdown-item/u-dropdown-item").then(n.bind(null,"cbc2"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"cec8"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"f35f"))},uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"cb7ff"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"b721"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"4cfe"))},uNumberBox:function(){return n.e("uview-ui/components/u-number-box/u-number-box").then(n.bind(null,"3c3d"))},faAddMy:function(){return n.e("components/fa-add-my/fa-add-my").then(n.bind(null,"6e1d"))},uLoadmore:function(){return n.e("uview-ui/components/u-loadmore/u-loadmore").then(n.bind(null,"e5b3"))},uBackTop:function(){return n.e("uview-ui/components/u-back-top/u-back-top").then(n.bind(null,"25ed"))},faTabbar:function(){return Promise.all([n.e("common/vendor"),n.e("components/fa-tabbar/fa-tabbar")]).then(n.bind(null,"07a5"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.list,(function(t,n){var o=e.__get_orig(t),i={backgroundColor:e.theme.bgColor,color:e.theme.color,width:"20vw"};return{$orig:o,a0:i}}))),o={backgroundColor:e.theme.bgColor,color:e.theme.color,width:"60vw"},i={backgroundColor:e.theme.lightColor},u=e.list.length,r={color:e.theme.bgColor},a={backgroundColor:e.theme.lightColor};e.$mp.data=Object.assign({},{$root:{l0:n,a1:o,a2:i,g0:u,a3:r,a4:a}})},u=[]},5688:function(e,t,n){},"72f4":function(e,t,n){"use strict";n.r(t);var o=n("55a7"),i=n("3cbf");for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n("f627"),n("b061");var r=n("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"61f6c386",null,!1,o["a"],void 0);t["default"]=a.exports},a2cc:function(e,t,n){"use strict";var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("448a")),u=o(n("278c")),r={onLoad:function(){this.getExchangeList()},data:function(){return{orderby:"weigh",orderway:"desc",value2:"weigh_desc",type:"",keyword:"",options1:[{label:"全部",value:""},{label:"实物",value:"reality"},{label:"虚拟",value:"virtual"}],options2:[{label:"默认排序",value:"weigh_desc"},{label:"积分升序",value:"score_asc"},{label:"积分降序",value:"score_desc"},{label:"销量升序",value:"sales_asc"},{label:"销量降序",value:"sales_desc"}],show:!1,form:{type:"reality",receiver:"",mobile:"",address:"",nums:1,exchange_id:"",memo:""},scrollTop:0,list:[],status:"loadmore",has_more:!1,is_empty:!1,is_update:!1,page:1}},methods:{change1:function(e){this.is_update=!0,this.getExchangeList()},change2:function(e){var t=e.split("_"),n=(0,u.default)(t,2),o=n[0],i=n[1];this.orderby=o||"weigh",this.orderway=i||"desc",this.is_update=!0,this.getExchangeList()},search:function(e){this.keyword=e,this.is_update=!0,this.getExchangeList()},toExchange:function(e){this.show=!0,this.form.exchange_id=e.id,this.form.type=e.type,this.form.memo=""},getExchangeList:function(){var e=this;this.$api.exchangeList({page:this.pgae,orderby:this.orderby,orderway:this.orderway,type:this.type,keyword:this.keyword}).then((function(t){e.is_update&&(e.is_update=!1,e.list=[]),e.list=[].concat((0,i.default)(e.list),(0,i.default)(t.data.data)),e.has_more=t.data.current_page<t.data.last_page,e.is_empty=!e.list.length}))},submit:function(){var e=this;if("reality"==this.form.type){if(!this.form.receiver)return void this.$u.toast("请填写姓名！");if(!this.$u.test.mobile(this.form.mobile))return void this.$u.toast("手机号码格式不正确！");if(!this.form.address)return void this.$u.toast("请填写地址！")}this.$api.exchange(this.form).then((function(t){e.$u.toast(t.msg),e.show=!1,1==t.code&&setTimeout((function(){e.goPage("/pages/score/order")}),1500)}))}},onPageScroll:function(e){this.scrollTop=e.scrollTop},onReachBottom:function(){this.has_more&&(this.status="loading",this.page++,this.getExchangeList())}};t.default=r},b061:function(e,t,n){"use strict";var o=n("5688"),i=n.n(o);i.a},d692:function(e,t,n){},f627:function(e,t,n){"use strict";var o=n("d692"),i=n.n(o);i.a}},[["378b","common/runtime","common/vendor"]]]);