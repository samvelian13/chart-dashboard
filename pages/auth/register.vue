<template>
  <v-row align="center" justify="center">
    <v-col cols="12" lg="6" md="6" sm="8">
      <v-card class="elevation-12">
        <v-overlay :value="false" absolute="absolute">
          <v-progress-circular :size="50" color="blue" indeterminate />
        </v-overlay>
        <v-toolbar color="blue" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <ValidationObserver v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(onSubmit)">
              <ValidationProvider
                v-slot="{ errors }"
                name="user name"
                rules="required|min:4"
              >
                <v-text-field
                  v-model="userName"
                  :error-messages="errors"
                  label="User Name"
                  name="userName"
                  prepend-icon="mdi-account"
                  clearable
                  autocomplete="off"
                />
              </ValidationProvider>

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
                  clearable
                  autocomplete="off"
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="password"
                rules="required|min:6|max:16"
                vid="password"
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
                  autocomplete="new-password"
                />
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="confirmation password"
                rules="required|confirmed:password"
              >
                <v-text-field
                  v-model="confirmPass"
                  :error-messages="errors[0]"
                  :append-icon="showConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showConfirmPass ? 'text' : 'password'"
                  @click:append="showConfirmPass = !showConfirmPass"
                  prepend-icon="mdi-lock-question"
                  name="confirmPass"
                  label="Confirm Password"
                  hint="At least 6 characters"
                  counter="16"
                  autocomplete="new-password"
                />
              </ValidationProvider>
              <v-row class="mt-4">
                <v-btn
                  :to="{ name: 'auth-login' }"
                  outlined
                  color="blue darken-1"
                  text
                >
                  <v-icon left>mdi-arrow-left</v-icon>
                  Login
                </v-btn>
                <v-spacer />
                <v-btn type="submit" outlined color="blue darken-1" text>
                  Register
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
      title: 'Register'
    }
  },
  data() {
    return {
      userName: null,
      email: null,
      password: null,
      confirmPass: null,
      showPass: false,
      showConfirmPass: false
    }
  },
  computed: {
    ...mapState('auth', ['loading'])
  },
  methods: {
    ...mapActions('auth', ['register']),
    onSubmit() {
      const data = {
        userName: this.userName,
        email: this.email,
        password: this.password
      }
      this.register(data)
    }
  }
}
</script>
