import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img
        src="https://illustrations.popsy.co/blue/crashed-error.svg"
        alt="404 Illustration"
        className="w-72 mb-8"
      />
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist or was removed.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
