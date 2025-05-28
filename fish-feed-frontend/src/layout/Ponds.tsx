import type { Pond } from "@/dto/pond.dto";
import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiX } from "react-icons/fi";
import { PondService } from "../services/pond.service";
import { PondForm } from "../forms/PondForm";
import { useOrganisation } from "../hooks/useOrganisation";

const defaultNewPond: Partial<Pond> = {
  name: "",
  location: "",
  size_sq_m: 0,
  depth_m: 0,
  stocking_date: "",
  stocking_density: 0,
  water_type: "",
  status: "active",
  is_active: true,
};

export const Ponds = () => {
  const [ponds, setPonds] = useState<Pond[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPond, setEditingPond] = useState<Partial<Pond> | null>(null);
  const [saving, setSaving] = useState(false);

  const organisation = useOrganisation((state) => state.organisation);
  const organisationLoading = useOrganisation((state) => state.loading);

  useEffect(() => {
    async function fetchPonds() {
      setLoading(true);
      setError(null);
      try {
        const data = await PondService.list(organisation?.id!);
        setPonds(data);
      } catch (err) {
        setError("Failed to load ponds.");
      } finally {
        setLoading(false);
      }
    }
    if (organisation) {
      fetchPonds();
    }
  }, [organisation]);

  useEffect(() => {
    if (organisation) {
      // safe to fetch ponds now
    }
  }, [organisation]);

  function openModal(pond?: Pond) {
    setEditingPond(
      pond ? { ...pond } : { ...defaultNewPond, id: `temp-${Date.now()}` }
    );
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingPond(null);
  }

  async function savePond() {
    if (!editingPond) return;
    setSaving(true);
    try {
      if (editingPond.id?.toString().startsWith("temp-")) {
        const created = await PondService.create(
          organisation?.id!,
          editingPond as Omit<Pond, "id" | "created_at" | "updated_at">
        );
        setPonds((prev) => [created, ...prev]);
      } else {
        setPonds((prev) =>
          prev.map((p) => (p.id === editingPond.id ? (editingPond as Pond) : p))
        );
      }
      closeModal();
    } catch {
      setError("Failed to save pond.");
    } finally {
      setSaving(false);
    }
  }

  function onChange(field: keyof Pond, value: any) {
    setEditingPond((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  return (
    <section className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-aqua-700 tracking-tight">
          Ponds
        </h1>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-green-700 transition"
          aria-label="Add new pond"
        >
          <FiPlus size={20} />
          Add New Pond
        </button>
      </header>

      {loading && (
        <p className="text-center text-aqua-600 font-semibold animate-pulse">
          Loading ponds...
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 font-semibold bg-red-100 p-3 rounded-md">
          {error}
        </p>
      )}

      {!loading && ponds.length === 0 && (
        <p className="text-center text-gray-500 italic">No ponds found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {ponds.map((pond) => (
          <div
            key={pond.id}
            className="bg-gradient-to-br from-aqua-50 to-white p-6 rounded-2xl shadow-md flex flex-col justify-between hover:shadow-xl transition"
          >
            <div>
              <h2 className="text-2xl font-bold text-aqua-900 mb-3 truncate">
                {pond.name || "Untitled Pond"}
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Size:</span>{" "}
                  <span className="text-aqua-600">{pond.size_sq_m} m²</span>
                </p>
                <p>
                  <span className="font-semibold">Depth:</span>{" "}
                  <span className="text-aqua-600">{pond.depth_m} m</span>
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="capitalize text-green-700 font-semibold">
                    {pond.status}
                  </span>
                </p>
                {pond.location && (
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {pond.location}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => openModal(pond)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-aqua-600 px-5 py-2 font-semibold shadow-md hover:bg-aqua-700 transition"
              aria-label={`Edit pond ${pond.name}`}
            >
              <FiEdit2 size={18} />
              View / Edit
            </button>
          </div>
        ))}
      </div>

      {modalOpen && editingPond && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6"
        >
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 relative shadow-2xl overflow-auto max-h-[90vh]">
            <button
              aria-label="Close modal"
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition"
            >
              <FiX size={26} />
            </button>
            <h2
              id="modal-title"
              className="text-3xl font-extrabold text-aqua-800 mb-6 tracking-wide"
            >
              {editingPond.id?.toString().startsWith("temp-")
                ? "Add New Pond"
                : `Edit Pond: ${editingPond.name}`}
            </h2>
            <PondForm
              pond={editingPond}
              onChange={onChange}
              onCancel={closeModal}
              onSave={savePond}
              saving={saving}
            />
          </div>
        </div>
      )}
    </section>
  );
};
