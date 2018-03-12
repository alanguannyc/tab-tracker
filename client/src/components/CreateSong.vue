<template>
  <v-layout>
      <v-flex xs4 class="leftCard">
              <v-form class="px-0" ref="form1">
                <v-text-field
                label="title"
                v-model="songs.title"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="artist"
                v-model="songs.artist"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="genre"
                v-model="songs.genre"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="album"
                v-model="songs.album"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="albumImageUrl"
                v-model="songs.albumImageUrl"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="youtubeId"
                v-model="songs.youtubeId"
                :rules="nameRules"
                required
                ></v-text-field>
                <!-- <v-text-field
                label="youtubeId"
                v-model="songs.youtubeId"
                :rules="nameRules"
                required
                ></v-text-field> -->
              </v-form>
      </v-flex>
      <v-flex xs8 class="ml-4">
        <v-form id="form" class="px-0" ref="form2">
          <v-text-field
                label="tab"
                multi-line
                v-model="songs.tab"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="lyrics"
                multi-line
                v-model="songs.lyrics"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-btn
                @click="create()"
                >Create</v-btn>
                <v-btn
                v-if="!empty"
                @click="clear()"
                >Cancle</v-btn>
                </v-form>
      </v-flex>
  </v-layout>
</template>
<script>
import SongsSerive from '@/services/SongsService'
export default {
  data () {
    return {
      songs: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      nameRules: [
        v => !!v || 'This field is required'
      ]
    }
  },
  methods: {
    async create () {
      try {
        await SongsSerive.create(this.songs)
        this.$router.push({name: 'songs'})
      } catch (err) {
        console.log(err)
      }
    },
    clear () {
      this.$refs.form1.reset()
      this.$refs.form2.reset()
    }
  },
  computed: {
    empty: function () {
      for (var key in this.songs) {
        // console.log(this.songs[key])
        if (this.songs[key] === null) {
          return false
        }
        return true
      }
    }
  }
}
</script>
<style>
.leftCard {
margin: 10px 2px;
}
label {
color: blue !important;
}
</style>
