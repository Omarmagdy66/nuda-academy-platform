
import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WhatsAppIcon } from './Icons';
import { X, MessageCircle } from 'lucide-react';

interface WhatsAppFloatProps {
  phoneNumber: string;
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ phoneNumber }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const cleanPhoneNumber = phoneNumber.replace(/[^\d+]/g, '');
  const defaultMessage = encodeURIComponent('مرحباً، أود الاستفسار عن باقات أكاديمية عاكفين');
  const whatsAppUrl = `https://wa.me/${cleanPhoneNumber}?text=${defaultMessage}`;

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsChatOpen(true);
    }, 500); // 0.5 second delay
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    setIsChatOpen(false);
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50" 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {isChatOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-80 h-auto bg-card border shadow-xl rounded-lg overflow-hidden"
          >
            <div className="bg-primary/90 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <WhatsAppIcon className="w-6 h-6 text-primary-foreground" />
                <span className="font-semibold text-primary-foreground">WhatsApp</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 bg-card">
              <div className="flex flex-col items-start space-y-4">
                {/* === FIX START === */}
                <div className="bg-muted p-3 rounded-lg rounded-br-none self-end">
                  <p className="text-sm text-right text-muted-foreground">نرحب باستفساراتكم</p>
                </div>
                {/* === FIX END === */}
                <a 
                  href={whatsAppUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="bg-primary/90 text-primary-foreground p-3 rounded-full flex items-center justify-center space-x-2 space-x-reverse cursor-pointer"
                  >
                    <MessageCircle size={20}/>
                    <span className="font-medium">تواصل معنا الآن</span>
                  </motion.div>
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg cursor-pointer"
          >
            <WhatsAppIcon className="w-8 h-8" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppFloat;
