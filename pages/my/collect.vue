<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="收藏列表" :border-bottom="false"></fa-navbar>
		<u-tabs :list="tabList" :is-scroll="false" :current="current" :active-color="theme.bgColor" @change="change"></u-tabs>
		<view class="hoter-list u-p-t-30 u-p-l-30 u-p-r-30" v-if="!current">
			<view class="item bg-white u-m-b-30" v-for="(item, index) in list[current]" :key="index" @click="goPage('/pages/hotel/detail?id=' + item.source_id)">
				<view class="collect u-flex u-row-center u-col-bottom" @click.stop="collect(item.source_id, index, item.isCollect)">
					<u-icon name="heart-fill" color="#ff393c" size="40"></u-icon>
				</view>
				<view class="images">
					<fa-swiper
						:list="item.house && item.house.images"
						:autoplay="false"
						:params="{ id: item.source_id }"
						:height="400"
						mode="none"
						@click="clickSwiper"
					></fa-swiper>
					<view class="title u-line-1 u-font-35" v-text="item.house && item.house.name"></view>
				</view>
				<view class="">
					<view class="u-flex u-row-between u-p-20 u-text-right">
						<view class="u-font-35 u-m-b-15">
							<text class="price">￥{{ item.house && item.house.price }}/晚</text>
							<text class="market_price u-font-24 u-tips-color">￥{{ item.house && item.house.market_price }}/晚</text>
						</view>
						<view class="u-tips-color">{{ item.createtime | date('yyyy-mm-dd') }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg-white u-m-t-30 u-m-b-30" v-else>
			<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list[current]" :key="index" @click="click" @open="open" :options="options">
				<view class="thumb-box u-p-l-30 u-p-r-30" @click="goPage('/pages/goods/detail?id=' + item.source_id)">
					<image class="item-menu-image" :src="item.goods.image_text" mode=""></image>
					<view class="u-p-l-15 u-flex-1 right">
						<view class="item-menu-name u-line-2 u-font-28">{{ item.goods.name }}</view>
						<view class="u-tips-color intro u-line-1">{{ item.goods.intro }}</view>
						<view class="u-flex u-row-between">
							<text class="market_price u-tips-color">￥{{ item.goods.market_price }}</text>
							<text class="price">￥{{ item.goods.price }}</text>
						</view>
					</view>
				</view>
			</u-swipe-action>
		</view>
		<!-- 空数据 -->
		<view class="u-flex u-row-center fa-emmpty top-15" v-if="is_empty[current]">
			<image src="../../static/image/collect.png" mode=""></image>
			<view class="u-tips-color">
				没有更多的收藏数据了~
			</view>
		</view>
		<!-- 加载更多 -->
		<view class="u-p-b-30" v-if="list[current].length"><u-loadmore bg-color="#f4f6f8" :status="has_more[current] ? status[current] : 'nomore'" /></view>
		<!-- 回到顶部 -->
		<u-back-top :scroll-top="scrollTop" :icon-style="{ color: theme.bgColor }" :custom-style="{ backgroundColor: theme.lightColor }"></u-back-top>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
export default {
	onLoad() {
		this.collectList();
	},
	data() {
		return {
			list: [[], []],
			status: ['loadmore', 'loadmore'],
			has_more: [false, false],
			scrollTop: 0,
			is_update: [false, false],
			is_empty: [false, false],
			tabList: [
				{
					name: '房间'
				},
				{
					name: '商品'
				}
			],
			current: 0,
			page: [1, 1],
			show: false,
			options: [
				{
					text: '移除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	methods: {
		change(index) {
			this.current = index;
			this.collectList('init');
		},
		clickSwiper(index, item) {
			this.goPage('/pages/hotel/detail?id=' + item.id);
		},
		collectList(t) {
			if (t == 'init' && this.list[this.current].length) {
				return;
			}
			this.$api.collectList({ page: this.page[this.current], type: this.current }).then(res => {
				this.status = 'loadmore';
				if (res.code == 1) {					
					if (this.is_update[this.current]) {
						this.list[this.current] = [];
						this.is_update[this.current] = false;
					}
					res.data.data.forEach(item => {
						item.show = false;
						this.list[this.current].push(item);
					});
					this.$set(this.has_more, this.current, res.data.current_page < res.data.last_page);
					this.$set(this.is_empty, this.current, !this.list[this.current].length);
				}
			});
		},
		click(index) {			
			this.collect(this.list[this.current][index].source_id)
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.list[this.current][index].show = true;
			this.list[this.current].map((val, idx) => {
				if (index != idx) this.list[this.current][idx].show = false;
			});
		},
		collect(id) {
			this.$api.optionCollect({ source_id: id, type: this.current }).then(res => {
				if (res.code) {
					this.$u.toast('取消收藏成功');
					this.is_update[this.current] = true;
					this.page[this.current] = 1;
					this.collectList();
				} else {
					this.$u.toast(res.msg);
				}
			});
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onReachBottom() {
		if (this.has_more[this.current]) {
			this.status[this.current] = 'loading';
			this.page[this.current] = this.page[this.current] + 1;
			this.collectList();
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
.hoter-list {
	border-radius: 10rpx;
	.item {
		position: relative;
		.collect {
			background: rgba($color: #000000, $alpha: 0.2);
			border-radius: 200rpx;
			position: absolute;
			right: 30rpx;
			top: 20rpx;
			padding: 10rpx;
			z-index: 9999;
		}
		.images {
			position: relative;
			.title {
				color: #ffffff;
				width: 100%;
				position: absolute;
				left: 0rpx;
				bottom: 0rpx;
				padding: 20rpx 10rpx;
				background: rgba($color: #000000, $alpha: 0.4);
			}
		}

		.price {
			font-weight: bold;
		}
		.market_price {
			text-decoration: line-through;
			margin-left: 10rpx;
		}
	}
}

.thumb-box {
	width: 100%;
	display: flex;
	align-items: center;
	padding: 30rpx 0;
	
	.item-menu-image {
		width: 200rpx;
		height: 150rpx;
		border-radius: 5rpx;
	}
	.right{
		width: 500rpx;
	}
	.item-menu-name {
		font-weight: normal;
		color: $u-main-color;
	}
	.intro {
		font-size: 20rpx;
		padding: 10rpx 0;
	}
	.market_price {
		text-decoration: line-through;
	}
	&:not(:last-child) {
		border-bottom: 1px solid #f4f6f8;
	}
}
</style>
