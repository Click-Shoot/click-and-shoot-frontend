import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const useStore = useAuthStore();
  if (process.client) {

    useStore.loadAuthFromCookies();
    const router = useRouter();

    if (!useStore.token) {
      return router.push('/');
    }


  }
});