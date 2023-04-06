<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="购物车" :border-bottom="false"></fa-navbar>
		<view class="" v-if="list.length">
			<view class="u-flex u-row-between cart-bar u-p-30">
				<view class="">共 {{ list.length }} 件商品</view>
				<view class="" @click="is_edit = !is_edit">{{ is_edit ? '取消' : '编辑' }}</view>
			</view>
			<view class="goods-cart bg-white">
				<u-checkbox-group @change="checkboxGroupChange">
					<view class="" style="width: 100vw;">
						<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" :key="index" @click="click" @open="open" :options="options">
							<view class="u-flex u-row-between u-p-30 u-border-bottom">
								<u-checkbox :active-color="theme.bgColor" v-model="item.checked" :name="item.id"></u-checkbox>
								<view class="" @click="goPage('/pages/goods/detail?id=' + item.goods_id)"><image :src="item.goods.image_text" mode="aspectFill"></image></view>
								<view class="right u-flex-1">
									<view class="u-line-2" @click="goPage('/pages/goods/detail?id=' + item.goods_id)">{{ item.goods.name }}</view>
									<view class="u-flex u-row-between u-m-t-15">
										<view class="price">￥{{ item.goods.price }}</view>
										<view class="">
											<u-number-box
												v-model="item.cart_nums"
												:min="1"
												:index="index"
												@blur="setCartNum"
												@minus="setCartNum"
												@plus="setCartNum"
											></u-number-box>
										</view>
									</view>
								</view>
							</view>
						</u-swipe-action>
					</view>
				</u-checkbox-group>
			</view>
		</view>
		<view class="page-box" v-else>
			<view>
				<view class="centre">
					<image src="../../static/image/cart.png" mode="aspectFill"></image>
					<view class="explain">
						您的购物车空空如也~
						<view class="tips">快去看看有那些想买的</view>
					</view>
					<view class="btn" @click="goPage('/pages/goods/goods')">随便逛逛</view>
				</view>
			</view>
		</view>
		<u-gap height="120" bg-color="#f4f6f9"></u-gap>
		<!-- 底部导航条 -->
		<view class="footer-bar u-flex u-row-between u-border-top" v-if="list.length">
			<view class="u-flex-1">
				<label class="radio" @click="radioVal = !radioVal">
					<radio style="transform:scale(0.9)" :color="theme.bgColor" value="1" :checked="radioVal" />
					全选
				</label>
			</view>
			<view class="u-flex-1 u-text-right price u-font-30">共:￥{{ totalPrice }}</view>
			<view class="u-m-l-20">
				<u-button
					v-if="is_edit"
					size="medium"
					:custom-style="{ width: '220rpx', backgroundColor: theme.bgColor, color: theme.color }"
					shape="circle"
					@click="dels"
				>
					删除
				</u-button>
				<u-button
					v-else
					size="medium"
					:custom-style="{ width: '220rpx', backgroundColor: theme.bgColor, color: theme.color }"
					shape="circle"
					@click="goSettle"
				>
					立即结算
				</u-button>
			</view>
		</view>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
export default {
	onLoad() {
		this.getCartIndex();
	},
	onShow() {
		if (!this.is_first) {
			this.radioVal = false;
		}
		this.is_first = true;
	},
	computed: {
		totalPrice() {
			let amount = this.list.reduce(function(total, item) {
				if (item.checked) {
					return total + parseInt(item.cart_nums) * parseFloat(item.goods.price);
				} else {
					return total;
				}
			}, 0);
			return amount.toFixed(2);
		}
	},
	watch: {
		radioVal(newValue, oldValue) {
			//全选状态，数据未全选
			if (newValue && this.cart_ids.length != this.list.length) {
				let arr = [];
				this.list.forEach((item, index) => {
					arr.push(item.id);
					this.$set(this.list[index], 'checked', true);
				});
				this.cart_ids = arr;
			} else if (!newValue && this.cart_ids.length == this.list.length) {
				this.list.forEach((item, index) => {
					this.$set(this.list[index], 'checked', false);
				});
				this.cart_ids = [];
			}
		}
	},
	data() {
		return {
			is_first: false,
			is_edit: false,
			radioVal: false,
			cart_ids: [], //选中的
			list: [],
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
		setCartNum(e) {
			let { index, value } = e;
			this.$api.setCartNums({ id: this.list[index].id, nums: value }).then(res => {
				if (!res.code) {
					setTimeout(() => {
						this.$u.toast(res.msg);
						this.$set(this.list[index], 'cart_nums', this.list[index].nums);
					}, 100); //数量复原
				} else {
					this.$set(this.list[index], 'nums', this.list[index].cart_nums); //数量替换
				}
			});
		},
		checkboxGroupChange(e) {
			this.radioVal = e.length == this.list.length;
			this.cart_ids = e;
		},
		click(index) {
			this.$api.delCart({ id: this.list[index].id }).then(res => {
				this.$u.toast(res.msg);
				if (res.code) {
					this.list.splice(index, 1);
				}
			});
		},
		// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
		open(index) {
			// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
			// 原本为'false'，再次设置为'false'会无效
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if (index != idx) this.list[idx].show = false;
			});
		},
		//删除购物车
		dels() {
			if (!this.cart_ids.length) {
				return;
			}
			this.$api.delCart({ id: this.cart_ids.join(',') }).then(res => {
				this.$u.toast(res.msg);
				if (res.code) {
					this.getCartIndex();
				}
			});
		},
		getCartIndex() {
			this.$api.getCartIndex().then(res => {
				if (res.code) {
					res.data.list.map(item => {
						item.checked = false;
						item.show = false;
						item.cart_nums = item.nums;
					});
					this.list = res.data.list;
				}
			});
		},
		goSettle() {
			if (!this.cart_ids.length) {
				return;
			}
			this.goPage('/pages/goods/order?sceneval=1&id=' + this.cart_ids.join(','));
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f6f9;
}
</style>
<style lang="scss" scoped>
.cart-bar {
	background-color: #f4f6f9;
}
.goods-cart {
	image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 5rpx;
	}
	.right {
		padding: 0 30rpx;
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
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
		background: linear-gradient(270deg, rgb(55, 68, 134) 0%, rgb(55, 68, 134) 100%);
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
</style>
