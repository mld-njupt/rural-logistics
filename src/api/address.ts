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
//用户上传/修改地址
const address = async (
  method,
  is_default,
  name,
  phone_number,
  region,
  location
) => {
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
    url: "http://10.160.181.146:8888/address",
    data: {
      //测试

      user_id: open_id.data || "111",
      user_type: user_type.data,
      is_default,
      name,
      phone_number,
      region,
      location,
    },
    method,
    success: function (res) {},
  });
};
//获取全部地址
const getAllAddress = async () => {
  let open_id, user_type;
  try {
    open_id = await Taro.getStorage({
      key: "open_id",
    });
    user_type = await Taro.getStorage({
      key: "user_type",
    });
  } catch {}
  return Taro.request({
    url: "http://10.160.181.146:8888/all-address",
    data: {
      user_id: open_id.data,
      user_type: user_type.data,
    },
    method: "GET",
  });
};
export { address, getAllAddress };
