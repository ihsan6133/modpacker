<script lang="ts">
    import ModCard from "./ModCard.svelte";
    import AddModCard from "./AddModCard.svelte";
    import type { Mod } from "./ModApi";
    
    export let mods: Mod[];
</script>

<div class="mod-list">
    <AddModCard on:addmod/>
    {#each mods as mod}
        <ModCard modData={mod}/>
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
