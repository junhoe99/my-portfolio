import React from 'react';
import { X, Mail, Phone, Copy, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/projects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const contactItems = [
    {
      id: 'email',
      label: 'Email',
      value: PROFILE_DATA.email,
      icon: Mail,
      href: `mailto:${PROFILE_DATA.email}`,
      copyText: PROFILE_DATA.email
    },
    {
      id: 'phone',
      label: 'Phone',
      value: PROFILE_DATA.phone,
      icon: Phone,
      href: `tel:${PROFILE_DATA.phone}`,
      copyText: PROFILE_DATA.phone
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">연락처 정보</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">언제든 연락 주세요!</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedField === item.id;
              
              return (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          target={item.id === 'github' ? '_blank' : undefined}
                          rel={item.id === 'github' ? 'noopener noreferrer' : undefined}
                          className="text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{item.value}</p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(item.copyText, item.id)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg transition-colors group"
                    title="클립보드에 복사"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>


        </div>
      </div>
    </div>
  );
};

export default ContactModal;