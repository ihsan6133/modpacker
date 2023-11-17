<script>
    import './styles.css'
</script>

<div class="container">
    <header>
        <h1>Modpacker</h1>
        <span>Create your dream minecraft modpack with ease.</span>
    </header>
    <main>
        <a href="/modpack">New Modpack</a>
    </main>
</div>

<style>

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    span {
        font-size: 1.2rem;
    }

    main {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    a {
        font-size: 1.3rem;
        padding: 0.7rem;
        color: var(--text-color);
        background-color: var(--color-bg-2);
        text-decoration: none;
        transition-duration: 0.2s ;
    }  

    a:hover {
        background-color: var(--color-theme-1);
        color: black;
    }

</style>