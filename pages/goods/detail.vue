<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="商品详情" :border-bottom="false"></fa-navbar>
		<u-swiper :list="info.images" height="400" border-radius="0"></u-swiper>
		<view class="bg-white goods-detail">
			<view class="title u-font-30 u-p-30">{{ info.name }}</view>
			<view class="u-flex u-p-30 u-border-top u-row-between">
				<view class="">
					<text class="price u-font-40">￥{{ info.price }}</text>
					<text class="market_price u-tips-color">￥{{ info.market_price }}</text>
				</view>
				<view class="u-flex">
					
					<view class="u-text-center" @click="showShare = true">
						<u-icon size="35" name="share" :color="theme.bgColor"></u-icon>
						<view class="u-font-22">分享</view>
					</view>					
					<view class="u-text-center u-m-l-30" @click="optionCollect" :style="{ color: info.is_collect ? theme.bgColor : '#333' }">
						<u-icon size="35" :name="info.is_collect ? 'star-fill' : 'star'" :color="theme.bgColor"></u-icon>
						<view class="u-font-22">{{ info.is_collect ? '已收藏' : '收藏' }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="bg-white u-m-t-30">
			<view class="u-p-30">详情</view>
			<view class="u-p-l-30 u-p-r-30 u-p-b-30"><u-parse :html="info.content"></u-parse></view>
		</view>

		<view class="bg-white u-m-t-30">
			<view class="u-p-30">评价</view>
			<view class="u-flex u-row-center fa-emmpty u-p-b-30" v-if="noComment(info.comment)">
				<image src="../../static/image/comment.png" mode="aspectFill"></image>
				<view class="u-tips-color">暂无更多评论~</view>
			</view>
			<view class="comment u-border-bottom" v-for="(res, index) in info.comment" :key="res.id">
				<view class="left"><image :src="res.user && res.user.avatar" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top" :style="[{ color: theme.bgColor }]">
						<view class="name">{{ res.user && res.user.nickname }}</view>
						<view class="like">
							<view class="num">{{ res.grade }}</view>
						</view>
					</view>
					<view class="content">{{ res.comment }}</view>
					<view class="reply-box">
						<view class="item" v-for="(item, index) in res.replay" :key="index">
							<view class="username">{{ item.manage.nickname }}</view>
							<view class="text">{{ item.comment }}</view>
						</view>
						<view class="all-reply" :style="[{ color: theme.bgColor }]" v-if="res.replay.length">共{{ res.replay.length }}条回复</view>
					</view>
					<view class="bottom">{{ res.createtime | timeFrom('yyyy-mm-dd') }}</view>
				</view>
			</view>
			<view class="u-text-center u-p-30 u-tips-color" v-if="!noComment(info.comment)" @click="goPage('/pages/remark/lists?type=1&source_id=' + info.id)">
				<text class="u-m-r-10">更多评论</text>
				<u-icon name="arrow-right-double"></u-icon>
			</view>
		</view>

		<u-gap height="150" bg-color="#f4f6f9"></u-gap>
		<!-- 底部导航条 -->
		<view class="footer-bar u-flex u-row-between u-border-top">
			<view class="u-flex-1 u-text-center" @click="goIndexPage">
				<view class=""><u-icon name="home" size="35"></u-icon></view>
				<view>首页</view>
			</view>
			<view class="u-flex-1 u-text-center" style="position: relative" @click="goPage('/pages/goods/cart')">
				<fa-u-badge v-if="cart_nums" type="error" :offset="[-20, -70]" :count="cart_nums"></fa-u-badge>
				<view class=""><u-icon name="shopping-cart" size="35"></u-icon></view>
				<view class="">购物车</view>
			</view>
			<view class="u-flex u-row-between u-flex-1">
				<view class="u-m-l-15">
					<u-button
						size="medium"
						hover-class="none"
						:custom-style="{ width: '25vw', backgroundColor: '#ffba0d', color: theme.color }"
						shape="circle"
						@click="addCart(1)"
					>
						加入购物车
					</u-button>
				</view>
				<view class="u-m-l-20">
					<u-button
						size="medium"
						hover-class="none"
						:custom-style="{ width: '25vw', backgroundColor: theme.bgColor, color: theme.color }"
						shape="circle"
						@click="addCart(2)"
					>
						立即购买
					</u-button>
				</view>
			</view>
		</view>
		<!-- 分享 -->
		<view class="" v-if="info.id">
			<fa-share :title="info.name" :summary="info.intro" :imageUrl="info.image_text" v-model="showShare" @shares="showPoster = true"></fa-share>
			<fa-poster v-model="showPoster" :info="info"></fa-poster>
		</view>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.id = e.id || '';
		let invite_id = e.invite_id || '';
		if (e.scene) {
			const scene = decodeURIComponent(e.scene);
			let id = this.$util.getQueryString('id', scene);
			if (id) {
				this.id = id;
			}
			invite_id = this.$util.getQueryString('invite_id', scene) || invite_id;
		}
		if (invite_id) {
			this.$u.vuex('vuex_invite_id', invite_id);
		}
		this.getGoodsInfo();
	},
	onShow() {
		if (this.vuex_token) {
			this.getCartNums();
		}
	},
	computed: {
		noComment() {
			return item => {
				if (!item) {
					return true;
				} else if (!item.length) {
					return true;
				} else {
					return false;
				}
			};
		}
	},
	data() {
		return {
			showShare:false,
			showPoster:false,
			info: {},
			id: '',
			cart_nums: 0
		};
	},
	methods: {
		getGoodsInfo() {
			this.$api.getGoodsInfo({ id: this.id }).then(res => {
				if (res.code == 1) {
					this.info = res.data;
					this.info.image = this.info.image_text;
					// #ifdef MP-WEIXIN
					this.$u.mpShare = {
						title: res.data.name,
						imageUrl: res.data.image_text
					};
					// #endif
				} else {
					this.$u.toast(res.msg);
					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 1500);
				}
			});
		},
		goIndexPage() {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		},
		getCartNums() {
			this.$api.cart_nums().then(res => {
				if (res.code) {
					this.cart_nums = res.data || 0;
				}
			});
		},
		//加入购物车
		addCart(type) {
			//立即购买，加入购物车，即提交订单
			this.$api.addCart({ goods_id: this.id, sceneval: type }).then(res => {
				this.$u.toast(res.msg);
				if (res.code == 1 && type == 2) {
					//立即购买，
					this.goPage('/pages/goods/order?sceneval=2&id=' + res.data);
				} else {
					this.getCartNums();
				}
			});
		},
		optionCollect() {
			this.$api
				.optionCollect({
					source_id: this.id,
					type: 1
				})
				.then(res => {
					this.$u.toast(res.msg);
					if (res.code) {
						this.$set(this.info, 'is_collect', !this.info.is_collect);
					}
				});
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
.goods-detail {
	.market_price {
		text-decoration: line-through;
		margin-left: 15rpx;
	}
}
.footer-bar {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 120rpx;
	background-color: #ffffff;
	padding: 0 30rpx;
	z-index: 9999;
}

.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.like {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 2rpx $u-border-color;
				.username {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20rpx;
			display: flex;
			font-size: 24rpx;
			color: #9a9a9a;
		}
	}
}
</style>
