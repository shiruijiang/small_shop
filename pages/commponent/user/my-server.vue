<template>
<view class="my_server">
    <list-cell :icons="'iconfont ' + icons" :colors="colors" :rightshow="false">{{titles}}</list-cell>
    <view class="server_box">
      <view v-for="(item, index) in serverList" :key="index" class="server_list" @tap="jumpLink(item)">
        <view class="icon-image">
          <image :src="item.icon" mode=""></image>
        </view>
        <view class="server_text">
          {{item.name}}
        </view>
      </view>
	  
    </view>
<!-- 	<button type="default" @click="onShare">小程序分享</button> -->
</view>
</template>

<script>
import listCell from "./list-cell";
// import appShare, { closeShare } from "../../../utils/share.js"
export default {
  data() {
    return {};
  },

  components: {
    listCell
  },
  props: {
    serverList: {
      type: Array
    },
    colors: {
      type: String
    },
    titles: {
      type: String,
      default: '其他服务'
    },
    icons: {
      type: String,
      default: 'icon-fuwu'
    }
  },
  methods: {
	  // onShare(){
	  //           let shareData = {
	  //               shareUrl:"https://kemean.com/",
	  //               shareTitle:"分享的标题",
	  //                     shareContent:"分享的描述",
	  //                     shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
	  //                     appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
	  //                     appPath : "pages/home/home",
	  //                     appWebUrl : "https://kemean.com/",
	  //                 };
	  //                 // 调用
	  //                 let shareObj = appShare(shareData,res => {
	  //                     console.log("分享成功回调",res);
	  //                     // 分享成功后关闭弹窗
	  //                     // 第一种关闭弹窗的方式
	  //                     closeShare();
	  //                 });
	  //                 setTimeout(() => {
	  //                     // 第二种关闭弹窗的方式
	  //                     shareObj.close();
	  //                 },5000);
	  //       },
    jumpLink(row) {
      //页面跳转
      if (row.url == '') {
        return;
      }else {
          uni.navigateTo({
            url: row.url
          });
        }
      }
  }
};
</script>
<style scoped lang="scss">
/* 我的服务 */
.my_server {
  background-color: #fff;
  margin-bottom: 20upx;
}

.server_box {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 30upx;
  .icon-image{
	  image{
		  width: 50upx;
		  height: 50upx;
	  }
  }
}
.server_box::after{
  width: 25%;
  content: '';
  border:1px solid transparent;
}
.server_list {
  max-width: 25%;
  min-width: 25%;
  text-align: center;
  margin-top: 30upx;
}
.server_list:active{
  opacity: 0.8;
}
.server_list text{
  font-size: 56upx;
  line-height: 60upx;
  display: inline-block;
}
.server_text{
  font-size: 24upx;
  color: #3c3c3c;
  margin-top: 15upx;
}
</style>