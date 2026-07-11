import { ReactNode } from "react";

interface FeatureItem {
  icon: ReactNode;
  label: string;
}

interface FeatureDetailItem {
  icon: ReactNode;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  title?: string;
  features: FeatureItem[] | FeatureDetailItem[];
  columns?: 2 | 3;
  gradient?: string;
}

function isDetailItem(item: FeatureItem | FeatureDetailItem): item is FeatureDetailItem {
  return "desc" in item;
}

export default function FeatureGrid({ title = "Features", features, columns = 3, gradient }: FeatureGridProps) {
  const gridCols = columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-3";

  return (
    <div>
      <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
      <div className={`grid ${gridCols} gap-3`}>
        {features.map((f, i) => {
          if (isDetailItem(f)) {
            return (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted border border-border">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={gradient ? { background: gradient } : undefined}
                >
                  <span className={gradient ? "text-white" : "text-accent"}>{f.icon}</span>
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            );
          }
          return (
            <span key={i} className="flex items-center gap-2 text-xs font-medium px-4 py-3 rounded-xl bg-muted text-foreground border border-border">
              {f.icon} {f.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
