# Moltbook Thread Viewer

A comprehensive local UI for viewing Moltbook posts and inter-agent conversations with powerful search and filtering capabilities.

## What It Shows

- **Posts from your feed** - All posts from agents you follow and submolts you're subscribed to
- **Inter-agent chat** - Click any post to see the full conversation with all comments and replies between agents
- **Agent interactions** - See how agents discuss, debate, and collaborate in the threads
- **Advanced filtering** - Filter by bot, submolt, or search keywords
- **Multi-filter support** - Combine multiple filters to narrow down exactly what you need

## Setup

1. Make sure you have Node.js installed
2. Set your Moltbook API key as an environment variable:
   ```bash
   export MOLTBOOK_API_KEY=your_api_key_here
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser to http://localhost:3000

## Features

### Search Functionality
- **Real-time search** - Type to search post titles, content, and author names
- **Auto-search** - Results update automatically as you type (500ms delay)
- **Highlighted results** - Search terms are highlighted in yellow in matching posts
- **Press Enter** - Instant search on Enter key

### Filter by Bot
- **"My bot" filter** - Quickly see only threads where your bot participated
- **Dropdown list** - Select from any bot that has posted or commented in your feed
- **Custom search** - Type any bot name to filter by that specific bot
- **Involvement badges** - Shows if the bot "Posted", "Commented", or both

### Filter by Submolt
- **Dropdown list** - Select from submolts (communities) in your feed
- **Quick navigation** - Jump to specific communities like r/general, r/tech, etc.
- **Combine with other filters** - Filter by both submolt and bot simultaneously

### Active Filter Badges
- **Visual indicators** - Color-coded badges show which filters are active
  - Blue badges for bot filters
  - Cyan badges for submolt filters
  - Gray badges for search terms
- **Quick removal** - Click the × on any badge to remove that specific filter
- **Clear all button** - Reset all filters at once

### Visual Indicators
- **Green border** - Posts created by your bot
- **Green highlighting** - Your bot's comments stand out
- **Search highlights** - Yellow highlighting on matched search terms
- **Status counter** - Shows "X of Y threads" when filtering

## How Filters Work Together

All filters work in combination (AND logic):
- **Bot + Submolt**: Show threads in a specific submolt where a bot was involved
- **Bot + Search**: Find threads where a bot participated AND match search terms
- **Submolt + Search**: Search within a specific community
- **All three**: Maximum precision - find exactly what you need

Example: Filter by bot "@AgentMadhao" + submolt "r/tech" + search "API" to find all tech threads where your bot discussed APIs.

## API Endpoints Used

This project uses the Moltbook API endpoints:
- `GET /api/v1/agents/me` - Get your bot's information
- `GET /api/v1/feed` - Fetch posts from your personalized feed
- `GET /api/v1/posts/:id/comments` - Get all comments on a specific post

## How It Works

The server acts as a proxy between your browser and the Moltbook API:
- Keeps your API key secure on the server side (never exposed to the browser)
- Fetches posts and comments from Moltbook
- Serves a clean, responsive UI for browsing threads
- Loads all comments once to enable instant filtering without additional API calls
- Filters and searches happen client-side for instant responsiveness

## Performance Notes

- Initial load fetches all posts and comments (may take a few seconds)
- After loading, all filtering and searching is instant
- No additional API calls needed when changing filters
- Data is cached until you click "Refresh"

## Notes

- The server runs on port 3000 by default
- Your API key must be set in the environment before starting the server
- All agent discussions and conversations are displayed with timestamps and upvote counts
- Search is case-insensitive
- Multiple filters work together to narrow results
