<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { userLoginService, userLoginByPhoneService } from '@/api/user.js';
import { smsSendCode } from '@/api/sms.js';
import { useTokenStore } from '@/stores/modules/token.js';
const tokenStore = useTokenStore();
import { useInfoStore } from '@/stores/modules/info.js';
const infoStore = useInfoStore();

// 获取登录方式
const way = ref('');
onLoad((options) => {
    way.value = options.way;
});

const showLoginButton = ref(true);

const loginData = ref({
    username: '',
    password: '',
    code: ''
});

const login = async () => {
    if (way.value === 'pwd') {
        const data = {
            username: loginData.value.username,
            password: loginData.value.password
        };
        let result = await userLoginService(data);
		tokenStore.setToken(result.data.token);
		infoStore.setInfo(result.data.user_info);
		uni.redirectTo({
		    url: '/pages/category/category'
		});
		uni.showToast({
		    icon: 'checkmarkempty',
		    title: `欢迎，${infoStore.info.lastName}` + (infoStore.info.sex === '男' ? '先生' : '女士')
		});
    } else {
        const data = {
            phone: loginData.value.username,
            code: loginData.value.code
        };
        let result = await userLoginByPhoneService(data);
		tokenStore.setToken(result.data.token);
		infoStore.setInfo(result.data.user_info);
		uni.redirectTo({
		    url: '/pages/category/category'
		});
		uni.showToast({
		    icon: 'checkmarkempty',
		    title: `欢迎，${infoStore.info.lastName}` + (infoStore.info.sex === '男' ? '先生' : '女士')
		});
    }
};

const getCodeButtonActive = ref(false);
const countDown = ref(60);
const getCode = async () => {
    getCodeButtonActive.value = true;
    startCountDown();
    const data = {
        phone: loginData.value.username
    };
    let result = await smsSendCode(data);
    uni.showToast({
        icon: 'checkmarkempty',
        title: '验证码已发送'
    });
    loginData.value.code = result.data.code;
};

const startCountDown = () => {
    const timer = setInterval(() => {
        if (countDown.value > 0) {
            countDown.value--;
        } else {
            clearInterval(timer);
            getCodeButtonActive.value = false;
            countDown.value = 60;
        }
    }, 1000);
};
</script>

<template>
    <view class="content">
        <form>
            <!-- 表单内容 -->
            <view class="form-item">
                <text class="label">手机号</text>
                <input type="text" v-model="loginData.username" class="input" placeholder="请填写您的手机号" />
            </view>
            <view class="form-item" v-if="way === 'pwd'">
                <text class="label">密码</text>
                <input type="safe-password" v-model="loginData.password" maxlength="11" password="true" class="input" placeholder="请填写您的密码" />
            </view>
            <view class="form-item" v-if="way === 'code'">
                <text class="label">验证码</text>
                <input type="number" v-model="loginData.code" maxlength="6" class="input" placeholder="请填写您的验证码" />
                <button class="code-button" @click="getCode" :disabled="getCodeButtonActive">{{ !getCodeButtonActive ? '获取验证码' : `${countDown}秒后重试` }}</button>
            </view>
        </form>
    </view>
    <!-- 提交按钮 -->
    <button class="button" @click="login" v-if="showLoginButton">点击登录</button>
</template>

<style lang="scss">
page {
    background-color: #f4f4f4;
}

.content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;

    .form-item,
    .uni-forms-item {
        display: flex;
        align-items: center;
        min-height: 96rpx;
        padding: 25rpx 10rpx 40rpx;
        background-color: #fff;
        font-size: 28rpx;
        border-bottom: 1rpx solid #ddd;
        position: relative;
        margin-bottom: 0;

        // 调整 uni-forms 样式
        .uni-forms-item__content {
            display: flex;
        }

        .uni-forms-item__error {
            margin-left: 200rpx;
        }

        &:last-child {
            border: none;
        }

        .label {
            width: 200rpx;
            color: #333;
        }

        .input {
            flex: 1;
            display: block;
            height: 46rpx;
        }

        .code-button {
            height: 80rpx;
            // margin: 30rpx 20rpx;
            color: #fff;
            // border-radius: 80rpx;
            font-size: 30rpx;
            background-color: #47dfff;
        }

        .switch {
            position: absolute;
            right: -20rpx;
            transform: scale(0.8);
        }

        .picker {
            flex: 1;
        }

        .placeholder {
            color: #808080;
        }
    }
}

.button {
    height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #47dfff;
}
</style>
