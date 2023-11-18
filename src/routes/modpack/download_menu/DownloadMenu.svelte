<script lang="ts">
    import { type Mod, type File, fetchFile } from "../ModApi";
    import javaLogo from "$lib/images/Java-Logo.svg";
    import CloseButton from "../CloseButton.svelte";
    import {downloadZip} from 'client-zip'
    import { mods, gameVersion, modLoader } from "../stores";
    import Window from "../../../components/Window.svelte";

    export function show() {
        window.show();
    }

    export let isOpen: boolean;

    let window: Window;

    let modPackName: string;
    $: modPackName = `${$gameVersion}-${$modLoader}-pack.zip`;
    
    let modFiles: Record<number, File> = {};
    
    async function loadFiles() {
        modFiles = {};
        await Promise.all($mods.map(async (mod)=> {
            modFiles[mod.id] = await fetchFile(mod.id, $gameVersion, $modLoader);
        }));
    }
    function formatBytes(a: any,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"][d]}`}

    function generateDownloadUrl() {
        const downloadLinks = $mods.map(mod => modFiles[mod.id].downloadUrl);
        const b64 = btoa(JSON.stringify(downloadLinks));
        return `/api/download?downloadLinks=${b64}`;
    }

    let promise: Promise<void> = Promise.resolve();
    
    $: $mods, $gameVersion, $modLoader, promise = loadFiles();
        
    let dialog: HTMLDialogElement;
</script>

<Window bind:this={window} bind:isOpen>
    <header>
        <h1>Download Modpack</h1>
    </header>

    <div class="table-container">
        {#if $mods.length === 0}
            <div class="info">No mods selected</div>
        {:else}
        {#await promise}
            <div class="info">Loading..</div>
        {:then}
            {#if Object.keys(modFiles).length === 0}
                <div class="info">No files found</div>
            {:else}
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>File Name</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $mods as mod, i}
                            <tr>
                                <td>{i}</td>
                                <td>{modFiles[mod.id].fileName}</td>
                                <td>{formatBytes(modFiles[mod.id].fileLength)}</td>
                            </tr>
                        {/each}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <th class="tfoot-total">Total</th>
                            <th>{formatBytes(Object.values(modFiles).reduce((acc, file)=> acc + file.fileLength, 0))}</th>
                        </tr>
                    </tfoot>
                </table>
            {/if}
        {/await}
        {/if}  
    </div>
    <div class="control">
        <div class="input-container">
            <label for="modpack-filename">Name:</label>
            <input bind:value={modPackName} id="modpack-filename" type="text">
        </div>
        {#await promise then}
            {#if isOpen}
                <a href={generateDownloadUrl()} download={modPackName}>Download</a>
            {/if}
        {/await}
    </div>

</Window>

<style>
    header {
        display: flex;
        justify-content: space-between;
    }

    h1 {
        margin: 0;
        
        color: var(--color-text);
        font-weight: 300;
        font-size: 1.4rem;
        flex: 1 1 auto;

        line-height: 50px;
        vertical-align: middle;
        text-align: center;
    }

    .table-container {
        margin-top: 1rem;
        max-height: calc(100% - 180px);
        overflow: auto;
    }
    table {
        width: 100%;
        border-collapse: collapse;
    
    }
    td, th {
        padding: 0.5rem;
        color: var(--color-text);
        border: 1px solid #888;
        text-align: left;
    }

    .info {
        color: var(--color-text);
        text-align: center;
        font-weight: 200;
        right: 25px;
        position: relative;
    }

    .tfoot-total {
        text-align: right;
    }

    .control {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    a {
        background-color: var(--color-bg-2);
        color: var(--color-text);
        font-size: 1.2rem;
        border-radius: 5px;
        padding: 0.4rem;
        width: fit-content;
    }

    input {
        font-size: 1.1rem;
        padding: 0.4rem;
        box-sizing: border-box;
        background-color: transparent;
        border-bottom: 2px solid #aaa;
        outline: none;
        
    }
    input:hover {
        background-color: var(--color-bg-1);
    }
    input:focus {
        border-bottom-color: var(--color-theme-1);
    }

    label {
        color: var(--color-text);
        font-size: 1.1rem;
    }

</style>