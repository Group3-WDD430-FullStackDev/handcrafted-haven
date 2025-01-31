import { JSX } from "react";

export function CardSkeleton(): JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Fixed size for the card */}
      <div className="w-80 h-80 relative">
        <div className="absolute inset-0 w-full h-full skeleton" />
      </div>

      <div className="p-4">
        <h3 className="mt-1 text-lg font-medium skeleton min-h-6"></h3>
        <p className="mt-1 text-sm min-h-6 skeleton"></p>
      </div>
    </div>
  );
}
