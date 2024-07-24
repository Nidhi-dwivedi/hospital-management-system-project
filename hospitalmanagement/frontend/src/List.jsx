import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/hospitals');
        setHospitals(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch hospitals');
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/hospitals/delete/${id}`);
      setHospitals(hospitals.filter(hospital => hospital._id !== id));
    } catch (error) {
      setError('Failed to delete hospital');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Hospital List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>City</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Image</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Specialities</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Rating</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital._id}>
              <td style={{ padding: '10px' }}>{hospital.name}</td>
              <td style={{ padding: '10px' }}>{hospital.city}</td>
              <td style={{ padding: '10px' }}>
                <img
                  src={hospital.imageUrl}
                  alt={hospital.name}
                  style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                />
              </td>
              <td style={{ padding: '10px' }}>{hospital.specialities.join(', ')}</td>
              <td style={{ padding: '10px' }}>{hospital.rating}</td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => handleDelete(hospital._id)}
                  style={{ backgroundColor: '#d9534f', color: '#fff', border: 'none', padding: '8px 12px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
