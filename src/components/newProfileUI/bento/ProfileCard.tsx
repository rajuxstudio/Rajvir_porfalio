// Profile card for the Profile page: a soft frame around a full-bleed portrait that fades into
// the card, then the name with a verified tick, a one-line bio and small stats.
// Clicking the card opens the About sheet.
import { BadgeCheck, Briefcase, Clock, MapPin } from "lucide-react";
import photo from "@/assets/rajvir/Profile.png";

export default function ProfileCard({
  name,
  bio,
  stats,
  onOpen,
  className = "",
}: {
  name: string;
  bio: string;
  stats: { years: string; roles: number; location: string };
  onOpen: () => void;
  className?: string;
}) {
  return (
    <div
      className={`group relative rounded-[30px] bg-[#eceef1] p-[7px] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_20px_40px_-24px_rgba(20,25,40,0.35)] transition duration-300 hover:-translate-y-1 dark:bg-[#232327] dark:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] bg-[#f6f7f8] dark:bg-[#18181b]">
        <button
          type="button"
          aria-label={`About ${name}: open the full profile`}
          onClick={onOpen}
          className="absolute inset-0 z-[2] rounded-[inherit] focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-black/15"
        />

        {/* portrait, fading into the card */}
        {/* photo + fade zoom together, so the photo's bottom edge never shows below the fade */}
        <div className="absolute inset-x-0 top-0 h-[78%] origin-top transition duration-700 group-hover:scale-[1.035]">
          <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_22%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% via-[#f6f7f8]/80 via-[78%] to-[#f6f7f8] dark:via-[#18181b]/80 dark:to-[#18181b]" />
          {/* solid strip so no sub-pixel edge of the photo can peek through */}
          <div className="absolute inset-x-0 -bottom-px h-[3px] bg-[#f6f7f8] dark:bg-[#18181b]" />
        </div>

        {/* details */}
        <div className="pointer-events-none relative z-[3] mt-auto px-5 pb-5 pt-10 lg:px-6 lg:pb-6">
          <h3 className="flex items-center gap-2 text-[clamp(22px,3.1vh,28px)] font-semibold leading-tight tracking-tight text-[#16161a] dark:text-white">
            {name}
            <BadgeCheck className="h-[1em] w-[1em] shrink-0 fill-[#2fb35a] text-white dark:text-[#18181b]" strokeWidth={2.4} aria-label="Verified" />
          </h3>
          <p className="mt-2 max-w-[30ch] text-[clamp(13px,1.75vh,15.5px)] leading-snug text-[#55565e] dark:text-white/65">{bio}</p>

          <div className="mt-5 flex items-center">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-[#55565e] dark:text-white/65">
              <span className="flex items-center gap-1.5" title="Experience">
                <Clock className="h-4 w-4 text-[#8a8b93]" strokeWidth={1.8} /> {stats.years}
              </span>
              <span className="flex items-center gap-1.5" title="Roles">
                <Briefcase className="h-4 w-4 text-[#8a8b93]" strokeWidth={1.8} /> {stats.roles}
              </span>
              <span className="flex items-center gap-1.5" title="Based in">
                <MapPin className="h-4 w-4 text-[#8a8b93]" strokeWidth={1.8} /> {stats.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
