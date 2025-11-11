<template>
  <div class="home-page">
    <SubnetCalculator />
  </div>
</template>

<script setup>
import SubnetCalculator from '@/components/SubnetCalculator.vue'
</script>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px;
}
</style>