<template>
<view class="header">
  <!-- 头部 -->
  <view class="place" :style="{background: colors}"></view>
	<!-- <view v-if="currentSwiper == 0" class='place-swiper0'>
	</view>
	<view v-if="currentSwiper == 1" class='place-swiper1'>
	</view>
	<view v-if="currentSwiper == 2" class='place-swiper2'>
	</view> -->
   <view :class='titleClass'>
	   <view class="content-box">
		   <view class="left" @tap="nearAddress">
		     <image src="/static/images/home/weizhi.png"></image>
		     <view>{{city || '请选择位置'}}</view>
		   </view>
		   <!-- <view class="right" v-if="weatherName && weatherName!==''">
		   		 <image :src="todyWeather.img"></image>
		     <text>{{ weatherName }} /{{ high }}℃</text>
		   </view> -->
	   </view>
	   <search></search>
   </view>
    <!-- 搜索 -->
    
    <!-- 轮播图 -->
    <view class="swiper" :style="{marginTop: height}">
			<view class="swiper-box">
				<swiper circular="true" @change="swiperChange" >
					<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="item.img" mode="aspectFill" :class="currentSwiper !== index ?'swiper-item-side':''" lazy-load="true" ></image></swiper-item>
				</swiper>
				<view class="indicator">
					<view v-for="(item, index) in swiperList" :key="index" :class="currentSwiper >= index ? 'on' : 'dots'" :style="'width: ' + (currentSwiper >= index ? 100 / swiperList.length + '%' : '' )"></view>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
