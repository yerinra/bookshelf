export default function SkeletonBookDetail() {
  return (
    <section className="flex flex-col md:flex-row gap-8">
      <div className="skeleton w-[200px] h-[300px] rounded-lg" />
      <div className="flex flex-col gap-3 text-start">
        <div className="skeleton w-[280px] h-[32px] mb-2 font-extrabold text-2xl rounded-none"></div>
        <div className="skeleton w-[200px] h-[24px] rounded-none"></div>
        <div className="skeleton w- h-[24px] rounded-none"></div>
        <div className="skeleton w-full h-[24px] rounded-none"></div>
        <div className="skeleton w-full h-[24px] rounded-none"></div>

        <div className="skeleton w-[100px] h-6 rounded-none"></div>

        {/* <button className="skeleton w-full h-[50px]"></button> */}
      </div>
    </section>
  );
}
