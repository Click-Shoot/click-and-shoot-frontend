<template>
    <div class="container mx-auto p-4 space-y-8 mt-8">
        <div class="bg-primary-mid text-white p-8 rounded-lg shadow-lg text-center">
            <h1 class="text-3xl font-bold">Nous contacter</h1>
            <p class="mt-2 text-lg">
                Besoin d'aide ou d'informations supplémentaires ? Remplissez le
                formulaire ci-dessous ou contactez-nous directement !
            </p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-lg">
            <h2 class="text-xl font-bold mb-4">Envoyer un message</h2>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
                    <input id="name" v-model="form.name" type="text"
                        class="mt-1 p-2 border border-gray-300 rounded w-full" placeholder="Votre nom" required />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Adresse email</label>
                    <input id="email" v-model="form.email" type="email"
                        class="mt-1 p-2 border border-gray-300 rounded w-full" placeholder="Votre email" required />
                </div>
                <div class="mb-4">
                    <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" v-model="form.message" rows="5"
                        class="mt-1 p-2 border border-gray-300 rounded w-full" placeholder="Votre message"
                        required></textarea>
                </div>
                <button type="submit" class="bg-primary-mid text-white px-4 py-2 rounded hover:bg-primary-dark">
                    Envoyer
                </button>
            </form>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg shadow-lg mb-8">
            <h2 class="text-xl font-bold mb-4">Informations de contact</h2>
            <ul class="space-y-2">
                <li class="flex items-center">
                    <span class="material-icons text-primary-mid mr-2">email</span>
                    <a href="mailto:contact@exemple.com" class="text-blue-600 hover:underline">contact@exemple.com</a>
                </li>
                <li class="flex items-center">
                    <span class="material-icons text-primary-mid mr-2">phone</span>
                    <a href="tel:+33123456789" class="text-blue-600 hover:underline">+33 1 23 45 67 89</a>
                </li>
                <li class="flex items-center">
                    <span class="material-icons text-primary-mid mr-2">place</span>
                    <span>123 Rue de la République, Paris</span>
                </li>
            </ul>
            <div class="mt-4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9908230566353!2d2.2922926156747635!3d48.85884447928727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7ddc5a2393da8ac3!2zNDjCsDUxJzMyLjkiTiAywrAxNScyOC42IkU!5e0!3m2!1sen!2sfr!4v1646780632589!5m2!1sen!2sfr"
                    width="100%" height="200" frameborder="0" style="border:0;" aria-hidden="false"
                    tabindex="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
    name: "",
    email: "",
    message: "",
});

const handleSubmit = () => {
    alert(`Message envoyé par ${form.value.name} : ${form.value.message}`);
    form.value = { name: "", email: "", message: "" };
};
</script>

<style scoped></style>