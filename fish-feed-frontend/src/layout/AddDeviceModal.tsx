import { FiX } from "react-icons/fi";

interface AddDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export const AddDeviceModal = ({
  isOpen,
  onClose,
  children,
}: AddDeviceModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add Existing Device</h2>

        <div>{children}</div>
      </div>
    </div>
  );
};
