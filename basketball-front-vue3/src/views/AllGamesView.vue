<template>
  <div>
    <div class="game-table">
      <table-template
        caption="UPCOMING GAMES"
        notFound="No games found!"
        :items="upcomingGames"
        :showControls="true"
        @show="gameDetailId = $event.id"
      >
      </table-template>
    </div>
    <div class="game-table">
      <table-template
        caption="PAST GAMES"
        notFound="No games found!"
        :items="pastGames"
        :showControls="true"
        @show="gameDetailId = $event.id"
      >
      </table-template>
    </div>
    <game-details 
      :gameDetailId="gameDetailId"
      @close="gameDetailId = 0"> 
    </game-details>
  </div>
</template>
  
  <script>
  import TableTemplate from "../components/Table.vue"
  import GameDetails from "../components/GameDetails.vue"
  
  export default {
    components: {
      TableTemplate,
      GameDetails,
    },
    data() {
      return {
        upcomingGames: [],
        pastGames: [],
        gameDetailId: 0,
      };
    },
    async created() {
      const gamesData = await (await fetch("http://localhost:8080/games")).json();
  
      gamesData.forEach(async (element) => {
        const game = await (await fetch(`http://localhost:8080/games/${element.id}`)).json();
  
        if (game.teamOneScore && game.teamTwoScore) {
          this.pastGames.push(element);
        } else {
          this.upcomingGames.push(element);
        }
      });
    },
  };
  </script>
  
  <style scoped>
  
  .game-table {
    padding: 1rem;
    max-width: 50%;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }
  
  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }
  
  nav a.router-link-exact-active {
    color: var(--color-text);
  }
  
  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }
  
  nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }
  
  nav a:first-of-type {
    border: 0;
  }
  
  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
  
    .logo {
      margin: 0 2rem 0 0;
    }
  
    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  
    nav {
      text-align: left;
      font-size: 1rem;
      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
  </style>
  