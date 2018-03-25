<template>
  <v-app id="inspire">
    <!-- <slot name="video"></slot> -->
    <v-layout>
    <v-flex xs-6 >
      <songs-bookmarks class="bookmarks" />
      <songs-history class="history" />
    </v-flex>
      <v-flex xs-6>
    <songs-search class="search-box" />
   <panel :title =" title " mt-10>
       <slot>
         <div v-for="song in songs" :key="song.id">
          <v-btn small :to="{name: 'song', params: {songId: song.id }}">View Song</v-btn>
           {{song.title}} -
           {{song.artist}} -
           {{song.genre}}
         </div>
    </slot>
    <div slot="video"></div>
    <v-btn absolute
              dark
              fab
              bottom
              right :to="'songs/create'">
      <v-icon dark>add</v-icon>
    </v-btn>
   </panel>
     </v-flex>
    </v-layout>

  </v-app>
</template>
<script>
import Panel from '@/components/Panel'
import SongsSearch from '@/components/SongsSearch'
import SongsService from '@/services/SongsService'
import SongsBookmarks from '@/components/SongsBookmarks'
import SongsHistory from '@/components/SongsHistory'
export default {
  data () {
    return {
      title: 'songs',
      songs: null
    }
  },
  components: {
    Panel,
    SongsSearch,
    SongsBookmarks,
    SongsHistory
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>
<style scoped>
.search-box {
  margin: 10px 0px 10px 0px;
}

.bookmarks {
  margin: 10px 5px 10px 0px;
}

.history {
  margin: 10px 5px 10px 0px;
}
</style>
