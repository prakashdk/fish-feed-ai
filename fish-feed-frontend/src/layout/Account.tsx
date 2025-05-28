import { useState, useEffect } from "react";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";

interface Organization {
  name: string;
  address?: string;
  email?: string;
  phone?: string;
}

export const Account = () => {
  const [org, setOrg] = useState<Organization | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<Organization | null>(null);

  // Placeholder: fetch organization info on mount
  useEffect(() => {
    async function fetchOrg() {
      // TODO: Replace with your API call
      const fetchedOrg = {
        name: "Acme Corporation",
        address: "123 Main St",
        email: "contact@acme.com",
        phone: "+1-234-567-890",
      };
      setOrg(fetchedOrg);
      setDraft(fetchedOrg);
    }
    fetchOrg();
  }, []);

  const startEdit = () => {
    if (org) setDraft(org);
    setEditMode(true);
  };

  const cancelEdit = () => {
    if (org) setDraft(org);
    setEditMode(false);
  };

  const saveChanges = async () => {
    if (!draft) return;
    // TODO: Replace with your API call to save `draft`
    // await api.saveOrganization(draft)
    setOrg(draft);
    setEditMode(false);
  };

  const onChange = (field: keyof Organization, value: string) => {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  if (!org) return <div>Loading organization info...</div>;

  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Organization Info
        </h2>
        {!editMode ? (
          <button
            onClick={startEdit}
            aria-label="Edit Organization Info"
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FiEdit2 size={20} />
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={saveChanges}
              aria-label="Save Organization Info"
              className="text-green-600 hover:text-green-800 flex items-center gap-1"
            >
              <FiSave size={20} /> Save
            </button>
            <button
              onClick={cancelEdit}
              aria-label="Cancel Editing Organization Info"
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
            >
              <FiX size={20} /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-32 font-semibold text-gray-700">Name:</label>
          {editMode ? (
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={draft?.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              autoFocus
            />
          ) : (
            <p className="flex-1 text-gray-900">
              {org.name || <i className="text-gray-400">Not set</i>}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 font-semibold text-gray-700">Address:</label>
          {editMode ? (
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={draft?.address || ""}
              onChange={(e) => onChange("address", e.target.value)}
            />
          ) : (
            <p className="flex-1 text-gray-900">
              {org.address || <i className="text-gray-400">Not set</i>}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 font-semibold text-gray-700">Email:</label>
          {editMode ? (
            <input
              type="email"
              className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={draft?.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
            />
          ) : (
            <p className="flex-1 text-gray-900">
              {org.email || <i className="text-gray-400">Not set</i>}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="w-32 font-semibold text-gray-700">Phone:</label>
          {editMode ? (
            <input
              type="tel"
              className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={draft?.phone || ""}
              onChange={(e) => onChange("phone", e.target.value)}
            />
          ) : (
            <p className="flex-1 text-gray-900">
              {org.phone || <i className="text-gray-400">Not set</i>}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
