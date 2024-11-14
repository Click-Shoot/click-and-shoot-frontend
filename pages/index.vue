<template>
  <div class="container mx-auto p-4 space-y-8">
    <AnnonceBanner />
    <CategoryCarousel />
    <RecommendSection />
    <NearbySection />
  </div>
</template>

<script setup lang="ts">
import AnnonceBanner from '@/components/ui/AnnonceBanner.vue';
import RecommendSection from '@/components/sections/RecommendSection.vue';
import NearbySection from '@/components/sections/NearbySection.vue';
import CategoryCarousel from '@/components/ui/CategoryCarousel.vue';
</script>

<style scoped>
</style>
