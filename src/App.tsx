import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import VoiceSelector from './components/VoiceSelector';
import AudioControls from './components/AudioControls';
import AudioPlayer from './components/AudioPlayer';
import { synthesizeSpeech } from './services/pollyService';
import { AudioSettings } from './types';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [selectedVoice, setSelectedVoice] = useState('Joanna');
  const [selectedVoiceEngine, setSelectedVoiceEngine] = useState('neural');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    speed: 1,
    pitch: 0,
    volume: 100,
    format: 'mp3',
  });

  const handleLanguageDetection = useCallback(
    (detectedLanguage: string) => {
      if (detectedLanguage !== selectedLanguage) {
        setSelectedLanguage(detectedLanguage);
        // Reset voice selection when language changes
        setSelectedVoice('');
        setSelectedVoiceEngine('neural');
      }
    },
    [selectedLanguage]
  );

  const handleVoiceChange = useCallback((voiceId: string, engine: string) => {
    setSelectedVoice(voiceId);
    setSelectedVoiceEngine(engine);
  }, []);

  const generateSpeech = async () => {
    if (!text.trim() || !selectedVoice) return;

    setIsGenerating(true);
    try {
      // Clear previous audio
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const url = await synthesizeSpeech(
        text,
        selectedVoice,
        selectedVoiceEngine,
        audioSettings.format
      );
      setAudioUrl(url);
    } catch (error) {
      console.error('Failed to generate speech:', error);
      alert(
        'Failed to generate speech. Please check your credentials and try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate =
    text.trim().length > 0 && selectedVoice && !isGenerating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transform Text into
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              Lifelike Speech
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of AI-driven text-to-speech with over 200
            natural voices in 50+ Accents. Perfect for content creators,
            educators, and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TextInput
              text={text}
              onTextChange={setText}
              onLanguageDetected={handleLanguageDetection}
              isLoading={isGenerating}
            />

            <VoiceSelector
              selectedLanguage={selectedLanguage}
              selectedVoice={selectedVoice}
              onLanguageChange={setSelectedLanguage}
              onVoiceChange={handleVoiceChange}
            />

            <AudioControls
              settings={audioSettings}
              onSettingsChange={setAudioSettings}
            />
          </div>

          <div className="space-y-6">
            <AudioPlayer
              audioUrl={audioUrl}
              isGenerating={isGenerating}
              onGenerate={generateSpeech}
              canGenerate={canGenerate}
            />

            {/* Feature Highlights */}
            <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-semibold text-gray-800 mb-4">
                ✨ Premium Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>200+ AI voices across 50+ Accents</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Neural engine for ultra-realistic speech</span>
                </li>
               
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span>Multiple audio format support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                  <span>Instant download capability</span>
                </li>
              </ul>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Usage Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-xs text-gray-500">Accents</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">200+</div>
                  <div className="text-xs text-gray-500">Voices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3K</div>
                  <div className="text-xs text-gray-500">Max Characters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">HD</div>
                  <div className="text-xs text-gray-500">Audio Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
