<template>
  <div>
    <table border="1">
      <caption>Kõik mängud</caption>
      <tr>
        <th>Nimi</th>
      </tr>
      <tr v-for="game in games" :key="game.id">
        <td>{{ game.name }}</td>
        <td><button @click="showModal = true">Kuva detailid</button></td>
      </tr>
    </table>
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

export default {
  components: {
    Modal
  },
  data() {
    return {
      games: [],
      showModal: false,
      currentGame: {
        id: 1,
        name: "Tallinna Cup",
        location: "Lauluväljak",
        teamOneName: "Saaremaa Dunkers",
        teamTwoName: "Vanalinna Mürajad",
        teamOneScore: 67,
        teamTwoScore: 99
      }
    }
  },
  async created() {
    this.games = await (await fetch("http://localhost:8080/games")).json()
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
