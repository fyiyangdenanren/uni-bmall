<script setup lang="ts">
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

/** 右侧图书 */
const books = ref<PageDTO<BookVO> | undefined>()

/** 分类类型列表 */
const categories = ref<Category[]>([])

const loading = ref(false)
const noMore = ref(false)

/** 切换免费/付费 */
const changeTab = (index: number) => {
  if (currentTab.value === index) return
  currentTab.value = index
  // 切换过滤，重置分页与旧数据
  books.value = undefined
  loadBooks() // 不 await，ui 更流畅（也可以 await）
}

/** 激活分类 */
const changeActive = (index: number) => {
  if (active.value === index) return
  active.value = index
  books.value = undefined
  loadBooks()
}

/** 挂载时加载 */
onMounted(async () => {
  wh.value = systemInfo.windowHeight - uni.upx2px(200);
  await loadCategories()
  await loadBooks()
})

/** 加载分类列表 */
const loadCategories = async () => {
  const res = await getCategories()
  categories.value = res.data || []
}

/**
 * 加载图书列表（默认加载第一页，覆盖现有数据）
 */
const loadBooks = async () => {
  if (loading.value) return
  // 取当前分类 id
  const cid = categories.value[active.value]?.categoryId
  if (!cid) {
    // 没有分类时不继续（确保 loading 没被置为 true）
    return
  }

  loading.value = true
  // 判断是否加载完全部数据
  noMore.value = false

  try {
    // 请求第一页（覆盖）
    const res = await getBooks({
      categoryId: cid,
      pageNum: 1,
      pageSize: 18,
      isFree: currentTab.value === 0 ? 1 : 0
    })
    books.value = res.data
  } catch (err) {
    console.error('加载图书失败', err)
    uni.showToast({ title: '加载图书失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

/**
 * 触底事件
 */
const onScrolltolower = async () => {
  // 条件判断
  if (noMore.value || loading.value || !books.value) return

  // 是否还有下一页
  if (books.value.pageNum < books.value.pages) {
    if (loading.value) return
    loading.value = true
    try {
      const nextPage = books.value.pageNum + 1
      // 翻页请求带上 categoryId 与 isFree 等过滤条件
      const cid = categories.value[active.value]?.categoryId
      if (!cid) return
      const res = await getBooks({
        categoryId: cid,
        pageNum: nextPage,
        pageSize: books.value.pageSize,
        isFree: currentTab.value === 0 ? 1 : 0
      })
      // 追加数据
      books.value.list.push(...(res.data.list || []))
      books.value.pageNum = res.data.pageNum
      books.value.pages = res.data.pages
    } catch (err) {
      console.error('加载更多失败', err)
      uni.showToast({ title: '加载更多失败', icon: 'none' })
    } finally {
      loading.value = false
    }
  } else {
    noMore.value = true
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
          <view class="book-item" v-for="b in books?.list" :key="b.bookId">
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