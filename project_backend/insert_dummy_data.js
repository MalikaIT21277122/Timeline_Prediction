require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Project = require('./Models/Project'); // Import Project model
const Team = require('./Models/Team'); // Import Team model

// ✅ MongoDB Connection URI
const mongoURI = process.env.MONGO_URI;

console.log("🔄 Connecting to MongoDB...");

// 🚀 Connect to MongoDB
mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 10000, // Timeout after 10s
    connectTimeoutMS: 10000, // Increase connection timeout
    family: 4 // Force IPv4 (fixes connection issues)
})
.then(async () => {
    console.log('✅ MongoDB Connected Successfully');

    try {
        // 🗑️ Remove Old Project & Team Data
        console.log('🗑️ Deleting old project and team data...');
        const projectDeleteResult = await Project.deleteMany({});
        const teamDeleteResult = await Team.deleteMany({});

        console.log(`✅ Deleted ${projectDeleteResult.deletedCount} projects`);
        console.log(`✅ Deleted ${teamDeleteResult.deletedCount} teams`);

        // ✅ Read New JSON Data
        const projectsData = JSON.parse(fs.readFileSync('projects.json', 'utf-8'));
        const teamsData = JSON.parse(fs.readFileSync('teams.json', 'utf-8'));

        // 📥 Insert New Team Data
        console.log('📥 Inserting new team data...');
        const insertedTeams = await Team.insertMany(teamsData);
        console.log(`✅ ${insertedTeams.length} teams inserted successfully!`);

        // 🛠️ Create a mapping of `team_id` to MongoDB `_id`
        const teamMap = {};
        insertedTeams.forEach(team => {
            teamMap[team.team_id] = team._id;
        });

        // 📥 Insert New Project Data (Map `team_id` to `_id`)
        console.log('📥 Inserting new project data...');
        const updatedProjects = projectsData.map(project => ({
            ...project,
            assigned_team: teamMap[project.team_id], // ✅ Map to ObjectId
        }));

        await Project.insertMany(updatedProjects);
        console.log(`✅ ${updatedProjects.length} projects inserted successfully!`);

    } catch (err) {
        console.error('❌ Error while updating dummy data:', err);
    } finally {
        // 🔌 Close MongoDB connection
        mongoose.connection.close();
        console.log('🔌 MongoDB connection closed.');
    }
})
.catch(err => {
    console.error('❌ Connection Error:', err);
});
