<template>
	<view>
		<view class="order_list">
			<!-- 顶部tab -->
			<view class="nav_top" style="border-bottom: 1upx solid #F8F8F8;">
				<tabs :colors="colors" :tabList="tabList" :active="active" @setTabs="setTabs"></tabs>
			</view>
			<scroll-view class="list_box" :scroll-y="true" @scrolltolower="ongetMoreList">
				<view v-for="(item, index) in orderList" :key="index" class="lists">
					<view class="type">
						<text class="order_id">每日提货时间:17:00-19:00</text>
						<!-- <text class="order_id">订单编号:{{item.orderNumber}}</text> -->
						<text class="order_type" style="color:#E84A4A;font-weight: 600;" v-if="item.isPayment==1">
							待付款
						</text>
						<text class="order_type" style="color:#E84A4A;font-weight: 600;" v-else-if="item.isDelivery==4">
							待提货
						</text>
						<text class="order_type" style="color:#000000;font-weight: 400;" v-else-if="item.isDelivery==3">
							已提货
						</text>
						<text class="order_type" style="color:#E84A4A;font-weight: 600;" v-else>
							退货
						</text>
					</view>
					<view  class="top" @tap="jumpDetails(item)">
						<image :src="'https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs'+item.productPicture" mode="aspectFill"></image>
						<view class="top_right">
							<view class="order_name">{{item.productName}}</view>
							<!-- <view class="sku">规格：{{item.goods_sku_text || '暂无规格'}}</view> -->
							<view class="price">
								<view class="t1">￥{{item.productPrice}}</view>
								<view class="t3">
									x{{item.productNum}}
								</view>
							</view>
						</view>
					</view>
					<view class="bottom">
						<!-- <view class="address">店铺地址：{{addressMsg}}</view> -->
						<view class="btns">
							<!-- <block v-if="item.isPayment==1">
								<view class="pay" :style="'color:#fff;background:' + colors+ ';border-color:' + colors" @tap="jumpDetails(item)">去付款</view>
								<view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors" @tap="cencalOrder(item)">取消订单</view>	
							</block> -->
							<block v-if="item.isPayment==1">
								<view class="pay" :style="'color:#fff;background:' + colors+ ';border-color:' + colors">去付款</view>
								<view class="pay shouhou" @tap="onRefund(item)">取消订单</view>
							</block>
							<block v-else-if="item.isDelivery==4">
								<view class="pay" :style="'color:#fff;background:' + colors+ ';border-color:' + colors">确认提货</view>
								<view class="pay shouhou" @tap="onRefund(item)">申请退货</view>
							</block>
							<block v-else-if="item.isDelivery==3">
								<view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors" @tap="jumpDetails(item)">申请退货</view>
								<view class="pay shouhou" @tap="jumpDetails(item)">再次购买</view>
							</block>
							<view class="pay shouhou" v-else>查看详情</view>
						</view>
					</view>
				</view>
				<view class="nodata" v-if="orderList.length >= 3">—— 到底啦 ——</view>
				<nodata :colors="colors" title="暂无订单信息" v-if="orderList.length == 0"></nodata>
			</scroll-view>
		</view>
		<loading v-if="isShow == true"></loading>
	</view>
</template>

