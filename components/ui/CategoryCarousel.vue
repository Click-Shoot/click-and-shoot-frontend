<template>
  <div class="relative p-4">
    <h2 class="text-xl font-bold mb-4">Les catégories</h2>
    <div class="flex items-center space-x-2">
      <button
        @click="prev"
        class="absolute left-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        :class="{ 'opacity-50 cursor-not-allowed': isFirstVisible }"
        :disabled="isFirstVisible"
      >
      <Icon name="material-symbols:chevron-left" style="color: black" size="30" />
      </button> 

      <div class="overflow-hidden w-full">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="flex-shrink-0 w-1/5 p-2 cursor-pointer"
          >
            <div class="relative rounded-lg overflow-hidden shadow-md" @click="goToCategory(index)">
              <img
                :src="category.image"
                :alt="category.label"
                class="w-full h-40 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <span class="text-white font-bold">{{ category.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="next"
        class="absolute right-0 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
        :class="{ 'opacity-50 cursor-not-allowed': isLastVisible }"
        :disabled="isLastVisible"
      >
      <Icon name="material-symbols:chevron-right" style="color: black" size="30" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { type Tag } from '@/stores/tags';
import { useTagsStore } from '@/stores/tags';

const tagsStore = useTagsStore();

const router = useRouter(); 

const categories = ref<Tag[]>([]);
const currentIndex = ref(0);
const numVisible = 5;

const maxIndex = computed(() => Math.ceil(categories.value.length / numVisible) - 1);
const isFirstVisible = computed(() => currentIndex.value === 0);
const isLastVisible = computed(() => currentIndex.value >= maxIndex.value);

onMounted(async () => {
  await tagsStore.fetchTags();
  categories.value = tagsStore.getTags();
});

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  }
};

const next = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value += 1;
  }
};

const goToCategory = (index: number) => {
  const categoryId = categories.value[index]._id;
  router.push(`/categorie/${categoryId}`);
};
</script>

<style scoped>
</style>
