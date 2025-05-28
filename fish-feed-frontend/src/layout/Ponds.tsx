import { useState, useEffect } from "react";
import { FiEdit2, FiPlus, FiX, FiSave } from "react-icons/fi";

interface Pond {
  id: string;
  name: string;
  location?: string;
  size_sq_m: number;
  depth_m: number;
  stocking_date?: string; // ISO string
  stocking_density?: number;
  water_type?: string;
  status: string;
  is_active: boolean;
}

export const Ponds = () => {
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPond, setEditingPond] = useState<Partial<Pond> | null>(null);

  useEffect(() => {
    // TODO: fetch ponds API
    const dummyPonds: Pond[] = [
      {
        id: "1",
        name: "Pond Alpha",
        location: "North Field",
        size_sq_m: 1500,
        depth_m: 2.5,
        stocking_date: "2024-04-10",
        stocking_density: 300,
        water_type: "Freshwater",
        status: "active",
        is_active: true,
      },
      {
        id: "2",
        name: "Pond Beta",
        location: "East Side",
        size_sq_m: 900,
        depth_m: 1.8,
        stocking_date: "2024-03-22",
        stocking_density: 250,
        water_type: "Brackish",
        status: "maintenance",
        is_active: true,
      },
    ];
    setPonds(dummyPonds);
  }, []);

  function openModal(pond?: Pond) {
    setEditingPond(
      pond
        ? { ...pond }
        : {
            id: `temp-${Date.now()}`,
            name: "",
            size_sq_m: 0,
            depth_m: 0,
            status: "active",
            is_active: true,
          }
    );
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingPond(null);
  }

  function savePond() {
    if (!editingPond) return;
    // TODO: call API to save (create or update)
    setPonds((prev) => {
      const exists = prev.find((p) => p.id === editingPond.id);
      if (exists) {
        // update
        return prev.map((p) =>
          p.id === editingPond.id ? (editingPond as Pond) : p
        );
      }
      // add new
      return [editingPond as Pond, ...prev];
    });
    closeModal();
  }

  function onChange(field: keyof Pond, value: any) {
    setEditingPond((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h1 className="text-3xl font-bold mb-6">Ponds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ponds.map((pond) => (
          <div
            key={pond.id}
            className="bg-gray-50 p-4 rounded shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {pond.name || "Untitled Pond"}
              </h2>
              <p>
                <span className="font-semibold">Size:</span> {pond.size_sq_m} m²
              </p>
              <p>
                <span className="font-semibold">Depth:</span> {pond.depth_m} m
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span className="capitalize">{pond.status}</span>
              </p>
            </div>

            <button
              onClick={() => openModal(pond)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 flex items-center justify-center gap-2"
            >
              <FiEdit2 />
              View / Edit
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => openModal()}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded px-6 py-3 flex items-center gap-2 mx-auto"
      >
        <FiPlus />
        Add New Pond
      </button>
      {/* Modal */}
      {modalOpen && editingPond && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded max-w-lg w-full p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {editingPond.id?.toString().startsWith("temp-")
                ? "Add New Pond"
                : "Edit Pond"}
            </h2>
            {/* Form fields */}
            <div className="space-y-4">
              <label className="block">
                <span className="font-semibold">Name</span>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.name || ""}
                  onChange={(e) => onChange("name", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="font-semibold">Location</span>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.location || ""}
                  onChange={(e) => onChange("location", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="font-semibold">Size (m²)</span>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.size_sq_m || 0}
                  onChange={(e) =>
                    onChange("size_sq_m", parseFloat(e.target.value) || 0)
                  }
                />
              </label>

              <label className="block">
                <span className="font-semibold">Depth (m)</span>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.depth_m || 0}
                  onChange={(e) =>
                    onChange("depth_m", parseFloat(e.target.value) || 0)
                  }
                />
              </label>

              <label className="block">
                <span className="font-semibold">Stocking Date</span>
                <input
                  type="date"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.stocking_date || ""}
                  onChange={(e) => onChange("stocking_date", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="font-semibold">Stocking Density</span>
                <input
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.stocking_density || ""}
                  onChange={(e) =>
                    onChange(
                      "stocking_density",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
              </label>

              <label className="block">
                <span className="font-semibold">Water Type</span>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.water_type || ""}
                  onChange={(e) => onChange("water_type", e.target.value)}
                />
              </label>

              <label className="block">
                <span className="font-semibold">Status</span>
                <select
                  className="mt-1 block w-full border rounded px-3 py-2"
                  value={editingPond.status || "active"}
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
                  checked={editingPond.is_active ?? true}
                  onChange={(e) => onChange("is_active", e.target.checked)}
                />
                <span className="font-semibold">Is Active</span>
              </label>
            </div>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={closeModal}
                className="px-5 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>{" "}
              <button
                onClick={savePond}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded flex items-center gap-2"
              >
                {" "}
                <FiSave /> Save{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </section>
  );
};
