const ringAlarm = (label) => {
  const audio = new Audio('/alarm.mp3');
  audio.play();
  // alert(`⏰ Alarm: ${label}`);
};

export default ringAlarm;
