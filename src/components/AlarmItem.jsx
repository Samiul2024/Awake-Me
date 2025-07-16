import React from 'react';
import { FaEdit, FaTrash, FaVolumeUp, FaClock } from 'react-icons/fa';

const AlarmItem = ({ alarm, alarms, setAlarms, setEditingAlarm }) => {
  const handleDelete = () => {
    const updated = alarms.filter((a) => a.id !== alarm.id);
    setAlarms(updated);
    localStorage.setItem('alarms', JSON.stringify(updated));
  };

  const handleSnooze = () => {
    const [h, m] = alarm.time.split(':').map(Number);
    const snoozed = new Date();
    snoozed.setHours(h);
    snoozed.setMinutes(m + 5);
    const hh = snoozed.getHours().toString().padStart(2, '0');
    const mm = snoozed.getMinutes().toString().padStart(2, '0');

    const snoozeAlarm = {
      ...alarm,
      id: Date.now(),
      time: `${hh}:${mm}`,
      label: `${alarm.label} (Snoozed)`,
      repeat: false,
    };
    const updated = [...alarms, snoozeAlarm];
    setAlarms(updated);
    localStorage.setItem('alarms', JSON.stringify(updated));
  };

  // 🔊 Preview sound
  const previewSound = () => {
    if (alarm.sound) {
      const audio = new Audio(alarm.sound);
      audio.play();
    } else {
      alert("No sound selected.");
    }
  };

  // 📛 Get sound label
  const getSoundLabel = () => {
    if (!alarm.sound) return 'Default';
    if (alarm.sound.startsWith('data:')) return 'Custom Sound';
    const parts = alarm.sound.split('/');
    return parts[parts.length - 1];
  };

  return (
    <li className="flex justify-between items-center p-3 bg-gray-100 rounded hover:bg-gray-200 transition-all duration-150">
      <div>
        <p className="font-semibold">{alarm.label} {alarm.silent && <span className="text-red-500">(Silent)</span>}</p>
        <p className="text-sm">{alarm.time} | {alarm.repeat ? 'Repeats' : 'One-time'}</p>
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <FaVolumeUp className="text-blue-500" /> {getSoundLabel()}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={previewSound}
          className="hover:text-blue-600 transition-colors"
          title="Preview Sound"
        >
          <FaVolumeUp />
        </button>
        <button
          onClick={() => setEditingAlarm(alarm)}
          className="hover:text-green-600 transition-colors"
          title="Edit Alarm"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleSnooze}
          className="hover:text-yellow-500 transition-colors"
          title="Snooze"
        >
          <FaClock />
        </button>
        <button
          onClick={handleDelete}
          className="hover:text-red-600 transition-colors"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default AlarmItem;
