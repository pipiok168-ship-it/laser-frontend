export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-darkBg text-darkText">
      <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
}
