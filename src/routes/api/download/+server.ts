export async function GET({url}: {url: URL}) {
    const modIds = url.searchParams.get("modIds")?.split(",").map((id) => parseInt(id)) ?? [];
    const version: string = url.searchParams.get("version") ?? "";
    const modLoader: string = url.searchParams.get("modLoader") ?? "";

    const body = {
        modIds,
        version,
        modLoader
    };
    return new Response(JSON.stringify(body), {status: 200});
}