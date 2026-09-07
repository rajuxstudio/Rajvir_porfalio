import { MapPin, Linkedin, Mail, Github, Twitter, Dribbble } from "lucide-react";

const avatar = "https://api.dicebear.com/9.x/avataaars/svg?seed=Rajveer";

export const PROFILE = {
  name: "Rajveer",
  role: "UX/UI Designer | Python Developer",
  location: "India",
  experience: "4+ years",
  email: "raju@xstudio.com",
};

const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/rajuxstudio/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/rajuxstudio", label: "GitHub" },
  { icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
];

export default function IdCard() {
  return (
    <div className="group relative w-[240px] [perspective:1200px]">
      <div className="relative mx-auto h-6 w-16">
        <div className="absolute left-1/2 top-0 h-4 w-10 -translate-x-1/2 rounded-t-md bg-muted shadow-inner" />
        <div className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-border bg-background" />
      </div>
      <div className="mx-auto h-4 w-0.5 bg-gradient-to-b from-accent to-primary" />

      <div className="relative origin-top rotate-[-4deg] overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-[0_25px_50px_-20px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:rotate-[2deg] group-hover:-translate-y-1">
        <div className="flex items-center justify-between bg-accent px-3 py-1.5">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-accent-foreground/90">Design ID</span>
          <span className="text-[9px] font-mono text-accent-foreground/80">#RV-2021</span>
        </div>

        <div className="flex gap-3 p-3">
          <div className="relative">
            <img
              src={avatar}
              alt={PROFILE.name}
              className="h-20 w-16 rounded-md object-cover ring-2 ring-border"
            />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="flex-1 space-y-1">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Name</div>
              <div className="text-xs font-semibold leading-tight text-foreground">{PROFILE.name}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">Role</div>
              <div className="text-[10px] leading-tight text-card-foreground/80">{PROFILE.role}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-dashed border-border px-3 py-2 text-[10px]">
          <div>
            <div className="text-muted-foreground">Location</div>
            <div className="flex items-center gap-1 text-foreground">
              <MapPin className="h-2.5 w-2.5" /> {PROFILE.location}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Experience</div>
            <div className="text-foreground">{PROFILE.experience}</div>
          </div>
          <div className="col-span-2">
            <div className="text-muted-foreground">Email</div>
            <div className="truncate text-foreground">{PROFILE.email}</div>
          </div>
        </div>

        <div className="flex items-center justify-around rounded-b-2xl border-t border-border bg-muted/60 px-3 py-2.5">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={label}
              className="flex h-7 w-7 items-center justify-center rounded-full text-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}