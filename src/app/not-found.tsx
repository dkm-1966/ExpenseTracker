import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen text-3xl">
      <div className="flex gap-2 items-center">
        <p className="text-gray-200">Not-Found</p>
        <div className="bg-gray-200 w-0.5 h-6"></div>
        <Link href={"/dashboard"} className="text-blue-500">
          Main
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
