export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-blue-600 text-white flex items-center px-4 shadow z-10">
        <h1 className="text-lg font-semibold">My App</h1>
      </header>

      {/* Spacer for Header */}
      <div className="h-16" />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4">
            This is the scrollable content area. Add more content here to see
            scrolling behavior.
          </p>
          {/* Example content */}
          {[...Array(50)].map((_, i) => (
            <p key={i}>Line {i + 1}</p>
          ))}
        </div>
      </main>

      {/* Spacer for Footer */}
      <div className="h-14" />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-blue-600 text-white flex items-center justify-center shadow z-10">
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
}
