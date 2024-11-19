import { useCookie } from '#app';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);
  const user = ref<any | null>(null);

  // Charger l'auth depuis les cookies
  const loadAuthFromCookies = () => {
    const tokenCookie = useCookie('authToken');
    const userCookie = useCookie('authUser');

    token.value = tokenCookie.value ?? null;
    user.value = userCookie.value;

    if (!token.value || !user.value) {
      clearAuth();
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
    if (token.value === null && user.value === null) {
      console.log('Déconnexion réussie');
    }
  };

  return {
    token,
    user,
    loadAuthFromCookies,
    setAuth,
    clearAuth,
  };
});
