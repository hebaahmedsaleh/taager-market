import Link from 'next/link';
import Image from "next/image";
import { COMMON } from "./constants/product";
import { MESSAGES } from "./constants";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Image
        src="https://illustrations.popsy.co/blue/crashed-error.svg"
        alt="404 Illustration"
        width={300}
        height={300}
        className="w-72 mb-8"
      />

      <h1 className="text-4xl font-bold mb-2 text-zinc-700">
        {COMMON.PAGE_NOT_FOUND}
      </h1>
      <p className="text-gray-600 mb-6">{MESSAGES.NOT_FOUND}</p>
      <Link
        href="/"
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
      >
        {COMMON.GO_BACK}
      </Link>
    </div>
  );
}
