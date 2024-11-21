<template>
  <div class="mb-12">
    <div class="container mx-auto p-4 space-y-8 mt-10">
      <!-- Informations générales de l'utilisateur -->
      <div class="flex gap-16">
        <div
          class="relative w-3/5 bg-white border rounded-lg shadow p-8 flex flex-col justify-center items-center"
        >
          <button
            v-if="authStore.user?._id === id"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            @click="showEditModal = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 3.487a1.875 1.875 0 012.651 2.65L7.207 18.443l-4.95.55.55-4.95L16.862 3.487z"
              />
            </svg>
          </button>

          <div class="profil-user-avatar mb-4">
            <img :src="user.avatar" alt="" class="rounded-full w-40" />
          </div>
          <h1 class="text-3xl font-bold">
            {{ user.firstName }} {{ user.lastName }}
          </h1>
          <p class="text-gray-500">{{ user.email }}</p>
          <div v-if="user.isPhotograph" class="mt-4 flex flex-col items-center">
            <div class="flex items-center">
              <svg
                v-for="i in 5"
                :key="i"
                :class="rating >= i ? 'text-yellow-300' : 'text-gray-300'"
                class="w-5 h-5 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path
                  d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                />
              </svg>
              <p class="ml-2 text-s font-bold text-gray-900">
                {{ rating.toFixed(1) }}
              </p>
            </div>
            <p class="text-sm text-gray-500">{{ user.rating.length }} avis</p>

            <p class="text-gray-500 mt-3">{{ user.description }}</p>
            <p class="text-gray-500">{{ user.stuff.toString() }}</p>
          </div>
        </div>
        <PhotographCarousel
          v-if="user.isPhotograph && gallery.length > 0"
          :images="gallery"
        />
      </div>

      <!-- Créneaux proposés par le photographe -->
      <div v-if="user.isPhotograph" class="mt-8">
        <div class="flex items-center gap-4 mb-4">
          <h2 class="text-3xl font-bold">Créneaux proposés</h2>

          <button
            v-if="authStore.user?._id === id"
            @click="showModal = true"
            class="bg-primary-mid px-4 py-1 rounded text-white"
          >
            Ajouter un créneau
          </button>
        </div>
        <div v-if="mySlots.length > 0">
          <div class="flex justify-between items-center mb-4">
            <div>
              <input
                type="checkbox"
                id="filterAvailableSlots"
                v-model="filterAvailable"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                for="filterAvailableSlots"
                class="ml-2 text-sm text-gray-700"
              >
                Afficher uniquement les créneaux disponibles
              </label>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SlotCard
              v-for="slot in filteredSlots"
              :key="slot._id"
              :slot="slot"
              @slotDeleted="handleSlotDeleted"
            />
          </div>
        </div>
        <p v-else class="text-gray-500">
          Aucun créneau proposé pour le moment.
        </p>
      </div>

      <!-- Créneaux réservés par cet utilisateur -->
      <div v-if="authStore.user?._id === id" class="mt-8">
        <h2 class="text-2xl font-bold mb-4">Créneaux réservés</h2>
        <div v-if="slots.length > 0">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <SlotCardUser v-for="slot in slots" :key="slot._id" :slot="slot" />
          </div>
        </div>
        <p v-else class="text-gray-500">
          Aucun créneau réservé pour le moment.
        </p>
      </div>
    </div>

    <!-- Modale pour ajouter un créneau -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Créer un créneau</h2>
        <form @submit.prevent="createSlot">
          <div class="mb-4">
            <label>Date de début</label>
            <input
              type="datetime-local"
              v-model="newSlot.start_date"
              class="w-full p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4">
            <label>Date de fin</label>
            <input
              type="datetime-local"
              v-model="newSlot.end_date"
              class="w-full p-2 border rounded"
              required
            />
          </div>
          <div class="mb-4 flex flex-col">
            <label>Emplacement</label>
            <Select
              v-model="newSlot.location"
              :options="cities"
              placeholder="Choisi une ville"
              required
            />
          </div>
          <div class="flex justify-end">
            <button
              @click="showModal = false"
              class="bg-gray-400 px-4 py-2 rounded text-white mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="bg-primary-mid px-4 py-2 rounded text-white"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modale pour modifier un user -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Modifier le profil</h2>
        <form @submit.prevent="updateUserProfile">
          <div class="mb-4">
            <label>Prénom</label>
            <input
              v-model="editUser.firstName"
              type="text"
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label>Nom</label>
            <input
              v-model="editUser.lastName"
              type="text"
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label>Description</label>
            <textarea
              v-model="editUser.description"
              class="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div v-if="user.isPhotograph" class="mb-4">
            <label>Tarif</label>
            <input
              v-model="editUser.price"
              type="number"
              step="0.01"
              class="w-full p-2 border rounded"
            />
          </div>
          <div v-if="user.isPhotograph" class="mb-4">
            <label>Équipement</label>
            <textarea
              v-model="editUser.stuff"
              class="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div class="flex justify-end">
            <button
              @click="showEditModal = false"
              class="bg-gray-400 px-4 py-2 rounded text-white mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              class="bg-primary-mid px-4 py-2 rounded text-white"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useNuxtApp } from "#app";
