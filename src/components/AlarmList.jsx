import React from 'react';
import AlarmItem from './AlarmItem';

const AlarmList = ({ alarms, setAlarms, setEditingAlarm }) => {
  return (
    <ul className="space-y-3">
      {alarms
        .filter((alarm) => alarm && typeof alarm === 'object') // ✅ Filter out null/undefined
        .map((alarm) => (
          <AlarmItem
            key={alarm.id}
            alarm={alarm}
            alarms={alarms}
            setAlarms={setAlarms}
            setEditingAlarm={setEditingAlarm}
          />
        ))}
    </ul>
  );
};

export default AlarmList;
