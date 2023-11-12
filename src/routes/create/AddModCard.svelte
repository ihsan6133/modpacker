<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<button on:click={()=>{
    dispatch("addmod")
}}>
    <span>Add Mod</span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path></svg>
</button>

<style>
    button {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.4rem;
        font-size: 1.2rem;
        transition-duration: 0.2s;
        background-color: var(--color-bg-1);
        border: 1px solid #888;
    }

    button:hover {
        border-color: var(--color-theme-1);
        color: var(--color-theme-1);
    }

    button:hover svg {
        fill: var(--color-theme-1);
    }

    button:active {
        background-color: var(--color-theme-1);
        color: black;
    }

    button:active svg {
        fill: rgb(78, 78, 78);
    }

    svg {
        fill: var(--color-text);
        height: 20px;
        transition-duration: 0.2s;

    }
</style>