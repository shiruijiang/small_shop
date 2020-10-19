
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/views/tabBar/home","pages/login/login","pages/views/tabBar/category","pages/views/tabBar/cart","pages/views/tabBar/user","pages/views/setting/index","pages/views/home/classList","pages/views/goods/goodsDetails","pages/views/goods/goodsEvaluate","pages/views/order/evaluate","pages/views/order/confirmOrder","pages/views/order/success","pages/views/user/mycoupon","pages/views/user/mycollection","pages/views/user/myaddress","pages/views/user/address/edit","pages/views/user/mypoints","pages/views/user/exchange/exchange","pages/views/user/mydistribution","pages/views/order/orderlist","pages/views/order/orderdetails","pages/views/order/cancelorder","pages/views/order/afterSaleList","pages/views/order/afterSale","pages/views/withdrawal/withdrawal","pages/views/withdrawal/withdrawalrecord","pages/views/user/mysubordinate","pages/views/user/extension","pages/views/home/search","pages/views/home/h5map","pages/views/user/allFootprint"],"window":{"backgroundTextStyle":"light","navigationBarBackgroundColor":"#fff","navigationBarTitleText":"Weixin","navigationBarTextStyle":"black"},"tabBar":{"backgroundColor":"#ffffff","borderStyle":"white","selectedColor":"#3B7A86","color":"#666666","list":[{"pagePath":"pages/views/tabBar/home","iconPath":"/static/images/tabBar/home.png","selectedIconPath":"/static/images/tabBar/home-default.png","text":"首页"},{"pagePath":"pages/views/tabBar/category","iconPath":"/static/images/tabBar/class.png","selectedIconPath":"/static/images/tabBar/class-default.png","text":"分类"},{"pagePath":"pages/views/tabBar/cart","iconPath":"/static/images/tabBar/cart.png","selectedIconPath":"/static/images/tabBar/cart-default.png","text":"购物车"},{"pagePath":"pages/views/tabBar/user","iconPath":"/static/images/tabBar/user.png","selectedIconPath":"/static/images/tabBar/user-default.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"small-shop","compilerVersion":"2.8.11","entryPagePath":"pages/views/tabBar/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/views/tabBar/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationBarBackgroundColor":"#fa436a","navigationBarTextStyle":"white","titleNView":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","navigationBarTitleText":"登录","titleNView":false}},{"path":"/pages/views/tabBar/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","titleNView":false}},{"path":"/pages/views/tabBar/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车","titleNView":false}},{"path":"/pages/views/tabBar/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom","onReachBottomDistance":50,"bounce":"none","titleNView":false}},{"path":"/pages/views/setting/index","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/views/home/classList","meta":{},"window":{"navigationBarTitleText":"商品列表","navigationStyle":"custom","titleNView":false}},{"path":"/pages/views/goods/goodsDetails","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"商品详情"}},{"path":"/pages/views/goods/goodsEvaluate","meta":{},"window":{"navigationBarTitleText":"所有评价"}},{"path":"/pages/views/order/evaluate","meta":{},"window":{"navigationBarTitleText":"商品评价"}},{"path":"/pages/views/order/confirmOrder","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/views/order/success","meta":{},"window":{"navigationBarTitleText":"支付结果","navigationStyle":"custom","titleNView":false}},{"path":"/pages/views/user/mycoupon","meta":{},"window":{"navigationBarTitleText":"优惠券"}},{"path":"/pages/views/user/mycollection","meta":{},"window":{"navigationBarTitleText":"我的收藏","navigationStyle":"custom","titleNView":false}},{"path":"/pages/views/user/myaddress","meta":{},"window":{"navigationBarTitleText":"收货地址"}},{"path":"/pages/views/user/address/edit","meta":{},"window":{"navigationBarTitleText":"编辑收货地址"}},{"path":"/pages/views/user/mypoints","meta":{},"window":{"navigationBarTitleText":"我的积分","navigationBarTextStyle":"white"}},{"path":"/pages/views/user/exchange/exchange","meta":{},"window":{"navigationBarTitleText":"兑换礼品"}},{"path":"/pages/views/user/mydistribution","meta":{},"window":{"navigationBarTitleText":"分销中心","navigationBarTextStyle":"white"}},{"path":"/pages/views/order/orderlist","meta":{},"window":{"navigationBarTitleText":"我的订单","navigationStyle":"custom","titleNView":false}},{"path":"/pages/views/order/orderdetails","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/views/order/cancelorder","meta":{},"window":{"navigationBarTitleText":"取消订单"}},{"path":"/pages/views/order/afterSaleList","meta":{},"window":{"navigationBarTitleText":"退换/售后","navigationStyle":"custom","titleNView":false}},{"path":"/pages/views/order/afterSale","meta":{},"window":{"navigationBarTitleText":"申请售后"}},{"path":"/pages/views/withdrawal/withdrawal","meta":{},"window":{"navigationBarTitleText":"提现"}},{"path":"/pages/views/withdrawal/withdrawalrecord","meta":{},"window":{"navigationBarTitleText":"提现明细"}},{"path":"/pages/views/user/mysubordinate","meta":{},"window":{"navigationBarTitleText":"我的下级"}},{"path":"/pages/views/user/extension","meta":{},"window":{"navigationBarTitleText":"推广海报"}},{"path":"/pages/views/home/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/views/home/h5map","meta":{},"window":{"navigationBarTitleText":"选择位置"}},{"path":"/pages/views/user/allFootprint","meta":{},"window":{"navigationBarTitleText":"我的足迹","navigationStyle":"custom","titleNView":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
