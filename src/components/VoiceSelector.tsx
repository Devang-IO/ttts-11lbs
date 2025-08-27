import React, { useState, useEffect } from 'react';
import { Mic, ChevronDown, User, Users } from 'lucide-react';
import { languages } from '../data/languages';
import { getAvailableVoices } from '../services/pollyService';
import { Voice } from '../types';

interface VoiceSelectorProps {
  selectedLanguage: string;
  selectedVoice: string;
  onLanguageChange: (language: string) => void;
  onVoiceChange: (voiceId: string, engine: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedLanguage,
  selectedVoice,
  onLanguageChange,
  onVoiceChange,
}) => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showVoices, setShowVoices] = useState(false);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    setIsLoadingVoices(true);
    try {
      const availableVoices = await getAvailableVoices();
      const formattedVoices = availableVoices.map(voice => ({
        id: voice.Id!,
        name: voice.Name!,
        gender: voice.Gender!,
        languageCode: voice.LanguageCode!,
        languageName: voice.LanguageName!,
        engine: voice.SupportedEngines?.includes('neural') ? 'neural' : 'standard',
      }));
      setVoices(formattedVoices);
    } catch (error) {
      console.error('Failed to load voices:', error);
    } finally {
      setIsLoadingVoices(false);
    }
  };

  const selectedLang = languages.find(lang => lang.code === selectedLanguage);
  const filteredVoices = voices.filter(voice => voice.languageCode === selectedLanguage);
  const selectedVoiceData = filteredVoices.find(voice => voice.id === selectedVoice);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Mic className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold text-gray-800">Voice & Accents</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accent
          </label>
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">{selectedLang?.flag}</span>
              <span className="text-sm font-medium">{selectedLang?.name}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showLanguages && (
            <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    onLanguageChange(language.code);
                    setShowLanguages(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg">{language.flag}</span>
                  <span className="text-sm font-medium">{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Voice Selector */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Voice ({filteredVoices.length} available)
          </label>
          <button
            onClick={() => setShowVoices(!showVoices)}
            className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoadingVoices}
          >
            <div className="flex items-center space-x-3">
              {selectedVoiceData?.gender === 'Female' ? (
                <User className="w-4 h-4 text-pink-500" />
              ) : (
                <Users className="w-4 h-4 text-blue-500" />
              )}
              <div className="text-left">
                <span className="text-sm font-medium block">
                  {selectedVoiceData?.name || 'Select Voice'}
                </span>
                {selectedVoiceData && (
                  <span className="text-xs text-gray-500">
                    {selectedVoiceData.gender} • {selectedVoiceData.engine}
                  </span>
                )}
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showVoices && (
            <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              {filteredVoices.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => {
                    onVoiceChange(voice.id, voice.engine);
                    setShowVoices(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors duration-200"
                >
                  {voice.gender === 'Female' ? (
                    <User className="w-4 h-4 text-pink-500" />
                  ) : (
                    <Users className="w-4 h-4 text-blue-500" />
                  )}
                  <div className="text-left">
                    <span className="text-sm font-medium block">{voice.name}</span>
                    <span className="text-xs text-gray-500">
                      {voice.gender} • {voice.engine}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSelector;