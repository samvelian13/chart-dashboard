import { extend } from 'vee-validate'
import { required, email, min, max, confirmed } from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en'

extend('required', {
  ...required,
  message: messages.required
})
extend('email', {
  ...email,
  message: messages.email
})
extend('min', {
  ...min,
  message: messages.min
})
extend('max', {
  ...max,
  message: messages.max
})
extend('confirmed', {
  ...confirmed,
  message: messages.confirmed
})
