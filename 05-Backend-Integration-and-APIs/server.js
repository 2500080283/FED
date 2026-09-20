const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const coursesDB = [
    { code: '24CS2101', name: 'Front End Development', credits: 4, faculty: 'Dr. Ramesh Kumar', room: 'C-302' },
    { code: '24CS2102', name: 'Database Management Systems', credits: 4, faculty: 'Prof. S. Lakshmi', room: 'C-304' },
    { code: '24CS2103', name: 'Operating Systems', credits: 3, faculty: 'Dr. V. Prasad', room: 'C-302' },
    { code: '24CS2104', name: 'Artificial Intelligence & ML', credits: 3, faculty: 'Dr. K. Srinivas', room: 'C-306' }
];

const feedbackDB = [];

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'FED Lab Backend REST API',
        port: PORT,
        courses: coursesDB.length
    });
});

// GET /api/courses
app.get('/api/courses', (req, res) => {
    res.json({
        success: true,
        message: 'Courses fetched successfully from backend REST API',
        data: coursesDB
    });
});

// POST /api/feedback
app.post('/api/feedback', (req, res) => {
    const { studentId, courseCode, comments, rating } = req.body;

    if (!studentId || !courseCode || !comments) {
        return res.status(400).json({ success: false, error: 'Student ID, course code, and comments are required.' });
    }

    const feedback = {
        id: feedbackDB.length + 1,
        studentId: String(studentId),
        courseCode,
        comments,
        rating: Number(rating) || 5,
        submittedAt: new Date().toISOString()
    };

    feedbackDB.push(feedback);

    res.status(201).json({
        success: true,
        message: 'Feedback recorded successfully on backend server!',
        data: feedback
    });
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`FED Lab Backend Server running at http://localhost:${PORT}`);
    });
}
