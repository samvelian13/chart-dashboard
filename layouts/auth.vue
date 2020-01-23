<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <snack-bar />
  </v-app>
</template>
<script>
import snackBar from '../components/snackbar'
export default {
  components: {
    snackBar
  }
}
</script>
