import React, { useState } from 'react';
import axios from 'axios';

const CreateHospital = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [specialities, setSpecialities] = useState([]);
    const [rating, setRating] = useState('');

    const handleSpecialitiesChange = (event) => {
        const options = event.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setSpecialities(selectedValues);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            name,
            city,
            imageUrl,
            specialities,
            rating: parseFloat(rating)
        };

        try {
            const response = await axios.post('http://localhost:3001/api/hospitals/create', data);
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create hospital');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Create Hospital</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label htmlFor="city" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>City:</label>
                    <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label htmlFor="imageUrl" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Image URL:</label>
                    <input
                        type="url"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <div>
                    <label htmlFor="specialities" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Specialities:</label>
                    <select
                        id="specialities"
                        multiple
                        value={specialities}
                        onChange={handleSpecialitiesChange}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '100px' }}
                    >
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Orthopedics">Orthopedics</option>
                        {/* Add more options as needed */}
                    </select>
                </div>

                <div>
                    <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rating (0-5):</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="0"
                        max="5"
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '15px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Create Hospital
                </button>
            </form>
        </div>
    );
};

export default CreateHospital;
