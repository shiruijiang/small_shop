<template>
 <view class="category-list">
	 <view class="icon-header">
	 	<view class="tuangou">
	 		团购专区
			<text>精致生活，实惠选择</text>
	 	</view>
		<view class="tuangou-right">
			<text>更多团购</text>
			<image src="https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/home/to-right.png" mode=""></image>
		</view>
	 </view>
	 <scroll-view scroll-x="true" style="width: 100%;overflow: hidden;white-space: nowrap;height: 240upx;">
		<view class="scroll_H" :style="{width:scrollWidth}">
		<view v-for="(nav, index) in pintuanList" :key="index" class="category" @tap="jumpList(nav)">
			<view class="class_img"><image :src="'https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs'+nav.productPicture" class="imgs"></image></view>
			<view class="text text-price-icon">￥{{ nav.productPrice}}</view>
			<view class="text" style="text-decoration: line-through;font-size: 20upx;padding-left: 10upx;">￥{{ nav.originalPrice}}</view>
			<view class="gopintuan">
				<view class="gopintuan-list">去拼团</view></view>
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
	  pintuanList:{
		  type:Array
	  }
  },
 computed:{
	scrollWidth(){
		return (this.pintuanList.length)*22+'%'
	} 
 },
  methods: {
    jumpList(item) {
		console.log(item,'这是值')
      uni.navigateTo({
        url: '/pages/views/home/classList?item='+encodeURIComponent(JSON.stringify(item))
      });
    }
  }
};
</script>
<style scoped lang="scss">
	.icon-header{
		width: 100%;
		height: 50upx;
		display: flex;
		justify-content: space-between;
	}
	.scroll_H{
		width: 200%;
		display: flex;
		flex-wrap: nowrap;
	}
	.tuangou{
		font-size: 34upx;
		color: #133423;
		font-weight: 800;
		margin: 2% 3%;
		width: 70%;
		text{
			font-size: 24upx;
			color: #E84A4A;
			font-weight: normal;
			margin-left: 3%;
			white-space: normal;
		}
	}
	.gopintuan{
		display: inline-block;
		width: 100%;
		margin-top: 10upx;
		height: 30upx;
	}
	.gopintuan-list{
		background: #E84A4A;
		color: #ffffff;
		font-size: 20upx;
		text-align: center;
		line-height: 30upx;
		border-radius: 20upx;
		width: 60%;
		margin: 0 20%;
	}
	.tuangou-right{
		margin: 3% 3%;
		text{
			display: inline-block;
			font-size: 24upx;
			color: #E84A4A;
			font-weight: normal;
			width: 100upx;
		}
		image{
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
  background: #ffffff;
  border-radius: 20upx;
  background-image: url(https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/goods/pintuan-bg.png);
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
.category:active{
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
.text-price-icon{
	color: #E84A4A;
	font-weight: bold;
}
</style>