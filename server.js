const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ELEVATE_API_BASE = "https://api.elevateai.com/v1/interactions";
const API_TOKEN = "YOUR_API_TOKEN_HERE"; // Replace with your actual API token

// Proxy Declare API
app.post("/declare", async (req, res) => {
    try {
        const response = await axios.post(`${ELEVATE_API_BASE}/declare`, req.body, {
            headers: { "Authorization": `Bearer ${API_TOKEN}`, "Content-Type": "application/json" }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Proxy Upload API
app.post("/upload/:interactionId", async (req, res) => {
    try {
        const { interactionId } = req.params;
        const response = await axios.post(`${ELEVATE_API_BASE}/upload/${interactionId}`, req.body, {
            headers: { "Authorization": `Bearer ${API_TOKEN}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Proxy running on http://localhost:${PORT}`));
