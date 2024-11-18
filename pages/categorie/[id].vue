<template>
  <div class="container mx-auto p-4 space-y-8 mt-8">
    <h2 class="text-xl font-bold mb-4">Les photographes dans la catégories: {{ category }}</h2>
    <div>
      <div v-if="photographers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <PhotographCard v-for="photograph in photographers" :photograph="photograph" :key="photograph._id" />
      </div>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';
import PhotographCard from "@/components/ui/PhotographCard.vue";

const { $api } = useNuxtApp();

const route = useRoute();
const id = route.params.id; 

interface Photographer {
  _id: string;
  rating: number[];
}

const photographers = ref<Photographer[]>([]);
const category = ref<string>('');

onMounted(async() => {
    const data: any = await $api('/users/photographers/' + id);
    photographers.value = data.users;

    const categoryName = await $api('/tags/' + id) as { tag: { label: string } };
    category.value = categoryName.tag.label;
});
</script>