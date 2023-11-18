<script lang="ts">
    import { onMount } from "svelte";
    import SearchBar from "../../../components/input/SearchBar.svelte";
    import CloseButton from "../CloseButton.svelte";

    import type { Mod } from "../ModApi";
    import { fetchMods, searchMods } from "../ModApi";
    import SearchModCard from "./SearchModCard.svelte";
    import Window from "../../../components/Window.svelte";
    import { mods } from "../stores";
    
    export function show() {
        window.show();
    }

    export let isOpen = false;

    let window: Window;
    let modPromise: Promise<Mod[]> = Promise.resolve([]);

    function onSearch(event: CustomEvent<string>) {
        modPromise = searchMods(event.detail);
    }

    function onModAdded(event: CustomEvent<Mod>) {
        mods.update(mods => [...mods, event.detail]);
        window.close();
    }

</script>

<Window bind:this={window} bind:isOpen hasCloseButton={false}>
    <header>
        <SearchBar on:search={onSearch}/>
        <CloseButton on:click={window.close}/>   
    </header>
    
    <div class="mod-list">
        {#await modPromise}
            <div class="info">Loading..</div>
        {:then mods}
            {#if mods.length === 0}
                <div class="info">No mods found</div>
            {/if}
            {#each mods as mod}
                <SearchModCard mod={mod} on:modadded={onModAdded}/>
            {/each}
        {/await}
    </div>
</Window>


<style>

    .container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;   
        background-color: #151515f5;
        padding: 1rem;
        box-sizing: border-box;     
        border: none; 
    }

    header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    .mod-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;

        overflow-y: auto;
        max-height: calc(100% - 4rem);

    }

    .info {
        color: var(--color-text);
        text-align: center;
    }
</style>