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
//用户上传/修改/删除/更新地址

const address = async (
  method,
  address_id?,
  is_default?,
  name?,
  phone_number?,
  region?,
  location?
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
      user_id: open_id.data || null,
      user_type: user_type.data || null,
      is_default: is_default || null,
      name: name || null,
      phone_number: phone_number || null,
      region: region || null,
      location: location || null,
      address_id: address_id || null,
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
//获取单个地址
const getSingleAddress = (address_id) => {
  return Taro.request({
    url: "http://10.160.181.146:8888/single-address",
    data: {
      address_id,
    },
    method: "GET",
  });
};
export { address, getAllAddress, getSingleAddress };
