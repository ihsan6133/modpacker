<script lang="ts">
    import { createEventDispatcher } from "svelte";


    export let placeholder: string = "";
    export let value: string = "";

    export let label: string|null = null;
    export let button: string|null = null;

    // Random 5 digit letter sequence
    const id = Math.random().toString(36).substring(2, 7);
    const dispatch = createEventDispatcher();

    let input: HTMLInputElement;
    function onKeyUp(event: KeyboardEvent) {
        if (event.key === "Enter") {
            dispatch("submit", input.value);
        }
    }
</script>

<div class="container">

    {#if label}
        <label for={id}>{label}</label>
    {/if}

    <input bind:this={input} id={id} type="text" bind:value={value}  placeholder={placeholder} on:keyup={onKeyUp} on:input on:keydown on:keyup>
    
    {#if button}
        <button on:click={()=>dispatch("submit", input.value)}>{button}</button>
    {/if}
</div>


<style>
    .container {
        display: flex;
        gap: 1rem;
        align-items: center;
    }


    label {
        font-size: 1.1rem;
        color: #fff;
    }
    input {
        font-size: 1.1rem;
        padding: 0.4rem;
        box-sizing: border-box;
        background-color: transparent;
        border-bottom: 2px solid #aaa;
        outline: none;
    }

    input::placeholder {
        color: #eee;
    }

    input:hover {
        background-color: var(--color-bg-1);
    }
    input:focus {
        border-bottom-color: var(--color-theme-1);
    }

    button {
        font-size: 1.1rem;
        padding: 0.5rem;
        width: fit-content;
    }
</style>