import React from 'react';
import AlarmItem from './AlarmItem';

const AlarmList = ({ alarms, setAlarms }) => {
  return (
    <div>
      {alarms.length === 0 ? (
        <p className="text-gray-500 text-center">No alarms set yet.</p>
      ) : (
        <ul className="space-y-2">
          {alarms.map((alarm) => (
            <AlarmItem key={alarm.id} alarm={alarm} alarms={alarms} setAlarms={setAlarms} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlarmList;
