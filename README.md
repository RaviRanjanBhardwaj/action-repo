# GitHub Webhook Receiver (webhook-repo)

A Flask-based webhook receiver that captures GitHub events (Push, Pull Request, Merge) and displays them in a real-time UI.

change

## Features

- 🔔 Receives GitHub webhook events for Push, Pull Request, and Merge actions
- 💾 Stores events in MongoDB with proper schema
- 🖥️ Clean, modern UI that polls for updates every 15 seconds
- 🎨 Color-coded event cards for different action types
- ⚡ Real-time event monitoring

## Prerequisites

- Python 3.8 or higher
- MongoDB (local or MongoDB Atlas)
- GitHub account
- ngrok or similar tool for local webhook testing (optional)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/webhook-repo.git
cd webhook-repo
```

### 2. Create a virtual environment

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and update with your MongoDB connection string:

```
MONGO_URI=mongodb://localhost:27017/github_webhooks
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/github_webhooks
```

### 5. Set up MongoDB

**Option A: Local MongoDB**
- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update MONGO_URI in `.env`

## Running the Application

### Start the Flask server

```bash
python app.py
```

The application will be available at `http://localhost:5000`

### For Production

Use gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Setting Up GitHub Webhooks

### 1. Make your local server accessible (for testing)

If testing locally, use ngrok:

```bash
ngrok http 5000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

### 2. Configure GitHub webhook

1. Go to your `action-repo` repository on GitHub
2. Click **Settings** → **Webhooks** → **Add webhook**
3. Configure:
   - **Payload URL**: `https://your-domain.com/webhook` (or ngrok URL)
   - **Content type**: `application/json`
   - **Secret**: (optional, but recommended)
   - **Events**: Select individual events:
     - ✅ Pushes
     - ✅ Pull requests
4. Click **Add webhook**

### 3. Test the webhook

- Make a push to your `action-repo`
- Create a pull request
- Merge a pull request
- Check the UI at `http://localhost:5000` to see events appear

## API Endpoints

### `POST /webhook`
Receives GitHub webhook events

**Headers:**
- `X-GitHub-Event`: Event type (push, pull_request, etc.)

**Response:**
```json
{
  "message": "Webhook processed successfully"
}
```

### `GET /api/events`
Returns the latest 20 events

**Response:**
```json
[
  {
    "request_id": "abc123",
    "author": "john_doe",
    "action": "PUSH",
    "from_branch": null,
    "to_branch": "main",
    "timestamp": "30 January 2026 - 02:30 PM UTC"
  }
]
```

### `GET /`
Serves the main UI

### `GET /health`
Health check endpoint

## MongoDB Schema

Events are stored with the following structure:

```javascript
{
  request_id: String,      // Unique identifier for the event
  author: String,          // GitHub username of the actor
  action: String,          // "PUSH", "PULL_REQUEST", or "MERGE"
  from_branch: String,     // Source branch (null for push)
  to_branch: String,       // Target branch
  timestamp: Date          // UTC timestamp
}
```

## UI Display Format

**PUSH:**
```
{author} pushed to {to_branch} on {timestamp}
Example: "Travis" pushed to "staging" on 1st April 2021 - 9:30 PM UTC
```

**PULL_REQUEST:**
```
{author} submitted a pull request from {from_branch} to {to_branch} on {timestamp}
Example: "Travis" submitted a pull request from "staging" to "master" on 1st April 2021 - 9:00 AM UTC
```

**MERGE:**
```
{author} merged branch {from_branch} to {to_branch} on {timestamp}
Example: "Travis" merged branch "dev" to "master" on 2nd April 2021 - 12:00 PM UTC
```

## Project Structure

```
webhook-repo/
├── app.py                 # Main Flask application
├── templates/
│   └── index.html        # UI template
├── requirements.txt      # Python dependencies
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Troubleshooting

### Webhook not receiving events
- Check if ngrok is running (for local testing)
- Verify webhook URL in GitHub settings
- Check Flask console for error messages
- Verify MongoDB connection

### Events not appearing in UI
- Check MongoDB connection
- Verify events are being stored: `mongo` → `use github_webhooks` → `db.events.find()`
- Check browser console for JavaScript errors

### MongoDB connection issues
- Verify MongoDB is running
- Check MONGO_URI in `.env`
- For Atlas: Whitelist your IP address

## Deployment

### Heroku

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Add MongoDB addon:
```bash
heroku addons:create mongolab:sandbox
```

3. Deploy:
```bash
git push heroku main
```

4. Update GitHub webhook URL to Heroku app URL

### Other Platforms
- AWS EC2
- Google Cloud Run
- DigitalOcean
- Render

## Security Considerations

- Use webhook secrets to verify GitHub requests
- Keep MongoDB connection string secure (use environment variables)
- Use HTTPS in production
- Implement rate limiting for the webhook endpoint
- Validate and sanitize webhook payloads

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and questions, please create an issue in the GitHub repository.

## Acknowledgments

- Flask documentation
- GitHub Webhooks documentation
- MongoDB documentation

