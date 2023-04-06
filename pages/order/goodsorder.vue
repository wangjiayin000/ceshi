<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="商品订单" :border-bottom="false"></fa-navbar>
		<view class="wrap" :style="[wrapHeight]">
			<view class="u-tabs-box">
				<u-tabs-swiper
					:activeColor="theme.bgColor"
					ref="tabs"
					:list="list"
					:current="current"
					@change="change"
					:is-scroll="false"
					swiperWidth="750"
				></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(swiper, key) in list" :key="key">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[key].length > 0">
							<view class="order" :class="{ 'u-m-t-30': rid }" v-for="(res, rid) in orderList[key]" :key="res.id">
								<view class="top u-border-bottom">
									<view class="left u-tips-color">
										<text>订单编号:</text>
										<view class="store">{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_text }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.order_goods" :key="index" @click="goPage('/pages/order/goodsdetail?id=' + res.id)">
									<view class="left"><image :src="item.image_text" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.name }}</view>
										<!-- <view class="type">{{ item.type }}</view> -->
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.price) }}
											<text class="decimal">.{{ priceDecimal(item.price) }}</text>
										</view>
										<view class="number">×{{ item.nums }}</view>
									</view>
								</view>
								<view class="u-tips-color u-p-t-20" v-if="res.delivery_time">配送时间:{{ res.delivery_time | date('yyyy-mm-dd hh:MM:ss') }}</view>
								<view class="total">
									共{{ res.nums }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(res.amount) }}.
										<text class="decimal">{{ priceDecimal(res.amount) }}</text>
									</text>
								</view>
								<view class="bottom" v-if="!['canceled', 'expired', 'finished', 'refunding'].includes(res.status)">
									<view
										class="logistics btn"
										@click="goPage('/pages/order/payment?id=' + res.id)"
										:style="[{ backgroundColor: theme.bgColor, color: theme.color }]"
										v-if="res.status == 'created'"
									>
										立即支付
									</view>
									<view class="exchange btn" v-if="['created', 'paid'].includes(res.status)" @click="(show = true), (order_index = rid)">
										取消订单
									</view>
									<view class="shipped btn" v-if="res.status == 'shipped'" @click="shipped(rid)">确认收到</view>
									<view class="evaluate btn" v-if="res.status == 'evaluate'" @click="goPage('/pages/remark/remark?id=' + res.id)">立即评价</view>
								</view>
							</view>
							<view class="u-p-30"><u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore></view>
						</view>
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="../../static/image/order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">
										<u-button
											size="medium"
											:custom-style="{ width: '220rpx', backgroundColor: theme.bgColor, color: theme.color }"
											shape="circle"
											@click="goPage('/pages/goods/goods')"
										>
											随便逛逛~
										</u-button>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<u-modal v-model="show" content="确认取消订单吗？" @confirm="cancel" :show-cancel-button="true"></u-modal>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
export default {
	data() {
		return {
			is_first: false,
			orderList: [[], [], [], [], [], []],
			list: [
				{
					name: '全部',
					status: ''
				},
				{
					name: '待付款',
					status: 'created'
				},
				{
					name: '待发货',
					status: 'paid'
				},
				{
					name: '待收货',
					status: 'shipped'
				},
				{
					name: '待评价',
					status: 'evaluate'
				},
				{
					name: '已完成',
					status: 'finished'
				}
			],
			current: 0,
			swiperCurrent: 0,
			dx: 0,
			order_index: 0,
			show: false,
			loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
			page: [1, 1, 1, 1, 1, 1]
		};
	},
	onLoad(e) {
		this.getOrderList(0);
		this.current = e.status || 0;
	},
	onShow() {
		if (this.is_first) {
			this.orderList[this.current] = [];
			this.getOrderList(this.current);
		}
		this.is_first = true;
	},
	computed: {
		// 转换字符数值为真正的数值
		navbarHeight() {
			// #ifdef H5
			return 44;
			// #endif
			// #ifdef APP-PLUS
			return 44 + systemInfo.statusBarHeight;
			// #endif
			// #ifdef MP
			// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			return height + systemInfo.statusBarHeight;
			// #endif
		},
		wrapHeight() {			
			return {
				height: 'calc(100vh - ' + this.navbarHeight + 'px)'
			};
		},
		// 价格小数
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	watch: {
		current(newValue, oldValue) {
			this.getOrderList(newValue, 'init');
		}
	},
	methods: {
		getOrderList(current, type) {
			if (type == 'init' && this.orderList[current].length > 0) {
				return;
			}
			this.$api
				.orderList({
					page: this.page[current],
					status: this.list[current].status,
					type: 1
				})
				.then(res => {
					if (res.code) {
						res.data.data.forEach(item => {
							this.orderList[current].push(item);
						});
						if (res.data.current_page < res.data.last_page) {
							this.loadStatus.splice(this.current, 1, 'loadmore');
						} else {
							this.loadStatus.splice(this.current, 1, 'nomore');
						}
					}
				});
		},
		cancel() {
			this.$api.orderCancel({ id: this.orderList[this.current][this.order_index].id }).then(res => {
				this.$u.toast(res.msg);
				if (res.code) {
					this.orderList[this.current] = [];
					this.getOrderList(this.current);
				}
			});
		},
		shipped(index) {
			this.$api.receiving({ id: this.orderList[this.current][index].id }).then(res => {
				this.$u.toast(res.msg);
				if (res.code) {
					this.orderList[this.current] = [];
					this.getOrderList(this.current);
				}
			});
		},
		reachBottom() {
			// 此tab为空数据
			if (this.loadStatus[this.current] == 'loadmore') {
				this.page[this.current] = this.page[this.current] + 1;
				this.loadStatus.splice(this.current, 1, 'loading');
				this.getOrderList(this.current);
			}
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.page-box {
	padding-top: 30rpx;
	display: flex;
	align-items: center;
	flex-direction: column;
}
.order {
	width: 710rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 30rpx;
	font-size: 28rpx;
	.top {
		padding-bottom: 20rpx;
		margin-bottom: 10rpx;
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			font-size: 25rpx;
			.store {
				margin: 0 10rpx;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1px solid #f4f6f8;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 150rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: flex-end;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
			margin-left: 30rpx;
		}
		.shipped {
			color: $u-type-success;
			border-color: $u-type-success;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
.centre {
	text-align: center;
	padding: 200rpx 0;
	font-size: 32rpx;
	image {
		width: 400rpx;
		height: 400rpx;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
