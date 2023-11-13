<script lang="ts">
    import { onMount } from "svelte";
    import SearchBar from "./SearchBar.svelte";
    import CloseButton from "./CloseButton.svelte";

    import type { Mod } from "../ModApi";
    import { fetchMods } from "../ModApi";
    import SearchModCard from "./SearchModCard.svelte";
    
    export function open() {
        dialog.show();
    }

    export let selectedMods: Mod[];


    let dialog: HTMLDialogElement;

    let modPromise: Promise<Mod[]> = Promise.resolve([]);

    function onSearch(event: CustomEvent<string>) {
        modPromise = fetchMods(event.detail);
    }

    function isModAlreadySelected(mod: Mod): boolean {
        let boolean = selectedMods.some(selectedMod => selectedMod.id === mod.id);
        
        return boolean;
    }

    function onModAdded(event: CustomEvent<Mod>) {
        dialog.close();
        selectedMods = [...selectedMods, event.detail];
    }

</script>

<dialog bind:this={dialog} class="container" >
    <header>
        <SearchBar on:search={onSearch}/>
        <CloseButton on:click={()=>dialog.close()}/>   
    </header>
    
    <div class="mod-list">
        {#await modPromise}
            <div class="info">Loading..</div>
        {:then mods}
            {#if mods.length === 0}
                <div class="info">No mods found</div>
            {/if}
            {#each mods as mod}
                <SearchModCard alreadyAdded={isModAlreadySelected(mod)} modData={mod} on:modadded={onModAdded}/>
            {/each}
        {/await}
    </div>
</dialog>


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