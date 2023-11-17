<script lang="ts">
    import Window from "../../../components/Window.svelte";
    import TextInput from "../../../components/input/TextInput.svelte";
    import type { Mod } from "../ModApi";
    
    export let isOpen: boolean = false;
    export let loadedMods: Mod[];
    export let selectedVersion: string;
    export let selectedModLoader: string;

    export function show() {
        window.show();
    }

    let window: Window;

    let modPackName: string;
    $: modPackName = `${selectedVersion}-${selectedModLoader}-pack.zip`;


    function onSave() {
        console.log(loadedMods);
        
        let savedModpacks = JSON.parse(localStorage.getItem("savedModpacks") || "[]");
        savedModpacks.push({
            name: modPackName,
            version: selectedVersion,
            modLoader: selectedModLoader,
            mods: loadedMods.map(mod => {return {
                id: mod.id,
                name: mod.name,
            }})
        });
        localStorage.setItem("savedModpacks", JSON.stringify(savedModpacks));
        window.close();
    }   
</script>

<Window bind:this={window} bind:isOpen hasCloseButton={true}>
    <div class="container">
        <h1>Save Modpack</h1>
        <TextInput bind:value={modPackName} label={"Name:"} button={"Save"} on:submit={onSave}/>
    </div>
</Window>

<style>
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h1 {
        font-size: 1.5rem;
        color: var(--color-text);
        font-weight: 400;
    }


</style>