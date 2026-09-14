import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { router } from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from './stores/auth.ts';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore(pinia);

await authStore.init();

app.use(router);
app.mount('#app');
