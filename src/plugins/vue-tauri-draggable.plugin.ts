import vueTauriDraggable from 'vue-tauri-draggable';

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(vueTauriDraggable);
});
