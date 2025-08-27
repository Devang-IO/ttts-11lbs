import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                VoiceForge AI
              </h1>
              <p className="text-xs text-gray-500">Professional Text-to-Speech</p>
            </div>
          </div>
          
          <div className="flex items-center">
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;