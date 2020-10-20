<template>
	<view class="home">
		<!-- 顶部 -->
		<headers :colors="colors" :locations="locations" :titleClass='titleClass' :swiperList="swiperList"></headers>
		<!-- 推荐分类菜单 与tab分类中不同 -->
		<classList :categoryList="categoryList"></classList>
		<!-- 公告 -->
		<!-- <notice :colors="colors" :noticeList="noticeList"></notice> -->
		<!-- 栏目 -->
		<!-- <column></column> -->
		<!-- 广告图 -->
		<!-- <banner ></banner> -->

		<!-- 热门标题 -->
		<hotstitle :pintuanList="pintuanList"></hotstitle>
		<column :tejiaList="tejiaList"></column>
		<!-- <hotstitle :pintuanList="pintuanList"></hotstitle> -->
		<!-- 推荐商品列表 -->
		<recommend :colors="colors" :dataList="dataList" :loading="loading" bottoms="100"></recommend>
		<!-- 右侧悬浮菜单栏 -->
		<!-- <suspension :scrollShow="scrollShow" :colors="colors"></suspension> -->
	</view>
</template>

<script>
	var app = getApp();
	import headers from '../../commponent/home/header';
	import classList from '../../commponent/home/classList';
	import notice from '../../commponent/home/notice';
	import column from '../../commponent/home/column';
	// import banner from '../../../components/QS-Gradient-Swiper/QS-Gradient-Swiper-vue.vue';
	import hotstitle from '../../commponent/home/hotstitle';
	import recommend from '../../commponent/home/recommend';
	import suspension from '../../commponent/home/suspension';
	import {
		getlocation
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				colors: '',
				scrollShow: false, //是否显示悬浮菜单
				categoryList: [],
				dataList:[],
				current:1,
				pintuanList:[],
				tejiaList:[],
				pageSize:10,
				isLoadMore:false,
				titleClass:'',
				locations: {

				},
				loading: true,
				swiperList: [{
					img: 'https://jlzcpt.cn/file/gxs/home/banner1.png'
				}, {
					img: 'https://jlzcpt.cn/file/gxs/home/banner2.png'
				}, {
					img: 'https://jlzcpt.cn/file/gxs/home/banner1.png'
				}],
				noticeList: [{
						id: 1,
						title: '甜品港湾,恬美生活'
					},
					{
						id: 2,
						title: '将来有太多未知的甜等待你去尝试'
					}
				]
			};
		},
		components: {
			headers,
			classList,
			notice,
			column,
			// banner,
			hotstitle,
			recommend,
			suspension
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getItemList();
			this.getDataList();
			this.getShopList();
			this.getTejiaList();
			let telModel = uni.getSystemInfoSync().model;
			console.log(telModel,'1231312')
			    if (telModel.indexOf('iPhone X') != -1) {
			      this.setData({ titleClass: 'title-ipX', bodyClass: 'content-body-ipX' });
			    } else if (telModel.indexOf('Nexus 5') != -1) {
			      this.setData({ titleClass: 'title-Ne5', bodyClass: 'content-body-nex5' });
			    } else if (telModel.indexOf('iPhone 6') != -1 || telModel.indexOf('iPhone 6 Plus') != -1 ||
			      telModel.indexOf('iPhone 7') != -1 || telModel.indexOf('iPhone 7 Plus') != -1 ||
			      telModel.indexOf('Nexus 5x') != -1 || telModel.indexOf('Nexus 6') != -1
			    ) {
			      this.setData({ titleClass: 'title-IP6', bodyClass: 'content-body' });
			    } else {
			      this.setData({ titleClass: 'title', bodyClass: 'content-body-IP5' });
			    }
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.setData({
				colors: app.globalData.newColor
			});
			uni.setNavigationBarColor({ //设置标题栏颜色
				backgroundColor: app.globalData.newColor,
				frontColor: '#ffffff'
			});
			// #ifdef H5
			let locations = getlocation() //获取位置信息
			if (locations) {
				this.locations = locations
			}
			// #endif
		},

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
		onReachBottom:function() {
			this.onBottom();
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			onPageScroll: function(e) {
				if (e.scrollTop >= 500) {
					this.setData({
						scrollShow: true
					});
				} else {
					this.setData({
						scrollShow: false
					});
				}
			},
			getItemList() {
				let data = {
					status: 0,
					indexType: '1'
				}
				uni.showLoading({
					mask: true
				})
				this.$request('/productType/list', data,'POST').then(res=>{
					uni.hideLoading();
					if (res.code == 1) {
						this.categoryList=res.obj
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}	
				})	
			},
			getDataList() {
				let data = {
					isBulk:'2',
					isSpecialOffer:'2',
					productTypeId: '',
					productName: '',
					current:this.current,
					pageSize:this.pageSize
				}
				uni.showLoading({
					mask: true
				})
				this.$request('/product/page', data,'POST').then(res=>{
					console.log(res,'是团购啊 ')
					uni.hideLoading();
					if(this.current==1){
						this.dataList=res.obj.list
					}else{
						if(res.obj.list.length<this.pageSize){
							this.isLoadMore=true
							this.setData({
								loading:false
							})
						}else{
							this.isLoadMore=false
						}
						let newDataList=this.dataList.concat(res.obj.list)
						this.dataList=newDataList
					}
					// if (this.current==1) {
					// 	this.categoryList=res.obj.list;
					// } else {
					// 	uni.showToast({
					// 		title: res.msg,
					// 		icon: 'none'
					// 	})
					// }
				})
			},
			getShopList() {
				let data = {
					isBulk:'1',
					isSpecialOffer:'2',
					productTypeId: '',
					productName: '',
					current:this.current,
					pageSize:10
				}
				uni.showLoading({
					mask: true
				})
				let res = this.$request('/product/page', data,'POST').then(res=>{
					uni.hideLoading()
					if (res.code == 1) {
						this.pintuanList=res.obj.list
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			getTejiaList() {
				let data = {
					isBulk:'2',
					isSpecialOffer:'1',
					productTypeId: '',
					productName: '',
					current:this.current,
					pageSize:10
				}
				uni.showLoading({
					mask: true
				})
				let res = this.$request('/product/page', data,'POST').then(res=>{
					console.log(res.obj.list,'首页列表数据啊')
					uni.hideLoading()
					if (res.code == 1) {
						this.tejiaList=res.obj.list
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			onBottom(){
			     if(!this.isLoadMore){  
			            this.isLoadMore=true
			            this.current+=1
			            this.getDataList()
			       }
			  },
		}
	};
</script>
<style scoped lang="scss">
	.home {
		margin-bottom: 40rpx;
		background: #f8f8f8;
	}
</style>
