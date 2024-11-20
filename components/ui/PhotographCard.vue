<template>
  <div class="border rounded-lg shadow-md p-4 bg-white flex flex-col h-full">
    <div class="relative mb-4">
      <div class="w-full h-32 bg-gray-200 rounded">
        <img :src="photograph.avatar" alt="Photograph" class="w-full h-full object-cover rounded" />
      </div>
      <span class="absolute top-2 right-2 bg-primary-mid text-white text-xs px-2 py-1 rounded flex items-center gap-1 justify-center">
        {{ rating.toFixed(1) }}
        <svg class="w-3 h-3 me-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
      </span>
    </div>
    <div class="text-lg font-semibold">{{ photograph.firstName }} {{ photograph.lastName }}</div>
    <p class="text-sm text-gray-500 flex-grow">{{ photograph.description }}</p>
    <div class="mt-2 flex justify-between items-center">
      <div>
        <p class="text-primary-mid font-bold">{{ photograph.price.toFixed(2) }}€ /h</p>
      </div>
      <button @click="goToUser(photograph._id)" :class="{ disabled: !authStore.user }" class="bg-primary-mid text-white px-3 py-1 rounded hover:bg-primary-dark">Voir</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const props = defineProps({
  photograph: {
    type: Object,
    required: true
    },
});

const { photograph } = props;
const rating = photograph.rating.length ? photograph.rating.reduce((sum: number, rating: number) => sum + rating, 0) / photograph.rating.length : 0;
const router = useRouter(); 

const disabled = computed(() => !authStore.user);

const goToUser = (id: string) => {
  router.push(`/user/${id}`);
};
</script>

<style scoped>
.disabled {
  display: none;
}

</style>
