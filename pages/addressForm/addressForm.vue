<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useTokenStore } from '@/stores/modules/token.js';
const tokenStore = useTokenStore();
import { useInfoStore } from '@/stores/modules/info.js';
const infoStore = useInfoStore();
import { pcaTextArr } from './pca.js';
import { userAddressAddService, userAddressGetByIdService, userAddressUpdateService } from '@/api/address.js';

// 省市区下拉框数据模型(仅负责渲染)
const ssqArr = ref();

// 获取id
const id = ref('');
const isAdd = ref(false);
onLoad((options) => {
    id.value = options.id;
    // 判断id是否为空，如果是，则表示新建地址
    if (id.value == '' || id.value == null || id.value == undefined) {
        isAdd.value = true;
    } else {
        userAddressGetById(id.value);
    }
});

// 用户地址添加修改对象
// 注意：属性id在添加修改时代表不同意思，添加时id表示用户id，修改时表id表示要修改的地址id
const userAddressAddUpdateData = ref({
    id: '',
    province: '',
    city: '',
    district: '',
    detail_address: ''
});

const userAddressGetById = async (id) => {
    let result = await userAddressGetByIdService(id);

    //数据回显
    userAddressAddUpdateData.value.province = result.data.addressInfo.province;
    userAddressAddUpdateData.value.city = result.data.addressInfo.city;
    userAddressAddUpdateData.value.district = result.data.addressInfo.district;
    userAddressAddUpdateData.value.detail_address = result.data.addressInfo.detail;

    ssqArr.value = [result.data.addressInfo.province, result.data.addressInfo.city, result.data.addressInfo.district];
};

const onchange = (e) => {
    userAddressAddUpdateData.value.province = e.detail.value[0].text;
    userAddressAddUpdateData.value.city = e.detail.value[1].text;
    userAddressAddUpdateData.value.district = e.detail.value[2].text;
};

const onAdd = async () => {
    userAddressAddUpdateData.value.id = infoStore.info.id;

    let result = await userAddressAddService(userAddressAddUpdateData.value);
    if (result.data.id !== '') {
        uni.redirectTo({
            url: '/pages/address/address'
        });
        uni.showToast({
            icon: 'checkmarkempty',
            title: '成功添加地址'
        });
    }
};

const onUpdate = async () => {
    userAddressAddUpdateData.value.id = id.value;

    let result = await userAddressUpdateService(userAddressAddUpdateData.value);
    uni.redirectTo({
        url: '/pages/address/address'
    });
    uni.showToast({
        icon: 'checkmarkempty',
        title: '成功修改地址'
    });
};
</script>

<template>
    <view class="content">
        <form>
            <!-- 表单内容 -->
            <view class="form-item">
                <text class="label">省市区(县)</text>
                <uni-data-picker
                    :localdata="pcaTextArr"
                    v-model="ssqArr"
                    placeholder="请选择省/市/区(县)"
                    popup-title="请选择省/市/区(县)"
                    @change="onchange"
                    class="data-picker"
                ></uni-data-picker>
            </view>
            <view class="form-item">
                <text class="label">详细地址</text>
                <input type="text" v-model="userAddressAddUpdateData.detail_address" class="input" placeholder="请填写详细地址" />
            </view>
        </form>
    </view>
    <!-- 提交按钮 -->
    <button class="button" v-if="isAdd" @click="onAdd">确认添加</button>
    <button class="button" v-if="!isAdd" @click="onUpdate">确认修改</button>
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

        .code-button {
            height: 80rpx;
            // margin: 30rpx 20rpx;
            color: #fff;
            // border-radius: 80rpx;
            font-size: 30rpx;
            background-color: #47dfff;
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
