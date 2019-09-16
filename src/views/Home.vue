<template>
  <ol>
    <li v-for="(recipe, i) in recipes" :key="i">
      {{ recipe.title }}
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
  firebase: {
    recipes: db.collection('recipes'),
  },
}
</script>
