/* eslint-disable jsx-quotes */
import { Input,View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useEffect } from "react"
import "./Login.scss"

const Login=()=>{
    return (
        <view className='login-wrap'>
        <view className="title">登陆</view>
        <view className="login-item">
            <view className="item-title">手机号</view>
            <view className="item-input">
                <Input></Input>
            </view>
        </view>
        <view className="login-item">
            <view className="item-title">密码</view>
            <view className="item-input">
                <Input></Input>
            </view>
        </view>
        </view>
    )

}
export default Login