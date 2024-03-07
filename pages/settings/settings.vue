<script setup>
import { useInfoStore } from '@/stores/modules/info.js';
const infoStore = useInfoStore();
import { useTokenStore } from '@/stores/modules/token.js';
const tokenStore = useTokenStore();

const naviToProfile = () => {
    if (infoStore.info) {
        uni.navigateTo({
            url: '/pages/profile/profile'
        });
    } else {
        uni.navigateTo({
            url: '/pages/login/login'
        });
    }
};

const logout = () => {
	if(!infoStore.info){
		uni.showToast({
			icon: 'none',
			title: '尚未登录',
		})
		return
	}
	
    uni.showModal({
        content: '是否退出登录？',
        success: (res) => {
            if (res.confirm) {
                // 清理用户信息
                infoStore.removeInfo();
				tokenStore.removeToken();
                uni.switchTab({
                    url: '/pages/wode/wode'
                });
            }
			uni.showToast({
				icon: 'none',
				title: '退出成功',
			})
        }
    });
};
</script>

<template>
    <view class="content">
        <uni-list>
            <uni-list-item title="个人资料" link @click="naviToProfile"></uni-list-item>
            <uni-list-item title="我的订单"></uni-list-item>
            <uni-list-item title="我的地址簿"></uni-list-item>
            <uni-list-item title="用户协议与隐私条款" link to="/pages/agreement/agreement"></uni-list-item>
        </uni-list>
    </view>
    <button class="button" @click="logout">退出登录</button>
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
}

.button {
    height: 80rpx;
    margin: 40rpx 50rpx;
    color: #fff;
    // border-radius: 80rpx;
    font-size: 30rpx;
    background-color: red;
}
</style>
