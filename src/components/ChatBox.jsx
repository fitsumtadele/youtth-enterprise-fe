import React, { useState, useEffect } from 'react';
import Transport from '../api/transport'; // Ensure correct import path
import { useSocket } from '../context/SocketContext';

const ChatBox = ({ chat, onBack, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useSocket();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await Transport.HTTP.getChatsByRequestId(chat.id);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };
    fetchMessages();

    if (socket.current) {
      socket.current.emit('joinRoom', chat.id);
      socket.current.on('receiveMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.current.off('receiveMessage');
      };
    }
  }, [chat.id, socket]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      id: `m${messages.length + 1}`,
      message: newMessage,
      senderId: user?.id || 'default-user',
      receiverId: chat.receiverId,
      requestId: chat.id,
      room: chat.id,
    };

    try {
      await Transport.HTTP.sendMessage(message);
      setMessages([...messages, message]);
      socket.current.emit('sendMessage', message);
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-box-header">
        <button className="back-button" onClick={onBack}>←</button>
        <h2>{chat.receiverName}</h2>
      </div>
      <div className="chat-box-messages">
        {messages.map((message) => (
          <div key={message.id} className={`chat-message ${message.senderId === user.id ? 'sent' : 'received'}`}>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div className="chat-box-input-container">
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
  );
};

export default ChatBox;
