<template>
<view class="userbox">
<!-- 头部个人信息 不变-->
<view class="userHeader">
  <image src="https://jlzcpt.cn/file/gxs/user/user-bg.png" class="user_bg"></image>
  <image src="https://jlzcpt.cn/file/gxs/user/user-bg.png" class="user_bg1"></image>
  <view class="nav">
      <view class="user" @click="onLogin">
        <image :src="userdata.avatarUrl" v-if="userdata.avatarUrl"></image>
		<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602847085376&di=a75f273c137b2cfe00b8d399563fb538&imgtype=0&src=http%3A%2F%2Fimages.669pic.com%2Felement_pic%2F3%2F88%2F77%2F52%2F63160fa6edcfde1b73bafadf9be77e8d.jpg" v-else></image>
        <text>{{userdata.nickName || '点击登录'}}</text></view>
		<view class="shezhi" @tap='gotoShezhi'><image src="https://jlzcpt.cn/file/gxs/user/mine-shezhi.png" mode=""></image></view>
  </view>
  	  
</view>
<!-- 中间菜单栏 -->
<!-- #ifdef MP -->
<view class="userMenu" @touchstart="coverTouchStart" @touchmove="coverTouchMove" @touchend="coverTouchEnd" :style="'transform:' + coverTransform + ';transition:' + coverTransition">
  <!-- <image src="/static/images/user/arc.png" class="arc"></image> -->
  <!-- 我的账户 -->
  <!-- <my-account :colors="colors"></my-account> -->
  <!-- 全部订单 -->
  <my-order :orderText="orderText" :colors="colors"></my-order>
  <!-- 我的账户 -->
  <my-account :storeContent="storeContent"></my-account>
  <!-- 我的足迹 -->
  <!-- <my-footprint :logList="logList" :colors="colors"></my-footprint> -->
  <!-- 我的服务 -->
  <my-server :serverList="serverList" :colors="colors" :userinfo="userinfo"></my-server>
</view>
<!-- #endif -->
<!-- #ifdef H5 -->
<view class="userMenu" @touchmove.stop.prevent="moveHandle" @touchstart="coverTouchStart" @touchmove="coverTouchMove" @touchend="coverTouchEnd" :style="'transform:' + coverTransform + ';transition:' + coverTransition">
  <image src="/static/images/user/arc.png" class="arc"></image>
  <!-- 我的账户 -->
  <my-account :colors="colors"></my-account>
</view>
<view class="place" >
	<!-- 全部订单 -->
	<my-order :orderText="orderText" :colors="colors"></my-order>
	<!-- 我的足迹 -->
	<my-footprint :logList="logList" :colors="colors"></my-footprint>
	<!-- 我的服务 -->
	<my-server :serverList="serverList" :colors="colors"></my-server>
</view>
<!-- #endif -->
</view>
</template>

<script>
let app = getApp();
import { getConfig, getUserInfo,getToken } from '@/utils/auth';
import myAccount from "../../commponent/user/my-account";
import listCell from "../../commponent/user/list-cell";
import myOrder from "../../commponent/user/my-order";
import myFootprint from "../../commponent/user/my-footprint";
import myServer from "../../commponent/user/my-server";

