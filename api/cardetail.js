import {http} from '@/utils/request'

// 获取汽车信息
export const getSwiperService = () => {
	return http({
		method: 'GET',
		url: '/mobile/getSwiper',
	})
}