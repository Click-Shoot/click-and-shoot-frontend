<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
      <!-- Tabs Login/Signup -->
      <div class="flex justify-between mb-6">
        <button 
          :class="tab === 'login' ? 'text-primary-mid border-b-2 border-primary-mid' : 'text-gray-500'"
          @click="tab = 'login'"
          class="px-4 py-2 font-semibold"
        >
          Login
        </button>
        <button 
          :class="tab === 'signup' ? 'text-primary-mid border-b-2 border-primary-mid' : 'text-gray-500'"
          @click="tab = 'signup'"
          class="px-4 py-2 font-semibold"
        >
          Signup
        </button>
      </div>

      <!-- Form content -->
      <div v-if="tab === 'login'">
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="email" type="email" id="email" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="password" type="password" id="password" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <button type="submit" class="bg-primary-mid text-white py-2 px-4 rounded w-full">Login</button>
        </form>
      </div>

      <!-- Signup Form -->
      <div v-if="tab === 'signup'">
        <form @submit.prevent="handleSignup">
          <div class="mb-4">
            <label for="signup-email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="signupData.email" type="email" id="signup-email" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div class="mb-4">
            <label for="signup-password" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="signupData.password" type="password" id="signup-password" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div class="mb-4">
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input 
              v-model="signupData.confirmPassword" 
              type="password" 
              id="confirm-password" 
              class="mt-1 p-2 w-full border rounded-md" 
              :class="signupData.confirmPassword && signupData.password !== signupData.confirmPassword ? 'border-red-500' : ''"
              required 
            />
            <span v-if="signupData.confirmPassword && signupData.password !== signupData.confirmPassword" class="text-red-500 text-sm">
              Passwords do not match!
            </span>
          </div>

          <div class="mb-4 flex items-center">
            <input v-model="signupData.isPhotographer" type="checkbox" id="photographer-checkbox" class="mr-2">
            <label for="photographer-checkbox" class="text-sm text-gray-700">Are you a photographer?</label>
          </div>

          <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded w-full">Signup</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  middleware: 'auth',
});

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const loginError = ref<string | null>(null);

const handleLogin = async () => {
  try {
    // Exemple d'appel API pour authentifier l'utilisateur
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      throw new Error('Échec de l’authentification');
    }

    const data = await response.json();

    // Stocker les infos utilisateur et token dans le store
    authStore.setAuth(data.user, data.token);

    // Rediriger l'utilisateur
    router.push('/');
  } catch (error) {
    loginError.value = (error as Error).message;
  }
};

const tab = ref('login')

const signupData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  isPhotographer: false
})
</script>

<style scoped>
/* Some custom styling if needed */
</style>
