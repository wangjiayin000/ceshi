<template>
	<view class="">
		<!-- 顶部导航 -->
		<fa-navbar title="详情" :border-bottom="false"></fa-navbar>
		<view class="u-skeleton">
			<scroll-view
				:scroll-into-view="into"
				scroll-y="true"
				class="scroll-Y"
				:style="[{ height: '94vh', marginTop: marginTop + 'rpx', }]"
				@scrolltoupper="upper"
				@scrolltolower="lower"
				@scroll="scrolls"
			>
				<view class="u-skeleton-fillet">
					<view class="collect u-flex u-row-center u-col-bottom" @click.stop="collect(info.id, info.isCollect)">
						<u-icon :name="!info.isCollect ? 'heart' : 'heart-fill'" :color="!info.isCollect ? '#ffffff' : '#ff393c'" size="40"></u-icon>
					</view>
					<u-swiper :list="info.images" height="400" border-radius="0"></u-swiper>
				</view>
				<view class="tabs-container u-border-bottom" :style="[stickyStyle]">
					<!-- #ifndef MP-BAIDU -->
					<u-tabs :list="tabList" height="90" :active-color="theme.bgColor" :is-scroll="false" :current="current" @change="change"></u-tabs>
					<!-- #endif -->
					<!-- #ifdef MP-BAIDU -->
					<fa-u-tabs :list="tabList" height="90" :active-color="theme.bgColor" :is-scroll="false" :current="current" @change="change"></fa-u-tabs>
					<!-- #endif -->
				</view>
				<view class="detail u-border-top">
					<view class="" id="intro">
						<view class="bg-white">
							<view class="u-p-30"><text class="title u-font-35" v-text="info.name"></text></view>
							<view class="u-flex u-p-30 u-row-between" style="background-color: #F4F6F8;">
								<view class="u-flex u-flex-wrap u-skeleton-rect">
									<view class="u-m-r-10 u-m-b-10" v-for="(item, index) in tags" :key="index">
										<u-tag
											:text="item"
											:bg-color="theme.lightColor"
											:border-color="theme.faBorderColor"
											:color="theme.bgColor"
											size="mini"
											shape="circle"
											mode="light"
										/>
									</view>
								</view>
								<view class="u-skeleton-rect">
									<view class="u-text-center share u-flex u-col-center u-row-right" @click="showShare = true">
										<u-icon size="30" name="share" color="#83868b"></u-icon>
										<view class="u-font-28 u-tips-color">分享</view>
									</view>
								</view>
							</view>
							<view class="u-p-30 u-skeleton-rect"><text v-text="info.intro"></text></view>
						</view>
					</view>

					<view class="bg-white u-m-t-15 u-p-30" v-if="info.coupon && info.coupon.length > 0">
						<view class="u-m-b-30 u-font-30 text-weight">优惠</view>
						<view class="coupon-list u-flex u-row-between" @click="show_coupon = true">
							<view class="u-flex u-flex-1">
								<block v-for="(item, index) in info.coupon" :key="index">
									<view class="item u-flex" v-if="index < 2">
										<view class="left">
											<text class="u-font-22">{{ item.result_data && item.result_data.number }}</text>
											<text class="u-font-20">{{ item.result == 1 ? '元' : '折' }}</text>
										</view>
										<view class="right u-font-20">
											满{{ item.result_data && item.result_data.money }}元 
											{{ item.result == 1 ? '减' : '打' }}
											{{ item.result_data && item.result_data.number }} {{ item.result == 1 ? '元' : '折' }}
										</view>
									</view>
								</block>
							</view>
							<view class="u-tips-color">
								更多
								<u-icon name="arrow-right-double"></u-icon>
							</view>
						</view>
					</view>

					<view class="bg-white u-p-30 map u-skeleton-rect u-m-t-15" id="map" v-if="info.store && info.store.latitude">
						<view class="u-m-b-30 u-font-30 text-weight">位置</view>
						<!-- #ifdef MP-WEIXIN -->
						<map
							style="width: 100%; height: 500rpx;"
							:scale="16"
							@markertap="markerClick"
							@callouttap="markerClick"
							class="map"
							:enable-3D="true"
							:show-location="true"
							:enable-rotate="true"
							:latitude="info.store.latitude"
							:longitude="info.store.longitude"
							:markers="markers"
						></map>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<view>{{ info.store.address ? info.store.address : '' }}</view>
						<!-- #endif -->
					</view>

					<view class="bg-white u-p-30 u-m-t-15 u-skeleton-rect" id="comment">
						<view class="u-m-b-15 text-weight u-font-30">评价</view>
						<view class="u-flex u-row-center fa-emmpty u-p-b-30" v-if="!commentList.length">
							<image src="../../static/image/comment.png" mode=""></image>
							<view class="u-tips-color">暂无更多评论~</view>
						</view>
						<view class="comment u-border-bottom" v-for="(res, index) in commentList" :key="res.id">
							<view class="left"><image :src="res.user.avatar" mode="aspectFill"></image></view>
							<view class="right">
								<view class="top" :style="[{ color: theme.bgColor }]">
									<view class="name">{{ res.user.nickname }}</view>
									<view class="like">
										<u-rate :disabled="true" active-color="#fbb63b" inactive-color="#b2b2b2" :value="res.grade"></u-rate>
										<!-- <view class="num">{{ res.grade }}</view> -->
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
						<view
							class="u-text-center u-p-t-20 u-tips-color"
							v-if="commentList.length > 0"
							@click="goPage('/pages/remark/lists?type=0&source_id=' + id)"
						>
							<text class="u-m-r-10">更多评论</text>
							<u-icon name="arrow-right-double"></u-icon>
						</view>
					</view>

					<view class="bg-white u-p-30 u-m-t-15 facility u-skeleton-rect" id="facility">
						<view class="u-m-b-30 text-weight u-font-30">设施服务</view>
						<view class="u-flex u-flex-wrap">
							<view class="item u-m-b-10 u-flex" v-for="(item, index) in info.facility" :key="index">
								<view class="u-tips-color">
									<u-icon name="checkmark-circle" :color="theme.bgColor" v-if="hasFacility.indexOf(item.name) != -1"></u-icon>
									<u-icon name="close-circle" color="#ccc" v-else></u-icon>
								</view>
								<view class="u-m-l-15">{{ item.name }}</view>
							</view>
						</view>
					</view>

					<view class="bg-white u-p-30 u-m-t-15 notesin u-skeleton-rect" id="notesin">
						<view class="u-m-b-30 text-weight u-font-30">预订须知</view>
						<view class="">
							<view class="item u-flex">
								<view class="u-tips-color">预订房型：</view>
								<view class="">{{ info.type && info.type.name }}</view>
							</view>
							<view class="item u-flex">
								<view class="u-tips-color">入离时间：</view>
								<view class="">{{ info.checkin_time | formatTimes }} 后入住，{{ info.checkout_time | formatTimes }} 前退房</view>
							</view>
							<view class="item u-flex">
								<view class="u-tips-color">预订时长：</view>
								<view class="">随时可预订,最少预订1天, 最多预订天数不限</view>
							</view>
							<view class="item u-flex u-col-top">
								<view class="u-tips-color">其他须知：</view>
								<view class="other">
									<view class="row u-flex-1" v-for="(item, index) in info.notes_in" :key="index">
										<u-icon name="checkmark-circle" :color="theme.bgColor" v-if="item.has == 1"></u-icon>
										<u-icon name="close-circle" color="#ccc" v-else></u-icon>
										<text class="u-m-l-10" v-text="item.content"></text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="bg-white u-p-30 u-m-t-15">
						<view class="u-m-b-30 text-weight u-font-30">详情</view>
						<u-parse :html="info.content"></u-parse>
					</view>
					<!-- 自定义字段 -->
					<view class="u-skeleton-rect" id="field"><fa-fields :fields="info.fields"></fa-fields></view>
				</view>

				<view class="foot-bar" id="footbar" v-if="!loading">
					<view class="u-flex u-row-between select-calendar" @click="value = true">
						<view class="">
							<u-icon name="calendar"></u-icon>
							<text v-if="!calendar.start">请选择入住和离开日期</text>
							<text v-else>{{ calendar.startDay }}入住-{{ calendar.endDay }}离店</text>
						</view>
						<view class="" :style="[{ color: theme.bgColor }]">
							<text v-if="calendar.start">共{{ calendar.day }}晚</text>
						</view>
					</view>
					<view class="u-flex u-row-between u-m-t-20">
						<view class="">
							<text class="price u-font-35">￥{{ calendar.amount ? calendar.amount : info.price }}</text>
						</view>
						<view class="u-flex">
							<u-button :custom-style="{ backgroundColor: theme.bgColor, color: theme.color }" hover-class="none" size="medium" @click="toBooking">
								立即预定
							</u-button>
						</view>
					</view>
				</view>
				<view :style="[{ height: gapHeight + 'px', backgroundColor: '#f4f6f8' }]"></view>
			</scroll-view>
			<!-- 有数据渲染 -->
			<view class="" v-if="!loading">
				<fa-calendar
					v-model="value"
					:price="info.price"
					:calendar="info.calendar"
					:orderCalendar="info.order_calendar"
					@confirm="calendarConfirm"
				></fa-calendar>
			</view>
			<!-- 海报分享 -->
			<view class="" v-if="info.id">
				<fa-share					
					:title="info.name"
					:summary="info.intro"
					:imageUrl="info.image_text"
					v-model="showShare"
					@shares="showPoster = true"
				></fa-share>
				<fa-poster v-model="showPoster" :info="info"></fa-poster>
			</view>
			<fa-coupon v-model="show_coupon" :couponList="info.coupon"></fa-coupon>
			<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
		</view>
	</view>
