import {
	useInfoStore
} from "@/stores/modules/info.js"
import {
	useTokenStore
} from "@/stores/modules/token.js"

// 请求基地址
const baseURL = 'http://192.168.35.243:8000' // 真机调试IP地址
// const baseURL = 'http://localhost:8000'

// 拦截器配置
const httpInterceptor = {
	// 拦截前触发
	invoke(options) {
		// 1. 非 http 开头需拼接地址
		if (!options.url.startsWith('http')) {
			options.url = baseURL + options.url
		}
		// 2. 请求超时
		options.timeout = 10000
		// 3. 添加小程序端请求头标识
		options.header = {
			'source-client': 'miniapp',
			...options.header,
		}
		// 4. 添加 token 请求头标识
		const tokenStore = useTokenStore()
		if (tokenStore.token) {
			options.header.Authorization = tokenStore.token
		}
	},
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

export const http = (options) => {
	// 1. 返回 Promise 对象
	return new Promise((resolve, reject) => {
		uni.request({
			...options,
			// 响应成功
			success(result) {
				// 判断业务状态码
				if (result.data.code === 0) {
					resolve(result.data)
				} else if (result.data.code === 403) {
					// 403错误
					const infoStore = useInfoStore()
					infoStore.removeInfo()
					console.log("403错误")
					reject(result.data.message)
				} else {
					// 其他错误 -> 根据后端错误信息轻提示
					uni.showToast({
						icon: 'none',
						title: result.data.message ? result.data.message : '请求错误',
					})
					reject(result.data.message)
				}
			},
			// 响应失败
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: '网络错误，换个网络试试',
				})
				reject(err)
			},
		})
	})
}