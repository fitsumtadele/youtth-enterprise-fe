import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ChatWidget = ({ show, onHide, selectedCompany }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user, logout } = useAuth();
  const role = user ? user.role : 'guest';
  useEffect(() => {
    if (selectedCompany) {
      
      axios.get(`http://localhost:4000/chats/request/${selectedCompany.requestId}`)
        .then(response => setMessages(response.data))
        .catch(error => console.error("Failed to fetch messages", error));
    }
  }, [selectedCompany]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const messageData = {
        message: newMessage,
        senderId: user.id,
        receiverId: selectedCompany.id,
        requestId: selectedCompany.requestId, // Assuming requestId is part of the selectedCompany
      };

      axios.post('http://localhost:4000/chats', messageData, {
        headers: {
          Authorization: `Bearer ${user.token}` // Assuming user token is available for auth
        }
      })
      .then(response => {
        setMessages([...messages, response.data.chat]);
        setNewMessage('');
      })
      .catch(error => console.error("Failed to send message", error));
    }
  };

  return (
    <div className={`chat-widget ${show ? 'show' : ''}`}>
      <div className="chat-header">
        <h2>Chat with {selectedCompany?.name || 'the company'}</h2>
        <button className="close-button" onClick={onHide}>×</button>
      </div>
      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.senderId === user.id ? 'own' : ''}`}>
            <div className="message-sender">{message.senderId === user.id ? 'You' : message.senderId}</div>
            <div className="message-text">{message.message}</div>
            <div className="message-timestamp">{new Date(message.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWidget;
