<script lang="ts">
    import ModCard from "./ModCard.svelte";
    import AddModCard from "./AddModCard.svelte";
    import type { Mod } from "./ModApi";
    import { mods, gameVersion, modLoader } from "./stores";

    function removeMod(modId: number) {
        $mods = $mods.filter(mod => mod.id !== modId);
    }
</script>

<div class="mod-list">
    <AddModCard on:addmod/>
    {#each $mods as mod}
        <ModCard mod={mod} on:removemod={()=>removeMod(mod.id)}/>
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
