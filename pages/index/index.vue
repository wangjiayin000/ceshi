<template>
	<view class="index-box">
		<view class="index-cont">
			<image src="https://lvyouchongqing.rchz.top/image/react.png" mode=""></image>
		</view>
		<view class="box-item u-flex-col u-col-center">
			<view class="box-item-top"></view>
			<view class="box-item-title u-flex u-row-center">
				<view class="box-item-title-image">
					<image src="https://lvyouchongqing.rchz.top/image/yaoshi.png" mode=""></image>
				</view>
				<view class="u-font-md">
					休闲旅游户源在线预订平台
				</view>
			</view>
			<view class="box-item-content u-flex u-row-evenly">
				<view class="box-item-content-cont u-flex-col u-col-center u-row-center" @click="goPage('/pages/store/store')">
					<view class="box-item-content-cont-image">
						<image src="https://lvyouchongqing.rchz.top/image/xiatian.png" mode=""></image>
					</view>
					<view class="">
						避暑
					</view>
				</view>
				<view class="box-item-content-cont u-flex-col u-col-center u-row-center" @click="goPage('/pages/store/store')">
					<view class="box-item-content-cont-image">
						<image src="https://lvyouchongqing.rchz.top/image/dongtian.png" mode=""></image>
					</view>
					<view class="">
						过冬
					</view>
				</view>
			</view>
		</view>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: true
		};
	},
	async onShow() {
		await this.getDefaultStore();
		this.loading = false;
	},
	// computed: {
	// 	notice() {
	// 		let arr = [];
	// 		if (this.vuex_config.notice) {
	// 			this.vuex_config.notice.map(item => {
	// 				arr.push(item.title);
	// 			});
	// 		}
	// 		return arr;
	// 	},
	// 	indexStyle() {
	// 		let style = {};
	// 		if (this.notice.length > 0) {
	// 			style.top = '-60rpx';
	// 		} else {
	// 			style.top = '-30rpx';
	// 		}
	// 		return style;
	// 	}
	// },
	methods: {
		grids(e) {
			let path = e.path;
			if (path == '/' || !path) {
				return;
			}
			if (path.substr(0, 1) == 'p') {
				path = '/' + path;
			}
			if (path.indexOf('http') != -1) {
				this.$u.vuex('vuex_webs', {
					path: e.path,
					title: e.name
				});
				this.$u.route('/pages/webview/webview');
				return;
			}
			// #ifdef APP-PLUS
			// path = path.replace(/map/, 'nmap');
			// #endif
			this.$u.route(path);
		},
		openPage(index) {
			this.grids({
				path: this.vuex_config.swiper[index].path,
				name: this.vuex_config.swiper[index].name
			});
		},
		click(index) {
			if (this.vuex_config.notice) {
				let url = this.vuex_config.notice[index].path;
				if (url) {
					this.grids({
						path: url,
						name: this.vuex_config.notice[index].title
					});
				}
			}
		}
	},
	onPageScroll(e) {},
	//下拉刷新
	onPullDownRefresh() {},
	onReachBottom() {}
};
</script>

<style lang="scss">
page {
	background-color: #f4f6f8;
	height: calc(100vh - 50px);
}
</style>
<style lang="scss" scoped>
	.index-box{
		height: 100%;
		position: relative;
		.index-cont{
			position: absolute;
			top:0;
			left: 0;
			width: 750rpx;
			height: 100%;
			image{
				width: 100%;
				height:100%;
			}
			z-index: -1;
		}
		.box-item{
			position: fixed;
			bottom:calc(env(safe-area-inset-bottom) + 200rpx);
			left: 32rpx;
			.box-item-top{
				width: 686rpx;
				height: 58rpx;
				background: #F7CA00;
				border-radius: 98rpx ;
				opacity: 1;
			}
			.box-item-title{
				margin-top: -28rpx;
				width: 650rpx;
				height: 73rpx;
				background: #FFFFFF;
				// -webkit-mask: radial-gradient(circle at left 100%, #0000 20rpx, red 0);
				-webkit-mask: radial-gradient(circle at left 100%, #0000 20rpx, red 0), radial-gradient(circle at right 100%, #0000 20rpx, red 0);
				-webkit-mask-size: 51%; 
				-webkit-mask-position: 0, 100%; 
				-webkit-mask-repeat: no-repeat;
				border-bottom: 2rpx dashed #F7CA00;
				.box-item-title-image{
					width: 32rpx;
					height: 32rpx;
					image{
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
			.box-item-content{
				-webkit-mask: radial-gradient(circle at 20rpx 0, #0000 20rpx, red 0) -20rpx 0; 
				width: 650rpx;
				height: 297rpx;
				background: #FFFFFF;
				.box-item-content-cont{
					width: 175rpx;
					height: 226rpx;
					border-radius: 18rpx ;
					border: 2rpx solid #E5E6EB;
					.box-item-content-cont-image{
						image{
							width: 128rpx;
							height: 128rpx;
						}
					}
				}
				
			}
		}
	}
	
.index-content {
	position: relative;
	.notice,
	.grid {
		box-shadow: 0px 1px 2px 0px rgba(55, 68, 134, 0.15);
		.content {
			flex: 1;
			height: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
}
</style>
