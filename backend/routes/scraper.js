const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Basic: Try to grab JSON-LD
    const jsonLd = $('script[type="application/ld+json"]').html();
    if (jsonLd) {
      const recipeData = JSON.parse(jsonLd);
      if (recipeData['@type'] === 'Recipe') {
        return res.json({
          title: recipeData.name,
          ingredients: recipeData.recipeIngredient,
          instructions: recipeData.recipeInstructions.map(i => i.text || i),
          image: recipeData.image,
        });
      }
    }

    // Fallback example
    const title = $('h1').first().text();
    const ingredients = [];
    $('li.ingredient').each((i, el) => ingredients.push($(el).text()));
    const instructions = [];
    $('li.instruction').each((i, el) => instructions.push($(el).text()));
    res.json({ title, ingredients, instructions });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape recipe' });
  }
});

module.exports = router;
