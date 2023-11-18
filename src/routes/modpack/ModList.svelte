<script lang="ts">
    import ModCard from "./ModCard.svelte";
    import AddModCard from "./AddModCard.svelte";
    import type { Mod } from "./ModApi";
    
    export let mods: Mod[];
    export let selectedVersion: string;
    export let selectedModLoader: string;

    function removeMod(modId: number) {
        mods = mods.filter(mod => mod.id !== modId);
    }
</script>

<div class="mod-list">
    <AddModCard on:addmod/>
    {#each mods as mod}
        <ModCard selectedModLoader={selectedModLoader} selectedVersion={selectedVersion} modData={mod} on:removemod={()=>removeMod(mod.id)}/>
    {/each}
</div>

<style>
    .mod-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
    }
</style>
