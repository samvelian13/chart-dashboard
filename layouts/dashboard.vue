<template>
  <v-app>
    <side-bar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <snack-bar />
  </v-app>
</template>

<script>
import snackBar from '~/components/snackbar'
import sideBar from '~/components/sideBar.vue'

export default {
  middleware: 'auth',
  components: {
    sideBar,
    snackBar
  }
}
</script>
