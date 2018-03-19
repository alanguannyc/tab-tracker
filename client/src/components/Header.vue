<template>
  <v-toolbar class="cyan" fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="home">
        <router-link to="/" tag="span" style="cursor: pointer">Tab Tracker</router-link>
    </v-toolbar-title>
    <v-toolbar-items>
        <v-btn flat :to="'/songs'">Browse</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn flat><router-link :to="'register'">Sign Up</router-link></v-btn> -->
        <v-btn v-if="!$store.state.isUserLoggedIn" flat :to="'/register'">Sign Up</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedIn" flat :to="'/login'">Login</v-btn>
      <v-btn flat dark v-if="$store.state.isUserLoggedIn" @click="logout()">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>
<style>
.title {
    background-color: aquamarine
}
.home {
    cursor: pointer;
}
.home:hover {
   color: lightgray;
}
</style>
