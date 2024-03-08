<script setup>
import { ref } from 'vue';
import { useInfoStore } from '@/stores/modules/info.js';
const infoStore = useInfoStore();
import { userUpdateAvatarService } from '@/api/user.js';

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

const onAvatarChange = () => {
    // 调用拍照/选择图片
    uni.chooseMedia({
        // 文件个数
        count: 1,
        // 文件类型
        mediaType: ['image'],
        success: (res) => {
            // 本地路径
            const { tempFilePath } = res.tempFiles[0];
            // 文件上传
            uni.uploadFile({
                url: '/file/upload',
                name: 'file', // 后端数据字段名
                filePath: tempFilePath, // 新头像
                success: async (res) => {
                    // 判断状态码是否上传成功
                    if (res.statusCode === 200) {
                        // 提取头像
                        const avatarUrl = JSON.parse(res.data).data.url;
                        const data = {
                            id: infoStore.info.id,
                            url: avatarUrl
                        };
                        await userUpdateAvatarService(data);
                        // 更新 Store 头像
                        infoStore.info.avatar = avatarUrl;
                        uni.showToast({ icon: 'success', title: '更新成功' });
                    } else {
                        uni.showToast({ icon: 'error', title: '发生错误' });
                    }
                }
            });
        }
    });
};

const naviToChangePwd = ()=>{
	uni.navigateTo({
	    url: '/pages/changePwd/changePwd'
	});
}
</script>

<template>
    <view class="viewport">
        <!-- 导航栏 -->
        <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
            <navigator open-type="navigateBack" class="back icon-left" hover-class="none">
                <uni-icons class="icon" type="left" size="24" color="white"></uni-icons>
            </navigator>
            <view class="title">个人信息</view>
        </view>
        <!-- 头像 -->
        <view class="avatar">
            <view class="avatar-content" @click="onAvatarChange">
                <image class="image" :src="infoStore.info.avatar ? infoStore.info.avatar : 'https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/default_avatar.jpg'" mode="aspectFill" />
                <text class="text">点击修改头像</text>
            </view>
        </view>
        <!-- 表单 -->
        <view class="form">
            <!-- 表单内容 -->
            <view class="form-content">
                <view class="form-item">
                    <text class="label">用户名</text>
                    <text class="account">{{ infoStore.info.username }}</text>
                </view>
                <view class="form-item">
                    <text class="label">姓名</text>
                    <text class="account">{{ infoStore.info.lastName + infoStore.info.firstName }}</text>
                </view>
                <view class="form-item">
                    <text class="label">性别</text>
                    <text class="account">{{ infoStore.info.sex }}</text>
                </view>
                <view class="form-item">
                    <text class="label">生日</text>
                    <text class="account">{{ infoStore.info.birthday.substring(0, 10) }}</text>
                </view>
                <view class="form-item">
                    <text class="label">身份证号</text>
                    <text class="account">{{ infoStore.info.idNumber.substring(0, 4) + '******' + infoStore.info.idNumber.substring(10, 14) + '****' }}</text>
                </view>
                <view class="form-item">
                    <text class="label">创建日期</text>
                    <text class="account">{{ infoStore.info.createTime }}</text>
                </view>
            </view>
            <!-- 提交按钮 -->
            <button class="form-button" @click="naviToChangePwd">修改密码</button>
        </view>
    </view>
</template>

<style lang="scss">
page {
    background-color: #f4f4f4;
}

.viewport {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-image: url(https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/navigator_bg.png);
    background-size: auto 420rpx;
    background-repeat: no-repeat;
}

// 导航栏
.navbar {
    position: relative;

    .title {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32rpx;
        font-weight: 500;
        color: #fff;
    }

    .back {
        position: absolute;
        height: 40px;
        width: 40px;
        left: 0;
        font-size: 20px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

// 头像
.avatar {
    text-align: center;
    width: 100%;
    height: 260rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        background-color: #eee;
    }

    .text {
        display: block;
        padding-top: 20rpx;
        line-height: 1;
        font-size: 26rpx;
        color: #fff;
    }
}

// 表单
.form {
    background-color: #f4f4f4;

    &-content {
        margin: 20rpx 20rpx 0;
        padding: 0 20rpx;
        border-radius: 10rpx;
        background-color: #fff;
    }

    &-item {
        display: flex;
        height: 96rpx;
        line-height: 46rpx;
        padding: 25rpx 10rpx;
        align-items: center;
        background-color: #fff;
        font-size: 32rpx;
        border-bottom: 1rpx solid #ddd;

        &:last-child {
            border: none;
        }

        .label {
            width: 180rpx;
            color: #333;
        }

        .account {
            color: #666;
        }

        .input {
            flex: 1;
            display: block;
            height: 46rpx;
        }

        .radio {
            margin-right: 20rpx;
        }

        .picker {
            flex: 1;
        }
        .placeholder {
            color: #808080;
        }
    }

    &-button {
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        margin: 30rpx 20rpx;
        color: #fff;
        border-radius: 80rpx;
        font-size: 30rpx;
        background-color: #47dfff;
    }
}
</style>
