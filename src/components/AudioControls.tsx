// src/components/AudioControls.tsx
import React from 'react';
import { Settings, Gauge, Volume2, FileAudio } from 'lucide-react';
import { AudioSettings } from '../types';

interface AudioControlsProps {
  settings: AudioSettings;
  onSettingsChange: (settings: AudioSettings) => void;
}

const AudioControls: React.FC<AudioControlsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleChange = (key: keyof AudioSettings, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">Audio Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Speed Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Gauge className="w-4 h-4" />
              <span>Speed</span>
            </label>
            <span className="text-sm text-blue-600 font-medium">{settings.speed}x</span>
          </div>
          <input
            type="range"
            min="0.25"
            max="4"
            step="0.25"
            value={settings.speed}
            onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(settings.speed - 0.25) / (4 - 0.25) * 100}%, #E5E7EB ${(settings.speed - 0.25) / (4 - 0.25) * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.25x</span>
            <span>4x</span>
          </div>
        </div>

        {/* Pitch Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Volume2 className="w-4 h-4" />
              <span>Pitch</span>
            </label>
            <span className="text-sm text-purple-600 font-medium">
              {settings.pitch > 0 ? '+' : ''}{settings.pitch}%
            </span>
          </div>
          <input
            type="range"
            min="-20"
            max="20"
            step="5"
            value={settings.pitch}
            onChange={(e) => handleChange('pitch', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${(settings.pitch + 20) / 40 * 100}%, #E5E7EB ${(settings.pitch + 20) / 40 * 100}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>-20%</span>
            <span>+20%</span>
          </div>
        </div>

        {/* Volume Control */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Volume2 className="w-4 h-4" />
              <span>Volume</span>
            </label>
            <span className="text-sm text-green-600 font-medium">{settings.volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={settings.volume}
            onChange={(e) => handleChange('volume', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10B981 0%, #10B981 ${settings.volume}%, #E5E7EB ${settings.volume}%, #E5E7EB 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

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
