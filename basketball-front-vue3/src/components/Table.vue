<template>
    <table>
        <caption>{{ caption }}</caption>
        <tr v-if="items.length">
            <th v-for="(keyName, index) in keyNames" :key="index">
                {{ keyName }}
            </th>
            <th v-if="showControls"></th>
            <slot name="additionalHeaders"></slot>
        </tr>

        <tr class="empty" v-if="!items.length">{{ notFound }}</tr>
        
        <tr v-for="item in items" :key="item.id">
            <td v-for="(keyName, index) in Object.keys(item)" :key="index">
                {{ item[keyName] }}
            </td>
            <td v-if="showControls">
                <button @click="$emit('show',item)">Show</button>
                <button @click="$emit('delete', item)">Delete</button>
            </td>
            <slot name="additionalColumns"></slot>
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        caption: String,
        notFound: String,
        items: Array,
        showControls: Boolean
    },
    emits: ["show", "delete"],
    computed: {
        keyNames() {
            return this.items.length > 0 ? Object.keys(this.items[0]) : []
        }
    }
}
</script>
<style>
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: auto;
}

.empty {
  text-align: center;
  font-weight: bold;
}

caption {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

th {
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}

td {
  border: 1px solid #ddd;
  padding: 8px;
  vertical-align: middle;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  transform: scale(1.05);
}
</style>