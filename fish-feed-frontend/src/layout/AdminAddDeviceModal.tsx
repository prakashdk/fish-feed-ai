import React, { useState } from "react";
import { motion } from "framer-motion"; // For smooth transitions
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

interface DeviceFormData {
  deviceId: string;
  deviceType: string;
}

export const AdminAddDeviceModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<DeviceFormData>({
    deviceId: "",
    deviceType: "",
  });
  const [transitionDirection, setTransitionDirection] = useState<
    "next" | "back"
  >("next");

  // Handle form step changes
  const handleNext = () => {
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
      setTransitionDirection("next");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
      setTransitionDirection("back");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Render the first step (Device ID and Device Type)
  const renderStepOne = () => (
    <div>
      <div className="mb-4">
        <label
          htmlFor="deviceId"
          className="block text-sm font-medium text-gray-600"
        >
          Device ID
        </label>
        <input
          type="text"
          id="deviceId"
          name="deviceId"
          value={formData.deviceId}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="deviceType"
          className="block text-sm font-medium text-gray-600"
        >
          Device Type
        </label>
        <select
          id="deviceType"
          name="deviceType"
          value={formData.deviceType}
          onChange={handleChange}
          className="w-full p-3 bg-transparent border-2 border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Device Type</option>
          <option value="pondMonitor">Pond Monitor</option>
          <option value="feedCollector">Feed Collector</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-transparent backdrop-blur-md"></div>
          <button
            className="absolute top-4 right-4 p-2 bg-transparent text-white cursor-pointer rounded-full hover:bg-gray-700"
            onClick={onClose}
          >
            <MdClose size={24} /> {/* Close Icon */}
          </button>

          <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg w-[90%] overflow-hidden">
            <div className="flex justify-between items-center mb-6 max-w-md mx-auto">
              {[1, 2, 3].map((s, i) => (
                <div
                  key={s}
                  className="relative flex-1 flex flex-col items-center"
                >
                  {/* Line connector before step (except first) */}
                  {i !== 0 && (
                    <div
                      className={`absolute top-1/2 left-0 w-1/2 h-1 z-0 duration-300 ${
                        step >= s ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}

                  {/* Step circle */}
                  <div
                    className={`z-10 w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300
          ${
            step === s
              ? "bg-blue-600 text-white"
              : step > s
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-600"
          }
        `}
                  >
                    {s}
                  </div>

                  {/* Line connector after step (except last) */}
                  {i !== 2 && (
                    <div
                      className={`absolute top-1/2 right-0 w-1/2 h-1 z-0 duration-300 ${
                        step > s ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <h3 className="text-sm w-full text-center font-semibold text-gray-800 mb-4">
              Add New Device
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Transition container */}
              <motion.div
                key={step}
                initial={{
                  opacity: 0,
                  x: transitionDirection === "next" ? 100 : -100, // If 'next', start from right; If 'back', start from left
                }}
                animate={{ opacity: 1, x: 0 }} // Move to center
                exit={{
                  opacity: 0,
                  x: transitionDirection === "next" ? -100 : 100, // If 'next', exit left; If 'back', exit right
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  duration: 0.5,
                }}
                className="transition-container bg-transparent p-4 rounded-lg"
              >
                {renderStepOne()}
              </motion.div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex justify-between w-full">
                  {/* Conditionally render the Back button */}
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="py-2 px-4 bg-gray-600 text-white rounded-lg"
                    >
                      Back
                    </button>
                  )}

                  {/* Always keep the Next button aligned to the right */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg ml-auto"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
