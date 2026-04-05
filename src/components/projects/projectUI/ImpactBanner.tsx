interface ImpactBannerProps {
  value: string;
  label: string;
  gradient: string;
}

export default function ImpactBanner({ value, label, gradient }: ImpactBannerProps) {
  return (
    <div className="rounded-2xl p-6 text-center" style={{ background: gradient }}>
      <p className="text-4xl font-black text-white">{value}</p>
      <p className="text-sm text-white/80 mt-1">{label}</p>
    </div>
  );
}
