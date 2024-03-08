<script setup>
import { ref } from 'vue';
import { car } from './car.js';

const onClick = (e) => {
    uni.navigateTo({
        url: `/pages/carList/carList?size=50&name=${e.item.name}`
    });
};
</script>

<template>
    <view class="viewport">
        <!-- 分类 -->
        <view class="categories">
            <uni-indexed-list :options="car" @click="onClick" />
        </view>
    </view>
</template>

<style lang="scss">
page {
    height: 100%;
    overflow: hidden;
}
.viewport {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.search {
    padding: 0 30rpx 20rpx;
    background-color: #fff;
    .input {
        display: flex;
        align-items: center;
        // justify-content: space-between;
        height: 64rpx;
        padding-left: 26rpx;
        color: #8b8b8b;
        font-size: 28rpx;
        border-radius: 32rpx;
        background-color: #f3f4f4;
    }
}

/* 分类 */
.categories {
    flex: 1;
    min-height: 400rpx;
    display: flex;
}
/* 一级分类 */
.primary {
    overflow: hidden;
    width: 180rpx;
    flex: none;
    background-color: #f6f6f6;
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 96rpx;
        font-size: 26rpx;
        color: #595c63;
        position: relative;
        &::after {
            content: '';
            position: absolute;
            left: 42rpx;
            bottom: 0;
            width: 96rpx;
            border-top: 1rpx solid #e3e4e7;
        }
    }
    .active {
        background-color: #fff;
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 8rpx;
            height: 100%;
            background-color: #27ba9b;
        }
    }
}
.primary .item:last-child::after,
.primary .active::after {
    display: none;
}
/* 二级分类 */
.secondary {
    background-color: #fff;
    .carousel {
        height: 200rpx;
        margin: 0 30rpx 20rpx;
        border-radius: 4rpx;
        overflow: hidden;
    }
    .panel {
        margin: 0 30rpx 0rpx;
    }
    .title {
        height: 60rpx;
        line-height: 60rpx;
        color: #333;
        font-size: 28rpx;
        border-bottom: 1rpx solid #f7f7f8;
    }
    .section {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 20rpx 0;
        .goods {
            width: 150rpx;
            margin: 0rpx 30rpx 20rpx 0;
            &:nth-child(3n) {
                margin-right: 0;
            }
            image {
                width: 150rpx;
                height: 150rpx;
            }
            .name {
                padding: 5rpx;
                font-size: 22rpx;
                color: #333;
            }
            .price {
                padding: 5rpx;
                font-size: 18rpx;
                color: #cf4444;
            }
            .number {
                font-size: 24rpx;
                margin-left: 2rpx;
            }
        }
    }
}
</style>
