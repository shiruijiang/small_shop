<template>
 <view class="category-list">
		<view v-for="(nav, index) in categoryList" :key="index" class="category" @tap="jumpList(nav)">
			<view class="class_img"><image :src="'https://jlzcpt.cn/file/gxs'+nav.productTypeIcon" class="imgs"></image></view>
			<view class="text">{{ nav.productTypeName}}</view>
		</view>
</view>
</template>
<script>

export default {
  data() {
    return {
     
    };
  },
  props: {
	  categoryList:{
		  type:Array
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
.category-list {
  background: #f8f8f8;
  width: 100%;
  // margin: 0 3%;
  padding: 0 3% 10upx 3%;
  display: flex; 
  // flex-wrap: wrap;
  // box-shadow: 0upx 0upx 10upx #eee;
  margin-top: 10upx;
  border-radius: 10upx;
}
.category {
  width: 25%;
  margin-top: 20upx;
  // display: flex;
  // flex-wrap: wrap;
}
.category:active{
  opacity: 0.8;
}
.category .class_img {
  width: 100%;
  display: flex;
  justify-content: center;
  .imgs {
    width: 10.6vw;
    height: 10.6vw;
  }
}
.text {
  margin-top: 16upx;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 24upx;
  color: #3c3c3c;
  font-weight: 500;
}
</style>