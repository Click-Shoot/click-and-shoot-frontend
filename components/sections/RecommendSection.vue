<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Nos meilleurs photographes</h2>
    <div>
      <div v-if="photographers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <PhotographCard v-for="photograph in photographers" :photograph="photograph" :key="photograph._id" />
      </div>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PhotographCard from "@/components/ui/PhotographCard.vue";
import { useNuxtApp } from '#app';

const { $api } = useNuxtApp();

interface Photographer {
  _id: string;
  rating: number[];
}

const photographers = ref<Photographer[]>([]);

onMounted(async () => {
  try {
    const data: any = await $api('/photographers');

    photographers.value = data.photographers;

    photographers.value = photographers.value.sort((a: any, b: any) => {
      const averageA = a.rating.length ? a.rating.reduce((sum: number, rating: number) => sum + rating, 0) / a.rating.length : 0;
      const averageB = b.rating.length ? b.rating.reduce((sum: number, rating: number) => sum + rating, 0) / b.rating.length : 0;
      return averageB - averageA;
    }).slice(0, 10);
  } catch (error) {
    console.error('Erreur lors de la récupération des photographes :', error);
  }
});


</script>

<style scoped></style>
