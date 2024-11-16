const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');

// Define storage for multer (file upload)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Upload to 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename is unique
    }
});

// Initialize multer with storage settings
const upload = multer({ storage: storage });

// Create the uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Handle file upload route
app.post('/upload', upload.single('resume'), (req, res) => {
    if (req.file) {
        res.send('File uploaded successfully');
    } else {
        res.status(400).send('Error: No file uploaded');
    }
});

// Serve static files (if needed)
app.use(express.static('public'));

// Listen on a port
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
