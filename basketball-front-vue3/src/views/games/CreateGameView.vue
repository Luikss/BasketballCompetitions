<template>
  <div class="container">
    <div v-if="error">{{ error }}</div>
    <form @submit.prevent="formSubmitHandler">
      <div class="row">
        <div class="col-25">
          <label for="name">Name</label>
        </div>
        <div class="col-75">
          <input id="name" type="text" v-model="name" required />
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="location">Location</label>
        </div>
        <div class="col-75">
          <input id="location" type="text" v-model="location" />
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="teamOneId">Team 1</label>
        </div>
        <div class="col-75">
          <select v-model="teamOneId" required>
            <option disabled value="">Select Team 1</option>
            <option v-for="team in teams" v-bind:key="team.id" :value="team.id">{{ team.name }}</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="teamTwoId">Team 2</label>
        </div>
        <div class="col-75">
          <select v-model="teamTwoId" required>
            <option disabled value="">Select Team 2</option>
            <option v-for="team in teams" v-bind:key="team.id" :value="team.id">{{ team.name }}</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="teamOneScore">Team 1 score</label>
        </div>
        <div class="col-75">
          <input id="teamOneScore" v-model="teamOneScore" type="number" />
        </div>
      </div>

      <div class="row">
        <div class="col-25">
          <label for="teamTwoScore">Team 2 score</label>
        </div>
        <div class="col-75">
          <input id="teamTwoScore" v-model="teamTwoScore" type="number" />
        </div>
      </div>

      <br>
      <div class="row">
        <input type="submit" value="Create" />
        <input type="button" value="Back" class="back" @click="goBack">
      </div>
    </form>
  </div>
</template>

<script>
const API_URL = "http://localhost:8080/games"

export default {
  data() {
    return {
      name: "",
      location: "",
      teamOneId: null,
      teamTwoId: null,
      teamOneScore: null,
      teamTwoScore: null,
      error: null,
      teams: []
    };
  },
  async created() {
    this.teams = await (await fetch("http://localhost:8080/teams")).json();
  },
  methods: {
    goBack() {
      window.history.back();
    },
    formSubmitHandler() {
        this.error = null
        const newGame = {
            name: this.name,
            location: this.location,
            teamOneId: this.teamOneId,
            teamTwoId: this.teamTwoId,
            teamOneScore: this.teamOneScore,
            teamTwoScore: this.teamTwoScore
        }
        fetch(API_URL, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newGame)
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                this.$router.push("/")
                return
            }
            this.error = data.error
        })
        .catch(error => {
            console.log(error)
        })
    }
  }
}
</script>
<style>
* {
  box-sizing: border-box;
}

input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type="button"],
input[type="submit"] {
  background-color: #4d82c7;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

input[type="button"]:hover,
input[type="submit"]:hover {
  background-color: #45a049;
}

input[type="button"] {
  margin-right: 5px;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

.row::after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
