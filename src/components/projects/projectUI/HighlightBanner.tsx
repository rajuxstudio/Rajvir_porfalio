interface HighlightBannerProps {
  title: string;
  subtitle: string;
  gradient: string;
}

export default function HighlightBanner({ title, subtitle, gradient }: HighlightBannerProps) {
  return (
    <div className="rounded-xl p-6" style={{ background: gradient }}>
      <p className="text-lg font-bold text-white mb-1">{title}</p>
      <p className="text-sm text-white/80">{subtitle}</p>
    </div>
  );
}
