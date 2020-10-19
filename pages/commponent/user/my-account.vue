<template>
<view class="my_money">
    <view class="address-flex">
    	<view class="address-with">当前自提门店</view>
    	<view class="address-with-other">更换自提门店<image src="https://jlzcpt.cn/file/gxs/home/to-right.png"></image></view>
    </view>
    <view class="menu_btnbox">
       <view class="storeMsg">{{storeContent.storeName}}</view>
	   <view class="storeAddress">地址：{{storeContent.address}}</view>
      </view>
    </view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {};
  },
  props: {
    storeContent: {
      //余额
      type: Object,
    }
  },
  methods: {
    mycoupon() {
      uni.navigateTo({
        url: '/pages/views/user/mycoupon'
      });
    },
    mypoints() {
      uni.navigateTo({
        url: '/pages/views/user/mypoints'
      });
    },
	withdrawa(){
	  uni.navigateTo({
		url: '/pages/views/withdrawal/withdrawal'
	  });
	}
  }
};
</script>
<style lang="scss" scoped>
.my_money {
  background-color: #fff;
  margin-bottom: 20upx;
  border-radius: 20upx;
}
.menu_btns .p1{
  font-size: 30upx;
  font-weight: bold;
}
.address-flex{
			height: 80upx;
			display: flex;
			justify-content: space-between;
			.address-with{
				font-size: 30upx;
				font-weight: bold;
				color: #000000;
				padding: 30upx 20upx;
			}
			.address-with-other{
				font-size: 24upx;
				font-weight: bold;
				color: #E84A4A;
				padding: 34upx 20upx;
				font-weight: normal;
				image{
					width: 10upx;
					height: 15upx;
					margin-left: 5upx;
				}
			}
		}
		.storeMsg{
			color: #3ABA78;
			font-weight: bold;
			font-size: 32upx;
			padding: 10upx 20upx;
		}
		.storeAddress{
			font-size: 26upx;
			color: #9a9a9a;
			font-weight: 400;
			padding: 15upx 20upx 30upx;
		}
</style>