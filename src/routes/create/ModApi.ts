const CURSEFORGE_BASE_URL = "https://api.curseforge.com";
const CURSEFORGE_MOD_SEARCH_URL = `${CURSEFORGE_BASE_URL}/v1/mods/search`;
const CURSEFORGE_API_KEY = "$2a$10$JcPmO9ZShvIWdhe5DXQNEuYurKuQCThNVJSlh4afL4UHnQO3xGDJy"; 
const CURSEFORGE_THUMBNAIL_FALLBACK_URL = "https://www.curseforge.com/images/flame.svg";

interface Mod {
    id: number;
    name: string;
    description: string;
    authors: string[];
    downloads: number;
    thumbnailUrl: string;
}


async function fetchMods(searchTerm: string) : Promise<Mod[]> {
    console.log(`Fetching mods for ${searchTerm}`);
    
    const response = await fetch(`${CURSEFORGE_MOD_SEARCH_URL}?gameId=432&searchFilter=${searchTerm}&sortField=6&sortOrder=desc`, {
        headers: {
            "x-api-key": CURSEFORGE_API_KEY
        }
    });

    const data = await response.json();

    const mods: Mod[] = data.data.map((mod: any) => {

            
        return {
            id: mod.id,
            name: mod.name,
            description: mod.summary,
            authors: "",
            downloads: mod.downloadCount,
            thumbnailUrl: mod.logo ? mod.logo.url : CURSEFORGE_THUMBNAIL_FALLBACK_URL
        };
    });

    return mods;
}

export type { Mod };
export { fetchMods };