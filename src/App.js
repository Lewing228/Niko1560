import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('/api/user')
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
            });
    }, []);

    return (
        <div className="App">
            <h1>Welcome, {user.username}!</h1>
            <img src={user.avatarUrl} alt={`${user.username}'s avatar`} />
        </div>
    );
}

export default App;
