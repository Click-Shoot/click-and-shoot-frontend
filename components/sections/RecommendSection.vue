<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Nos meilleurs photographes</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <PhotographCard v-for="photograph in photographers" :key="photograph" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';
import PhotographCard from "~/components/ui/PhotographCard.vue";

const photographers: any = ref([]);

onMounted(() => {
  photographers.value = apiService.get('/photographers');
});

</script>

<style scoped>
</style>
