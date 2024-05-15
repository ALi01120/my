import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotificationList.css';

const NotificationList1 = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:5000/notifications', { headers: { Authorization: `Bearer ${token}` } });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseNotification = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notification-list1">
      <h2>Notifications</h2>
      <ul className="notification-items1">
        {notifications.map(notification => (
          <li key={notification.notification_id}>
            <h3 onClick={() => handleNotificationClick(notification)} className="notification-title1">{notification.title}</h3>
            {selectedNotification === notification && (
              <div className="notification-message-box1">
                <p className="notification-message1">{notification.message}</p>
                <button onClick={handleCloseNotification} className="close-button1">Close</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList1;
