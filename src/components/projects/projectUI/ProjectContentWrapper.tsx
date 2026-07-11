import { ReactNode } from "react";

interface ProjectContentWrapperProps {
  children: ReactNode;
  description?: string;
}

export default function ProjectContentWrapper({ children, description }: ProjectContentWrapperProps) {
  return (
    <div className="px-6 sm:px-8 pb-8 flex flex-col gap-6 mt-6">
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
}
