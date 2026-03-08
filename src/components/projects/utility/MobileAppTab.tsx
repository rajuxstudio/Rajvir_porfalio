import MobileAppDownload from "@/components/projects/shared/MobileAppDownload";
import mobileMockup1 from "@/assets/utility-mobile-mockup-1.png";
import mobileMockup2 from "@/assets/utility-mobile-mockup-2.png";

export default function MobileAppTab() {
  return (
    <MobileAppDownload
      headline="Utility payments & issue reporting, simplified"
      mockups={[mobileMockup1, mobileMockup2]}
      features={[
        { title: "Bill Payment", desc: "Minimal steps, mobile optimized, clear confirmation and receipt generation." },
        { title: "Payment Tracking", desc: "Transaction history & property overview with filterable records." },
        { title: "Work Order via Photo", desc: "Users can capture and upload images while reporting issues in their area." },
        { title: "Property & Utility Overview", desc: "Clean dashboard for bill visibility and account management." },
      ]}
      contributions={[
        "Complete UI redesign",
        "Defined color system",
        "Typography scale",
        "Component hierarchy",
        "Design consistency",
      ]}
      projectStage={[
        "App was in early structural stage when joined",
        "No defined design system",
      ]}
    />
  );
}
