import React from 'react';

const NotificationToast: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md z-50 animate-slide-in">
      {message}
    </div>
  );
};

export default NotificationToast;