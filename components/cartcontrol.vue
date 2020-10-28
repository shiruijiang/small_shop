<template>
	<view style="display: flex;flex-direction: row;height: 27px;">

		<view class="food-control">
			<view class="cont" style="margin-top: 2px;" v-show="item2.productNum>0">
				<image src="https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/system/des.png" mode="" style="width: 20px;height: 20px;" @click="decreaseCart(item2)"></image>
			</view>
			<text style="padding:6px;" v-show="item2.productNum>0">{{item2.productNum}}</text>
		</view>

		<view style="margin-top: 2px; " class="cont" @click="addCart(item2)">
			<image :src="item2.productNum>0?xianshi:xianshiadd" style="width: 20px;height: 20px;color: #ccc;"></image>
		</view>
	</view>
</template>

<script>
	import { checkLogin } from '../utils/auth.js'
	export default {
		props: {
			item2: {
				type: Object,
			},
		},
		data() {
			return {
				xianshi:'https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/system/add2.png',
				xianshiadd:'https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/system/gouwu.png',
				cart: [],
			};
		},
		onShow() {
		},
		onLoad() {
			console.log(this.item2,"5555555")
		},
		methods: {
			addCart: function(item) {
				   if(uni.getStorageSync('token')){
					   let adrObj = {
					      'productId': item.id,
					      'productName': item.productName,
					      'productPicture': item.productPicture,
					      'productPrice': item.productPrice,
					      "productNum":item.productNum+1
					     };   
					     let arrhost = uni.getStorageSync('cart')
					     if(arrhost.length>0){
					      let state = false
					      arrhost.forEach((key,index)=>{
					   	   console.log(key,item.id,'21211212')
					       if(key.productId == item.id) {
					        arrhost[index].productNum++
					        state = true
					       }
					      })
					      if(!state){
					       arrhost.push(adrObj)
					      }
					    
					      uni.setStorageSync('cart',arrhost)
					     }else{
					      uni.setStorageSync('cart',[adrObj])
					     }
					   this.$emit('add', item)
				   }else{
					   this.handleClick()
				   }
			   },
			decreaseCart(item) {
				
				if(uni.getStorageSync('token')){
					let adrObj = {
					   'productId': item.id,
					   'productName': item.productName,
					   'productPicture': item.productPicture,
					   'productPrice': item.productPrice,
					   "productNum":item.productNum+1
					  };   
					  
					  let arrhost = uni.getStorageSync('cart')
					  if(arrhost.length>0){
					   let state = false
					   arrhost.forEach((key,index)=>{
					    if(key.productId == item.id) {
					     arrhost[index].productNum--
						 if(arrhost[index].productNum==0){
							 console.log('jinlaile a ')
						 	arrhost.splice(index,1)
						 }
						 console.log(arrhost,'操作后的数组呢')
					     state = true
					    }
					   })
					   if(!state){
					    adrObj.productNum--
					    arrhost.push(adrObj)
					   }
					 
					   uni.setStorageSync('cart',arrhost)
					  }else{
					   uni.setStorageSync('cart',[adrObj])
					  }
					  console.log(arrhost,'存的数据');
					this.$emit('dec', item)
				}else{
					this.handleClick();
				}
			   },
			handleClick () {
				checkLogin(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.food-control {
		display: flex;
		flex: 2;
		justify-content: space-between;
	}

	.cont {
		width: 44upx;
		height: 44upx;
		box-sizing: border-box;
		border-radius: 50%;
		text-align: center;
	}
</style>
