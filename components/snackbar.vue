<template>
  <v-snackbar v-bind="settings" :timeout="4000" @input="hide" right top>
    <div v-if="typeof settings.text === 'object'">
      <p
        v-for="(item, key, index) in settings.text"
        :key="index"
        class="font-weight-medium text-capitalize"
      >
        {{ `${key} : ${item}` }}
      </p>
    </div>
    <span v-else>{{ settings.text }}</span>
    <v-btn dark text>
      <v-icon @click="hide">
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
    ...mapState('snackbar', ['settings'])
  },
  methods: {
    ...mapMutations('snackbar', ['hide'])
  }
}
</script>
