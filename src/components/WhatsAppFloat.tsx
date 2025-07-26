import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatProps {
  phoneNumber: string;
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ phoneNumber }) => {
  const handleWhatsAppClick = () => {
    if (phoneNumber) {
      const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
      const message = encodeURIComponent('مرحباً، أود الاستفسار عن دورات أكاديمية نور الهُدى');
      window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    }
  };

  if (!phoneNumber) {
    return null;
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-16 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        تواصل عبر واتساب
      </span>
    </button>
  );
};

export default WhatsAppFloat;
