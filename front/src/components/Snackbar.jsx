import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const Snackbar = forwardRef(({ duration = 3000 }, ref) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('success'); // 'success', 'error', 'info'
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useImperativeHandle(ref, () => ({
    show: (msg, msgType = 'success') => {
      setMessage(msg);
      setType(msgType);
      setIsVisible(true);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      setTimeoutId(newTimeoutId);
    },
  }));

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  if (!isVisible) return null;

  const bgColorClass = type === 'success' ? 'bg-green-800' : type === 'error' ? 'bg-red-800' : 'bg-blue-800';
  const textColorClass = type === 'success' ? 'text-green-400' : type === 'error' ? 'text-red-400' : 'text-blue-400';

  return createPortal(
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg border font-mono z-50
        ${bgColorClass} ${textColorClass} ${type === 'error' ? 'border-red-600' : 'border-green-600'}
        transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
    >
      {message}
    </div>,
    document.body
  );
});

export default Snackbar;
