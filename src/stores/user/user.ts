import { UserProfile, UserState } from "@/types/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: (): UserState => {
        return {
            token: null,
            userProfile: null
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
        },
        // 保存用户信息
        setUserProfile(userProfile: UserProfile) {
            this.userProfile = userProfile;
        },
        // 清空用户信息
        clearUserProfile() {
            this.userProfile = null;
        },
        // 获取用户信息
        getUserProfile() {
            return this.userProfile;
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