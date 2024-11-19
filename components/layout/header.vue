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
      <NuxtLink 
      v-if="user" 
      :to="'/user/' + user._id" 
      class="text-gray-700 text-white p-1 px-4 bg-primary-mid rounded hover:bg-primary-dark">
      {{ user.firstName }} {{ user.lastName }}
    </NuxtLink>
    <NuxtLink 
    v-if="user"
    :to="'/auth'" 
    class="text-gray-700 text-white p-1 px-4 bg-primary-mid rounded hover:bg-primary-dark"
    @click="handleLogout">
    Logout
  </NuxtLink>
  <NuxtLink 
    v-if="!user"
    :to="'/auth'" 
    class="text-gray-700 text-white p-1 px-4 bg-primary-mid rounded hover:bg-primary-dark">
    Login
  </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTagsStore } from '@/stores/tags'; 
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const showDropdown = ref(false);
const tags = ref<Tag[]>([]);
const tagsStore = useTagsStore();
const router = useRouter();
onMounted(async () => {
  await tagsStore.fetchTags();
  tags.value = tagsStore.getTags(); 
});

const leftTags = computed(() => tags.value.slice(0, 5));
const rightTags = computed(() => tags.value.slice(5, 10));
const user = computed(() => authStore.user);

authStore.loadAuthFromCookies();

const handleLogout = () => {
  authStore.clearAuth();
  router.push('/auth');
};

</script>

<style scoped>
</style>
