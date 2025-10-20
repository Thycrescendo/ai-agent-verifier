import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { useState } from 'react';
import NotificationToast from '../components/NotificationToast';

function MyApp({ Component, pageProps }: AppProps) {
  const [notifications, setNotifications] = useState<string[]>([]);
  const addNotification = (message: string) => {
    setNotifications([message, ...notifications]);
    setTimeout(() => setNotifications((prev) => prev.slice(0, -1)), 5000);
  };

  return (
    <Layout>
      <Component {...pageProps} addNotification={addNotification} />
      {notifications.map((msg, index) => (
        <NotificationToast key={index} message={msg} />
      ))}
    </Layout>
  );
}

export default MyApp;