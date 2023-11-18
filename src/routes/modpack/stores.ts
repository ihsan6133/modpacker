import { readable, writable } from "svelte/store";
import type { Mod } from "./ModApi";

export const mods = writable<(Mod)[]>();
export const gameVersion = writable<string>();
export const modLoader = writable<string>();
