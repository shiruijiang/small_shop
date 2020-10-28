<template>
<view class="login" :style="' background-size: cover;background-repeat:no-repeat; background-position: center;'">
  <view class="logo">
    <image src="../../static/images/system/logo.png"></image>
	<!-- <image :src="'https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs'" mode=""></image> -->
  </view>
  <!-- <view class="login_from">
      <input placeholder="请输入手机号" v-model="tel" type="number" maxlength="11" placeholder-style="color: #333"></input>
      <view class="codes">
      	<input placeholder="请输入短信验证码" v-model="smscode"  maxlength="6" type="number" placeholder-style="color: #333"></input>
		<view @click="getCode" :style="{opacity: isCode == true ? '1':'0.8'}">{{codeName}}</view>
      </view>
      <view class="login_btn" @click="onlogin">登录</view>
  </view> -->
  
  <view class="login-list flex border-all">
  	<view class="login-input">
  		<input placeholder="请输入手机号" v-model="tel" type="number" maxlength="11" class="is-input1" />
  	</view>
  </view>
  <view class="login-list flex border-all">
  	<view class="login-input">
  		<input type="number" maxlength="6" placeholder="请输入验证码" class="is-input1 " v-model="smscode" />
  	</view>
  	<view class="code-sx"></view>
  	<view class="codeimg" @click="getCode" :style="{opacity: isCode == true ? '1':'0.8'}">{{codeName}}</view>
  </view>
  <view class="login-list login_btn" @click="onlogin">
  	登录
  </view>
  <view class="wxLogin">
      <view>——— 快速登录 ———</view>
      <!-- <image src="https://jlzcpt.oss-cn-beijing.aliyuncs.com/static/gxs/wx.png" @getuserinfo="getUserInfo"></image> -->
	 <image src="../../static/images/system/wx.png" @getuserinfo="getUserInfo"></image>
     <button open-type="getUserInfo" @getuserinfo="getUserInfo" ></button>
	 <!-- <button open-type="getPhoneNumber" @click="getPhoneNumber" ></button> -->
  </view>
