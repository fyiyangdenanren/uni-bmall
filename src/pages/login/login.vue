<script setup lang='ts'>
import { ref } from 'vue'
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
        // 5.跳转首页
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/my/my'
          })
        }, 1000)
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

const phone = ref('')
const clearPhone = () => {
  phone.value = ''
}
const getCode = () => {
  // 1.获取手机号码
  const p = phone.value
  // 2.验证手机号码
  if (!p) {
    uni.showToast({
      title: '手机号不能为空',
      icon: 'error'
    })
    return
  }
  // 3.发送手机号码给服务器 用verifyCode接收
  // 4.提示信息
  uni.showToast({
    title: '验证码已发送',
  })
}
const verifyCode = ref('')
const handlePhoneLogin = async () => {
  // 1.获取验证码
  // 2.验证手机号码
  if (!phone.value) {
    uni.showToast({
      title: '手机号不能为空',
      icon: 'error'
    })
    return
  }
  // 3.验证验证码
  if (!verifyCode.value) {
    uni.showToast({
      title: '验证码不能为空',
    })
  }
  // 4.发送手机号码和验证码给服务器

}
</script>

<template>
  <view>
    <!-- 标题区域 -->
    <view class="title">
      <text>手机号码登录</text>
    </view>
    <!-- 输入框区域 -->
    <view class="input">
      <view class="phone">
        <input placeholder="请输入手机号码" v-model="phone" />
        <image src="@/static/login_icons/clear.svg" @click="clearPhone" />
      </view>
      <view class="code">
        <input placeholder="请输入验证码" />
        <text class="goCode" @click="getCode">获取验证码</text>
      </view>
    </view>

    <!-- 按钮区域 -->
    <view class="btn">
      <button type="primary" @click="handlePhoneLogin">登录</button>
    </view>

    <!-- 空白区域 -->
    <view class="blank"></view>

    <!-- 其他登录方式 -->
    <view class="otherWay ">其他登录方式</view>

    <!-- 底部区域 -->
    <view class="footer">
      <view class="wechat" @click="handleLogin">
        <image src="@/static/login_icons/wx.png" />
      </view>
      <view class="qq">
        <image src="@/static/login_icons/qq.png" />
      </view>
    </view>
  </view>
</template>

<style scoped lang='scss'>
.title {
  padding: 120rpx 400rpx 56rpx 60rpx;

  text {
    font-size: 48rpx;
    font-weight: 500;
  }
}

.input {
  height: 220rpx;
  padding: 0 60rpx 0 60rpx;

  .phone,
  .code {
    height: 110rpx;
    border-bottom: 1px solid rgba(240, 240, 240, 1);
  }

  .phone {
    display: flex;
    align-items: center;
    justify-content: space-between;

    image {
      width: 32rpx;
      height: 32rpx;
    }
  }

  .code {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goCode {
      font-size: 12px;
      font-weight: 400;
      color: rgba(204, 200, 200, 1);
    }
  }

}

.btn {
  padding: 50rpx 60rpx;

  button {
    border-radius: 50rpx;
  }
}

.blank {
  height: 360rpx;
}

.otherWay {
  /*其他登录方式*/
  height: 36rpx;
  font-size: 26rpx;
  font-weight: 400;
  line-height: 36rpx;
  text-align: center;
  color: rgba(153, 147, 147, 1);
}

.footer {
  padding-top: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 150rpx;

  image {
    height: 100rpx;
    width: 100rpx;
  }
}
</style>