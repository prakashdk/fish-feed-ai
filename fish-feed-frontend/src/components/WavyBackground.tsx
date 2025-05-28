export const WavyBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[url('/src/assets/wave-background.svg')] bg-cover bg-center min-h-[calc(100vh-12vh)] p-6">
      {children}
    </div>
  );
};
