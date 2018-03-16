<template>
  <v-app id="inspire">
    <!-- <slot name="video"></slot> -->
    <v-layout mt-10>
      <v-flex class="search-box" >
    <songs-search />
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
export default {
  data () {
    return {
      title: 'songs',
      songs: null
    }
  },
  components: {
    Panel,
    SongsSearch
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
<style>
.search-box {
  margin-top: 12px;
}
</style>
