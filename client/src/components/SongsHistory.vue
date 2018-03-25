<template>
  <v-card>
    <v-card-title>
      History
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="songs"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.artist }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>
<script>
import {mapState} from 'vuex'
import SongsHistoryService from '@/services/SongsHistoryService'
export default {
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Title',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Artist',
          value: 'artist'
        }
      ],
      songs: null
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn', 'user'])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.songs = (await SongsHistoryService.index({
        userId: this.user.id
      })).data
    }
  }
}
</script>
