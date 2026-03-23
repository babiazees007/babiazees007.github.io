const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Serve index (6).html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index (6).html'));
});

// Serve admin.html
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// API to get data
app.get('/api/data', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data.json' });
        }
        res.json(JSON.parse(data));
    });
});

// API to save data
app.post('/api/save', (req, res) => {
    const newData = req.body;
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save data.json' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
});
