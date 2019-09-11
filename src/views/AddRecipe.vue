<template>
  <form novalidate @submit.prevent="saveRecipe">
    <label>
      Title
      <input type="text" v-model="recipe.title">
    </label>
    <label>
      Ingredients
      <ul>
        <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
          <input
            type="text"
            ref="ingredientInputs"
            v-model="recipe.ingredients[i]"
            @keyup.enter="addIngredient(i)"
            @keydown.backspace="removeIngredient($event, i)">
        </li>
      </ul>
    </label>
    <label>
      Steps
      <ul>
        <li v-for="(step, i) in recipe.steps" :key="i">
          <input
            type="text"
            ref="stepInputs"
            v-model="recipe.steps[i]"
            @keyup.enter="addStep(i)"
            @keydown.backspace="removeStep($event, i)">
        </li>
      </ul>
    </label>
    <button type="submit">Save</button>
  </form>
</template>

<script>
import db from '@/db';

export default {
  data() {
    return {
      recipe: {
        title: null,
        ingredients: [null],
        steps: [null],
      },
    }
  },
  methods: {
    addIngredient(i) {
      this.recipe.ingredients.push(null)
      // refs aren't updated immediately
      this.$nextTick(() => {
        // focus the just created empty input
        this.$refs.ingredientInputs[i + 1].focus()
      })
    },
    removeIngredient($event, i) {
      if (!this.recipe.ingredients[i] && this.recipe.ingredients.length > 1) {
        $event.preventDefault()
        this.recipe.ingredients.splice(i, 1)
        this.$refs.ingredientInputs[i - 1].focus()
      }
    },
    addStep(i) {
      this.recipe.steps.push(null)
      // refs aren't updated immediately
      this.$nextTick(() => {
        // focus the just created empty input
        this.$refs.stepInputs[i + 1].focus()
      })
    },
    removeStep($event, i) {
      if (!this.recipe.steps[i] && this.recipe.steps.length > 1) {
        $event.preventDefault()
        this.recipe.steps.splice(i, 1)
        this.$refs.stepInputs[i - 1].focus()
      }
    },
    saveRecipe() {
      db.collection('recipes').add(this.recipe)
    }
  }
};
</script>
