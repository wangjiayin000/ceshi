<template>
	<view>
		<!-- 顶部导航 -->
		<fa-navbar title="评价" :border-bottom="false"></fa-navbar>
		<view class="u-p-30">
			<view class="">
				<u-form :model="form" ref="uForm">
					<block v-if="info.type == 0">
						<u-form-item label="房间" label-position="top">
							<view class="u-tips-color">{{ info.source_data && info.source_data.name }}</view>
						</u-form-item>
						<u-form-item label="评分" label-position="top" prop="grade__0"><u-rate :count="count" v-model="form['grade__0']"></u-rate></u-form-item>
						<u-form-item label="内容" label-position="top" prop="comment__0">
							<u-input type="textarea" height="100" maxlength="150" v-model="form['comment__0']" />
						</u-form-item>
					</block>
					<block v-if="info.type == 1">
						<view v-for="(item, index) in info.source_data" :key="index">
							<u-form-item label="商品" label-position="top">
								<view class="u-tips-color">{{ item.name }}</view>
							</u-form-item>
							<u-form-item label="评分" label-position="top" :prop="'grade__' + index">
								<u-rate :count="count" v-model="form['grade__' + index]"></u-rate>
							</u-form-item>
							<u-form-item label="内容" label-position="top" :prop="'comment__' + index">
								<u-input type="textarea" height="100" maxlength="150" v-model="form['comment__' + index]" />
							</u-form-item>
						</view>
					</block>
				</u-form>
			</view>
		</view>
		<view class="u-p-60">
			<u-button type="primary" hover-class="none" :custom-style="{ backgroundColor: theme.bgColor, color: theme.color }" shape="circle" @click="submit">
				立即提交
			</u-button>
		</view>
	</view>
</template>

<script>
export default {
	onLoad(e) {
		this.order_id = e.id || '';
		this.getDetail();
	},
	data() {
		return {
			form: {
				'comment__0': '',
				'grade__0': 5
			},
			rules: {
				'comment__0': [
					{
						required: true,
						message: '请输入评论内容',
						trigger: ['change', 'blur']
					},
					{
						min: 5,
						message: '评论不能少于5个字',
						trigger: 'change'
					}
				]
			},
			count: 5,
			order_id: '',
			info: {}
		};
	},
	methods: {
		getDetail() {
			this.$api.orderDetail({ id: this.order_id }).then(res => {
				if (res.code) {
					this.info = res.data;
					if (this.info.type == 1) {
						this.info.source_data.forEach((item, index) => {
							this.form['grade__' + index] = 5;
							this.form['comment__' + index] = '';
							this.form['source_id__'+index] = item.goods_id;
							this.rules['comment__' + index] = [
								{
									required: true,
									message: '请输入评论内容',
									trigger: ['change', 'blur']
								},
								{
									min: 5,
									message: '评论不能少于5个字',
									trigger: 'change'
								}
							];
						});
					}else{
						this.form['source_id__0'] = this.info.source_id;
					}
					this.$nextTick(() => {
						this.$refs.uForm.setRules(this.rules);
					});
				}
			});
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					if (!this.order_id) {
						this.$u.toast('参数缺失！');
						return;
					}
					let form = {order_id : this.order_id};
					let arr = [];
					for(let key in this.form){
						let item = this.form[key];
						let k = key.split('__');
						if(arr[k[1]] == undefined){
							arr.push({
								comment: "",
								source_id: '',
								grade: 5
							})
						}
						arr[k[1]][k[0]] = item;
					}
					form.remark = arr;
					this.$api.addComment(form).then(res => {
						this.$u.toast(res.msg);
						if (res.code == 1) {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1000);
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

<style></style>
