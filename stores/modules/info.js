import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInfoStore = defineStore('info',
	() => {
		// 用户信息
		const info = ref()

		// 保存用户信息，登录时使用
		const setInfo = (newInfo) => {
			info.value = newInfo
		}

		// 清理用户信息，退出时使用
		const removeInfo = () => {
			info.value = null
		}

		return {
			info,
			setInfo,
			removeInfo,
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