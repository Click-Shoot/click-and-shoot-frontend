<template>
  <div class="w-full flex justify-center">
    <div class="banner mt-8 w-2/3 flex gap-4 justify-center items-center py-4 rounded-xl bg-primary-mid">
      <span class="banner-text font-bold">C'est le moment de capturer vos souvenirs !</span>
      <a href="#" class="banner-button px-3 py-2 rounded-xl bg-button-primary-mid hover:bg-button-primary-dark">
        <span class="icon">📸 </span> Réservez une séance photo
      </a>
  </div>
  </div>

  <CategoryCard />
</template>

<script setup lang="ts">
import CategoryCard from "~/components/ui/CategoryCard.vue";

</script>

<style scoped lang="scss">

  .banner {
    color: white;
  }


</style>