<template>
  <v-snackbar
    :value="snackbar.value"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    :right="snackbar.x === 'right'"
    :top="snackbar.y === 'top'"
  >
    <div v-if="typeof snackbar.text === 'object'">
      <p
        v-for="(item, key, index) in snackbar.text"
        :key="index"
        class="font-weight-medium text-capitalize"
      >
        {{ `${key} : ${item}` }}
      </p>
    </div>
    <span v-else>{{ snackbar.text }}</span>
    <v-btn dark text>
      <v-icon @click="snackbarClose()">
        mdi-close
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SnackBar',
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    ...mapMutations(['snackbarClose'])
  }
}
</script>