</view>
</template>
<script>
import { setUserInfo,setToken,setUserId } from "../../utils/auth";
export default {
  data() {
    return {
      isCanUse: uni.getStorageSync('isCanUse'),
      nickName: '',
      avatarUrl: '',
      imgTime: '',
      imgIndex: 0,
	  codeName: '获取验证码',
      isCode: true,
	  tel:'',
	  smscode:'',
	  gender:null,
	  phoneNumber:null,
	  userContent:{}
    };
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // #ifdef MP-WEIXIN
    // this.wxlogin(); //小程序获取用户code
    // #endif
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setbImg();  //动态切换背景
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.imgTime);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.imgTime);
  },

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
    getUserInfo() {
      console.log('点了');
      let _this = this;
      uni.getUserInfo({
        provider: 'weixin',
        success:(infoRes)=> {
          console.log(infoRes,'是用户的信息啊');
		  setUserInfo(infoRes.userInfo); 
          _this.setData({
            nickName: infoRes.userInfo.nickName,
            //昵称
            avatarUrl: infoRes.userInfo.avatarUrl, //头像
			gender: infoRes.userInfo.gender
          });
		  this.wxlogin()
        },

        fail(res) {}

      });
    },
	// getPhoneNumber (e) {
	//     console.log(e)
	//     console.log(e.detail.iv)
	//     console.log(e.detail.encryptedData)
	// 	},
    setbImg() {
      clearInterval(this.imgTime);
      let that = this;
      console.log('执行了');
      let imgTime = setInterval(() => {
        let imgIndex = that.imgIndex + 1;
        if (imgIndex >= that.bgImg.length) {
          imgIndex = 0;
        }
        that.setData({
          imgIndex: imgIndex
        });
      }, 15000);
      this.setData({
        imgTime: imgTime
      });
    },
	onlogin(){ //登录 模拟存储token
		// let date = new Date().getTime()
		// setToken(date)
		// let user = {  //模拟存储用户信息
		// 	avatarUrl: '/static/images/face.jpg',
		// 	nickName: 'test1'
		// }
		// setUserInfo(user)
		this.loginPhone(this.tel,this.smscode)
		uni.showLoading({
			title:'登录中...'
		})
		setTimeout(()=>{
			uni.hideLoading()
			uni.showToast({
				title:'登陆成功'
			})
		}, 500)
		setTimeout(()=>{
			uni.navigateBack(-1)
		},1500)
	},
	getCode() { //获取用户短信验证码
		if(this.isCode == false){
			return
		}
		if (this.tel == '') {
			uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
			return
		}
		if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.tel)) {
			uni.showToast({
				title: '请填写正确手机号码',
				icon: 'none'
			});
			return false;
		}else{
			this.getPhoneCode()
			this.loginToPhone(this.tel)
			}
	},
	loginToPhone(phone){
		let data = {
			phoneNumber:phone,
		}
		this.$request('/user/registered/getCode', data,'POST').then(res=>{
			
		})
	},
	loginPhone(phone,code){
		let data={
			phoneNumber:phone,
			code:code
		}
		this.$request('/user/phoneLogin', data,'POST').then(res=>{
			console.log(res,'手机号登录了')	
		})
	},
	getPhoneCode() {
		let timer = ''
		let date = 60
		let that = this
		if (that.isCode == true) {
			uni.showToast({
				title: '验证码发送成功~',
				icon: 'none'
			})
			clearInterval(timer)
			setInterval(() => {
				if (date >= 1) {
					date--
					that.codeName = date + '秒重试'
					that.isCode = false
				} else {
					that.isCode = true
					that.codeName = '验证码'
					clearInterval(timer)
				}
			}, 1000)
		}
	},
	wxlogin() {
	  // 1.wx获取登录用户code
	  uni.login({
	    provider: 'weixin',
	    success: (loginRes)=> {
	      console.log('这是用户的code', loginRes.code)
		  let that=this
		  uni.request({
		  	// url: 'https://gxs.jlzcpt.com/user/login',
			url:'http://10.0.0.42:9101/user/login',
			data:{
				code:loginRes.code,
				avatarUrl:this.avatarUrl,
				nickName:this.nickName,
				province:'',
				gender:this.gender,
				phoneNumber:'',
				userName:'',
			},
			method:'POST',
			header: {
			        'content-type': 'application/json'
			},
			success(res) {
				if(res.data.code==1){
					that.userContent=res.data.obj;
					console.log(res.data.obj,'token')
					setToken(that.userContent.token)  //存储token
					 //存储用户信息
					setUserId(that.userContent.id)
					try {
					  uni.setStorageSync('isCanUse', 1); //记录是否第一次授权  false:表示不是第一次授权
					  uni.reLaunch({
					  	url:"/pages/views/tabBar/home"
					  })
					} catch (e) {
					  console.log('缓存失败');
					}
				}else{
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				}
			}
		  })
	    },
	  });
	},
	onAuthorize(){ //微信公众号授权登录
		uni.showToast({
			title:'对接你的公众号登录方法',
			icon:"none"
		})
	}
  }
};
</script>
<style scoped lang="scss">
.login{
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.6s ease-in-out;
  background-color: #333;
  background: url(../../static/images/system/loginBg.jpg);
  background-size: cover;
  background-repeat:no-repeat; 
  background-position: center;
}
.logo image{
  height: 160upx;
  width: 160upx;
  display: block;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 250upx;
  margin-bottom: 90upx;
}
.login_from{
  width: 80vw;
  margin: 0 auto;
  margin-top: 10vh;
}
.login_from .codes{
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: space-between;
}
.login-list {
			margin: 60upx 80upx 60upx;
			height: 100upx;
			align-items: center;
			padding: 0 60upx;
			line-height: 100upx;
			background: #FFFFFF;
			opacity: 0.8;
			border-radius: 50px;
			&.border-all {
				&:after {
					border: 1px solid #D0D0D0;
					border-radius: 100upx;
				}
			}

			.login-input {
				flex: 1;
				input {
					font-size: 28upx;
					color: #333333;
					padding-left: 20upx;
				}
			}

			.code-sx {
				content: '';
				width: 2upx;
				height: 25upx;
				background: #D0D0D0;
				margin-right: 18upx;
			}

			.codeimg {
				font-size: 24upx;
				color: #E84A4A;
			}
		}
.login_from input{
  height: 100upx;
  line-height: 100upx;
  margin-bottom: 60upx;
  background: #FFFFFF;
  opacity: 0.8;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 0 50upx;
  font-size: 24upx;
  color: #000;
}
.codes input{
	width: 75%;
}
.codes view{
	height: 80upx;
	line-height: 80upx;
	width: 130upx;
	margin-bottom: 60upx;
	color: #FFFFFF;
	background-color: rgba(70, 143, 152, 0.8);
	text-align: center;
	font-size: 24upx;
	border-radius: 10upx;
}
.login_btn{
	text-align: center;
	background: #009944;
	box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.13);
	opacity: 0.9;
	border-radius: 50px;
	font-size: 34upx;
	color: #fff;
	margin-top: 100upx;
}
.login_btn:active{
  opacity: 0.9;
}
.wxLogin{
  height: 200upx;
  width: 300upx;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  position: fixed;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
}
.wxLogin view{
  text-align: center;
  color: #FFFFFF;
  font-size: 24upx;
  margin-bottom: 20upx;
  opacity: 0.8;
}
.wxLogin image{
  height: 100upx;
  width: 100upx;
  display: block;
  z-index: 10;
  margin: 0 auto;
}
.wxLogin button{
  width: 100upx!important;
  height: 100upx;
  position: absolute;
  border-radius: 50%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 10;
  padding: 0!important;
}
</style>