<template>
	<view class="container">
		<!-- 顶部面板 -->
		<view class="top--panel">
			<view class="search">
				<search class="search_box"></search>
			</view>
		</view>
		<!-- 滚动区域 -->
		<view class="scroll-panel" id="scroll-panel">
			<view class="list-box">
				<view class="left">
					<scroll-view scroll-y="true"  class="menu-wrapper"
						:style="{ 'height':scrollHeight + 'px' }" 
						:scroll-into-view="leftIntoView"
						>
						<view class="menu-item" 
							v-for="(item,index) in categoryList"
							:key="index" 
							:id="'left-'+index"
						
							@tap="leftTap(index)"
							:class="{'current':leftIndex==index }"
						>{{item.productTypeName}}</view>
						
			        </scroll-view>
				</view>
				<view class="main">
					<scroll-view class="foods-wrapper"  scroll-y="true" :style="{ 'height':scrollHeight + 'px' }" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true">
						<view class="foods" v-for="(item,index) in categoryList" :key="index" :id="'item-'+index">
							<view class="food-title">
								<view>{{item.productTypeName}}</view>
							</view>
							<view class="food" v-for="(item2,index2) in item.productList" :key="index2">
								<image :src="'https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs'+item2.productPicture" mode="" style="width: 75px;height: 75px;margin-top: 6px;"></image>
								<view class="food-info">
									<text class="twoline">{{item2.productName}}</text>
									<!-- 加减 -->
									<view class="food-btm">
										<text class="food-price">￥{{item2.productPrice}}</text>
								
										<cartcontrol :item2="item2" @add="addCart" @dec="decreaseCart"></cartcontrol>
								
									</view>
								</view>
							</view>
						</view>
						<view class="fill-last" :style="{ 'height':fillHeight + 'px' }"></view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import search from "../../commponent/public/search1.vue";
	import cartcontrol from '../../../components/cartcontrol.vue';
	import Vue from 'vue';
	export default {
		data() {
			return {
				categoryList: [],
				scrollHeight:200,
				scrollTopSize:0,
				fillHeight:0,	// 填充高度，用于最后一项低于滚动区域时使用
				leftArray:[],
				mainArray:[],
				topArr:[],
				leftIndex:0,
				scrollInto:'',
				cartlist:[],
				userid:{},
			}
		},
		watch: {
			getAllCount(newName, oldName) {
				if (newName > 0) {
					uni.setTabBarBadge({
						//给tabBar添加角标
						index: 2,
						text: String(newName)
					});
				}else{
					uni.removeTabBarBadge({
						//给tabBar添加角标
						index: 2,
						text: String(newName)
					});
				} 
			}
		},
		computed:{
			/* 计算左侧滚动位置定位 */
			leftIntoView(){
				return `left-${this.leftIndex > 3 ? (this.leftIndex-3):0}`;
			},
			getList() {
				let result = [];
				this.categoryList.forEach((good) => {
					good.productList.forEach((food) => {
						if (food.productNum) {
							result.push(food)
						}
					})
				})
				return result
			},
			// 获得购物车所有商品数量	
			getAllCount: function(item) {
				// console.log('item', item)
				let result = [];
				let count = 0;
			
				for (let i = 0; i < this.categoryList.length; i++) {
					
					this.categoryList[i].productList.forEach((food) => {
						if (food.productNum >= 0) {
							count += food.productNum
							Vue.set(this.categoryList[i], 'count', count)
						}
					})
					result.push(count)
				}
			
				result.sort(function(a, b) {
					return a - b;
				})
				count = result[result.length - 1]
				return count;
			}
		},
		components: {
					cartcontrol,
					search,
				},
		mounted(){
			/* 等待DOM挂载完成 */
			this.$nextTick(()=>{
				/* 在非H5平台，nextTick回调后有概率获取到错误的元素高度，则添加200ms的延迟来减少BUG的产生 */
				setTimeout(()=>{
					/* 等待滚动区域初始化完成 */
					this.initScrollView().then(()=>{
						/* 获取列表数据，你的代码从此处开始 */
						// this.getListData();
					})
				},200);
			})
		},
		onLoad() {
			this.getcateList();
			this.userid = uni.getStorageSync('StoreNumber')
			this.cartlist = uni.getStorageSync('cart');
			let telModel = uni.getSystemInfoSync().model;
			       if (telModel.indexOf('iPhone X') != -1) {
			         this.setData({ titleClass: 'title-ipX', bodyClass: 'content-body-ipX' });
			       } else if (telModel.indexOf('Nexus 5') != -1) {
			         this.setData({ titleClass: 'title-Ne5', bodyClass: 'content-body-nex5' });
			       } else if (telModel.indexOf('iPhone 6') != -1 || telModel.indexOf('iPhone 6 Plus') != -1 ||
			         telModel.indexOf('iPhone 7') != -1 || telModel.indexOf('iPhone 7 Plus') != -1 ||
			         telModel.indexOf('Nexus 5x') != -1 || telModel.indexOf('Nexus 6') != -1
			       ) {
			         this.setData({ titleClass: 'title-IP6', bodyClass: 'content-body' });
			       } else {
			         this.setData({ titleClass: 'title', bodyClass: 'content-body-IP5' });
			       }		
		},
		onHide() {
			this.cartlist = uni.getStorageSync('cart');
			// if(uni.getStorageSync('userId')){
			// 	this.quCart()
			// }	
		},
		methods: {
			//添加完成商品购物车
				quCart() {
				let userId=uni.getStorageSync('userId');
				let data = {
					userId:userId,
					shoppingCartReq:JSON.stringify(this.cartlist)
				}
				uni.showLoading({
					mask:true
				})
				this.$request('/shoppingCart/save', data, 'POST', ).then(res=>{
					if(res.code==1){
						uni.hideLoading()
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			//获取分类列表
			getcateList() {
				let data = {
					// typeName:'',
					status: 0,
					indexType: '2'
				}
				uni.showLoading({
					mask:true
				})
				this.$request('/productType/list', data, 'POST',).then(res=>{
					if(res.code==1){
						uni.hideLoading()
						this.categoryList = res.obj;
						if(uni.getStorageSync('cart')){
							res.obj.forEach(item=>{
								item.productList.forEach(it=>{
									this.cartlist.forEach(ite=>{
										if(it.id==ite.productId){
											console.log(ite.productNum,'11111')
											console.log('判断进来了')
											it.productNum=ite.productNum
										}
									})
								})
							})
						}
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			/* 初始化滚动区域 */
			initScrollView(){
				return new Promise((resolve, reject)=>{
					let view = uni.createSelectorQuery().select('#scroll-panel');
					view.boundingClientRect(res => {
						this.scrollTopSize = res.top;
						this.scrollHeight = res.height;
						this.$nextTick(()=>{
							resolve();
						})
					}).exec();
				});
			},
			addCart(item) {
				if (item.productNum>=0) {
					item.productNum++;
					this.categoryList.forEach((good) => {
						good.productList.forEach((food) => {
							if (item.productName == food.productName)
								food.productNum = item.productNum
						})
			
					})
				}
			},
			decreaseCart(item) {
				if (item.productNum) {
					item.productNum--
					this.categoryList.forEach((good) => {
						good.productList.forEach((food) => {
							if (item.productName == food.productName)
								food.productNum = item.productNum
						})
					})
				}
			},
			/* 主区域滚动监听 */
			mainScroll(e){
				let top =e.detail.scrollTop;
				let index=0;
				/* 查找当前滚动距离 */
				for(let i = (this.topArr.length-1);i>=0;i--){
					/* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
					if((top+2)>=this.topArr[i]){
						index = i;
						break;
					}
				}	
			},
			/* 左侧导航点击 */
			leftTap(index){
				this.leftIndex = index
				this.scrollInto=`item-${index}`;
			}
		}
	}
</script>

<style  lang="scss">
page,.container{
	    height: 100%;
}
/* 容器 */
.container{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	padding: 0;
	&>view{
		width: 100%;
	}
	
	.scroll-panel{
		flex-grow: 1;
		height: 0;
		overflow: hidden;
	}
	
	.bottom-panel{
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom);		
	}
	
	.search_box {
		width: 90%;
	}
	.top--panel{
		height: 90rpx; 
		width: 70%;
		margin-left: 20rpx;
		margin-top: 80rpx;
	}
	.current {
		position: relative;
		z-index: 0;
		color: #000;
		font-weight: 700;
		border-radius: 10% 0;
		background: url(https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/goods/tuoyuan.png) no-repeat;
		background-size: 20%;
		background-position: 10upx 20upx;
		background-color: #fff;
		font-size: 30upx;
	}
}
	
	.menu-wrapper {
		text-align: center;
		width: 100%;
		display: flex;
		flex-direction: column;
		background: #F8F8F8;
	
	}
	
	.menu-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100upx;
		font-size: 28upx;
	}
	.foods-wrapper {
		margin-left: 20upx;
		width: 95%;
	}
	
	.food{
		display: flex;
		flex-direction: row;
		margin-bottom: 30upx;
	}
	.food-btm,
	.content {
		display: flex;
		flex-direction: row;
		// margin-bottom: 20rpx;
	}
	
	.food-title {
		padding: 4upx 0;
	}
	
	.food-info {
		margin-left: 20upx;
		margin-right: 32upx;
		display: flex;
		flex-direction: column;
		flex: 2;
		justify-content: space-between;
	}
	
	.food-btm {
		justify-content: space-between;
	
	}
	
	.food-price {
		color: #f01414;
		font-size: 32upx;
	}
.list-box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 200rpx;
		background-color: #f6f6f6;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
	}
}
</style>