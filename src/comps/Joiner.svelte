<script lang="ts">
    import { localStore, storedClients } from '../stores';
    import { sendMessage } from "../websocket";
    import { onMount } from "svelte";

    let clients: any;
    let nickname: any;

    storedClients.subscribe(value => clients = value);

    const callPlusOne = () => {
        sendMessage({
            message: 'PLUS_ONE',
            nick: nickname || 'anonymous',
        });
    }

    onMount(() => {
        nickname = localStore.get('nickname');
    })
</script>

<div class="joiner container">
    <h1>Joiner</h1>
    <input type="text" placeholder="player name" bind:value={nickname} on:keypress={(event) => (event.key.toLowerCase() === 'enter') && callPlusOne()}/>
    <button on:click={callPlusOne} id="plusone">+1</button>
</div>

<style lang="scss">
  @import '../scss/variables';

  .joiner {

  }
</style>
