import React from 'react';
import { useTips } from '../context/TipsContext';
import { Search, Code, Sun, Moon } from 'lucide-react';
import ResolutionToggle from './ResolutionToggle';

const Header: React.FC = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory,
    colorMode,
    toggleColorMode
  } = useTips();

  const categories = [
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'es6', label: 'ES6+' },
    { id: 'dom', label: 'DOM' },
    { id: 'algorithms', label: 'Algorithms' },
    { id: 'performance', label: 'Performance' },
    { id: 'patterns', label: 'Patterns' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <Code className="h-8 w-8 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              JS Interview Tips
            </h1>
            <button 
              onClick={toggleColorMode}
              className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {colorMode === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-yellow-300" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <ResolutionToggle />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pb-1">
          <button
            className={`px-3 py-1 text-sm rounded-full transition-all
                      ${!selectedCategory 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 text-sm rounded-full transition-all
                        ${selectedCategory === category.id 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;