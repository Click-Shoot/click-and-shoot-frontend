<template>
  <div class="border rounded-lg shadow-md p-4 bg-white flex flex-col h-full">
    <div class="relative mb-4">
      <div class="w-full h-32 bg-gray-200 rounded">
        <img :src="photograph.avatar" alt="Photograph" class="w-full h-full object-cover rounded" />
      </div>
      <span class="absolute top-2 right-2 bg-primary-mid text-white text-xs px-2 py-1 rounded">??</span>
    </div>
    <div class="text-lg font-semibold">{{ photograph.firstName }} {{ photograph.lastName }}</div>
    <p class="text-sm text-gray-500 flex-grow">{{ photograph.description }}</p>
    <div class="mt-auto flex justify-between items-center">
      <div>
        <p class="text-primary-mid font-bold">$200.25</p>
      </div>
      <button @click="goToUser(photograph._id)" class="bg-primary-mid text-white px-3 py-1 rounded hover:bg-primary-dark">Voir</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  photograph: {
    type: Object,
    required: true,
    default: {},
  },
});

const { photograph } = props;
const router = useRouter(); 

const goToUser = (id: string) => {
  router.push(`/photographe/${id}`);
};
</script>

<style scoped>
</style>
