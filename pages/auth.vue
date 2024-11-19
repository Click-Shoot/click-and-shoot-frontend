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
            <input v-model="loginData.email" type="email" id="email" class="mt-1 p-2 w-full border rounded-md" required />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input v-model="loginData.password" type="password" id="password" class="mt-1 p-2 w-full border rounded-md" required />
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

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useCookie } from 'nuxt/app';

definePageMeta({
  middleware: 'auth',
});

const router = useRouter();

// onMounted(() => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     console.log("Token trouvé, redirection vers le dashboard...");
//     router.push('/'); // Change '/dashboard' par l'URL de redirection
//   }
// });

// Data for login and signup forms
const tab = ref('login') // 'login' or 'signup'
const loginData = ref({
  email: '',
  password: ''
})

const signupData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  isPhotographer: false
})

// Handlers for form submission
async function handleLogin() {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    if (!response.ok) {
      throw new Error("Échec de l'authentification.");
    }

    const data = await response.json();

    if (data.token) {
      const tokenCookie = useCookie('auth_token', { secure: true, sameSite: 'strict' }); // Cookie sécurisé pour le token
      const userCookie = useCookie('auth_user', { secure: true, sameSite: 'strict' }); // Cookie sécurisé pour l'utilisateur
      
      tokenCookie.value = data.token;
      userCookie.value = JSON.stringify(data.user); // Les objets doivent être transformés en chaînes de caractères
    } else {
      console.warn("Aucun token trouvé dans la réponse de l'API.");
    }

    console.log("Utilisateur authentifié :", data);

    // Effectuer une redirection ou d'autres actions
  } catch (error) {
    console.error("Erreur:", error);
  }

  
  
}


const handleSignup = () => {
  if (signupData.value.password !== signupData.value.confirmPassword) {
    alert("Passwords do not match!")
    return
  }
  // Handle signup logic
  console.log("Signup", signupData.value)
}
</script>

<style scoped>
/* Some custom styling if needed */
</style>
