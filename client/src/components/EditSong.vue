<template>
  <v-layout>
      <v-flex xs4 class="leftCard">
              <v-form class="px-0" ref="form1">
                <v-text-field
                label="title"
                v-model="song.title"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="artist"
                v-model="song.artist"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="genre"
                v-model="song.genre"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="album"
                v-model="song.album"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="albumImageUrl"
                v-model="song.albumImageUrl"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="youtubeId"
                v-model="song.youtubeId"
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
                v-model="song.tab"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-text-field
                label="lyrics"
                multi-line
                v-model="song.lyrics"
                :rules="nameRules"
                required
                ></v-text-field>
                <v-btn
                @click="save()"
                >save</v-btn>
                <v-btn
                :to="{name: 'song', params: {SongId: song.id }}"
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
      song: {},
      nameRules: [
        v => !!v || 'This field is required'
      ]
    }
  },
  methods: {
    async save () {
      try {
        await SongsSerive.edit(this.song)
        this.$router.push({name: 'song', params: { SongId: this.song.id }})
      } catch (err) {
        console.log(err)
      }
    },
    clear () {
      this.$refs.form1.reset()
      this.$refs.form2.reset()
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.SongId
    this.song = (await SongsSerive.show(songId)).data
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
