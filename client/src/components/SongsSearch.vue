<template>
    <v-flex >
          <v-card mt-10>
            <v-card-title primary class="title">{{title}}</v-card-title>
            <v-card-text>
              <v-text-field label="search by artist, title, genre" v-model="search">
              </v-text-field>
            </v-card-text>
          </v-card>
        </v-flex>
</template>
<script>
import _ from 'lodash'
export default{
  data () {
    return {
      'title': 'Search',
      'search': null
    }
  },
  watch: {
    search: _.debounce(async function () {
      const route = {
        name: 'Songs'
      }
      if (this.search !== '') {
        route.query = { search: this.search }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>
