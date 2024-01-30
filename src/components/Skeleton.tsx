import React from "react";

export default function Skeleton() {
  return (
    <>
      {[0, 1, 2].map((v) => (
        <>
          <div className="flex gap-4 items-start text-start mx-10 mb-5 border border-1 border-slate-700 px-7 py-5 rounded-lg">
            <div className="skeleton w-[85px] h-[115px] rounded-lg shrink-0"></div>
            <div className="flex flex-col gap-3">
              <div className="skeleton w-[200px] mt-1 h-5 rounded-sm" />
              <div className="skeleton w-20 h-4 rounded-sm" />
              <div className="skeleton w-32 h-6 rounded-lg" />
            </div>
          </div>
          <div className="flex gap-4 items-start text-start mx-10 mb-5 border border-1 border-slate-700 px-7 py-5 rounded-lg">
            <div className="skeleton w-[85px] h-[115px] rounded-lg shrink-0"></div>
            <div className="flex flex-col gap-3">
              <div className="skeleton w-[120px] mt-1 h-5 rounded-sm" />
              <div className="skeleton w-36 h-4 rounded-sm" />
              <div className="skeleton w-32 h-6 rounded-lg" />
            </div>
          </div>
        </>
      ))}
    </>
  );
}
