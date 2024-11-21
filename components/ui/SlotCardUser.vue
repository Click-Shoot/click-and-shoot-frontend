<template>
  <div v-if="!isCancel" class="border rounded-lg shadow-md p-4 bg-white flex flex-col justify-between h-full min-w-60">
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
    </div>
    <div class="w-1/3 h-2/3 bg-gray-200 rounded">
        <img :src="user.avatar" alt="Photograph" class="w-full h-full object-cover rounded" />
      </div>
  </div>
  <button v-if="slot.isReserved && authStore.user._id === slot.customersId"
        @click="requireConfirmationCancelSlot()"
        class="bg-red-400 text-white px-4 py-2 rounded">
        Annuler ma réservation
      </button>
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

const authStore = useAuthStore();

const { $api } = useNuxtApp();

interface Slot {
  _id: string;
  start_date: string;
  end_date: string;
  location: string;
  photographId: string;
  customersId: string | null;
  isReserved: boolean;
}

const props = defineProps<{ slot: Slot }>();
const user = ref<any>({});
const isCancel = ref(false);


onMounted(async () => {
  try{
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
            toast.add({ severity: 'success', summary: 'Confirmé', detail: 'Vous avez réservé le créneau', life: 3000, closable: true });
            reserveSlot();
        },
        reject: () => {
            confirm.close();
            toast.add({ severity: 'error', summary: 'Annulé', detail: "Vous n'avez pas réservé le créneau", life: 3000 });
        }
    });
};

const requireConfirmationCancelSlot = () => {
  confirm.require({
    group: "headless",
    header: "Confirmation",
    message: "Confirmez-vous l'annulation de de votre réservation ?",

    accept: () => {
      confirm.close();
      toast.add({
        severity: "success",
        summary: "Confirmé",
        detail: "Votre réservation est bien annulé",
        life: 3000,
        closable: true,
      });
      cancelReservation();
    },
    reject: () => {
      confirm.close();
      toast.add({
        severity: "error",
        summary: "Annulé",
        detail: "Vous n'avez pas annulé votre réservation",
        life: 3000,
      });
    },
  });
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

  await $api('/slots/reserve', {
    method: 'POST',
    body: {
    slotId: props.slot._id,
    customersId: authStore.user._id,
  }
});
};

const cancelReservation = async () => {
  await $api(`/slots/${props.slot._id}`, {
    method: 'PUT',
    body: {
      customersId: null,
      isReserved: false
    }
  });

  props.slot.isReserved = false;
  props.slot.customersId = null;


  isCancel.value = true;
};

</script>

<style scoped>
</style>
