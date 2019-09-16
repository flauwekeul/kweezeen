<template>
  <form novalidate @submit.prevent="saveRecipe">
    <label>
      Title
      <input type="text" v-model="recipe.title" />
    </label>
    <label>
      Ingredients
      <ul>
        <li v-for="(ingredient, i) in recipe.ingredients" :key="i">
          <ingredient-input
            ref="ingredientInputs"
            v-model="recipe.ingredients[i]"
            @save="addIngredient(i)"
            @remove="removeIngredient(i)"
          >
          </ingredient-input>
          {{ recipe.ingredients[i] }}
        </li>
      </ul>
    </label>
    <label>
      Steps
      <ol>
        <li v-for="(step, i) in recipe.steps" :key="i">
          <input
            type="text"
            ref="stepInputs"
            v-model="recipe.steps[i]"
            @keydown.enter.prevent
            @keyup.enter="addStep(i)"
            @keydown.backspace="removeStep($event, i)"
          />
        </li>
      </ol>
    </label>
    <button type="submit">Save</button>
  </form>
</template>

<script>
import db from '@/db'
import IngredientInput from '@/components/IngredientInput.vue'

const recipes = db.collection('recipes')

export default {
  components: {
    IngredientInput,
  },
  props: ['id'],
  data() {
    return {
      recipe: {
        title: '',
        ingredients: [{}],
        steps: [''],
      },
    }
  },
  created() {
    if (this.id) {
      this.$bind('recipe', recipes.doc(this.id))
    }
  },
  methods: {
    addIngredient(i) {
      this.recipe.ingredients.push({})
      // refs aren't updated immediately
      this.$nextTick(() => {
        // focus the just created empty input
        this.$refs.ingredientInputs[i + 1].focus()
      })
    },
    removeIngredient(i) {
      if (this.recipe.ingredients.length > 1) {
        this.recipe.ingredients.splice(i, 1)
        this.$refs.ingredientInputs[i - 1].focus()
      }
    },
    addStep(i) {
      this.recipe.steps.push('')
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
      if (this.id) {
        recipes.doc(this.id).update(JSON.parse(JSON.stringify(this.recipe)))
      } else {
        recipes.add(this.recipe).then(({ id }) => {
          this.$router.replace({ name: 'update-recipe', params: { id } })
        })
      }
    },
  },
}
</script>
