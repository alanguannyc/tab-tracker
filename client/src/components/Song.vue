<template>
<v-container fluid grid-list-xs class="container">
    <v-layout row wrap >
        <v-flex d-flex xs12 sm6>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12>
              <v-card color="indigo" dark>
                <v-card-text>
                  <img :src="song.albumImageUrl" class="albumImage">
                   <div>{{song.title}}</div>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs6 >
              <v-card color="indigo" dark>
                <v-card-text>
                    {{song.artist}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs6 >
              <v-card color="indigo" dark>
                <v-card-text>
                    {{song.genre}}
                </v-card-text>
              </v-card>
            </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6>
          <v-card color="indigo" dark>
                <v-card-text>
                  <textarea readonly v-model="song.tab">
                    </textarea>
                </v-card-text>
              </v-card>
      </v-flex>
      <v-flex d-flex xs12 md6>
              <v-card color="indigo" dark>
                <v-card-text>
                    <youtube :video-id="song.youtubeId" :player-height="300"></youtube>
                </v-card-text>
              </v-card>
      </v-flex>
      <v-flex d-flex xs12 md6>
              <v-card color="indigo" dark>
                <v-card-text>
                    <textarea readonly v-model="song.lyrics">
                    </textarea>
                </v-card-text>
              </v-card>
      </v-flex>
      <v-btn left small color="error" @click="remove">delete</v-btn>
    </v-layout>
    <div class="text-xs-right" >
    <v-btn fab dark large color="cyan" right :to="{name: 'edit-song', params: { SongId: song.id }}">
      <v-icon dark>edit</v-icon>
    </v-btn>
    <v-btn v-if="isUserLoggedIn && !isBookmarked" fab dark large color="cyan" right @click="bookmark">
      <v-icon dark>bookmark</v-icon>
    </v-btn>
    <v-btn v-if="isUserLoggedIn && isBookmarked" fab dark large color="cyan" right @click="unbookmark">
      <v-icon dark>cancel</v-icon>
    </v-btn>
    </div>
</v-container>
</template>
<script>
import SongsSerive from '@/services/SongsService'
import BookmarksService from '@/services/BookmarksService'
import Panel from '@/components/Panel'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      isBookmarked: false,
      song: {},
      data: 'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ips Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsLorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ips'
    }
  },
  computed: {
    ...mapState(['isUserLoggedIn'])
  },
  async mounted () {
    const songId = this.$store.state.route.params.songId

    this.song = (await SongsSerive.show(songId)).data

    const bookmark = (await BookmarksService.index({
      SongId: songId,
      UserId: this.$store.state.user.id
    })).data

    this.isBookmarked = !!bookmark
    console.log(bookmark)
  },
  components: {
    Panel
  },
  methods: {
    async remove () {
      if (confirm('Are you sure?')) {
        try {
          await SongsSerive.delete(this.song.id)
          this.$router.push({name: 'Songs'})
        } catch (err) {
          console.log(err)
        }
      }
    },
    async bookmark () {
      try {
        await BookmarksService.post({
          SongId: this.$store.state.route.params.songId,
          UserId: this.$store.state.user.id
        })
        this.isBookmarked = true
      } catch (err) {
        console.log(err)
      }
    },
    async unbookmark () {
      try {
        await BookmarksService.delete({
          songId: this.$store.state.route.params.songId,
          userId: this.$store.state.user.id
        })
        this.isBookmarked = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>
.container {
  margin: 20px 0px;
}
textarea {
  width: 100%;
  height: 300px;
}
.albumImage {
  height: 200px;
}
</style>
