<script lang="ts">
    import { tooltip } from "../../components/tooltip";
    import type { FileIndex, Mod } from "./ModApi";
    import { createEventDispatcher } from "svelte";
    import { gameVersion, modLoader } from "./stores";

    export let mod: Mod;

    const dispatch = createEventDispatcher();
    
    function getCompatibility(selectedVersion: string, selectedModLoader: string) {
        const fileIndexes = mod.latestFileIndexes;
        let statusLevel = "";
        let message: string = "";

        let [ ,selectedMinorVersion, selectedPatchVersion] = selectedVersion.split(".");

        if (selectedPatchVersion === undefined) {
            selectedPatchVersion = "0";
        }

        const patchVersions = fileIndexes.filter(file=>{
            return file.gameVersion.split(".")[1] === selectedMinorVersion;
        });

        if (patchVersions.length == 0) {
            statusLevel = "error";
            message = `No files available for versions 1.${selectedMinorVersion}.x`;

            return {statusLevel, message};
        }
        
        let patchNumsSorted = patchVersions.sort((a, b)=>{
            let aNum = parseInt(a.gameVersion.split(".")[2] ?? "0");
            let bNum = parseInt(b.gameVersion.split(".")[2] ?? "0");
            return aNum - bNum;
        });

        let patchNumsModLoaderFiltered = patchNumsSorted.filter(file=>{
            return file.modLoader === selectedModLoader;
        });

        if (patchNumsModLoaderFiltered.length == 0) {
            statusLevel = "error";
            message = `No files available for version 1.${selectedMinorVersion}.${selectedPatchVersion} for ${selectedModLoader}`;

            return {statusLevel, message};
        }
        
        console.log(patchNumsModLoaderFiltered);
        
        
        let firstPatchVersion = parseInt(patchNumsModLoaderFiltered[0].gameVersion.split(".")[2] ?? "0");
        if (firstPatchVersion > parseInt(selectedPatchVersion)) {
            statusLevel = "error";
            message = `Available files for minor version 1.${selectedMinorVersion}.x are higher than the selected version ${selectedVersion}`;
            return {statusLevel, message};
        }
        
        let filtered = patchNumsModLoaderFiltered.filter(file=>{
            return parseInt(file.gameVersion.split(".")[2] ?? "0") <= parseInt(selectedPatchVersion);
        });

        console.log("filtered", filtered);
        

        let last = filtered.pop() as FileIndex;
        if (last.gameVersion !== selectedVersion) {
            statusLevel = "warning";
            message = `Available patch version ${last.gameVersion} is lower than the selected version ${selectedVersion}`;
            return {statusLevel, message};
        }
        else {
            statusLevel = "success";
            message = `Mod is compatible with selected version ${selectedVersion}`;
            return {statusLevel, message};
        }
    }

    let compatibility: {statusLevel: string, message: string};
    $: compatibility = getCompatibility($gameVersion, $modLoader);

</script>

<div class="container">
    <img src={mod.thumbnailUrl} alt="thumbnail">
    <div class="info">
        <div class="header">
            <h3>{mod.name}</h3>
            
            <div class="control">
                {#if compatibility.statusLevel === "error"}
                    <div use:tooltip title={compatibility.message} class="status-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="#ff2424"></path></g>
                        </svg>
                    </div>
                {:else if compatibility.statusLevel === "warning"}
                    <div use:tooltip title={compatibility.message} class="status-container">
                        <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#dcbc1e" transform="translate(32.000000, 42.666667)"> <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z M224,272 C208.761905,272 197.333333,283.264 197.333333,298.282667 C197.333333,313.984 208.415584,325.248 224,325.248 C239.238095,325.248 250.666667,313.984 250.666667,298.624 C250.666667,283.264 239.238095,272 224,272 Z M245.333333,106.666667 L202.666667,106.666667 L202.666667,234.666667 L245.333333,234.666667 L245.333333,106.666667 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>                    </div>
                {/if}
                <button title="Remove mod" class="remove-btn" on:click={()=>dispatch("removemod")}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Remove_Minus"> <path id="Vector" d="M6 12H18" stroke="#e3e3e3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>               
                </button>

            </div>
        </div>
        <div>{mod.description}</div>
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background-color: var(--color-bg-1);
    }

    h3 {
        margin: 0;
        font-weight: normal;
    }

    img {
        width: 70px;
        height: 70px;
        object-fit: contain;
    }

    .info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .status-container {
        width: 25px;
        height: 25px;
    }

    svg {
        width: 25px;
        height: 25px;
        fill: #ff0000;
    }

    .control {
        display: flex;
        gap: 0.5rem;
    }
    
    .remove-btn {
        width: 25px;
        height: 25px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 0;
        border-radius: 50%;
    }
    .remove-btn:hover {
        background-color: var(--color-bg-2);
    }
</style>