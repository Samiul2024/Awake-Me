import React, { useEffect, useState } from 'react';

const DEFAULT_SOUNDS = [
  { name: "drilis obaya", file: "/public/alarm.mp3" },
  { name: "Erturul Gazi", file: "/public/alarm2.mp3" },
];

const SoundPicker = ({ selected, setSelected }) => {
  const [customSounds, setCustomSounds] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("customSounds") || "[]");
    setCustomSounds(stored);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      const newSound = {
        name: file.name,
        file: reader.result,
      };
      const updated = [...customSounds, newSound];
      localStorage.setItem("customSounds", JSON.stringify(updated));
      setCustomSounds(updated);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <optgroup label="Default Sounds">
          {DEFAULT_SOUNDS.map((s) => (
            <option key={s.name} value={s.file}>
              {s.name}
            </option>
          ))}
        </optgroup>
        {customSounds.length > 0 && (
          <optgroup label="Custom Sounds">
            {customSounds.map((s) => (
              <option key={s.name} value={s.file}>
                {s.name}
              </option>
            ))}
          </optgroup>
        )}
      </select>
      <input type="file" accept="audio/*" onChange={handleUpload} />
    </div>
  );
};

export default SoundPicker;
