import { BookmarkFilledIcon } from "@radix-ui/react-icons";
export default function SkeletonSearchResult() {
  return (
    <>
      <div className="flex gap-5 items-start text-start mx-10 mb-4 border border-1 border-l-border dark:border-d-border px-7 py-5 rounded-lg relative  ">
        <div className="skeleton rounded-lg cursor-pointer w-[85px] h-[125px]" />
        <div className="flex flex-col gap-2">
          <div className="skeleton font-semibold text-md cursor-pointer w-[294px] h-[23px]"></div>
          <div className="skeleton text-xs text-l-text-secondary w-[170px] h-[16px]"></div>
          <button className="mt-3 text-l-bg-secondary dark:text-d-bg-secondary">
            <BookmarkFilledIcon width="20" height="20" />
          </button>
        </div>
      </div>
      <div className="flex gap-5 items-start text-start mx-10 mb-4 border border-1 border-l-border dark:border-d-border px-7 py-5 rounded-lg relative  ">
        <div className="skeleton rounded-lg cursor-pointer w-[85px] h-[125px]" />
        <div className="flex flex-col gap-2">
          <div className="skeleton font-semibold text-md cursor-pointer w-[294px] h-[23px]"></div>
          <div className="skeleton text-xs text-l-text-secondary w-[170px] h-[16px]"></div>
          <button className="mt-3 text-l-bg-secondary dark:text-d-bg-secondary">
            <BookmarkFilledIcon width="20" height="20" />
          </button>
        </div>
      </div>
      <div className="flex gap-5 items-start text-start mx-10 mb-4 border border-1 border-l-border dark:border-d-border px-7 py-5 rounded-lg relative  ">
        <div className="skeleton rounded-lg cursor-pointer w-[85px] h-[125px]" />
        <div className="flex flex-col gap-2">
          <div className="skeleton font-semibold text-md cursor-pointer w-[294px] h-[23px]"></div>
          <div className="skeleton text-xs text-l-text-secondary w-[170px] h-[16px]"></div>
          <button className="mt-3 text-l-bg-secondary dark:text-d-bg-secondary">
            <BookmarkFilledIcon width="20" height="20" />
          </button>
        </div>
      </div>
    </>
  );
}
