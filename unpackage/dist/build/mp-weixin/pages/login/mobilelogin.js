(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/mobilelogin"],{"2cd3":function(e,t,n){"use strict";n.r(t);var u=n("c682"),r=n.n(u);for(var i in u)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return u[e]}))}(i);t["default"]=r.a},"5d80":function(e,t,n){},"5fd5":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return u}));var u={faNavbar:function(){return n.e("components/fa-navbar/fa-navbar").then(n.bind(null,"076e"))},uForm:function(){return n.e("uview-ui/components/u-form/u-form").then(n.bind(null,"cb7ff"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"b721"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"4cfe"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"cec8"))},uGrid:function(){return n.e("uview-ui/components/u-grid/u-grid").then(n.bind(null,"b857"))},uGridItem:function(){return n.e("uview-ui/components/u-grid-item/u-grid-item").then(n.bind(null,"7d04"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"f2bf"))},uVerificationCode:function(){return n.e("uview-ui/components/u-verification-code/u-verification-code").then(n.bind(null,"1ffa"))}},r=function(){var e=this.$createElement,t=(this._self._c,{backgroundColor:this.theme.bgColor,color:this.theme.color}),n={backgroundColor:this.theme.bgColor,color:this.theme.color};this.$mp.data=Object.assign({},{$root:{a0:t,a1:n}})},i=[]},a8d0:function(e,t,n){"use strict";(function(e,t){var u=n("4ea4");n("55e5");u(n("66fd"));var r=u(n("f136"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},c682:function(e,t,n){"use strict";var u=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("2eee")),i=u(n("c973")),o=n("9dab"),a={mixins:[o.loginfunc],onLoad:function(){this.isThreeLogin=!0},onReady:function(){this.$refs.uForm.setRules(this.rules)},data:function(){var e=this;return{labelPosition:"top",border:!1,errorType:["message"],form:{mobile:"",captcha:""},rules:{mobile:[{required:!0,message:"请输入手机号码",trigger:["change","blur"]},{validator:function(t,n,u){return e.$u.test.mobile(n)},message:"手机号码不正确",trigger:["change","blur"]}],captcha:[{required:!0,message:"请输入验证码",trigger:"change"}]},isThreeLogin:!1,codeTips:""}},methods:{codeChange:function(e){this.codeTips=e},getCode:function(){var e=(0,i.default)(r.default.mark((function e(){var t;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.$u.test.mobile(this.form.mobile)){e.next=3;break}return this.$u.toast("手机号码格式不正确！"),e.abrupt("return");case 3:if(!this.$refs.uCode.canGetCode){e.next=11;break}return e.next=6,this.$api.getSmsSend({mobile:this.form.mobile,event:"mobilelogin"});case 6:t=e.sent,this.$u.toast(t.msg),1==t.code&&this.$refs.uCode.start(),e.next=12;break;case 11:this.$u.toast("倒计时结束后再发送");case 12:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),goPage:function(e){this.$u.route("/pages/login/login")},goThreeLogin:function(){var e=(0,i.default)(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.$u.route("/pages/login/wxlogin");case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),goLogin:function(){var e=this;this.$refs.uForm.validate(function(){var t=(0,i.default)(r.default.mark((function t(n){var u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!n){t.next=12;break}return t.next=3,e.$api.mobilelogin(e.form);case 3:if(u=t.sent,u.code){t.next=7;break}return e.$u.toast(u.msg),t.abrupt("return");case 7:e.$u.vuex("vuex_token",u.data.token),e.$u.vuex("vuex_user",u.data.user||{}),e.success(1),t.next=13;break;case 12:e.$u.toast("验证失败");case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}};t.default=a},cf05:function(e,t,n){"use strict";var u=n("5d80"),r=n.n(u);r.a},f136:function(e,t,n){"use strict";n.r(t);var u=n("5fd5"),r=n("2cd3");for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("cf05");var o=n("f0c5"),a=Object(o["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],void 0);t["default"]=a.exports}},[["a8d0","common/runtime","common/vendor"]]]);