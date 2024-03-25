<script setup>
import { getSwiperService } from '@/api/mobile.js';
import { ref } from 'vue';
import { useInfoStore } from '@/stores/modules/info.js';

const swiperList = ref([]);
const getSwiperList = async () => {
    const result = await getSwiperService();
    swiperList.value = result.data.swiperInfoList;
};
getSwiperList();

const activeIndex = ref(0);

// 当 swiper 下标发生变化时触发
const onChange = (ev) => {
    activeIndex.value = ev.detail.current;
};

const naviToYuYue = () => {
    const infoStore = useInfoStore();
    if (infoStore.info == null) {
        uni.navigateTo({
            url: '/pages/login/login'
        });
    } else {
        uni.navigateTo({
            url: '/pages/category/category'
        });
    }
};

</script>

<template>
    <view class="view-port">
        <view class="swiper-container">
            <view class="carousel">
                <swiper class="swiper" current="0" :circular="true" :autoplay="false" :interval="3000" @change="onChange">
                    <swiper-item v-for="item in swiperList" :key="item.id">
                        <image mode="aspectFill" class="image" :src="item.imageUrl"></image>
                    </swiper-item>
                </swiper>
                <!-- 指示点 -->
                <view class="indicator">
                    <text v-for="(item, index) in swiperList" :key="item" class="dot" :class="{ active: index === activeIndex }"></text>
                </view>
            </view>
            <text class="title">汽 车 试 驾 系 统</text>
            <text class="descide-info">{{ swiperList[activeIndex].describeInfo }}</text>
            <button class="book-btn" @click="naviToYuYue">预约试驾</button>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.view-port {
    position: relative;
    height: 100vh; /* 设置视口高度为屏幕高度 */
    overflow: hidden; /* 隐藏超出部分 */

    .swiper-container {
        position: relative;
        height: 100%; /* 使轮播图容器占满视口高度 */
    }

    .carousel {
        height: 100%; /* 使轮播图占满轮播图容器 */
        position: relative;
        .swiper {
            height: 100%; /* 使 swiper 元素占满轮播图 */

            .image {
                width: 100%;
                height: 100%;
            }
        }
        .indicator {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 16rpx;
            display: flex;
            justify-content: center;

            .dot {
                width: 30rpx;
                height: 6rpx;
                margin: 0 8rpx;
                border-radius: 6rpx;
                background-color: rgba(255, 255, 255, 0.4);
            }

            .active {
                background-color: #fff;
            }
        }
    }
    .title {
        position: absolute;
        top: 200rpx; /* 调整标题位置 */
        left: 50%;
        transform: translateX(-50%);
        font-size: 42rpx;
        color: #ffffff;
        text-align: center; /* 居中文字 */
        font-family: SimHei;
        font-weight: lighter;
    }

    .descide-info {
        position: absolute;
        top: 400rpx;
        left: 50%;
        width: 90%; /* 设置标题宽度 */
        max-width: 800rpx; /* 设置最大宽度，避免在较大屏幕上过宽 */
        transform: translateX(-50%);
        font-size: 40rpx;
        color: #ffffff;
        display: flex; /* 使用 Flex 布局 */
        justify-content: center; /* 水平居中 */
        font-weight: lighter;
    }

    .book-btn {
        position: absolute;
        bottom: 10vw; /* 调整按钮位置 */
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        width: 600rpx; /* 设置按钮宽度 */
        height: 100rpx; /* 设置按钮高度 */
        border: 2px solid #ffffff; /* 设置边框样式 */
        background-color: transparent; /* 设置背景透明 */
        font-size: 32rpx;
        color: #ffffff;
        text-align: center;
        display: flex; /* 使用 Flex 布局 */
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        cursor: pointer;
        font-weight: lighter;
    }
}
</style>
