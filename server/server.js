require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // for storing token in cookie

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // your frontend
    credentials: true
}));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

// --- Step 1: Redirect user to Todoist OAuth ---
app.get('/auth/login', (req, res) => {
    const state = Math.random().toString(36).substring(2);
    //console.log('Generated OAuth state:', state); 
    const scope = 'data:read_write';
    const authUrl = `https://todoist.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=${scope}&state=${state}&redirect_uri=${process.env.REDIRECT_URI}`;

    res.redirect(authUrl);
});

// --- Step 2/3: Handle callback and exchange code for access token ---
app.get('/auth/callback', async (req, res) => {
    const { code, state } = req.query;

    if (!code || !state) {
        return res.status(400).send('Missing code or state');
    }

    //console.log('State returned from Todoist:', state);
    //console.log('Authorization code:', code);

    try {
        const tokenResponse = await fetch('https://todoist.com/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code,
                redirect_uri: process.env.REDIRECT_URI
            })
        });

        const data = await tokenResponse.json();
        const accessToken = data.access_token;

        //console.log('Access token:', accessToken);

        // Store the access token in a cookie for frontend use
        res.cookie('todoist_token', accessToken, {
            httpOnly: true,
            secure: false, // set to true in production with HTTPS
        });

        // Redirect the user back to your frontend after successful login
        res.redirect('http://localhost:5173');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to exchange code for token');
    }
});

// Route to get tasks from Todoist
app.get('/tasks', async (req, res) => {
    const token = req.cookies.todoist_token;
    if (!token) return res.status(401).send('Not authenticated');

    try {
        const response = await fetch('https://api.todoist.com/rest/v2/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        const tasks = await response.json();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch tasks');
    }
});

// Route to close a task from Todoist
app.post('/tasks/:task_id/close', async (req, res) => {
    const token = req.cookies.todoist_token; // ensure this is being set correctly
    if (!token) {
        return res.status(401).send('Not authenticated with Todoist');
    }

    const { task_id } = req.params;

    try {
        const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${task_id}/close`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text(); // don't parse as JSON if error
            console.error("Todoist API error:", errorText);
            return res.status(response.status).send(errorText);
        }

        return res.json({ success: true, task_id });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Failed to close task');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});