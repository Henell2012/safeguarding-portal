const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const FILE = path.join(__dirname, "reports.json");

app.use(express.json());
app.use(express.static("public"));

// Make sure reports file exists
if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
}

// Submit report
app.post("/report", (req, res) => {
    const { name, concern, severity } = req.body;

    if (!concern) {
        return res.status(400).json({ message: "Concern is required" });
    }

    const report = {
        id: Date.now(),
        name: name || "Anonymous",
        concern,
        severity,
        date: new Date().toISOString()
    };

    const data = JSON.parse(fs.readFileSync(FILE));
    data.push(report);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json({ message: "Report submitted successfully" });
});

// Get reports
app.get("/reports", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
