<template>
  <!-- <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                  <slot>No Content</slot>
                <v-form>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content> -->
    <v-flex>
          <v-card >
            <v-card-title primary class="title">{{title}}</v-card-title>
            <v-card-text>
              <slot>No Content</slot>
            </v-card-text>
          </v-card>
        </v-flex>
</template>
<script>
export default{
  data () {
    return {
    }
  },
  props: {
    title: ''
  }
}
</script>
