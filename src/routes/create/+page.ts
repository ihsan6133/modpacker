// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

async function fetchVersions(fetch: Function): Promise<string[]> {
    const res = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json");
    const data = await res.json();
    return data.versions.filter((version: { type: string; })=> version.type === "release").map((version: { id: any; }) => version.id);
}

import type { PageLoad } from "../$types";
export const load = (async ({params, fetch}) => {
    return {
        minecraftVersions: await fetchVersions(fetch)
    }
}) satisfies PageLoad;