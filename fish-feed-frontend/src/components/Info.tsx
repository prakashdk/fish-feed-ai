import { AiOutlineInfoCircle } from "react-icons/ai";

type InfoProps = {
  children: React.ReactNode;
};

export const Info = ({ children }: InfoProps) => {
  return (
    <div className="relative inline-block">
      <div className="peer cursor-pointer text-gray-500 hover:text-gray-800">
        <AiOutlineInfoCircle className="w-4 h-4" />
      </div>

      <div
        className="
          absolute left-full top-1/2 -translate-y-1/2 ml-2
          w-max max-w-xs rounded-md bg-white p-2 text-sm text-gray-800 shadow-lg border border-gray-200 z-50
          opacity-0 pointer-events-none transition-opacity duration-200
          peer-hover:opacity-100 peer-hover:pointer-events-auto
          hover:opacity-100 hover:pointer-events-auto
        "
      >
        {children}
      </div>
    </div>
  );
};
