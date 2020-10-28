<template>
	<view>
		<view class="myaddress">
			<view v-for="(item, index) in addressList" :key="index" class="order_address">
				<view class="address_box">
					<view @click="onsetAddress(item)">
						<view class="center">
							<view v-if="item.isdefult == 0" class="moren">
								<image src="../../../static/images/system/moren.png" mode="aspectFit"></image>
							</view>
							<!-- <view class="moren"> 
							</view> -->
							<view class="name">
								收件人：<text class="text1">{{item.name}}</text>
								
							</view>
							<view class="address_name">联系电话：<text class="phones">{{item.phone}}</text></view>
						</view>
					</view>
					<view class="caozuo">
						<view class="del" @tap="delAddress(item,index)">
							<text class="iconfont icon-shanchu"></text>
							删除
						</view>
						<view class="edit" @tap="editAddress(item)">
							<text class="iconfont icon-bianji"></text>
							编辑
						</view>
					</view>
				
			</view>
		</view>
		<nodata :colors="colors" title="暂无收货地址" v-if="addressList.length == 0"></nodata>
	</view>
	<view class="save">
		<view class="btn" @tap="addAddress">添加收件人</view>
	</view>
	<loading v-if="isShow == true"></loading>
	</view>
</template>

<script>
	var app = getApp();
	import loading from "../../commponent/public/loading";
	import {
		setAddress
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				colors: '',
				addressList: [{
					name: '石瑞江',
					phone: '13588888888',
					address_name: '西安市未央区文景路starway酒店fiveFloor',
					isdefult: 0,
					id: 1
				}, {
					name: '张伟',
					phone: '13566666666',
					address_name: '西安市未央区文景路starway酒店fiveFloor',
					isdefult: 1,
					id: 2
				}],
				isShow: true,
				type:''
			};
		},

		components: {
			loading
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let type = options.type || ''
			this.setData({
				colors: app.globalData.newColor,
				type: type
			});
			setTimeout(() => {
				this.setData({
					isShow: false
				});
			}, 600);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			editAddress(item) {
				//编辑收货地址
				uni.navigateTo({
					url: '/pages/views/user/address/edit?addressId=' + item.id
				});
			},

			addAddress() {
				//添加收货地址
				uni.navigateTo({
					url: '/pages/views/user/address/edit'
				});
			},
			onsetAddress(item){
				if(this.type="select"){
					setAddress(item)
					uni.navigateBack(-1)
				}
			},
			delAddress(item,index){
				uni.showModal({
					title:'提示',
					content:'确认要删除该地址吗?',
					confirmText:'删除',
					confirmColor:this.colors,
					success: (res) => {
						if(res.confirm){
							uni.showToast({
								title:'删除成功~',
								icon:'none'
							})
							this.addressList.splice(index, 1)
						}
					}
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.myaddress {
		padding: 10upx 4%;
		padding-bottom: 140upx;
	}

	.order_address {
		height: 180upx;
		width: 100%;
		background-color: #fff;
		border-radius: 10upx;
		position: relative;
		box-shadow: 0upx 0upx 10upx #ddd;
		margin-bottom: 20upx;
	}

	.order_address image {
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.address_box {
		width: 100%;
		height: 100%;
		display: block;
		z-index: 10;
		box-sizing: border-box;
		padding: 20upx;
		display: flex;
		align-items: center;
	}

	.weizhi_icon text {
		font-size: 40upx;
		margin-left: 10upx;
	}

	.address_box .center {
		margin-left: 20upx;
	}

	.address_box .center .name {
		color: #999;
		height: 60upx;
		line-height: 60upx;
	}

	.address_box .center .name .text1 {
		font-size: 26upx;
		color: #000;
		display: inline-block;
		margin-right: 20upx;
	}

	.phones {
		font-size: 24upx;
		color: #999;
		z-index: 0;
	}

	.address_box .address_name {
		font-size: 26upx;
		color: #999;
	}
	.address_box .address_name text{
		color: #000;
	}
	.noaddress {
		margin-left: 40upx;
		font-weight: bold;
		color: #333;
		font-size: 26upx;
	}

	.caozuo {
		position: absolute;
		right: 20upx;
		display: flex;
		top: 20upx;
	}

	.caozuo view {
		font-size: 24upx;
		color: #666;
		margin-left: 30upx;
	}

	.caozuo view text {
		font-size: 24upx;
	}

	.moren {
		image{
			width: 65upx;
			height: 65upx;
		}
	}

	.moren text {
		font-size: 60upx;
	}

	.save {
		position: fixed;
		bottom: 80upx;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.save view {
		display: flex;
	}

	.save .btn {
		width: 70%;
		height: 80upx;
		border-radius: 80upx;
		background: #39B978;
		color: #fff;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
	}
</style>
