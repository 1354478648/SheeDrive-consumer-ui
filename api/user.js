import {
	http
} from '@/utils/request'

// 用户注册
export const userRegisterService = (data) => {
	return http({
		method: 'POST',
		url: '/user/register',
		data
	})
}

// 用户手机号密码登录
export const userLoginService = (data) => {
	return http({
		method: 'POST',
		url: '/user/login',
		data
	})
}

// 用户验证码登录
export const userLoginByPhoneService = (data) => {
	return http({
		method: 'POST',
		url: '/user/loginByPhone',
		data
	})
}