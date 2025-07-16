const AlarmItem = ({ alarm, alarms, setAlarms, setEditingAlarm }) => {
  const handleDelete = () => {
    const updated = alarms.filter((a) => a.id !== alarm.id);
    setAlarms(updated);
    localStorage.setItem('alarms', JSON.stringify(updated));
  };

  const handleSnooze = () => {
    const [h, m] = alarm.time.split(":").map(Number);
    const snoozed = new Date();
    snoozed.setHours(h);
    snoozed.setMinutes(m + 5);
    const hh = snoozed.getHours().toString().padStart(2, "0");
    const mm = snoozed.getMinutes().toString().padStart(2, "0");

    const snoozeAlarm = {
      ...alarm,
      id: Date.now(),
      time: `${hh}:${mm}`,
      label: `${alarm.label} (Snooze)`,
      repeat: false,
    };
    const updated = [...alarms, snoozeAlarm];
    setAlarms(updated);
    localStorage.setItem("alarms", JSON.stringify(updated));
  };

  return (
    <li className="flex justify-between items-center p-3 bg-gray-100 rounded">
      <div>
        <p className="font-semibold">{alarm.label} {alarm.silent ? "(Silent)" : ""}</p>
        <p className="text-sm">{alarm.time} | {alarm.repeat ? "Repeats" : "One-time"}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setEditingAlarm(alarm)} className="text-blue-500">Edit</button>
        <button onClick={handleSnooze} className="text-yellow-600">Snooze</button>
        <button onClick={handleDelete} className="text-red-500">Delete</button>
      </div>
    </li>
  );
};

export default AlarmItem;
