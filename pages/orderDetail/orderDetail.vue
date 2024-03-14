<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { orderGetByIdService } from '@/api/order.js';
import { formatPrice } from '@/utils/common.js';

const orderId = ref('');
onLoad((options) => {
    orderId.value = options.orderId;
    orderGetById();
});

const orderInfo = ref({});
const orderGetById = async () => {
    let result = await orderGetByIdService(orderId.value);
    orderInfo.value = result.data.orderInfo;
    console.log(orderInfo.value);
};

// 汽车分类映射关系
const categoryMap = {
    0: '其他',
    1: '轿车',
    2: 'SUV',
    3: 'MPV',
    4: '卡车',
    5: '跑车'
};
const getCategoryName = (categoryId) => {
    return categoryMap[categoryId] || '未知分类';
};

// 汽车驱动类型映射关系
const typeMap = {
    0: '其他',
    1: '纯电动',
    2: '插电混动',
    3: '增程',
    4: '汽油',
    5: '汽油+48V轻混系统',
    6: '油电混动',
    7: '柴油'
};
const getTypeName = (typeId) => {
    return typeMap[typeId] || '未知分类';
};

// 汽车座位数映射关系
const seatMap = {
    0: '7座以上',
    1: '1座',
    2: '2座',
    4: '4座',
    5: '5座',
    6: '6座',
    7: '7座'
};
const getSeatName = (seatId) => {
    return seatMap[seatId] || '未知分类';
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
</script>

<template>
    <view class="container">
        <view class="name-container">
            <text class="car-name">{{ orderInfo.carDetailInfo.brand + ' ' + orderInfo.carDetailInfo.model }}</text>
            <text class="car-model">{{ orderInfo.carDetailInfo.version }}</text>
        </view>
        <view class="image-box">
            <image class="image" :src="orderInfo.carDetailInfo.image"></image>
        </view>
        <view class="dealer-title">
            <text class="dealer-text">| 汽车信息</text>
        </view>
        <uni-card :isFull="true" class="price-container">
            <view class="grid">
                <view class="grid-item">
                    <text class="text">{{ orderInfo.carDetailInfo.year }}</text>
                    <text class="label">年份</text>
                </view>
                <view class="grid-item">
                    <text class="text">{{ getCategoryName(orderInfo.carDetailInfo.category) }}</text>
                    <text class="label">分类</text>
                </view>
                <view class="grid-item">
                    <text class="text">{{ getTypeName(orderInfo.carDetailInfo.type) }}</text>
                    <text class="label">驱动类型</text>
                </view>
                <view class="grid-item">
                    <text class="text">{{ getSeatName(orderInfo.carDetailInfo.seats) }}</text>
                    <text class="label">座位数</text>
                </view>
            </view>
        </uni-card>
        <view class="dealer-title">
            <text class="dealer-text">| 订单信息</text>
        </view>
        <uni-card :isFull="true" class="form-container">
            <form>
                <!-- 表单内容 -->
                <view class="form-item">
                    <text class="label">订单号</text>
                    <input :value="orderInfo.id" type="text" class="input" disabled="true" />
                </view>
                <view class="form-item">
                    <text class="label">预定时间</text>
                    <input :value="orderInfo.orderTime.substring(0, 10)" type="text" class="input" disabled="true" />
                </view>
                <view class="form-item">
                    <text class="label">体验地点</text>
                    <input :value="orderInfo.dealerInfo.name" type="text" class="input" disabled="true" />
                </view>
                <view class="form-item">
                    <text class="label">经销商地址</text>
                    <input
                        :value="
                            orderInfo.dealerInfo.address.Province +
                            ' ' +
                            orderInfo.dealerInfo.address.City +
                            ' ' +
                            orderInfo.dealerInfo.address.District +
                            ' ' +
                            orderInfo.dealerInfo.address.Detail
                        "
                        type="text"
                        class="input"
                        disabled="true"
                    />
                </view>
                <view class="form-item">
                    <text class="label">联系电话</text>
                    <input :value="orderInfo.dealerInfo.phone" type="text" class="input" disabled="true" />
                </view>
                <view class="form-item">
                    <text class="label">您的地址</text>
                    <input
                        :value="orderInfo.address.province + ' ' + orderInfo.address.city + ' ' + orderInfo.address.district + ' ' + orderInfo.address.detail"
                        type="text"
                        class="input"
                        placeholder="请填写联系电话"
                        disabled="true"
                    />
                </view>
                <view class="form-item">
                    <text class="label">创建时间</text>
                    <input :value="orderInfo.createTime" type="text" class="input" disabled="true" />
                </view>
            </form>
        </uni-card>
        <view class="dealer-title">
            <text class="dealer-text">| 订单状态</text>
        </view>
        <uni-card :isFull="true" class="form-container">
            <view v-if="orderInfo.status == 0" class="steps-container">
                <uni-icons type="closeempty" size="24" class="icon"></uni-icons>
                <view class="status">订单取消</view>
            </view>
            <uni-steps v-else direction="column" :options="statusList" :active="orderInfo.status - 1" active-color="#47dfff" s />
        </uni-card>
        <view class="bottom">
            <text class="buttom-text">———— 已经到底了 ————</text>
        </view>
    </view>
</template>

<style lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100vh;
    padding: 20rpx;

    .name-container {
        display: flex;
        flex-direction: column;

        .car-name {
            font-size: 48rpx;
            font-weight: bold;
        }

        .car-model {
            font-size: 24rpx;
            color: #808080;
        }
    }
    .image-box {
        width: 100%;
        height: 450rpx;
        margin-top: 30rpx; // 图片与文字之间的间距，根据需要调整
        align-self: center; // 图片居中显示
        margin-left: 20rpx;
        margin-right: 20rpx;
        .image {
            width: 100%;
            height: 450rpx;
        }
    }

    .price-container {
        width: 100%;
        margin-top: 20rpx; // uni-card 与图片的间距

        .price-container text {
            display: block;
        }
        .zhidao-price {
            font-size: 24rpx; // 指导价字体大小
            margin-left: 20rpx;
            color: #808080;
        }
        .luodi-price {
            display: flex;
            margin-top: 10rpx;
            font-size: 32rpx; // 落地价字体大小
            color: #cf4444; // 落地价文字颜色为红色
        }
    }

    .grid {
        display: flex;
        flex-wrap: wrap;
        margin-top: 40rpx; // 与价格容器的间距
        .grid-item {
            width: 25%; // 每个 grid-item 宽度占一半
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-bottom: 20rpx; // 调整 grid-item 之间的垂直间距
        }

        .text {
            font-size: 32rpx;
            margin-bottom: 20rpx; // 调整 text 和 label 之间的垂直间距
        }

        .label {
            font-size: 24rpx;
            color: #808080; // 设置 label 的文字颜色为灰色
        }
    }

    .dealer-title {
        display: flex;
        margin-top: 20rpx;

        .dealer-text {
            font-size: 32rpx;
            font-weight: bold;
            margin-left: 5rpx;
        }
    }

    .dealer-container {
        width: 100%;
        margin-top: 20rpx; // uni-card 与图片的间距
        .dealer-name {
            font-size: 32rpx;
            font-weight: bold;
        }

        .box {
            display: flex;
            margin-top: 10rpx;
            .dealer-distance {
                width: 100rpx;
                font-size: 24rpx;
                color: #808080;
            }
            .dealer-address {
                margin-left: 20rpx;
                font-size: 24rpx;
                color: #808080;
            }
        }
        .dealer-desc-info {
            font-size: 24rpx;
            color: #808080;
        }
        .box2 {
            display: flex;
            margin-top: 30rpx;

            .avatar-box {
                display: flex;
                .avatar {
                    width: 90rpx;
                    height: 90rpx;
                    border-radius: 50%;
                }
                .detail {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10rpx;

                    .dealer-phone {
                        font-size: 24rpx;
                    }

                    .dealer-order {
                        font-size: 24rpx;
                    }
                }
                .button-box {
                    display: flex;
                    align-items: center; /* 垂直居中 */
                    margin-left: 180rpx; /* 距离父元素右边边框的距离 */

                    .button {
                        width: 180rpx;
                        height: 80rpx;
                        font-size: 24rpx;
                        display: flex;
                        justify-content: center; /* 水平居中 */
                        align-items: center; /* 垂直居中 */
                        color: #fff;
                        background-color: #47dfff;
                        border-radius: 80rpx;
                    }
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
    .form-container {
        width: 100%;
        margin-top: 20rpx; // uni-card 与图片的间距

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

            .picker-input {
                flex: 1;
                height: 46rpx;
                width: 100rpx;
                display: flex;

                .address-text {
                    white-space: nowrap;
                    overflow-x: scroll;
                    display: flex; /* 使得元素宽度根据内容自动调整 */
                    max-width: 85%; /* 防止元素宽度超过父元素 */
                }
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
}
</style>
