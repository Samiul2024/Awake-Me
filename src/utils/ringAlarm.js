let currentAudio = null;

const ringAlarm = (label, sound) => {
  // alert(`⏰ ${label}`);

  if (sound) {
    currentAudio = new Audio(sound);
    currentAudio.loop = true;
    currentAudio.play().catch((err) => {
      console.error("Audio playback error:", err);
    });
  }

  if ('vibrate' in navigator) {
    navigator.vibrate([500, 300, 500]);
  }
};

export const stopAlarm = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

export default ringAlarm;
