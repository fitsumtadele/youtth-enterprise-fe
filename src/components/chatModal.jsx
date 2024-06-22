import React, { useState, useEffect, useContext } from 'react';
import Transport from '../api/transport'; 
import { useSocket } from '../context/SocketContext'; 

const ChatModal = ({ show, onHide, selectedCompany, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();

  useEffect(() => {
    if (show) {
      fetchMessages();
      joinRoom(selectedCompany.id);
    }
  }, [show]);

  const fetchMessages = async () => {
    try {
      const response = await Transport.HTTP.getChatsByRequestId(selectedCompany.id);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const joinRoom = (room) => {
    if (socket.current) {
      socket.current.emit('joinRoom', room);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      message: newMessage,
      senderId: user.id,
      receiverId: selectedCompany.userId,
      requestId: selectedCompany.id,
      room: selectedCompany.id,
    };

    try {
      const response = await Transport.HTTP.addChat(message);
      setMessages([...messages, response.data.chat]);
      socket.current.emit('sendMessage', message);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off('receiveMessage');
      }
    };
  }, [socket]);

  if (!show) {
    return null;
  }

  return (
    <div className="chat-modal-overlay">
      <div className="chat-modal">
        <div className="chat-modal-header">
          <h2>Chat with {selectedCompany.name}</h2>
          <button className="close-button" onClick={onHide}>×</button>
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`chat-message ${message.senderId === user.id ? 'sent' : 'received'}`}>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-button" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
