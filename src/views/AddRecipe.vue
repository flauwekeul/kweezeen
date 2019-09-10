<template>
  <form novalidate @submit.prevent>
    <label>
      Title
      <input type="text" v-model="form.title">
    </label>
    <label>
      Ingredients
      <ul>
        <li v-for="(ingredient, i) in form.ingredients" :key="i">
          <input
            type="text"
            ref="ingredientInputs"
            v-model="form.ingredients[i]"
            @keyup.enter="addIngredient(i)"
            @keydown.backspace="removeIngredient($event, i)">
        </li>
      </ul>
    </label>
    <label>
      Steps
      <ul>
        <li v-for="(step, i) in form.steps" :key="i">
          <input
            type="text"
            ref="stepInputs"
            v-model="form.steps[i]"
            @keyup.enter="addStep(i)"
            @keydown.backspace="removeStep($event, i)">
        </li>
      </ul>
    </label>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: null,
        ingredients: [null],
        steps: [null],
      },
    }
  },
  methods: {
    addIngredient(i) {
      this.form.ingredients.push(null)
      // refs aren't updated immediately
      this.$nextTick(() => {
        // focus the just created empty input
        this.$refs.ingredientInputs[i + 1].focus()
      })
    },
    removeIngredient($event, i) {
      if (!this.form.ingredients[i] && this.form.ingredients.length > 1) {
        $event.preventDefault()
        this.form.ingredients.splice(i, 1)
        this.$refs.ingredientInputs[i - 1].focus()
      }
    },
    addStep(i) {
      this.form.steps.push(null)
      // refs aren't updated immediately
      this.$nextTick(() => {
        // focus the just created empty input
        this.$refs.stepInputs[i + 1].focus()
      })
    },
    removeStep($event, i) {
      if (!this.form.steps[i] && this.form.steps.length > 1) {
        $event.preventDefault()
        this.form.steps.splice(i, 1)
        this.$refs.stepInputs[i - 1].focus()
      }
    }
  }
};
</script>
