<template>
    <div>
        <RouterLink to="/createPlayer">Create new player</RouterLink>
        <div class="player-table">
            <table-template
            caption="PLAYERS"
            notFound="No players found!"
            :items="players"
            :showControls="true"
            @show="playerDetailId = $event.id"
            @delete="playerToDelete = $event">
            </table-template>
        </div>
        <player-details 
            :playerDetailId="playerDetailId"
            @close="playerDetailId = 0"> 
        </player-details>
    </div>
    <modal :show="JSON.stringify(playerToDelete) !== '{}'">
        <template #header>
            <h3>Deleting player</h3>
        </template>
        <template #body>
            <p>Are you sure that you want to delete this player?</p>
        </template>
        <template #footer>
            <button class="modal-default-button delete" @click="playerToDelete = {}">No</button>
            <button class="modal-default-button" @click="deletePlayer()">Yes</button>
        </template>
    </modal>
</template>
    
<script>
    import TableTemplate from "../../components/Table.vue"
    import Modal from "../../components/Modal.vue"
    import PlayerDetails from "../../components/PlayerDetails.vue"
    
    export default {
      components: {
        TableTemplate,
        Modal,
        PlayerDetails
      },
      data() {
        return {
          players: [],
          playerDetailId: 0,
          playerToDelete: {}
        };
      },
      async created() {
        this.players = await (await fetch("http://localhost:8080/players")).json();
      },
      methods: {
        async deletePlayer() {
            fetch("http://localhost:8080/players/" + this.playerToDelete.id, {
                method: "delete",
            }).then(async (response) => {
                if (response.status == 204) {
                    this.players.splice(this.players.indexOf(this.playerToDelete), 1);
                    this.playerToDelete = {};
                }
            });
        },
      },
    };
    </script>
    
    <style scoped>
    
    header {
      line-height: 1.5;
      max-height: 100vh;
    }
    
    .player-table {
      padding: 1rem;
    }

    .delete {
        background-color: red;
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
        margin-left: -1rem;
        font-size: 1rem;
    
        padding: 1rem 0;
        margin-top: 1rem;
      }
    }
</style>  
