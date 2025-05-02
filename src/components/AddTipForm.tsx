import React, { useState } from 'react';
import { useTips } from '../context/TipsContext';
import { Plus, X, ChevronDown, Check } from 'lucide-react';
import { Combobox } from '@headlessui/react';

const CATEGORIES = [
  'Arrays',
  'Async',
  'DOM',
  'Error Handling',
  'ES6',
  'Fundamentals',
  'Numbers',
  'OOP',
  'Patterns',
  'Performance',
  'Strings',
].sort();

const AddTipForm: React.FC = () => {
  const { addTip } = useTips();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [query, setQuery] = useState('');

  const filteredCategories = query === ''
    ? CATEGORIES
    : CATEGORIES.filter((category) =>
        category.toLowerCase().includes(query.toLowerCase())
      );

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCodeSnippet('');
    setSelectedCategories([]);
    setQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTip({
      title,
      description,
      codeSnippet,
      categories: selectedCategories.sort(),
    });
    resetForm();
    setIsOpen(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-medium">Add New Tip</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md text-sm"
              placeholder="Title"
              required
            />
            
            <div className="relative">
              <Combobox value={selectedCategories} onChange={setSelectedCategories} multiple>
                <div className="relative">
                  <div className="flex flex-wrap gap-1 p-1 border rounded-md">
                    {selectedCategories.map(category => (
                      <span key={category} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {category}
                        <button
                          type="button"
                          onClick={() => toggleCategory(category)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <Combobox.Input
                      className="border-none p-1 text-sm focus:ring-0 flex-1 min-w-[100px]"
                      placeholder="Select categories..."
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </Combobox.Button>
                  <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredCategories.map((category) => (
                      <Combobox.Option
                        key={category}
                        value={category}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue-600 text-white' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {category}
                            </span>
                            {selected && (
                              <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-600'}`}>
                                <Check className="h-4 w-4" />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
            
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md text-sm"
              placeholder="Description"
              rows={2}
              required
            />
            
            <textarea
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full px-2 py-1.5 border rounded-md text-sm font-mono"
              placeholder="Code snippet"
              rows={4}
              required
            />
            
            <button
              type="submit"
              className="w-full py-1.5 px-3 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              Add Tip
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          aria-label="Add new tip"
        >
          <Plus className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default AddTipForm;