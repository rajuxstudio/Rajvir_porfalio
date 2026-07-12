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
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Dribbble, href: "https://dribbble.com", label: "Dribbble" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: `mailto:${PROFILE.email}`, label: "Email" },
];

export default function IdCard() {
  return (
    <div className="group relative w-[240px] [perspective:1200px]">
      <div className="relative mx-auto h-6 w-16">
        <div className="absolute left-1/2 top-0 h-4 w-10 -translate-x-1/2 rounded-t-md bg-neutral-400 shadow-inner" />
        <div className="absolute left-1/2 top-3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-neutral-500 bg-white" />
      </div>
      <div className="mx-auto h-4 w-0.5 bg-gradient-to-b from-blue-600 to-blue-700" />

      <div className="relative origin-top rotate-[-4deg] rounded-2xl bg-white shadow-[0_25px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200 transition-transform duration-500 ease-out group-hover:rotate-[2deg] group-hover:-translate-y-1">
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-1.5">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-white/90">Design ID</span>
          <span className="text-[9px] font-mono text-white/80">#RV-2021</span>
        </div>

        <div className="flex gap-3 p-3">
          <div className="relative">
            <img
              src={avatar}
              alt={PROFILE.name}
              className="h-20 w-16 rounded-md object-cover ring-2 ring-neutral-100"
            />
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          <div className="flex-1 space-y-1">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-400">Name</div>
              <div className="text-xs font-semibold text-neutral-900 leading-tight">{PROFILE.name}</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-400">Role</div>
              <div className="text-[10px] text-neutral-700 leading-tight">{PROFILE.role}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-dashed border-neutral-200 px-3 py-2 text-[10px]">
          <div>
            <div className="text-neutral-400">Location</div>
            <div className="flex items-center gap-1 text-neutral-800">
              <MapPin className="h-2.5 w-2.5" /> {PROFILE.location}
            </div>
          </div>
          <div>
            <div className="text-neutral-400">Experience</div>
            <div className="text-neutral-800">{PROFILE.experience}</div>
          </div>
          <div className="col-span-2">
            <div className="text-neutral-400">Email</div>
            <div className="truncate text-neutral-800">{PROFILE.email}</div>
          </div>
        </div>

        {/* Social icons row (replaces barcode) */}
        <div className="flex items-center justify-around rounded-b-2xl border-t border-neutral-100 bg-neutral-50 px-3 py-2.5">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={label}
              className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-700 transition hover:bg-blue-600 hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}