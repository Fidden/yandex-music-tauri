export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('keep-scroll-position', {
		updated: () => {
			document.querySelectorAll('[scroll-keeper]').forEach(element => {
				const offset = element.getAttribute('scroll-keeper');
				if (!offset)
					return;

				element.scrollTop = Number.parseFloat(offset);
			});
		},
		created: (el) => {
			el.addEventListener('scroll', (event: Event) => {
				console.log(event, el);
				const target = event.target as HTMLElement;
				if (!target)
					return;

				target.setAttribute('scroll-keeper', String(target.scrollTop));
			});
		}
	});
});
