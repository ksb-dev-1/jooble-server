export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-56px)] pt-32 pb-16 max-w-5xl w-full px-4 mx-auto">
      {children}
    </div>
  );
}
