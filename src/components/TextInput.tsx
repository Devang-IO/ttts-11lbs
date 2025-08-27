import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { analyzeText, detectLanguage } from '../utils/textAnalysis';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
  onLanguageDetected: (language: string) => void;
  isLoading: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  text,
  onTextChange,
  onLanguageDetected,
  isLoading,
}) => {
  const stats = analyzeText(text);
  const maxChars = 3000;

  const handleTextChange = (value: string) => {
    if (value.length <= maxChars) {
      onTextChange(value);
      if (value.trim().length > 10) {
        const detectedLang = detectLanguage(value);
        onLanguageDetected(detectedLang);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800">Text Input</h2>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{stats.words} words</span>
          <span className={`${text.length > maxChars * 0.9 ? 'text-orange-500' : ''}`}>
            {text.length}/{maxChars}
          </span>
          <span>{stats.estimatedTime}min read</span>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Enter your text here to convert to speech... Try different languages and see the magic happen!"
          className="w-full h-40 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        />
        
        {text.length > maxChars * 0.9 && (
          <div className="absolute bottom-2 right-2 flex items-center space-x-1 text-orange-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">Approaching limit</span>
          </div>
        )}
      </div>

      {stats.characters > 0 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="space-x-4">
              <span className="text-gray-600">
                <span className="font-medium text-blue-600">{stats.characters}</span> characters
              </span>
              <span className="text-gray-600">
                <span className="font-medium text-purple-600">{stats.words}</span> words
              </span>
            </div>
            <span className="text-gray-500">
              Est. {stats.estimatedTime} min to read
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextInput;