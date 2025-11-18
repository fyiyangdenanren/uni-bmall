<template>
  <view>
    <button type="primary" @click="handleLogin">
      点击登录
    </button>
  </view>
</template>

<script setup lang='ts'>
import { login } from '@/api/login'
import { useUserStore } from '@/stores/user/user'

let code: string = ''

// 微信登录
const handleLogin = async () => {
  uni.login({
    provider: 'weixin',
    success: async (res) => {
      // 1.获取code
      code = res.code
      console.log("res:" + res.code)
      try {
        // 2.发送code给服务器
        const response = await login(code)
        // 3.保存token
        useUserStore().setToken(response.data)
        console.log("token:" + response.data)
        // 4.提示信息
        uni.showToast({
          title: '登录成功',
          icon: 'success'
        })
      } catch (err) {
        console.log("失败原因:" + err)
      }
    },
    fail: (err) => {
      console.log("失败原因:" + err)
      uni.showToast({
        title: '获取登录凭证失败',
        icon: 'error'
      })
    },
  })

}

</script>

<style scoped lang='scss'></style>