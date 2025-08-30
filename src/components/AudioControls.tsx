// src/components/AudioControls.tsx
import React from 'react';
import { Settings, FileAudio } from 'lucide-react';
import { AudioSettings } from '../types';

interface AudioControlsProps {
  settings: AudioSettings;
  onSettingsChange: (settings: AudioSettings) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleChange = (key: keyof AudioSettings, value: string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">Audio Format</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Format Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <FileAudio className="w-4 h-4" />
              <span>Format</span>
            </label>
          </div>
          <select
            value={settings.format}
            onChange={(e) => handleChange('format', e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="mp3">MP3</option>
            <option value="ogg_vorbis">OGG</option>
            <option value="pcm">WAV</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AudioControls;
