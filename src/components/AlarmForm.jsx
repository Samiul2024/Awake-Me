import React, { useEffect, useState } from 'react';
import SoundPicker from './SoundPicker';

const AlarmForm = ({ alarms, setAlarms, editingAlarm, setEditingAlarm }) => {
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');
  const [repeat, setRepeat] = useState(true);
  const [silent, setSilent] = useState(false);
  const [sound, setSound] = useState('/alarm.mp3');

  useEffect(() => {
    if (editingAlarm) {
      setTime(editingAlarm.time);
      setLabel(editingAlarm.label);
      setRepeat(editingAlarm.repeat);
      setSilent(editingAlarm.silent);
      setSound(editingAlarm.sound || '/alarm.mp3');
    }
  }, [editingAlarm]);

  const handleSave = () => {
    if (!time || !label) return alert("Enter time and label");

    const updatedAlarm = {
      id: editingAlarm ? editingAlarm.id : Date.now(),
      time,
      label,
      repeat,
      lastTriggered: '',
      triggered: false,
      silent,
      sound,
    };

    let updated;
    if (editingAlarm) {
      updated = alarms.map(a => a.id === editingAlarm.id ? updatedAlarm : a);
      setEditingAlarm(null);
    } else {
      updated = [...alarms, updatedAlarm];
    }

    setAlarms(updated);
    localStorage.setItem('alarms', JSON.stringify(updated));
    setTime('');
    setLabel('');
    setRepeat(true);
    setSilent(false);
    setSound('/alarm.mp3');
  };

  return (
    <div className="space-y-3 mb-6">
      <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 border rounded" />
      <input type="text" placeholder="Alarm label" value={label} onChange={e => setLabel(e.target.value)} className="w-full p-2 border rounded" />
      <div className="flex gap-4">
        <label><input type="checkbox" checked={repeat} onChange={() => setRepeat(!repeat)} /> Repeat Daily</label>
        <label><input type="checkbox" checked={silent} onChange={() => setSilent(!silent)} /> Silent</label>
      </div>
      <SoundPicker selected={sound} setSelected={setSound} />
      <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">{editingAlarm ? 'Update Alarm' : 'Add Alarm'}</button>
    </div>
  );
};

export default AlarmForm;
