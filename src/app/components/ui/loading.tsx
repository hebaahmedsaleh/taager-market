export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Loading ...</p>
      </div>
    </div>
  );
}