import qqmapsdk from "../../../utils/qqmap-wx-jssdk.min";
import search from "../public/search";
import {hfKey, txMapKey} from '../../../utils/keys.js'
import { setStoreNumber, getStoreNumber, setAddressMsg } from "../../../utils/auth";
export default {
  data() {
    return {
      currentSwiper: 0,
      city: '西安',
      weatherData: [{
        type: '阴',
        img: "/static/images/weather/yin.png"
      }, {
        type: '晴',
        img: "/static/images/weather/qing.png"
      }, {
        type: '多云',
        img: "/static/images/weather/duoyun.png"
      }, {
        type: '雨',
        img: "/static/images/weather/xiaoyu.png"
      }, {
        type: '小雨',
        img: "/static/images/weather/xiaoyu.png"
      }, {
        type: '中雨',
        img: "/static/images/weather/xiaoyu.png"
      }, {
        type: '大雨',
        img: "/static/images/weather/dayu.png"
      }, {
        type: '暴雨',
        img: "/static/images/weather/leiyu.png"
      }, {
        type: '雷阵雨',
        img: "/static/images/weather/leiyu.png"
      }, {
        type: '雨夹雪',
        img: "/static/images/weather/xiaoxue.png"
      }, {
        type: '雪',
        img: "/static/images/weather/xue.png"
      }, {
        type: '小雪',
        img: "/static/images/weather/xue.png"
      }, {
        type: '中雪',
        img: "/static/images/weather/xiaoxue.png"
      }, {
        type: '大雪',
        img: "/static/images/weather/daxue.png"
      }],
      high: '',
      weatherName: '',
      latitude: '',
      longitude: '',
      todyWeather: {},
	  height:null
    };
  },

  components: {
    search
  },
  props: {
    colors: {
      type: String
    },
	locations:{
		type: Object
	},
	swiperList:{
		type:Array
	},
	titleClass:{
		type:String
	}
  },
  created() {
	console.log('key',hfKey,txMapKey)
	// #ifdef MP
	this.getUserPosition();
	// this.getDomHeight();
	// #endif
	// #ifdef H5
	if(this.locations){
		this.latitude = this.locations.latlng.lat || ''
		this.longitude = this.locations.latlng.lng || ''
		this.city = this.locations.poiname
		this.getWeather(this.latitude, this.longitude);
	}
	// #endif
  },
  watch:{
	  locations(value){
		  this.latitude = this.locations.latlng.lat || ''
		  this.longitude = this.locations.latlng.lng || ''
		  this.city = this.locations.poiname
		  this.getWeather(this.latitude, this.longitude);
	  }
  },
  mounted() {
	this.getDomHeight()
  },
  methods: {
    getUserPosition() {
      /**
       * 在这里执行获取用户的位置
       */
      //获取用户位置
      let that = this;
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: res => {
          console.log('获取经纬度成功', res);
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
        },
        fail: () => {
          that.setData({
            latitude: '',
            longitude: ''
          });
        },
        complete: () => {
          // 解析地址
          that.getCity();
        }
      });
    },
	getDomHeight(){
		let domClass='.'+this.titleClass;
		const query = uni.createSelectorQuery().in(this);
		query.select(`${domClass}`).boundingClientRect(data => {
		  this.height=data.height+'px'
		}).exec();
	},
    getCity() {
      const QQMapWX = new qqmapsdk({
        key: txMapKey
      });
      let that = this;
      QQMapWX.reverseGeocoder({
        location: {
          latitude: that.latitude,
          longitude: that.longitude
        },
        success: function (res) {
          let province = res.result.ad_info.province; // 市
          let city = res.result.formatted_addresses.recommend;
		  setAddressMsg(city)
          that.setData({
            city: city
          });
		  if(!getStoreNumber()){
			 uni.redirectTo({
			 	url: '/pages/views/tabBar/address'
			 });
		  }else{
			  uni.navigateTo({
			  	url: '/pages/views/tabBar/home'
			  });
		  }
          let position = {};
          position.lat = that.latitude;
          position.lng = that.longitude;
          position.name = city;
          that.getWeather(that.latitude, that.longitude);
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    },

    getWeather(la, lo) {//获取天气信息
      // let url = 'https://free-api.heweather.net/s6/weather/now?key=' + hfKey + '&location=' + lo + ',' + la;
      // uni.request({
      //   url: url,
      //   method: 'GET',
      //   success: res => {
      //     console.log(res);
      //     let today = res.data.HeWeather6[0].now; //获取到今天的天气
      //     // let h = today.fl;
      //     this.setData({
      //       high: h,
      //       //高温
      //       weatherName: today.cond_txt
      //     });
      //     this.weatherData.forEach(e => {
      //       if (e.type == today.cond_txt) {
      //         this.setData({
      //           todyWeather: e
      //         });
      //       }
      //     });

      //     if (this.todyWeather.type == '' || !this.todyWeather.type) {
      //       let data = this.weatherData[0];
      //       this.setData({
      //         todyWeather: data
      //       });
      //     }
      //   },
      //   fail: () => {},
      //   complete: () => {}
      // });
    },

    nearAddress() { //设置位置信息
	  // #ifdef MP
	  const _this = this; // 处理拒绝再次打开调用设置
	  uni.getSetting({
	    success(res) {
	      if (res && res.authSetting && res.authSetting.hasOwnProperty('scope.userLocation')) {
	        uni.openSetting({
	          success() {
	            _this.getUserPosition();
	          }
	        });
	      }
	    }
      });
	  // #endif
	  // #ifdef H5
	  uni.navigateTo({
	  	url:'/pages/views/home/h5map'
	  })
	  // #endif
    },
    swiperChange(e) {
		console.log(e)
      this.setData({
        currentSwiper: e.detail.current,
      });
    }
  }
};
</script>
<style scoped lang="scss">
	.header {
	  line-height: 80upx;
	  overflow: hidden;
	  color: #fff;
	  position: relative;
	}
	.left-box{
		background: #009944;
		position: fixed;
		top: 0upx;
		z-index: 999;
		width: 100%;
		height: 200upx;
	}
	.content-box{
		width: 94%;
		padding: 0 3%;
	}
	.place{
		position: absolute;
		background: #009944;
		width: 100%;
		height: 80%;
		top: 0;
		left: 0;
		border-bottom-right-radius: 20%;
		border-bottom-left-radius: 20%;
	}
	.left {
	  font-size: 26upx;
	  color: #333;
	  float: left;
	  height: 80upx;
	  color: #fff;
	  display: flex;
	  align-items: center;
	  align-items: center;
	  z-index: 800;
	}
	
	.left image {
	  width: 30upx;
	  height: 30upx;
	  float: left;
	  margin-right: 6upx;
	}
	.left view{
		width: 60vw;
		height: 30upx;
		line-height: 30upx;
		position: relative;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.right {
	  height: 80upx;
	  float: right;
	  font-size: 26upx;
	  display: flex;
	  align-items: center;
	}
	
	.right image {
	  width: 40upx;
	  height: 40upx;
	}
	
	.right text {
	  margin-left: 10upx;
	}
	
	.swiper {
	  width: 100%;
	  display: flex;
	  justify-content: center;
	  z-index: 901;
	}
	
	.swiper-box {
	  width: 100%;
	  overflow: hidden;
	  height: 36vw;
	  // height: 100%;
	  /* border-radius: 15upx; */
	  /* box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2); */
	  position: relative;
	  
	}
	
	.swiper-box swiper {
	  width: 94%;
	  margin: 0 3%;
	  height: 36vw;
	  // padding-top: 50upx;
	}
	.swiper-box swiper swiper-item{
		height: 36vw !important;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	.swiper-box swiper swiper-item image {
	  width: 100%;
	  height: 36vw;
	  display: block;
	  border-radius: 10px;
	  transition: height .3s;
	}
	.swiper-item-side {
	  width: 95%;
	  transition: height .3s;
	}
	.indicator {
	  position: absolute;
	  bottom: 12%;
	  left: 42%;
	  background-color: rgba(255, 255, 255, 0.4);
	  width: 150upx;
	  height: 5upx;
	  border-radius: 3upx;
	  overflow: hidden;
	  display: flex;
	}
	
	.dots {
	  width: 0upx;
	  background-color: rgba(255, 255, 255, 1);
	  transition: all 0.3s ease-out;
	}
	
	.on {
	  width: 30%;
	  background-color: rgba(255, 255, 255, 1);
	  transition: all 0.3s ease-out;
	}
	// .place-swiper0{
	// position: absolute;
	// width: 100%;
	// height: 100%;
	// top: 140upx;
	// left: 0;
	// 	background: red !important;
	// }
	// .place-swiper1{
	// position: absolute;
	// width: 100%;
	// height: 100%;
	// top: 140upx;
	// left: 0;
	// 	background: yellow !important;
	// }
	// .place-swiper2{
	// position: absolute;
	// width: 100%;
	// height: 100%;
	// top: 140upx;
	// left: 0;
	// 	background: green !important;
	// }
</style>