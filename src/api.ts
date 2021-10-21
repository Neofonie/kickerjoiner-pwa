import { db } from "./utils";
import { storedGames, storedSettings } from "./stores";
import { sendMessage } from "./websocket";

export async function getSettings() {
    const settings = await db('GET', '/settings/');
    storedSettings.update((value: any) => {
        return settings;
    });
}

export async function getGames() {
    const games = await db('GET', `/games?_sort=date&_order=desc`);
    storedGames.update((value: any) => {
        return games;
    });
}

export async function deleteGame(gameID) {
    await db('DELETE', '/games/' + gameID);

    sendMessage({
        message: 'GAME_UPDATE',
        gameid: gameID,
        reason: 'delete game',
    });
}

export async function deleteJoiner(joinerID, gameID) {
    const game = await db('GET', '/games/' + gameID);
    const filteredJoiner = game.joiner.filter((player) => (player.id !== joinerID));
    await db('PATCH', '/games/' + gameID, {
        joiner: filteredJoiner,
    });

    sendMessage({
        message: 'GAME_UPDATE',
        gameid: gameID,
        joinerid: joinerID,
        reason: 'delete joiner',
    });
}

export async function setGOGOGO(joinerID, gameID) {
    sendMessage({
        message: 'GOGOGO',
        gameid: gameID,
        joinerid: joinerID,
    });
}
