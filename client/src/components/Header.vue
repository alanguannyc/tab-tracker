<template>
  <v-toolbar class="cyan" fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="home">
        <router-link to="/" tag="span" style="cursor: pointer">Tab Tracker</router-link>
        </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn flat><router-link :to="'register'">Sign Up</router-link></v-btn> -->
        <v-btn flat :to="'register'">Sign Up</v-btn>
      <v-btn flat :to="'login'">Login</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
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
