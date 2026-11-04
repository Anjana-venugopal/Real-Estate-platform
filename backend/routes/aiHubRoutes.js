const express = require('express');
const axios = require('axios');
const router = express.Router();

const callWithRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (err) {
    const status = err.response?.status;
    if (retries > 0 && (status === 429 || (status >= 500 && status < 600))) {
      await new Promise((r) => setTimeout(r, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw err;
  }
};

router.post('/search', async (req, res) => {
  try {
    const firecrawlKey = req.headers['x-firecrawl-key'] || process.env.FIRECRAWL_API_KEY;
    if (!firecrawlKey) return res.status(400).json({ message: 'Please provide a Firecrawl API Key' });

    const { query, city } = req.body;
    const searchQuery = `${query} for sale in ${city} site:99acres.com OR site:magicbricks.com OR site:housing.com`;

    const response = await callWithRetry(() =>
      axios.post(
        'https://api.firecrawl.dev/v1/search',
        { query: searchQuery, limit: 8 },
        { headers: { Authorization: `Bearer ${firecrawlKey}` } }
      )
    );

    const rawResults = response.data?.data || [];
    const seenUrls = new Set();
    const filtered = rawResults.filter((item) => {
      if (!item.url || seenUrls.has(item.url)) return false;
      seenUrls.add(item.url);
      const text = `${item.title} ${item.description}`.toLowerCase();
      return !text.includes('for rent') && !text.includes('pg ');
    });

    res.json({ results: filtered });
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.error || err.message });
  }
});

module.exports = router;