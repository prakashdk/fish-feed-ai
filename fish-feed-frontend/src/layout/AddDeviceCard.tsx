import { FaPlus } from "react-icons/fa";

export const AddDeviceCard: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 cursor-pointer flex items-center justify-center gap-x-2 rounded-lg shadow-lg  text-white px-6 py-3 text-xl hover:bg-blue-700 transition-all ease-in-out duration-300"
    >
      <FaPlus /> Add New Device
    </button>
  );
};
