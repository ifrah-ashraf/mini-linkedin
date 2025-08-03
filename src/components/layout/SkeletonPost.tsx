export default function SkeletonPost() {
  return (
    <div className="bg-white p-4 rounded shadow-md animate-pulse space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
          <div className="h-2 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-2/4"></div>
    </div>
  );
}
