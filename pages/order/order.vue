<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { cardetailGetByIdService } from '@/api/cardetail.js';
import { dealerGetDetailService } from '@/api/dealer.js';
import { smsSendCode } from '@/api/sms.js';
import { useInfoStore } from '@/stores/modules/info.js';
import { orderAddService } from '@/api/order.js';
const infoStore = useInfoStore();
import { userAddressGetListService } from '@/api/address.js';

const carId = ref('');
const dealerId = ref('');
onLoad((options) => {
    carId.value = options.carId;
    dealerId.value = options.dealerId;
    cardetailGetById();
    stockGetList();
});

const cardetailData = ref();
const cardetailGetById = async () => {
    let result = await cardetailGetByIdService(carId.value);
    cardetailData.value = result.data.car_detail;
};

const dealerData = ref([]);
const stockGetList = async () => {
    let result = await dealerGetDetailService(dealerId.value);
    dealerData.value = result.data.dealer_info;
};

const userAddressData = ref();
const addrArr = ref([]);
const index = ref(0);
const getUserAddressList = async () => {
    const data = {
        id: infoStore.info.id
    };
    let result = await userAddressGetListService(data);

    userAddressData.value = result.data.addressInfoList;
    addrArr.value = userAddressData.value.map((location) => `${location.province} ${location.city} ${location.district} ${location.detail}`);
};
getUserAddressList();

const orderAddData = ref({
    userId: null,
    dealerId: null,
    carId: null,
    addrId: null,
    orderTime: ''
});

const bindPickerChange = (e) => {
    index.value = e.detail.value;
};

const onChange = (e) => {
    orderAddData.value.orderTime = e;
};

const onOrder = async () => {
    orderAddData.value.userId = infoStore.info.id;
    orderAddData.value.dealerId = dealerId.value;
    orderAddData.value.carId = carId.value;
    orderAddData.value.addrId = userAddressData.value[index.value].id;

    let result = await orderAddService(orderAddData.value);
	let orderId = result.data.orderInfo.id
    uni.redirectTo({
        url: `/pages/orderSuccess/orderSuccess?orderId=${orderId}`
    });
    uni.showToast({
        icon: 'checkmarkempty',
        title: '预约成功！'
    });
};
</script>

<template>
    <view class="container">
        <view class="image-box">
            <image class="image" :src="cardetailData.image"></image>
        </view>
        <uni-card :isFull="true" class="form-container">
            <form>
                <!-- 表单内容 -->
                <view class="form-item">
                    <text class="label">意向车型</text>
                    <input
                        :value="cardetailData.brand + cardetailData.model + ' ' + cardetailData.version"
                        type="text"
                        class="input"
                        placeholder="请选择意向车型"
                        disabled="true"
                    />
                </view>
                <view class="form-item">
                    <text class="label">体验地点</text>
                    <input :value="dealerData.name" type="text" class="input" placeholder="请选择体验地点" disabled="true" />
                </view>
                <view class="form-item">
                    <text class="label">经销商地址</text>
                    <input
                        :value="dealerData.address.Province + ' ' + dealerData.address.City + ' ' + dealerData.address.District + ' ' + dealerData.address.Detail"
                        type="text"
                        class="input"
                        placeholder="请选择体验地点"
                        disabled="true"
                    />
                </view>
                <view class="form-item">
                    <text class="label">联系电话</text>
                    <input :value="infoStore.info.phone" type="text" class="input" placeholder="请填写联系电话" disabled="true" />
                </view>
                <view class="form-item">
                    <text class="label">
                        <text style="color: red">*</text>
                        您的地址
                    </text>
                    <picker @change="bindPickerChange" :value="index" :range="addrArr" class="picker-input">
                        <view class="address-text">{{ addrArr[index] }}</view>
                    </picker>
                </view>
                <view class="form-item">
                    <text class="label">
                        <text style="color: red">*</text>
                        预约时间
                    </text>
                    <uni-datetime-picker @change="onChange" type="date" :start="new Date()" return-type="string" clear-icon :border="false" />
                </view>
            </form>
            <button class="button" @click="onOrder">预约试驾</button>
        </uni-card>
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

    .image-box {
        width: 100%;
        height: 450rpx;
        align-self: center; // 图片居中显示
        margin-left: 20rpx;
        margin-right: 20rpx;
        .image {
            width: 100%;
            height: 450rpx;
        }
    }

    .form-container {
        width: 100%;
        margin-top: 20rpx; // uni-card 与图片的间距

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

    .button {
        height: 80rpx;
        margin: 30rpx 20rpx;
        color: #fff;
        border-radius: 80rpx;
        font-size: 30rpx;
        background-color: #47dfff;
    }
}
</style>
