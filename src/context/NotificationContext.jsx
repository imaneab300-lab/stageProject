import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

let nextId = 1;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', title: 'New Order #TRX-9482', body: 'From Paris, FR', time: '3 minutes ago', read: false },
    { id: 2, type: 'user', title: 'Customer Registration', body: 'Marco V.', time: '10 minutes ago', read: false },
    { id: 3, type: 'stock', title: 'Stock Alert: Silk Scarf', body: 'Low inventory — 2 left', time: '1 hour ago', read: true },
    { id: 4, type: 'payout', title: 'Payout Disbursed', body: '$42,000.00', time: '3 hours ago', read: true },
  ]);

  const addNotification = useCallback((notification) => {
    const id = ++nextId;
    setNotifications(prev => [{ id, read: false, time: 'Just now', ...notification }, ...prev]);
    setTimeout(() => removeNotification(id), 6000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, markAllRead, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
