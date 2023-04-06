<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="提交订单" :border-bottom="false"></fa-navbar>
		<view class="list">
			<view class="item u-p-30 u-flex" v-for="(item, index) in list" :key="index">
				<image :src="item.goods && item.goods.image_text" mode="aspectFill"></image>
				<view class="u-flex-1 right">
					<view class="u-line-2">{{ item.goods && item.goods.name }}</view>
					<view class="u-flex u-row-between u-p-t-15">
						<text class="price u-font-30">{{ item.goods && item.goods.price }}</text>
						<view class="" v-if="sceneval == 1">
							<text class="u-tips-color">×{{ item.nums }}</text>
						</view>
						<view class="" v-else>
							<u-number-box v-model="item.cart_nums" :index="index" :min="1" @blur="setCartNum"
								@minus="setCartNum" @plus="setCartNum"></u-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="notes">
			<u-form ref="uForm">
				<u-form-item label-position="top" label-width="120" label="房间号">
					<u-input v-model="house_number" placeholder="请输入房间号或选择房间" />
					<u-button slot="right" shape="circle" @click="show = true" size="mini">选择房间</u-button>
				</u-form-item>
				<u-form-item label-position="top" label-width="120" label="备注">
					<u-input type="textarea" v-model="memo" />
				</u-form-item>
				<u-form-item label-width="120" label="优惠券" v-if="couponList.length">
					<view class="coupon u-tips-color" @click="show_coupon = true">
						<text class="u-m-r-10" v-if="coupon.id">{{ coupon.name }} (优惠￥{{ couponPrice }})</text>
						<text class="u-m-r-10" v-else>请选择优惠券</text>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</u-form-item>
			</u-form>
		</view>
		<u-gap height="150" bg-color="#fffff"></u-gap>
		<!-- 底部导航条 -->
		<view class="footer-bar u-flex u-row-between">
			<view class="u-tips-color u-flex-1">
				<text>共:</text>
				<text>{{ totalNums }}</text>
				<text>件</text>
			</view>
			<view class="u-text-right u-font-30 u-flex-1">
				<text>合计:</text>
				<text class="price">￥{{ totalPrice }}</text>
			</view>
			<view class="u-m-l-20">
				<u-button size="medium"
					:custom-style="{ width: '220rpx', backgroundColor: theme.bgColor, color: theme.color }"
					shape="circle" @click="add">
					提交订单
				</u-button>
			</view>
		</view>
		<fa-coupon v-model="show_coupon" :couponList="couponList" :mode="1" :totalPrice="totalPrice" @success="success">
		</fa-coupon>
		<u-select v-model="show" :list="house" @confirm="confirm"></u-select>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
	export default {
		onLoad(e) {
			this.cart_ids = e.id;
			this.sceneval = e.sceneval;
			this.getCartIndex();
			this.houseSelect();
		},
		computed: {
			totalNums() {
				return this.list.reduce(function(total, item) {
					return total + parseInt(item.nums);
				}, 0);
			},
			goodsAmount() {
				return this.list.reduce(function(total, item) {
					return total + parseInt(item.cart_nums) * parseFloat((item.goods && item.goods.price) || 0);
				}, 0);
			},
			totalPrice() {
				let amount = this.goodsAmount;
				if (!amount) {
					return 0;
				}
				if (this.coupon.id) {
					if (this.coupon.result == 1) {
						//减金额
						amount = amount - this.coupon.result_data.number;
					} else {
						//折扣
						amount = (amount * this.coupon.result_data.number) / 10;
					}
				}
				return amount.toFixed(2);
			},
			couponPrice() {
				let amount = 0;
				if (this.coupon.id) {
					if (this.coupon.result == 1) {
						//减金额
						amount = parseFloat(this.coupon.result_data.number);
					} else {
						//折扣
						amount = (this.goodsAmount * (10 - this.coupon.result_data.number)) / 10;
					}
				}
				return amount.toFixed(2);
			}
		},
		data() {
			return {
				show: false,
				cart_ids: '',
				list: [],
				memo: '',
				house_number: '',
				sceneval: 1,
				house: [],
				couponList: [],
				show_coupon: false,
				coupon: {}
			};
		},
		methods: {
			getCartIndex() {
				this.$api.getCartIndex({
					id: this.cart_ids,
					sceneval: this.sceneval,
					order: 1
				}).then(res => {
					if (res.code) {
						res.data.list.map(item => {
							item.checked = false;
							item.cart_nums = item.nums;
						});
						res.data.list.map(item => {
							item.cart_nums = item.nums;
						});
						this.list = res.data.list;
						this.couponList = res.data.coupons;
						this.house_number = (res.data.house && res.data.house.room) || '';
					} else {
						this.$u.toast(res.msg);
					}
				});
			},
			houseSelect() {
				this.$api.houseSelect().then(res => {
					if (res.code) {
						this.house = res.data.map(item => {
							return {
								value: item.room,
								label: item.name && item.name.length >= 15 ? item.name.substr(0, 15) +
									'... (' + item.room + ')' : item.name + '(' + item.room + ')'
							};
						});
					} else {
						this.$u.toast(res.msg);
					}
				});
			},
			confirm(e) {
				this.house_number = e[0].value;
			},
			setCartNum(e) {
				let {
					index,
					value
				} = e;
				this.$api.setCartNums({
					id: this.list[index].id,
					nums: value
				}).then(res => {
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
			success(e) {
				this.coupon = e;
			},
			add() {
				if (!this.list.length) {
					return;
				}
				let data = {
					id: this.cart_ids,
					user_coupon_id: this.coupon.user_coupon_id || '',
					house_number: this.house_number,
					memo: this.memo,
					type: 1 //商品
				};
				this.$api.addOrder(data).then(res => {
					if (res.code) {
						this.goPage('/pages/order/payment?index=3&id=' + res.data.id);
					} else {
						this.$u.toast(res.msg);
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
	.list {
		background-color: #ffffff;

		.item {
			border-bottom: 1px solid #f4f6f8;

			image {
				width: 200rpx;
				height: 170rpx;
				border-radius: 5rpx;
			}

			.right {
				padding: 15rpx;
				height: 170rpx;
				display: flex;
				flex-direction: column;
			}
		}
	}

	.notes {
		margin-top: 30rpx;
		padding: 0 30rpx;
		background-color: #ffffff;
	}

	.coupon {
		text-align: right;
		width: 100%;
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
