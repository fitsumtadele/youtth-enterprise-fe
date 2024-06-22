import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatBox from './ChatBox';

const ChatWidget = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleWidgetClick = () => {
    setIsOpen(!isOpen);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="chat-widget">
      <div className="chat-widget-icon" onClick={handleWidgetClick}>
        <img src="/img/chat-icon.png" alt="Chat Icon" />
      </div>
      {isOpen && (
        <div className="chat-widget-window">
          {!selectedChat ? (
            <ChatList onSelectChat={handleChatSelect} />
          ) : (
            <ChatBox chat={selectedChat} onBack={() => setSelectedChat(null)} user={user} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
