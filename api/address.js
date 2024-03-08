import {
	http
} from '@/utils/request'

// 用户地址列表查询
export const userAddressGetListService = (data) => {
	return http({
		method: 'GET',
		url: '/address/user/list',
		data
	})
}

// 用户地址添加
export const userAddressAddService = (data)=>{
	return http({
		method: 'POST',
		url: '/address/user/add',
		data
	})
}

// 用户地址通过Id查询
export const userAddressGetByIdService = (id)=>{
	return http({
		method: 'GET',
		url: `/address/user/detail?id=${id}`,
	})
}

// 用户地址修改
export const userAddressUpdateService = (data)=>{
	return http({
		method: 'PUT',
		url: `/address/user/update`,
		data
	})
}

// 用户地址删除
export const userAddressDeleteService = (id)=>{
	return http({
		method: 'DELETE',
		url: `/address/user/delete?id=${id}`,
	})
}