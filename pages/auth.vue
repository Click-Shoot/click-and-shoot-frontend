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
          Connexion
        </button>
        <button 
          :class="tab === 'signup' ? 'text-primary-mid border-b-2 border-primary-mid' : 'text-gray-500'"
          @click="tab = 'signup'"
          class="px-4 py-2 font-semibold"
        >
          Inscription
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
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input v-model="password" type="password" id="password" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <button type="submit" class="bg-primary-mid text-white py-2 px-4 rounded w-full">Connexion</button>
          <div v-if="loginError" class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
            {{ loginError }}
            <button @click="loginError = null" class="ml-4 text-gray-200">✕</button>
          </div>
        </form>
      </div>

      <!-- Signup Form -->
      <div v-if="tab === 'signup'">
        <form @submit.prevent="handleSignup">
          <div class="mb-4">
            <label for="signup-firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
            <input v-model="signupData.firstName" type="text" id="signup-firstName" class="mt-1 p-2 w-full border rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="signup-lastName" class="block text-sm font-medium text-gray-700">Nom</label>
            <input v-model="signupData.lastName" type="text" id="signup-lastName" class="mt-1 p-2 w-full border rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="signup-email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="signupData.email" type="email" id="signup-email" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div class="mb-4">
            <label for="signup-password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input v-model="signupData.password" type="password" id="signup-password" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div class="mb-4">
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirmer mot de passe</label>
            <input 
              v-model="signupData.confirmPassword" 
              type="password" 
              id="confirm-password" 
              class="mt-1 p-2 w-full border rounded-md" 
              :class="signupData.confirmPassword && signupData.password !== signupData.confirmPassword ? 'border-red-500' : ''"
              required 
            />
            <span v-if="signupData.confirmPassword && signupData.password !== signupData.confirmPassword" class="text-red-500 text-sm">
              Les mots de passe ne correspondent pas !
            </span>
          </div>

          <div class="mb-4 flex items-center">
            <input v-model="signupData.isPhotographer" type="checkbox" id="photographer-checkbox" class="mr-2">
            <label for="photographer-checkbox" class="text-sm text-gray-700">Etes-vous photographe ?</label>
          </div>

          <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded w-full">S'inscrire</button>
          <div v-if="signupError" class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg">
            {{ signupError }}
            <button @click="signupError = null" class="ml-4 text-gray-200">✕</button>
          </div>
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
loginError.value = null;

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!response.ok) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const data = await response.json();

    authStore.setAuth(data.user, data.token);

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
  firstName: '',
  lastName: '',
  isPhotographer: false
})

const signupError = ref<string | null>(null)

const handleSignup = async () => {
  signupError.value = null
  if (signupData.value.password !== signupData.value.confirmPassword) {
    signupError.value = "Les mots de passe ne correspondent pas.";
    return;
  }
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: signupData.value.firstName,
        lastName: signupData.value.lastName,
        email: signupData.value.email,
        password: signupData.value.password,
        description: 'a',
        rating: [],
        tags: [],
        stuff: [],
        slotsBooked: [],
        isPhotograph: signupData.value.isPhotographer,
      }),
    })
    console.log("response",response)

    if (!response.ok) {
      const message = await response.json()
      signupError.value = message.message 
      return 
    }

    email.value = signupData.value.email
    password.value = signupData.value.password
    handleLogin()
  } catch (error) {
    signupError.value = 'An unexpected error occurred'
    console.error(error)
  }
}

</script>

<style scoped>
</style>
