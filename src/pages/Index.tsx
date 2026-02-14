import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, VolumeX, Heart, Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const FloatingHearts = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {Array.from({ length: 15 }).map((_, i) => (
      <div
        key={i}
        className="absolute text-primary/20 animate-float-heart"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${5 + Math.random() * 5}s`,
          fontSize: `${12 + Math.random() * 20}px`,
        }}
      >
        ❤
      </div>
    ))}
  </div>
);

const Sparkles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 20 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30 animate-sparkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

const photos = [
  { src: "/images/photo1.jpeg", caption: "Our beautiful moments together" },
  { src: "/images/photo2.jpeg", caption: "Laughing like there's no tomorrow" },
  { src: "/images/photo3.jpeg", caption: "Adventures in Hyderabad" },
  { src: "/images/photo4.jpeg", caption: "Sweet little memories" },
  { src: "/images/photo5.jpeg", caption: "Together is our favorite place" },
  { src: "/images/photo6.jpeg", caption: "Every moment counts" },
  { src: "/images/photo7.jpeg", caption: "Our cozy moments" },
  { src: "/images/photo8.jpeg", caption: "Happiness looks like this" },
  { src: "/images/photo9.jpeg", caption: "Forever smiling with you" },
  { src: "/images/photo10.jpeg", caption: "Shopping & selfies" },
  { src: "/images/photo11.jpeg", caption: "Our happiest together" },
];

const timelineEvents = [
  {
    title: "Where It All Began",
    text: "Back then, we were just friends… sharing laughs, silly jokes, and food that somehow tasted better together. Hyderabad became our world — chai breaks, travels, long walks, and late-night talks.",
  },
  {
    title: "Bittu & Sweety",
    text: "Somewhere between shared meals and shared dreams, friendship turned into something deeper. We became Bittu and Sweety — and that changed everything.",
  },
  {
    title: "The First Kiss 🦋",
    text: "I still remember our first kiss, Sweety. The butterflies, the nervous smiles, the way time paused. In that moment, I knew my Bittu heart belonged to you forever.",
  },
  {
    title: "Distance Made Us Stronger",
    text: "When I shifted to Vizag for my job, distance tested us. We missed each other deeply — the comfort, the presence, the peace. Even when miles separated us, my heart still whispered your name, Sweety.",
  },
  {
    title: "Our Nights Together",
    text: "All the nights we spent talking are forever memorable. Those late-night conversations, the laughter, the silence that said more than words ever could — every second with you felt like home.",
  },
  {
    title: "Thoughts That Match",
    text: "Even miles apart, our thoughts matched. Our plans matched. Our dreams matched. That's when I knew — this is forever.",
  },
];

const Index = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    if (audioRef.current && !musicStarted) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().then(() => {
        setIsMuted(false);
        setMusicStarted(true);
      }).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (!musicStarted) {
        startMusic();
      } else {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(!isMuted);
      }
    }
  };

  const scrollToStory = () => {
    startMusic();
    document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <audio ref={audioRef} src="/music/her.mp3" loop preload="auto" />
      <FloatingHearts />

      {/* Music Control */}
      <button
        onClick={toggleMute}
        className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/30 transition-all duration-300 animate-pulse-glow"
        aria-label="Toggle music"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* === HERO SECTION === */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        <Sparkles />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Heart className="mx-auto mb-6 text-primary" size={48} fill="currentColor" />
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-display font-bold text-foreground mb-6 leading-tight">
              Happy Valentine's Day,{" "}
              <span className="text-primary">Sweety</span> ❤️
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground font-serif-display italic mb-4 leading-relaxed">
              From Hyderabad streets to forever dreams,
              <br />
              your Bittu is always yours.
            </p>
            <p className="text-sm text-muted-foreground font-script text-xl mb-10">— Love, Sriram</p>
            <button
              onClick={scrollToStory}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg animate-pulse-glow hover:scale-105 transition-transform duration-300"
            >
              Begin Our Story ❤️
            </button>
          </motion.div>
        </div>
      </section>

      {/* === OUR STORY TIMELINE === */}
      <section id="our-story" className="py-24 sm:py-32 px-6 bg-card">
        <div className="max-w-3xl mx-auto">
          <Section>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-center text-foreground mb-16">
              Our Story 💕
            </h2>
          </Section>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-primary/20" />
            {timelineEvents.map((event, i) => (
              <Section key={i}>
                <div className={`flex items-start mb-16 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-full sm:w-1/2 ${i % 2 === 0 ? "sm:pr-12 text-right" : "sm:pl-12 text-left"}`}>
                    <div className="bg-background rounded-2xl p-6 sm:p-8 shadow-lg border border-border">
                      <h3 className="text-xl sm:text-2xl font-serif-display font-semibold text-primary mb-3">{event.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-base">{event.text}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-8 justify-center relative">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-md" />
                  </div>
                  <div className="hidden sm:block w-1/2" />
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* === GALLERY === */}
      <section className="py-24 sm:py-32 px-6 bg-accent/30">
        <div className="max-w-6xl mx-auto">
          <Section>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-center text-foreground mb-4">
              Beautiful Memories 📸
            </h2>
            <p className="text-center text-muted-foreground mb-16 text-lg italic">Every picture tells our story</p>
          </Section>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {photos.map((photo, i) => (
              <Section key={i}>
                <div className="group relative overflow-hidden rounded-2xl shadow-lg aspect-square">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <p className="text-primary-foreground text-sm font-medium">{photo.caption}</p>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* === VIDEO MEMORY === */}
      <section className="py-24 sm:py-32 px-6 bg-card">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-foreground mb-4">
              Our Favorite Moment ❤️
            </h2>
            <p className="text-muted-foreground italic mb-12 text-lg">Every second with you feels like home.</p>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
              <video
                controls
                className="w-full"
                poster="/images/photo11.jpeg"
                preload="metadata"
              >
                <source src="/video/memory.mp4" type="video/mp4" />
              </video>
            </div>
          </Section>
        </div>
      </section>

      {/* === FUTURE DREAMS === */}
      <section className="py-24 sm:py-32 px-6 bg-accent/30">
        <div className="max-w-3xl mx-auto text-center">
          <Section>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-foreground mb-12">
              Our Future Dreams 🌍
            </h2>
          </Section>
          {[
            { emoji: "✈️", text: "Traveling the world together — every new place, hand in hand" },
            { emoji: "💒", text: "Getting married — the most beautiful day of our lives" },
            { emoji: "🏡", text: "I imagine building a home with you, Sweety." },
            { emoji: "👶", text: "I imagine hearing little footsteps running around." },
            { emoji: "👴👵", text: "I imagine growing old with you… and I still want to call you \"Bittu\" when we're 70." },
          ].map((dream, i) => (
            <Section key={i}>
              <div className="flex items-center gap-4 sm:gap-6 mb-8 bg-background rounded-2xl p-6 sm:p-8 shadow-md border border-border text-left">
                <span className="text-3xl sm:text-4xl flex-shrink-0">{dream.emoji}</span>
                <p className="text-foreground text-base sm:text-lg leading-relaxed">{dream.text}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* === LOVE LETTER === */}
      <section className="py-24 sm:py-32 px-6 bg-card">
        <div className="max-w-2xl mx-auto">
          <Section>
            <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-center text-foreground mb-12">
              A Letter For You 💌
            </h2>
            <div className="bg-background rounded-3xl p-8 sm:p-12 shadow-xl border border-border">
              <div className="font-script text-xl sm:text-2xl text-foreground leading-relaxed space-y-6">
                <p>Sweety,</p>
                <p>You are not just my girlfriend.<br />You are my peace, my comfort, my happiness.</p>
                <p>Hyderabad gave me friendship.<br />Vizag taught me distance.<br />But you taught me what forever feels like.</p>
                <p>No matter where life takes us — whether it's busy cities, quiet nights, or new beginnings — my favorite place will always be next to you.</p>
                <p className="mt-8">
                  Forever yours,<br />
                  <span className="text-primary font-bold">Your Bittu ❤️</span><br />
                  — Sriram
                </p>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* === FINAL PROPOSAL === */}
      <section className="relative py-24 sm:py-32 px-6 gradient-dark-romantic min-h-[70vh] flex items-center">
        <Sparkles />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Section>
            <Heart className="mx-auto mb-8 text-primary" size={56} fill="currentColor" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-bold text-primary-foreground mb-10 leading-tight">
              Sweety, will you build this forever with your Bittu?
            </h2>
            <button
              onClick={() => setShowProposal(true)}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-xl animate-pulse-glow hover:scale-105 transition-transform duration-300"
            >
              Yes, Always Bittu ❤️
            </button>
          </Section>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-foreground text-center">
        <p className="font-script text-xl text-primary-foreground/80">
          Made with love by Sriram, for his Sweety.
        </p>
        <p className="font-script text-lg text-primary-foreground/60 mt-1">
          Always your Bittu ❤️
        </p>
      </footer>

      {/* Proposal Dialog */}
      <Dialog open={showProposal} onOpenChange={setShowProposal}>
        <DialogContent className="bg-card border-primary/30 text-center max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl sm:text-3xl font-serif-display text-primary mb-4">❤️</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-xl sm:text-2xl font-serif-display text-foreground leading-relaxed">
              You are my home, Mounika.
            </p>
            <p className="text-lg text-muted-foreground">My today.</p>
            <p className="text-lg text-muted-foreground">My tomorrow.</p>
            <p className="text-lg font-semibold text-primary">My forever.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
