<script lang="ts">
    import '../styles.css'
    import Header from '../Header.svelte';
    import ModList from './ModList.svelte';
    import Controls from './Controls.svelte';
    import AddModMenu from './add_mod_menu/AddModMenu.svelte';
    import type { Mod } from './ModApi';
    import type { PageData } from './$types';
    import DownloadMenu from './download_menu/DownloadMenu.svelte';
    import SaveMenu from './save_menu/SaveMenu.svelte';
    import { page } from '$app/stores';
    import { encode } from './base64ArrayBuffer';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    export let data: PageData;
    
    let selectedMods: Mod[] = data.mods;

    let addModMenu: AddModMenu;
    let downloadMenu: DownloadMenu;
    let saveMenu: SaveMenu;

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
    let saveMenuOpen: boolean;

    let selectedVersion: string = data.version ?? data.minecraftVersions[0];
    let selectedModLoader: string = data.modLoader ?? "forge";

    function generateModPackUrl(mods: Mod[], version: string, modloader: string) {
        let modsQuery = "";
        
        if (mods.length > 0) {
            let modIds: Int32Array = new Int32Array(mods.map(mod => mod.id));         
            let base64: string = encode(modIds.buffer);
            modsQuery = `mods=${base64}`;
        }


        return `${$page.url.origin}/modpack?${modsQuery}&version=${version}&modloader=${modloader}`;
    }

    $: browser && window.history.replaceState(window.history.state, "", generateModPackUrl(selectedMods, selectedVersion, selectedModLoader));
    
    // $: goto(generateModPackUrl(selectedMods, selectedVersion, selectedModLoader), {replaceState: true});
    function onExport() {
        let modIds: Int32Array = new Int32Array(selectedMods.map(mod => mod.id));         
        let base64: string = encode(modIds.buffer);
        console.log(base64);   
    }
</script>

<div class="container" class:scroll-lock={isScrollLocked}>
    <Header msg={"New Modpack"}/>
    
    <Controls bind:selectedVersion bind:selectedModLoader minecraftVersions={data.minecraftVersions} on:save={saveMenu.show} on:download={downloadMenu.show} on:export={onExport}/>

    <ModList selectedModLoader={selectedModLoader} selectedVersion={selectedVersion} bind:mods={selectedMods} on:addmod={addModMenu.show}/>
    
    <AddModMenu bind:isOpen={addModMenuOpen} bind:selectedMods={selectedMods} bind:this={addModMenu}/>
    <DownloadMenu bind:isOpen={downloadMenuOpen} selectedMods={selectedMods} selectedVersion={selectedVersion} selectedModLoader={selectedModLoader} bind:this={downloadMenu}/>
    <SaveMenu selectedModLoader={selectedModLoader} selectedVersion={selectedVersion} loadedMods={selectedMods}  bind:isOpen={saveMenuOpen} bind:this={saveMenu}/>
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