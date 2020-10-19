<template>
	<view style="display: flex;flex-direction: row;height: 27px;">

		<view class="food-control">
			<view class="cont" style="margin-top: 2px;" v-show="food.productNum>0">
				<image src="https://jlzcpt.cn/file/gxs/system/des.png" mode="" style="width: 20px;height: 20px;" @click="decreaseCart(food)"></image>
			</view>
			<text style="padding:6px;" v-show="food.productNum>0">{{food.productNum}}</text>
		</view>

		<view style="margin-top: 2px; " class="cont" @click="addCart(food)">
			<image :src="food.productNum>0?xianshi:xianshiadd" style="width: 20px;height: 20px;color: #ccc;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			food: {
				type: Object,
			}
		},
		data() {
			return {
				xianshi:'https://jlzcpt.cn/file/gxs/system/add2.png',				xianshiadd:'https://jlzcpt.cn/file/gxs/system/gouwu.png',
				cart: []
			};
		},
		onShow() {
			

		},
		methods: {
			addCart: function(item) {
			      let adrObj = {
			       'id': item.id,
			       'name': item.productName,
			       'image': item.productPicture,
			       'href': item.productPrice,
			       "productNum":item.productNum+1
			      };   
			      let arrhost = uni.getStorageSync('cart')
			      if(arrhost.length>0){
			       let state = false
			       arrhost.forEach((key,index)=>{
			        if(key.id == item.id) {
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
			   },
			decreaseCart(item) {
			      let adrObj = {
			       'id': item.id,
			       'name': item.productName,
			       'image': item.productPicture,
			       'href': item.productPrice,
			       "productNum":item.productNum+1
			      };   
			      
			      let arrhost = uni.getStorageSync('cart')
			      if(arrhost.length>0){
			       let state = false
			       arrhost.forEach((key,index)=>{
			        if(key.id == item.id) {
			         arrhost[index].productNum--
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
