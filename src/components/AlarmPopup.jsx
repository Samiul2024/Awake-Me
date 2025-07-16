import React, { useEffect } from 'react';

const AlarmPopup = ({ alarm, onSnooze, onSilent, onClose }) => {
  useEffect(() => {
    const handleSwipe = (e) => {
      const touch = e.changedTouches[0];
      if (touch.clientY < 100) {
        onClose();
      }
    };
    window.addEventListener('touchend', handleSwipe);
    return () => window.removeEventListener('touchend', handleSwipe);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 text-white flex flex-col items-center justify-center p-6 animate-fade-in">
      <h2 className="text-3xl font-bold mb-4">{alarm.label}</h2>
      <p className="text-xl mb-6">It's {alarm.time}</p>
      <div className="flex gap-4">
        <button
          onClick={onSnooze}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded"
        >
          Snooze
        </button>
        <button
          onClick={onSilent}
          className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded"
        >
          Silence
        </button>
      </div>
      <p className="mt-8 text-sm opacity-70">Swipe up to dismiss</p>
    </div>
  );
};

export default AlarmPopup;
