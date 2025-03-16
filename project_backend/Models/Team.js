const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    team_id: { type: String, required: true, unique: true },
    team_name: String,
    team_experience_level: Number,  // ✅ Updated from average_experience
    total_members: Number,
    past_projects_completed: Number,
    specialization: String,
    team_skillset_match: Number,  // ✅ Added (Used in Model)
    team_availability: Number  // ✅ Added (Used in Model)
});

module.exports = mongoose.model('Team', TeamSchema);
