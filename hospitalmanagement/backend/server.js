require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const Hospital = require('./models/List'); 
const path = require('path');
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;
const MONGOURI = process.env.MONGOURI;
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

app.post('/api/users/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/users/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Failed to sign up. Please try again.' });
    }
});
app.post('/api/hospitals/create', async (req, res) => {
    const { name, city, imageUrl, specialities, rating } = req.body;

    if (!name || !city || !imageUrl || rating === undefined) {
        return res.status(400).json({ message: 'Name, city, image URL, and rating are required' });
    }

    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 0 and 5' });
    }

    try {
        const newHospital = new Hospital({ name, city, imageUrl, specialities, rating });
        await newHospital.save();
        res.status(201).json({ message: 'Hospital created successfully' });
    } catch (error) {
        console.error('Error creating hospital:', error);
        res.status(500).json({ message: 'Failed to create hospital. Please try again.' });
    }
});
app.delete('/api/hospitals/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Hospital.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        console.error('Error deleting hospital:', error);
        res.status(500).json({ message: 'Failed to delete hospital. Please try again.' });
    }
});
app.get('/api/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.find(); // Fetch all hospitals from the database
        res.status(200).json(hospitals); // Send the data back as JSON
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ message: 'Failed to fetch hospitals. Please try again.' });
    }
});

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
