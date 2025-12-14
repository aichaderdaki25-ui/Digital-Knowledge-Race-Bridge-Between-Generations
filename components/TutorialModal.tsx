import React from 'react';
import { X } from 'lucide-react';

export const TutorialModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative animate-[fade-in_0.3s_ease-out]">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
        >
            <X size={24} />
        </button>
        
        <div className="bg-morocco-blue p-6">
            <h3 className="text-2xl font-bold text-white font-heading">How to Play</h3>
        </div>
        
        <div className="p-6 space-y-4 text-gray-700">
            <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-morocco-red text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                    <h4 className="font-bold text-morocco-red">Form Teams</h4>
                    <p className="text-sm">Create mixed teams of students and elders. Diversity is strength!</p>
                </div>
            </div>
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-morocco-green text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                    <h4 className="font-bold text-morocco-green">Answer Together</h4>
                    <p className="text-sm">A question about Morocco will appear. Discuss with your team. Elders might know history, students might know geography!</p>
                </div>
            </div>
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-morocco-gold text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                    <h4 className="font-bold text-morocco-gold">Beat the Clock</h4>
                    <p className="text-sm">You have 30 seconds. The host will record your answer. Points are awarded for accuracy.</p>
                </div>
            </div>
        </div>

        <div className="p-6 bg-gray-50 text-center">
            <button 
                onClick={onClose}
                className="bg-morocco-blue text-white px-8 py-2 rounded-full font-bold hover:bg-blue-700"
            >
                Got it!
            </button>
        </div>
      </div>
    </div>
  );
};
