(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/lodger/addoredit"],{4479:function(e,n,t){"use strict";t.r(n);var i=t("6195"),a=t("cc94");for(var u in a)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(u);t("6b8c"),t("d3e2");var o=t("f0c5"),r=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"32683bec",null,!1,i["a"],void 0);n["default"]=r.exports},"537a":function(e,n,t){},6195:function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return i}));var i={faNavbar:function(){return t.e("components/fa-navbar/fa-navbar").then(t.bind(null,"076e"))},uForm:function(){return t.e("uview-ui/components/u-form/u-form").then(t.bind(null,"cb7ff"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"b721"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-input/u-input")]).then(t.bind(null,"4cfe"))},uButton:function(){return t.e("uview-ui/components/u-button/u-button").then(t.bind(null,"cec8"))},uSelect:function(){return t.e("uview-ui/components/u-select/u-select").then(t.bind(null,"fb71"))},uPopup:function(){return t.e("uview-ui/components/u-popup/u-popup").then(t.bind(null,"f35f"))},uCheckboxGroup:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-checkbox-group/u-checkbox-group")]).then(t.bind(null,"ad57"))},uCheckbox:function(){return t.e("uview-ui/components/u-checkbox/u-checkbox").then(t.bind(null,"adda"))}},a=function(){var e=this,n=e.$createElement,t=(e._self._c,{backgroundColor:e.theme.bgColor,color:e.theme.color});e._isMounted||(e.e0=function(n){e.selectShow=!0},e.e1=function(n){e.ageShow=!0},e.e2=function(n){e.ageShow=!1}),e.$mp.data=Object.assign({},{$root:{a0:t}})},u=[]},"6b8c":function(e,n,t){"use strict";var i=t("537a"),a=t.n(i);a.a},b545:function(e,n,t){},cc94:function(e,n,t){"use strict";t.r(n);var i=t("ed55"),a=t.n(i);for(var u in i)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(u);n["default"]=a.a},d3e2:function(e,n,t){"use strict";var i=t("b545"),a=t.n(i);a.a},eafb:function(e,n,t){"use strict";(function(e,n){var i=t("4ea4");t("55e5");i(t("66fd"));var a=i(t("4479"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(a.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},ed55:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={onLoad:function(e){this.id=e.id||"",e.id&&this.getLodger()},onReady:function(){this.$refs.uForm.setRules(this.rules)},data:function(){var e=this;return{id:"",selectShow:!1,ageShow:!1,form:{name:"",type:"0",typeName:"身份证",idnumber:"",mobile:"",nums:"",child_age:"",ageList:[]},agelist:[{name:"0",checked:!1,disabled:!1},{name:"1",checked:!1,disabled:!1},{name:"2",checked:!1,disabled:!1},{name:"3",checked:!1,disabled:!1},{name:"4",checked:!1,disabled:!1},{name:"5",checked:!1,disabled:!1},{name:"6",checked:!1,disabled:!1},{name:"7",checked:!1,disabled:!1},{name:"8",checked:!1,disabled:!1},{name:"9",checked:!1,disabled:!1},{name:"10",checked:!1,disabled:!1},{name:"11",checked:!1,disabled:!1},{name:"12",checked:!1,disabled:!1},{name:"13",checked:!1,disabled:!1},{name:"14",checked:!1,disabled:!1},{name:"15",checked:!1,disabled:!1}],rules:{name:[{required:!0,message:"请填写姓名",trigger:["change","blur"]}],idnumber:[{required:!0,message:"请填写证件号码",trigger:["change","blur"]},{validator:function(n,t,i){return 0!=e.form.type||e.$u.test.idCard(t)},message:"身份证号码不正确",trigger:["change","blur"]},{validator:function(n,t,i){return 1!=e.form.type||(/^[a-zA-Z]{5,17}$/.test(t)||/^[a-zA-Z0-9]{5,17}$/.test(t))},message:"护照格式不正确",trigger:["change","blur"]},{validator:function(n,t,i){return 2!=e.form.type||/^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(t)},message:"港澳通行证格式不正确",trigger:["change","blur"]},{validator:function(n,t,i){return 3!=e.form.type||(/^[0-9]{8}$/.test(t)||/^[0-9]{10}$/.test(t))},message:"台湾通行证格式不正确",trigger:["change","blur"]}],mobile:[{validator:function(n,t,i){return!t||e.$u.test.mobile(t)},message:"手机号码格式不正确",trigger:["change","blur"]}]},selectList:[{value:"0",label:"身份证"},{value:"1",label:"护照"},{value:"2",label:"港澳通行证"},{value:"3",label:"台胞证"}]}},methods:{getLodger:function(){var e=this;this.$api.getLodger({id:this.id}).then((function(n){if(1==n.code){e.form.name=n.data.name,e.form.idnumber=n.data.idnumber,e.form.mobile=n.data.mobile;var t=e.selectList.find((function(e){return e.value==n.data.type}));t&&(e.form.type=t.value,e.form.typeName=t.label)}else e.$u.toast(n.msg)}))},submit:function(){this.form.ageList=[];for(var e=0;e<this.agelist.length;e++)1==this.agelist[e].checked&&this.form.ageList.push(this.agelist[e].name);this.form.child_age=this.form.ageList.join(),this.ageShow=!1},checkboxGroupChange:function(e){},checkboxChange:function(e){},selectConfirm:function(e){var n=this;e.map((function(e,t){n.form.type=e.value,n.form.typeName=e.label}))},ageConfirm:function(e){var n=this;e.map((function(e,t){n.form.childAge=e.value}))},priceChange:function(e){},whenChanged:function(e){this.options=e},confirm:function(){var n=this;this.$refs.uForm.validate((function(t){t&&(n.form.id=n.id,n.$api.addOrEditLodger(n.form).then((function(t){n.$u.toast(t.msg),1==t.code&&setTimeout((function(){e.navigateBack({delta:1})}),1500)})))}))}}};n.default=t}).call(this,t("543d")["default"])}},[["eafb","common/runtime","common/vendor"]]]);