export const InsetCard: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
}) => {
  return (
    <div className="flex items-center gap-3 bg-black/5 p-3 rounded-lg shadow-inner">
      {children}
    </div>
  );
};
