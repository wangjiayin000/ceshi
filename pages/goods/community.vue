<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="社区列表" :border-bottom="false"></fa-navbar>
		<view class="store-list">
			<view class="u-flex item u-border-bottom" v-for="(item, index) in list" :key="index">
				<u-image :src="item.avatar" width="230" height="200"></u-image>
				<view class="u-flex-1 u-m-l-20 content">
					<view class="text-weight u-font-30" v-text="item.nickname"></view>
					<view class="u-tips-color">
						身份：{{ item.identity | kil }}
					</view>
					<view class="u-flex u-row-between">
						<view class="u-tips-color">
							<u-icon name="phone"></u-icon>
							<text class="u-m-l-10">{{ item.mobile }}</text>
						</view>
						<text v-if="item.distance" :style="[{ color: theme.bgColor }]">{{ item.distance ? item.distance.toFixed(2) : 0 }}km</text>
					</view>
					<view class="u-flex address u-tips-color">
						<u-icon name="map"></u-icon>
						<view class="u-m-l-10 u-line-2 u-font-26">{{ item.origin }}--{{ item.terminus }}</view>
					</view>
					<!-- <view class="u-tips-color">
						距离：{{ item.kilometre}}公里
					</view> -->
					<view class="u-tips-color">
						出发时间：{{$u.timeFormat(item.departuretime, 'yyyy年mm月dd日 hh:MM')}}
					</view>
					
				</view>
			</view>
		</view>
		<!-- 空数据 -->		
		<view class="u-flex u-row-center fa-emmpty top-15" v-if="is_empty">
			<image src="../../static/image/data.png" mode=""></image>
			<view class="u-tips-color">暂无更多的数据~</view>
		</view>
		<!-- 加载更多 -->
		<view class="u-p-b-30 u-p-t-30" v-if="list.length"><u-loadmore bg-color="#ffffff" :status="has_more ? status : 'nomore'" /></view>
		<!-- 回到顶部 -->
		<u-back-top :scroll-top="scrollTop" :icon-style="{ color: theme.bgColor }" :custom-style="{ backgroundColor: theme.lightColor }"></u-back-top>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
export default {
	onLoad() {
		this.getStoreList();
	},
	data() {
		return {
			list: [],
			page: 1,
			status: 'loadmore',
			has_more: false,
			scrollTop: 0,
			is_update: false,
			is_empty: false,
			keyword:'',
		};
	},
	filters:{
		kil(e){
			console.log(e)
			if(e==1){
				return '司机'
			}else if(e==2){
				return '乘客'
			}
		}
	},
	methods: {
		//搜索
		search(value) {
			// this.keyword = value;
			// this.reloads();
		},
		//刷新数据
		reloads() {
			this.page = 1;
			this.is_update = true;
			this.getStoreList();
		},
		getStoreList() {
			this.$api
				.getDynamic({
				})
				.then(res => {
					this.status = 'loadmore';
					if (res.code == 1) {
						if (this.is_update) {
							this.list = [];
							this.is_update = false;
						}
						this.list = [...this.list, ...res.data.list];
						this.has_more = res.data.current_page < res.data.last_page;
						this.is_empty = !this.list.length;
					}
				});
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	onReachBottom() {
		if (this.has_more) {
			this.status = 'loading';
			this.page++;
			this.getStoreList();
		}
	},
	
};
</script>

<style lang="scss" scoped>
.store-list {
	.item {
		padding: 30rpx;
		.address {
			// margin-top: -30rpx;
		}
	}
	.content {
		width: 50vw;
		min-height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
}
</style>
