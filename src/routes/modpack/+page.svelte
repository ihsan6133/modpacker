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
    import { mods, gameVersion, modLoader } from './stores';

    export let data: PageData;
    
    $mods = data.mods;
    $gameVersion = data.version ?? data.minecraftVersions[0];
    $modLoader = data.modLoader ?? "forge";
    
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
    
    function generateModPackUrl(mods: Mod[], version: string, modloader: string) {
        let modsQuery = "";
        
        if (mods.length > 0) {
            let modIds: Int32Array = new Int32Array(mods.map(mod => mod.id));         
            let base64: string = encode(modIds.buffer);
            modsQuery = `mods=${base64}`;
        }


        return `${$page.url.origin}/modpack?${modsQuery}&version=${version}&modloader=${modloader}`;
    }

    $: browser && window.history.replaceState(window.history.state, "", generateModPackUrl($mods, $gameVersion, $modLoader));
    
    // $: goto(generateModPackUrl(selectedMods, selectedVersion, selectedModLoader), {replaceState: true});
    function onExport() {}

</script>

<div class="container" class:scroll-lock={isScrollLocked}>
    <Header msg={"New Modpack"}/>
    
    <Controls on:save={saveMenu.show} on:download={downloadMenu.show} on:export={onExport}/>

    <ModList on:addmod={addModMenu.show}/>
    
    <AddModMenu bind:isOpen={addModMenuOpen} bind:this={addModMenu}/>
    <DownloadMenu bind:isOpen={downloadMenuOpen} bind:this={downloadMenu}/>
    <SaveMenu  bind:isOpen={saveMenuOpen} bind:this={saveMenu}/>
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