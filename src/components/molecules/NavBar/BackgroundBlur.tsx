type BackgroundBlurProps = {
  navOpen: boolean;
  closeNav: () => void;
};

export default function BackgroundBlur({
  navOpen,
  closeNav,
}: BackgroundBlurProps) {
  return (
    <section
      className={`${
        navOpen ? "" : "hidden"
      } sm:hidden z-[10] absolute top-0 left-0 w-screen h-screen bg-black/60 cursor-pointer transition-all duration-600`}
      onClick={closeNav}
    />
  );
}
