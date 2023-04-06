<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="订单详情" :border-bottom="false"></fa-navbar>
		<view class="u-flex u-row-center bg-white u-p-30 u-m-b-30">
			<view class="u-tips-color"><u-icon name="clock"></u-icon></view>
			<view class="u-m-l-10">
				<text class="u-tips-color">订单状态：</text>
				<text style="color: #f29100;">{{ info.status_text }}</text>
			</view>
		</view>
		<view class="order">
			<view class="item" v-for="(item, index) in info.source_data" :key="index" @click="goPage('/pages/goods/detail?id=' + item.goods_id)">
				<view class="left"><image :src="item.image_text" mode="aspectFill"></image></view>
				<view class="content">
					<view class="title u-line-2">{{ item.name }}</view>
					<view class="right u-flex u-row-between">
						<view class="price">
							￥{{ priceInt(item.price) }}
							<text class="decimal">.{{ priceDecimal(item.price) }}</text>
						</view>
						<view class="number">×{{ item.nums }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="u-m-t-30 u-m-b-30">
			<u-cell-group>
				<u-cell-item :arrow="false" title="订单编号" :value="info.orderid"></u-cell-item>
				<u-cell-item :arrow="false" title="下单时间" :value="info.createtime | date('yyyy-mm-dd hh:MM:ss')"></u-cell-item>
				<u-cell-item :arrow="false" title="支付时间" :value="info.paytime_text"></u-cell-item>
				<u-cell-item
					:arrow="false"
					title="配送时间"
					:value="info.delivery_time ? $u.timeFormat(info.delivery_time, 'yyyy-mm-dd hh:MM:ss') : ''"
				></u-cell-item>
				<u-cell-item :arrow="false" title="订单总额" :value="'￥' + info.amount"></u-cell-item>
				<u-cell-item :arrow="false" title="房间号" :value="houseNumber"></u-cell-item>
				<u-cell-item :arrow="false" title="订单备注" :value="info.memo"></u-cell-item>
			</u-cell-group>
		</view>
		<u-gap height="120" bg-color="#f4f6f9" v-if="!['canceled','expired', 'finished', 'refunding'].includes(info.status)"></u-gap>
		<!-- 底部导航条 -->
		<view class="footer-bar u-flex u-row-between u-border-top" v-if="!['canceled','expired', 'finished', 'refunding'].includes(info.status)">
			<u-button size="medium" v-if="['created', 'paid'].includes(info.status)" :custom-style="{ width: '220rpx' }" shape="circle" @click="show = true">
				取消订单
			</u-button>
			<u-button size="medium" type="success" v-if="info.status == 'shipped'" @click="shipped" :custom-style="{ width: '220rpx' }" shape="circle">确认收到</u-button>
			<u-button
				size="medium"
				v-if="info.status == 'evaluate'"
				@click="goPage('/pages/remark/remark?id=' + info.id)"
				:custom-style="{ width: '220rpx' }"
				shape="circle"
			>
				立即评价
			</u-button>
			<u-button
				size="medium"
				:custom-style="{ width: '220rpx', backgroundColor: theme.bgColor, color: theme.color }"
				shape="circle"
				v-if="info.status == 'created'"
				@click="goPage('/pages/order/payment?id=' + info.id)"
			>
				立即支付
			</u-button>
		</view>
		<u-modal v-model="show" content="确认取消订单吗？" @confirm="cancel" :show-cancel-button="true"></u-modal>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.id = e.id || '';
	},
	onShow() {
		this.getOrderDetail();
	},
	computed: {
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
		},
		houseNumber(){
			try{
				let h = JSON.parse(this.info.params)
				return h.house_number;
			}catch(e){
				//TODO handle the exception
			}
			return '';
		}
	},
	data() {
		return {
			id: '',
			info: {},
			show: false
		};
	},
	methods: {
		getOrderDetail() {
			this.$api.orderDetail({ id: this.id }).then(res => {
				if (res.code == 1) {
					this.info = res.data;
				}
			});
		},
		shipped() {
			this.$api.receiving({ id: this.id }).then(res => {
				this.$u.toast(res.msg);
				if (res.code) {
					this.getOrderDetail();
				}
			});
		},
		cancel() {
			this.$api.orderCancel({ id: this.id }).then(res => {
				this.$u.toast(res.msg);
				if (res.code == 1) {
					this.getOrderDetail();
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
.order {
	background-color: #ffffff;
	box-sizing: border-box;
	padding: 0 30rpx;
	font-size: 28rpx;
	.item {
		display: flex;
		padding: 30rpx 0;
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
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
			.right {
				padding-top: 20rpx;
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
