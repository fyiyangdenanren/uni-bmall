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
        <scroll-view scroll-x @scrolltolower="newScrolltolower">
          <view class="book" v-for="n in newList?.list">
            <image :src="n.coverImage" />
            <view class="text">
              <text>{{ n.title }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <!-- 分隔条 -->
    <view class="divider"></view>

    <!-- 评分榜 -->
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
        <scroll-view scroll-x @scrolltolower="scoreScrolltolower">
          <view class="book" v-for="b in scoreList?.list">
            <image :src="b.coverImage" />
            <text>{{ b.title }}</text>
          </view>
        </scroll-view>
      </view>
    </view>

  </view>
</template>

<script setup lang='ts'>
import CommonTitle from '@/components/common-title.vue'
import CommonSearch from '@/components/common-search.vue'
import { onMounted, ref } from 'vue';
import { getScoreBooks, getNewBooks } from '@/api/mall'
import { PageDTO } from '@/types/page';
import { BookVO } from '@/types/mall';

const scoreList = ref<PageDTO<BookVO>>()
const newList = ref<PageDTO<BookVO>>()
/* 获取新书书籍列表 */
const getNewTop = async () => {
  const res = await getNewBooks()
  newList.value = res.data
}
/* 获取评分书籍列表 */
const getScoreTop = async () => {
  const res = await getScoreBooks()
  scoreList.value = res.data
}

/* 触底事件 */
const newScrolltolower = async () => {
  // 1.条件判断
  if (newList.value!.pageNum < newList.value!.pages) {
    // 2.当前页码 + 1
    newList.value!.pageNum++
    // 3.请求数据
    const res = await getNewBooks({
      pageNum: newList.value!.pageNum,
      pageSize: newList.value!.pageSize
    })
    // 4.追加数据
    newList.value!.list.push(...res.data.list)
  } else {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none'
    })
  }
}

const scoreScrolltolower = async () => {
  // 1.条件判断
  if (scoreList.value!.pageNum < scoreList.value!.pages) {
    // 2.当前页码 + 1
    scoreList.value!.pageNum++
    // 3.请求数据
    const res = await getScoreBooks({
      pageNum: scoreList.value!.pageNum,
      pageSize: scoreList.value!.pageSize
    })
    // 4.追加数据
    scoreList.value!.list.push(...res.data.list)
  } else {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none'
    })
  }
}

onMounted(() => {
  getNewTop()
  getScoreTop()
})
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