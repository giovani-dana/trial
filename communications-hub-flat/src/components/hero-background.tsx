export function HeroBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 -top-24 size-[28rem] animate-aurora rounded-full bg-brand-400/25 blur-[90px]" />
      <div className="absolute -right-20 top-0 size-[26rem] animate-aurora-slow rounded-full bg-sky-300/30 blur-[90px]" />
      <div className="absolute bottom-[-8rem] left-1/3 size-[24rem] animate-aurora rounded-full bg-brand-200/40 blur-[100px]" />
      <div className="grid-bg absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
