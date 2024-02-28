<script setup>
	import {
		ref
	} from 'vue'

	const activeIndex = ref(0)
	
	const onChange = (ev) => {
	  activeIndex.value = ev.detail.current
	}
</script>

<template>
	<view class="carousel">
		<swiper class="swiper" :circular="true" :autoplay="false" :interval="3000" @change="onChange(ev)">
			<swiper-item>
				<navigator url="/pages/index/index" hover-class="none" class="navigator">
					<image mode="aspectFill" class="image"
						src="https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/lunbo-audi.jpg"></image>
				</navigator>
			</swiper-item>
			<swiper-item>
				<navigator url="/pages/index/index" hover-class="none" class="navigator">
					<image mode="aspectFill" class="image"
						src="https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/lunbo-bmw.jpg"></image>
				</navigator>
			</swiper-item>
			<swiper-item>
				<navigator url="/pages/index/index" hover-class="none" class="navigator">
					<image mode="aspectFill" class="image"
						src="https://sheedrive.oss-cn-shanghai.aliyuncs.com/sys/lunbo-volvo.jpg"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 指示点 -->
		<view class="indicator">
			<text v-for="(item, index) in 3" :key="item" class="dot" :class="{ active: index === activeIndex }"></text>
		</view>
	</view>
</template>

<style lang="scss" scoped>
	/* 轮播图 */
	.carousel {
		height: 100vh;
		display: block;
		position: relative;
		overflow: hidden;
		transform: translateY(0);
		background-color: #efefef;

		.swiper {
			height: 100%;

			.navigator,
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
</style>