import { writable } from "svelte/store";

export const activeUrl = writable(null);

export const onLinkClick = writable(null);
