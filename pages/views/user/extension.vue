<template>
	<view>
		分享
	</view>
</template>

<script>
	var app = getApp();
	import loading from "../../commponent/public/loading";
	export default {
		data() {
			return {
				share:{
				    title:'ALAPI',
				    path:'/pages/index/index',
				    imageUrl:'',
				    desc:'',
				    content:''
				}
			};
		},

		components: {
			loading
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				colors: app.globalData.newColor
			});
			this.getSystem()
			setTimeout(() => {
				this.setData({
					isShow: false
				});
			}, 600);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			onShareAppMessage(res) {
			        return {
			            title:this.share.title,
			            path:this.share.path,
			            imageUrl:this.share.imageUrl,
			            desc:this.share.desc,
			            content:this.share.content,
			            success(res){
			                uni.showToast({
			                    title:'分享成功'
			                })
			            },
			            fail(res){
			                uni.showToast({
			                    title:'分享失败',
			                    icon:'none'
			                })
			            }
					}
			},
			saveImg() {
				//保存图片
				uni.showLoading({
					title: '保存中...'
				});
				let that = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.hideLoading();
							uni.openSetting({
								success(res) { //拒绝授权后重新提示授权，并授权成功
								}
							});
						} else {
							setTimeout(() => {
								uni.canvasToTempFilePath({
									canvasId: 'mycanvas',
									success: function(res) {
										console.log(res);
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success(re) {
												uni.hideLoading();
												uni.showToast({
													title: '保存成功',
													icon: 'success'
												});
											},
											fail(err) {
												uni.showToast({
													title: '保存失败',
													icon: 'none'
												});
											}

										});
									}
								});
							}, 1000);
						}
					}

				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.myextension {
		background-color: #FFFFFF;
		overflow: hidden;
		padding-bottom: 100upx;
	}

	.myextension image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.saveImg {
		width: 300upx;
		height: 80upx;
		border-radius: 40upx;
		box-shadow: 0 10upx 10upx #ddd;
		background-color: pink;
		line-height: 80upx;
		text-align: center;
		color: #fff;
		margin: 0 auto;
		margin-top: 60upx;
	}

	.mycanvas {
		margin: 0 auto;
		transform: translateY(30upx);
		border-radius: 10upx;
		overflow: hidden;
	}

	.imgs {
		position: absolute;
		top: 30upx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 10upx;
		overflow: hidden;
	}
	.tips{
		text-align: center;
		color: #999;
		font-size: 24upx;
		margin-top: 50upx;
	}
</style>
