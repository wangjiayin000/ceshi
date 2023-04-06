const upload = async function(vm, {
		// #ifdef APP-PLUS || H5
		files,
		// #endif
		// #ifdef H5
		file,
		// #endif
		// #ifdef MP-ALIPAY
		fileType,
		// #endif
		filePath,
		name,
		formData
	}) {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask: true,
			title: '上传中'
		});
		let data = {
			url: vm.vuex_config.upload.uploadurl,			
			header: {
				token: vm.vuex_token || '',
				uid: vm.vuex_user.id || 0
			},
			name: 'file',
			complete: function() {
				uni.hideLoading();
			},
			success: uploadFileRes => {
				try {
					var res = uploadFileRes.data;
					if (vm.$u.test.jsonString(res)) {						
						resolve(JSON.parse(res))						
					}
					if (vm.$u.test.object(res)) {
						resolve(res)
					}
				} catch (e) {
					reject(uploadFileRes.data);
				}
			},
			fail: (e) => {
				reject(e);
			}
		};
		// #ifdef H5
		//有文件对象，一般是H5
		if(file){
			data.file = file;
		}
		// #endif
		//文件路径
		if(filePath){
			data.filePath = filePath;
		}		
		let isObj = vm.$u.test.object(vm.vuex_config.upload.multipart);
		if (isObj && formData) {					
			data.formData = Object.assign(formData,vm.vuex_config.upload.multipart);			
		}else if(isObj){
			data.formData = vm.vuex_config.upload.multipart;
		}else if(formData){
			data.formData = formData;
		}
		uni.uploadFile(data);
	})

}

