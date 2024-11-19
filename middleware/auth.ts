import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const useStore = useAuthStore();
  if (process.client) {

    useStore.loadAuthFromCookies();
    const token = useStore.token; 
    const router = useRouter();

    if (token && to.name === 'auth') {
      console.log('Utilisateur déjà authentifié, redirection...');
      return router.push('/');
    }
  }
});