import { downloadZip } from "client-zip";

interface DownloadModsRequestBody {
    downloadUrls: string[];
}

export async function GET({url}: {url: URL}) {
    // parse request body to json
        
    let downloadLinks = url.searchParams.get("downloadLinks");
    downloadLinks = atob(downloadLinks as string);
    let links = JSON.parse(downloadLinks) as string[];

    // download mods
    const files = [];
    for (const url of links) {
        const res = await fetch(url);
        files.push(res);
    }

    // create zip
    const zip = await downloadZip(files);
    
    // return zip  
    return zip;



}