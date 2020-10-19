<template>
	<view class="category-list">
		<view class="icon-header">
			<view class="tuangou">
				每日特价
				<text>享低价，购精品</text>
			</view>
			<view class="tuangou-right">
				<text>更多优惠</text>
				<image src="https://jlzcpt.cn/file/gxs/home/to-right.png" mode=""></image>
			</view>
		</view>
		<scroll-view scroll-x="true" style="width: 100%;overflow: hidden;white-space: nowrap;height: 200upx;">
			<view class="scroll_H" :style="{width:scrollWidth}">
				<view v-for="(nav, index) in tejiaList" :key="index" class="category" @tap="jumpList(nav)">
					<view class="class_img">
						<image :src="'https://jlzcpt.cn/file/gxs'+nav.productPicture" class="imgs"></image>
					</view>
					<view class="text text-price-icon">￥{{ nav.productPrice}}</view>
					<view class="text" style="text-decoration: line-through;font-size: 20upx;padding-left: 10upx;">￥{{ nav.originalPrice}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			tejiaList: {
				type: Array
			}
		},
		computed: {
			scrollWidth() {
				return (this.tejiaList.length) * 22 + '%'
			}
		},
		methods: {
			jumpList(item) {
				uni.navigateTo({
					url: '/pages/views/home/classList?classId=' + item.id
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	.icon-header {
		width: 100%;
		height: 50upx;
		display: flex;
		justify-content: space-between;
	}

	.scroll_H {
		width: 200%;
		display: flex;
		flex-wrap: nowrap;
	}

	.tuangou {
		font-size: 34upx;
		color: #133423;
		font-weight: 800;
		margin: 2% 3%;

		text {
			font-size: 24upx;
			color: #E84A4A;
			font-weight: normal;
			margin-left: 3%;
		}
	}

	.gopintuan {
		display: inline-block;
		width: 100%;
		margin-top: 10upx;
		height: 30upx;
	}

	.gopintuan-list {
		background: #E84A4A;
		color: #ffffff;
		font-size: 20upx;
		text-align: center;
		line-height: 30upx;
		border-radius: 20upx;
		width: 60%;
		margin: 0 20%;
	}

	.tuangou-right {
		margin: 3% 3%;

		text {
			display: inline-block;
			font-size: 24upx;
			color: #E84A4A;
			font-weight: normal;
			width: 100upx;
		}

		image {
			width: 10upx;
			height: 16upx;
		}
	}

	.category-list {
		width: 94%;
		margin: 0 3%;
		padding: 0 0 10upx 0;
		display: flex;
		flex-wrap: wrap;
		margin-top: 30upx;
		background-color: #ffffff;
		border-radius: 20upx;
		background-image: url(https://jlzcpt.cn/file/gxs/goods/pintuan-bg.png);
		background-repeat: no-repeat;
		background-size: 14%;
		background-position: 0% 0%;
	}

	.category {
		width: 22%;
		margin-top: 30upx;
		display: flex;
		flex-wrap: wrap;
	}

	.category:active {
		opacity: 0.8;
	}

	.category .class_img {
		width: 100%;
		display: flex;
		justify-content: center;

		.imgs {
			width: 16vw;
			height: 10.6vw;
		}
	}

	.text {
		margin-top: 8upx;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 24upx;
		color: #C6C6C6;
		font-weight: 500;
	}

	.text-price-icon {
		color: #E84A4A;
		font-weight: bold;
	}
</style>
