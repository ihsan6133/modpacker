const CURSEFORGE_BASE_URL = "https://api.curseforge.com";
const CURSEFORGE_MOD_SEARCH_URL = `${CURSEFORGE_BASE_URL}/v1/mods/search`;

const CURSEFORGE_THUMBNAIL_FALLBACK_URL = "https://www.curseforge.com/images/flame.svg";

const CURSEFORGE_API_KEY = "$2a$10$JcPmO9ZShvIWdhe5DXQNEuYurKuQCThNVJSlh4afL4UHnQO3xGDJy"; 

interface Mod {
    id: number;
    name: string;
    description: string;
    authors: string[];
    downloads: number;
    thumbnailUrl: string;
}

interface FileIndex {
    gameVersion: string;
    fileId: number;
    fileName: string;
    releaseType: number;
    gameVersionTypeId: number;
    modLoader: string;
}

interface File {
    id: number;
    modId: number;
    isAvailable: boolean;
    displayName: string;
    fileName: string;
    releaseType: number;
    fileLength: number;
    downloadUrl: string;
}

function modLoaderIdToString(modLoaderId: number) {
    const modLoaderMap = [null, "forge", "cauldron", "liteloader", "fabric", "quilt"];
    return modLoaderMap[modLoaderId];
}

async function fetchLatestFiles(modId: number): Promise<FileIndex[]> {
    const res = await fetch(`${CURSEFORGE_BASE_URL}/v1/mods/${modId}`, {
        headers: {
            "x-api-key": CURSEFORGE_API_KEY
        }
    });
    const data = await res.json();
    return data.data.latestFilesIndexes.map((fileIndex: any) => {
        return {
            gameVersion: fileIndex.gameVersion,
            fileId: fileIndex.fileId,
            fileName: fileIndex.fileName,
            releaseType: fileIndex.releaseType,
            gameVersionTypeId: fileIndex.gameVersionTypeId,
            modLoader: modLoaderIdToString(fileIndex.modLoader)
        };
    });
}

async function searchMods(searchTerm: string) : Promise<Mod[]> {
    
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

async function fetchMods(modIds: number[], fetch: any) : Promise<Mod[]> {
    const response = await fetch(`${CURSEFORGE_BASE_URL}/v1/mods`, {
        method: "POST",
        body: JSON.stringify({
            "modIds": modIds,
        }),
        headers: {
            "Content-Type": "application/json",
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

async function fetchFile(modId: number, version: string, modLoader: string) : Promise<File>{

    let modLoaderId = 0;

    switch(modLoader) {
        case "forge":
            modLoaderId = 1;
            break;
        case "cauldron":
            modLoaderId = 2;
            break;
        case "liteloader":
            modLoaderId = 3;
            break;
        case "fabric":
            modLoaderId = 4;
            break;
        case "quilt":
            modLoaderId = 5;
            break;
        default:
            throw new Error("Invalid mod loader");
    }

    const res = await fetch(`${CURSEFORGE_BASE_URL}/v1/mods/${modId}/files?modId=${modId}&gameVersion=${version}&modLoaderType=${modLoaderId}`, {
        headers: {
            "x-api-key": CURSEFORGE_API_KEY
        }
    });

    const data = await res.json();

    if (data.data.length === 0) {
        throw new Error("No files available");
    }
    return data.data[0] as File;
}

export type { Mod, FileIndex, File };
export { fetchMods, fetchLatestFiles, fetchFile, searchMods };