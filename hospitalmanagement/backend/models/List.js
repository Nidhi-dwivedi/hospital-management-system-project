const mongoose = require('mongoose');

// Define hospital schema
const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    imageUrl: { type: String, required: true },
    specialities: [{ type: String }],  // Array of strings for specialities
    rating: { type: Number, min: 0, max: 5 }  // Rating should be between 0 and 5
});

// Create the Hospital model
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
