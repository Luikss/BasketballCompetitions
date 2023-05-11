<template>
    <Teleport to="body">
        <modal :show="playerDetailId != 0" @close="$emit('close')">
            <template #header>
                <h3>Player Details</h3>
            </template>
            <template #body>
                <b>First Name: </b>{{ currentPlayer.firstName }}<br>
                <b>Last Name: </b>{{ currentPlayer.lastName }}
                <b v-if="!currentPlayer.lastName">-</b>
                <br>
                <b>Age: </b>{{ currentPlayer.age }}<br>
                <b>Team: </b>{{ this.teamName }}<br>
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
            playerDetailId: {
                type: Number,
                required: true
            }
        },
        emits: ["close"],
        data() {
            return  {
                currentPlayer: {},
                teamName: ""
            }
        },
        beforeUpdate() {
            if (this.playerDetailId == 0) {
                return
            }
            this.playerDetails()
        },
        methods: {
            async playerDetails() {
                this.currentPlayer = await (await fetch(`http://localhost:8080/players/${this.playerDetailId}`)).json()
                const teamId = this.currentPlayer.teamId
                const team = await (await fetch(`http://localhost:8080/teams/${teamId}`)).json()
                this.teamName = team.name
            }
        },
    }
</script>
    
<style>
    
</style>
