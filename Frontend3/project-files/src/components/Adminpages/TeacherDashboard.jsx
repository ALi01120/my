import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeacherMessages.css'; // Style file for TeacherMessages component
import Nave from './Nave';
const TeacherMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // To store the selected message for replying
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyPopup, setShowReplyPopup] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/messages/received', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleReplyMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/messages/reply', {
        original_sender_id: selectedMessage.sender_id,
        receiver_id: selectedMessage.sender_id, // Assuming teacher replies to the same person
        message: replyMessage,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally, you can update the message list after sending the reply
      fetchMessages();
      // Reset the reply message state and hide the reply popup
      setReplyMessage('');
      setShowReplyPopup(false);
    } catch (error) {
      console.error('Error replying to message:', error);
    }
  };

  const handleShowReplyPopup = (message) => {
    setSelectedMessage(message);
    setShowReplyPopup(true);
  };

  return (
    <div>
      <Nave/>
    <div className="teacher-messages-container2">
      <h2>Teacher Messages</h2>
      <div className="message-list2">
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="message-item">
              <div className="message-content">
                <div className="message-sender">Sender ID: {msg.sender_id}</div>
                <div className="message-text">{msg.message}</div>
                {selectedMessage === msg && showReplyPopup && (
                  <div className="reply-message">
                    <span>Teacher Reply: </span>
                    {replyMessage}
                  </div>
                )}
              </div>
              <button onClick={() => handleShowReplyPopup(msg)}>Reply</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedMessage && showReplyPopup && (
        <div className="reply-popup">
          <h3>Reply to Message</h3>
          <textarea value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} rows="4" cols="50" placeholder="Type your reply here"></textarea>
          <button onClick={handleReplyMessage}>Send Reply</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default TeacherMessages;
