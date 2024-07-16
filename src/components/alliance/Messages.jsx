import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/messages')
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error fetching messages:', error));
    }, []);

    return (
        <div>
            <h1>Admin Messages</h1>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminMessages;
