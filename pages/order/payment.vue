<template>
	<view class="u-skeleton">
		<!-- 顶部导航 -->
		<fa-navbar title="订单支付" :border-bottom="false" :backIndex="backIndex"></fa-navbar>
		<view class="u-p-30 bg-white u-m-b-30">
			订单编号：
			<text class="u-tips-color">{{ order.orderid }}</text>
		</view>
		<view class="u-p-30 u-flex bg-white" v-if="order.type == 0">
			<image class="thumb u-skeleton-rect" :src="order.source_data && order.source_data.images[0]"></image>
			<view class="u-m-l-20 order">
				<view class="u-skeleton-rect u-line-2">{{ order.source_data && order.source_data.name }}</view>
				<view class="u-skeleton-rect u-line-1 u-flex u-tips-color">
					<text>房型:{{ order.source_data && order.source_data.type && order.source_data.type.name }}</text>
					<text class="u-m-l-10 u-m-r-10 u-font-40">·</text>
					<text>面积:{{ order.source_data && order.source_data.area }}㎡</text>
					<text class="u-m-l-10 u-m-r-10 u-font-40">·</text>
					<text>宜住{{ order.source_data && order.source_data.livenums }}人</text>
				</view>
				<view class="price u-skeleton-rect">￥{{ order.amount }}</view>
			</view>
		</view>
		<view class="list" v-if="order.type == 1">
			<view class="item u-p-30 u-flex u-col-center" v-for="(item, index) in order.source_data" :key="index">
				<image :src="item.image_text" mode=""></image>
				<view class="u-flex-1 right">
					<view class="u-line-2">{{ item.name }}</view>
					<view class="u-flex u-row-between u-m-t-15">
						<text class="price u-font-30">{{ item.price }}</text>
						<text class="u-tips-color">×{{ item.nums }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="u-p-30 bg-white u-text-right u-border-top">
			<text v-if="order.coupon_amount > 0" class="u-tips-color u-m-r-30">优惠：￥{{ order.coupon_amount }}</text>
			合计：
			<text class="price">￥{{ order.amount }}</text>
		</view>
		<view class="bg-white u-m-t-30">
			<u-cell-group title="支付方式">
				<u-radio-group v-model="paytype" @change="radioGroupChange">
					<view class="paytype">
						<u-cell-item
							:icon-style="{ color: '#20D029' }"
							@click="paytype = 'wechat'"
							:arrow="false"
							icon="weixin-circle-fill"
							title="微信支付"
							hover-class="cell-hover-class"
						>
							<u-radio slot="right-icon" name="wechat" :active-color="theme.bgColor"></u-radio>
						</u-cell-item>

						<!-- #ifndef MP-WEIXIN -->
						<u-cell-item
							:icon-style="{ color: '#00A1E9' }"
							@click="paytype = 'alipay'"
							:arrow="false"
							icon="zhifubao-circle-fill"
							title="支付宝支付"
							hover-class="cell-hover-class"
						>
							<u-radio slot="right-icon" name="alipay" :active-color="theme.bgColor"></u-radio>
						</u-cell-item>
						<!-- #endif -->
					</view>
				</u-radio-group>
			</u-cell-group>
		</view>
		<u-gap height="180" bg-color="#f4f6f9"></u-gap>
		<view class="payment bg-white">
			<u-button type="primary" hover-class="none" :custom-style="{ backgroundColor: theme.bgColor, color: theme.color }" shape="circle" @click="submit">
				立即支付
			</u-button>
		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.backIndex = parseInt(e.index) || 1;
		this.id = e.id || '';
		this.getOrder();
	},
	data() {
		return {
			backIndex: 1,
			paytype: 'wechat',
			id: '',
			order: {},
			loading: true // 是否显示骨架屏组件
		};
	},
	methods: {
		radioGroupChange(e) {
			this.paytype = e;
		},
		getOrder() {
			this.$api
				.orderDetail({
					id: this.id
				})
				.then(res => {
					if (res.code) {
						this.loading = false;
						this.order = res.data;
					} else {
						this.$u.toast(res.msg);
						setTimeout(() => {
							if (res.data.project_id) {
								this.$u.route('/pages/order/order');
							} else {
								uni.navigateBack({
									delta: 1
								});
							}
						}, 2000);
					}
				});
		},
		submit: async function() {
			//#ifdef MP-BAIDU
			this.$u.toast('百度小程序暂时只支持到店付！');
			return;
			// #endif

			let param = {
				id: this.id,
				paytype: this.paytype
			};

			// #ifdef MP-WEIXIN
			param.method = 'miniapp';
			// #endif

			// #ifdef H5
			param.method = 'wap';
			if (this.$util.isWeiXinBrowser() && this.paytype == 'wechat') {
				param.method = 'mp';
			} else {
				param.returnurl = window.location.href;
			}
			// #endif

			// #ifdef APP-PLUS
			param.method = 'app';
			param.appid = plus.runtime.appid;
			// #endif

			let res = await this.$api.orderPay(param);

			// #ifdef MP-WEIXIN
			if (res.data == 'bind') {
				this.$u.route('/pages/login/wxlogin');
				return;
			}
			// #endif

			// #ifdef H5
			if (this.$util.isWeiXinBrowser() && res.data == 'bind') {
				this.goAuth();
				return;
			}
			// #endif

			if (!res.code) {
				this.$u.toast(res.msg);
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},1000)
				return;
			}
			// #ifdef MP-WEIXIN
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: res.data.timeStamp,
				nonceStr: res.data.nonceStr,
				package: res.data.package,
				signType: res.data.signType,
				paySign: res.data.paySign,
				success: rest => {
					this.$u.toast('支付成功！');
					wx.requestSubscribeMessage({
						tmplIds: this.vuex_config.tpl_ids,
						complete: res => {
							console.log(res);
							if (res.errMsg == 'requestSubscribeMessage:ok') {
								this.$api.subscribe({ tpl_ids: res, orderid: this.order.orderid }).then(res => {
									console.log(res);
								});
							}
							this.$u.route({
								type: 'redirect',
								url: '/pages/order/houseorder'
							});
						}
					});
				},
				fail: err => {
					if (err.errMsg === 'requestPayment:fail cancel') {
					    this.$u.toast('支付取消');
					} else {
					    this.$u.toast('支付失败');
					}
					console.log(err);
				}
			});
			// #endif

			// #ifdef H5
			if (this.$util.isWeiXinBrowser() && this.paytype == 'wechat') {
				window.WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					{
						appId: res.data.appId, // 公众号名称，由商户传入
						timeStamp: res.data.timeStamp, // 时间戳，自1970年以来的秒数
						nonceStr: res.data.nonceStr, // 随机串
						package: res.data.package,
						signType: res.data.signType, // 微信签名方式：
						paySign: res.data.paySign // 微信签名
					},
					rest => {
						if (rest.err_msg === 'get_brand_wcpay_request:ok') {
							this.$u.toast('支付成功！');
							this.$u.route({
								type: 'redirect',
								url: '/pages/order/houseorder'
							});
						} else if (rest.err_msg === 'get_brand_wcpay_request:cancel') {
							this.$u.toast('取消支付');
						} else {
							this.$u.toast('支付失败');
						}
					}
				);
			} else {
				//URL地址
				if (res.data.toString().match(/^((?:[a-z]+:)?\/\/)(.*)/i)) {
					location.href = res.data;
					return;
				}

				//Form表单
				document.getElementsByTagName('body')[0].innerHTML = res.data;
				let form = document.querySelector('form');
				if (form && form.length > 0) {
					form.submit();
					return;
				}

				//Meta跳转
				let meta = document.querySelector('meta[http-equiv="refresh"]');
				if (meta && meta.length > 0) {
					setTimeout(function() {
						location.href = meta.content.split(/;/)[1];
					}, 300);
					return;
				}
			}

			// #endif

			// #ifdef APP-PLUS
			uni.requestPayment({
				provider: this.paytype == 'alipay' ? 'alipay' : 'wxpay',
				orderInfo: res.data, //微信、支付宝订单数据
				success: function(rest) {
					this.$u.toast('支付成功！');
					this.$u.route({
						type: 'redirect',
						url: '/pages/order/houseorder'
					});
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
			// #endif
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f6f8;
}
</style>
<style lang="scss" scoped>
.thumb {
	width: 200rpx;
	height: 150rpx;
	border-radius: 10rpx;
}

.order {
	height: 150rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 68vw;
}

.paytype {
	width: 100vw;
}

.payment {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 30rpx 80rpx;
	z-index: 1999;
}

.list {
	background-color: #ffffff;
	.item {
		border-bottom: 1px solid #f4f6f8;
		image {
			width: 200rpx;
			height: 155rpx;
			border-radius: 5rpx;
		}
		.right {
			padding: 15rpx;
			height: 155rpx;
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
