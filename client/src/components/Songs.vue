<template>
  <v-app id="inspire">
    <!-- <slot name="video"></slot> -->
   <panel :title =" title " >
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
  </v-app>
</template>
<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      title: 'songs',
      songs: null
    }
  },
  components: {
    Panel
  },
  async mounted () {
    // await console.log(SongsService.index())
    this.songs = (await SongsService.index()).data
  }
}
</script>
