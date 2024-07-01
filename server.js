import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

// Endpoint to fetch data from Smartsheet API
app.get('/sheets/:sheetId', async (req, res) => {
    const sheetId = req.params.sheetId;
    const accessToken = 'Bearer gQ3HdjTb6CnJdZVR3pWWU0VjhyCciSOFoN03j'; // Replace with your actual API token

    try {
        const response = await fetch(`https://api.smartsheet.com/2.0/sheets/${sheetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from Smartsheet:', error);
        res.status(500).json({ error: 'Failed to fetch data from Smartsheet API' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
