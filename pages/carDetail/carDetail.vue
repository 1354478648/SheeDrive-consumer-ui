<script setup>
import { ref } from 'vue';
import { cardetailGetByIdService } from '@/api/cardetail.js';
import { onLoad } from '@dcloudio/uni-app';
import { formatPrice, calculateDistance } from '@/utils/common.js';
import { stockGetByCarIdService } from '@/api/stock.js';

const id = ref('');
onLoad((options) => {
    id.value = options.id;
    cardetailGetById();
    stockGetList();
});

const cardetailData = ref();
const cardetailGetById = async () => {
    let result = await cardetailGetByIdService(id.value);
    cardetailData.value = result.data.car_detail;
};

const dealerData = ref([]);
const stockGetList = async () => {
    let result = await stockGetByCarIdService(id.value);
    dealerData.value = result.data.List;
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

const longitude = ref(0); // 经度
const latitude = ref(0); // 纬度
// 获取当前位置
const getLocation = () => {
    uni.getLocation({
        type: 'wgs84', // GPS坐标
        success: (res) => {
            longitude.value = res.longitude;
            latitude.value = res.latitude;
        },
        fail: (error) => {
            console.error('获取位置失败', error);
        }
    });
};
getLocation();

const getDistance = (lnglat) => {
    const [targetLongitude, targetLatitude] = lnglat.split(',').map(Number);
    const distance = calculateDistance(longitude.value, latitude.value, targetLongitude, targetLatitude);
    return distance.toFixed(2);
};
</script>

<template>
    <view class="container">
        <view class="name-container">
            <text class="car-name">{{ cardetailData.brand + ' ' + cardetailData.model }}</text>
            <text class="car-model">{{ cardetailData.version }}</text>
        </view>
        <view class="image-box">
            <image class="image" :src="cardetailData.image"></image>
        </view>
        <uni-card :isFull="true" class="price-container">
            <view style="margin-top: 20rpx">
                <text style="font-size: 48rpx; font-weight: bold">新车</text>
                <text class="zhidao-price">{{ '官方指导价: ' + formatPrice(cardetailData.price) }}</text>
            </view>

            <text class="luodi-price">{{ '预估落地价: ' + formatPrice(cardetailData.price * 0.9) }}</text>
            <view class="grid">
                <view class="grid-item">
                    <text class="text">{{ cardetailData.year }}</text>
                    <text class="label">年份</text>
                </view>
                <view class="grid-item">
                    <text class="text">{{ getCategoryName(cardetailData.category) }}</text>
                    <text class="label">分类</text>
                </view>
                <view class="grid-item">
                    <text class="text">{{ getTypeName(cardetailData.type) }}</text>
                    <text class="label">驱动类型</text>
                </view>
                <view class="grid-item">
                    <text class="text">{{ getSeatName(cardetailData.seats) }}</text>
                    <text class="label">座位数</text>
                </view>
            </view>
        </uni-card>
        <view class="dealer-title">
            <text class="dealer-text">| 经销商</text>
        </view>
        <uni-card v-for="item in dealerData" :key="item.id" :isFull="true" class="dealer-container">
            <text class="dealer-name">{{ item.dealerInfo.name }}</text>
            <view class="box">
                <text class="dealer-distance">{{ getDistance(item.dealerInfo.address.LngLat) ? getDistance(item.dealerInfo.address.LngLat) + ' km' : '未获得定位权限' }}</text>
                <text class="dealer-address">
                    {{ item.dealerInfo.address.Province + ' ' + item.dealerInfo.address.City + ' ' + item.dealerInfo.address.District + ' ' + item.dealerInfo.address.Detail }}
                </text>
            </view>
            <text class="dealer-desc-info">{{ item.dealerInfo.describeInfo }}</text>
            <view class="box2">
                <view class="avatar-box">
                    <image class="avatar" :src="item.dealerInfo.avatar"></image>
                    <view class="detail">
                        <text class="dealer-phone">{{ item.dealerInfo.phone }}</text>
                        <text class="dealer-order">已服务 666 人</text>
                    </view>
                    <view class="button-box">
                        <button class="button">立即预约</button>
                    </view>
                </view>
            </view>
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
}
</style>
