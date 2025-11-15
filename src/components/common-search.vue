<template>
  <view class="search">
    <image class="icon" src="@/static/mall_icons/search.png" />
    <input type="text" placeholder="请输入书名或作者" />
  </view>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
/* 搜索区域 */
.search {
  position: relative;
  margin: 20rpx 40rpx 40rpx 40rpx;

  .icon {
    height: 36rpx;
    width: 36rpx;
    position: absolute;
    left: 30rpx;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }

  input {
    width: 670rpx;
    height: 64rpx;
    padding-left: 100rpx;
    border-radius: 32rpx;
    line-height: 64rpx;
    background-color: #f5f5f5;
  }
}
</style>