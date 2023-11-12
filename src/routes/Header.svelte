<script lang="ts">
    import './styles.css'
    
    export let msg: String;
</script>

<header >
    <a href="/"><h1>Modpacker</h1></a>
    <span>{msg}</span>
</header>

<style>
    header {
        padding: 1rem;
        border-bottom: 1px solid #555;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    a {
        text-decoration: none;
    }
    h1 {
        margin: 0;
    }
    span {
        font-size: 1.3rem;
    }

</style>