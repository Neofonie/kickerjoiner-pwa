<script lang="ts">
    import { storedGames } from '../stores';
    import Game from "./Game.svelte";

    let games: any;

    storedGames.subscribe(value => games = value);
</script>

<div class="games container">
    <h2>Games</h2>

    {#each games as game (game.id)}
        <Game {game} />
    {/each}
</div>

<style lang="scss">
  @import '../scss/variables';

  .games {

  }
</style>
