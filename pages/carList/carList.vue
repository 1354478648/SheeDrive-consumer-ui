<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { cardetailGetListService } from '@/api/cardetail.js';

const cardetailListData = ref([]);

// 是否有该品牌汽车的数据
const isNull = ref(false);

// 获取品牌
const brand = ref('');
onLoad((options) => {
    brand.value = options.name;
    getCarDetailList();
});

const getCarDetailList = async () => {
    let result = await cardetailGetListService(brand.value);

    // 判断有无该品牌汽车数据
    if (result.data.List == null) {
        isNull.value = true;
        return;
    }

    cardetailListData.value = result.data.List;
};
</script>

<template>
    <uni-card
        v-for="item in cardetailListData"
        :key="item.id"
        :title="item.brand + ' ' + item.model"
        :sub-title="item.version"
        :extra="'官方指导价:￥' + item.price"
        @click="onClick"
        padding="10px 0"
        v-if="!isNull"
    >
        <!--        <template v-slot:title>
            <uni-list><uni-list-item :title="item.brand + ' ' + item.model" /></uni-list>
        </template> -->
        <image style="width: 100%; height: 450rpx" :src="item.image"></image>
        <text>
            {{ item.describeInfo }}
        </text>
    </uni-card>
    <view v-if="isNull" class="no-data">
        <uni-icons type="info" size="32" class="icon"></uni-icons>
        <text class="text1">没有该品牌下的汽车数据呢 ~</text>
        <text class="text2">等待经销商上架的时候，不如看看其他汽车吧</text>
    </view>
</template>

<style lang="scss">
.no-data {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    .icon {
        display: flex;
        justify-content: center;
    }

    .text1 {
        display: flex;
        justify-content: center;
        font-size: 32rpx;
        margin-top: 20rpx;
    }
    .text2 {
        display: flex;
        justify-content: center;
        font-size: 32rpx;
        margin-top: 20rpx;
    }
}
</style>
