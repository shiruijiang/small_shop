<template>
	<view class="goodsDetails">
		<!-- 顶部自定义导航栏 -->
		<!-- <navBar textcolor="#000" :showLeft="true" :showTitle="false"></navBar> -->
		<!-- 轮播图 -->
		<view class="carousel">
			<swiper circular="true" duration="400" controls touchable
			 @change="swiperchange">
				<swiper-item :key="index" class="swiper-item"  @click="preview(goodsData.imgList,index)" >
					<view class="image-wrapper" >
						<image :src="'https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs'+goodList.productPicture" class="loaded" mode="aspectFit"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 占位 -->
		<!-- <view class="place" :style="'top:-' + toBar"></view> -->
		<!-- 商品信息 -->
		<view class="goods_price">
			<text class="money">￥{{goodList.productPrice}}</text>
			<text class="h_money">￥{{goodList.originalPrice}}</text>
			<view>860人付款</view>
		</view>
		
		<view class="goods_info">
			<view class="goods_name">
				{{goodList.productName}}
			</view>
			
			<view class="shoucang">
				<view class="sc_icons" @tap="setisColl">
					<text :class="['iconfont',isColl == true?'icon-shoucang1':'icon-shoucang'] " :style="{color: isColl == true? colors :''}"></text>
				</view>
				<view class="sc_text" :style="{color: isColl == true? colors :''}">收藏</view>
			</view>
		</view>
		<view class="other">
			<!-- <p v-if="goodsData.baoyou == true">快递:包邮</p> -->
			<p>规格 <text style="color: #010101;margin-left: 10upx;">3斤/件</text></p>
			<!-- <p>销量:100</p> -->
		</view>
		
		
		
		<!-- 分享按钮 -->
		<!-- <view class="share" :style="'transform: translateY(-' + toBar + ');'">
			<view class="tips" style="color: #666;">
				<text class="iconfont icon-zuanshi" style="color: #FF546E;font-size: 38upx;font-weight: 600;"></text>
				分享商品可获得商城积分
			</view> -->
			<!-- #ifdef MP -->
			<!-- <view class="onshare" style="color: #FF546E;">
				<text class="iconfont icon-fenxiang"></text>
				<button open-type="share" class="share_btn">1</button>
				立即分享
			</view> -->
			<!-- #endif -->
			<!-- <view class="poster" style="color: #FF546E;" @tap="openPoster">
				<text class="iconfont icon-CombinedShape"></text>
				生成海报
			</view>
		</view> -->
		<!-- 店铺信息 -->
		<!-- <view class="shop" :style="'transform: translateY(-' + toBar + ');'">
			<image class="shop_img" src="/static/images/log.png" mode="aspectFill"></image>
			<view class="shop_center">
				<view class="shop_name">北京零食店店</view>
				<view class="shop_address">北京市海淀区苏家坨乡前沙润村北京市海淀区苏家坨乡前沙润村</view>
			</view> -->
			<!-- #ifdef MP -->
			<!-- <view class="shoucang go_btn" @tap="nearAddress">
				<view class="sc_icons">
					<text class="iconfont icon-dizhi"></text>
				</view>
				<view class="sc_text">到这去</view>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<!-- 直接打开地图需要传递店铺的经纬度 来获取店铺的位置 -->
			<!-- <view class="shoucang go_btn" @tap="openMap">
				<view class="sc_icons">
					<text class="iconfont icon-dizhi"></text>
				</view>
				<view class="sc_text">到这去</view>
			</view> -->
			<!-- #endif -->
		<!-- </view> -->
		<!-- 商品详情 -->
		<view class="pintuan-text">
			<view>他们正在拼团,快来加入吧</view>
			<view style="color: #999;font-size: 24upx;"><span>更多拼团</span><image src="https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/home/right.png" mode=""></image></view>
		</view>
		<!-- <swiper class="pintuan" circular="true" :interval="3000" :duration="1000" vertical="true">
			<swiper-item>
				<view class="swiper-item">
					<view>
						<image src="../../../static/images/system/add2.png" mode=""></image>
						<image src="../../../static/images/system/add2.png" mode=""></image>
						<image src="../../../static/images/system/add2.png" mode=""></image>
					</view>
					<text>月球上的人</text>
					<text>差2人拼成<br/>剩余23:56:51</text>
					<text>去拼团</text>
				</view>
				<view class="swiper-item">
					<image src="../../../static/images/system/add2.png" mode=""></image>
					<text>月球上的人</text>
					<text>差2人拼成<br/>剩余23:56:51</text>
					<text>去拼团</text>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../../static/images/system/add2.png" mode=""></image>
					<text>月球上的人</text>
					<text>差2人拼成<br/>剩余23:56:51</text>
					<text>去拼团</text>
				</view>
			</swiper-item>
		</swiper> -->
		<view class="details">
			<view class="details_title">
				—— <text style="color: #666666;margin: 0 20upx;"> 商品详情 </text> ——
			</view>
			<view class="details_content">
				<!-- <rich-text :nodes="descriptionStr"></rich-text> -->
				<view id="commDesc" hasdata="1" style="line-height: 2; transform-origin: 0px 0px; width:100%;height: 100%;">
					<image src="../../../static/images/home/storeDetail.jpg" mode="aspectFill" style="width:100%;height: 100%;"></image>
				</view>
			</view>
		</view>
		<!-- 底部操作栏 -->
		<view class="operation">
			<view class="home" @tap="toHome">
				<image src="../../../static/images/system/detail-home.png" mode="" style="margin: 10upx auto;"></image>
				<text>首页</text>
			</view>
			<view class="cart" @tap="toCart" style="margin-left: 20upx;">
				<image src="../../../static/images/system/detail-cart.png" mode="" style="margin: 10upx auto;"></image>
				<text>购物车</text>
			</view>
			<view class="btns">
				<view class="addcart" style="background: #EFCD49;color:#fff" @tap="openSku">
					加入购物车
				</view>
				<view class="dingjin" style="background: #009944;color:#fff" @tap="openSku">
					立即购买
				</view>
			</view>
		</view>
		<!-- 返回顶部按钮 -->
		<!-- <view class="go_top" :style="'right: ' + (scrollShow == true ? '3%':'-200upx')">
			<view class="ontop" @tap="goTop">
				<image src="/static/images/home/TOP.png"></image>
			</view>
		</view> -->
		<!-- <uni-popup ref="popup" type="center">
			<view class="center_poter" style="margin: 0 auto;" v-if="shows">
				<poster :posterData="goodsData"></poster>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	var app = getApp();
	import navBar from "../../commponent/public/navBar";
	import sku from "../../commponent/public/sku";
	import coupon from "../../commponent/public/coupon";
	import poster from '../../commponent/goods/poster.vue'
	export default {
		data() {
			return {
				colors: '',
				shows: false,
				statusBarHeight: app.globalData.statusHeight + 'px',
				toBar: app.globalData.toBar + 'px',
				showdots: false,
				swiperList: [],
				isColl: false,
				latitude: '',
				longitude: '',
				nowList:{},
				goodList:{},
				goodsData: {
				},
				showModal: false,
				couponshow: false,
				isshowVideo: true,
				voice: false,
				showVideo: false,
				isShow: true,
				// 商品详情
				scrollShow: false,
			};
		},

		components: {
			navBar,
			sku,
			coupon,
			poster,
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad(options) {
			const item = JSON.parse(decodeURIComponent(options.item));
			console.log(item,'传过来的参数')
			this.setData({
				goodList:item
			})
			this.setFrom(this.descriptionStr);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow() {
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		
		/**
		 * 生命周期函数--监听页面滚动
		 */
		onPageScroll: function(e) {
			if(e.scrollTop >= 400){
				this.scrollShow = true
			}else{
				this.scrollShow = false
			}
		},

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
		onShareAppMessage: function() {
			return {
			    title: this.goodsData.title,
			    path: '/pages/views/goods/goodsDetails',
				imageUrl: this.goodsData.img
			}
		},
		/**
		 * 用户点击右上角分享到朋友圈
		 */
		onShareTimeline: function(){
			return {
			    title: this.goodsData.title,
			    path: '/pages/views/goods/goodsDetails',
				imageUrl: this.goodsData.img
			}
		},
		methods: {
			openPoster(){ //生成海报
				this.shows = false
				uni.showLoading({
					title:'海报绘制中..'
				})
				this.$refs.popup.open()
				setTimeout(()=>{
					uni.hideLoading()
					this.shows = true
				},600)
			},
			setisColl() {
				//收藏与取消收藏
				let iscoll = !this.isColl;
				this.setData({
					isColl: iscoll
				});
			},
			openMap() {
				//打开地图
				let that = this;
				uni.openLocation({
					latitude: 39.90,
					longitude: 116.40,
					success: e => {
						
					}
				});
			},
			nearAddress() {
				if (this.longitude !== '') {
					this.openMap();
				} else {
					const _this = this; // 处理拒绝再次打开调用设置
					uni.getSetting({
						success(res) {
							if (res && res.authSetting && res.authSetting.hasOwnProperty('scope.userLocation')) {
								uni.openSetting({
									success() {
										_this.getLocation();
									}

								});
							}
						}

					});
				}
			},
			onhide(){
				this.showModal = false
			},
			openSku() {
				console.log('1111111111111')
				this.nowList = this.goodList
				this.showModal = true
				console.log(this.showModal,'状态')
			},
			opencoupon() {
				this.couponshow = true
			},
			hidecoupon() {
				this.couponshow = false
			},
			toHome() {
				uni.switchTab({
					url: '/pages/views/tabBar/home'
				});
			},

			toCart() {
				uni.switchTab({
					url: '/pages/views/tabBar/cart'
				});
			},

			// 轮播图视频播放
			swiperchange(e) {
				if (this.videoContext) {
					if (e.detail.current != 0) {
						this.videoContext.pause();
					} else if (e.detail.current == 0) {
						// #ifdef MP
						if (this.isshowVideo == false) { //自动播放
							this.videoContext.play();
						}
						// #endif
					}
				}
			},
			preview(imgs, index){ //预览图片
				uni.previewImage({
					current:index,
					urls:imgs
				})
			},
			goTop(){ //返回顶部
				uni.pageScrollTo({
					scrollTop: 0
				});
			},
			seeAll(){ //查看全部评论
				uni.navigateTo({
					url:'/pages/views/goods/goodsEvaluate'
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	.carousel {
		height: 50vw;
		width: 100vw;
		top: 0upx;
		left: 0;
		z-index: 10;
	}
	.goodsDetails{
		height: auto;
		background: #f8f8f8;
	}
	.carousel swiper {
		height: 100%;
	}
	
	.image-wrapper {
		width: 100%;
		height: 100%;
	}
	.pintuan-text{
		color: #000000;
		background: #fff;
		width: 100%;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		padding: 30upx 30upx;
		margin-top: 20upx;
		font-size: 26upx;
		text-align: center;
	}
	.pintuan-text image{
		width: 20upx;
		height: 24upx;
		margin: 7upx 3upx;
		float: right;
	}
	.pintuan{
		width: 100%;
		height: 26vw;
		background:#fff
	}
	.pintuan .swiper-item{
		height: 13vw;
		width: 100% !important;
		// margin: 20upx 0;
		display: flex;
		line-height: 13vw;
		flex: 1;
	}
	.pintuan .swiper-item image{
		width: 66upx;
		height: 66upx;
		margin-top: 15upx;
		margin-left: -10upx;
	}
	.swiper-item {
		display: flex;
		justify-content: center;
		align-content: center;
		height: 50vw;
		border-bottom: 1upx solid rgba(0, 0, 0, 0.01);
		position: relative;
	}
	
	.swiper-item image {
		width: 100%;
		height: 100%;
	}
	
	.place {
		height: 50vw;
		position: relative;
		top: 0;
		left: 0;
	}
	
	.goods_info {
		padding: 30upx 30upx;
		padding-bottom: 20upx;
		background: #fff;
		position: relative;
	}
	
	.goods_info .goods_name {
		font-size: 30upx;
		font-weight: bold;
		color: #333;
		width: 100%;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.goods_info .goods_price {
		display: flex;
		align-items: center;
	}
	.goods_price{
		width: 100%;
		height: 103upx;
		background: linear-gradient(129deg, #E74949 42%, #F5EB69 100%);
	}
	.goods_price view{
		display: inline-block;
		margin-left: 54%;
		font-size: 20upx;
		color: #fff;
	}
	.goods_price .money {
		display: inline-block;
		color: #fff;
		font-size: 30upx;
		padding: 32upx 20upx 32upx 30upx;
	}
	
	.goods_price .h_money {
		display: inline-block;
		text-decoration: line-through;
		color: #fff;
		font-size: 20upx;
	}
	.other{
		background: #fff;
		padding: 3% 30upx;
		height: 60upx;
		line-height: 60upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24upx;
		color: #999;
	}
	.baoyou {
		height: 30upx;
		font-size: 20upx;
		/* #ifdef MP */
		line-height: 30upx;
		/* #endif */
		/* #ifdef H5 */
		line-height: 35upx;
		/* #endif */
		background-color: #FF546E;
		padding: 0 10upx;
		color: #FFFFFF;
		margin-left: 30upx;
		border-radius: 4upx;
	}
	
	.shoucang,
	.go_btn {
		width: 60upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 20upx;
		top: 74%;
		transform: translateY(-50%);
	}
	
	.go_btn {
		top: 50% !important;
	}
	
	.shoucang .sc_icons text {
		font-size: 36upx;
		color: #999;
	}
	
	.shoucang .sc_text {
		font-size: 22upx;
		color: #999;
		font-weight: 500;
	}
	
	.share {
		display: flex;
		padding: 0 4%;
		background-color: #FAEFF7;
		font-size: 24upx;
		justify-content: space-between;
	}
	
	.share_btn {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0;
	}
	
	.share view {
		display: flex;
		align-items: center;
		height: 80upx;
		line-height: 80upx;
		position: relative;
		align-content: center;
	}
	.share view text {
		margin-right: 10upx;
	}
	
	.shop {
		padding: 20upx 4%;
		display: flex;
		justify-content: flex-start;
		border-bottom: 1upx dashed #eee;
	}
	
	.shop .shop_img {
		width: 140upx;
		height: 120upx;
		display: block;
		box-sizing: border-box;
		border-radius: 8upx;
	}
	
	.shop_center {
		margin-left: 20upx;
	}
	
	.shop_center .shop_name {
		font-size: 28upx;
		color: #333;
		font-weight: bold;
	}
	
	.shop_center .shop_address {
		font-size: 24upx;
		color: #666;
		margin-top: 20upx;
		width: 80%;
	}
	
	.sku_pon {
		padding: 0 4%;
	}
	
	.cell {
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1upx solid #eee;
	}
	
	.cell .text1 {
		width: 30%;
		color: #999;
		font-size: 24upx;
	}
	
	.cell .text2 {
		width: 65%;
		color: #999;
		font-size: 24upx;
	}
	
	.cell image {
		width: 40upx;
		height: 40upx;
		/* display: block; */
		float: right;
	}
	
	.details {
		height: 182vh;
		padding: 20upx 0;
		margin-top: 20upx;
		border-top: 10upx solid #ddd;
	}
	
	.details_title {
		text-align: center;
		color: #999;
	}
	
	.details_content {
		margin-top: 30upx;
		width: 100%;
		height: 100%;
	}
	
	.operation {
		height: 100upx;
		width: 100vw;
		line-height: 100upx;
		display: flex;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		background-color: #F0F0F0;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0 20upx;
		padding-left: 30upx;
		z-index: 90;
	}
	
	.operation .home,
	.cart {
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		display: flex;
		flex-direction: column;
		margin-top: 10upx;
	}
	.operation .home text,.cart text{
		height: 20upx;
		display: block;
		font-size: 24upx;
		width: 100upx;
		margin: 0;
		margin-top: -40upx;
		color: #009944;
	}
	.operation .home image,
	.cart image {
		width: 45upx;
		height: 45upx;
		margin-top: 20upx;
	}
	
	.operation .btns {
		display: flex;
		width: 70vw;
		justify-content: flex-end;
	}
	
	.operation .btns .addcart {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		padding: 0 40upx;
		border-radius: 40upx 0 0 40upx;
		font-size: 24upx;
	}
	
	.operation .btns .dingjin {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		padding: 0 40upx;
		border-radius: 0 40upx 40upx 0;
		border-left: none;
		font-size: 24upx;
		color: #fff;
	}
	
	/* 优惠券 */
	.coupon {
		background-color: #fff;
		border-radius: 10upx 10upx 0 0;
		position: fixed;
		left: 0;
		bottom: -1000upx;
		z-index: 999;
		transition: all 0.3s;
	}
	
	// .mask {
	// 	width: 100%;
	// 	height: 100%;
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	background: #000;
	// 	z-index: 900;
	// 	opacity: 0.7;
	// }
	
	.scrolls {
		width: 100vw;
		height: 60vh;
		padding-top: 10upx;
		z-index: 500;
	}
	
	/* 播放视频的轮播图样式 */
	
	
	/* 静音按钮 */
	
	
	/* 预览视频弹窗 */
	
	.onshowvideo {
		opacity: 1;
		left: 0;
		z-index: 900;
	}
	
	
	
	
	.evaluate{
		padding: 0 4%;
		border-top: 10upx solid #ddd;
		.eva_title{
			height: 70upx;
			margin-top: 10upx;
			line-height: 70upx;
			font-size: 30upx;
			font-weight: bold;
			color: #202020;
			text{
				font-weight: normal;
			}
			.seeAll{
				float: right;
				font-size: 24upx;
				color: #999999;
				transform: translateY(6upx);
				&:active{
					opacity: 0.8;
				}
			}
		}
		.evaluate_box{
			.pingjia {
				background-color: #ffffff;
				.pingjia_box {
					margin-top: 20upx;
					padding-bottom: 20upx;
					border-bottom: 1upx solid #f2f2f2;
					&:last-child {
						border-bottom: none;
						padding-bottom: 10upx;
					}
					.box_top {
						display: flex;
						.head {
							height: 80upx;
							max-width: 80upx;
							min-width: 80upx;
							flex: 1;
							border-radius: 50%;
							float: left;
						}
						.right {
							flex: 1;
							margin-left: 20upx;
							position: relative;
							.name {
								font-size: 26upx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: rgba(0, 0, 0, 1);
							}
							.p2 {
								margin-top: 20upx;
								font-size: 24upx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: rgba(156, 156, 156, 1);
								.text2 {
									margin-left: 50upx;
								}
							}
							.p3 {
								height: 35upx;
								position: absolute;
								right: 0;
								width: 200upx;
								top: 8upx;
								image {
									width: 35upx;
									height: 35upx;
									float: left;
									margin-left: 5upx;
								}
							}
						}
					}
					.tag_box {
						margin-top: 20upx;
						.tags {
							font-size: 22upx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							background-color: #FAEFF7;
							color: #FF546E;
							float: left;
							height: 50upx;
							line-height: 50upx;
							padding: 0 15upx;
							border-radius: 25upx;
							text-align: center;
							margin-right: 20upx;
						}
					}
					.ping_neirong {
						font-size: 28upx;
						margin-top: 20upx;
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
						line-height: 50upx;
					}
					.ping_img {
						display: flex;
						flex-wrap: wrap;
						align-items: flex-start;
						align-content: flex-start;
						justify-content: space-between;
						margin-top: 20upx;
						&::after {
							content: '';
							max-width: 29vw;
							min-width: 29vw;
						}
						image {
							max-width: 29vw;
							min-width: 29vw;
							height: 29vw;
							border-radius: 10upx;
							margin-bottom: 20upx;
						}
					}
					.huifu {
						padding: 20upx;
						background-color: #f3f3f3;
						border-radius: 10upx;
						font-size: 24upx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: rgba(77, 77, 77, 1);
					}
				}
			}
		}
	}
	.go_top{
		position: fixed;
		bottom: 12vh;
		right: -200upx;
		width: 80upx;
		z-index: 200;
		transition: all 0.3s;
		.ontop {
			width: 70upx;
			height: 70upx;
			background-color: rgba(0, 0, 0, 0.6);
			border-radius: 50%;
			transition: all 0.3s;
		}
		.ontop:active {
			opacity: 0.8;
		}
		.ontop image {
			width: 45upx;
			height: 55upx;
			display: block;
			margin: 0 auto;
			padding-top: 15upx;
		}
	}
	/deep/.rich-img {
	  width: 100%;
	  height: auto;
	}
</style>
