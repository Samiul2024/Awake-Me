import React, { useState } from 'react';

const AddAlarm = ({ alarms, setAlarms }) => {
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');
  const [repeat, setRepeat] = useState(true);

  const handleAdd = () => {
    if (!time || !label) return alert("Please enter both time and label");
    const newAlarm = {
      id: Date.now(),
      time,
      label,
      repeat,
      lastTriggered: '',
      triggered: false,
    };
    const updated = [...alarms, newAlarm];
    setAlarms(updated);
    localStorage.setItem('alarms', JSON.stringify(updated));
    setTime('');
    setLabel('');
    setRepeat(true);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <input
          type="text"
          placeholder="Alarm label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border p-2 rounded-md flex-1"
        />
        <label className="flex items-center gap-1 text-sm mt-2 sm:mt-0">
          <input type="checkbox" checked={repeat} onChange={() => setRepeat(!repeat)} />
          Repeat Daily
        </label>
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAlarm;
