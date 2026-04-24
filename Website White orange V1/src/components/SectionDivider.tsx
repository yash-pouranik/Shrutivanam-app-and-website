interface SectionDividerProps {
  withSymbol?: boolean;
  className?: string;
}

export default function SectionDivider({
  withSymbol = false,
  className = "",
}: SectionDividerProps) {
  if (withSymbol) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex-1 gold-divider" />
        <span
          className="text-[#C9A84C]/60 text-xl font-[family-name:var(--font-cormorant)]"
          aria-hidden="true"
        >
          ✦
        </span>
        <div className="flex-1 gold-divider" />
      </div>
    );
  }

  return <div className={`gold-divider ${className}`} />;
}
