<template>
	<view class="resident">
		<!-- 顶部导航 -->
		<fa-navbar :title="id ? '编辑住客信息' : '添加住客信息'"></fa-navbar>
		<view class="bg-white u-p-30 u-skeleton-rect reat-50">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓名" label-width="130" prop="name" label-position="top"><u-input v-model="form.name" type="text" placeholder="请填写姓名" /></u-form-item>
				<u-form-item label="证件类型" label-width="130" label-position="top">
					<u-input type="select" :select-open="selectShow" v-model="form.typeName" placeholder="请选择证件类型" @click="selectShow = true"></u-input>
				</u-form-item>
				<u-form-item label="证件号码" label-width="130" label-position="top" prop="idnumber">
					<u-input v-model="form.idnumber" type="text" placeholder="请填写证件号码" />
				</u-form-item>
				<u-form-item label="手机号码" label-width="130" label-position="top" prop="mobile">
					<u-input v-model="form.mobile" type="text" placeholder="请填写手机号码" />
				</u-form-item>
				<u-form-item label="随行人数" label-width="130" label-position="top" prop="nums">
					<u-input v-model="form.nums" type="number" maxlength='2' placeholder="请填写随行人数" />
				</u-form-item>
				<u-form-item label="儿童年龄" label-width="130" label-position="top" prop="child_age">
					<!-- <u-input v-model="form.childAge" type="text" placeholder="请填写儿童年龄" /> -->
					<!-- <rudon-multiSelector welcome="请选择" :is_using_slot="false" :is_using_icon="true" :localdata="options" @change="whenChanged"></rudon-multiSelector> -->
					<u-input type="select" :select-open="ageShow" v-model="form.child_age" placeholder="请选择儿童年龄" @click="ageShow = true"></u-input>
				</u-form-item>
				
			</u-form>
		</view>
		<view class="bg-white u-p-30 footer">
			<u-button type="primary" hover-class="none" :custom-style="{ backgroundColor: theme.bgColor, color: theme.color }" shape="circle" @click="confirm">
				确定
			</u-button>
		</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<!-- <u-select mode="single-column" :list="ageList" v-model="ageShow" @confirm="ageConfirm"></u-select> -->
		 <u-popup v-model="ageShow" mode="bottom">
			 <view class="ages">
			 	<view @click="ageShow=false">取消</view>
				<view @click="submit()">确定</view>
			 </view>
		 		<view class="age">
					<u-checkbox-group :max="form.nums!=''&&form.nums" @change="checkboxGroupChange">
						<u-checkbox 
							@change="checkboxChange" 
							v-model="item.checked" 
							v-for="(item, index) in agelist" :key="index" 
							:name="item.name"
							
						>{{item.name}}</u-checkbox>
					</u-checkbox-group>
		 		</view>
		 	</u-popup>
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
			ageShow:false,
			form: {
				name: '',
				type: '0',
				typeName: '身份证',
				idnumber: '',
				mobile: '',
				nums:'',
				child_age:'',
				ageList:[]
			},
			agelist:[
				{
					name: '0',
					checked: false,
					disabled: false
				},
				{
					name: '1',
					checked: false,
					disabled: false
				},
				{
					name: '2',
					checked: false,
					disabled: false
				},
				{
					name: '3',
					checked: false,
					disabled: false
				},
				{
					name: '4',
					checked: false,
					disabled: false
				},
				{
					name: '5',
					checked: false,
					disabled: false
				},
				{
					name: '6',
					checked: false,
					disabled: false
				},
				{
					name: '7',
					checked: false,
					disabled: false
				},
				{
					name: '8',
					checked: false,
					disabled: false
				},
				{
					name: '9',
					checked: false,
					disabled: false
				},
				{
					name: '10',
					checked: false,
					disabled: false
				},
				{
					name: '11',
					checked: false,
					disabled: false
				},
				{
					name: '12',
					checked: false,
					disabled: false
				},
				{
					name: '13',
					checked: false,
					disabled: false
				},
				{
					name: '14',
					checked: false,
					disabled: false
				},
				{
					name: '15',
					checked: false,
					disabled: false
				}
			],
			rules: {
				name: [
					{
						required: true,
						message: '请填写姓名',
						trigger: ['change', 'blur']
					}
				],
				idnumber: [
					{
						required: true,
						message: '请填写证件号码',
						trigger: ['change', 'blur']
					},
					{
						validator: (rule, value, callback) => {
							if (this.form.type == 0) {
								return this.$u.test.idCard(value);
							}
							return true;
						},
						message: '身份证号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur']
					},{
						validator: (rule, value, callback) => {
							if (this.form.type == 1) {
								return (/^[a-zA-Z]{5,17}$/.test(value)) || (/^[a-zA-Z0-9]{5,17}$/.test(value));
							}
							return true;
						},
						message: '护照格式不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur']
					},{
						validator: (rule, value, callback) => {
							if (this.form.type == 2) {
								return /^([A-Z]\d{6,10}(\(\w{1}\))?)$/.test(value);
							}
							return true;
						},
						message: '港澳通行证格式不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur']
					},{
						validator: (rule, value, callback) => {
							if (this.form.type == 3) {
								return (/^[0-9]{8}$/.test(value)) || (/^[0-9]{10}$/.test(value));
							}
							return true;
						},
						message: '台湾通行证格式不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur']
					}
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
					value: '0',
					label: '身份证'
				},
				{
					value: '1',
					label: '护照'
				},
				{
					value: '2',
					label: '港澳通行证'
				},
				{
					value: '3',
					label: '台胞证'
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
					for(let i=0;i<this.agelist.length;i++){
						for(let j=0;j<childAge.length;j++){
							if(childAge[j]==this.agelist[i].name){
								this.agelist[i].checked=true
								// this.$set(this.agelist[i],'checked',false);
							}
						}
					}
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
		//年龄多选
		submit(){	
			this.form.ageList= []
			for(let i=0;i<this.agelist.length;i++){
				if(this.agelist[i].checked==true){
					this.form.ageList.push(this.agelist[i].name)
				}
			}
			this.form.child_age = this.form.ageList.join()
			this.ageShow = false
		},
		checkboxGroupChange(e){
			
		},
		checkboxChange(e){
			
		},
		// 选择商品类型回调
		selectConfirm(e) {
			e.map((val, index) => {
				this.form.type = val.value;
				this.form.typeName = val.label;
			});
		},
		ageConfirm(e){
			e.map((val, index) => {
				this.form.childAge = val.value;
				// this.form.typeName = val.label;
			});
		},
		priceChange(data){
			console.log("==返回值==");
			console.log(data);
			console.log(data.indexStr);
			console.log(data.textStr);
		},
		whenChanged(e) {
			console.log(JSON.stringify(e))
			this.options = e
		},
		confirm() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					this.form.id = this.id;
					console.log(this.form)
					this.$api.addOrEditLodger(this.form).then(res => {
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
.resident{
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
