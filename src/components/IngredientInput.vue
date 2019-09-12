<template>
  <input
    type="text"
    ref="input"
    :value="value.value"
    @input="input"
    @keyup.enter="save"
    @keyup.backspace="removeIfEmpty">
</template>

<script>
const AMOUNT_PATTERN =  /(\d+)?/
// todo: add more units and map them to enum
const UNIT_PATTERN =  /(gram|g)?\b/
const NAME_PATTERN =  /(.+)?/
const WHITESPACE_PATTERN =  /\s*/
const INGREDIENT_PATTERN = new RegExp([
  AMOUNT_PATTERN,
  WHITESPACE_PATTERN,
  UNIT_PATTERN,
  WHITESPACE_PATTERN,
  NAME_PATTERN
].map(pattern => pattern.source).join(''), 'i')

export default {
  name: 'ingredient-input',
  props: {
    value: {
      value: String,
      amount: Number,
      unit: String,
      name: String,
    }
  },
  methods: {
    input($event) {
      const { value } = $event.target
      const match = value.match(INGREDIENT_PATTERN)

      if (!match) {
        return this.$emit('input', { value })
      }

      const [, amount, unit, name] = match
      this.$emit('input', { value, amount, unit, name })
    },
    save() {
      this.$emit('save')
    },
    removeIfEmpty($event) {
      if(!$event.target.value) {
        this.$emit('remove')
      }
    },
    focus() {
      this.$refs.input.focus()
    }
  }
}
</script>
