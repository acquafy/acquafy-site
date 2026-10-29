// components/base/BasePageHeading.tsx
export function BasePageHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-[28px] leading-tight font-extrabold tracking-tight text-ink">{title}</h1>
      <p className="mt-1 max-w-3xl text-[15px] text-ink-soft">{description}</p>
    </div>
  );
}
