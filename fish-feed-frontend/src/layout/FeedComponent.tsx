import { useEffect, useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiRefreshCw,
  FiTarget,
} from "react-icons/fi";
import { FeedService, type FeedResponse } from "../services/feed.service";
import { LeftoverFeedInput } from "./FeedLeftOverForm";

export const Feed = () => {
  const [feedData, setFeedData] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [unit, setUnit] = useState("kg");

  const fetchFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await FeedService.get();
      setFeedData(data);
    } catch (err: any) {
      setError(err.message || "Could not load feed info");
    } finally {
      setLoading(false);
    }
  };

  const submitFeed = async (amount: number) => {
    setSubmitting(true);
    setSuccessMsg(null);
    setError(null);
    try {
      await FeedService.updateActualFeed({
        actual_feed: amount,
      });
      setSuccessMsg(`✅ Last Recorded feed: ${formatWeight(amount)}`);
    } catch (err: any) {
      setError(err.message || "Could not update actual feed");
    } finally {
      setSubmitting(false);
    }
  };

  const submitCustomFeed = (customAmount: number) => {
    const kgAmount = convertToKg(customAmount, unit);
    if (kgAmount <= 0) return;

    submitFeed(kgAmount);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="p-2">
      <div className="p-6 w-full bg-white rounded-3xl shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Feed Summary</h1>
          <button
            onClick={fetchFeed}
            disabled={loading}
            title="Refresh"
            className="text-gray-500 hover:text-gray-800 active:scale-95 transition-transform"
          >
            <FiRefreshCw size={24} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading && (
          <div className="text-center text-gray-500">Loading feed info…</div>
        )}

        {error && (
          <div className="text-center text-red-600 font-medium mb-4">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="text-center text-green-600 font-medium mb-4">
            {successMsg}
          </div>
        )}

        {feedData && !loading && (
          <div className="space-y-8">
            {/* Feed Cards Section */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Suggested Feed */}
              <FeedCard
                icon={<FiActivity size={28} className="text-blue-700" />}
                label="AI Suggested Feed"
                value={formatWeight(feedData.predicted_feed)}
                bg="bg-blue-50"
                border="border-blue-100"
                text="text-blue-900"
              />

              {/* Standard Feed */}
              <FeedCard
                icon={<FiTarget size={28} className="text-gray-600" />}
                label="Standard Feed"
                value={formatWeight(feedData.calculated_feed)}
                bg="bg-gray-50"
                border="border-gray-200"
                text="text-gray-800"
              />

              {/* Message */}
              <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center gap-3 text-yellow-800 font-medium">
                <FiAlertCircle size={22} />
                <span>{feedData.predict_message}</span>
              </div>
            </div>

            {/* Action Section */}
            <div>
              <div className="text-base font-semibold text-gray-800 mb-3">
                What did you actually feed?
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => submitFeed(feedData.predicted_feed)}
                  disabled={submitting}
                  className="bg-blue-600 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition"
                >
                  <FiCheckCircle /> Suggested
                </button>

                <button
                  onClick={() => submitFeed(feedData.calculated_feed)}
                  disabled={submitting}
                  className="bg-gray-700 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-95 transition"
                >
                  <FiTarget /> Standard
                </button>
              </div>

              {/* Custom Feed Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Enter Custom Feed Amount
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    step="0.001"
                    inputMode="decimal"
                    placeholder="e.g., 2.5"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                  <select
                    title="Unit"
                    className="px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                  </select>
                  <button
                    disabled={submitting || !customAmount}
                    onClick={() => submitCustomFeed(parseFloat(customAmount))}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-1 hover:bg-yellow-600 active:scale-95 transition"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <LeftoverFeedInput />
    </div>
  );
};

// Helper function to format the feed weight
const formatWeight = (value: number) => {
  if (value >= 1) return `${value.toFixed(2)} kg`;
  if (value >= 0.001) return `${(value * 1000).toFixed(0)} grams`;
  return `${(value * 1_000_000).toFixed(0)} mg`;
};

const convertToKg = (amountStr: number, unit: string): number => {
  const amount = amountStr ?? "0";
  if (unit === "g") return amount / 1000;
  if (unit === "mg") return amount / 1_000_000;
  return amount;
};

const FeedCard = ({
  icon,
  label,
  value,
  bg,
  border,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bg: string;
  border: string;
  text: string;
}) => (
  <div className={`p-4 rounded-xl ${bg} ${border} flex items-center gap-4`}>
    <div>{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`text-2xl font-semibold ${text}`}>{value}</div>
    </div>
  </div>
);
