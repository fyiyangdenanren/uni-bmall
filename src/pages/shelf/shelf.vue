<template>
  <view>
    <!-- 选择区域 -->
    <view class="selection">
      <text class="tab" v-for="(t, i) in tabs" :key="i" :class="{ active: currentTab === i }" @click="changeTab(i)">
        {{ t }}
      </text>
    </view>
    <!-- 列表区域 -->
    <scroll-view scroll-y>
      <view class="bookList">
        <view class="item" v-for="item in 10">
          <image src="@/images/山河岁月.png" />
        </view>
      </view>
    </scroll-view>

  </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
// tab 集合
const tabs = ['全部', '借阅', '已购']
// 当前选中索引
const currentTab = ref(0)
const changeTab = (index: number) => {
  currentTab.value = index
}
</script>

<style scoped lang='scss'>
.selection {
  width: 100%;
  height: 128rpx;
  background-color: #f9f9f9;
  font-size: 32rpx;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;

  .tab {

    /* 激活项样式 */
    &.active {
      font-size: 40rpx;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      position: relative;

      /* 渲染激活底部的指示边线 */
      &::before {
        content: '';
        position: absolute;
        bottom: -10rpx; // 位于底部下方一点，可以根据需要调整
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx; // 宽度
        height: 4rpx; // 高度
        background: rgba(66, 134, 135, 1);
        border-radius: 2rpx;
      }
    }
  }

}

.bookList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40rpx 60rpx;
  padding: 40rpx 0rpx 40rpx 40rpx;

  .item {

    image {
      width: 180rpx;
      height: 252rpx;
    }
  }
}
</style>