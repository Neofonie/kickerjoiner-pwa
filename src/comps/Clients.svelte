<script lang="ts">
    import { HRDate } from '../utils';
    import { localStore, storedClients } from '../stores';
    import { sendClientNick } from '../websocket';
    import { onMount } from 'svelte';

    let clients: any = [];
    let nickname: any;

    storedClients.subscribe(value => clients = value);

    const sendClientNewNick = () => {
        sendClientNick(nickname);
    }

    onMount(() => {
        nickname = localStore.get('nickname');
    })
</script>

<div class="clients container">
    <h2>Clients</h2>
    <div class="mb-sm">
        <input type="text" placeholder="anonymous"
               bind:value={nickname}
               on:keypress={(event) => (event.key.toLowerCase() === 'enter') && sendClientNewNick()}/>
        <button on:click={sendClientNewNick}>Set your clientname</button>
    </div>
    <table>
        <thead>
        <tr>
            <th>Id</th>
            <th>Nick</th>
            <th>Lastseen</th>
        </tr>
        </thead>
        <tbody>
        {#each clients as client (client.id)}
            <tr>
                <td>{client.id}</td>
                <td>{client.nick}{client.isThisYou ? ' (You)' : ''}<br /><span class="ms--1">{client.type}</span></td>
                <td>{HRDate(client.lastseendate)}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<style lang="scss">
  @import '../scss/variables';

  .clients {

  }
</style>
