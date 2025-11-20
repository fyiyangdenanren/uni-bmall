<script setup lang='ts'>
import { getBooks, getCategories } from '@/api/shop'
import CommonSearch from '@/components/common-search.vue'
import { BookVO } from '@/types/mall'
import { PageDTO } from '@/types/page'
import { Category } from '@/types/shop'
import { onMounted, ref } from 'vue'
const tabs = ['免费', '付费']
const currentTab = ref(0)
const active = ref(0)
// 获取当前系统可用区域高度
const systemInfo = uni.getSystemInfoSync()
const wh = ref(systemInfo.windowHeight);
/**
 * 激活价格区域索引
 */
const changeTab = (index: number) => {
  currentTab.value = index
}

// 右侧图书
const books = ref<PageDTO<BookVO>>()
/**
 * 激活分类区域索引
 */
const changeActive = async (index: number) => {
  active.value = index
  // 清空旧数据
  if (books.value) {
    books.value = undefined
  }
  await loadBooks()
}

// 分类类型列表
const categories = ref<Category[]>([])

/**
 * 挂载时加载
 */
onMounted(async () => {
  // 获取当前屏幕的高度
  wh.value = systemInfo.windowHeight - uni.upx2px(200);
  // 加载分类列表
  await loadCategories()
  // 加载图书列表
  await loadBooks()
})

/**
 * 加载分类列表
 */
const loadCategories = async () => {
  const res = await getCategories()
  categories.value = res.data
}

const loading = ref(false)

/**
 * 加载图书列表
 */
const loadBooks = async () => {
  if (loading.value) return
  loading.value = true

  const cid = categories.value[active.value]?.categoryId
  if (!cid) return
  const res = await getBooks({ categoryId: cid, pageNum: 1, pageSize: 18 })
  books.value = res.data
  loading.value = false
}

/**
 * 触底事件
 */
const onScrolltolower = async () => {
  // 1.条件判断
  if (books.value!.pageNum < books.value!.pages) {
    // 2.当前页码 + 1
    books.value!.pageNum++
    // 3.请求数据
    const res = await getBooks({
      pageNum: books.value!.pageNum,
      pageSize: books.value!.pageSize
    })
    // 4.追加数据
    books.value!.list.push(...res.data.list)
  } else {
    uni.showToast({
      title: '没有更多数据了',
      icon: 'none'
    })
  }
}

</script>

<template>
  <view>
    <!-- 搜索框 -->
    <common-search />

    <!-- 选择区域 -->
    <view class="selection">
      <text class="tab" v-for="(t, i) in tabs" :key="i" :class="{ active: currentTab === i }" @click="changeTab(i)">
        {{ t }}
      </text>
    </view>

    <!-- 分类列表区域 -->
    <view class="categorylist">
      <scroll-view scroll-y class="left" :style="{ height: wh + 'px' }">
        <block v-for="(cate, i) in categories" :key="cate.categoryId">
          <view :class="['category-item', i === active ? 'active' : '']" @click="changeActive(i)">
            {{ cate.categoryName }}
          </view>
        </block>
      </scroll-view>
      <scroll-view scroll-y class="right" :style="{ height: wh + 'px' }" @scrolltolower="onScrolltolower">
        <view class="booklist">
          <view class="book-item" v-for="(b, i) in books?.list" :key="b.bookId">
            <image :src="b.coverImage" />
            <text>{{ b.title }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

  </view>
</template>

<style scoped lang='scss'>
.selection {
  height: 50rpx;
  font-size: 32rpx;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20rpx;
  margin-left: 200rpx;

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
          height: 64rpx;
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