<template>
    <Teleport to="body">
    <modal :show="gameDetailId != 0" @close="$emit('close')">
      <template #header>
        <h3>Game Details</h3>
      </template>
      <template #body>
        <b>Name: </b>{{ currentGame.name }}<br>
        <b>Location: </b>{{ currentGame.location }}
        <b v-if="!currentGame.location">Unknown</b>
        <br><br>
        <div v-if="currentGame.teamOneScore && currentGame.teamTwoScore">
            {{ currentGame.teamOneName }} 
            ({{ currentGame.teamOneScore }} - {{ currentGame.teamTwoScore }}) 
            {{ currentGame.teamTwoName }}
        </div>
        <div v-if="!currentGame.teamOneScore && !currentGame.teamTwoScore">
            {{ currentGame.teamOneName }} & {{ currentGame.teamTwoName }}
        </div>
      </template>
    </modal>
    </Teleport>
</template>

<script>
    import Modal from "./Modal.vue"
    export default {
        components: {
            Modal
        },
        props: {
            gameDetailId: {
                type: Number,
                required: true
            }
        },
        emits: ["close"],
        data() {
            return  {
                currentGame: {}
            }
        },
        beforeUpdate() {
            if (this.gameDetailId == 0) {
                return
            }
            this.gameDetails()
        },
        methods: {
            async gameDetails() {
                this.currentGame = await (await fetch(`http://localhost:8080/games/${this.gameDetailId}`)).json()
            }
        },
    }
</script>
    
<style>
    
</style>
