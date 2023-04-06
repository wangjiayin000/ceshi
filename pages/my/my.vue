<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="个人中心" :border-bottom="false"></fa-navbar>
		<!-- 会员中心 -->
		<view class="u-p-t-30 u-p-b-50 home" :style="[{ backgroundColor: theme.bgColor || '#374486' }]">
			<view class="userinfo">
				<block v-if="vuex_token">
					<u-avatar size="120" :show-sex="true" :sex-icon="vuex_user.gender == 1 ? 'man' : 'woman'"
						:src="url || vuex_user.avatar" @click="chooseAvatar"></u-avatar>
					<view class="u-skeleton-fillet u-m-t-10 u-p-l-80 u-p-r-80 u-line-1">{{ vuex_user.nickname || '' }}
					</view>
					<view class="u-skeleton-fillet u-m-t-10 u-p-l-80 u-p-r-80 u-line-2">
						{{ vuex_user.bio || '这家伙很懒，什么也没写！' }}</view>
				</block>
				<block v-else>
					<u-avatar size="120" src="0"></u-avatar>
					<view class="u-m-t-30">
						<u-button hover-class="none" size="mini" @click="goPage('/pages/login/mobilelogin')">立即登录
						</u-button>
					</view>
				</block>
			</view>
			<view class="corrugated">
				<view class="wave-top wave-item" :style="[{ backgroundImage: 'url(' + wavetop + ')' }]"></view>
				<view class="wave-middle wave-item" :style="[{ backgroundImage: 'url(' + wavemiddle + ')' }]"></view>
				<view class="wave-bottom wave-item" :style="[{ backgroundImage: 'url(' + wavebottom + ')' }]"></view>
			</view>
		</view>
		<!-- 我的订单 -->
		<!-- 常用功能 -->
		<view class="mine-ordersss">
			<view class="order-top u-flex u-row-between">
				<view class="">
					房间订单
				</view>
				<view class="u-flex "  @click="goPage('/pages/order/houseorder',true)">
					<view class="u-light-color u-font-24">
						全部订单
					</view><u-icon name="arrow-right" color="#cccccc" size="24"></u-icon>
				</view>
			</view>
			<view class="border-e u-m-t-16"></view>
			<view class="order-box u-flex u-row-between  u-m-t-16 u-font-24">
				
				<view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="goPage('/pages/order/houseorder?status=1',true)">
					<image src="https://lvyouchongqing.rchz.top/image/daishiyong.png" mode=""></image>
					<text class="u-m-t-16 f24">待使用</text>
				</view> <!--  -->
				<view class="box-image u-flex-col u-row-center u-col-center col-center" @click="goPage('/pages/order/houseorder?status=2',true)">
					<image src="https://lvyouchongqing.rchz.top/image/fuwuzhong.png" mode=""></image>
					<text class="u-m-t-16 f24">服务中</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center col-center" @click="goPage('/pages/order/houseorder?status=3',true)">
					<image src="https://lvyouchongqing.rchz.top/image/daizhifu.png" mode=""></image>
					<text class="u-m-t-16 f24">待支付</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="goPage('/pages/order/houseorder?status=4',true)">
					<image src="https://lvyouchongqing.rchz.top/image/yiwancheng.png" mode=""></image>
					<text class="u-m-t-16 f24">已完成</text>
				</view>
			</view>
		</view>
		
		<!-- 商品订单 -->
		<!-- 常用功能 -->
		<!-- <view class="mine-ordersss">
			<view class="order-top u-flex u-row-between">
				<view class="">
					商品订单
				</view>
				<view class="u-flex "  @click="goPage('/pages/order/goodsorder',true)">
					<view class="u-light-color u-font-24">
						全部订单
					</view><u-icon name="arrow-right" color="#cccccc" size="24"></u-icon>
				</view>
			</view>
			<view class="border-e u-m-t-16"></view>
			<view class="order-box u-flex u-row-between  u-m-t-16 u-font-24">
				
				<view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="goPage('/pages/order/goodsorder?status=1',true)">
					<image src="https://lvyouchongqing.rchz.top/image/daizhifu.png" mode=""></image>
					<text class="u-m-t-16 f24">待付款</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center col-center" @click="goPage('/pages/order/goodsorder?status=2',true)">
					<image src="https://lvyouchongqing.rchz.top/image/daifahuo.png" mode=""></image>
					<text class="u-m-t-16 f24">待发货</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center col-center" @click="goPage('/pages/order/goodsorder?status=3',true)">
					<image src="https://lvyouchongqing.rchz.top/image/daishouhuo.png" mode=""></image>
					<text class="u-m-t-16 f24">待收货</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="goPage('/pages/order/goodsorder?status=5',true)">
					<image src="https://lvyouchongqing.rchz.top/image/yiwancheng.png" mode=""></image>
					<text class="u-m-t-16 f24">已完成</text>  
				</view>
			</view>
		</view> -->
		<!-- 更多功能 -->
		<view class="mine-ordersss">
			<view class="order-top u-flex u-row-between">
				<view class="">
					更多功能
				</view>
			</view>
			<view class="border-e u-m-t-16"></view>
			<view class="order-box u-flex u-row-between  u-m-t-16 u-font-24">
				<!-- <view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="goPage('/pages/score/score',true)">
					<image src="https://lvyouchongqing.rchz.top/image/wodejifen.png" mode=""></image>
					<text class="u-m-t-16 f24">我的积分</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="toSignin">
					<image src="https://lvyouchongqing.rchz.top/image/qiandao.png" mode=""></image>
					<text class="u-m-t-16 f24">每日一签</text>
				</view> -->
				<!-- <view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="goPage('/pages/my/collect',true)"> -->
				<view class="box-image u-flex-col u-row-center u-col-center  col-center" @click="goPage('/pages/my/collect',true)">
					<image src="https://lvyouchongqing.rchz.top/image/shoucang.png" mode=""></image>
					<text class="u-m-t-16 f24">我的收藏</text>
				</view>
				<!-- <view class="box-image u-flex-col u-row-center u-col-center  col-center" >
					<image src="https://lvyouchongqing.rchz.top/image/daishiyong.png" mode=""></image>
					<text class="u-m-t-16 f24">联系客服</text>
				</view> -->
				<view class="box-image u-flex-col u-row-center u-col-center col-center" @click="goPage('/pages/coupon/user',true)">
					<image src="https://lvyouchongqing.rchz.top/image/youhuijuan.png" mode=""></image>
					<text class="u-m-t-16 f24">优惠卷</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center col-center" @click="goPage('/pages/my/profile',true)">
					<image src="https://lvyouchongqing.rchz.top/image/grenziliao.png" mode=""></image>
					<text class="u-m-t-16 f24">个人资料</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center col-center" @click="goPage('/pages/my/release',true)">
					<image src="https://lvyouchongqing.rchz.top/image/qiandao.png" mode=""></image>
					<text class="u-m-t-16 f24">发布</text>
				</view>
				<view class="box-image u-flex-col u-row-center u-col-center col-center" v-if="vuex_token" @click="goPage('out')">
					<image src="https://lvyouchongqing.rchz.top/image/tuichudneglu.png" mode=""></image>
					<text class="u-m-t-16 f24">退出登录</text>
				</view>
				
			</view>
		</view>



		<!-- 统计 -->
		<!-- <view class="u-flex u-text-center u-p-l-30 u-p-r-30 u-p-t-50 u-p-b-50 bg-white">
			<view class="u-flex-4" @click="goPage('/pages/order/houseorder?status=2',true)">
				<view class="u-text-weight u-font-28">					
					<text v-text="(vuex_user.order && vuex_user.order.paid) || 0"></text>
				</view>
				<view class="u-m-t-20">已支付</view>
			</view>
			<view class="u-flex-4 u-border-left u-border-right" @click="goPage('/pages/order/houseorder?status=1',true)">
				<view class="u-text-weight u-font-28"><text v-text="(vuex_user.order && vuex_user.order.created) || 0"></text></view>
				<view class="u-m-t-20">待支付</view>
			</view>
			<view class="u-flex-4" @click="goPage('/pages/order/houseorder?status=3',true)">
				<view class="u-text-weight u-font-28">					
					<text v-text="(vuex_user.order && vuex_user.order.evaluate) || 0"></text>
				</view>
				<view class="u-m-t-20">待评论</view>
			</view>
		</view> -->
		<!-- 导航 -->
		<!-- <view class="u-m-t-30 u-m-b-15">
			<u-cell-group>				
				<u-cell-item icon="order" title="房间订单" @click="goPage('/pages/order/houseorder',true)"></u-cell-item>
				<u-cell-item icon="list" title="商品订单" @click="goPage('/pages/order/goodsorder',true)"></u-cell-item>
				<u-cell-item icon="integral-fill" title="我的积分" @click="goPage('/pages/score/score',true)"></u-cell-item>
				<u-cell-item icon="pushpin-fill" title="每日一签" @click="toSignin"></u-cell-item>				
				<u-cell-item icon="heart-fill" title="我的收藏" @click="goPage('/pages/my/collect',true)"></u-cell-item>
				<u-cell-item icon="edit-pen" title="意见反馈" @click="goPage('/pages/my/feedback',true)"></u-cell-item>
				<u-cell-item icon="account-fill" title="个人资料" @click="goPage('/pages/my/profile',true)"></u-cell-item>
				<u-cell-item icon="coupon" title="我的优惠券" @click="goPage('/pages/coupon/user',true)"></u-cell-item>
				<u-cell-item icon="backspace" v-if="vuex_token" title="退出登录" @click="goPage('out')"></u-cell-item>
			</u-cell-group>
		</view> -->
		<u-top-tips ref="uTips" :navbar-height="statusBarHeight + navbarHeight"></u-top-tips>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
	import {
		avatar
	} from '@/common/fa.mixin.js';
	export default {
		mixins: [avatar],
		computed: {
			wavetop() {
				return this.$u.http.config.baseUrl + '/assets/addons/booking/img/wave-top.png';
			},
			wavemiddle() {
				return this.$u.http.config.baseUrl + '/assets/addons/booking/img/wave-mid.png';
			},
			wavebottom() {
				return this.$u.http.config.baseUrl + '/assets/addons/booking/img/wave-bot.png';
			},
			isBind() {
				return false;
			}
		},
		onShow() {
			if (this.vuex_token) {
				this.getUserIndex();
			} else {
				this.$u.vuex('vuex_user', {});
			}
			//移除事件监听
			uni.$off('uAvatarCropper', this.upload);
		},
		data() {
			return {
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				url: '',
				form: {
					avatar: ''
				}
			};
		},
		methods: {
			getUserIndex: async function() {
				let res = await this.$api.getUserIndex();
				console.log('获取的数据',res);
				uni.stopPullDownRefresh();
				if (res.code == 1) {
					this.$u.vuex('vuex_user', res.data.userInfo || {});
				} else {
					this.$u.toast(res.msg);
					return;
				}
			},
			toSignin() {
				if (!this.vuex_user.is_install_signin) {
					this.$refs.uTips.show({
						title: '请先安装会员签到插件插件或启用该插件',
						type: 'error',
						duration: '3000'
					});

					return;
				}
				this.goPage('/pages/signin/signin', 1);
			},
			editAvatar: async function() {
				let res = await this.$api.goUserAvatar({
					avatar: this.form.avatar
				});
				
				console.log(res,'另一个获取的数据');
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			if (this.vuex_token) {
				this.getUserIndex();
			} else {
				uni.stopPullDownRefresh();
				this.$u.toast('请先登录')
				this.$u.vuex('vuex_user', {});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f4f6f8;
	}
	
	.border-e {
		border-bottom: 1rpx solid #E7E7E7;
	}

	.mine-ordersss {
		margin:   32rpx;
		padding: 32rpx;
		background: #FFFFFF;
		border-radius: 16rpx;

		.order-top {
			height: 44rpx;
		}

		.order-box {
			display: grid;
			grid-template-columns: repeat(4, 104rpx);
			justify-content: space-between;

			.box-image {
				width: 120rpx;
				height: 104rpx;
				margin-bottom: 20rpx;

				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}


	.home {
		position: relative;

		.userinfo {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 30rpx 0;
			z-index: 100;
			height: 310rpx;

			.u-skeleton-fillet {
				color: #ffffff;
			}
		}

		.corrugated {
			bottom: -2rpx;
			left: 0;
			position: absolute;
			width: 100%;
			height: 50%;
			overflow: hidden;
			z-index: 0;

			.wave-item {
				position: absolute;
				width: 200%;
				left: 0;
				height: 200rpx;
				background-repeat: repeat no-repeat;
				background-position: 0 bottom;
				transform-origin: center bottom;
			}

			.wave-top {
				opacity: 0.5;
				animation: wave-animation 3s;
				animation-delay: 1s;
				background-size: 50% 60rpx;
				z-index: 15;
			}

			.wave-middle {
				opacity: 0.75;
				animation: wavemove 10s linear infinite;
				background-size: 50% 80rpx;
				z-index: 10;
			}

			.wave-bottom {
				animation: wavemove 15s linear infinite;
				background-size: 50% 45rpx;
				z-index: 5;
			}
		}
	}

	@keyframes wavemove {
		0% {
			transform: translateX(0) translateZ(0) scaleY(1);
		}

		50% {
			transform: translateX(-25%) translateZ(0) scaleY(0.55);
		}

		100% {
			transform: translateX(-50%) translateZ(0) scaleY(1);
		}
	}
</style>
