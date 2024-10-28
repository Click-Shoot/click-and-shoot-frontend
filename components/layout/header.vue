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
        <NuxtLink to="/auth" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
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
  background:#3A405A;
}
</style>
