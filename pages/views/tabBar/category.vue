<template>
	<view style="height: 40px;">
		<view class="search">
			<search class="search_box"></search>
		</view>
		<view class="category">
			<scroll-view class="menu-wrapper" scroll-y :style="'height:'+height+'px'">
				<view ref="menuWrapper">
					<view style="position: relative;" v-for="(item,index) in categoryList" :key="index" ref="menuList" @click="select(index)"
					 :class="{'current': currentIndex == index}">
						<view class="menu-item">{{item.productTypeName}}</view>
					</view>
				</view>
			</scroll-view>
			<!--  @scroll="scroll" -->
			<scroll-view class="foods-wrapper" scroll-y :style="'height:'+height+'px'" :scroll-top="foodSTop">
				<view ref="foodsWrapper">
					<view ref="foodList" class="foods" v-for="(item, i) in categoryList" :key="i">

						<view class="food-title" style="color: #9A9A9A;font-size: 24upx;">
							{{item.productTypeName}}
						</view>
						<view class="food" v-for="(food, index) in item.productList" :key="index">
							<image :src="'https://jlzcpt.cn/file/gxs'+food.productPicture" mode="" style="width: 75px;height: 75px;margin-top: 6px;"></image>
							<view class="food-info">
								<text class="twoline">{{food.productName}}</text>
								<!-- 加减 -->
								<view class="food-btm">
									<text class="food-price">￥{{food.productPrice}}</text>

									<cartcontrol :food="food" @add="addCart" @dec="decreaseCart"></cartcontrol>

								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view v-else class="no-data">
					<i class="iconfont icon404"></i>
					暂无商品
				</view>
			
			<view class="no-data" v-if="item.productList.length === 0">
				<i class="iconfont icon404"></i>
				暂无分类
			</view> -->
			</scroll-view>
			<!-- <shopcart :categoryList="categoryList" @add="addCart" @dec="decreaseCart" @delAll="delAll"></shopcart> -->
		</view>
	</view>
</template>

<script>
	import search from "../../commponent/public/search1.vue";
	import cartcontrol from '../../../components/cartcontrol.vue'
	import Vue from 'vue'
	// import shopcart from '../../../components/shopcart.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				categoryList: [],
				height: 0,
				foodSTop: 0,
				currentIndex: 0,
				cartGouwu: {}
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
		components: {
			cartcontrol,
			search,
		},
		onLoad() {
			this.height = Number(uni.getSystemInfoSync().windowHeight) - 55;
			/**
			 * 生命周期函数--监听页面加载
			 */
			this.getcateList()

		},
		onHide() {

		},
		computed: {
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
		methods: {
			//添加完成商品购物车
			async quCart(item) {
				let data = {
					// typeName:'',
					productId: item.id,
					productName: item.productName,
					isSelected: 0,
					productPrice: item.productPrice,
					productNum: item.productNum,
				}
				let res = await this.$request('/shoppingCart/save', data, 'POST', )
				this.cartGouwu = res.obj
				// console.log(this.cartGouwu, "12356")
			},
			//获取分类列表
			async getcateList() {
				let data = {
					// typeName:'',
					status: 0,
					indexType: '2'
				}
				let res = await this.$request('/productType/list', data, 'POST', )
				this.categoryList = res.obj
			},
			// 点击侧边栏
			select(index) {
				this.currentIndex = index;
				this.setScrollH(index);

			},

			// 设置点击侧边栏右边滚动的高度
			setScrollH: function(index) {
				var that = this;
				let height = 0;
				var query = uni.createSelectorQuery();
				let foods = query.selectAll('.foods');
				console.log('foods', foods);

				this.$nextTick(function() {
					foods.fields({
						size: true
					}, data => {
						if (index == 0) {
							that.foodSTop = 0;
						}
						for (let i = 0; i < index; i++) {
							let heightS=10
							height += parseInt(data[i].height);
							if(index>1){
								height+=heightS
							}
							console.log('fh', height);
							that.foodSTop = height;
							// console.log(that.foodSTop)
						}

					}).exec();
				})

			},

			addCart(item) {
				console.log(item, "=========+++++")
				if (item.productNum>=0) {
					item.productNum++;
					this.categoryList.forEach((good) => {
						good.productList.forEach((food) => {
							if (item.productName == food.productName)
								food.productNum = item.productNum
						})

					})
				}
					//  else {
					// 	console.log('add')
					// 	this.categoryList.forEach((good) => {
					// 		good.productList.forEach((food) => {
					// 			if (item.productName == food.productName)
					// 				Vue.set(food, 'productNum', 1)
					// 		})
					// 	})
					// }

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
			// 清空购物车
			delAll() {
				this.categoryList.forEach((good) => {
					good.productList.forEach((food) => {
						if (food.productNum) {
							food.productNum = 0
						}
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.twoline {
		font-size: 28upx;
		margin-top: 14upx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.category {
		display: flex;
		position: absolute;
		top: 135upx;
		width: 100%;
		overflow: hidden;
	}

	.search {
		height: 80upx;
		padding: 10upx 165upx;
		padding-left: 50upx;
		background-color: #ffffff;
		overflow: hidden;
		display: flex;
		margin-top: 46upx
	}

	.search_box {
		width: 90%;
	}

	.current {
		position: relative;
		z-index: 0;
		color: #000;
		font-weight: 700;
		border-radius: 10% 0;
		background: url(https://jlzcpt.cn/file/gxs/goods/tuoyuan.png) no-repeat;
		background-size: 20%;
		background-position: 10upx 20upx;
		background-color: #fff;
		font-size: 30upx;
	}

	.menu-wrapper {
		text-align: center;
		width: 22%;
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
		font-size: 30upx;
	}

	.allcount {
		position: absolute;
		right: 12upx;
		top: 16upx;
		display: inline-block;
		padding: 0 8upx;
		font-size: 18upx;
		line-height: 32upx;
		font-weight: 400;
		border-radius: 50%;
		background-color: #f01414;
		color: #ffffff;
	}

	.foods-wrapper {
		margin-left: 20upx;
		width: 78%;
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
</style>
