<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useInfoStore } from '@/stores/modules/info.js';
import { orderGetByIdService } from '@/api/order.js';
import { commentAddService } from '@/api/comment.js';
const infoStore = useInfoStore();

const orderId = ref('');
onLoad((options) => {
    orderId.value = options.orderId;
    orderGetById();
});

const orderInfo = ref({});
const orderGetById = async () => {
    let result = await orderGetByIdService(orderId.value);
    orderInfo.value = result.data.orderInfo;
};

const commentAddData = ref({
    orderId: '',
    content: '',
    totalScore: 0,
    dealerScore: 0,
    carScore: 0
});

const commentAdd = async () => {
    commentAddData.value.orderId = orderId.value;
    let result = await commentAddService(commentAddData.value);
    uni.switchTab({
        url: '/pages/wode/wode'
    });
    uni.showToast({
        icon: 'checkmark',
        title: '评价成功'
    });
};
</script>

<template>
    <view class="content">
        <form>
            <!-- 表单内容 -->
            <view class="form-item">
                <text class="label">订单号</text>
                <input :value="orderId" type="text" class="input" disabled="true" />
            </view>
            <view class="form-item">
                <text class="label">
                    <text style="color: red">*</text>
                    总评分
                </text>
                <uni-rate v-model="commentAddData.totalScore" :is-fill="false" class="input" />
            </view>
            <view class="form-item">
                <text class="label">经销商</text>
                <input :value="orderInfo.dealerInfo.name" type="text" class="input" disabled="true" />
            </view>
            <view class="form-item">
                <text class="label">
                    <text style="color: red">*</text>
                    经销商评分
                </text>
                <uni-rate v-model="commentAddData.dealerScore" :is-fill="false" class="input" />
            </view>
            <view class="form-item">
                <text class="label">体验车辆</text>
                <input
                    :value="orderInfo.carDetailInfo.brand + ' ' + orderInfo.carDetailInfo.model + ' ' + orderInfo.carDetailInfo.version"
                    type="text"
                    class="input"
                    disabled="true"
                />
            </view>
            <view class="form-item">
                <text class="label">
                    <text style="color: red">*</text>
                    车辆评分
                </text>
                <uni-rate v-model="commentAddData.carScore" :is-fill="false" class="input" />
            </view>
            <view class="form-item">
                <text class="label">
                    <text style="color: red">*</text>
                    评价内容
                </text>
                <textarea v-model="commentAddData.content" class="input" auto-height />
            </view>
        </form>
    </view>
    <!-- 提交按钮 -->
    <button class="button" @click="commentAdd">提交评价</button>
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

        .data-picker {
            width: 400rpx;
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