const install = (Vue, vm) => {

	vm.$api.config 				= async (params = {}) => await vm.$u.get('/addons/booking/common/init', params);
	vm.$api.mapSearch 			= async (params = {}) => await vm.$u.get('/addons/booking/common/mapSearch', params);
	vm.$api.getWxCode 			= async (params = {}) => await vm.$u.post('/addons/booking/common/getWxCode', params);
	vm.$api.goUpload 	  		= async (params = {}) => await upload(vm, params);
	vm.$api.feedback 			= async (params = {}) => await vm.$u.post('/addons/booking/common/feedback', params);
	vm.$api.getCondition		= async (params = {}) => await vm.$u.get('/addons/booking/house/condition', params);
	vm.$api.houseList			= async (params = {}) => await vm.$u.get('/addons/booking/house/houseList', params);
	vm.$api.houseSelect			= async (params = {}) => await vm.$u.get('/addons/booking/house/houseSelect', params);
	vm.$api.houseDetail			= async (params = {}) => await vm.$u.get('/addons/booking/house/detail', params);
	vm.$api.houseBooking		= async (params = {}) => await vm.$u.post('/addons/booking/house/booking', params);
	vm.$api.lodgerList			= async (params = {}) => await vm.$u.get('/addons/booking/house/lodgerList', params);
	vm.$api.delLodger			= async (params = {}) => await vm.$u.post('/addons/booking/house/delLodger', params);
	vm.$api.getLodger			= async (params = {}) => await vm.$u.get('/addons/booking/house/getLodger', params);
	vm.$api.getMonthHouse		= async (params = {}) => await vm.$u.get('/addons/booking/house/monthHouse', params);
	vm.$api.addOrEditLodger		= async (params = {}) => await vm.$u.post('/addons/booking/house/addOrEditLodger', params);
	vm.$api.addOrder			= async (params = {}) => await vm.$u.post('/addons/booking/order/add', params);
	vm.$api.orderDetail			= async (params = {}) => await vm.$u.get('/addons/booking/order/detail', params);
	vm.$api.orderList			= async (params = {}) => await vm.$u.get('/addons/booking/order/orderList', params);
	vm.$api.orderPay			= async (params = {}) => await vm.$u.post('/addons/booking/order/pay', params);
	vm.$api.orderCancel			= async (params = {}) => await vm.$u.post('/addons/booking/order/cancel', params);
	vm.$api.orderCheckout		= async (params = {}) => await vm.$u.post('/addons/booking/order/orderCheckout', params);
	vm.$api.receiving			= async (params = {}) => await vm.$u.post('/addons/booking/order/receiving', params);
	vm.$api.commentList			= async (params = {}) => await vm.$u.get('/addons/booking/comment/commentList', params);
	vm.$api.addComment			= async (params = {}) => await vm.$u.post('/addons/booking/comment/addComment', params);
	vm.$api.optionCollect		= async (params = {}) => await vm.$u.post('/addons/booking/collect/optionCollect', params);
	vm.$api.collectList	    	= async (params = {}) => await vm.$u.get('/addons/booking/collect/collectList', params);
	vm.$api.storeList	    	= async (params = {}) => await vm.$u.get('/addons/booking/store/storeList', params);
	vm.$api.storeDetail	    	= async (params = {}) => await vm.$u.get('/addons/booking/store/detail', params);
	vm.$api.getDefaultStore	    = async (params = {}) => await vm.$u.get('/addons/booking/store/defaultStore', params);
	vm.$api.cutStore	    	= async (params = {}) => await vm.$u.post('/addons/booking/store/cutStore', params);
	vm.$api.teasingTag 			= async (params = {}) => await vm.$u.get('/addons/booking/teasing/teasingTag', params);
	vm.$api.teasingList 		= async (params = {}) => await vm.$u.get('/addons/booking/teasing/teasingList', params);
	vm.$api.addTeasing 			= async (params = {}) => await vm.$u.post('/addons/booking/teasing/add', params);
	
	vm.$api.wifiList 			= async (params = {}) => await vm.$u.post('/addons/booking/wifi/wifiList', params);
	vm.$api.couponList 			= async (params = {}) => await vm.$u.get('/addons/booking/coupon/couponList', params);
	vm.$api.couponDetail 		= async (params = {}) => await vm.$u.get('/addons/booking/coupon/couponDetail', params);
	vm.$api.drawCoupon 			= async (params = {}) => await vm.$u.post('/addons/booking/coupon/drawCoupon', params);
	vm.$api.myCouponList 		= async (params = {}) => await vm.$u.get('/addons/booking/coupon/myCouponList', params);
		
	
	vm.$api.getUserIndex 	  	= async (params = {}) => await vm.$u.get('/addons/booking/user/index', params);
	vm.$api.getUserProfile 	  	= async (params = {}) => await vm.$u.post('/addons/booking/user/profile', params);	
	vm.$api.goUserLogout 	  	= async (params = {}) => await vm.$u.get('/addons/booking/user/logout', params);
	vm.$api.goUserAvatar 	  	= async (params = {}) => await vm.$u.post('/addons/booking/user/avatar', params);
	vm.$api.getSigned 	  	  	= async (params = {}) => await vm.$u.post('/addons/booking/user/getSigned',params);
	
	vm.$api.subscribe 		  = async (params = {}) => await vm.$u.post('/addons/booking/ajax/subscribe',params);
	// 登录	
	vm.$api.getEmsSend 		  	= async (params = {}) => await vm.$u.post('/addons/booking/ems/send', params);
	vm.$api.getSmsSend 		  	= async (params = {}) => await vm.$u.post('/addons/booking/sms/send', params);
	vm.$api.goLogin 		  	= async (params = {}) => await vm.$u.post('/addons/booking/login/login', params);
	vm.$api.mobilelogin 	  	= async (params = {}) => await vm.$u.post('/addons/booking/login/mobilelogin', params);
	vm.$api.goRegister 		  	= async (params = {}) => await vm.$u.post('/addons/booking/login/register', params);
	vm.$api.goResetpwd 		  	= async (params = {}) => await vm.$u.post('/addons/booking/login/resetpwd', params);
	vm.$api.gowxLogin 		  	= async (params = {}) => await vm.$u.post('/addons/booking/login/wxLogin', params);
	vm.$api.goAppLogin 		  	= async (params = {}) => await vm.$u.post('/addons/booking/login/appLogin', params);
	vm.$api.getWechatMobile  	= async (params = {}) => await vm.$u.post('/addons/booking/login/getWechatMobile', params);
	
	vm.$api.getAuthUrl 	  	  	= async (params = {}) => await vm.$u.get('/addons/third/api/getAuthUrl', params);
	vm.$api.goAuthCallback 	  	= async (params = {}) => await vm.$u.post('/addons/third/api/callback', params);
	vm.$api.goThirdAccount 	  	= async (params = {}) => await vm.$u.post('/addons/third/api/account', params);
	// 签到	
	vm.$api.signinConfig 	  	= async (params = {}) => await vm.$u.get('/addons/signin/api.index/index',params);
	vm.$api.monthSign 	  	  	= async (params = {}) => await vm.$u.get('/addons/signin/api.index/monthSign',params);
	vm.$api.dosign 	 	      	= async (params = {}) => await vm.$u.post('/addons/signin/api.index/dosign',params);
	vm.$api.fillup 	  		  	= async (params = {}) => await vm.$u.get('/addons/signin/api.index/fillup',params);
	vm.$api.signRank 	 	  	= async (params = {}) => await vm.$u.get('/addons/signin/api.index/rank',params);
	vm.$api.signLog 	  	  	= async (params = {}) => await vm.$u.get('/addons/signin/api.index/signLog',params);
	
	vm.$api.scoreLogs 	  	  	= async (params = {}) => await vm.$u.get('/addons/booking/score/logs',params);
	vm.$api.exchangeList 	  	= async (params = {}) => await vm.$u.get('/addons/booking/score/exchangeList',params);
	vm.$api.exchange 	  	  	= async (params = {}) => await vm.$u.post('/addons/booking/score/exchange',params);
	vm.$api.myExchange 	  	  	= async (params = {}) => await vm.$u.get('/addons/booking/score/myExchange',params);
	
	
	vm.$api.getCategory 	  	= async (params = {}) => await vm.$u.get('/addons/booking/goods/category',params);
	vm.$api.getGoodsIndex 	  	= async (params = {}) => await vm.$u.get('/addons/booking/goods/index',params);
	vm.$api.getGoodsInfo 	  	= async (params = {}) => await vm.$u.get('/addons/booking/goods/detail',params);
	vm.$api.addCart		 	  	= async (params = {}) => await vm.$u.post('/addons/booking/cart/add',params);
	vm.$api.getCartIndex 	  	= async (params = {}) => await vm.$u.post('/addons/booking/cart/index',params);
	vm.$api.setCartNums 	  	= async (params = {}) => await vm.$u.post('/addons/booking/cart/set_nums',params);
	vm.$api.delCart     	  	= async (params = {}) => await vm.$u.post('/addons/booking/cart/del',params);
	vm.$api.cart_nums     	  	= async (params = {}) => await vm.$u.get('/addons/booking/cart/cart_nums',params);
	vm.$api.queryPrice     	  	= async (params = {}) => await vm.$u.post('/addons/booking/house/queryPrice',params);

	
	vm.$api.getDynamic     	  	= async (params = {}) => await vm.$u.get('/addons/carpool/index/getDynamic',params);	
	vm.$api.addDynamic     	  	= async (params = {}) => await vm.$u.post('/addons/carpool/index/addDynamic',params);
}

export default {
	install
}
