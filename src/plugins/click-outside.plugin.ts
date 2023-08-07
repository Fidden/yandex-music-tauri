export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('click-outside', {
		beforeMount(el, binding) {
			el.clickOutsideEvent = (evt: Event) => {
				evt.stopPropagation();
				if (!(el === evt.target || el.contains(evt.target))) {
					binding.value(evt, el);
				}
			};
			window.requestAnimationFrame(() => {
				document.addEventListener('mousedown', el.clickOutsideEvent);
			});
		},
		unmounted(el: any) {
			document.removeEventListener('mousedown', el.clickOutsideEvent);
		}
	});
});
