import {http} from '@/utils/request'

// 获取轮播图
export const getSwiperService = () => {
	return http({
		method: 'GET',
		url: '/mobile/getSwiper',
	})
}