import React from 'react';
import { useTips } from '../context/TipsContext';
import { Maximize2, AlignJustify, AlignCenter } from 'lucide-react';

const ResolutionToggle: React.FC = () => {
  const { resolution, setResolution } = useTips();

  const resolutionOptions = [
    { 
      value: 'compact', 
      label: 'Compact', 
      icon: <AlignJustify className="h-4 w-4" />
    },
    { 
      value: 'comfortable', 
      label: 'Comfortable', 
      icon: <AlignCenter className="h-4 w-4" />
    },
    { 
      value: 'spacious', 
      label: 'Spacious', 
      icon: <Maximize2 className="h-4 w-4" />
    },
  ];

  return (
    <div className="inline-flex p-1 rounded-lg bg-gray-100 dark:bg-gray-800">
      {resolutionOptions.map(option => (
        <button
          key={option.value}
          onClick={() => setResolution(option.value as any)}
          className={`flex items-center px-3 py-1.5 rounded-md text-xs font-medium transition-all
                    ${resolution === option.value 
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
          aria-label={`Switch to ${option.label} resolution`}
          title={option.label}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export default ResolutionToggle;