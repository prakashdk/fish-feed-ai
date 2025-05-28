import { FiSave } from "react-icons/fi";
import type { Pond } from "../dto/pond.dto";

export const PondForm = ({
  pond,
  onChange,
  onCancel,
  onSave,
  saving,
}: {
  pond: Partial<Pond>;
  onChange: (field: keyof Pond, value: any) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
}) => {
  // Basic validation
  const canSave =
    pond.name?.trim() && pond.size_sq_m! > 0 && pond.depth_m! > 0 && !saving;

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="font-semibold">Name *</span>
        <input
          type="text"
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          autoFocus
        />
      </label>

      <label className="block">
        <span className="font-semibold">Location</span>
        <input
          type="text"
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.location || ""}
          onChange={(e) => onChange("location", e.target.value)}
        />
      </label>

      <label className="block">
        <span className="font-semibold">Size (m²) *</span>
        <input
          type="number"
          step="0.01"
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.size_sq_m || 0}
          onChange={(e) =>
            onChange("size_sq_m", parseFloat(e.target.value) || 0)
          }
          min={0}
        />
      </label>

      <label className="block">
        <span className="font-semibold">Depth (m) *</span>
        <input
          type="number"
          step="0.01"
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.depth_m || 0}
          onChange={(e) => onChange("depth_m", parseFloat(e.target.value) || 0)}
          min={0}
        />
      </label>

      <label className="block">
        <span className="font-semibold">Stocking Date</span>
        <input
          type="date"
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.stocking_date || ""}
          onChange={(e) => onChange("stocking_date", e.target.value)}
        />
      </label>

      <label className="block">
        <span className="font-semibold">Stocking Density</span>
        <input
          type="number"
          step="0.01"
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.stocking_density || ""}
          onChange={(e) =>
            onChange("stocking_density", parseFloat(e.target.value) || 0)
          }
          min={0}
        />
      </label>

      <label className="block">
        <span className="font-semibold">Water Type</span>
        <input
          type="text"
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.water_type || ""}
          onChange={(e) => onChange("water_type", e.target.value)}
        />
      </label>

      <label className="block">
        <span className="font-semibold">Status</span>
        <select
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aqua-500"
          value={pond.status || "active"}
          onChange={(e) => onChange("status", e.target.value)}
        >
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="harvested">Harvested</option>
        </select>
      </label>

      <label className="inline-flex items-center gap-2">
        <input
          type="checkbox"
          checked={pond.is_active ?? true}
          onChange={(e) => onChange("is_active", e.target.checked)}
        />
        <span className="font-semibold">Is Active</span>
      </label>

      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={onCancel}
          className="px-5 py-2 border rounded hover:bg-gray-100"
          disabled={saving}
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!canSave}
          className={`flex items-center border gap-2 px-5 py-2 rounded ${
            canSave
              ? "bg-aqua-600 hover:bg-aqua-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <FiSave />
          Save
        </button>
      </div>
    </div>
  );
};
