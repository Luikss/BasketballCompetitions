<template>
  <div>
    <RouterLink to="/createGame">Create new game</RouterLink>
    <div class="game-table">
      <table-template
        caption="UPCOMING GAMES"
        notFound="No games found!"
        :items="upcomingGames"
        :showControls="true"
        @show="gameDetailId = $event.id"
        @delete="gameToDelete = $event">
      </table-template>
    </div>
    <div class="game-table">
      <table-template
        caption="PAST GAMES"
        notFound="No games found!"
        :items="pastGames"
        :showControls="true"
        @show="gameDetailId = $event.id"
        @delete="gameToDelete = $event">
      </table-template>
    </div>
    <game-details 
      :gameDetailId="gameDetailId"
      @close="gameDetailId = 0"> 
    </game-details>
  </div>
  <modal :show="JSON.stringify(gameToDelete) !== '{}'">
     <template #header>
       <h3>Deleting game</h3>
     </template>
     <template #body>
       <p>Are you sure that you want to delete this game?</p>
     </template>
     <template #footer>
      <button class="modal-default-button delete" @click="gameToDelete = {}">No</button>
      <button class="modal-default-button" @click="deleteGame()">Yes</button>
     </template>
   </modal>
</template>
  
  <script>
  import TableTemplate from "../../components/Table.vue"
  import GameDetails from "../../components/GameDetails.vue"
  import Modal from "../../components/Modal.vue";
  import { RouterLink } from "vue-router"
  
  export default {
    components: {
      TableTemplate,
      GameDetails,
      RouterLink,
      Modal,
    },
    data() {
      return {
        upcomingGames: [],
        pastGames: [],
        gameDetailId: 0,
        gameToDelete: {},
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
    methods: {
     async deleteGame() {
       fetch("http://localhost:8080/games/" + this.gameToDelete.id, {
         method: "delete",
       }).then(async (response) => {
         if (response.status == 204) {
           location.reload();
         } else {
           const data = await response.json();
           console.log("DELETE: ", data);
         }
       });
     },
   },
  };
  </script>
  
  <style scoped>
  
  .game-table {
    padding: 1rem;
    max-width: 100%;
  }
  
  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  .delete {
    background-color: red;
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
  