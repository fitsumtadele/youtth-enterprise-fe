import React, { useState, useEffect } from 'react';
import Transport from '../api/transport'; 

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const response = await Transport.HTTP.getChats(); // Fetch all chats for the user
//         setChats(response.data);
//       } catch (error) {
//         console.error('Failed to fetch chats', error);
//       }
//     };
//     fetchChats();
//   }, []);
  
  const dummyChats = [
    {
      id: '1',
      receiverName: 'Addis Ababa Enterprise',
      receiverId: '550e8400-e29b-41d4-a716-446655440001',
    },
    {
      id: '2',
      receiverName: 'Dire Dawa Enterprise',
      receiverId: '550e8400-e29b-41d4-a716-446655440002',
    },
    {
      id: '3',
      receiverName: 'Mekelle Enterprise',
      receiverId: '550e8400-e29b-41d4-a716-446655440003',
    },
  ];
  
  const ChatList = ({ onSelectChat }) => {
    return (
      <div className="chat-list">
        <h2>Chats</h2>
        <ul>
          {dummyChats.map((chat) => (
            <li key={chat.id} onClick={() => onSelectChat(chat)}>
              {chat.receiverName}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default ChatList;
  