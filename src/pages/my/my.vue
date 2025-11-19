<script setup lang='ts'>
import { saveUserProfile } from '@/api/my';
import { useUserStore } from '@/stores/user/user';
import { DecryptDTO } from '@/types/my';
import { UserProfile } from '@/types/user';
import { onMounted } from 'vue';
const userStore = useUserStore()
const userProfile = userStore.getUserProfile() as UserProfile
const handleUserProfile = async () => {
  uni.getUserProfile({
    desc: '用于完善个人资料',
    success: async (res) => {
      // 1.缓存用户信息
      userStore.setUserProfile(res.userInfo as unknown as UserProfile);
      // 2.封装响应体
      const decrypt: DecryptDTO = {
        rawData: res.rawData,
        signature: res.signature,
        iv: res.iv,
        encryptedData: res.encryptedData
      }
      try {
        // 3.保存用户信息
        await saveUserProfile(decrypt);
      } catch (error) {
        console.error("保存用户信息失败:", error)
      }
    },
  })
}

onMounted(() => {
  handleUserProfile()
})
</script>


<template>
  <view>
    <!-- 用户信息区域 -->
    <view class="user-profile">
      <!-- 头像区域 -->
      <view class="avatar">
        <image :src="userProfile.avatarUrl"></image>
        <view class="text">
          <text class="nickname" v-if="userProfile.nickName">{{ userProfile.nickName }}</text>
          <text v-else class="prompt-text" @click="handleUserProfile">
            点击完善个人信息
          </text>
          <text class="say">时间不等人啊，少年</text>
        </view>
      </view>
      <!-- 互动区域 -->
      <view class="interaction">
        <view class="like">
          <text class="num">0</text>
          <text class="str">获赞</text>
        </view>
        <view class="dySum">
          <text class="num">0</text>
          <text class="str">累计动态</text>
        </view>
        <view class="friend">
          <text class="num">0</text>
          <text class="str">书友</text>
        </view>
      </view>
    </view>

    <!-- 分隔条区域 -->
    <view class="divider"></view>

    <!-- 功能列表区域 -->
    <view class="fnList">
      <!-- 动态 -->
      <view class="dynamic">
        <view class="noUse">
          <image class="icon" src="@/static/my_icons/dynamic.png"></image>
          <text class="title">动态</text>
        </view>
        <uni-icons type="right" size="16" color="#999999"></uni-icons>
      </view>
      <!-- 笔记 -->
      <view class="note">
        <view class="noUse">
          <image class="icon" src="@/static/my_icons/note.png"></image>
          <text class="title">笔记</text>
        </view>
        <uni-icons type="right" size="16" color="#999999"></uni-icons>
      </view>
      <!-- 收藏 -->
      <view class="coll">
        <view class="noUse">
          <image class="icon" src="@/static/my_icons/coll.png"></image>
          <text class="title">收藏</text>
        </view>
        <uni-icons type="right" size="16" color="#999999"></uni-icons>
      </view>
      <!-- 分隔条区域 -->
      <view class="divider"></view>
      <!-- 消息 -->
      <view class="msg">
        <view class="noUse">
          <image class="icon" src="@/static/my_icons/msg.png"></image>
          <text class="title">消息</text>
        </view>
        <uni-icons type="right" size="16" color="#999999"></uni-icons>
      </view>
      <!-- 历史 -->
      <view class="history">
        <view class="noUse">
          <image class="icon" src="@/static/my_icons/history.png"></image>
          <text class="title">历史</text>
        </view>
        <uni-icons type="right" size="16" color="#999999"></uni-icons>
      </view>
      <!-- 分隔条区域 -->
      <view class="divider"></view>
      <!-- 设置 -->
      <view class="setting">
        <view class="noUse">
          <image class="icon" src="@/static/my_icons/setting.png"></image>
          <text class="title">设置</text>
        </view>
        <uni-icons type="right" size="16" color="#999999"></uni-icons>
      </view>
    </view>
  </view>
</template>

<style scoped lang='scss'>
/* 用户信息区域 */
.user-profile {
  width: 100%;
  height: 408rpx;
  background-color: #ffffff;

  .avatar {
    display: flex;
    align-items: center;
    padding: 80rpx 0 60rpx 40rpx;

    image {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      margin-right: 40rpx;
    }

    .text {
      height: 140rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .nickname,
      .say {
        display: block;
      }

      .nickname {
        font-size: 32rpx;
        font-weight: 500;
        line-height: 46rpx;
        color: rgba(51, 51, 51, 1);
      }

      .say {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: rgba(102, 102, 102, 1);
      }
    }
  }

  .interaction {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .like,
    .dySum,
    .friend {
      display: flex;
      flex-direction: column;
    }

    .num,
    .str {
      text-align: center;
      font-size: 32rpx;
    }

    .num {
      line-height: 36rpx;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 2rpx;
    }

    .str {
      line-height: 46rpx;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}

/* 分隔条 */
.divider {
  width: 100%;
  height: 20rpx;
  background-color: #f9f9f9;
}

/* 功能列表区域 */
.fnList {
  width: 100%;

  .dynamic,
  .note,
  .coll,
  .msg,
  .history,
  .setting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 88rpx;
    padding: 0 40rpx;
    width: 100%;
    height: 88rpx;
    // border-bottom: 1px solid rgba(229, 229, 229, 1);

    .noUse {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);

      .icon {
        margin-right: 40rpx;
      }
    }

  }

  .dynamic {
    image {
      width: 40rpx;
      height: 40rpx;
    }
  }

  .note {
    image {
      width: 32rpx;
      height: 40rpx;
    }
  }

  .coll {
    image {
      width: 40rpx;
      height: 44rpx;
    }
  }

  .msg {
    image {
      width: 40rpx;
      height: 42rpx;
    }
  }

  .history {
    image {
      width: 38rpx;
      height: 38rpx;
    }
  }

  .setting {
    image {
      width: 40rpx;
      height: 33rpx;
    }
  }

}
</style>