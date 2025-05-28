export const Card: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
}) => {
  return (
    <div className="rounded-2xl p-4 bg-black/10 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {children}
    </div>
  );
};
