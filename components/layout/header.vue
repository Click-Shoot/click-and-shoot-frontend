<!-- components/Navbar.vue -->
<template>
  <nav class="flex items-center justify-between p-4 bg-white shadow-md">
    <div class="flex items-center space-x-4">
      <!-- <img src="/logo.png" alt="OpenDoor Logo" class="h-8 w-auto" /> -->
      <h2>LOGO</h2>
    </div>
    <div class="flex items-center space-x-4">
      <ul class="flex items-center space-x-4">
        <li>
          <a href="/" class="text-gray-700 hover:text-primary-mid">Accueil</a>
        </li>
        <li>
          <a href="#" class="text-gray-700 hover:text-primary-mid">Contact</a>
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
