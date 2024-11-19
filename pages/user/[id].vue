<template>
  <div v-if="user" class="mb-12">
    <div class="container mx-auto p-4 space-y-8 mt-10" v-if="user.isPhotograph">
      <div class="flex gap-16" v-if="user._id">
        <PhotographCarousel :images="gallery" />
        <div
          class="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 w-2/3 p-12 flex flex-col justify-center items-center">
          <div class="profil-user-avatar">
            <img src="https://picsum.photos/150/150" alt="" class="rounded-full">
          </div>
          <div class="font-bold text-3xl">{{ user.firstName }} {{ user.lastName }}</div>
          <div class="mt-1">
            <div class="flex flex-col items-center">
              <div class="flex items-center">
                <svg :class="rating >= 1 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg :class="rating >= 2 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg :class="rating >= 3 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg :class="rating >= 4 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg :class="rating >= 5 ? 'text-yellow-300' : 'text-gray-300'" class="w-5 h-5 me-1" aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p class="ml-1 text-s font-bold text-gray-900">{{ rating.toFixed(1) }}</p>
              </div>
              <a href="#" class="text-s font-medium text-gray-900 underline hover:no-underline mt-1">{{
                user.rating.length }}
                notes</a>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="flex items-center gap-4 mb-4">
          <h2 class="text-2xl font-bold">Mes créneaux</h2>
          <button @click="showModal = true" class="bg-primary-mid p-1 px-3 rounded">Ajouter un créneau</button>
        </div>
        <div class="flex items-center mb-4">
          <input type="checkbox" id="filterAvailableSlots" v-model="filterAvailable"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
          <label for="filterAvailableSlots" class="ml-2 text-sm text-gray-700">
            Afficher uniquement les créneaux disponibles
          </label>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SlotCard v-for="slot in filteredSlots" :key="slot._id" :slot="slot" @slotDeleted="handleSlotDeleted" />
        </div>
      </div>
      <div class="w-full" v-if="authStore.user._id === id">
        <h2 class="text-2xl font-bold mb-4">Mes créneaux réservés</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SlotCardUser v-for="slot in slots" :key="slot._id" :slot="slot" />
        </div>
      </div>
    </div>
        <!-- User classique -->
        <div class="container mx-auto p-4 space-y-8 mt-10" v-else>
      <div class="bg-white border border-gray-200 rounded-lg shadow p-8">
        <div class="flex flex-col items-center">
          <img src="https://picsum.photos/150/150" alt="Profil" class="rounded-full mb-4">
          <h1 class="text-2xl font-bold mb-2">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="text-gray-600">{{ user.email }}</p>
        </div>
      </div>

      <div class="mt-8">
        <h2 class="text-xl font-bold mb-4">Mes créneaux réservés</h2>
        <div v-if="slots.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SlotCardUser v-for="slot in slots" :key="slot._id" :slot="slot" />
        </div>
        <p v-else class="text-gray-500">Aucun créneau réservé pour le moment.</p>
      </div>
    </div>
  </div>

  <div v-else-if="loadingError" class="container mx-auto p-4 space-y-8 mt-10">
    <h1>Utilisateur introuvable</h1>
  </div>

  <div v-else class="container mx-auto p-4 space-y-8 mt-10">
    <p>Chargement...</p>
  </div>

      <!-- Modale pour le formulaire -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Créer un créneau</h2>
        <form @submit.prevent="createSlot">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Date de début</label>
            <input type="datetime-local" v-model="newSlot.start_date" class="mt-1 p-2 border border-gray-300 rounded w-full" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Date de fin</label>
            <input type="datetime-local" v-model="newSlot.end_date" class="mt-1 p-2 border border-gray-300 rounded w-full" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Emplacement</label>
            <Select v-model="newSlot.location" :options="['Toutes', ...cities]" placeholder="Choisi une ville" class="w-full" required />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="showModal = false" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Annuler</button>
            <button type="submit" class="bg-primary-mid text-white px-4 py-2 rounded">Créer</button>
          </div>
        </form>
      </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import { useNuxtApp } from '#app';
import SlotCard from "@/components/ui/SlotCard.vue";
import PhotographCarousel from "@/components/ui/PhotographCarousel.vue";
import SlotCardUser from "@/components/ui/SlotCardUser.vue";
import { useAuthStore } from "@/stores/auth";

const { $api } = useNuxtApp();
const authStore = useAuthStore();

const route = useRoute();
const id = route.params.id;

const user = ref(null);
const slots = ref([]);
const mySlots = ref([]);
const gallery = ref([]);
const rating = ref(5);
const filterAvailable = ref(false);
const loadingError = ref(false);

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

const showModal = ref(false);
const newSlot = ref({
  start_date: '',
  end_date: '',
  location: '',
  photographId: '',
});

const filteredSlots = computed(() => {
  return filterAvailable.value
    ? mySlots.value.filter(slot => !slot.isReserved)
    : mySlots.value;
});

onMounted(async () => {
  try {
    const userData = await $api(`/users/${id}`);
    user.value = userData;

    if (userData.isPhotograph) {
      
      const slotsData = await $api(`/users/${id}/slots`, {
        params: {
          type: 'photograph'
        }
      });

      const slotsDataUser = await $api(`/users/${id}/slots`, {
        params: {
          type: 'customer'
        }
      });

      slots.value = slotsDataUser.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA.getTime() - dateB.getTime();
      });

      const galleryData = await $api(`/gallery/user/${id}`);
  
      gallery.value = galleryData.galleries[0]?.urls || [];
  
      mySlots.value = slotsData.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA.getTime() - dateB.getTime();
      });
  
      rating.value = userData.rating?.reduce((acc, val) => acc + val, 0) / (userData.rating?.length || 1);
    }

    if (!userData.isPhotograph) {
      const slotsData = await $api(`/users/${id}/slots`, {
        params: {
          type: 'customer'
        }
      });

      slots.value = slotsData.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA.getTime() - dateB.getTime();
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur');
    loadingError.value = true; 
  }
});

const createSlot = async () => {

  if (!newSlot.value.location) {
    alert('Veuillez sélectionner un emplacement avant de créer un créneau.');
    return;
  }

  try {
    const response = await $api('/slots', {
      method: 'POST',
      body: {
        start_date: newSlot.value.start_date,
        end_date: newSlot.value.end_date,
        location: newSlot.value.location,
        photographId: id,
      }
    });
    //si la réponse est bonne 
    if (response && response._id) {

      const slotsData = await $api(`/users/${id}/slots`, {
        params: {
          type: 'photograph'
        }
      });

      mySlots.value = slotsData.sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA.getTime() - dateB.getTime();
      });

    } else {
      console.warn('La réponse de création du créneau ne contient pas de créneau valide.');
    }

    showModal.value = false; 
  } catch (error) {
    console.error('Erreur lors de la création du créneau:', error);
  }
};

const handleSlotDeleted = (slotId) => {
  mySlots.value = mySlots.value.filter(slot => slot._id !== slotId);
  slots.value = slots.value.filter(slot => slot._id !== slotId);
};
</script>