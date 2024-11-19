// stores/auth.ts
import { defineStore } from 'pinia';
import { useCookie } from '#app';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const user = ref<{ firstName: string; lastName: string } | null>(null);

  // Charger l'auth depuis les cookies
  const loadAuthFromCookies = () => {
    const tokenCookie = useCookie('authToken');
    const userCookie = useCookie('authUser');

    token.value = tokenCookie.value ?? null;

    try {
      // Vérifiez si userCookie.value est une chaîne valide avant de la parser
      if (userCookie.value && typeof userCookie.value === 'string') {
        user.value = JSON.parse(userCookie.value);
      } else {
        user.value = null; // Réinitialiser si le format est incorrect
      }
    } catch (error) {
      console.error('Erreur lors du parsing du cookie utilisateur :', error);
      user.value = null; // Réinitialiser si une erreur survient
    }
  };

  // Définir l'auth dans les cookies et l'état
  const setAuth = (userData: { firstName: string; lastName: string }, authToken: string) => {
    const tokenCookie = useCookie('authToken');
    const userCookie = useCookie('authUser');

    tokenCookie.value = authToken;
    userCookie.value = JSON.stringify(userData);
    console.log('userCookie.value', userCookie.value);

    token.value = authToken;
    user.value = userData;
  };

  // Déconnexion
  const clearAuth = () => {
    const tokenCookie = useCookie('authToken');
    const userCookie = useCookie('authUser');

    tokenCookie.value = null;
    userCookie.value = null;

    token.value = null;
    user.value = null;
  };

  return {
    token,
    user,
    loadAuthFromCookies,
    setAuth,
    clearAuth,
  };
});