<script>
	var app = getApp();
	import tabs from "../../commponent/public/tabs";
	import loading from "../../commponent/public/loading";
	import navBar from '../../commponent/public/navBar.vue'
	export default {
		data() {
			return {
				statusBarHeight: app.globalData.statusHeight + 'px',
				toBarHeight: app.globalData.toBar + 'px',
				userId:null,
				data:{
					userId:uni.getStorageSync('userId')
				},
				tabList: [{
					name: '全部',
					id: 0
				}, {
					name: '待付款',
					id: 1
				}, {
					name: '待提货',
					id: 2
				},{
					name: '已提货',
					id: 3
				},
				{
					name: '退货',
					id: 4
				}],
				active: 0,
				orderList: [
					
				],
				isShow: true,
				colors: "",
				addressMsg:''
			};
		},
		filters: {
			setStatus(value) {
				if (value == 0) {
					return '全部订单'
				} else if (value == 1) {
					return '待付款'
				} else if (value == 2) {
					return '待提货'
				} else if (value == 3) {
					return '已提货'
				}else{
					return '退货'
				}
			}
		},
		components: {
			tabs,
			loading,
			navBar
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad (options) {
			if (options) {
				console.log(options,'zheshi')
				this.setData({
					active: Number(options.tabIndex)
				});
			}
			this.setData({
				colors: app.globalData.newColor
			});
			setTimeout(() => {
				this.setData({
					isShow: false
				});
			}, 600);
			let userId=uni.getStorageSync('userId')
			this.userId=userId
			this.getOrderList();
			let addressMsg=uni.getStorageSync('AddressMsg')
			this.addressMsg=addressMsg
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
			setTabs(item, index) {
				if(item.id==0){
					this.data={
						userId:this.userId
					};
					this.getOrderList();
				}
				else if(item.id==1){
					this.data={
						userId:this.userId,
						isPayment:1,
					}
					this.getOrderList();
				}else if(item.id==2){
					this.data={
						userId:this.userId,
						isDelivery:4,
					}
					this.getOrderList();
				}else if(item.id==3){
					this.data={
						userId:this.userId,
						isDelivery:3,
					}
					this.getOrderList();
				}else {
					this.data={
						userId:this.userId,
						orderStatus:2,
					}
					this.getOrderList();
				}
				console.log(item.id,'121213')
				this.setData({
					active: item.id
				});
			},

			jumpDetails(e) { //模拟跳转商品详情
			console.log(e,'sdsdsdsdsdsdsdsdsd')
				uni.navigateTo({
					url: '/pages/views/order/orderdetails?item='+encodeURIComponent(JSON.stringify(e)),
				});
			},
			cencalOrder(item) {
				//取消订单
				uni.showModal({
					title:'确认要取消该订单吗?',
					confirmColor:this.colors,
					success: (res) => {
						if(res.confirm){
							console.log('取消成功')
						}
					}
				})
			},
			onRefund(item){
				// 申请退款
				uni.navigateTo({
					url: '/pages/views/order/cancelorder?orderId'
				});
			},
			ongetMoreList() { //上拉获取更多商品列表
				console.log('触发到底事件')
			},
			getOrderList(){
					uni.showLoading({
						mask: true
					})
					console.log(this.data,'请求')
					let res = this.$request('/productOrder/page', this.data,'POST').then(res=>{
						uni.hideLoading()
						console.log(res,'购物车数据')
						if (res.code == 1) {
							this.orderList=res.obj.list
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
			}
		}
	};
</script>
<style scoped lang="scss">
	.order_list {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	.list_box {
		padding: 0 3%;
		box-sizing: border-box;
		height: calc(100vh - 60upx);
		overflow: hidden;
		/* #ifdef MP */
		// padding-bottom: 50upx;
		/* #endif */
		width: 100%;
		// padding-top: 20upx;
	}

	.lists {
		margin: 0 auto;
		padding: 20upx;
		margin-top: 5upx;
		background-color: #ffffff;
		border-radius: 10upx;
		margin-bottom: 20upx;
		box-shadow: 0upx 0upx 10upx #EDEDED;
		box-sizing: border-box;
		width: 98%;
	}

	.type {
		height: 50upx;
		font-size: 26upx;
		line-height: 50upx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
	}

	.type .order_id {
		display: block;
		width: 75%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #E84A4A;
		font-size: 24upx;
	}
	.type .order_type{
		display: block;
	}
	.lists .top {
		display: flex;
		align-content: center;
		margin-bottom: 20upx;
	}

	.lists .top image {
		min-width: 180upx;
		max-width: 180upx;
		height: 180upx;
		display: block;
		border-radius: 10upx;
	}

	.lists .top .top_right {
		margin-left: 20upx;
		width: 100%;
	}

	.lists .top .order_name {
		line-height: 40upx;
		height: 80upx;
		font-size: 26upx;
		font-weight: bold;
		color: #333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.lists .top .sku {
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
		border-radius: 8upx;
		padding: 0 10upx;
		color: #A7A7A7;
		background-color: #F7F7F7;
	}

	.lists .top .price {
		width: 100%;
		display: flex;
		align-items: center;
		height: 40upx;
		line-height: 40upx;
		margin-top: 20upx;
		position: relative;
	}

	.price .t1 {
		font-size: 30upx;
		// font-weight: bold;
		display: block;
		color: $mycolor;
	}

	.price .t2 {
		font-size: 24upx;
		margin-left: 15upx;
		display: block;
		color: #C5C5C5;
		text-decoration: line-through;
	}

	.price .t3 {
		float: right;
		font-weight: bold;
		font-size: 28upx;
		color: #999;
		position: absolute;
		right: 0upx;
		top: 0;
	}

	.list_box .bottom {
		margin-top: 20upx;
	}

	.list_box .bottom .address {
		font-size: 24upx;
		color: #696969;
	}

	.list_box .bottom .btns {
		margin-top: 15upx;
		overflow: hidden;
	}

	.list_box .bottom .btns .pay {
		padding: 8upx 15upx;
		border-radius: 8upx;
		text-align: center;
		font-size: 24upx;
		float: right;
		margin-left: 20upx;
		box-sizing: border-box;
		border: 1upx solid #ddd;
	}

	.pay:active {
		opacity: .8;
	}

	.nodata {
		color: #ccc;
		text-align: center;
		font-size: 24upx;
		margin-bottom: 30upx;
		height: 80upx;
		line-height: 80upx;
	}
</style>
