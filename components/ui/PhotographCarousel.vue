<template>
    <div class="relative w-full max-w-4xl mx-auto card flex-grow">
      <div class="mb-4">
        <img :src="images[currentImageIndex]" alt="Image principale" class="w-full h-128 object-cover rounded-lg shadow-md" />
      </div>
  
      <button
        @click="prevImage"
        class="absolute h-fit left-3 bottom-3 bg-button-primary-mid text-white rounded-full p-2 shadow  focus:outline-none"
        :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === 0 }"
        :disabled="currentImageIndex === 0"
      >
        &lt;
      </button>
      <button
        @click="nextImage"
        class="absolute h-fit right-3 bottom-3 bg-button-primary-mid text-white rounded-full p-2 shadow  focus:outline-none"
        :class="{ 'opacity-50 cursor-not-allowed': currentImageIndex === images.length - 1 }"
        :disabled="currentImageIndex === images.length - 1"
      >
        &gt;
      </button>
  
      <div class="flex space-x-2 mt-4 overflow-x-auto justify-center">
        <div
          v-for="(image, index) in images"
          :key="index"
          @click="currentImageIndex = index"
          class="cursor-pointer border-2 rounded overflow-hidden"
          :class="{
            'border-blue-500': index === currentImageIndex,
            'border-transparent': index !== currentImageIndex
          }"
        >
          <img :src="image" alt="Miniature" class="w-16 h-16 object-cover" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';

  const props = defineProps({
  images: {
    type: Array,
    required: true
    },
});
  
  const currentImageIndex = ref(0);
  
  const prevImage = () => {
    if (currentImageIndex.value > 0) {
      currentImageIndex.value--;
    }
  };
  
  const nextImage = () => {
    if (currentImageIndex.value < props.images.length - 1) {
      currentImageIndex.value++;
    }
  };
  </script>
  
  <style scoped>
  </style>
  