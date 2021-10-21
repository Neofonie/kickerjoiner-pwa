<script lang="ts">
    import './scss/global.scss';
    import './scss/table.scss';
    import { connectToWSS, sendClientNick } from './websocket';
    import { getGames } from './api';
    import { updateClients, storedThisClient } from './stores';
    import Joiner from "./comps/Joiner.svelte";
    import Games from "./comps/Games.svelte";
    import Clients from "./comps/Clients.svelte";

    connectToWSS((data) => {
        console.log('connectToWSS refresh', data)
        switch (data.message) {
            case 'CONNECTION_ON': // connection with server is on
                storedThisClient.update(value => data.clientid);
                const lsNickName = localStorage.getItem('nickname');
                if (lsNickName !== null) {
                    sendClientNick(lsNickName);
                }
                break;
            case 'GAME_UPDATE': // joined game got an update
                getGames();
                break;
            case 'GAME_READY': // four joiners in one game
                getGames();
                break;
            case 'GAME_GOGOGO': // all four joiners pressed gogogo in one game
                getGames();
                break;
            case 'CLIENT_UPDATE':
                updateClients(data.clients);
                break;
            case 'ERROR':
                document.querySelector('#error').innerHTML = JSON.stringify(data, null, 2);
                break;
            case 'CLOSE':
                break;
        }
    });
</script>

<main>
    <Joiner/>
    <Games/>
    <Clients/>
</main>

<style lang="scss" global>
  @import './scss/variables';

</style>
