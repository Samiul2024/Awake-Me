import React, { useEffect, useState } from 'react';
import AlarmForm from './components/AlarmForm';
import AlarmList from './components/AlarmList';
// import ringAlarm from './utils/ringAlarm';
import AlarmPopup from './components/AlarmPopup'; // You must create this component
import ringAlarm, { stopAlarm } from './utils/ringAlarm';


const App = () => {
  const [alarms, setAlarms] = useState([]);
  const [editingAlarm, setEditingAlarm] = useState(null);
  const [activeAlarm, setActiveAlarm] = useState(null);

  // Load alarms from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('alarms');
    if (stored) {
      setAlarms(JSON.parse(stored));
    }
  }, []);

  // Check alarms every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeNow = now.toTimeString().slice(0, 5); // HH:MM
      const today = now.toISOString().slice(0, 10); // YYYY-MM-DD

      const updated = alarms
        .filter(alarm => alarm && typeof alarm === 'object' && alarm.time)
        .map(alarm => {
          if (alarm.time === timeNow) {
            if (alarm.repeat && alarm.lastTriggered !== today) {
              if (!alarm.silent) {
                setActiveAlarm(alarm);
                ringAlarm(alarm.label, alarm.sound);
              }
              return { ...alarm, lastTriggered: today };
            }
            if (!alarm.repeat && !alarm.triggered) {
              if (!alarm.silent) {
                setActiveAlarm(alarm);
                ringAlarm(alarm.label, alarm.sound);
              }
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

  // Handle Snooze Action
  const handleSnooze = () => {
    const [h, m] = activeAlarm.time.split(':').map(Number);
    const d = new Date();
    d.setHours(h, m + 5);
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');

    const snoozed = {
      ...activeAlarm,
      id: Date.now(),
      time: `${hh}:${mm}`,
      label: `${activeAlarm.label} (Snoozed)`,
      repeat: false,
    };

    const updated = [...alarms, snoozed];
    setAlarms(updated);
    localStorage.setItem('alarms', JSON.stringify(updated));
    setActiveAlarm(null);
  };

  // Handle Silence Action
  const handleSilent = () => {
  stopAlarm(); // ✅ Stop the ringing sound
  const updated = alarms.map(a =>
    a.id === activeAlarm.id ? { ...a, silent: true } : a
  );
  setAlarms(updated);
  localStorage.setItem('alarms', JSON.stringify(updated));
  setActiveAlarm(null);
};


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">🔔 Offline Alarm App</h1>
        <AlarmForm
          alarms={alarms}
          setAlarms={setAlarms}
          editingAlarm={editingAlarm}
          setEditingAlarm={setEditingAlarm}
        />
        <AlarmList
          alarms={alarms}
          setAlarms={setAlarms}
          setEditingAlarm={setEditingAlarm}
        />
      </div>

      {/* 🔔 Full-Screen Alarm Popup */}
      {activeAlarm && (
        <AlarmPopup
          alarm={activeAlarm}
          onSnooze={handleSnooze}
          onSilent={handleSilent}
          onClose={() => setActiveAlarm(null)}
        />
      )}
    </div>
  );
};

export default App;
