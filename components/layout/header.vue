<template>
  <nav class="flex items-center px-20 justify-between h-16 bg-white shadow-md relative">
    <div class="flex items-center space-x-4">
      <!-- <img src="/logo.png" alt="OpenDoor Logo" class="h-8 w-auto" /> -->
      <h2>LOGO</h2>
    </div>
    <div class="flex items-center space-x-4 relative h-full">
      <ul class="flex items-center space-x-4 h-full">
        <li class="h-full flex items-center">
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-mid">Accueil</NuxtLink>
        </li>
        <li
          class="relative h-full flex items-center"
          @mouseover="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <a href="#" class="text-gray-700 hover:text-primary-mid">Catégories</a>
          <div
            v-if="showDropdown"
            class="absolute top-10 left-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 z-10 grid grid-cols-2 gap-4"
          >
            <div v-for="(tag, index) in leftTags" :key="'left-' + index" class="p-2">
              <NuxtLink :to="`/categorie/${tag._id}`" class="text-gray-700 hover:text-primary-mid">{{ tag.label }}</NuxtLink>

            </div>
            <div v-for="(tag, index) in rightTags" :key="'right-' + index" class="p-2">
              <NuxtLink :to="`/categorie/${tag._id}`" class="text-gray-700 hover:text-primary-mid">{{ tag.label }}</NuxtLink>
            </div>
          </div>
        </li>
        <li class="h-full flex items-center">
          <a href="#" class="text-gray-700 hover:text-primary-mid">Contact</a>
        </li>
      </ul>
    </div>
    <div class="flex items-center space-x-4">
      <button class="text-primary-mid">Login</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTagsStore } from '@/stores/tags'; 

const showDropdown = ref(false);
const tags = ref<Tag[]>([]);
const tagsStore = useTagsStore();

onMounted(async () => {
  await tagsStore.fetchTags();
  tags.value = tagsStore.getTags(); 
});

const leftTags = computed(() => tags.value.slice(0, 5));
const rightTags = computed(() => tags.value.slice(5, 10));
</script>

<style scoped>
</style>
