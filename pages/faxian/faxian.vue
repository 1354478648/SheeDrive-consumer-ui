<script setup>
	import CustomNavbar from './components/CustomNavbar.vue'
	import CustomSwiper from './components/CustomSwiper.vue'
</script>

<template>
	<view>
		<!-- 自定义导航栏 -->
		<!-- <CustomNavbar /> -->
		<!-- 可滚动容器 -->
		<scroll-view enable-back-to-top refresher-enabled class="scroll-view" scroll-y>
			<!-- <PageSkeleton v-if="isLoading" /> -->
			<template>
				<!-- 自定义轮播图 -->
				<CustomSwiper :list="bannerList" />
			</template>
		</scroll-view>
	</view>
</template>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		height: 100%;
		overflow: hidden;
	}

	.viewport {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.scroll-view {
		flex: 1;
		overflow: hidden;
	}
</style>