import { Monitor, Smartphone, Gavel, TrendingUp, CreditCard, Award, Truck } from "lucide-react";

const features = [
  { icon: <Gavel size={16} />, label: "Live Auction & Bidding" },
  { icon: <TrendingUp size={16} />, label: "Price Discovery" },
  { icon: <CreditCard size={16} />, label: "Secure Payments" },
  { icon: <Award size={16} />, label: "Quality Grading" },
  { icon: <Truck size={16} />, label: "Logistics Coordination" },
];

const techStack = ["React Native", "Node.js", "Firebase", "Google Maps API"];

export default function BumperMandiDetail() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent/15 text-accent">AgriTech</span>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Agriculture</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Bumper Mandi connects farmers directly with buyers, eliminating middlemen and ensuring fair pricing through transparent bidding.
      </p>

      {/* Impact highlight */}
      <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, #E7C15A 0%, #9C7A1E 100%)" }}>
        <p className="text-4xl font-black text-white">20-30%</p>
        <p className="text-sm text-white/80 mt-1">More earnings for farmers</p>
      </div>

      {/* Challenge & Solution inline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Challenge</h4>
          <p className="text-sm text-foreground">Farmers exploited by middlemen, receiving a fraction of market price.</p>
        </div>
        <div className="rounded-2xl p-5 bg-muted border border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Solution</h4>
          <p className="text-sm text-foreground">Transparent digital marketplace with real-time bidding for direct farmer-to-buyer sales.</p>
        </div>
      </div>

      {/* Features as pills */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-3">Features</h3>
        <div className="flex flex-wrap gap-2">
          {features.map((f) => (
            <span key={f.label} className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-muted text-foreground border border-border">
              {f.icon} {f.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {[{ icon: <Smartphone size={14} />, label: "Mobile" }, { icon: <Monitor size={14} />, label: "Web" }].map((p) => (
          <span key={p.label} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-muted text-foreground border border-border">
            {p.icon} {p.label}
          </span>
        ))}
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-background text-foreground border border-border">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
