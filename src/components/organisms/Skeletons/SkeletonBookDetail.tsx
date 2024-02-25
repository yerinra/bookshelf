export default function SkeletonBookDetail() {
  return (
    <section className="flex flex-col md:flex-row gap-8">
      <div className="skeleton rounded-lg max-w-[240px] mx-auto w-[200px] h-[292px]" />
      <div className="flex flex-col gap-3 text-start">
        <div className="skeleton font-extrabold text-2xl max-w-[500px] h-[32px]" />
        <div className="skeleton text-neutral-400 max-w-[200px] h-[24px]" />
        <div className="skeleton max-w-[500px] h-[24px]" />
        <div className="skeleton max-w-[500px] h-[24px]" />
        <div className="skeleton max-w-[190px] h-[24px]" />
        <div className="skeleton max-w-[80px] h-[24px]" />

        <button className="skeleton max-w-xs mt-3 flex  gap-3 items-center justify-center w-[320px] h-[48px]" />
      </div>
    </section>
  );
}
