import React, { useState } from 'react';
import { Tip } from '../types';
import { useTips } from '../context/TipsContext';
import { Trash2, Edit2, Save, X } from 'lucide-react';

interface TipCardProps {
  tip: Tip;
}

const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  const { removeTip, updateTip } = useTips();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(tip.title);
  const [editedDescription, setEditedDescription] = useState(tip.description);
  const [editedCodeSnippet, setEditedCodeSnippet] = useState(tip.codeSnippet);
  const [editedCategories, setEditedCategories] = useState(tip.categories);

  const handleSave = () => {
    updateTip(tip.id, {
      title: editedTitle,
      description: editedDescription,
      codeSnippet: editedCodeSnippet,
      categories: editedCategories,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(tip.title);
    setEditedDescription(tip.description);
    setEditedCodeSnippet(tip.codeSnippet);
    setEditedCategories(tip.categories);
    setIsEditing(false);
  };

  const primaryCategory = tip.categories?.[0] || '';

  if (isEditing) {
    return (
      <div className="p-2 rounded-lg border border-gray-200 bg-white text-xs">
        <div className="flex justify-between items-start mb-1.5">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-1.5 py-1 border rounded text-xs mr-1"
          />
          <input
            type="text"
            value={editedCategories.join(', ')}
            onChange={(e) => setEditedCategories(e.target.value.split(',').map(c => c.trim()))}
            className="w-24 px-1.5 py-1 border rounded text-xs"
            placeholder="Categories"
          />
        </div>

        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full px-1.5 py-1 border rounded text-xs mb-1.5"
          rows={2}
        />

        <textarea
          value={editedCodeSnippet}
          onChange={(e) => setEditedCodeSnippet(e.target.value)}
          className="w-full px-1.5 py-1 border rounded text-xs font-mono mb-1.5"
          rows={4}
        />

        <div className="flex justify-end gap-1">
          <button
            onClick={handleCancel}
            className="p-1 text-gray-500 hover:text-gray-700 rounded"
            title="Cancel"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:text-green-700 rounded"
            title="Save"
          >
            <Save className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 rounded-lg border border-gray-200 bg-white text-xs">
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-gray-900">{tip.title}</h3>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-800">
            {primaryCategory}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="p-0.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100"
            aria-label="Edit tip"
          >
            <Edit2 className="h-3 w-3" />
          </button>
          <button
            onClick={() => removeTip(tip.id)}
            className="p-0.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
            aria-label="Delete tip"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-1.5 whitespace-pre-wrap">{tip.description}</p>

      <pre className="p-1.5 rounded bg-gray-50 border border-gray-200 overflow-x-auto font-mono text-[11px] text-gray-800">
        <code className="whitespace-pre-wrap break-words">{tip.codeSnippet}</code>
      </pre>
    </div>
  );
};

export default TipCard;