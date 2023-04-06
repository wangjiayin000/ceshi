<template>
	<view class="release">
		<!-- 顶部导航 -->
		<fa-navbar title="发布"></fa-navbar>
		<view class="bg-white u-p-30 u-skeleton-rect reat-50">
			<u-form :model="form" ref="uForm">
				
				<u-form-item label="身份类型" label-width="130" label-position="top">
					<u-input type="select" :select-open="selectShow" v-model="form.type" placeholder="请选择身份类型" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item label="起点" label-width="130" prop="origin" label-position="top"><u-input v-model="form.origin" type="text" placeholder="请填写起点" /></u-form-item>
				<u-form-item label="终点" label-width="130" prop="terminus" label-position="top"><u-input v-model="form.terminus" type="text" placeholder="请填写终点" /></u-form-item>
				<u-form-item label="手机号码" label-width="130" label-position="top" prop="mobile">
					<u-input v-model="form.mobile" type="text" placeholder="请填写手机号码" />
				</u-form-item>
				<u-form-item label="出发时间" label-width="130" label-position="top" prop="departime">
					<u-input type="select" :select-open="timeShow" v-model="form.departime" placeholder="请选择出发时间" @click="timeShow = true"></u-input>
					<!-- <u-picker mode="time" v-model="form.departuretime" :params="params"></u-picker> -->
				</u-form-item>
							
			</u-form>
		</view>
		<view class="bg-white u-p-30 footer">
			<u-button type="primary" hover-class="none" :custom-style="{ backgroundColor: theme.bgColor, color: theme.color }" shape="circle" @click="confirm">
				确定
			</u-button>
		</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<u-picker mode="time" v-model="timeShow" :params="params" @confirm="timeConfirm"></u-picker>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.id = e.id || '';
		e.id && this.getLodger();
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	data() {
		return {
			id: '',
			selectShow: false,
			timeShow:false,
			ageShow:false,
			form: {
				origin: '',
				terminus:'',
				type: '',
				identity: '',
				mobile: '',
				departuretime:'',
				departime:'',
				kilometre:0
			},
			params: {
				year: true,
				month: true,
				day: true,
				hour: true,
				minute: true,
				second: false
			},
			rules: {
				origin: [
					{
						required: true,
						message: '请填写起点',
						trigger: ['change', 'blur']
					}
				],
				terminus: [
					{
						required: true,
						message: '请填写终点',
						trigger: ['change', 'blur']
					}
				],
				type: [
					{
						required: true,
						message: '请选择身份类型',
						trigger: ['change', 'blur']
					},
					
				],
				departuretime:[
					{
						required: true,
						message: '请选择出发时间',
						trigger: ['change', 'blur']
					},
				],
				mobile:[{
					validator: (rule, value, callback) => {
						if (value) {
							return this.$u.test.mobile(value);
						}
						return true;
					},
					message: '手机号码格式不正确',
					// 触发器可以同时用blur和change
					trigger: ['change', 'blur']
				}]
			},
			selectList: [
				{
					value: '1',
					label: '司机'
				},
				{
					value: '2',
					label: '乘客'
				}
			],

		};
	},
	methods: {
		getLodger() {
			this.$api.getLodger({id:this.id}).then(res=>{
				if(res.code==1){
					this.form.name = res.data.name;
					this.form.idnumber = res.data.idnumber;
					this.form.mobile = res.data.mobile;
					this.form.nums = res.data.nums;
					this.form.child_age = res.data.child_age;
					let childAge = this.form.child_age.split(',')
					
					let row = this.selectList.find(item=>{
						return item.value==res.data.type;
					});					
					if(row){
						this.form.type = row.value;
						this.form.typeName = row.label;
					}
				}else{
					this.$u.toast(res.msg);
				}
			})
		},
		
		// 选择商品类型回调
		selectConfirm(e) {
			e.map((val, index) => {
				this.form.identity = val.value;
				this.form.type = val.label;
			});
		},
		timeConfirm(data){
			let {year,month,day,hour,minute} = data
			this.form.departime = year+'-'+month+'-'+day+' '+hour+':'+minute
			this.form.departuretime = new Date(this.form.departime)*1
		},
		confirm() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					// console.log(this.form)
					let parmas = {...this.form}
					delete parmas.type
					delete parmas.departime
					this.$api.addDynamic(parmas).then(res => {
						this.$u.toast(res.msg);
						if (res.code == 1) {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1500);
						}
					});
				} else {
					console.log('验证失败');
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
.footer {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #fff;
	z-index: 99;
}
.reat-50{
	padding-bottom: 120rpx !important;
}
.release{
	.age{
		padding: 20rpx;
	}
	.ages{
		padding: 20rpx 20rpx 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
