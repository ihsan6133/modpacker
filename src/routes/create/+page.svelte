<script lang="ts">
    import '../styles.css'
    import Header from '../Header.svelte';
    import ModList from './ModList.svelte';
    import Controls from './Controls.svelte';
    import AddModMenu from './add_mod_menu/AddModMenu.svelte';
    import type { Mod } from './ModApi';
    import type { PageData } from './$types';
    import DownloadMenu from './download_menu/DownloadMenu.svelte';

    export let data: PageData;
    
    let selectedMods: Mod[] = [];

    let addModMenu: AddModMenu;
    let downloadMenu: DownloadMenu;
    let isScrollLocked: boolean = false;

    $: {
        if (addModMenuOpen || downloadMenuOpen) {
            isScrollLocked = true;
        } else {
            isScrollLocked = false;
        }
    }
    // detect any menu change event and react
    let addModMenuOpen: boolean;
    let downloadMenuOpen: boolean;
    

    let selectedVersion: string;
    let selectedModLoader: string;
    
    function onSave(event: CustomEvent) {
        selectedMods
    }

    $: console.log(selectedVersion);
</script>

<div class="container" class:scroll-lock={isScrollLocked}>
    <Header msg={"New Modpack"}/>
    
    <Controls bind:selectedVersion bind:selectedModLoader minecraftVersions={data.minecraftVersions} on:save={onSave} on:download={downloadMenu.show}/>

    <ModList selectedVersion={selectedVersion} bind:mods={selectedMods} on:addmod={addModMenu.show}/>
    
    <AddModMenu bind:isOpen={addModMenuOpen} bind:selectedMods={selectedMods} bind:this={addModMenu}/>
    <DownloadMenu bind:isOpen={downloadMenuOpen} selectedMods={selectedMods} selectedVersion={selectedVersion} selectedModLoader={selectedModLoader} bind:this={downloadMenu}/>
</div>

<style>
    .container {
        position: relative;
        height: 100%;
    }

    .container.scroll-lock {
        overflow: hidden;
    }

</style>