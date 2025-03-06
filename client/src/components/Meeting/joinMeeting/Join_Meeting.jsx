import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const Join_Meeting = () => {
  const { id } = useParams(); // Meeting ID from URL
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io("http://localhost:3000", {
        transports: ['websocket'], // Force WebSocket transport
      });
      
    setSocket(socket);

    // Join the room with the meeting ID
    socket.emit('join-meeting', { meetingId: id, userId: 'user123' }); // Example userId

    // Listen for incoming messages
    socket.on('receive-message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.emit('leaveRoom', { meetingId: id });
      socket.off();
    };
  }, [id]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim()) {
      // Emit the message to the server
      socket.emit('send-message', { meetingId: id, message });
      setMessage('');
    }
  };

  return (
    <div className="join-meeting-container">
      <h1>Meeting ID: {id}</h1>

      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <p>{msg.message}</p> {/* Displaying the message */}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Join_Meeting;
