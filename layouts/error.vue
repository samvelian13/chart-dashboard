<template>
  <v-app dark>
    <div
      class="fill-height blue white--text d-flex flex-column flex-wrap justify-center align-center text-capitalize"
    >
      <div class="display-4 font-weight-thin">{{ error.statusCode }}</div>
      <div class="display-1 font-weight-thin text-center">
        {{ error.statusCode === 404 ? pageNotFound : otherError }}
      </div>
      <v-btn
        :to="{ name: 'auth-login' }"
        outlined
        color="white"
        class="mt-3 font-weight-thin"
      >
        <v-icon left>mdi-home</v-icon> go back
      </v-btn>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: 'Oops.... page not found',
      otherError: 'An error occurred'
    }
  }
}
</script>
