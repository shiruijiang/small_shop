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
	@import "./goodsDetails.scss";
	/deep/.rich-img {
	  width: 100%;
	  height: auto;
	}
</style>
