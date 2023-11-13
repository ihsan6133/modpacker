<script lang="ts">
    import '../styles.css'
    import Header from '../Header.svelte';
    import ModList from './ModList.svelte';
    import Controls from './Controls.svelte';
    import AddModMenu from './add_mod_menu/AddModMenu.svelte';
    import type { Mod } from './ModApi';
    import type { PageData } from './$types';

    export let data: PageData;
    
    let selectedMods: Mod[] = [];

    let addModMenu: AddModMenu;
    let selectedVersion: string;
    
    function onSave(event: CustomEvent) {
        selectedMods
    }

    $: console.log(selectedVersion);
</script>

<div class="container">
    <Header msg={"New Modpack"}/>
    
    <Controls bind:selectedVersion minecraftVersions={data.minecraftVersions} on:save={onSave}/>

    <ModList bind:mods={selectedMods} on:addmod={()=>{addModMenu.open()}}/>
    <AddModMenu bind:selectedMods={selectedMods} bind:this={addModMenu}/>
    
</div>

<style>
    .container {
        position: relative;
        height: 100%;
    }

</style>