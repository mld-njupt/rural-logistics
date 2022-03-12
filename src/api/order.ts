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
//下单
const order = async (sendId, collectId) => {
  let open_id, user_type;
  try {
    open_id = await Taro.getStorage({
      key: "open_id",
    });
    user_type = await Taro.getStorage({
      key: "user_type",
    });
  } catch {}
  // console.log(open_id.data);
  return Taro.request({
    url: "http://10.160.181.146:8888/place_order",
    data: {
      //测试
      user_id: open_id.data || null,
      user_type: user_type.data || null,
      mail_address_id: sendId,
      receive_address_id: collectId,
    },
    method: "POST",
    success: function (res) {},
  });
};
export { order };
