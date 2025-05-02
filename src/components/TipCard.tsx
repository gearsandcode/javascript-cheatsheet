import React, { useState } from "react";
import { Tip } from "../types";
import { useTips } from "../context/TipsContext";
import { Trash2, Edit2, Save, X, ChevronDown, Check } from "lucide-react";
import { Combobox } from "@headlessui/react";
import { CATEGORIES } from "../data/categories";
import { getCategoryColor } from "../utils/getCategoryColor";

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
  const [query, setQuery] = useState("");

  const filteredCategories =
    query === ""
      ? CATEGORIES
      : CATEGORIES.filter((category) =>
          category.toLowerCase().includes(query.toLowerCase())
        );

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
    setQuery("");
  };

  const toggleCategory = (category: string) => {
    setEditedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const primaryCategory = tip.categories?.[0] || "";
  const categoryColors = getCategoryColor(primaryCategory);

  if (isEditing) {
    return (
      <div className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-xs">
        <div className="flex justify-between items-start mb-1.5">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-1.5 py-1 border rounded text-xs mr-1"
          />
        </div>

        <div className="mb-1.5">
          <Combobox
            value={editedCategories}
            onChange={setEditedCategories}
            multiple
          >
            <div className="relative">
              <div className="flex flex-wrap gap-1 p-1 border rounded-md">
                {editedCategories.map((category) => (
                  <span
                    key={category}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      getCategoryColor(category).bg
                    } ${getCategoryColor(category).text}`}
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <Combobox.Input
                  className="border-none p-0.5 text-xs focus:ring-0 flex-1 min-w-[80px]"
                  placeholder="Add categories..."
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-1">
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </Combobox.Button>
              <Combobox.Options className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {filteredCategories.map((category) => (
                  <Combobox.Option
                    key={category}
                    value={category}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-1.5 pl-8 pr-2 ${
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {category}
                        </span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-2 ${
                              active ? "text-white" : "text-blue-600"
                            }`}
                          >
                            <Check className="h-3 w-3" />
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
    <div className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-xs">
      <div className="flex justify-between items-start mb-1">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-white">{tip.title}</h3>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${categoryColors.bg} ${categoryColors.text}`}
          >
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

      <p className="text-white mb-1.5 whitespace-pre-wrap">{tip.description}</p>

      <pre className="p-1.5 rounded bg-gray-700 border border-gray-800 overflow-x-auto font-mono text-[11px] text-white">
        <code className="whitespace-pre-wrap break-words">
          {tip.codeSnippet}
        </code>
      </pre>
    </div>
  );
};

export default TipCard;
