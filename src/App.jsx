import React, { useEffect, useState } from 'react';
import AddAlarm from './components/AddAlarm';
import AlarmList from './components/AlarmList';
import ringAlarm from './utils/ringAlarm';

const App = () => {
  const [alarms, setAlarms] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('alarms');
    if (stored) {
      setAlarms(JSON.parse(stored));
    }
  }, []);

  // Alarm trigger checker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeNow = now.toTimeString().slice(0, 5); // HH:MM
      const today = now.toISOString().slice(0, 10); // YYYY-MM-DD

      const updated = alarms.map(alarm => {
        if (alarm.time === timeNow) {
          if (alarm.repeat && alarm.lastTriggered !== today) {
            ringAlarm(alarm.label);
            return { ...alarm, lastTriggered: today };
          }
          if (!alarm.repeat && !alarm.triggered) {
            ringAlarm(alarm.label);
            return { ...alarm, triggered: true };
          }
        }
        return alarm;
      });

      setAlarms(updated);
      localStorage.setItem('alarms', JSON.stringify(updated));
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">⏰ Alarm App (Offline)</h1>
        {/* <h1 className='font-bold text-7xl text-center'>Awake Me </h1> */}
        <AddAlarm alarms={alarms} setAlarms={setAlarms} />
        <AlarmList alarms={alarms} setAlarms={setAlarms} />
      </div>
    </div>
  );
};

export default App;


