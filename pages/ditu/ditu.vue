<script setup>
import CustomNavbar from '@/pages/components/CustomNavbar.vue';
import { ref, onMounted } from 'vue';
import { dealerGetListService } from '@/api/dealer.js';

const longitude = ref(0); // 经度
const latitude = ref(0); // 纬度
// 先初始化当前位置的mark
const markers = ref([
    {
        id: 0,
        longitude: 0,
        latitude: 0,
        callout: {
            content: '当前位置',
            color: '#000000',
            fontSize: 12,
            borderRadius: 10,
            padding: 8,
            display: 'ALWAYS'
        }
    }
]);

// 获取当前位置
const getLocation = () => {
    uni.getLocation({
        type: 'wgs84', // GPS坐标
        success: (res) => {
            console.log('当前位置的经度：' + res.longitude);
            console.log('当前位置的纬度：' + res.latitude);
            longitude.value = res.longitude;
            latitude.value = res.latitude;
            markers.value[0].longitude = res.longitude;
            markers.value[0].latitude = res.latitude;
        },
        fail: (error) => {
            console.error('获取位置失败', error);
        }
    });
};
getLocation();

const getDealerLocation = async () => {
    let result = await dealerGetListService();

    result.data.List.forEach((item) => {
        const lngLatArr = item.address.LngLat.split(',');
        markers.value.push({
            id: item.id,
            longitude: parseFloat(lngLatArr[0]),
            latitude: parseFloat(lngLatArr[1]),
            callout: {
                content: item.name,
                color: '#000000',
                fontSize: 12,
                borderRadius: 10,
                padding: 8,
                display: 'ALWAYS'
            }
        });
    });
};
getDealerLocation();
</script>

<template>
    <view>
        <CustomNavbar />
        <view class="view-port">
            <map :longitude="longitude" :latitude="latitude" :markers="markers" class="map" show-compass enable-rotate="true" enable-overlooking="true"></map>
        </view>
    </view>
</template>

<style lang="scss">
.view-port {
    position: relative;
    width: 100%;
    height: 100vh; /* 设置视口高度为屏幕高度 */
    overflow: hidden; /* 隐藏超出部分 */

    .map {
        position: relative;
        width: 100%;
        height: 100%; /* 使轮播图容器占满视口高度 */
    }
}
</style>
