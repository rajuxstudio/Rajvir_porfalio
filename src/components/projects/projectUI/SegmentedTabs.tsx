import { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface SegmentedTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function SegmentedTabs({ tabs, activeTab, onTabChange }: SegmentedTabsProps) {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-1 p-1 rounded-full bg-muted border border-border shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-1.5 text-sm font-medium px-5 py-2 rounded-full transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="sm:hidden">{tab.icon}</span>
            <span className="hidden sm:inline-flex sm:items-center sm:gap-1.5">{tab.icon} {tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
