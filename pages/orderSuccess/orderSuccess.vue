<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';	

const orderId = ref('');
onLoad((options) => {
    orderId.value = options.orderId;
});


</script>

<template>
    <scroll-view class="viewport" scroll-y @scrolltolower="onScrolltolower">
        <!-- 订单状态 -->
        <view class="overview">
			<uni-icons type="hand-up" size="32" class="icon"></uni-icons>
            <view class="status">预约成功</view>
            <view class="buttons">
                <navigator hover-class="none" class="button navigator" url="/pages/faxian/faxian" open-type="switchTab">返回首页</navigator>
                <navigator hover-class="none" class="button navigator" :url="`/pagesOrder/detail/detail`" open-type="redirect">查看订单</navigator>
            </view>
        </view>
    </scroll-view>
</template>

<style lang="scss">
page {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}

.viewport {
    background-color: #f7f7f8;
}

.overview {
    line-height: 1;
    padding: 50rpx 0;
    color: #323232;
	
	.icon {
	    display: flex;
	    justify-content: center;
		margin-top: 100rpx;
		margin-bottom: 50rpx;
	}

    .status {
        font-size: 36rpx;
        font-weight: 500;
        text-align: center;
    }

    .status::before {
        display: block;
        font-size: 110rpx;
        margin-bottom: 20rpx;
    }

    .buttons {
        height: 60rpx;
        line-height: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60rpx;
    }

    .button {
        text-align: center;
        margin: 0 10rpx;
        font-size: 28rpx;
        color: #323232;

        &:first-child {
            width: 200rpx;
            border-radius: 64rpx;
            border: 1rpx solid #323232;
        }
    }
}
</style>
