const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    project_id: { type: String, required: true, unique: true },
    team_size: Number,
    task_count: Number,
    completed_tasks: { type: Number, default: 0 }, // ✅ New Field
    developer_experience: Number,
    priority_level: Number, // 1 = Low, 2 = Medium, 3 = High
    task_complexity: Number,
    effort_hours: Number,
    project_size: Number,
    testing_coverage: Number,
    Effort_Density: Number,
    Team_Productivity: Number,
    Effort_per_Team_Member: Number,
    LoC_per_Team_Member: Number,
    defect_fix_time_minutes: Number,
    project_key: Number,
    assigned_team: { type: String, ref: "Team" }, // References Team ID
    size_added: Number,
    size_deleted: Number,
    size_modified: Number,
    requirement_changes: Number, // Number of times requirements changed
    change_impact_factor: Number, // Factor to increase timeline prediction
    start_date: { type: Date, required: true },
    deadline: { type: Date, required: true }, // ✅ New Field
    status: { type: String, default: "In Progress" }, // ✅ New Field
    progress_percentage: { type: Number, default: 0 } // ✅ New Field
});

module.exports = mongoose.model("Project", ProjectSchema);
