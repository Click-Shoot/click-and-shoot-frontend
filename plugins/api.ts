// plugins/api.ts
import { useAuthStore } from "@/stores/auth";
export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: 'http://localhost:3000/api',
    onRequest({ options }) {
      const useStore = useAuthStore();
      const token = useStore.token;
      if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
      }
    },
    onResponse({ response }) {
    },
    onResponseError({ response }) {
      console.error(response);
    }
  });

  return {
    provide: {
      api
    }
  };
});
