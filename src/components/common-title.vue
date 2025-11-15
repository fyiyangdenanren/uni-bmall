<template>
  <view class="common-title">
    <!-- 标题名称 -->
    <view class="name">
      <slot name="name"></slot>
    </view>
    <!-- 自定义内容 -->
    <view class="custom">
      <slot name="custom"></slot>
    </view>
  </view>
</template>

<script setup lang='ts'>


</script>

<style scoped lang='scss'>
.common-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 40rpx 20rpx 40rpx;

  .name {
    font-size: 40rpx;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }

  .custom {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 24rpx;
    color: rgba(153, 153, 153, 1);
  }
}
</style>