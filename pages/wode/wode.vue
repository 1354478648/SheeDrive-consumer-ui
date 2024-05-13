<script setup>
import { ref, watch } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useInfoStore } from '@/stores/modules/info.js';
import { orderGetByUserIdInWoDeService } from '@/api/order.js';
const infoStore = useInfoStore();

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync();

// 有无订单数据
const havaOrderData = ref(false);

const orderList = ref([]);
const orderGetByIdInWoDe = async () => {
    if (infoStore.info != null) {
        let result = await orderGetByUserIdInWoDeService(infoStore.info.id);
        orderList.value = result.data.List;
        havaOrderData.value = true;
    } else {
        havaOrderData.value = false;
    }
};
onShow(async() => {
    await orderGetByIdInWoDe();
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

const naviToComment = (orderId) => {
    uni.navigateTo({
        url: `/pages/comment/comment?orderId=${orderId}`
    });
};
</script>

<template>
    <scroll-view class="viewport" scroll-y enable-back-to-top>
        <!-- 个人资料 -->
        <view class="profile" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
            <!-- 情况1：已登录 -->
            <view class="overview" v-if="infoStore.info">
                <navigator url="/pages/profile/profile" hover-class="none">
                    <image
                        class="avatar"
                        mode="aspectFill"
                        :src="infoStore.info.avatar ? infoStore.info.avatar : 'https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/default_avatar.jpg'"
                    ></image>
                </navigator>
                <view class="meta">
                    <view class="nickname">{{ infoStore.info.lastName + infoStore.info.firstName }}</view>
                    <navigator class="extra" url="/pages/profile/profile" hover-class="none">
                        <text class="update">修改头像</text>
                    </navigator>
                </view>
            </view>
            <!-- 情况2：未登录 -->
            <view class="overview" v-else>
                <navigator url="/pages/login/login" hover-class="none">
                    <image class="avatar gray" mode="aspectFill" src="@/static/default_avatar.jpg"></image>
                </navigator>
                <view class="meta">
                    <navigator url="/pages/login/login" hover-class="none" class="nickname">未登录</navigator>
                    <view class="extra">
                        <text class="tips">点击登录账号</text>
                    </view>
                </view>
            </view>
            <navigator class="settings" url="/pages/settings/settings" hover-class="none">设置</navigator>
        </view>
        <!-- 我的订单 -->
        <view class="orders">
            <view class="title">
                最近订单
                <navigator class="navigator" url="/pages/orderList/orderList" hover-class="none">查看全部订单</navigator>
            </view>
            <view v-for="item in orderList" :key="item.id" class="order-container">
                <view class="order-title">
                    <text class="order-id">订单号：{{ item.id }}</text>
                    <text class="order-status">{{ getStatusText(item.status) }}</text>
                </view>
                <view class="image-container">
                    <image :src="item.carDetailInfo.image"></image>
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
                    <button @click="naviToComment(item.id)" class="comment-button" v-if="item.status == 6">去评价</button>
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
    background-repeat: no-repeat;
    background-image: url('https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/center_bg.png');
    background-size: 100% auto;
}

/* 用户信息 */
.profile {
    margin-top: 20rpx;
    position: relative;

    .overview {
        display: flex;
        height: 120rpx;
        padding: 0 36rpx;
        color: #fff;
    }

    .avatar {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background-color: #eee;
    }

    .gray {
        filter: grayscale(100%);
    }

    .meta {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        line-height: 30rpx;
        padding: 16rpx 0;
        margin-left: 20rpx;
    }

    .nickname {
        max-width: 350rpx;
        margin-bottom: 16rpx;
        font-size: 30rpx;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .extra {
        display: flex;
        font-size: 20rpx;
    }

    .tips {
        font-size: 22rpx;
    }

    .update {
        padding: 3rpx 10rpx 1rpx;
        color: rgba(255, 255, 255, 0.8);
        border: 1rpx solid rgba(255, 255, 255, 0.8);
        margin-right: 10rpx;
        border-radius: 30rpx;
    }

    .settings {
        position: absolute;
        bottom: 0;
        right: 40rpx;
        font-size: 30rpx;
        color: #fff;
    }
}

/* 我的订单 */
.orders {
    position: relative;
    z-index: 99;
    padding: 30rpx;
    margin: 50rpx 20rpx 0;
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
