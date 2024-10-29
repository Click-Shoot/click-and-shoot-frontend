<template>
  <header class="shadow-md">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <img src="" alt="Logo" class="h-10 w-auto" />
        <span class="ml-3 text-xl font-semibold text-gray-700">Click and Shoot</span>
      </div>

      <!-- <nav class="hidden md:flex space-x-8 text-gray-600">
        <NuxtLink to="/" class="hover:text-blue-500">Home</NuxtLink>
        <NuxtLink to="/about" class="hover:text-blue-500">About</NuxtLink>
        <NuxtLink to="/gallery" class="hover:text-blue-500">Gallery</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-blue-500">Contact</NuxtLink>
      </nav> -->

      <div>
        <NuxtLink to="/auth" class="bg-primary-mid text-white py-2 px-4 rounded hover:bg-primary-dark">
          Connexion / Inscription
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
header {
  background: #FFF;
  border-bottom: 1px solid #D7DBE7;
}
</style>
