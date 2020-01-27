<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="6" md="6" sm="8">
      <v-card class="elevation-12">
        <v-overlay :value="loading" absolute color="grey lighten-1">
          <v-progress-circular :size="70" color="blue" indeterminate />
        </v-overlay>
        <v-toolbar color="blue" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <ValidationObserver v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  v-model="email"
                  :error-messages="errors"
                  label="E-mail"
                  name="email"
                  prepend-icon="mdi-email"
                  autocomplete="email"
                  clearable
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="password"
                rules="required|min:6|max:16"
              >
                <v-text-field
                  v-model="password"
                  :error-messages="errors[0]"
                  :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPass ? 'text' : 'password'"
                  @click:append="showPass = !showPass"
                  prepend-icon="mdi-lock-question"
                  name="password"
                  label="Password"
                  hint="At least 6 characters"
                  counter="16"
                  autocomplete="password"
                />
              </ValidationProvider>
              <v-row class="mt-4">
                <v-btn
                  :to="{ name: 'auth-register' }"
                  outlined
                  color="blue darken-1"
                  text
                >
                  <v-icon left>mdi-arrow-left</v-icon>
                  Register
                </v-btn>
                <v-spacer />
                <v-btn type="submit" outlined color="blue darken-1" text>
                  Login
                </v-btn>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'auth',
  meta: {
    guest: true
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  head() {
    return {
      title: 'Login'
    }
  },
  data() {
    return {
      email: null,
      password: null,
      showPass: false
    }
  },
  computed: {
    ...mapState('auth', ['loading'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    onSubmit() {
      const data = { email: this.email, password: this.password }
      this.login(data)
    }
  }
}
</script>
