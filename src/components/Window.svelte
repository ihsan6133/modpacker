<script lang="ts">
    export let hasCloseButton: boolean = true;
    export let isOpen: boolean = false;
    export function show() {
        isOpen = true;
        dialog.show();
    }
    export function close() {
        isOpen = false;
        dialog.close();
    }

    let dialog: HTMLDialogElement;
</script>

<dialog bind:this={dialog} class="container">
    {#if hasCloseButton}
        <button class="close-btn" on:click={close}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6L18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>        
        </button>
    {/if}
    <slot/>
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
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        background: transparent;
        border: none;
        border-radius: 50%;
        transition-duration: 0.2s;
    }

    .close-btn:hover {
        background-color: var(--color-bg-2);
    }
    
    .close-btn:hover svg, .close-btn:active svg {
        stroke: white;
    }

    .close-btn:active {
        background-color: var(--color-bg-1);
    }

    svg {
        width: 100%;
        height: 100%;
        stroke: #afafaf;
        transition-duration: 0.2s;
    }

</style>