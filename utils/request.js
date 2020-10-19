/**
 * 封装的异步请求处理函数
 * 使用方法为:
 * request('接口名称',{key:value},'请求方式(默认为GET)')
 * .then(res=>{console.log(res)})
 */
import { getToken, removeToken } from "./auth";
// let baseUrl = 'http://localhost:8091';
// let baseUrl='https://gxs.jlzcpt.com';
let baseUrl='http://10.0.0.42:9101'
// let baseUrl = 'http://47.104.69.127:9101';
async function request(mehtod, params, type, callBack) {
  //创建一个名为request请求的方法函数
  if (!type) {
    type = 'GET';
  }
  let header = {
    //设置请求头信息
    'Authorization': getToken(),
    'X-Requested-With': 'XMLHttpRequest',
    "Accept": "application/json",
    "Content-Type": "application/json; charset=UTF-8"
  };
  let http = {
    url: baseUrl + mehtod,
    data: params,
    method: type,
    header: header
  };
  let promise = new Promise((resolve, reject) => {
    uni.request(http).then(res => {
      let newdata = res[1].data; // if (newdata.code == 403) {
		  console.log(newdata,'是处理过后的值啊')
      if (newdata == -1) {
        //如果错误码为 -1 提示
        uni.showToast({
          title: res[1].data.msg,
          icon: 'none'
        });
      }
      resolve(newdata);
    }).catch(err => {
      reject(err);
      console.log(err);
	  uni.hideLoading()
	  uni.showToast({
	  	title: '服务器异常',
		icon: "none"
	  })
    });
  });
  return promise;
}
export default {
  request
};