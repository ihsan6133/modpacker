<script lang="ts">
    interface mod {
        name: string;
        description: string;
        thumbnailUrl: string;
    }

    export let modData: mod;
</script>

<div class="container">
    <img src={modData.thumbnailUrl} alt="thumbnail">
    <div class="info">
        <h3>{modData.name}</h3>
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
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>