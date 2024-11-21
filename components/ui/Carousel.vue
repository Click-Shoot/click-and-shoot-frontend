<!-- Slider.vue -->
<template>
  <div class="slider-container">
    <button @click="prev" class="slider-button left" :disabled="index === 0">‹</button>
    <div class="slider-wrapper">
      <div
        v-for="(category, i) in visibleCategories"
        :key="category.id"
        class="slider-item"
      >
        <div class="rectangle">
          <img :src="`/assets/${category.image}`" :alt="category.name" class="rectangle-image" />
          <p class="rectangle-title">{{ category.name }}</p>
        </div>
      </div>
    </div>
    <button @click="next" class="slider-button right" :disabled="index >= maxIndex">›</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import categoriesData from '@/data/tags.json'; 

const categories = ref(categoriesData);
const numVisible = 5; 
const index = ref(0);

const maxIndex = categories.value.length - numVisible;

const visibleCategories = computed(() => {
  return categories.value.slice(index.value, index.value + numVisible);
});

const prev = () => {
  if (index.value > 0) {
    index.value -= 1;
  }
};

const next = () => {
  if (index.value < maxIndex) {
    index.value += 1;
  }
};
</script>

<style scoped>
.slider-container {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 1000px;
  overflow: hidden;
  border-radius: 8px;
  margin: auto;
}

.slider-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
  gap: 15px;
}

.slider-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rectangle {
  flex-grow: 1;
  color: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  text-align: center;
  position: relative;
}

.rectangle-image {
  width: 100%;
  height: 140px;
  border-radius: 4px;
}

.rectangle-title {
  position: absolute;
  bottom: 0;
  font-size: 14px;
}

.slider-button {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.slider-button.left {
  left: 0;
}

.slider-button.right {
  right: 0;
}

.slider-button:focus {
  outline: none;
}
</style>
