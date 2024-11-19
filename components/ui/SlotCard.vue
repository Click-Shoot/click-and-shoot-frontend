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
        @click="requireConfirmation()"
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


  <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                    <i class="pi pi-question text-5xl"></i>
                </div>
                <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                <p class="mb-0">{{ message.message }}</p>
                <div class="flex items-center gap-2 mt-6">
                    <Button label="Save" @click="acceptCallback"></Button>
                    <Button label="Cancel" outlined @click="rejectCallback"></Button>
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
  customersId: string;
  isReserved: boolean;
}

const props = defineProps<{ slot: Slot }>();

const confirm = useConfirm();
const toast = useToast();

const requireConfirmation = () => {
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'Please confirm to proceed.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            reserveSlot();
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
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
  console.log('Slot ID:', props.slot._id);
  console.log('Customer ID:', authStore.user._id);
  await $api('/slots/reserve', {
    method: 'POST',
    body: {
    slotId: props.slot._id,
    customersId: authStore.user._id,
  }
});
};
</script>

<style scoped>
</style>
