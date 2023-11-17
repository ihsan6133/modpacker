<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    const dispatch = createEventDispatcher();

    let inputValue: string = "";;        

    function search() {
        dispatch("search", inputValue);
    }


</script>

<div>
    <input bind:value={inputValue} placeholder="Search mods" type="text" on:keydown={(key)=>{
        if (key.key === "Enter") search();
    }}>
    <button class="search-btn" aria-label="Search" title="Search" tabindex="-1" on:click={()=>search()}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>    
    </button>
</div>

<style>
    div {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        background-color: var(--color-bg-2);
        border-bottom: 3px solid #999;
        min-width: 0;
        justify-content: space-between;
        border-radius: 0.25rem;
        transition-duration: 0.2s;
    }

    input {
        font-size: 1.15rem;
        padding: 0.65rem;
        flex: 1 1 auto;
        min-width: 0;
        background-color: transparent;
        border: none;
        outline: none;
    }
    input::placeholder {
        color: #eee;
    }

    div:focus-within {
        border-color: var(--color-theme-1);
    }
    
    button {
        width: 50px;
        height: 50px;
        padding: 15px;
        background-color: transparent;
    }

    button:hover {
        background-color: var(--color-bg-1);
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }

    svg {
        width: 100%;
        height: 100%;
        stroke: #999;
    }

</style>