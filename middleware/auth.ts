export default defineNuxtRouteMiddleware((to, from) => {
  // Vérifie que le code est exécuté côté client
  if (process.client) {
    const authTokenCookie = useCookie('auth_token'); // Récupère le cookie nommé 'auth_token'
    const token = authTokenCookie.value; // Valeur du cookie
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