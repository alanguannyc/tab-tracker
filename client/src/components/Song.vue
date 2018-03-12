<template>
<v-container fluid grid-list-xs>
    <v-layout row wrap>
        <v-flex d-flex xs12 sm6>
        <v-layout row wrap>
          <v-flex d-flex xs12 sm12>
              <v-card color="indigo" dark>
                <v-card-text>
                    {{song.title}}
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 >
              <v-card color="indigo" dark>
                <v-card-text>
                    {{song.title}}
                </v-card-text>
              </v-card>
            </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6>
        <v-flex d-flex>
              <v-card color="indigo" dark>
                <v-card-text>
                    {{data}}
                </v-card-text>
              </v-card>
            </v-flex>
      </v-flex>
    </v-layout>
</v-container>
</template>
<script>
import SongsSerive from '@/services/SongsService'
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      song: {},
      data: 'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ips Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsLorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ips'
    }
  },
  async mounted () {
    const songId = this.$store.state.route.params.SongId
    this.song = (await SongsSerive.show(songId)).data
  },
  components: {
    Panel
  }
}
</script>
<style>
</style>
