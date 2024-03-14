<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useInfoStore } from '@/stores/modules/info.js';
import { orderGetByUserIdService } from '@/api/order.js';
const infoStore = useInfoStore();

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

// 有无订单数据
const havaOrderData = ref(false);

const orderList = ref([]);
const orderGetById = async () => {
    if (infoStore.info.hasOwnProperty('id')) {
        let result = await orderGetByUserIdService(infoStore.info.id);
        orderList.value = result.data.List;
        havaOrderData.value = true;
    }
};
onShow(() => {
    orderGetById();
});

const statusOptions = [
    { value: -1, label: '异常' },
    { value: 0, label: '取消' },
    { value: 1, label: '未确认' },
    { value: 2, label: '已确认' },
    { value: 3, label: '签署协议' },
    { value: 4, label: '试驾中' },
    { value: 5, label: '试驾结束' },
    { value: 6, label: '待评价' },
    { value: 7, label: '已评价' }
];
const getStatusText = (status) => {
    const statusOption = statusOptions.find((option) => option.value === status);
    return statusOption ? statusOption.label : '未知状态';
};

const statusList = ref([
    {
        title: '未确认'
    },
    {
        title: '已确认'
    },
    {
        title: '签署协议'
    },
    {
        title: '试驾中'
    },
    {
        title: '试驾结束'
    },
    {
        title: '待评价'
    },
    {
        title: '已评价'
    }
]);

const naviToOrderDetail = (orderId) => {
    uni.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderId=${orderId}`
    });
};
</script>

<template>
    <scroll-view class="viewport" scroll-y enable-back-to-top>
        <view class="orders">
            <view v-for="item in orderList" :key="item.id" class="order-container">
                <view class="order-title">
                    <text class="order-id">订单号：{{ item.id }}</text>
                    <text class="order-status">{{ getStatusText(item.status) }}</text>
                </view>
                <view class="image-container">
                    <image src="https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/car_aodiA4L.jpg"></image>
                    <view class="order-info">
                        <text>{{ item.carDetailInfo.brand + ' ' + item.carDetailInfo.model + ' ' + item.carDetailInfo.version }}</text>
                        <text>{{ item.dealerInfo.name }}</text>
                        <text>{{ item.orderTime.substring(0, 10) }}</text>
                    </view>
                </view>
                <view v-if="item.status == 0" class="steps-container">
                    <uni-icons type="closeempty" size="24" class="icon"></uni-icons>
                    <view class="status">订单取消</view>
                </view>
                <view v-else class="steps-container">
                    <uni-steps direction="row" :options="statusList" :active="item.status - 1" active-color="#47dfff" s />
                </view>

                <view class="button-container">
                    <button @click="naviToOrderDetail(item.id)" class="detail-button">查看详情</button>
                    <button class="comment-button" v-if="item.status == 6">去评价</button>
                </view>
            </view>

            <view class="section">
                <view v-if="!havaOrderData" class="nodata">
                    <text class="nodata-text">没有数据，快去试驾吧 ~</text>
                </view>
            </view>
        </view>
        <view class="bottom">
            <text class="buttom-text">———— 已经到底了 ————</text>
        </view>
    </scroll-view>
</template>

<style lang="scss">
page {
    height: 100%;
    overflow: hidden;
    background-color: #f7f7f8;
}

.viewport {
    height: 100%;
}

/* 我的订单 */
.orders {
    position: relative;
    z-index: 99;
    padding: 30rpx;
    margin: 20rpx 20rpx 0;
    background-color: #fff;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);

    .title {
        height: 40rpx;
        line-height: 40rpx;
        font-size: 28rpx;
        color: #1e1e1e;

        .navigator {
            font-size: 24rpx;
            color: #939393;
            float: right;
        }
    }

    .order-container {
        display: flex;
        flex-direction: column;
        margin-top: 20rpx;
        border-bottom: 1px solid #ccc;
        .order-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24rpx;
            .order-id {
                font-weight: bold;
            }
            .order-status {
                margin-left: auto;
            }
        }
        .image-container {
            display: flex;
            align-items: center; // 垂直居中
            margin-top: 20rpx;
            image {
                width: 40%; // 控制图片大小
                height: 200rpx;
            }
            .order-info {
                display: flex;
                flex-direction: column;
                margin-left: 10px; // 控制文字和图片之间的间距
                text {
                    display: block; // 每个信息换行显示
                    margin: 15rpx;
                    font-size: 24rpx;
                }
            }
        }

        .steps-container {
            margin-top: 20rpx;
            .icon {
                display: flex;
                justify-content: center;
                margin-top: 20rpx;
            }
            .status {
                font-size: 24rpx;
                font-weight: 500;
                text-align: center;
            }

            .status::before {
                display: block;
                font-size: 110rpx;
            }
        }

        .button-container {
            display: flex;
            justify-content: flex-end;
            margin-top: auto; // 将按钮容器推到底部
            .detail-button {
                height: 80rpx;
                margin: 30rpx 20rpx;
                color: #47dfff;
                border-radius: 80rpx;
                font-size: 28rpx;
                border: 2rpx solid #47dfff; // 设置边框
                background-color: transparent; // 设置背景为透明色
            }
            .comment-button {
                height: 80rpx;
                margin: 30rpx 20rpx;
                color: #fff;
                border-radius: 80rpx;
                font-size: 28rpx;
                background-color: #47dfff;
            }
        }
    }

    .section {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40rpx 20rpx 10rpx;

        .nodata {
            text-align: center;
            margin: 100rpx 0 100rpx 0;
            .nodata-text {
                font-size: 24rpx;
                color: #999;
            }
        }
    }
}
.bottom {
    margin-top: 20rpx;
    min-height: 40rpx; /* 设置一个足够的最小高度 */
    display: flex;
    justify-content: center; /* 水平居中 */
    width: 100%; /* 设置一个合适的宽度 */

    .buttom-text {
        font-size: 24rpx;
        color: #808080;
    }
}
</style>
