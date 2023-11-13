<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { ChangeEventHandler } from "svelte/elements";
    import type { PageData } from "../$types";
    export let minecraftVersions: string[];
    export let selectedVersion: string = minecraftVersions[0];
    
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
    <button on:click={saveModpack}>Save</button>
    <button on:click={exportModpack}>Export</button>
    <button on:click={downloadModpack}>Download</button>
    
    <select name="version" id="" bind:value={selectedVersion}>
        {#each minecraftVersions as version}
            <option value={version}>{version}</option>
        {/each}
    </select>

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

    
</style>