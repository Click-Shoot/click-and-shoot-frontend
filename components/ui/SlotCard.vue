<template>
  <div class="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between h-full flex-grow">
    <div>
      <h3 class="text-lg font-semibold mb-2">Créneau Disponible</h3>
      <p class="text-sm text-gray-500">
        <span class="font-medium">Date :</span> {{ formattedDate }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="font-medium">Heure :</span> {{ formattedStartTime }} - {{ formattedEndTime }}
      </p>
      <p class="text-sm text-gray-500">
        <span class="font-medium">Lieu :</span> {{ slot.location }}
      </p>
      <p
        v-if="slot.isReserved"
        class="text-xs text-red-600 mt-2"
      >
        Réservé
      </p>
      <p
        v-else
        class="text-xs text-green-600 mt-2"
      >
        Disponible
      </p>
    </div>
    <div class="mt-4 flex justify-end">
      <button
        v-if="!slot.isReserved"
        @click="reserveSlot"
        class="bg-primary-mid text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        Réserver
      </button>
      <button
        v-else
        class="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
        disabled
      >
        Réservé
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Slot {
  _id: string;
  start_date: string;
  end_date: string;
  location: string;
  photographId: string;
  customersId: string;
  isReserved: boolean;
}

const props = defineProps<{ slot: Slot }>();

const formattedDate = computed(() => {
  const date = new Date(props.slot.start_date);
  return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});

const formattedStartTime = computed(() => {
  const startTime = new Date(props.slot.start_date);
  return startTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
});

const formattedEndTime = computed(() => {
  const endTime = new Date(props.slot.end_date);
  return endTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
});

const reserveSlot = () => {
  alert(`Réservation du créneau à ${props.slot.location}`);

  // Call API to reserve slot
  
};
</script>

<style scoped>
</style>
