import Tooltip from "./Tooltip.svelte";

export function tooltip(element: HTMLElement, use: boolean = true) {
	if (!use) return {destroy() {}};
	
	let title: string;
	let tooltipComponent: Tooltip;

	function calculatePosition(event: MouseEvent) {
		let x = event.pageX;
		let y = event.pageY;

		let sizeX = window.innerWidth;
		let sizeY = window.innerHeight;

		if (x + 200 > sizeX) {
			x -= 200;
		}
		if (y + 200 > sizeY) {
			y -= 200;
		}

		return {x, y};
	}

	function mouseEnter(event: MouseEvent) {
		// NOTE: remove the `title` attribute, to prevent showing the default browser tooltip
		// remember to set it back on `mouseleave`
		title = element.getAttribute('title') || 'Tooltip';
		element.removeAttribute('title');

		tooltipComponent = new Tooltip({
			props: {
				title: title,
				pageX: event.pageX,
				pageY: event.pageY
			},
			target: document.body,
		});
	}
	function mouseMove(event: MouseEvent) {
		tooltipComponent.$set({
			pageX: event.pageX,
			pageY: event.pageY,
		})
	}
	function mouseLeave() {
		tooltipComponent.$destroy();
		// NOTE: restore the `title` attribute
		element.setAttribute('title', title);
	}
	
	element.addEventListener('mouseenter', mouseEnter);
    element.addEventListener('mouseleave', mouseLeave);
	element.addEventListener('mousemove', mouseMove);
	
	return {
		destroy() {
			element.removeEventListener('mouseenter', mouseEnter);
			element.removeEventListener('mouseleave', mouseLeave);
			element.removeEventListener('mousemove', mouseMove);
		}
	}
}