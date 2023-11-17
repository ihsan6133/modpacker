// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;

async function fetchVersions(fetch: Function): Promise<string[]> {
    const res = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json");
    const data = await res.json();
    return data.versions.filter((version: { type: string; })=> version.type === "release").map((version: { id: any; }) => version.id);
}


import type { PageLoad } from "../$types";
import { fetchMods, type Mod } from "./ModApi";
import { decode } from "./base64ArrayBuffer";
export const load = (async ({params, fetch, url}) => {
    
    // if params has "modpack" then decode it to uint8 array
    // then decode it to string
    let mods: Mod[] = [];
    let version: string|null = null;
    let modLoader: string|null = null;
    

    if (url.searchParams.has("mods")) {
        let b64 = url.searchParams.get("mods") ?? "";

        let modIds = new Int32Array(decode(b64));
        mods = await fetchMods(Array.from(modIds), fetch);
    }

    if (url.searchParams.has("version")) {
        version = url.searchParams.get("version") ?? null;
    }

    if (url.searchParams.has("modloader")) {
        modLoader = url.searchParams.get("modloader") ?? null;
    }
    
    return {
        minecraftVersions: await fetchVersions(fetch),
        mods,
        version,
        modLoader
    }
}) satisfies PageLoad;