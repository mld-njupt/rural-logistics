import Taro from "@tarojs/taro";

const interceptor = function (chain) {
  const requestParams = chain.requestParams;
  return chain.proceed(requestParams).then((res) => {
    // 全局自动报错
    if (res.data.code && res.data.code != 200) {
      Taro.showToast({
        title: "服务器错误",
        icon: "none",
        duration: 2000,
      });
    }
    return res;
  });
};
Taro.addInterceptor(interceptor);

//获取用户id
const getOpenId = () => {
  return Taro.login({
    success: function (res) {
      if (res.code) {
        //   发起网络请求
        Taro.request({
          url: "http://10.160.181.146:8888/admin-getid",
          data: {
            code: res.code,
          },
          method: "POST",
          success: function (data: any) {
            Taro.setStorage({
              key: "open_id",
              data: data.data.open_id,
            });
          },
        });
      } else {
        console.log("登录失败！" + res.errMsg);
      }
    },
  });
};
//用户登录
const login = (userType: string) => {
  return Taro.getStorage({
    key: "open_id",
    success: function (res) {
      console.log(res.data);
      Taro.request({
        url: "http://10.160.181.146:8888/admin-login",
        data: {
          open_id: res.data,
          user_type: userType,
        },
        method: "POST",
        success: function (data: any) {
          Taro.showToast({
            title: "登录成功",
            icon: "success",
            duration: 2000,
          });
          Taro.switchTab({
            url: "../index/index",
          });
        },
      });
    },
  });
};
export { getOpenId, login };
