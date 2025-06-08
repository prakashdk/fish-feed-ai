import { useEffect, useState } from "react";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import type { Organization } from "../dto/organization.dto";
import { updateOrganization } from "../services/organization.service";
import { useOrganization } from "../hooks/useOrganization";

export const Account = () => {
  const [draft, setDraft] = useState<Organization | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const { organization, loading } = useOrganization();

  // Sync draft when organization changes
  useEffect(() => {
    if (organization) {
      setDraft(organization);
    }
  }, [organization]);

  if (loading) return <div>Loading organization info...</div>;

  const onChange = (field: keyof Organization, value: string) => {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const saveChanges = async () => {
    if (!draft) return;
    try {
      setSaving(true);
      const updated = await updateOrganization(draft);
      setDraft(updated);
      setEditMode(false);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    if (organization) setDraft(organization);
    setEditMode(false);
  };

  if (loading)
    return (
      <div className="p-4 text-gray-500">Loading organization info...</div>
    );

  return (
    <section className="max-w-3xl mt-2 mx-auto p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Organization Info</h2>
        {!editMode ? (
          <button
            title="Edit"
            onClick={() => setEditMode(true)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FiEdit2 size={20} />
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={saveChanges}
              className="text-green-600 hover:text-green-800 flex items-center gap-1"
              disabled={saving}
            >
              <FiSave size={20} /> {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
            >
              <FiX size={20} /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {["name", "address", "email", "phone"].map((field) => (
          <div key={field} className="flex items-center gap-4">
            <label className="w-32 font-semibold text-gray-700 capitalize">
              {field}:
            </label>
            {editMode ? (
              <input
                title="Organization"
                type="text"
                className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={draft?.[field as keyof Organization] ?? ""}
                onChange={(e) =>
                  onChange(field as keyof Organization, e.target.value)
                }
              />
            ) : (
              <p className="flex-1 text-gray-900">
                {organization?.[field as keyof Organization] || (
                  <i className="text-gray-400">Not set</i>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
