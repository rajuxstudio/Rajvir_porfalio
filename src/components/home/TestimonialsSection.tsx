import {
  Quote,
  Star,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import rupaAvatar from "@/assets/pages/rupa-avatar.png";
import vsSibiAvatar from "@/assets/pages/vs-sibi-avatar.png";
import Footer from "@/components/newUI/footer"

const testimonials = [
  {
    quote:
      "I highly recommend Rajvir for his exceptional label and logo design skills. His designs not only captivate visually but also enhance product presentation and user interaction. His creativity, professionalism, and deep understanding of design make him a valuable asset to any team.",
    author: "V.S. Sibi",
    role: "Entrepreneur | UX-Product Designer | Ex-Amazon",
    date: "April 11, 2025",
    rating: 5.0,
    avatar: vsSibiAvatar,
  },
  {
    quote:
      "Raj Vir played a pivotal role in my professional growth. His ability to break down complex concepts into easily understandable modules was truly impressive. What sets him apart is his unwavering commitment to mentoring. I owe a significant part of my success as a UX designer to his mentorship.",
    author: "Rupa Mothukuri",
    role: "User Experience Design (UX) | Product Design",
    date: "Feb 10, 2025",
    rating: 5.0,
    avatar: rupaAvatar,
  },
  {
    quote:
      "Rajvir is a UX treasure trove. We had the opportunity to work with him on our UX process which involved various aspects of user behavior. He was able to decipher minute details very quickly and give us insights into the UX flow that were fundamentally critical to our application.",
    author: "Syed Asim",
    role: "AI Product Leader (Robotics & EdTech)",
    date: "Feb 28, 2022",
    rating: 5.0,
    avatar: null,
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  // Calculate position on vertical semi-circle arc
  const getPosition = (index: number, total: number, isMobile: boolean) => {
    const offset = index - activeIndex;
    const normalizedOffset = ((offset % total) + total) % total;
    const adjustedOffset =
      normalizedOffset > total / 2
        ? normalizedOffset - total
        : normalizedOffset;

    const angleSpread = isMobile ? 40 : 45;
    const angle = adjustedOffset * angleSpread;
    const angleRad = (angle * Math.PI) / 180;

    const radius = isMobile ? 70 : 100;

    const x = Math.sin(Math.abs(angleRad)) * radius * 0.3;
    const y = Math.sin(angleRad) * radius;

    return { x, y, angle: adjustedOffset };
  };

  return (
    <section className="relative flex flex-col min-h-screen overflow-hidden bg-background text-foreground pt-20 md:pt-24">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] rounded-full bg-accent/5 blur-[100px] md:blur-[150px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs tracking-[0.22em] uppercase font-medium mb-4 text-muted-foreground">
            TESTIMONIALS
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
            Results that speak volume
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Find out how our happy clients are raving about us.
          </p>
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex flex-col items-center gap-10 max-w-sm mx-auto">
          {/* Avatar Row */}
          <div className="flex items-center justify-center gap-4">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className="cursor-pointer transition-all duration-500"
                >
                  <div
                    className={`rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden ${isActive
                      ? "w-14 h-14 ring-2 ring-accent ring-offset-2 ring-offset-background scale-100"
                      : "w-10 h-10 bg-muted scale-90 opacity-50"
                      }`}
                  >
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      testimonial.author.charAt(0)
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Author */}
          <div className="text-center">
            <div className="font-semibold text-lg">
              {testimonials[activeIndex].author}
            </div>
            <div className="flex items-center justify-center gap-1 text-sm mt-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-accent">
                {testimonials[activeIndex].rating}
              </span>
              <span className="text-muted-foreground text-xs">
                on {testimonials[activeIndex].date}
              </span>
            </div>
          </div>

          {/* Quote */}
          <p className="text-lg text-center leading-relaxed">
            {testimonials[activeIndex].quote}
          </p>

          {/* Role */}
          <div className="text-center">
            <div className="font-semibold">
              {testimonials[activeIndex].author}
            </div>
            <div className="text-sm text-muted-foreground">
              {testimonials[activeIndex].role}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`h-2 rounded-full transition-all ${index === activeIndex
                  ? "w-6 bg-accent"
                  : "w-2 bg-muted-foreground/30"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-center max-w-5xl mx-auto gap-16 lg:gap-24">
          {/* Quote */}
          <div className="flex-1 max-w-2xl">
            <Quote className="w-10 h-10 text-accent/20 mb-6" />

            <div className="relative min-h-[180px]">
              {testimonials.map((t, index) => (
                <p
                  key={index}
                  className={`text-xl leading-relaxed font-medium transition-all duration-500 absolute inset-0 ${index === activeIndex
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                    }`}
                >
                  {t.quote}
                </p>
              ))}
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              — {testimonials[activeIndex].role}
            </div>
          </div>

          {/* Carousel */}
          <div className="relative w-64 h-72 flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const { x, y, angle } = getPosition(
                index,
                testimonials.length,
                false,
              );
              const isActive = index === activeIndex;
              const absAngle = Math.abs(angle);

              return (
                <div
                  key={index}
                  onClick={() => handleClick(index)}
                  className="absolute cursor-pointer transition-all duration-700"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    zIndex: isActive ? 10 : 5 - absAngle,
                  }}
                >
                  <div
                    className={`transition-all ${isActive ? "scale-100" : "scale-75 opacity-60"}`}
                  >
                    <div
                      className={`rounded-full overflow-hidden ${isActive
                        ? "w-16 h-16 ring-2 ring-accent ring-offset-2"
                        : "w-12 h-12 bg-muted"
                        }`}
                    >
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        testimonial.author.charAt(0)
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};
