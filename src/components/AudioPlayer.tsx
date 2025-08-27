import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, RotateCcw, Volume2, Loader2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string | null;
  isGenerating: boolean;
  onGenerate: () => void;
  canGenerate: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isGenerating,
  onGenerate,
  canGenerate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(progress);
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleDownload = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `voiceforge-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800">Audio Player</h2>
        </div>
        
        {audioUrl && (
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Download</span>
          </button>
        )}
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={onGenerate}
          disabled={!canGenerate || isGenerating}
          className="w-full flex items-center justify-center space-x-3 py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Speech...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              <span>Generate Speech</span>
            </>
          )}
        </button>
      </div>

      {/* Audio Controls */}
      {audioUrl && (
        <div className="space-y-4">
          <audio ref={audioRef} src={audioUrl} />
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${progress}%, #E5E7EB ${progress}%, #E5E7EB 100%)`
              }}
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => {
                const audio = audioRef.current;
                if (audio) {
                  audio.currentTime = 0;
                  setProgress(0);
                  setCurrentTime(0);
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      )}

      {!audioUrl && !isGenerating && (
        <div className="text-center py-8 text-gray-400">
          <Volume2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Generate speech to see audio controls</p>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;