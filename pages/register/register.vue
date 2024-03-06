<script setup>
import { ref } from 'vue';
import { userRegisterService } from '@/api/user.js';

const registerData = ref({
    name: '',
    idCard: '',
    phone: '',
    password: '',
    confirmPassword: ''
});

const register = async () => {
    const data = {
        last_name: registerData.value.name.substring(0, 1),
        first_name: registerData.value.name.substring(1),
        id_number: registerData.value.idCard,
        phone: registerData.value.phone,
        password: registerData.value.password,
        confirmPassword: registerData.value.confirmPassword
    };
    let result = await userRegisterService(data);
	uni.redirectTo({
	    url: '/pages/login/login'
	});
	uni.showToast({
		icon: 'checkmarkempty',
		title: '注册成功',
	})
};
</script>

<template>
    <view class="content">
        <form>
            <!-- 表单内容 -->
            <view class="form-item">
                <text class="label">姓名</text>
                <input type="text" v-model="registerData.name" class="input" placeholder="请填写您的姓名" />
            </view>
            <view class="form-item">
                <text class="label">身份证号</text>
                <input type="idcard" v-model="registerData.idCard" maxlength="18" class="input" placeholder="请填写您的身份证号" />
            </view>
            <view class="form-item">
                <text class="label">联系电话</text>
                <input type="tel" v-model="registerData.phone" maxlength="11" class="input" placeholder="请填写您的联系电话" />
            </view>
            <view class="form-item">
                <text class="label">密码</text>
                <input type="safe-password" v-model="registerData.password" password="true" class="input" placeholder="请填写您的密码" />
            </view>
            <view class="form-item">
                <text class="label">确认密码</text>
                <input type="safe-password" v-model="registerData.confirmPassword" password="true" class="input" placeholder="请重新填写您的密码" />
            </view>
        </form>
    </view>
    <!-- 提交按钮 -->
    <button class="button" @click="register">点击注册</button>
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
