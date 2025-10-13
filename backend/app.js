const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipesRouter = require('./routes/recipes');
const scraperRouter = require('./routes/scraper');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mealplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/recipes', recipesRouter);
app.use('/api/scrape', scraperRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
