import React from 'react';

interface SkillsMarqueeProps {
  skills: string[];
  direction?: 'left' | 'right';
}

const SkillsMarquee: React.FC<SkillsMarqueeProps> = ({ skills, direction = 'left' }) => {
  const skillsText = skills.join(' • ');
  
  return (
    <div className="relative flex overflow-x-hidden border-y-2 border-primary-500/20 dark:border-primary-400/20 bg-gradient-to-r from-primary-50/50 via-white to-primary-50/50 dark:from-dark-bg dark:via-gray-900 dark:to-dark-bg py-6">
      <div 
        className={`flex whitespace-nowrap ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
        style={{ animationDuration: '40s' }}
      >
        {[...Array(3)].map((_, i) => (
          <span 
            key={i} 
            className="mx-8 text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default tracking-wider"
          >
            {skillsText}
          </span>
        ))}
      </div>
      <div 
        className={`absolute top-0 flex whitespace-nowrap ${direction === 'left' ? 'animate-marquee2' : 'animate-marquee-reverse2'}`}
        style={{ animationDuration: '40s' }}
      >
        {[...Array(3)].map((_, i) => (
          <span 
            key={i} 
            className="mx-8 text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 cursor-default tracking-wider py-6"
          >
            {skillsText}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsMarquee;
