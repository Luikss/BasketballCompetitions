<template>
    <div>
        <div class="team-table">
            <table-template
                caption="TEAMS"
                notFound="No teams found!"
                :items="teams"
                :showControls="true"
                @show="teamDetailId = $event.id"
                @delete="teamToDelete = $event">
            </table-template>
        </div>
        <team-details 
            :teamDetailId="teamDetailId"
            @close="teamDetailId = 0"> 
        </team-details>
    </div>
    <modal :show="JSON.stringify(teamToDelete) !== '{}'">
        <template #header>
            <h3>Deleting team</h3>
        </template>
        <template #body>
            <p>Are you sure that you want to delete this team?</p>
        </template>
        <template #footer>
            <button class="modal-default-button delete" @click="teamToDelete = {}">No</button>
            <button class="modal-default-button" @click="deleteTeam()">Yes</button>
        </template>
    </modal>
</template>
    
<script>
    import TableTemplate from "../../components/Table.vue"
    import Modal from "../../components/Modal.vue"
    import TeamDetails from "../../components/TeamDetails.vue"
    
    export default {
      components: {
        TableTemplate,
        Modal,
        TeamDetails
      },
      data() {
        return {
          teams: [],
          teamDetailId: 0,
          teamToDelete: {}
        };
      },
      async created() {
        this.teams = await (await fetch("http://localhost:8080/teams")).json();
      },
      methods: {
        async deleteTeams() {
            fetch("http://localhost:8080/teams/" + this.teamToDelete.id, {
                method: "delete",
            }).then(async (response) => {
                if (response.status == 204) {
                    this.teams.splice(this.teams.indexOf(this.teamToDelete), 1);
                    this.teamToDelete = {};
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
    
    .team-table {
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
