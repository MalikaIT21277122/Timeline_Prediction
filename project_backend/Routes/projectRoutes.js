require("dotenv").config();
const express = require("express");
const axios = require("axios");

const router = express.Router();  // ✅ Express Router
const FLASK_API = "http://127.0.0.1:5000"; // Flask backend URL

// ✅ Fetch All Projects (From Flask API)
router.get("/projects", async (req, res) => {
    try {
        console.log("📡 Fetching projects from Flask API...");
        const response = await axios.get(`${FLASK_API}/get_projects`);
        console.log("✅ Projects received:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("❌ Error fetching projects:", error.message);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// ✅ Fetch **Specific Project Details** (From Flask API)
router.get("/projects/:project_id", async (req, res) => {
    try {
        const { project_id } = req.params;
        console.log(`📡 Fetching details for project ${project_id} from Flask API...`);
        const response = await axios.get(`${FLASK_API}/get_project_details/${project_id}`);
        console.log("✅ Project Details received:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error(`❌ Error fetching project ${project_id}:`, error.message);
        res.status(500).json({ error: "Failed to fetch project details" });
    }
});

module.exports = router; // ✅ Export router
