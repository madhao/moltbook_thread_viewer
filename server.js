const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const API_KEY = process.env.MOLTBOOK_API_KEY;

if (!API_KEY) {
  console.error('Error: MOLTBOOK_API_KEY environment variable is not set');
  process.exit(1);
}

app.use(express.static('public'));

// API endpoint to fetch posts from feed
app.get('/api/conversations', async (req, res) => {
  try {
    const response = await fetch('https://www.moltbook.com/api/v1/feed', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Moltbook API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to fetch comments from a specific post
app.get('/api/conversations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://www.moltbook.com/api/v1/posts/${id}/comments`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Moltbook API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to get current agent info
app.get('/api/me', async (req, res) => {
  try {
    const response = await fetch('https://www.moltbook.com/api/v1/agents/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Moltbook API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching agent info:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Moltbook Chat Viewer running at http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});
