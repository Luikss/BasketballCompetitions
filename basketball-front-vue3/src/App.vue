<template>
  <div>
    <table-template 
      caption="ALL GAMES" 
      :items="games" 
      :showControls="true" 
      @show="gameDetailId = $event.id"
    >
    </table-template>
  </div>
  <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>Mängu üksikasjad</h3>
      </template>
      <template #body>
        <b>Nimi: </b>{{ currentGame.name }}<br>
        <b>Asukoht: </b>{{ currentGame.location }}<br><br>
        {{ currentGame.teamOneName }} 
        ({{ currentGame.teamOneScore }} - {{ currentGame.teamTwoScore }}) 
        {{ currentGame.teamTwoName }}
      </template>
    </modal>
  </Teleport>
</template>

<script>
import Modal from "./components/Modal.vue"
import TableTemplate from "./components/Table.vue"

export default {
  components: {
    Modal,
    TableTemplate
  },
  data() {
    return {
      games: [],
      showModal: false,
      gameDetailId: 0,
      currentGame: {}
    }
  },
  async created() {
    this.games = await (await fetch("http://localhost:8080/games")).json()
  },
  watch: {
    async gameDetailId(newId) {
      this.currentGame = await (await fetch(`http://localhost:8080/games/${newId}`)).json()
      this.showModal = true
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
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
