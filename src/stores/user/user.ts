import { UserState } from "@/types/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: (): UserState => {
        return {
            token: null,
        }
    },
    actions: {
        // 设置token
        setToken(token: string) {
            this.token = token;
        },
        // 清空token
        clearToken() {
            this.token = null;
        }
    },
    // 配置持久化
    persist: {
        // 调整为兼容多端的API
        storage: {
            setItem(key, value) {
                uni.setStorageSync(key, value)
            },
            getItem(key) {
                return uni.getStorageSync(key)
            }
        }
    }
});