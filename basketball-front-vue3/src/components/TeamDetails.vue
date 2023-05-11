<template>
    <Teleport to="body">
        <modal :show="teamDetailId != 0" @close="$emit('close')">
            <template #header>
                <h3>Team Details</h3>
            </template>
            <template #body>
                <b>Home court: </b>{{ currentTeam.homeCourt }}
                <br><br>
                <b v-if="players">Players:</b>
                <div v-for="player in players" :key="player.id">
                    <b>{{ player.firstName }} {{ player.lastName }}</b>
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
            teamDetailId: {
                type: Number,
                required: true
            }
        },
        emits: ["close"],
        data() {
            return  {
                currentTeam: {},
                players: []
            }
        },
        beforeUpdate() {
            if (this.teamDetailId == 0) {
                return
            }
            this.teamDetails()
        },
        methods: {
            async teamDetails() {
                this.players = []
                this.currentTeam = await (await fetch(`http://localhost:8080/teams/${this.teamDetailId}`)).json()
                const players = await (await fetch(`http://localhost:8080/players/`)).json()
                for (const player of players) {
                    const playerDetails = await (await fetch(`http://localhost:8080/players/${player.id}`)).json()
                    if (playerDetails.teamId == this.currentTeam.id) {
                        this.players.push(player)
                    }
                }
            }
        },
    }
</script>