export default {
  data() {
    return {
      colors: '',
      startY: 0,
      //原始坐标
      moving: false,
      //当前元素的状态（是否移动）
      coverTransform: 'translateY(0px)',
      //元素的移动
      coverTransition: '0s',
	  storeContent:{},
      //动画效果
      orderText: [{
              name: '全部订单',
              url: 'https://jlzcpt.cn/file/gxs/user/mine-order-icon1.png',
              id: 0
            }, {
              name: '待付款',
              url: 'https://jlzcpt.cn/file/gxs/user/mine-order-icon2.png',
              id: 1
            }, {
              name: '待提货',
              url: 'https://jlzcpt.cn/file/gxs/user/mine-order-icon3.png',
              id: 2
            },
           {
           name: '已提货',
           url: 'https://jlzcpt.cn/file/gxs/user/mine-order-icon4.png',
           id: 3
         }],
      logList: [{ //足迹的数据应该由后台进行存储
        name: '真巧 巧克力涂层甜甜圈 早餐蛋糕手撕面包休闲小零食办公室小吃零嘴下午茶点心 500g甜甜圈（拉花款）',
        img: "https://jlzcpt.cn/file/gxs/goods/one.jpg"
      }, {
        name: '巧妈妈 鸡蛋布甸 下午茶休闲零食儿童果冻布丁125g双层果酱味smzdm 4杯鸡蛋布甸（双层）',
        img: "https://jlzcpt.cn/file/gxs/goods/four.jpg"
      }],
      serverList: [{
        name: '我的收藏',
        icon: 'https://jlzcpt.cn/file/gxs/user/mine-serive1.png',
        url: '/pages/views/user/mycollection',
        id: 1,
        elseUrl: ''
      }, {
        name: '分享小程序',
        icon: 'https://jlzcpt.cn/file/gxs/user/mine-serive2.png',
        url: '/pages/views/user/extension',
        id: 7,
        elseUrl: ''
      }, {
        name: '联系我们',
        icon: 'https://jlzcpt.cn/file/gxs/user/mine-serive3.png',
        url: '/pages/views/user/mydistribution',
        id: 8,
        elseUrl: ''
      }],
      oldcolor: '',
      userdata: {}
    };
  },

  components: {
    myAccount,
    listCell,
    myOrder,
    myFootprint,
    myServer
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  this.getStoreNumber()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let colors = app.globalData.newColor;
    let oldcolor = this.colors;
    let userinfo = getUserInfo() || {};
	console.log(userinfo,'用户登录之后从本地取出来的数据')
    this.setData({
      colors: colors,
      userdata: userinfo
    });
    if (oldcolor !== colors) {
      //如果旧颜色不等于新颜色
      let config = getConfig();
      let tabList = config.tabList;
      uni.setTabBarStyle({
        selectedColor: colors
      });
	  if(tabList){
		  for (var i = 0; i < tabList.length; i++) {
		    let img = tabList[i];
		    uni.setTabBarItem({
		      //设置tabBar 首页图标
		      index: i,
		      selectedIconPath: img
		    });
		  }
	  }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
	onLogin(){
		let token = getToken()
		if(getToken()){
			return
		}
		uni.navigateTo({
			url:'../../login/login'
		})
	},
	getStoreNumber() {
	  let StoreNumber = uni.getStorageSync('StoreNumber');
	  if(StoreNumber){
		  this.storeContent=StoreNumber
	  }
	  console.log(StoreNumber,'5616516161844')
	},
    coverTouchStart(e) {
      //滑动开始 记录目标原始坐标
      this.setData({
        startY: e.touches[0].clientY,
        coverTransition: 'transform .2s linear'
      });
    },
	moveHandle(){ //阻止下拉默认事件
		
	},
	gotoShezhi(){
		uni.navigateTo({
			url:"../setting/index"
		})
	},
    coverTouchMove(e) {
      //滑动中
      let moveY = e.touches[0].clientY; //记录移动的坐标
      let startY = this.startY;
      let moveDistance = moveY - startY; //计算当前坐标与原始坐标的差
      if (moveDistance < 0) {
        //如果小于0 不做操作
        this.setData({
          moving: false
        });
        return;
      }
      this.setData({
        moving: true
      });

      if (moveDistance >= 60) {
        //如果差在该区间内
        moveDistance = 60;
      }

      if (moveDistance > 0 && moveDistance <= 60) {
        this.setData({
          coverTransform: `translateY(${moveDistance}px)`
        });
      }
    },

    coverTouchEnd(e) {
      //滑动结束 回到原始位置
      if (this.moving == false) {
        return;
      }
      this.setData({
        coverTransform: 'translateY(0px)',
        moving: false,
        coverTransition: 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)'
      });
    },
  }
};
</script>
<style scoped lang="scss">
.userbox{
		background: #f8f8f8;
	}
.userHeader {
  height: 400upx;
  width: 100vw;
  position: relative;
  padding: 70upx 4%;
  background-image: linear-gradient(#009b4d, #009945);
  border-bottom-right-radius: 22%;
  border-bottom-left-radius: 22%;
  z-index: 1;
}

.userHeader .user_bg {
  height: 300upx;
  width: 300upx;
  display: block;
  position: absolute;
  top: -61upx;
  left: -60upx;
}
.userHeader .user_bg1{
	height: 200upx;
	width: 200upx;
	display: block;
	position: absolute;
	bottom: 0upx;
	left: 100upx;
}
.userHeader .nav {
  height: 180upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .shezhi{
	width: 100upx;
	height: 100upx;
  	image{
  		width: 40upx;
  		height: 40upx;
  		border: none;
		margin: 40upx 20upx;
  	}
  }
}

.user {
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
  z-index: 200;
}

.user image {
  width: 130upx;
  height: 130upx;
  border: 5upx solid #fff;
  border-radius: 50%;
}

.user text {
  font-size: 38upx;
  color: #fff;
  margin-left: 20upx;
}

.vip {
  height: 240upx;
  position: relative;
  display: flex;
  padding: 20upx 24upx;
  border-radius: 16upx 16upx 0 0;
  width: 100%;
  overflow: hidden;
}

.banquan {
  position: absolute;
  color: #f6e5a3;
  top: 100upx;
  left: 24upx;
  font-size: 24upx;
}

.vip .vip_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.vipname {
  z-index: 5;
  display: flex;
  width: 100%;
  height: 60upx;
  position: relative;
  align-items: center;
}

.vipname .zuanshi {
  color: #f6e5a3;
  font-size: 42upx;
  line-height: 60upx;
}

.vipname .names {
  color: #f6e5a3;
  line-height: 20upx;
  font-size: 24upx;
  margin-left: 20upx;
}

.vip_level {
  width: 115upx;
  height: 35upx;
  text-align: center;
  line-height: 35upx;
  font-size: 20upx;
  color: #333;
  background: linear-gradient(270deg, #f9e6af, #ffd465);
  border-radius: 20upx;
  position: absolute;
  top: 12upx;
  right: 10upx;
}

/* 中间菜单栏 */
.userMenu {
  /* min-height: 500upx; */
  margin-top: -158upx;
  padding: 0 4%;
  position: relative;
  // background-color: #f8f8f8;
  padding-bottom: 10upx;
  border-radius: 20%;
  z-index: 999;
}

.userMenu .arc {
  width: 100%;
  height: 36upx;
  position: absolute;
  top: -34upx;
  left: 0;
}
.place{
	padding: 0 4%;
	position: relative;
	background-color: #f8f8f8;
	padding-bottom: 40upx;
}
</style>