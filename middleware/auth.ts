import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  // Vérifie que le code est exécuté côté client
  const useStore = useAuthStore();
  if (process.client) {
     // Récupère le cookie nommé 'auth_token'
     useStore.loadAuthFromCookies();
    const token = useStore.token; // Valeur du cookie
    const router = useRouter();


    // Si le token est absent, redirige vers la page de connexion
    // if (!token && to.name !== 'index') {
    //   console.log('Utilisateur non authentifié, redirection...');
    //   return navigateTo('/');
    // }

    // Si déjà authentifié, empêcher l'accès à la page de connexion
    if (token && to.name === 'auth') {
      console.log('Utilisateur déjà authentifié, redirection...');
      return router.push('/'); // Redirige vers une autre page (ex. tableau de bord)
    }
  }
});