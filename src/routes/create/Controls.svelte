<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { ChangeEventHandler } from "svelte/elements";
    import type { PageData } from "../$types";
    export let minecraftVersions: string[];
    console.log(minecraftVersions);
    
    export let selectedVersion: string = minecraftVersions[0];
    export let selectedModLoader: string;

    const dispatch = createEventDispatcher();

    function saveModpack(event: MouseEvent) {
        dispatch("save");
    }

    function exportModpack(event: MouseEvent) {
        dispatch("export");
    }

    function downloadModpack(event: MouseEvent) {
        dispatch("download");
    }

</script>

<div class="container">
    <div class="flex">
        <button on:click={saveModpack}>Save</button>
        <button on:click={exportModpack}>Export</button>
        <button on:click={downloadModpack}>Download</button>
    </div>
    

    <div class="flex">
        <select name="version" id="" bind:value={selectedVersion}>
            {#each minecraftVersions as version}
                <option value={version}>{version}</option>
            {/each}
        </select>
        <select name="modloader" bind:value={selectedModLoader}>
            <option value="forge">Forge</option>
            <option value="fabric">Fabric</option>
            <option value="cauldron">Cauldron</option>
            <option value="liteloader">LightLoader</option>
            <option value="quilt">Quilt</option>
        </select>
    </div>
</div>

<style>
    
    .container {
        flex-wrap: wrap;
        padding: 1rem 1rem 0;
        display: flex;
        justify-content: space-around;
        gap: 1rem;
    }
    button {
        flex: 1;
        font-size: 1.2rem;
        padding: 0.5rem;
    }

    select {
        flex: 1;
        font-size: 1.2rem;
        padding: 0.5rem;
        padding-right: 2rem;
        box-sizing: border-box;
        position: relative;
    }

    .flex {
        display: flex;
        justify-content: space-around;
        flex: 1 1 auto;
        gap: 1rem;
    }
    
</style>