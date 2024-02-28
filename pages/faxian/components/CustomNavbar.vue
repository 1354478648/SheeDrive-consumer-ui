<script setup>
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
	<view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
		<!-- logo文字 -->
		<view class="logo">
			<image class="logo-image" src="@/static/SheeDrive_title.png"></image>
			<text class="logo-text">驾驭未来，畅享自由！</text>
		</view>
		<!-- 搜索条 -->
		<view class="search">
			<uni-icons type="search" size="15" color="white"></uni-icons>
			<text style="margin-left: 10rpx;">搜索车辆</text>
		</view>
	</view>
</template>

<style lang="scss">
	/* 自定义导航条 */
	.navbar {
		background-image: url(https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/navigator_bg.png);
		background-size: cover;
		position: relative;
		display: flex;
		flex-direction: column;
		padding-top: 20px;

		.logo {
			display: flex;
			align-items: center;
			height: 64rpx;
			padding-left: 30rpx;
			padding-top: 20rpx;

			.logo-image {
				width: 200rpx;
				height: 50rpx;
			}

			.logo-text {
				flex: 1;
				line-height: 28rpx;
				color: #fff;
				margin: 2rpx 0 0 20rpx;
				padding-left: 20rpx;
				border-left: 1rpx solid #fff;
				font-size: 26rpx;
			}
		}

		.search {
			display: flex;
			align-items: center;
			padding: 0 10rpx 0 26rpx;
			height: 64rpx;
			margin: 16rpx 20rpx;
			color: #fff;
			font-size: 28rpx;
			border-radius: 32rpx;
			background-color: rgba(255, 255, 255, 0.5);
		}
	}
</style>