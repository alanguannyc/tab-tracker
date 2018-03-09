<template>
  <v-app id="inspire">
    <!-- <slot name="video"></slot> -->
   <panel :title =" title " >
       <slot>Do we have video?</slot>
    <slot name="video"></slot>
   </panel>
  </v-app>
</template>
<script>
import Panel from '@/components/Panel'
export default {
  data () {
    return {
      title: 'songs',
      email: '',
      password: '',
      error: null
    }
  },
  components: {
    Panel
  }
}
</script>
