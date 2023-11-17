<script lang="ts">
    import { onMount } from "svelte";

	export let title: string;
	export let pageX: number;
	export let pageY: number;

	let position: {x: number, y: number};

	let divHeight: number;
	let divWidth: number;

	function calculatePosition(pageX: number, pageY: number) {
		
		let position = {
			x: pageX,
			y: pageY
		}
		
		if (pageX + divWidth > window.innerWidth) {
			position.x -= divWidth;
		}
		if (pageY + divHeight > window.innerHeight) {
			position.y -= divHeight;
		}
		
		return position;
	}

	onMount(() => {
		position = calculatePosition(pageX, pageY);
	});

	$: position = calculatePosition(pageX, pageY);
	

</script>
<div bind:offsetHeight={divHeight} bind:offsetWidth={divWidth} class="container" style="
		top: {position.y}px;
		left: {position.x}px;">{title}</div>

<style>
	div {
		pointer-events: none;
		box-shadow: inset 0 0 0.5px 1px hsla(0, 0%,  
              100%, 0.075),
              /* shadow ring 👇 */
              0 0 0 1px hsla(0, 0%, 0%, 0.05),
              /* multiple soft shadows 👇 */
              0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
              0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
              0 3.5px 6px hsla(0, 0%, 0%, 0.09);

		background: var(--color-bg-2);
		border-radius: 4px;
		padding: 0.5rem;
		position: absolute;
		width: 200px;
		box-sizing: border-box;
	}

</style>