<template>
  <div class="border rounded-lg shadow-md p-4 bg-white">
    <div class="relative mb-4">
      <div class="w-full h-32 bg-gray-200 rounded"></div>
      <span class="absolute top-2 right-2 bg-primary-mid text-white text-xs px-2 py-1 rounded">??</span>
    </div>
    <div class="text-lg font-semibold">{{ photograph.firstName }} {{ photograph.lastName }}</div>
    <p class="text-sm text-gray-500">{{ photograph.description }}</p>
    <div class="mt-4 flex justify-between items-center">
      <div>
        <p class="text-primary-mid font-bold">$200.25</p>
      </div>
      <button class="bg-primary-mid text-white px-3 py-1 rounded hover:bg-primary-dark">Voir</button>
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
</script>

<style scoped>
</style>
