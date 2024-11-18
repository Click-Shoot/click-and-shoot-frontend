// plugins/api.ts
export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: 'http://localhost:3000/api', 
    onRequest({ options }) {
      // const token = localStorage.getItem('token') || useCookie('token').value;
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzNiYmRkNjdhMDU0ZWZlZjI2N2U0ODEiLCJlbWFpbCI6IkVub2NoLkFuYXN0YXNpYUBjbGlja2FuZHNob290LmZyIiwiZXhwIjoxNzMxOTcyMTYyfQ.NqE-WQJc3nq3u_dZYO0tCodV9Eg9b6FVrpZrve6ZpXI';
      
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
        navigateTo('/login');
      }
    }
  });

  return {
    provide: {
      api
    }
  };
});
