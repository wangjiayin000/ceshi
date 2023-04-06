<template>
	<view class="">
		<!-- 顶部导航 -->
		<fa-navbar title="商品分类" :border-bottom="false"></fa-navbar>
		<view class="" v-if="vuex_config.category_mode != undefined">
			<fa-single v-if="vuex_config.category_mode == 1" :height="wrapHeight"></fa-single>
			<fa-multi v-else :height="wrapHeight"></fa-multi>
		</view>
		<!-- 底部导航 -->
		<fa-tabbar></fa-tabbar>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
import FaSingle from './category/single.vue';
import FaMulti from './category/multi.vue';
export default {
	components: {
		FaSingle,
		FaMulti
	},
	computed: {
		// 转换字符数值为真正的数值
		navbarHeight() {
			// #ifdef H5
			return 44;
			// #endif
			// #ifdef APP-PLUS
			return 44 + systemInfo.statusBarHeight;
			// #endif
			// #ifdef MP
			// 小程序特别处理，让导航栏高度 = 胶囊高度 + 两倍胶囊顶部与状态栏底部的距离之差(相当于同时获得了导航栏底部与胶囊底部的距离)
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			return height + systemInfo.statusBarHeight;
			// #endif
		},
		isTabbarPath() {
			let pages = getCurrentPages();
			let route = pages[pages.length - 1].route;
			return this.vuex_config.tabbar.list.some(item=>{				
				return ((item.path.substr(0, 1) == '/' && item.path == '/'+route) || item.path == route);				
			})
		},
		wrapHeight() {
			if (this.isTabbarPath) {
				return {
					height: 'calc(100vh - ' + this.navbarHeight + 'px - ' + this.$u.addUnit(this.vuex_config.tabbar.height) + ')'
				};
			} else {
				return {
					height: 'calc(100vh - ' + this.navbarHeight + 'px)'
				};
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped></style>
