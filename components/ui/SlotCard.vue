<template>
  <div class="relative border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between h-full min-w-60">
    <button
      v-if="authStore.user._id === slot.photographId"
      @click="deleteSlot()"
      class="absolute top-2 right-2 text-red-500 hover:text-red-700"
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <h3 class="text-lg font-semibold mb-1">{{ user.firstName }} {{ user.lastName }}</h3>
    <div class="flex w-full justify-between">
      <div>
        <p class="text-sm text-gray-500">
          <span class="font-medium">Date :</span> {{ formattedDate }}
        </p>
        <p class="text-sm text-gray-500">
          <span class="font-medium">Heure :</span> {{ formattedStartTime }} - {{ formattedEndTime }}
        </p>
        <p class="text-sm text-gray-500">
          <span class="font-medium">Lieu :</span> {{ slot.location }}
        </p>
        <p v-if="slot.isReserved" class="text-xs text-red-600 mt-2">
          Réservé
        </p>
        <p v-else class="text-xs text-green-600 mt-2">
          Disponible
        </p>
      </div>
      <div class="w-1/3 h-2/3 bg-gray-200 rounded">
        <img :src="user.avatar" alt="Photograph" class="w-full h-full object-cover rounded" />
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <button v-if="!slot.isReserved" @click="requireConfirmation()"
        class="bg-primary-mid text-white px-4 py-2 rounded hover:bg-primary-dark">
        Réserver
      </button>
      <button v-else class="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
        Réservé
      </button>
    </div>
  </div>

  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="flex flex-col items-center p-5 bg-surface-0 rounded">
        <span class="font-bold text-2xl block mb-2">{{ message.header }}</span>
        <p class="mb-0">{{ message.message }}</p>
        <div class="flex items-center gap-2 mt-6">
          <Button label="Oui" @click="acceptCallback"></Button>
          <Button label="Non" outlined @click="rejectCallback"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
  <Toast />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNuxtApp } from '#app';
import { useAuthStore } from '@/stores/auth';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const emit = defineEmits(['slotDeleted']);

const authStore = useAuthStore();

const { $api } = useNuxtApp();

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
const user = ref<any>({});


onMounted(async () => {
  try {
    const data = await $api('/users/' + props.slot.photographId);
    user.value = data;
  } catch (error) {
    console.error(error);
  }
});

const confirm = useConfirm();
const toast = useToast();

const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: 'Confirmation',
    message: 'Confirmez-vous la réservation de ce créneau ?',

    accept: () => {
      confirm.close();
      if (authStore.user._id === props.slot.photographId) {
        toast.add({ severity: 'error', summary: 'Erreur', detail: "Vous ne pouvez pas réserver votre propre créneau", life: 3000 });
      } else {
        toast.add({ severity: 'success', summary: 'Confirmé', detail: 'Vous avez réservé le créneau', life: 3000, closable: true });
        reserveSlot();
      }
    },
    reject: () => {
      confirm.close();
      toast.add({ severity: 'error', summary: 'Annulé', detail: "Vous n'avez pas réservé le créneau", life: 3000 });
    }
  });
};


const deleteSlot = async () => {
  try {
    await $api(`/slots/${props.slot._id}`, { method: 'DELETE' });
    toast.add({ severity: 'success', summary: 'Supprimé', detail: 'Le créneau a été supprimé', life: 3000 });

    // Émettre un événement pour informer le parent
    emit('slotDeleted', props.slot._id);
  } catch (error) {
    console.error('Erreur lors de la suppression du créneau:', error);
    toast.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la suppression du créneau', life: 3000 });
  }
};


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


const reserveSlot = async () => {
  //ne peut pas réserver son propre créneau




  await $api('/slots/reserve', {
    method: 'POST',
    body: {
      slotId: props.slot._id,
      customersId: authStore.user._id,
    }
  });
};
</script>

<style scoped></style>
