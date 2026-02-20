import logoCilcx from "@/assets/logo-cilcx.svg";
import logoName from "@/assets/logo-name.svg";
import logoFrame1 from "@/assets/logo-frame1.svg";
import logoRecruitEase from "@/assets/logo-recruit-ease.svg";

const logos = [
  { src: logoCilcx, alt: "Cilcx" },
  { src: logoName, alt: "Name" },
  { src: logoFrame1, alt: "Frame 1" },
  { src: logoRecruitEase, alt: "Recruit Ease" },
];

// Duplicate for seamless loop
const allLogos = [...logos, ...logos, ...logos];

export default function LogoCarouselSection() {
  return (
    <section
      className="w-full py-16 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      <p
        className="text-center text-[10px] tracking-[0.22em] uppercase font-medium mb-10"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Trusted by
      </p>

      {/* Marquee track */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, hsl(var(--background)), transparent)"
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, hsl(var(--background)), transparent)"
          }}
        />

        <div className="flex items-center animate-logo-marquee whitespace-nowrap gap-16 px-8">
          {allLogos.map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center shrink-0"
              style={{ height: "40px" }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto object-contain"
                style={{
                  filter: "brightness(0)",
                  opacity: 0.75,
                  maxWidth: "160px"
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
