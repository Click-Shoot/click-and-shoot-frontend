<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Proche de vous</h2>
    <div class="flex space-x-4 mb-4">
      <!-- Select pour le filtrage par ville avec option "Toutes" -->
      <Select v-model="selectedCity" :options="['Toutes', ...cities]" placeholder="Choisi une ville" class="w-1/2 md:w-56" />
      <!-- Select pour le tri par date avec tri par défaut "Plus récent" -->
      <Select v-model="filterDate" :options="['Plus récent', 'Plus loin']" placeholder="Plus récent 🔃" class="md:w-56 w-1/2" />
    </div>
    <!-- Affichage des créneaux filtrés avec pagination -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SlotCard v-for="slot in paginatedSlots" :key="slot._id" :slot="slot" />
    </div>
    <!-- Pagination -->
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
import SlotCard from '@/components/ui/SlotCard.vue'; // Assurez-vous que le chemin d'importation est correct
import { useNuxtApp } from '#app';
import Paginator from 'primevue/paginator';

const { $api } = useNuxtApp();

const selectedCity = ref<string>('Toutes'); // Valeur par défaut "Toutes"
const filterDate = ref<string>('Plus récent'); // Valeur par défaut "Plus récent"
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
const first = ref(0); // Pour la pagination
const rows = ref(20); // Nombre de créneaux à afficher par page

onMounted(async () => {
  const slotsData = await $api('/slots');
  slots.value = slotsData.filter(slot => !slot.isReserved && new Date(slot.start_date) > new Date());
});

// Filtrage des créneaux en fonction des sélections de l'utilisateur
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

// Pagination des créneaux filtrés
const paginatedSlots = computed(() => {
  const start = first.value;
  const end = start + rows.value;
  return filteredSlots.value.slice(start, end);
});

// Gestion du changement de page
const onPageChange = (event) => {
  first.value = event.first;
  rows.value = event.rows;
};
</script>

<style scoped>
</style>
