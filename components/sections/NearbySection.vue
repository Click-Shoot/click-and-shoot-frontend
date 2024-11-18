<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Proche de vous</h2>
    <div class="flex space-x-4 mb-4">
      <Dropdown class="w-1/3" placeholder="Price: High to Low" />
      <Dropdown class="w-1/3" placeholder="Distance: 2km" />
      <Dropdown class="w-1/3" placeholder="Location: Dong Da" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <!-- <PhotographCard v-for="n in 8" :key="n" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import PhotographCard from '@/components/ui/PhotographCard.vue';

</script>

<style scoped>
</style>
