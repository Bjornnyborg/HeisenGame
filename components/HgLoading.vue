<template>
  <div class="loading">
    <div class="loading__ripple">
      <div class="loading__ripple-item"></div>
      <div class="loading__ripple-item"></div>
    </div>
    <div>Loading...</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.loading {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 100px 0;

  &__ripple {
    display: inline-block;
    position: relative;
    width: 128px;
    height: 128px;
  }

  &__ripple-item {
    position: absolute;
    border: 5px solid $color-primary;
    opacity: 1;
    border-radius: 50%;
    animation: ripple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-of-type(2) {
      animation-delay: -1s;
    }
  }
}

@keyframes ripple {
  0% {
    top: 56px;
    left: 56px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 116px;
    height: 116px;
    opacity: 0;
  }
}
</style>