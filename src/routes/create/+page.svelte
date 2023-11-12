<script lang="ts">
    import '../styles.css'
    import Header from '../Header.svelte';
    import ModList from './ModList.svelte';
    import AddModMenu from './add_mod_menu/AddModMenu.svelte';
    import type { Mod } from './ModApi';

    let selectedMods: Mod[] = [];

    let addModMenu: AddModMenu;
    
    
    function onModAdded(event: CustomEvent<Mod>) {
        selectedMods = [...selectedMods, event.detail];
    }

    function saveModpack(event: MouseEvent) {
        console.log(selectedMods);
    }

    function exportModpack(event: MouseEvent) {
        console.log(selectedMods);
    }

    function downloadModpack(event: MouseEvent) {
        console.log(selectedMods);
    }
    
</script>

<div class="container">
    <Header msg={"New Modpack"}/>
    
    <div class="buttons">
        <button on:click={saveModpack}>Save</button>
        <button on:click={exportModpack}>Export</button>
        <button on:click={downloadModpack}>Download</button>
    </div>

    <ModList bind:mods={selectedMods} on:addmod={()=>{addModMenu.open()}}/>
    <AddModMenu bind:selectedMods={selectedMods} bind:this={addModMenu} on:modadded={onModAdded}/>
    
</div>

<style>
    .container {
        position: relative;
        height: 100%;
    }
    
    .buttons {
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

</style>