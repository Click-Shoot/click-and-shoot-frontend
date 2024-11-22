<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Proche de vous</h2>
    <div class="flex space-x-4 mb-4">
      <Select v-model="selectedCity" :options="['Toutes', ...cities]" placeholder="Choisi une ville" class="w-1/2 md:w-56" />
      <Select v-model="filterDate" :options="['Plus récent', 'Plus loin']" placeholder="Plus récent 🔃" class="md:w-56 w-1/2" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SlotCard v-for="slot in paginatedSlots" :key="slot._id" :slot="slot" @slotDeleted="handleSlotDeleted" />
    </div>
    <div class="mt-4">
      <Paginator
        :rows="rows"
        :totalRecords="filteredSlots.length"
        :rowsPerPageOptions="[10, 20, 30]"
        :first="first"
        @page="onPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import SlotCard from '@/components/ui/SlotCard.vue';
import { useNuxtApp } from '#app';
import Paginator from 'primevue/paginator';

const { $api } = useNuxtApp();

const selectedCity = ref<string>('Toutes'); 
const filterDate = ref<string>('Plus récent'); 
const cities = [
  "Paris",
  "Lyon",
  "Marseille",
  "Toulouse",
  "Nice",
  "Nantes",
  "Strasbourg",
  "Montpellier",
  "Bordeaux",
  "Lille",
];

const slots = ref<any[]>([]);
const first = ref(0); 
const rows = ref(10); 

onMounted(async () => {
  const slotsData: any = await $api('/slots');
  slots.value = slotsData.filter((slot: { isReserved: any; start_date: string | number | Date; }) => !slot.isReserved && new Date(slot.start_date) > new Date());
});

const filteredSlots = computed(() => {
  let filtered = slots.value;

  if (selectedCity.value && selectedCity.value !== 'Toutes') {
    filtered = filtered.filter(slot => slot.location === selectedCity.value);
  }

  if (filterDate.value === 'Plus récent') {
    filtered = filtered.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  } else if (filterDate.value === 'Plus loin') {
    filtered = filtered.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
  }

  return filtered;
});

const paginatedSlots = computed(() => {
  const start = first.value;
  const end = start + rows.value;
  return filteredSlots.value.slice(start, end);
});

const onPageChange = (event: { first: number; rows: number; }) => {
  first.value = event.first;
  rows.value = event.rows;
};

const handleSlotDeleted = async () => {
  const slotsData: any = await $api('/slots');
  slots.value = slotsData.filter((slot: { isReserved: any; start_date: string | number | Date; }) => !slot.isReserved && new Date(slot.start_date) > new Date());

};
</script>

<style scoped>
</style>
