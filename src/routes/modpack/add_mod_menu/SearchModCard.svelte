<script lang="ts">
    import type { Mod } from "../ModApi";
    import { createEventDispatcher } from "svelte";
    
    export let modData: Mod;
    export let selectedMods: Mod[];
   
    let alreadyAdded = false;
    $: alreadyAdded = selectedMods.some(mod => mod.id === modData.id);
    
    let title = "";
    $: title = alreadyAdded ? "This mod is already added the the modpack" : "Add mod";

    
    const dispatch = createEventDispatcher();
    
    function onClick() {
        dispatch("modadded", modData);
    }
</script>

<button class="container" class:disabled={alreadyAdded} on:click={onClick} title={title} disabled='{alreadyAdded}' >
    <img src={modData.thumbnailUrl} alt="thumbnail">
    <div class="info">
        <h3>{modData.name}</h3>
        <div>{modData.description}</div>
    </div>
</button>

<style>
    .container {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background-color: var(--color-bg-1);
        text-align: left;
    }

    .container:not(.disabled):hover{
        background-color: var(--color-bg-2);
    }

    h3 {
        margin: 0;
        font-weight: normal;
    }

    img {
        width: 70px;
        height: 70px;
        object-fit: contain;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .disabled {
        cursor: default;
        opacity: 0.5;
    }
</style>