import { writable } from 'svelte/store';
import { getSettings, getGames } from "./api";

let myClientId = -1;

export const storedThisClient = writable({
    id: myClientId,
});

export const storedGames = writable([]);

export const storedClients = writable([]);
export const updateClients = (clients) => {
    storedClients.update((value: any) => {
        return clients;
    });
}

export const storedSettings = writable({});

export const localStore = {
    set: (key: string, value?: any) => {
        return localStorage.setItem(key, value);
    },
    get: (key: string, withParse?: boolean) => {
        if (withParse) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return localStorage.getItem(key);
        }
    },
    remove: (key: string) => {
        return localStorage.removeItem(key);
    },
};

// init
(async () => {
    await getSettings();
    await getGames();
})();
