<script lang="ts">
    import { HRDate } from '../utils';
    import { deleteJoiner, deleteGame, setGOGOGO } from '../api';
    import { storedSettings } from '../stores';

    export let game: any;
    let settings: any;
    let showGogogoButtons = false;

    storedSettings.subscribe(value => {
        settings = value;
    });

    $: {
        showGogogoButtons = (game.joiner.length === settings.maxjoiner);
    }
</script>

<div class="game{game.done ? ' is-done' : ''}">
    {#if game.done}
        <div class="done-layer" label="GOGOGO" date={HRDate(game.donedate)}></div>
    {/if}
    <table>
        <thead>
        <tr>
            <td colspan="5">
                #{game.id} / {HRDate(game.date)}
            </td>
            <td center>
                <i on:click={() => deleteGame(game.id)} class="game-delete far fa-trash-alt"></i>
            </td>
        </tr>
        <tr>
            <th>ID</th>
            <th>CID</th>
            <th>Nick</th>
            <th center>Date</th>
            <th center width="100">State</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {#each game.joiner as joiner (joiner.id)}
            <tr>
                <td>{joiner.id}</td>
                <td>{joiner.clientid}</td>
                <td>{joiner.nick}</td>
                <td center>{HRDate(joiner.date)}</td>
                <td center>
                    {#if !joiner.gogogo}
                        {#if !showGogogoButtons}
                            +1
                        {:else}
                            <button on:click={() => setGOGOGO(joiner.id, game.id)}>GOGOGO</button>
                        {/if}
                    {:else}
                        <span class="gogogo">GOGOGO</span>
                    {/if}
                </td>
                <td center>
                    <i on:click={() => deleteJoiner(joiner.id, game.id)} class="far fa-trash-alt"></i>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>

<style lang="scss">
  @import '../scss/variables';

  .game {
    position: relative;
    margin-bottom: $space-lg;

    .done-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .3);
      z-index: z-index('overlay');
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: $border-radius;
      text-shadow: 2px 2px $color-red;
      font-weight: bold;

      &:before {
        content: attr(label);
        transform: rotate(-33deg) translate(0, -5px);
        font-size: ms(3);
      }

      &:after {
        content: attr(date);
        transform: rotate(-33deg) translate(15px, -10px);
        font-size: ms(0);
      }
    }

    &.is-done {
      .game-delete {
        z-index: z-index('click');
        position: relative;
        color: $color-white;
        text-shadow: 2px 2px $color-red;

        &:hover {
          color: inherit;
          text-shadow: none;
        }
      }
    }
  }
</style>
