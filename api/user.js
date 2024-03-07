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

// 用户修改头像
export const userUpdateAvatarService = (data) =>{
	return http({
		method: 'PUT',
		url: '/user/updateAvatar',
		data
	})
}

// 用户修改密码
export const userUpdatePasswordService = (data) =>{
	return http({
		method: 'PUT',
		url: '/user/updatePasswordByPhone',
		data
	})
}