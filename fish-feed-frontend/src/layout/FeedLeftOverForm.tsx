import { useState } from "react";
import { FiCheck, FiCheckCircle, FiX } from "react-icons/fi";
import { FeedService } from "../services/feed.service";

export const LeftoverFeedInput = () => {
  const [open, setOpen] = useState(false);
  const [leftover, setLeftover] = useState("");
  const [unit, setUnit] = useState<"kg" | "g" | "mg">("kg");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertToKg = (value: string, unit: string) => {
    const amount = parseFloat(value || "0");
    if (unit === "g") return amount / 1000;
    if (unit === "mg") return amount / 1_000_000;
    return amount;
  };

  const submitLeftover = async () => {
    const kgAmount = convertToKg(leftover, unit);
    if (kgAmount < 0 || isNaN(kgAmount)) {
      setError("Please enter a valid amount.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await FeedService.post({ left_over: kgAmount });
      setSuccess(true);
      setLeftover("");
      setTimeout(() => {
        setSuccess(false);
        setOpen(false);
      }, 1500);
    } catch {
      setError("Failed to submit leftover feed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full bg-yellow-100 border border-yellow-300 text-yellow-800 font-semibold py-2 rounded-xl hover:bg-yellow-200 flex items-center justify-center gap-2 transition-colors"
      >
        <FiCheckCircle size={20} className="text-yellow-600" />
        Log Leftover Feed
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
          onClick={() => !loading && setOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => !loading && setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              title="Close"
              disabled={loading}
            >
              <FiX size={24} />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Enter Leftover Feed
            </h2>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="number"
                min="0"
                step="0.001"
                inputMode="decimal"
                placeholder="e.g., 0.25"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={leftover}
                onChange={(e) => setLeftover(e.target.value)}
                disabled={loading}
              />
              <select
                className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                disabled={loading}
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="mg">mg</option>
              </select>
            </div>

            {error && (
              <div className="text-red-600 text-sm mb-3 font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 text-green-600 text-sm mb-3 font-medium">
                <FiCheck size={18} /> Leftover feed submitted!
              </div>
            )}

            <button
              onClick={submitLeftover}
              disabled={loading || !leftover}
              className="w-full bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 active:scale-95 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
