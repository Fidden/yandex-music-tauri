import Skeleton from 'vue-loading-skeleton';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Skeleton);
});
