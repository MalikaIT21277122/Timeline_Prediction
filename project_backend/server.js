require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5001; // ✅ Changed to 5001 to avoid conflict with Flask
const FLASK_API = "http://127.0.0.1:5000"; // ✅ Flask API URL

// ✅ Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Route to Fetch Predictions from Flask API
app.get("/api/predictions", async (req, res) => {
    try {
        const response = await axios.get(`${FLASK_API}/predict`);
        res.json(response.data); // ✅ Send predictions to frontend
    } catch (error) {
        console.error("❌ Error fetching predictions:", error.message);
        res.status(500).json({ error: "Failed to fetch predictions from Flask API" });
    }
});

// ✅ Route to Fetch All Projects from Flask API
app.get("/api/projects", async (req, res) => {
    try {
        console.log("📡 Fetching projects from Flask API...");
        const response = await axios.get(`${FLASK_API}/get_projects`);
        console.log("✅ Flask API Response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching projects:", error.message);
        res.status(500).json({ error: "Failed to fetch projects from Flask API" });
    }
});

// ✅ Route to Fetch **Specific Project Details** from Flask API
app.get("/api/projects/:project_id", async (req, res) => {
    try {
        const { project_id } = req.params;
        console.log(`📡 Fetching details for project ${project_id} from Flask API...`);
        const response = await axios.get(`${FLASK_API}/get_project_details/${project_id}`);
        console.log("✅ Project Details received:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error(`❌ Error fetching project ${project_id}:`, error.message);
        res.status(500).json({ error: "Failed to fetch project details from Flask API" });
    }
});

// ✅ Start Node.js Server
app.listen(PORT, () => {
    console.log(`🚀 Node.js backend is running on http://localhost:${PORT}`);
});
