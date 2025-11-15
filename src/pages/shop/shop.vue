<template>
  <view>
    <!-- 搜索框 -->
    <common-search />

    <!-- 选择区域 -->
    <view class="content">
      <view class="empty"></view>
      <view class="selection">
        <text class="tab" v-for="(t, i) in tabs" :key="i" :class="{ active: currentTab === i }" @click="changeTab(i)">
          {{ t }}
        </text>
      </view>
    </view>

    <!-- 分类列表区域 -->
    <view class="categorylist">
      <scroll-view scroll-y class="left" :style="{ height: wh + 'px' }">
        <block v-for="(cate, i) in categories" :key="i">
          <view :class="['category-item', i === active ? 'active' : '']" @click="changeActive(i)">
            {{ cate }}
          </view>
        </block>
      </scroll-view>
      <scroll-view scroll-y class="right" :style="{ height: wh + 'px' }">
        <view class="booklist">
          <view class="book-item" v-for="item in 50">
            <image src="@/images/山河岁月.png" />
            <text>这是一本书这是一本书这是一本书这是一本书这是一本书这是一本书这是一本书</text>
          </view>
        </view>
      </scroll-view>
    </view>

  </view>
</template>

<script setup lang='ts'>
import CommonSearch from '@/components/common-search.vue'
import { ref } from 'vue'
// tab 集合
const tabs = ['免费', '付费']
// 当前选中索引
const currentTab = ref(0)
const changeTab = (index: number) => {
  currentTab.value = index
}
// 分类类型列表
const categories = ref(['计算机', '人文艺术', '科幻', '语言', '科学'])
// 激活初始索引
const active = ref(0)
const changeActive = (index: number) => {
  active.value = index
}
// 获取当前系统的信息
const systemInfo = uni.getSystemInfoSync()
// 获取当前屏幕的高度
const wh = ref(systemInfo.windowHeight);
</script>

<style scoped lang='scss'>
.content {
  display: flex;

  .empty {
    width: 200rpx;
  }

  .selection {
    width: 100%;
    font-size: 32rpx;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20rpx;

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
}

.categorylist {
  display: flex;

  .left {
    width: 200rpx;

    .category-item {
      width: 200rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 32rpx;
      font-weight: 400;
      background-color: #f9f9f9;

      /* 激活项的样式 */
      &.active {
        position: relative;

        /* 渲染激活项左侧的指示边线 */
        &::before {
          content: '';
          display: block;
          width: 8rpx;
          height: 32rpx;
          position: absolute;
          background-color: rgba(66, 134, 135, 1);
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 2rpx;
        }
      }
    }
  }

  .right {
    padding: 40rpx;

    .booklist {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20rpx 40rpx;

      .book-item {
        image {
          width: 130rpx;
          height: 180rpx;
          border-radius: 10rpx;
        }

        text {
          width: 130rpx;
          font-size: 24rpx;
          font-weight: 400;
          text-align: center;
          line-height: 32rpx;
          /* 最多允许显示两行 */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

  }
}
</style>