import SlotCard from "@/components/ui/SlotCard.vue";
import PhotographCarousel from "@/components/ui/PhotographCarousel.vue";
import SlotCardUser from "@/components/ui/SlotCardUser.vue";
import { useAuthStore } from "@/stores/auth";

const { $api } = useNuxtApp();
const authStore = useAuthStore();

const route = useRoute();
const id = route.params.id;

const user = ref({
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  rating: [],
  isPhotograph: false,
});

const editUser = ref({});
const slots = ref([]);
const mySlots = ref([]);
const gallery = ref([]);
const rating = ref(5);
const filterAvailable = ref(false);
const showModal = ref(false);
const showEditModal = ref(false);
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

const newSlot = ref({
  start_date: "",
  end_date: "",
  location: "",
  photographId: "",
});

const filteredSlots = computed(() => {
  return filterAvailable.value
    ? mySlots.value.filter((slot) => !slot.isReserved)
    : mySlots.value;
});

const fetchData = async () => {
  try {
    const userData = await $api(`/users/${id}`);
    user.value = userData;

    editUser.value = {
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      description: user.value.description,
      price: user.value.price.toFixed(2) || "",
      stuff: user.value.stuff?.join(", ") || "",
    };

    if (userData.isPhotograph) {
      mySlots.value = await fetchSlots("photograph");
      gallery.value =
        (await $api(`/gallery/user/${id}`)).galleries[0]?.urls || [];
      if (authStore.user._id === id) {
        slots.value = await fetchSlots("customer");
      }
    } else {
      slots.value = await fetchSlots("customer");
    }

    rating.value = computeRating(userData.rating);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    loadingError.value = true;
  }
};

const fetchSlots = async (type) => {
  try {
    const response = await $api(`/users/${id}/slots`, { params: { type } });
    return (
      response?.sort(
        (a, b) => new Date(a.start_date) - new Date(b.start_date)
      ) || []
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des créneaux :", error);
    return [];
  }
};

const computeRating = (ratings) => {
  return (
    ratings?.reduce((acc, rating) => acc + rating, 0) /
      (ratings?.length || 1) || 0
  );
};

const createSlot = async () => {
  try {
    console.log("here");
    const response = await $api("/slots", {
      method: "POST",
      body: { ...newSlot.value, photographId: id },
    });

    if (response && response._id) {
      mySlots.value = [...mySlots.value, response].sort((a, b) => {
        return new Date(a.start_date) - new Date(b.start_date);
      });

      showModal.value = false;
    } else {
      console.warn("Erreur : la réponse de création du créneau est invalide.");
    }
  } catch (error) {
    console.error("Erreur lors de la création du créneau :", error);
  }
};

const handleSlotDeleted = (slotId) => {
  mySlots.value = mySlots.value.filter((slot) => slot._id !== slotId);
};

const updateUserProfile = async () => {
  try {
    const updatedData = {
      firstName: editUser.value.firstName,
      lastName: editUser.value.lastName,
      description: editUser.value.description,
      price: user.value.isPhotograph ? editUser.value.price : undefined,
      stuff: user.value.isPhotograph
        ? editUser.value.stuff.split(",").map((item) => item.trim())
        : undefined,
    };

    const response = await $api(`/users/${id}`, {
      method: "PUT",
      body: updatedData,
    });

    authStore.user.firstName = updatedData.firstName;
    authStore.user.lastName = updatedData.lastName;
    authStore.user.description = updatedData.description;

    if(user.value.isPhotograph) {
      authStore.user.price = updatedData.price;
      authStore.user.stuff = updatedData.stuff;
    }

    const userCookie = useCookie('authUser')
    userCookie.value = authStore.user;

    if (response) {
      Object.assign(user.value, updatedData);
      showEditModal.value = false;
      console.log("Profil mis à jour avec succès !");
    } else {
      console.warn("Erreur lors de la mise à jour du profil.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
  }
};

onMounted(fetchData);
</script>
