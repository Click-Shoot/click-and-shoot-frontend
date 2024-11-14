<!-- components/Navbar.vue -->
<template>
  <nav class="flex items-center justify-between p-4 bg-white shadow-md">
    <div class="flex items-center space-x-4">
      <!-- <img src="/logo.png" alt="OpenDoor Logo" class="h-8 w-auto" /> -->
      <ul class="flex items-center space-x-4">
        <li>
          <a href="/" class="text-gray-700 hover:text-primary-mid">Home</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-primary-mid">My Property</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-primary-mid">Request</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-primary-mid">Contract</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-primary-mid">About Us</a>
        </li>
      </ul>
    </div>
    <div class="flex items-center space-x-4">
      <button class="text-primary-mid">Setting</button>
      <button class="text-primary-mid">Logout</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Pas de logique spécifique nécessaire pour le moment
</script>

<style scoped>
/* Ajoutez des styles spécifiques au besoin */
</style>
