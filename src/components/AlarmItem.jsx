import React from 'react';

const AlarmItem = ({ alarm, alarms, setAlarms }) => {
  const handleDelete = () => {
    const updated = alarms.filter((a) => a.id !== alarm.id);
    setAlarms(updated);
    localStorage.setItem('alarms', JSON.stringify(updated));
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md shadow-sm">
      <div>
        <p className="font-medium">{alarm.label}</p>
        <p className="text-sm text-gray-600">
          {alarm.time} | {alarm.repeat ? 'Repeats daily' : 'One-time'}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Delete
      </button>
    </li>
  );
};

export default AlarmItem;
