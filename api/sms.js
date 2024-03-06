import {
	http
} from '@/utils/request'

// 发送验证码
export const smsSendCode = (data) => {
	return http({
		method: 'POST',
		url: '/sms/send',
		data
	})
}