// plugins/api.ts
export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: 'http://localhost:3000/api', 
    onRequest({ options }) {
      const token = useCookie('authToken').value;      
      if (token) {
          options.headers.set('Authorization', `Bearer ${token}`);
      }
    },
    onResponse({ response }) {
      // Optionnel : traitement des réponses
    },
    onResponseError({ response }) {
      console.error(response);
      if (response.status === 401) {
        navigateTo('/auth');
      }
    }
  });

  return {
    provide: {
      api
    }
  };
});
