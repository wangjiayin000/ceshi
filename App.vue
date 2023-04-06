<script>
import md5Libs from "uview-ui/libs/function/md5";
export default {
	onLaunch: function() {
		console.log('uview 版本', this.$u.config.v);
		this.$api.config().then(res => {
			if (res.code) {
				//主题做缓存
				let theme_key = md5Libs.md5(JSON.stringify(res.data.theme));
				if(!this.vuex_theme.key || this.vuex_theme.key != theme_key){
					this.$u.vuex('vuex_theme', {key:theme_key,value:res.data.theme});
				}
				console.log(res.data,'获取的数据');
				this.$u.vuex('vuex_config', res.data);
			}
		});
		// #ifdef H5
		if(window.location.hash != ''){
			 let search = window.location.search.substring(1);
				try{
					if(search.indexOf('hashpath') != -1){
						let sea = JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
						if(sea.hashpath && sea.code && sea.state){
							window.location.href = window.location.origin + window.location.pathname+'#'+sea.hashpath+'?code='+sea.code+'&state='+sea.state
						}
					}
				}catch(e){
					//TODO handle the exception
				}
		}
		// #endif
	},
	onShow: function() {
		let that = this;
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				that.$u.vuex('vuex_location', {
					latitude: res.latitude,
					longitude: res.longitude
				});
				that.getDefaultStore()
			},
			fail(e) {
				that.$u.toast('获取定位失败！')
			}
		});
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/* #ifndef APP-PLUS-NVUE */
@import 'uview-ui/index.scss';
/* #endif */

/*每个页面公共css */
.bg-white {
	background-color: #ffffff;
}
.price {
	color: $u-type-error;
}
.text-weight {
	font-weight: bold;
}
.u-item-title {
	position: relative;
	font-size: 30rpx;
	padding-left: 16rpx;
	line-height: 1;
}

.line {
	width: 8rpx;
	height: 32rpx;
	border-radius: 10rpx;
}
/* #ifndef APP-PLUS-NVUE */
.u-size-mim {
	display: inline-flex;
	width: auto;
	font-size: 26rpx;
	height: 55rpx;
	line-height: 55rpx;
	padding: 0 45rpx;
}
/* #endif */

// #ifdef MP-BAIDU
.u-radio__icon-wrap,
.u-checkbox__icon-wrap {
	line-height: 0;
}
// #endif

/* #ifndef APP-PLUS-NVUE */
.fa-emmpty{
	width: 100%;
	flex-direction: column;
	image{
		width: 400rpx;
		height: 400rpx;
	}
	&.top-15{
		padding-top: 15vh;
	}
}
.share-btn {
	padding: 0;
	margin: 0;
	border: 0;
	background-color: transparent;
	line-height: inherit;
	border-radius: 0;
	font-size: inherit;
}
.share-btn::after {
	border: none;
}
.u-mode-center-box {
	background: rgba(255, 255, 255, 0) !important;
}
/* #endif */
</style>
