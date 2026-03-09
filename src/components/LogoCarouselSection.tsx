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

export default function LogoCarouselSection() {
  const count = logos.length;
  const radius = 120; // px – orbit radius

  return (
    <section
      className="w-full py-20 overflow-hidden"
      style={{ background: "hsl(var(--background))" }}
    >
      <p
        className="text-center text-[10px] tracking-[0.22em] uppercase font-medium mb-14"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        Trusted by
      </p>

      {/* 3D orbit container */}
      <div
        className="mx-auto flex items-center justify-center"
        style={{ perspective: "800px", height: `${radius * 2 + 60}px` }}
      >
        <div
          className="relative logo-orbit-ring"
          style={{
            width: "200px",
            height: "200px",
            transformStyle: "preserve-3d",
          }}
        >
          {logos.map((logo, i) => {
            const angle = (360 / count) * i;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 flex items-center justify-center"
                style={{
                  width: "140px",
                  height: "50px",
                  marginLeft: "-70px",
                  marginTop: "-25px",
                  transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 w-auto object-contain"
                  style={{
                    filter: "var(--logo-filter, brightness(0))",
                    opacity: 0.75,
                    maxWidth: "140px",
                  }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
