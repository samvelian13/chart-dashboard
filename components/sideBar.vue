<template>
  <v-navigation-drawer
    v-click-outside="closeMainBar"
    :mini-variant="mini"
    :temporary="!mini"
    app
    color="blue"
    permanent
    dark
    fixed
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line class="px-0">
        <v-list-item-avatar>
          <v-icon x-large>mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Nuxt Dashboard</v-list-item-title>
          <v-list-item-subtitle>
            {{ user && user.userName }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-3" />
      <v-list-item
        v-for="item in menu"
        :key="item.title"
        :to="item.to"
        exact
        link
      >
        <v-tooltip :disabled="!mini" right>
          <template v-slot:activator="{ on }">
            <v-list-item-icon v-on="on">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </template>
          <span class="text-capitalize">{{ item.title }}</span>
        </v-tooltip>

        <v-list-item-content>
          <v-list-item-title class="text-capitalize">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="onLogout">
        <v-tooltip :disabled="!mini" right>
          <template v-slot:activator="{ on }">
            <v-list-item-icon v-on="on">
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
          </template>
          <span class="text-capitalize">logout</span>
        </v-tooltip>

        <v-list-item-content>
          <v-list-item-title class="text-capitalize">
            logout
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:prepend>
      <div
        :class="'text-' + (mini ? 'center' : 'right')"
        class="sidebar-toggle"
      >
        <v-btn @click="mini = !mini" icon>
          <v-icon large>
            mdi-menu
          </v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import clickOutside from '~/directives/clickOutside'

export default {
  name: 'SideBar',
  directives: {
    clickOutside
  },
  data() {
    return {
      mini: true,
      menu: []
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapMutations('auth', ['logout']),
    closeMainBar() {
      this.mini = true
    },
    onLogout() {
      this.logout()
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-toggle {
  margin-top: 10px;
}
</style>
