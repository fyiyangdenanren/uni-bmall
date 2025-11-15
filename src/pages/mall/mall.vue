<template>
  <view>
    <!-- 搜索 -->
    <common-search></common-search>

    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular :interval="3000" :duration="1000">
      <swiper-item v-for="item in 3">
        <image src="@/images/mall-banner.png" />
      </swiper-item>
    </swiper>

    <!-- 听书、动态区域 -->
    <view class="go">
      <view class="listen">
        <image src="@/images/mall-listen.png" />
      </view>
      <view class="active">
        <image src="@/images/mall-active.png" />
      </view>
    </view>

    <!-- 分隔条 -->
    <view class="divider"></view>

    <!-- 新书推荐 -->
    <view class="recommend">
      <!-- 标题 -->
      <common-title>
        <template #name>新书推荐</template>
        <template #custom>
          <text>更多</text>
          <uni-icons type="right" size="16" class="icon" color="#999999"></uni-icons>
        </template>
      </common-title>
      <!-- 书籍列表 -->
      <view class="booklist">
        <scroll-view scroll-x>
          <view class="book" v-for="item in 10">
            <image src="@/images/山河岁月.png" />
            <view class="text">
              <text>这是一本书这是一本书这是一本书这是一本书这是一本书这是一本书这是一本书</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 分隔条 -->
    <view class="divider"></view>

    <!-- 排行榜 -->
    <view class="score">
      <common-title>
        <template #name>排行榜</template>
        <template #custom>
          <text>更多</text>
          <uni-icons type="right" size="16" class="icon" color="#999999"></uni-icons>
        </template>
      </common-title>
      <!-- 书籍列表 -->
      <view class="booklist">
        <scroll-view scroll-x>
          <view class="book" v-for="item in 10">
            <image src="@/images/山河岁月.png" />
            <text>这是一本书这是一本书这是一本书这是一本书这是一本书这是一本书这是一本书</text>
          </view>
        </scroll-view>
      </view>
    </view>

  </view>
</template>

<script setup lang='ts'>
import CommonTitle from '@/components/common-title.vue'
import CommonSearch from '@/components/common-search.vue'
</script>

<style scoped lang='scss'>
/* 轮播图区域 */
swiper {
  height: 240rpx;

  swiper-item {
    height: 100%;
    padding: 0rpx 40rpx;

    image {
      width: 670rpx;
      height: 240rpx;
      border-radius: 25rpx;
    }
  }
}

/* 推荐区域 */
.go {
  width: 100%;
  height: 160rpx;
  display: flex;
  justify-content: space-between;
  margin: 40rpx 0 20rpx;
  padding: 0 40rpx;

  image {
    width: 320rpx;
    height: 160rpx;
  }
}

/* 分隔条 */
.divider {
  width: 100%;
  height: 20rpx;
  background-color: #f9f9f9;
}

/* 新书推荐区域 */
.recommend,
.score {

  .booklist {
    width: 710rpx;
    height: 336rpx;
    margin-left: 40rpx;

    scroll-view {
      white-space: nowrap;

      .book {
        width: 180rpx;
        height: 252rpx;
        display: inline-block;
        margin-right: 20rpx;

        text {
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

        image {
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
        }
      }

      .book:last-child {
        margin-right: 40rpx;
      }
    }
  }

}
</style>