</template>

<script>
// #ifdef H5
import { weixinShare } from '@/common/fa.weixin.mixin.js';
// #endif
export default {
	mixins: [
		// #ifdef H5
		weixinShare
		// #endif
	],
	onLoad(e) {
		this.id = e.id || '';
		if (!this.id) {
			this.$u.toast('参数错误');
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				});
			}, 1000);
		}
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
		let sys = this.$u.sys();
		// #ifndef MP
		if (sys.platform == 'android') {
			this.stickyTop = sys.statusBarHeight + 45;
		} else {
			this.stickyTop = sys.statusBarHeight + 44;
		}
		// #endif
		// #ifdef MP-WEIXIN
		let custom = wx.getMenuButtonBoundingClientRect();
		this.stickyTop = custom.top + 40;
		// #endif
		// #ifdef MP-BAIDU
		this.stickyTop = sys.statusBarHeight + 44;
		// #endif
		this.getDetail();
		this.getCommentList();
	},
	onShow() {
		if (this.is_first) {
			this.getDetail();
			this.getCommentList();
		}
		this.is_first = true;
	},
	computed: {
		stickyStyle() {
			let style = {};
			if (this.scrollTop > 150) {
				style.position = 'fixed';
				style.width = '100%';
				style.top = this.stickyTop + 'px';
				style.left = 0;
				style.zIndex = 999;
				this.marginTop = 90;
				// #ifdef APP-PLUS
				if(this.$u.sys().platform == 'ios'){
					this.marginTop = 0;
				}
				// #endif
			} else {
				this.marginTop = 0;
			}
			return style;
		}
	},
	data() {
		return {
			showShare:false,
			showPoster:false,
			is_first: false,
			value: false,
			scrollTop: 0,
			stickyTop: 0,
			tabList: [
				{
					name: '介绍',
					tag: 'intro'
				},
				{
					name: '位置',
					tag: 'map'
				},
				{
					name: '评价',
					count: 0,
					tag: 'comment'
				},
				{
					name: '设施',
					tag: 'facility'
				}
			],
			current: 0,
			loading: true,
			marginTop: 0,
			gapHeight: 150,
			id: '',
			commentList: [],
			into: '',
			info: {},
			calendar: {},
			hasFacility: [],
			tags: [],
			markers: [],
			// #ifdef APP-PLUS
			map_src: '',
			// #endif
			show_coupon: false
		};
	},
	methods: {
		getDetail() {
			this.$api.houseDetail({ id: this.id }).then(res => {
				if (res.code == 1) {
					this.info = res.data;
					this.info.image = this.info.images.length?this.info.images[0]:''
					if (this.info.store) {
						this.markers = [
							{
								id: 0,
								latitude: parseFloat(this.info.store.latitude),
								longitude: parseFloat(this.info.store.longitude),
								iconPath: '../../static/map.png',
								address: this.info.store.address,
								callout: {
									content: this.info.store.name,
									padding: 10,
									borderRadius: 5,
									bgColor: '#F24E4E',
									color: this.theme.color,
									display: 'ALWAYS'
								}
							}
						];
					}
					
					if (res.data.group_names && res.data.group_names.facility) {
						this.hasFacility = res.data.group_names.facility;
					}
					if (res.data.group_names && res.data.group_names.tag) {
						this.tags = res.data.group_names.tag;
					}
					this.loading = false;
					let that = this;
					this.$nextTick(function() {
						const query = uni.createSelectorQuery().in(this);
						query
							.select('#footbar')
							.boundingClientRect(data => {
								if(data){
									that.gapHeight = data.height ? data.height + 5 : 110;
								}
							})
							.exec();
					});
					// #ifdef MP-WEIXIN
					this.$u.mpShare = {
						title: this.info.name, // 默认为小程序名称，可自定义
						path: '/pages/hotel/detail?id=' + this.id, // 默认为当前页面路径，一般无需修改，QQ小程序不支持
						imageUrl: this.info && this.info.images.length > 0 ? this.info.images[0] : ''
					};
					// #endif
					// #ifdef H5
					if (this.$util.isWeiXinBrowser()) {
						this.wxShare({
							title: this.info.name,
							desc: this.info.intro,
							link: window.location.href,
							img: this.info && this.info.images.length > 0 ? this.info.images[0] : ''
						});
					}
					// #endif
				} else {
					this.$u.toast(res.msg);
				}
			});
		},
		change(index) {
			this.current = index;
			this.into = this.tabList[index].tag;
		},
		//日历确定
		calendarConfirm(e) {
			this.calendar = e;
		},
		collect(id, status) {
			this.$api.optionCollect({ source_id: id, type: 0 }).then(res => {
				if (res.code) {
					if (status) {
						this.$u.toast('取消收藏成功');
						this.$set(this.info, 'isCollect', 0);
					} else {
						this.$u.toast('添加收藏成功');
						this.$set(this.info, 'isCollect', 1);
					}
				} else {
					this.$u.toast(res.msg);
				}
			});
		},
		//评论列表
		getCommentList() {
			this.$api.commentList({ type: 0, source_id: this.id }).then(res => {
				if (res.code == 1) {
					this.commentList = res.data.data;
					this.tabList[2].count = res.data.total;
				}
			});
		},
		upper() {
			console.log(888);
		},
		lower() {
			console.log(888);
		},
		scrolls(e) {
			this.scrollTop = e.detail.scrollTop;
		},
		markerClick() {
			uni.openLocation({
				latitude: this.markers[0].latitude,
				longitude: this.markers[0].longitude,
				name: this.markers[0].callout.content,
				address: this.markers[0].address,
				success: function() {
					console.log('success');
				},
				complete(res) {
					console.log(res);
				}
			});
		},
		//立即预定
		toBooking() {
			if (JSON.stringify(this.calendar) == '{}') {
				this.$u.toast('请选择入住和离店日期');
				return;
			}
			this.goPage('/pages/hotel/booking?id=' + this.id + '&start_time=' + this.calendar.start + '&end_time=' + this.calendar.end);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f6f8;
}
.tabs-container {
	.u-badge {
		min-width: 34rpx;
	}
}
</style>
<style lang="scss" scoped>
.collect {
	background: rgba($color: #000000, $alpha: 0.2);
	border-radius: 200rpx;
	position: absolute;
	right: 30rpx;
	top: 20rpx;
	padding: 10rpx;
	z-index: 99;
}
.detail {
	.title {
		font-weight: 500;
	}
	.facility {
		.item {
			width: 50%;
		}
	}
	.notesin {
		.item {
			margin: 15rpx 0;
			.other {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				.row {
				}
			}
		}
	}
	.share{
		width: 110rpx;
	}
	.market_price {
		text-decoration: line-through;
		margin-left: 10rpx;
	}
}
.coupon-list {
	.item {
		margin-right: 20rpx;
		border: 1px solid #f2270c;
		padding: 5rpx 12rpx;
		border-radius: 5rpx;
		position: relative;
		color: #f2270c;
		.left {
			border-right: 1px dashed #f2270c;
			margin-right: 10rpx;
			padding-right: 10rpx;
		}
		&::before {
			position: absolute;
			content: '';
			display: block;
			left: -2rpx;
			top: calc(50% - 6rpx);
			height: 12rpx;
			width: 8rpx;
			border: 1px solid #f2270c;
			background-color: #ffffff;
			border-radius: 0 12rpx 12rpx 0;
			border-left: none;
		}
		&::after {
			position: absolute;
			content: '';
			display: block;
			right: -2rpx;
			top: calc(50% - 6rpx);
			height: 12rpx;
			width: 8rpx;
			border: 1px solid #f2270c;
			background-color: #ffffff;
			border-radius: 12rpx 0 0 12rpx;
			border-right: none;
		}
	}
}
.foot-bar {
	background-color: #ffffff;
	position: fixed;
	width: 100%;
	bottom: 0;
	left: 0;
	padding: 20rpx 15rpx;
	border-top: 1rpx solid #f4f6f8;
	.select-calendar {
		background-color: #f4f6f8;
		padding: 15rpx;
	}
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
