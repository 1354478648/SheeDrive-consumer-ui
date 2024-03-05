// 定义store
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token',
	() => {
		const token = ref('')

		const setToken = (newToken) => {
			token.value = newToken
		}

		const removeToken = () => {
			token.value = ''
		}

		// 返回值
		return {
			token,
			setToken,
			removeToken
		}
	}, {
		// 配置持久化
		persist: {
			// 设置兼容多端的API
			storage: {
				setItem(key, value) {
					uni.setStorageSync(key, value)
				},
				getItem(key) {
					return uni.getStorageSync(key)
				}
			}
		}
	},
)