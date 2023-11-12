<script lang="ts">
    import '../styles.css'
    import Header from '../Header.svelte';
    import ModList from './ModList.svelte';
    import AddModMenu from './add_mod_menu/AddModMenu.svelte';
    import type { Mod } from './ModApi';

    let selected_mods: Mod[] = [];

    let addModMenu: AddModMenu;
    
    
    function onModAdded(event: CustomEvent<Mod>) {
        selected_mods = [...selected_mods, event.detail];
    }
    
</script>

<div>
    <Header msg={"New Modpack"}/>
    <ModList bind:mods={selected_mods} on:addmod={()=>{addModMenu.open()}}/>
    <AddModMenu bind:this={addModMenu} on:modadded={onModAdded}/>
</div>

<style>
    div {
        position: relative;
        height: 100%;
    }
</style>