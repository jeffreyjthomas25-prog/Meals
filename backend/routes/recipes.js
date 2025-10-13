const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

// Get all recipes
router.get('/', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// Add a recipe
router.post('/', async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.json(recipe);
});

// Delete a recipe
router.delete('/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
