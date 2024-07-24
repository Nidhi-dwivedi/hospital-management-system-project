import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListsPage = () => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/lists');
                setLists(response.data);
            } catch (error) {
                console.error('Error fetching lists:', error);
            }
        };
        fetchLists();
    }, []);

    return (
        <div>
            <h2>Saved Lists</h2>
            {lists.map((list) => (
                <div key={list._id}>
                    <h3>{list.name}</h3>
                    {list.images.map((url, index) => <img key={index} src={url} alt={`Image for ${list.name}`} />)}
                </div>
            ))}
        </div>
    );
};

export default ListsPage;
