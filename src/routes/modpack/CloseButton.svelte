<script>

</script>

<button on:click>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
</button>


<style>
    button {
        width: 50px;
        height: 50px;
        cursor: pointer;
        background: transparent;
        border: none;
        border-radius: 25%;
        transition-duration: 0.2s;
    }

    button:hover {
        background-color: var(--color-bg-2);
    }
    button:active {
        background-color: #555;
    }
    button:hover svg {
        stroke: white;
    }

    svg {
        width: 100%;
        height: 100%;
        stroke: #afafaf;
        transition-duration: 0.2s;
    }
</style>