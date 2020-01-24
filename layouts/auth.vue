<template>
  <v-app>
    <v-content>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-content>
    <snack-bar />
  </v-app>
</template>

<script>
import snackBar from '../components/snackbar'
export default {
  middleware: 'guest',
  components: {
    snackBar
  }
}
</script>
