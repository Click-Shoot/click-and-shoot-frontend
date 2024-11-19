<template>
  <div class="container mx-auto p-4 space-y-8">
    <div class="flex">
      <div class="card">
        <Galleria :numVisible="4" :responsiveOptions="responsiveOptions" :thumbnailsPosition="position" :value="gallery"
                  containerStyle="max-width: 640px">
          <template #item="slotProps">
            <img :alt="slotProps.item.alt" :src="slotProps.item.itemImageSrc" style="width: 100%; display: block"/>
          </template>
          <template #thumbnail="slotProps">
            <div class="grid gap-4 justify-center">
              <img :alt="slotProps.item.alt" :src="slotProps.item.thumbnailImageSrc"
                   style="max-width: 150px; display: block;"/>
            </div>
          </template>
        </Galleria>
      </div>
      <div v-if="user._id" class="flex flex-col flex-grow items-center justify-center">
        <div class="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 w-2/3 p-12 flex flex-col justify-center items-center">
          <div class="profil-user-avatar">
            <img src="https://picsum.photos/150/150" alt="" class="rounded-full">
          </div>
          <div class="font-bold text-3xl">{{ user.firstName }} {{ user.lastName }}</div>
          <div class="mt-1">
            <div class="flex flex-col items-center">
              <div class="flex items-center">
                <svg :class="rating >= 1 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg :class="rating >= 2 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg :class="rating >= 3 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg :class="rating >= 4 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg :class="rating >= 5 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <p class="ml-1 text-s font-bold text-gray-900">{{ rating.toFixed(1) }}</p>
              </div>
              <a href="#" class="text-s font-medium text-gray-900 underline hover:no-underline mt-1">{{user.rating.length}} notes</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <h2 class="text-xl font-bold mb-4">Mes créneaux</h2>
      <div class="flex items-center mb-4">
      <input
        type="checkbox"
        id="filterAvailableSlots"
        v-model="filterAvailable"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
      />
      <label for="filterAvailableSlots" class="ml-2 text-sm text-gray-700">
        Afficher uniquement les créneaux disponibles
      </label>
    </div>
      <div class="flex w-full gap-2">
        <SlotCard v-for="slot in filteredSlots" :key="slot._id" :slot="slot" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';
import SlotCard from "~/components/ui/SlotCard.vue";

const { $api } = useNuxtApp();

const route = useRoute();
const id = route.params.id;


const position = ref('bottom');
const user = ref({});
const slots = ref([]);
const gallery = ref([]);
const rating = ref();
const filterAvailable = ref(false);

const responsiveOptions = ref([
  {
    breakpoint: '1100px',
    numVisible: 4
  },
  {
    breakpoint: '575px',
    numVisible: 1
  }
]);

const filteredSlots = computed(() => {
  return filterAvailable.value
    ? slots.value.filter(slot => !slot.isReserved)
    : slots.value;
});

onMounted(async() => {
  const userData = await $api(`/users/${id}`);
  const slotsData = await $api(`/users/${id}/slots`);
  const galleryData = await $api(`/gallery/user/${id}`);

 
  slots.value = slotsData.sort((a, b) => {
  const dateA = new Date(a.start_date);
  const dateB = new Date(b.start_date);
  return dateA.getTime() - dateB.getTime(); // Tri du plus proche au plus loin
});;

  user.value = userData;
  rating.value = userData.rating.reduce((acc, val) => acc + val, 0) / userData.rating.length;

  gallery.value = galleryData.galleries[0].urls.map(gallery => {
    return {
      itemImageSrc: gallery,
      thumbnailImageSrc: gallery,
      alt: 'gallery'
    }
  });
});
</script>