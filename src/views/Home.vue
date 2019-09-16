<template>
  <ol>
    <li v-for="(recipe, i) in recipes" :key="i">
      <router-link :to="{ name: 'update-recipe', params: { id: recipe.id } }">
        {{ recipe }}
      </router-link>
    </li>
  </ol>
</template>

<script>
import db from '@/db'

export default {
  data() {
    return {
      recipes: [],
    }
  },
  firestore: {
    recipes: db.collection('recipes'),
  },
}
</script>
