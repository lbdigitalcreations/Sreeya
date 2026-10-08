import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Heart, Save, RotateCcw, User, FileText } from 'lucide-react';
import { audioEngine } from '../services/audioService';

export const CustomizerModal = ({ isOpen, onClose, currentName, currentMessage, onSave }) => {
  const [name, setName] = useState(currentName || 'Sreenya');
  const [message, setMessage] = useState(currentMessage || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name: name.trim() || 'Sreenya', message });
    audioEngine.playPopFX();
    onClose();
  };

  const handleReset = () => {
    setName('Sreenya');
    setMessage('');
    onSave({ name: 'Sreenya', message: '' });
    audioEngine.playSparkleFX();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          className="glass-card max-w-xl w-full p-6 sm:p-8 rounded-3xl border border-pink-500/40 shadow-[0_0_50px_rgba(255,23,68,0.5)] max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#DC143C] to-[#FF69B4]">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Customize Celebration</h3>
                <p className="text-xs text-pink-300">Personalize name and letter for Sreenya</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-pink-900/40 text-pink-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1.5">
                <User className="w-4 h-4 text-pink-400" />
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name..."
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 font-bold text-lg"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pink-200 mb-1.5">
                <FileText className="w-4 h-4 text-pink-400" />
                Custom Birthday Letter (Optional)
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave blank to use the default emotional letter..."
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-pink-500/30 text-white placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-sm leading-relaxed"
              />
            </div>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl glass-pill text-xs font-semibold text-pink-300 hover:text-white flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl glass-pill text-pink-200 text-sm hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-glowing w-1/2 sm:w-auto px-6 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,23,68,0.5)]"
                >
                  <Save className="w-4 h-4" />
                  Save Changes ❤️
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
