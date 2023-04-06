<template>
	<view class="u-wrap" :style="[height]">
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" v-if="!is_empty && category.length>0" :scroll-top="scrollTop">
				<view v-for="(item, index) in category" :key="index" class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']" :data-current="index"
					@tap.stop="swichMenu(item, index)">
					<text class="u-line-1">{{ item.name }}</text>
				</view>
			</scroll-view>

			<scroll-view scroll-y class="right-box" v-if="row.id" @scrolltolower="tolower">
				<view class="page-view">
					<view class="class-item">
						<view class="item-title">
							<text>{{ row.name }}</text>
						</view>
						<view class="item-container">
							<view class="thumb-box" v-for="(item1, index1) in goods" :key="index1"
								@click="goPage('/pages/goods/detail?id=' + item1.id)">
								<image class="item-menu-image" :src="item1.image_text" mode="aspectFill"></image>
								<view class="u-p-l-15 u-flex-1">
									<view class="item-menu-name u-line-2 u-font-28">{{ item1.name }}</view>
									<view class="u-tips-color intro u-line-1">{{ item1.intro }}</view>
									<view class="u-flex u-row-between">
										<text class="market_price u-tips-color">￥{{ item1.market_price }}</text>
										<text class="price">￥{{ item1.price }}</text>
									</view>
								</view>
							</view>
							<view class="u-flex fa-emmpty top-15" v-if="!goods.length">
								<image src="../../../static/image/data.png" mode="aspectFill"></image>
								<view class="u-tips-color">暂无更多的商品数据~</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="u-flex fa-emmpty top-15" v-if="is_empty">
				<image src="../../../static/image/data.png" mode="aspectFill"></image>
				<view class="u-tips-color">暂无分类数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync();
	export default {
		name: 'fa-single',
		props: {
			height: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		mounted() {
			this.current = this.vuex_current;
			this.getCategory();
		},
		data() {
			return {
				is_first: false,
				category: [],
				row: {}, //当前选择的分类
				goods: [],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				page: 1,
				is_empty: false,
				is_update: false,
				has_more: false
			};
		},
		methods: {
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(item, index) {
				if (index == this.current) return;
				this.row = item;
				this.current = index;
				this.$u.vuex('vuex_current', index);
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
				this.is_update = true;
				this.page = 1;
				this.getGoods();
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query
						.select('.' + elClass)
						.fields({
							size: true
						}, res => {
							// 如果节点尚未生成，res值为null，循环调用执行
							if (!res) {
								setTimeout(() => {
									this.getElRect(elClass);
								}, 10);
								return;
							}
							this[dataVal] = res.height;
						})
						.exec();
				});
			},
			getCategory() {
				this.$api.getCategory({
					category_mode: 1
				}).then(res => {
					if (res.code == 1) {
						this.category = res.data;
						if (res.data.length > 0) {
							this.row = res.data[this.current] == undefined ? res.data[0] : res.data[this.current]; //默认取第一个
							this.getGoods();
						} else {
							this.is_empty = true;
						}
					}else{
						this.is_empty = true;
					}
				});
			},
			getGoods() {
				this.$api
					.getGoodsIndex({
						category_id: this.row.id,
						page: this.page
					})
					.then(res => {
						if (res.code == 1) {
							if (this.is_update) {
								this.goods = [];
								this.is_update = false;
							}
							this.goods = [...this.goods, ...res.data.data];
							this.has_more = res.data.current_page < res.data.last_page;
						}
					});
			},
			tolower() {
				if (this.has_more) {
					this.page++;
					this.getGoods();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-wrap {
		display: flex;
		flex-direction: column;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
		background-color: #f6f6f6;
	}

	.u-tab-item {
		height: 110rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}

	.u-tab-item-active::before {
		content: '';
		position: absolute;
		border-left: 4px solid #374486;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
		height: 100%;
		background-color: #fff;
		position: relative;
	}

	.class-item {
		padding: 16rpx;
		border-radius: 8rpx;
		height: 100%;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;

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

			.item-menu-name {
				font-weight: normal;
				color: $u-main-color;
				width: 320rpx;
			}

			.intro {
				width: 320rpx;
				font-size: 24rpx;
				padding: 10rpx 0;
			}

			.market_price {
				text-decoration: line-through;
			}

			&:not(:last-child) {
				border-bottom: 1px solid #f4f6f8;
			}
		}
	}
</style>
