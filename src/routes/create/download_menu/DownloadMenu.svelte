<script lang="ts">
    import { type Mod, type File, fetchFile } from "../ModApi";
    import javaLogo from "$lib/images/Java-Logo.svg";
    import CloseButton from "../CloseButton.svelte";
    import {downloadZip} from 'client-zip'
    
    export function show() {
        isOpen = true;
        dialog.show();
    }

    export let selectedMods: Mod[];
    export let selectedVersion: string;
    export let selectedModLoader: string;
    export let isOpen = false;

    let modPackName: string = `${selectedVersion}-${selectedModLoader}-pack.zip`;
    let modFiles: Record<number, File> = {};
    
    async function loadFiles() {
        modFiles = {};
        await Promise.all(selectedMods.map(async (mod)=> {
            modFiles[mod.id] = await fetchFile(mod.id, selectedVersion, selectedModLoader);
        }));
    }
    function formatBytes(a: any,b=2){if(!+a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return`${parseFloat((a/Math.pow(1024,d)).toFixed(c))} ${["Bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"][d]}`}


    let promise: Promise<void> = Promise.resolve();
    $: selectedMods, selectedVersion, selectedModLoader, promise = loadFiles();
    let dialog: HTMLDialogElement;

    async function downloadMods() {
        const files = [];
        for (let mod of selectedMods) {
            const res = await fetch(modFiles[mod.id].downloadUrl);
            files.push(res);
            console.log(`${mod.name}`);
        }

        const blob = await downloadZip(files).blob();
        const link = document.createElement("a");
        
        return URL.createObjectURL(blob);
    }
</script>

<dialog bind:this={dialog} class="container">
    <header>
        <h1>Download Modpack</h1>
        <CloseButton on:click={()=>{isOpen=false; dialog.close()}}/>
    </header>

    <div class="table-container">
        {#if selectedMods.length === 0}
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
                        {#each selectedMods as mod, i}
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
            {#await downloadMods()}
            Downloading
            {:then url} 
            <a href={url} download={modPackName}>Download</a>    
            {/await}
            {/if}
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

        align-items: center;
        text-align: center;
    }

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

    button {
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