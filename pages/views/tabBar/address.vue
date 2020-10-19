<template>
	<view class="address">
		<view class="address-ion">当前定位：</view>
		<view class="address-flex">
			<view class="address-with">{{addressMsg}}</view>
			<view class="address-with-other">其他地址<image src="https://jlzcpt.cn/file/gxs/home/to-right.png"></image></view>
		</view>
		
		<view class="address-item">
			<view class="nearby">附近门店：</view>
			<view class="address-content" v-for="(item,index) in storeNameList" :key='index'>
				<view class="address-img">
					<image src="https://jlzcpt.cn/file/gxs/class/icon-banner-1.png" mode=""></image>
				</view>
				<view class="address-cont">
					<view class="address-life">{{item.storeName}}</view>
					<view class="address-address">地址：{{item.address}}</view>
				</view>
				<view class="address-right"  @click="gotoHome(item)"><text>进店</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { setStoreNumber} from '../../../utils/auth.js'
	export default {
		data() {
			return {
				storeNameList:[],
				addressMsg:''
			}
		},
		onLoad() {
			this.getStoreNameList();
			this.getAddressMsg();
		},
		methods: {
			getAddressMsg() {
			  let AddressMsg = uni.getStorageSync('AddressMsg');
			  console.log(AddressMsg)
			  this.addressMsg=AddressMsg
			},
			getStoreNameList() {
				let data = {
					storeName:''
				}
				uni.showLoading({
					mask: true
				})
				this.$request('/store/page', data,'POST').then(res=>{
					uni.hideLoading();
					if (res.code == 1) {
						this.storeNameList=res.obj.list
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}	
				})	
			},
			gotoHome(storeNumber){
				if(storeNumber){
					setStoreNumber(storeNumber)
					uni.reLaunch({
						url:"/pages/views/tabBar/home"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.address{
		width: 100%;
		height: 100%;
		background: #fff;
		border-radius: 20px 20px 0px 0px;
		.address-ion{
			padding: 30upx 20upx;
			color: #999999;
			font-size: 30upx;
		}
		.address-flex{
			display: flex;
			justify-content: space-between;
			.address-with{
				font-size: 32upx;
				font-weight: bold;
				color: #000000;
				padding: 0 20upx;
			}
			.address-with-other{
				font-size: 24upx;
				font-weight: bold;
				color: #E84A4A;
				padding: 0 20upx;
				font-weight: normal;
				image{
					width: 10upx;
					height: 15upx;
					margin-left: 5upx;
				}
			}
		}
		
	}
	.nearby{
		padding: 30upx 20upx;
		color: #999999;
		font-size: 30upx;
	}
	.address-content{
		display: flex;
		height: 180upx;
		.address-img{
			
			flex: 1;
			width: 20%;
			image{
				height: 160upx;
				padding:10upx 10upx;
			}
		}
		.address-cont{
			flex: 3;
			width: 50%;
			padding: 20upx 5%;
			.address-life{
				color: #000000;
				font-size: 32upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.address-address{
				color: #999999;
				font-weight: 400;
				font-size: 26upx;
				margin-top: 12%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.address-right{
			flex: 1;
			width: 20%;
			text{
				margin-top: 20upx;
				display: inline-block;
				background: #39B978;
				border-radius: 25upx;
				color: #fff;
				font-size: 24upx;
				width: 75upx;
				height: 45upx;
				text-align: center;
				line-height: 45upx;
			}
		}
	}
	.address-cont text:nth-child(1){
		color: #000000;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
