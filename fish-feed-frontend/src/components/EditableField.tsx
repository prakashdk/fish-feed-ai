import { useState } from "react";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (newVal: string) => void;
}

export function EditableField({ label, value, onSave }: EditableFieldProps) {
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState(value);

  const startEdit = () => {
    setDraft(value);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setDraft(value);
    setEditMode(false);
  };

  const saveEdit = () => {
    onSave(draft.trim());
    setEditMode(false);
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <label className="w-32 font-semibold text-gray-700">{label}:</label>

      {!editMode ? (
        <>
          <div className="flex-1 text-gray-900">
            {value || <i className="text-gray-400">Not set</i>}
          </div>
          <button
            onClick={startEdit}
            className="text-indigo-500 hover:text-indigo-700"
            aria-label={`Edit ${label}`}
          >
            <FiEdit2 size={18} />
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
          />
          <button
            onClick={saveEdit}
            className="text-green-600 hover:text-green-800"
            aria-label={`Save ${label}`}
          >
            <FiSave size={18} />
          </button>
          <button
            onClick={cancelEdit}
            className="text-red-600 hover:text-red-800"
            aria-label={`Cancel editing ${label}`}
          >
            <FiX size={18} />
          </button>
        </>
      )}
    </div>
  );
}
