<script lang="ts">
    import { tooltip } from "../../components/tooltip";
    import AddModCard from "./AddModCard.svelte";
    import type { FileIndex, Mod } from "./ModApi";
    import { fetchLatestFiles } from "./ModApi";
    import { createEventDispatcher } from "svelte";

    export let modData: Mod;
    export let selectedVersion: string;
    const dispatch = createEventDispatcher();
    
    let fileIndexes: FileIndex[];
    
    async function promise() {
        fileIndexes = await fetchLatestFiles(modData.id);
    }


</script>

<div class="container">
    <img src={modData.thumbnailUrl} alt="thumbnail">
    <div class="info">
        <div class="header">
            <h3>{modData.name}</h3>
            
            <div class="control">
                {#await promise()}
                <div class="loading-circle"></div>
                {:then _}
                {#if !fileIndexes.some(file=>file.gameVersion === selectedVersion)}
                    <div use:tooltip title={`Not available for version ${selectedVersion}`} class="status-container">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="#ff2424"></path></g>
                        </svg>  
                    </div>
                {/if}
                {/await}

                <button title="Remove mod" class="remove-btn" on:click={()=>dispatch("removemod")}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Remove_Minus"> <path id="Vector" d="M6 12H18" stroke="#e3e3e3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>               
                </button>

            </div>
        </div>
        <div>{modData.description}</div>
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

    .loading-circle {
        width: 25px;
        height: 25px;
        border-width: 3px;
        box-sizing: border-box;

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