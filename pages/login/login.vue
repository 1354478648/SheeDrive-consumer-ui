<script setup>
import { ref } from 'vue';

// 跳转至用户协议与隐私条款页面
const naviToAgreement = () => {
    uni.navigateTo({
        url: '/pages/agreement/agreement'
    });
};

// 跳转至注册页面
const naviToRegister = () => {
    uni.navigateTo({
        url: '/pages/register/register'
    });
};

const naviToLoginForm = (way) => {
    uni.navigateTo({
        url: `/pages/loginForm/loginForm?way=${way}`
    });
};

// 快速登录（获取手机号功能目前针对非个人开发者，所以个人开发者无法唤起获取手机号界面）
const fastLogin = ()=>{
	uni.showToast({
	    icon: 'close',
	    title: '暂未开放'
	});
	
}
</script>

<template>
    <view class="viewport">
        <view class="logo">
            <image src="@/static/logo.png"></image>
        </view>
        <view class="login">
            <!-- 小程序端授权登录 -->
            <button class="button phone" @click="fastLogin">
                <uni-icons type="phone" size="16" color="white"></uni-icons>
                <text class="icon icon-phone"></text>
                手机号快捷登录
            </button>
            <view class="register">
                <text class="register-text">
                    还没有账号？
                    <text @click="naviToRegister" style="color: #47dfff">点击注册</text>
                </text>
            </view>
            <view class="extra">
                <view class="caption">
                    <text>其他登录方式</text>
                </view>
                <view class="options">
                    <view class="options-view" @click="naviToLoginForm('pwd')">
                        <uni-icons class="icon" type="auth" size="24"></uni-icons>
                        <text style="font-size: 24rpx">密码登录</text>
                    </view>
                    <view class="options-view" @click="naviToLoginForm('code')">
                        <uni-icons class="icon" type="email" size="24"></uni-icons>
                        <text style="font-size: 24rpx">验证码登录</text>
                    </view>
                </view>
            </view>
            <view class="tips">
                登录/注册即视为你同意
                <text @click="naviToAgreement">《用户协议与隐私条款》</text>
            </view>
        </view>
    </view>

    <view>
        <uni-popup ref="popup" type="right">
            <uni-popup-message type="info" message="本系统由 上海工程技术大学 计算机科学与技术专业 2024届毕业生 汤晟 于2024年开发" :duration="2000"></uni-popup-message>
        </uni-popup>
    </view>
</template>

<style lang="scss">
page {
    height: 100%;
}

.viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20rpx 40rpx;
}

.logo {
    flex: 1;
    text-align: center;
    image {
        width: 220rpx;
        height: 220rpx;
        margin-top: 15vh;
    }
}

.login {
    display: flex;
    flex-direction: column;
    height: 60vh;
    padding: 40rpx 20rpx 20rpx;

    .input {
        width: 100%;
        height: 80rpx;
        font-size: 28rpx;
        border-radius: 72rpx;
        border: 1px solid #ddd;
        padding-left: 30rpx;
        margin-bottom: 20rpx;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80rpx;
        font-size: 28rpx;
        border-radius: 72rpx;
        color: #fff;
        .icon {
            font-size: 40rpx;
            margin-right: 6rpx;
        }
    }

    .register {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30rpx;
        .register-text {
            font-size: 28rpx;
        }
    }

    .phone {
        background-color: #47dfff;
    }

    .wechat {
        background-color: #47dfff;
    }

    .extra {
        flex: 1;
        padding: 70rpx 70rpx 0;
        .caption {
            width: 440rpx;
            line-height: 1;
            border-top: 1rpx solid #ddd;
            font-size: 26rpx;
            color: #999;
            position: relative;
            text {
                transform: translate(-40%);
                background-color: #fff;
                position: absolute;
                top: -12rpx;
                left: 50%;
            }
        }

        .options {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 70rpx;
            .options-view {
                background-color: transparent;
                margin: 0 50rpx 0 50rpx;
            }
        }

        .icon {
            color: #444;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10rpx;
        }

        // .icon {
        //     font-size: 24rpx;
        //     color: #444;
        //     display: flex;
        //     flex-direction: column;
        //     align-items: center;

        //     &::before {
        //         display: flex;
        //         align-items: center;
        //         justify-content: center;
        //         width: 80rpx;
        //         height: 80rpx;
        //         margin-bottom: 6rpx;
        //         font-size: 40rpx;
        //         border: 1rpx solid #444;
        //         border-radius: 50%;
        //     }
        // }
        // .icon-weixin::before {
        //     border-color: #06c05f;
        //     color: #06c05f;
        // }
    }
}

.tips {
    position: absolute;
    bottom: 80rpx;
    left: 20rpx;
    right: 20rpx;
    font-size: 22rpx;
    color: #999;
    text-align: center;
}
</style>
